# ADR 0002 — PostgreSQL as the primary data store

Date: 2026-05-02
Status: Accepted

## Context

We need a local-first database for content (articles, people, events), users, sessions, and the audit log. Options weighed: PostgreSQL, SQLite, MongoDB.

## Decision

PostgreSQL 16 in dev (via docker-compose) and prod (managed). We talk to it via the `pg` driver and Kysely (typed query builder). No heavy ORM.

## Consequences

- Strong relational integrity, mature operational story (PITR, replication).
- Postgres full-text search covers v1; we won't need a separate search service.
- More setup than SQLite, but the project has multi-user editing and the audit log benefits from concurrency primitives.
- Schema lives as plain SQL in `database/migrations/` — no ORM lock-in.
