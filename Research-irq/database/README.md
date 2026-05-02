# Database

PostgreSQL 16. Plain SQL migrations applied in order, tracked in `schema_migrations`. The application talks to this DB via Kysely (typed query builder).

## Files

- `migrations/NNNN_<name>.up.sql` — forward migration, transactional
- `migrations/NNNN_<name>.down.sql` — rollback (manual only)
- `schema.sql` — generated snapshot, kept in sync with `pg_dump --schema-only`
- `seed.sql` — dev/test seed data

## Workflow

```bash
# Local dev DB up via the project's docker-compose
docker compose up -d db

# Apply migrations
cd ../backend && npm run migrate

# Refresh schema snapshot after a migration
pg_dump --schema-only --no-owner --no-privileges $DATABASE_URL > database/schema.sql
```

See `../skills/database-postgres/SKILL.md` for the rules of the road.
