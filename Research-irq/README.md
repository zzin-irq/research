# Research Institute Website

A modern web platform for a research institute focused on public policy, international relations, history, and adjacent fields.

> **Working title:** *Institute for Policy, International Studies & History* (IPISH) — placeholder, to be replaced.

## Stack at a glance

| Layer       | Technology                                        |
| ----------- | ------------------------------------------------- |
| Frontend    | React 18 + Vite + React Router + Tailwind CSS     |
| Backend     | Node.js 20 + Express + TypeScript                 |
| Database    | PostgreSQL 16 (local via Docker)                  |
| Auth        | JWT access tokens + httpOnly refresh, bcrypt      |
| Storage     | Local filesystem in dev, S3-compatible in prod    |
| Tests       | Vitest, React Testing Library, Supertest, Playwright |
| CI/CD       | GitHub Actions → staging → prod                   |
| Hosting     | Frontend on CDN (Vercel/CloudFront), API on Node host, DB managed |

## Repository layout

```
Research-irq/
├── frontend/         React SPA + admin dashboard
├── backend/          Express REST API
├── database/         SQL schema, migrations, seed data
├── storage/          Local file uploads (gitignored in prod)
├── docs/             Architecture, design, security, testing docs
├── .claude/skills/   Skill files guiding Claude on this codebase
├── docker-compose.yml
├── .env.example
└── README.md
```

## Where to start

1. Read **`PLAN.md`** for the full implementation roadmap.
2. Read **`docs/ARCHITECTURE.md`** for the system design.
3. Read **`docs/DESIGN.md`** for the visual design system.
4. Read **`docs/SECURITY.md`** before touching auth or admin routes.
5. Read **`docs/TESTING.md`** before opening a PR.

## Quick start (once scaffolded)

```bash
cp .env.example .env                # edit secrets
docker compose up -d db             # start PostgreSQL
cd database && npm run migrate      # apply schema
cd ../backend && npm install && npm run dev
cd ../frontend && npm install && npm run dev
```

Frontend runs on `http://localhost:5173`, API on `http://localhost:4000`.

## Contact

Maintainer: plainfield2025@gmail.com
