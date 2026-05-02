---
name: backend-node
description: Use this skill when working in the `backend/` folder of this repo — Express routes, middleware, controllers, services, zod schemas, auth, file uploads, or anything that runs in Node.js for this Research Institute site. Trigger on file paths starting with `backend/`, on requests like "add an endpoint", "wire up auth", "build the upload service", or any change to backend `.ts` files. Do NOT use for frontend code (`frontend/`), database schema/migrations (`database/`), or content authoring tasks.
---

# Backend (Node.js) skill

This is how the API for the Research Institute site is built. Read this before changing routes, middleware, or services.

## Stack

- Node.js 20 LTS, TypeScript strict.
- Express 4 + helmet + cors + compression + express-rate-limit.
- Pino for logging.
- `pg` + Kysely for typed SQL. **No heavy ORM.**
- bcrypt for passwords; jsonwebtoken for access tokens.
- `multer` + `sharp` for image upload.
- `zod` for validation at every public boundary.
- `nodemailer` (Resend transport in prod, MailHog in dev).

## Folder shape

```
backend/src/
├── server.ts             entrypoint
├── app.ts                Express composition
├── config/env.ts         zod-validated env
├── db/                   pg pool, kysely instance
├── routes/               one file per resource
├── controllers/          thin: parse → call service → respond
├── services/             business logic, framework-agnostic
├── middleware/           auth, error, rate-limit, request-id
├── schemas/              zod request/response shapes
├── jobs/                 cron-style tasks
└── lib/                  hashing, mail, storage adapters
```

## Always do this

- **Validate input with zod**, every endpoint. Use `.strict()` to reject extra fields.
- **Type DB queries** through Kysely. Never concatenate SQL strings.
- **Centralized error handler** in `middleware/error.ts`. Throw typed errors (`AppError`, `NotFoundError`, etc.); the handler maps to status + safe shape.
- **Pino redaction** is configured globally — don't roll your own logger.
- **Request ID** is set by middleware and echoed in `x-request-id` and every log line.
- **Auth middleware** is the gate, not the controller:
  - `requireAuth` — any logged-in user.
  - `requireRole('admin')` — admins or super.
  - `requireRole('super')` — super only.
- **Rate-limit** auth endpoints (login, refresh, password reset). Defaults already in `middleware/ratelimit.ts`.
- **Sanitize rich-text** server-side before persisting. Use `lib/sanitize.ts` (DOMPurify + jsdom).
- **Audit log** every admin write. Helper in `services/audit.ts`.
- **Health endpoint** must remain cheap and DB-aware. Keep it under 50ms p95.

## Never do this

- Never read/trust `req.body` without a zod parse.
- Never put a secret in a constant or commit `.env`.
- Never log a password, token, cookie, or `req.body` of `/auth/*`.
- Never set CORS to `*`. Allowlist via `FRONTEND_ORIGIN`.
- Never accept a file by `Content-Type` alone — verify magic bytes via `file-type`.
- Never use string concat in SQL — Kysely or parameterized.
- Never write a controller that mixes routing and business logic; delegate to a service.
- Never bypass the audit log on admin writes.

## Adding a new endpoint

1. Decide public vs. admin vs. super.
2. Write the zod schemas in `src/schemas/<resource>.ts`.
3. Add a service in `src/services/<resource>.ts` — pure logic, framework-agnostic.
4. Add a controller in `src/controllers/<resource>.ts` — parse, call service, respond.
5. Register the route in `src/routes/<resource>.ts` with the right middleware.
6. Add an integration test in `tests/integration/<resource>.test.ts` covering happy path, validation errors, role gating.

## Auth specifics

- Access token: JWT, RS256, 15 min. Carries `sub` and `role`.
- Refresh token: 32-byte opaque, hashed in DB (`sessions.refresh_hash`), delivered as `__Host-rt` httpOnly Secure SameSite=Strict cookie.
- On refresh, **rotate** — issue a new refresh and invalidate the old one. If an invalidated token is reused, revoke the whole session and alert.
- Failed-login rate limit: progressive delay → lockout after 10 failures in 15 min.

## File uploads

- Use the `mediaUpload` middleware (multer memory storage).
- `services/media.ts` validates magic bytes, runs sharp pipeline (320/640/1024/1920 WebP+AVIF), persists `media` row, uploads to storage adapter.
- Reject anything not in the allowlist with 415.

## Health, metrics, errors

- `/api/v1/health` — 200 if DB reachable, 503 otherwise.
- `/metrics` — `prom-client` registry, scoped to a private network in prod.
- Sentry: capture unhandled errors plus deliberate `captureException` calls in services where context matters.

## Common gotchas

- `TRUST_PROXY=1` must be set in prod or rate-limiting and IP logging are wrong.
- HSTS only enabled in prod (HSTS in dev would break localhost on first run).
- Refresh cookie `Path=/api/v1/auth` — don't widen it.
- Don't return entity bodies on `/auth/*` endpoints; only opaque success/error.
