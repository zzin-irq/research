---
name: database-postgres
description: Use this skill for any database work in this repo — writing or reviewing migrations, schema changes, queries, indices, full-text search, seed data, or restore drills. Trigger on file paths under `database/`, on requests like "add a column", "write a migration", "tune this query", or any `.sql` file change. Do NOT use for frontend or backend application code; those have their own skills.
---

# Database (PostgreSQL) skill

PostgreSQL 16, plain SQL migrations, no ORM. The application talks to the DB via Kysely (typed query builder) in `backend/src/db/`.

## Layout

```
database/
├── schema.sql              snapshot of current schema (generated)
├── seed.sql                seed data for dev + tests
├── migrations/
│   ├── 0001_init.up.sql
│   ├── 0001_init.down.sql
│   ├── 0002_articles.up.sql
│   ├── 0002_articles.down.sql
│   └── ...
└── README.md
```

## Always do this

- **Migrations are forward-only in prod.** Each `up.sql` ships with a `down.sql`, but down is human-triggered, never automatic.
- **Backwards compatible.** A migration cannot break the previous app version. If a destructive change is needed, ship in two releases (add new → switch reads → remove old).
- **Number migrations sequentially**, four-digit zero-padded, never renumber after merge.
- **Idempotency where possible.** `CREATE TABLE IF NOT EXISTS`, `ADD COLUMN IF NOT EXISTS`. Wrap each migration in a transaction.
- **Indices for predicates we actually use.** Don't index speculatively.
- **Foreign keys with `ON DELETE`** explicit (`CASCADE`, `RESTRICT`, `SET NULL`). Never leave it implicit.
- **Timestamps in UTC**, `timestamptz`, not `timestamp`. Default `now()`.
- **`uuid` PKs** for content rows; serial ints fine for support tables (audit, sessions).
- **Slugs are unique per resource type** and immutable once published.
- **Update `schema.sql`** after every migration: `pg_dump --schema-only --no-owner --no-privileges > database/schema.sql`. The integration suite asserts this matches.
- **Never store secrets in DB columns** — passwords are bcrypt hashes; refresh tokens are SHA-256 hashes.

## Never do this

- Don't drop a column in the same migration that adds its replacement.
- Don't run a long-locking migration without `CONCURRENTLY` for index changes.
- Don't put business logic in the DB. Triggers are reserved for narrow integrity duties (e.g. maintaining `tsv` for full-text search).
- Don't reference application enums from the DB level. Use `text` + a check constraint, validated by the app.
- Don't add a unique constraint on free-text user input without a `lower()` index — emails are stored lower-cased.

## Conventions

- Naming: tables plural snake_case (`articles`, `audit_log`); columns snake_case; indices `idx_<table>_<columns>`; FKs `<table>_<col>_fkey` (default).
- Soft delete only for content (`deleted_at timestamptz`); hard delete for sessions and one-off rows.
- `created_at` / `updated_at` on every content table. `updated_at` maintained via a trigger.
- Full-text: a `tsv tsvector` column maintained by a trigger; GIN index on it; query via `plainto_tsquery`.

## Performance hygiene

- `EXPLAIN ANALYZE` any query before merging if it is on a hot path.
- Add a covering index when an admin list page introduces a new sort or filter.
- Use `LIMIT`/`OFFSET` only with an `ORDER BY` on an indexed column. Prefer keyset pagination (`WHERE id < ?`) for big tables.

## Backups and restore

- Daily `pg_dump --format=custom`, off-site, 30-day retention.
- PITR via the managed provider in prod.
- Quarterly restore drill (procedure in `docs/DEPLOYMENT.md` §10). Document drill outcomes in `docs/runbook/restore-drill.md`.

## Seeding

- `seed.sql` produces a realistic site (3 admins, 30 articles across topics, 10 people, 5 events).
- Tests truncate then re-seed per test file. Seed must run in <2s.
- Never include real user emails or photos in seeds.
