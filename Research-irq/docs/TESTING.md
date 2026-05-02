# Testing and QA

Quality is a release blocker, not an afterthought. This document defines the test pyramid for this project, the tooling, and the gates a PR must pass before it can merge to `main` or deploy to prod.

## 1. Pyramid

```
                ┌─────────────┐
                │  E2E (few)  │   Playwright across critical flows
                ├─────────────┤
                │ Integration │   Supertest + real Postgres in Docker
                │  (some)     │
                ├─────────────┤
                │   Unit      │   Vitest for FE, Vitest for BE pure logic
                │  (lots)     │
                └─────────────┘
```

Heuristic: aim for **70% unit, 20% integration, 10% E2E** by count, but optimize for confidence per minute of CI, not coverage percentage.

## 2. Tooling

| Layer        | Tool                                 |
| ------------ | ------------------------------------ |
| FE unit      | Vitest + React Testing Library       |
| BE unit      | Vitest                               |
| BE integration | Supertest + test Postgres (Docker)|
| E2E          | Playwright (chromium, firefox, webkit) |
| A11y         | `@axe-core/playwright`, jest-axe     |
| Visual regression | Playwright screenshots vs baseline |
| Performance  | Lighthouse CI                        |
| Load         | k6                                   |
| Static analysis | ESLint, Prettier, TypeScript strict, `eslint-plugin-security` |
| Mutation (optional) | Stryker on critical services |

## 3. Frontend tests

### Unit
- Pure components rendered with RTL; query by accessible role/name only.
- Hooks tested with `renderHook`.
- API layer mocked with `msw` — tests exercise real fetch code paths.

### Integration (in-browser)
- Full pages mounted with a `MemoryRouter`, with `msw` handlers for the API.
- Forms tested as a user does: type, tab, submit, expect success/error.

### E2E
- Critical flows that must always work, listed below.
- Uses a seeded Postgres + a dedicated test admin account.

## 4. Backend tests

### Unit
- Services and pure helpers; no DB.
- Validators (zod schemas) tested with sample valid/invalid payloads.

### Integration
- Spins up the API and a fresh test DB (truncate-and-seed per test file).
- Covers auth, every admin CRUD endpoint, error codes, role gating.
- Snapshot the DB schema in `database/schema.sql.snapshot` and assert it matches after migrations.

## 5. Critical user journeys (E2E must-pass)

These are the journeys we will not ship without working. Each has a Playwright spec.

1. **Visitor reads an article.** Open home → click featured research → page renders, JSON-LD valid, no console errors.
2. **Visitor uses search.** Type "international relations" → results page → click first result → article opens.
3. **Visitor submits the contact form.** Validation, success, audit row created.
4. **Admin logs in.** Email + password → dashboard. Bad password rate-limited after 5 tries.
5. **Admin creates and publishes an article.** Including image upload + publish + appears on public site.
6. **Admin uploads media.** Valid image accepted, oversize rejected, wrong-MIME rejected.
7. **Super manages users.** Invite admin, change role, deactivate, audit log shows entries.
8. **Logout invalidates session.** After logout, refresh attempt fails.
9. **404 and 500.** Real status codes, friendly pages.
10. **Mobile nav works.** 360px viewport: hamburger opens, links work, close on outside click.

## 6. Accessibility tests

- Every Playwright E2E run includes an axe scan on the page reached.
- CI fails on any new violation; existing baseline tracked in `tests/a11y-baseline.json`.
- Manual checks before release: keyboard-only walkthrough of critical journeys, screen reader spot check (NVDA on Windows, VoiceOver on macOS).

## 7. Performance tests

- **Lighthouse CI** runs on PR, asserts:
  - Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95 on home and a representative article page.
  - LCP < 2.5s on simulated 4G mobile, CLS < 0.1, INP < 200ms.
- **Bundle size budget** enforced via `size-limit`:
  - `frontend/dist/assets/index-*.js` ≤ 80 KB gzip on home route.
- **Load test (k6)** before each major release: 100 RPS sustained on read endpoints, p95 < 250ms.

## 8. Security tests

- `npm audit --omit=dev` in CI; pipeline fails on high+ severity.
- ESLint with `eslint-plugin-security` and `eslint-plugin-no-unsanitized`.
- Dedicated tests for: SQL injection on filter params, XSS payload through rich text, CSRF without token, role escalation attempts.

## 9. Test data and fixtures

- Seed file in `database/seed.sql` produces a realistic-looking site (3 admins, 30 articles, 10 people, 5 events).
- Tests **never** read prod data. CI uses `pg-test` databases torn down at the end.
- Fixtures committed in `tests/fixtures/`.

## 10. CI gates

Pull requests cannot merge unless:

- [ ] Lint + typecheck pass.
- [ ] Unit + integration tests pass.
- [ ] E2E suite passes (critical journeys 1–10).
- [ ] axe scan: 0 new violations.
- [ ] Lighthouse CI within budget.
- [ ] `size-limit` within budget.
- [ ] `npm audit`: 0 critical / 0 high (dev deps excluded).
- [ ] At least one human reviewer approval on diffs touching auth, admin, or DB migrations.

## 11. Pre-deploy QA checklist

Run before promoting staging → prod:

- [ ] Smoke: home, an article, admin login, content edit, logout.
- [ ] Mobile smoke at 360px and 414px.
- [ ] Mailer: contact form lands in inbox; no email goes to anywhere unintended.
- [ ] Sitemap and robots fetched, links valid.
- [ ] Search returns expected results.
- [ ] All `404`/`500` pages render with correct status codes.
- [ ] Sentry captures a forced test error.
- [ ] Uptime monitor configured for the new host.
- [ ] DB migration applied; rollback path documented.

## 12. Release process

1. Cut release branch from `main`.
2. Run pre-deploy QA checklist on staging.
3. Tag `vX.Y.Z`, deploy backend (blue/green), then frontend (CDN flip).
4. Watch dashboards for 30 min: error rate, p95 latency, RUM.
5. Announce in changelog.

## 13. Bugs and regressions

- Every reproducible bug gets a regression test before the fix lands.
- Customer-reported issues with severity ≥ medium are postmortem'd in `docs/incidents/`.
