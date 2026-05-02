---
name: qa-testing
description: Use this skill for any testing or QA work on this repo — writing or fixing unit/integration/E2E tests, accessibility checks, Lighthouse/performance budgets, security tests, load tests, or pre-release QA checklists. Trigger on requests like "add a test", "fix flaky spec", "improve coverage", "verify accessibility", "run Lighthouse", or paths under `tests/`, `frontend/tests/`, `backend/tests/`. Do NOT use for production code changes themselves — use the relevant frontend/backend/database skill, then add tests via this one.
---

# QA & testing skill

Quality gates are non-negotiable. This skill is the operational guide for writing and maintaining the test suite. The strategy lives in `docs/TESTING.md`; this is the how.

## Tooling

- Frontend unit: Vitest + React Testing Library (RTL).
- Backend unit + integration: Vitest, Supertest, real Postgres in Docker.
- E2E: Playwright (chromium, firefox, webkit).
- Accessibility: `@axe-core/playwright`, `jest-axe`.
- Visual regression: Playwright screenshots vs baseline.
- Performance: Lighthouse CI.
- Load: k6.
- Static: ESLint, Prettier, TypeScript strict, `eslint-plugin-security`.

## Always do this

- **Test by behavior, not by implementation.** RTL: query by accessible role/name, never by class. Avoid snapshot tests of full HTML.
- **Use `msw`** for FE network mocking; tests then exercise real fetch code paths.
- **Each integration test resets DB state.** Truncate-and-seed at the start of each file.
- **Every reproducible bug gets a regression test before the fix.**
- **Run axe on every E2E** — `injectAxe` then `checkA11y`. Fail on any new violation.
- **Round numbers** displayed to the user; tests assert the rounded form, not float artifacts.
- **Determinism.** No timing-based flakes — use `await expect(...).toBeVisible()` not `waitForTimeout`.
- **Critical journeys** (see list below) always pass before merge to `main`.
- **Fast tests first.** A PR's CI should report failure within 5 minutes from the cheapest signal (lint → unit → integration → E2E).

## Never do this

- Don't write E2E tests for things a unit test could cover faster and more reliably.
- Don't test private functions; test the boundary that calls them.
- Don't share state between tests within a file.
- Don't mock what you don't own (e.g. Postgres) — use the real thing.
- Don't gate a release on flaky tests; fix or quarantine within 24h, never disable silently.
- Don't commit screenshots or video traces — those are CI artifacts.

## Critical journeys (E2E, must pass)

Mirrors `docs/TESTING.md §5`:

1. Visitor reads an article (home → article).
2. Visitor uses search.
3. Visitor submits the contact form.
4. Admin logs in (and is rate-limited on bad password).
5. Admin creates and publishes an article (with image upload).
6. Admin uploads media (valid + bad-MIME rejected + oversize rejected).
7. Super manages users (invite, role change, deactivate).
8. Logout invalidates session.
9. 404 and 500 with real status codes.
10. Mobile nav at 360px viewport.

## Performance gates (CI)

- Lighthouse on home + an article page, mobile config:
  - Performance ≥ 90, Accessibility ≥ 95, Best Practices ≥ 95, SEO ≥ 95.
  - LCP < 2.5s, CLS < 0.1, INP < 200ms.
- `size-limit`: home initial JS ≤ 80 KB gzip.
- `npm audit --omit=dev`: 0 high or critical.

## Accessibility checklist (every release)

- Axe scan in CI is green.
- Keyboard-only walkthrough of critical journeys.
- Screen reader spot check (NVDA on Windows, VoiceOver on macOS) on home + an article + admin login.
- Contrast check on any new color combos.
- Tests pass at 200% browser zoom and at 360px viewport.

## Security tests

- Login: rate limit, lockout, password reset token reuse.
- CSRF: state-changing request without token → 403.
- Authorization: user role attempting admin route → 403, role-elevation attempts on `/auth/*` → 403.
- File upload: bad MIME, polyglot file, oversize, double-extension.
- Rich text: known XSS payloads stored, asserted to render inert.
- SQL: filter param fuzz with `'; DROP TABLE …` style payloads.

## Pre-release QA checklist

Run before promoting staging → prod (full version in `docs/TESTING.md §11`):

- [ ] Smoke: home, an article, admin login, content edit, logout.
- [ ] Mobile smoke at 360px and 414px.
- [ ] Mailer: contact form delivers.
- [ ] Sitemap and robots.txt fetched, links valid.
- [ ] Search returns expected results.
- [ ] 404/500 pages render with correct status codes.
- [ ] Sentry test error captured.
- [ ] Uptime monitor configured.
- [ ] DB migration applied; rollback path documented.

## Flake protocol

If a test goes flaky:

1. Tag it `@flaky` and open an issue with the most recent traces.
2. Quarantine within 24h (still runs in CI but not gating).
3. Fix (or delete and replace) within one week.
4. Postmortem if the same test goes flaky twice.
