# Implementation Plan

This is the single source of truth for *what* we are building, *why*, and *in what order*. Detailed how-to lives in `docs/`.

## 1. Goals

A production-ready website for a research institute covering public policy, international relations, history, and related fields. The site must:

- Project the trust, gravitas, and clarity expected of a university or think-tank.
- Let admins publish and edit content (articles, research, people, events) without touching code.
- Score top-decile on Lighthouse (performance, accessibility, SEO, best practices).
- Be small enough to maintain by a single engineer plus an editor.

## 2. Audience

| Audience              | What they need                                       |
| --------------------- | ---------------------------------------------------- |
| Public reader         | Read research, find people, contact the institute    |
| Journalist / partner  | Quote experts, find events, request collaboration    |
| Editor (admin/super)  | Publish and revise content without engineering help  |
| Engineer              | Ship features safely, deploy without surprises       |

## 3. Scope (v1)

### Public site
- Home (institute name centered, logo top-left, hero, recent research, featured events).
- Research / Publications (filterable list + detail page).
- People (researchers, fellows, staff — index + bio page).
- Topics (Public Policy, International Relations, History, plus extensible list).
- Events (upcoming + archive).
- About, Mission, History.
- News / Press.
- Contact (form → email + DB).
- Search (server-side, Postgres full-text in v1).
- 404, 500, offline pages.

### Admin app (`/admin`)
- Login, password reset, session management.
- Dashboard overview (recent edits, drafts, upcoming events).
- CRUD for Articles, Publications, People, Events, Topics, Pages.
- Rich-text editor (Tiptap or similar) with image upload.
- Media library (images + PDFs).
- User management (admins only).
- Audit log (who changed what, when).

### Roles
- **`user`** — public visitor; no auth required for public pages. Can submit contact form, subscribe to mailing list. Optional account for saving research / commenting (deferred to v2).
- **`admin`** — can create/edit/publish content, manage media. Cannot manage users.
- **`super`** (super user) — everything admin can do, plus user/role management, site settings, audit log access.

### Out of scope for v1
- Public-facing user accounts (saved searches, comments).
- Multilingual content (architecture supports it; content not authored).
- Payment/donations.
- Newsletter sending (we only collect addresses; sending integrated with Mailchimp later).

## 4. Non-functional requirements

Pulled directly from the brief and codified here so they're testable.

| Requirement                          | Where it's enforced                      |
| ------------------------------------ | ---------------------------------------- |
| Environment variables for all secrets | `.env.example`, validated at boot in `backend/src/config/env.ts` |
| Auth + role-based access             | `backend/src/middleware/auth.ts`         |
| Protect admin routes                 | Backend middleware + frontend route guards |
| Validate all user input              | `zod` schemas at every API edge          |
| HTTPS only                           | HSTS header, redirect at proxy           |
| Compress images                      | Build-time (sharp) + on upload           |
| Caching                              | HTTP cache headers + CDN + in-memory LRU on hot endpoints |
| Minimize JS bundles                  | Vite code-splitting, tree-shaking, route-level lazy loading |
| CDN                                  | Static assets via CDN; API behind reverse proxy |
| Mobile-first                         | Tailwind breakpoints, design starts at 360px |
| Error tracking                       | Sentry (frontend + backend)              |
| Uptime monitoring                    | UptimeRobot or BetterStack on `/healthz` |
| Logs                                 | Pino → stdout → log aggregator            |
| Page speed + activity                | Plausible (privacy-friendly) + Web Vitals |
| Page titles                          | `react-helmet-async`, per-route          |
| Meta descriptions                    | Per-route + dynamic for content pages    |
| Clean URLs                           | `/research/2026/post-bretton-woods-order` style |
| Sitemap                              | Auto-generated at build + on content change |
| robots.txt                           | Static file at root                      |
| Crawlable                            | Server-side rendering for content pages (Vite SSG) |
| Clear navigation                     | Persistent header, sectional sub-nav     |
| Fast loading                         | Performance budget enforced in CI        |
| Clear CTA                            | Hero CTA + CTA per content type          |
| Simple contact path                  | Footer + `/contact` + email link in header |

## 5. Phased delivery

Each phase ends with a demo and a deploy to staging. No phase ends without tests passing.

### Phase 0 — Foundations (this scaffold)
- Repo structure, docs, env files, Docker DB, lint/format, CI skeleton.
- Design system in Figma-equivalent (Tailwind tokens + `docs/DESIGN.md`).
- Decisions recorded in `docs/ADRs/`.

### Phase 1 — Core public site
- Static pages (Home, About, Topics, Contact).
- Content models in DB (migrations only, no admin yet).
- Seed data so the site looks real in dev.
- Public read API.

### Phase 2 — Admin authentication
- Auth (login, refresh, logout, password reset).
- Role-based middleware.
- Protected `/admin` shell with role-gated nav.
- Audit log table.

### Phase 3 — Content management
- CRUD for Articles, Publications, People, Events, Topics.
- Media library + image processing pipeline (sharp → multiple sizes).
- Rich-text editor with sanitization (DOMPurify on output).
- Draft → review → publish workflow.

### Phase 4 — Search, SEO, performance
- Postgres full-text search.
- Sitemap generator.
- Lighthouse CI gating PRs.
- Image lazy-loading, preload critical fonts.

### Phase 5 — Hardening
- Penetration test checklist run.
- Load test (k6) on read endpoints.
- Backup + restore drill.
- Runbook for incidents.

### Phase 6 — Launch
- Staging → prod cutover.
- DNS, TLS, monitors live.
- Post-launch retro after 1 week.

## 6. Success metrics

- **Editorial:** an editor can publish a new article in under 5 minutes from logged-out state.
- **Performance:** LCP < 2.0s on 4G mobile for content pages, CLS < 0.1, INP < 200ms.
- **SEO:** all content pages indexable, valid `JSON-LD` schema (Article, Person, Event).
- **Accessibility:** WCAG 2.1 AA on every public route, verified with axe in CI.
- **Reliability:** 99.9% monthly uptime on `/healthz`.
- **Security:** zero criticals from `npm audit`, no high CVEs older than 7 days.

## 7. Risks and mitigations

| Risk                                      | Mitigation                                              |
| ----------------------------------------- | ------------------------------------------------------- |
| Single-engineer bus factor                | Heavy docs, ADRs, runbook; everything in this repo      |
| Editor is non-technical                   | Field-level help text, preview, friendly errors         |
| Content fields drift from design          | Validate with zod schemas shared between FE and BE      |
| SEO regressions on JS-only renders        | Static rendering for content pages; smoke crawl in CI   |
| Prod data leak via dev fixtures           | Separate seed file, `NODE_ENV` gate, prod migration check |
| Image storage costs balloon               | Quotas + WebP/AVIF + on-the-fly resizing                |

## 8. Open decisions

Tracked in `docs/ADRs/` as they are made. Initial open items:

- Static rendering: Vite SSG vs. Next.js. Default: **Vite SSG** (smaller, no Node at edge for content).
- Rich-text editor: Tiptap vs. Lexical. Default: **Tiptap** (more mature plugin ecosystem).
- Email provider: Postmark vs. Resend. Default: **Resend** for ease, swap later if needed.
- Object storage: S3 vs. R2 vs. local in dev. Default: **local in dev**, **R2** in prod.

---

Last updated: 2026-05-02
