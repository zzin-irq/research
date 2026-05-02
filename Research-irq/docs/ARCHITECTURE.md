# Architecture

## 1. High-level diagram

```
                ┌────────────────────────────────────────────┐
                │  Browser (desktop / mobile)                │
                └───────────────┬────────────────────────────┘
                                │  HTTPS (HSTS)
                ┌───────────────▼────────────────────────────┐
                │  CDN  (CloudFront / Cloudflare)            │
                │  - Static assets, prerendered HTML         │
                │  - Edge caching, image transforms          │
                └───────────────┬────────────────────────────┘
                                │
            ┌───────────────────┼───────────────────────┐
            │                   │                       │
   ┌────────▼────────┐ ┌────────▼────────┐    ┌─────────▼─────────┐
   │ Frontend (SPA)  │ │  /api  Reverse  │    │  /uploads (signed)│
   │  React + Vite   │ │  proxy → Node   │    │  Object storage    │
   └─────────────────┘ └────────┬────────┘    └────────────────────┘
                                │
                       ┌────────▼─────────┐
                       │  Express API     │
                       │  Node.js 20      │
                       │  TypeScript      │
                       └────┬───────┬─────┘
                            │       │
                  ┌─────────▼──┐ ┌──▼──────────────┐
                  │ PostgreSQL │ │ Object storage   │
                  │ 16          │ │ (R2 / S3)        │
                  └─────────────┘ └──────────────────┘
```

The four layers — frontend, backend, database, storage — are deliberately separated. Each can be deployed, scaled, and swapped independently.

## 2. Frontend

### Stack
- **React 18** with hooks; no class components.
- **Vite** for dev server and bundling. SSG plugin for content pages.
- **React Router 6** for routing; route-level code splitting via `React.lazy`.
- **Tailwind CSS** with a custom token layer (see `docs/DESIGN.md`).
- **TanStack Query** for server state; **Zustand** for tiny UI state.
- **react-helmet-async** for `<title>`, meta, JSON-LD.
- **react-hook-form** + **zod** for forms (admin and contact).

### Folder structure
```
frontend/
├── public/                 robots.txt, favicon, OG image
├── src/
│   ├── api/                fetch wrappers, query keys
│   ├── components/         atoms, molecules, layouts
│   ├── pages/
│   │   ├── public/         home, research, people, events, …
│   │   └── admin/          login, dashboard, content editors
│   ├── hooks/
│   │   └── useAuth.ts
│   ├── lib/
│   │   ├── seo.ts          page-title and JSON-LD helpers
│   │   └── analytics.ts
│   ├── styles/             tokens.css, tailwind.config.cjs
│   ├── routes.tsx          centralized route table
│   └── main.tsx
└── tests/
    ├── unit/               vitest + RTL
    └── e2e/                playwright specs
```

### Routing rules
- Public routes are statically generated where possible.
- Admin routes (`/admin/*`) are SPA-only, never prerendered, and gated by `<RequireRole role="admin" />`.
- 404 must serve a real 404 status from the host (not just SPA-render).

### Performance budget
- Initial JS for public home ≤ 80 KB gzipped.
- LCP image preloaded.
- Fonts: 1 family loaded as `font-display: swap`, subset to needed glyphs.
- Images: AVIF + WebP with `<picture>`, `loading="lazy"` below the fold, explicit width/height to prevent CLS.

## 3. Backend

### Stack
- **Node.js 20 LTS**, **TypeScript** in strict mode.
- **Express 4** with helmet, cors, compression, rate-limit middleware.
- **Pino** for logs (pretty in dev, JSON in prod).
- **zod** for runtime validation at every public boundary.
- **pg** (node-postgres) + **Kysely** as a typed query builder. We avoid heavy ORMs; SQL is a feature, not an obstacle.
- **bcrypt** for password hashing (cost 12).
- **jsonwebtoken** for short-lived access tokens (15 min); refresh tokens are opaque random strings stored hashed in DB and delivered via httpOnly, Secure, SameSite=Strict cookies.
- **multer** + **sharp** for image upload + processing.
- **nodemailer** (with Resend transport in prod, MailHog in dev).

### Folder structure
```
backend/
├── src/
│   ├── server.ts             entrypoint
│   ├── app.ts                Express composition
│   ├── config/env.ts         zod-validated env
│   ├── db/                   pool, kysely instance, migrations runner
│   ├── routes/               one file per resource
│   ├── controllers/
│   ├── services/             business logic, framework-agnostic
│   ├── middleware/           auth, error, rate-limit, request-id
│   ├── schemas/              zod request/response shapes
│   ├── jobs/                 cron-style tasks (sitemap, cleanup)
│   └── lib/                  hashing, mail, storage adapters
└── tests/
    ├── unit/
    └── integration/          spins up a test DB
```

### API conventions
- Versioned under `/api/v1`.
- JSON only. No XML, no form-encoded except the auth login endpoint.
- All errors return `{ error: { code, message, details? } }` with the right HTTP status.
- All requests get a `x-request-id` header echoed in logs.
- Rate-limited at proxy and per-IP at the app: 60 req/min unauthenticated, 600 req/min authenticated.
- CORS allowlist comes from `FRONTEND_ORIGIN` env var.

### Key endpoints (v1)

| Method | Path                           | Auth      | Notes                          |
| ------ | ------------------------------ | --------- | ------------------------------ |
| GET    | `/api/v1/health`               | public    | DB ping, returns 200/503       |
| GET    | `/api/v1/research`             | public    | List, paginated                |
| GET    | `/api/v1/research/:slug`       | public    | Detail                         |
| GET    | `/api/v1/people`               | public    |                                |
| GET    | `/api/v1/people/:slug`         | public    |                                |
| GET    | `/api/v1/events`               | public    |                                |
| GET    | `/api/v1/topics`               | public    |                                |
| POST   | `/api/v1/contact`              | public    | reCAPTCHA + zod                |
| POST   | `/api/v1/auth/login`           | public    | Throttled                      |
| POST   | `/api/v1/auth/refresh`         | cookie    |                                |
| POST   | `/api/v1/auth/logout`          | user      |                                |
| POST   | `/api/v1/admin/articles`       | admin     | Create draft                   |
| PATCH  | `/api/v1/admin/articles/:id`   | admin     |                                |
| POST   | `/api/v1/admin/articles/:id/publish` | admin |                              |
| GET    | `/api/v1/admin/users`          | super     |                                |
| POST   | `/api/v1/admin/users`          | super     |                                |
| PATCH  | `/api/v1/admin/users/:id/role` | super     |                                |
| GET    | `/api/v1/admin/audit`          | super     |                                |

## 4. Database

PostgreSQL 16, schema lives in `database/migrations/`. We use plain SQL migrations applied in order, tracked in a `schema_migrations` table.

### Core tables (sketch)

```sql
users (id, email UNIQUE, password_hash, role, name, created_at, updated_at)
sessions (id, user_id, refresh_hash, user_agent, ip, expires_at, revoked_at)
topics (id, slug UNIQUE, name, description, sort_order)
articles (id, slug UNIQUE, title, summary, body_html, body_md,
          author_id, topic_id, status, published_at, created_at, updated_at,
          tsv tsvector)
publications (id, slug, title, abstract, pdf_url, doi, year, …)
people (id, slug, name, role, bio_html, photo_url, links jsonb, …)
events (id, slug, title, starts_at, ends_at, location, description, …)
media (id, owner_id, kind, url, mime, width, height, alt, …)
audit_log (id, actor_id, action, entity, entity_id, diff jsonb, created_at)
contact_messages (id, name, email, subject, body, ip, created_at, handled_at)
```

A GIN index on `articles.tsv` powers full-text search. `tsv` is maintained by a trigger.

### Backups
Daily logical backups (`pg_dump`) shipped to off-site storage with 30-day retention. Restore drill quarterly — runbook in `docs/DEPLOYMENT.md`.

## 5. Storage

Two storage paths:

- **Local (dev):** `storage/uploads/` (gitignored), served by Express under signed URLs.
- **Prod:** Cloudflare R2 (S3-compatible), reverse-proxied by the CDN. Backend writes via SDK with short-lived credentials. Reads are public-read for whitelisted prefixes (`/media/`), signed URLs for everything else.

Image upload pipeline:
1. Multer stores temp file.
2. Service validates MIME via magic bytes (not just extension).
3. Sharp generates 320, 640, 1024, 1920px WebP + AVIF variants.
4. Uploads to storage, persists `media` row.
5. Returns the canonical URL set.

## 6. Auth and authorization

- **Identification:** email + password only in v1; SSO (Google Workspace) deferred.
- **Hashing:** bcrypt cost 12.
- **Tokens:** 15-min JWT access + 30-day refresh (opaque, hashed in DB).
- **Cookies:** access token kept in memory (or short-lived cookie); refresh in `__Host-` cookie, httpOnly, Secure, SameSite=Strict.
- **CSRF:** double-submit token on state-changing requests when cookie auth is used.
- **Rate limiting:** 5 failed logins / 15 min per email + IP; lockout with email notice after 10.
- **Authorization:** middleware reads role off the verified token and gates routes. Frontend mirrors the check for UX but is **never** the source of truth.

Role matrix:

| Capability              | user | admin | super |
| ----------------------- | :--: | :---: | :---: |
| Read public content     | ✓    | ✓     | ✓     |
| Submit contact form     | ✓    | ✓     | ✓     |
| Create/edit content     |      | ✓     | ✓     |
| Publish content         |      | ✓     | ✓     |
| Upload media            |      | ✓     | ✓     |
| Manage users / roles    |      |       | ✓     |
| Manage site settings    |      |       | ✓     |
| Read audit log          |      |       | ✓     |

## 7. Observability

- **Logs:** Pino JSON in prod, request ID per request, no PII in messages.
- **Metrics:** `prom-client` exposes `/metrics` for the API; CDN exposes its own.
- **Errors:** Sentry on both ends with source maps uploaded at build.
- **Uptime:** external pinger hits `/api/v1/health` every 60s.
- **Real-user monitoring:** Web Vitals beacon to a small `/api/v1/rum` endpoint, aggregated nightly.
- **Page-level analytics:** Plausible (cookieless, GDPR-friendly).

## 8. Local development

`docker-compose.yml` brings up PostgreSQL + MailHog. Frontend and backend run on the host for fast iteration. See `README.md` quick start.

## 9. Production deployment

Detailed in `docs/DEPLOYMENT.md`. In short:

- Frontend: build → upload to S3 → invalidate CDN.
- Backend: container → registry → blue/green on the host.
- DB: managed Postgres; migrations run from CI before backend rollout.
- Secrets: stored in the host's secrets manager, never in git.
