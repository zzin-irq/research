# Security

This document is the operational security baseline. Every PR that touches auth, admin routes, file uploads, or user input is reviewed against this list.

## 1. Threat model (in scope)

| Threat                                | Mitigation                                                  |
| ------------------------------------- | ----------------------------------------------------------- |
| Unauthorized content edits            | Role-based auth, audit log, session revocation              |
| Brute-force login                     | Rate limit + account lockout + delay                        |
| Token theft                           | Short access tokens, httpOnly refresh, rotation on use      |
| XSS via rich text                     | Server sanitization (DOMPurify), CSP                        |
| SQL injection                         | Parameterized queries via Kysely; no string concat          |
| CSRF on cookie-auth state changes     | SameSite=Strict + double-submit token                       |
| File upload abuse                     | MIME magic-byte check, size limit, image-only types         |
| SSRF via URL fetchers                 | No URL fetching from user input in v1                       |
| Open redirect                         | Allowlist of return URLs                                    |
| Sensitive data exposure in logs       | Pino redaction config; no req.body logged on auth endpoints |
| Dependency CVEs                       | Renovate + `npm audit` in CI; weekly review                 |

Out of scope for v1: anonymous user accounts, payment processing, real-time chat.

## 2. Authentication

- Email + password login only in v1.
- Passwords: bcrypt cost 12. Min length 12, zxcvbn score ≥ 3 enforced server-side.
- Reset flow uses single-use signed tokens, 30-min TTL.
- "Remember me" not supported in v1; refresh tokens roll automatically.
- Failed-login throttling: progressive delay → lockout after 10 failures in 15 min.
- Successful login from a new device → email notification.

## 3. Sessions and tokens

- Access token: JWT, RS256, 15-minute TTL, contains `sub` (user id) + `role`.
- Refresh token: 32-byte opaque, hashed in DB (`sessions.refresh_hash`).
- Refresh cookie: `__Host-rt`, `HttpOnly`, `Secure`, `SameSite=Strict`, `Path=/api/v1/auth`.
- Tokens rotate on every refresh; old token replay → revoke whole session.
- Logout revokes the session row server-side.

## 4. Authorization

- Roles: `user`, `admin`, `super`.
- Middleware: `requireAuth`, `requireRole('admin')`, `requireRole('super')`.
- Frontend checks are for UX only; never the source of truth.
- All admin endpoints under `/api/v1/admin/*` carry the role check.
- Super-only endpoints additionally protected at the controller layer.

## 5. Input validation

Every API edge has a `zod` schema:

```ts
const ContactInput = z.object({
  name: z.string().min(1).max(120),
  email: z.string().email().max(255),
  subject: z.string().min(1).max(200),
  body: z.string().min(20).max(5000),
  recaptchaToken: z.string()
});
```

Reject unknown fields (`.strict()`). Coerce nothing silently. Errors return `400` with field paths, never stack traces.

## 6. HTTPS and headers

Set at the proxy and re-asserted by helmet:

- `Strict-Transport-Security: max-age=63072000; includeSubDomains; preload`
- `Content-Security-Policy` — strict, nonce-based for inline scripts, `default-src 'self'`, image and font CDNs allowlisted.
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Content-Type-Options: nosniff`
- `X-Frame-Options: DENY` (no embedding)
- `Permissions-Policy` denies camera, mic, geolocation, payments.
- `Cross-Origin-Opener-Policy: same-origin`
- `Cross-Origin-Resource-Policy: same-origin`

HTTP → HTTPS redirect lives at the proxy. App refuses to start in prod without `TRUST_PROXY=1` and a valid TLS cert detected.

## 7. CSRF

- All state-changing requests on cookie-auth routes require a CSRF token (double-submit pattern).
- The token is set in a non-HttpOnly cookie at login; client mirrors it in `X-CSRF-Token` header on requests.
- Server compares both. Mismatch → 403, audit-log the event.

## 8. File uploads

- Allowed types: JPEG, PNG, WebP, AVIF, PDF.
- MIME validated by **magic bytes** via `file-type`, not the `Content-Type` header.
- Max size: 8 MB images, 25 MB PDFs.
- Filenames are server-generated (UUID) — never trust user filenames.
- All uploads scanned with `clamav` in prod (deferred in dev).
- Stored outside the web root in dev; behind signed URLs in prod.

## 9. Rich text and HTML output

- Editor produces a constrained subset (Tiptap schema).
- Server runs `dompurify` (with `jsdom`) on every save.
- Allowed tags: a, blockquote, br, code, em, h2, h3, h4, hr, img, li, ol, p, pre, strong, ul.
- Allowed attributes: `href` (https only), `alt`, `src` (allowlist hosts), `id`.
- `target="_blank"` automatically gets `rel="noopener noreferrer"`.

## 10. Secrets

- Never in source. `.env` files are gitignored.
- `.env.example` lists every variable with a one-line description.
- Production secrets live in the host's secret manager.
- `backend/src/config/env.ts` validates every env var at boot via zod; missing or malformed → process exits with a useful error.

## 11. Logging and PII

- Pino with field redaction: `password`, `token`, `authorization`, `cookie`, `body.password`, `body.recaptchaToken`.
- We do not log request bodies on `/auth/*` endpoints.
- IP addresses are logged at request time but kept only 30 days.
- Audit log keeps `actor_id`, `action`, `entity`, diff — no raw secrets.

## 12. Dependencies

- Renovate keeps deps current (auto-merge minor/patch after CI passes).
- Weekly `npm audit --omit=dev` reviewed manually.
- We pin only what we need to (lockfiles committed); we don't pin direct dep majors.

## 13. Backups and recovery

- Daily logical backups, 30-day retention, off-site.
- Quarterly restore drill into a scratch DB; result documented in `docs/runbook/restore-drill.md`.

## 14. Pre-launch security checklist

Run before every prod release.

- [ ] All env vars set; no defaults like `change-me` in prod.
- [ ] HSTS preload header verified.
- [ ] CSP has no `'unsafe-inline'` or `'unsafe-eval'`.
- [ ] Auth: rate limit + lockout verified by integration test.
- [ ] Audit log records create/update/delete on every admin entity.
- [ ] File-upload tests: bad MIME, bad magic bytes, oversized, polyglot.
- [ ] `npm audit --omit=dev`: 0 critical, 0 high.
- [ ] Sentry receives a forced test error from both FE and BE.
- [ ] Backup written + restore verified within last 30 days.
- [ ] Robots.txt does not expose `/admin`.
- [ ] All CORS origins are explicit, not `*`.

## 15. Reporting

Security issues → email security@<institute-domain>. Acknowledge within 24h, fix critical within 7 days. Public disclosure window: 90 days, negotiable.
