# Deployment

## 1. Environments

| Env       | URL                                  | Purpose                            |
| --------- | ------------------------------------ | ---------------------------------- |
| `local`   | `http://localhost:5173`              | Engineer's machine                 |
| `staging` | `https://staging.<domain>`           | Pre-prod mirror, QA + UAT          |
| `prod`    | `https://www.<domain>`               | The real thing                     |

Staging mirrors prod in shape (same host, same DB engine version, same env vars) but uses non-real data and a separate Sentry project.

## 2. Targets

- **Frontend** — built static assets uploaded to S3-compatible storage and served via CDN (CloudFront / Cloudflare). One bucket per environment.
- **Backend** — container image deployed to a Node host (Render, Fly, or a small EC2 + ALB). Two replicas behind a load balancer. Health check on `/api/v1/health`.
- **Database** — managed Postgres (RDS, Neon, or similar). Daily snapshot + point-in-time recovery.
- **Object storage** — Cloudflare R2 in prod with lifecycle rules; local FS in dev.

## 3. CI/CD

GitHub Actions:

- `ci.yml` — lint, typecheck, unit, integration, E2E, Lighthouse, audit. Runs on PR and on `main`.
- `deploy-staging.yml` — on push to `main` after CI passes: build images, run DB migrations against staging, deploy backend, build + upload frontend, invalidate CDN, run smoke E2E.
- `deploy-prod.yml` — manual trigger on a tag `vX.Y.Z`: same steps as staging against prod, but requires approval.

Migration order is strict: DB → backend → frontend. Backwards-compatible migrations only; if a destructive change is needed, it ships across two releases.

## 4. Build

Frontend:
```bash
cd frontend
npm ci
npm run build         # outputs frontend/dist
```

Backend:
```bash
cd backend
npm ci
npm run build         # tsc → dist/
docker build -t research-api:${SHA} .
```

## 5. Configuration

Environment variables — full list in `.env.example`. Categorized:

- Secrets (DB URL, JWT keys, mail provider, storage credentials).
- Public knobs (frontend origin, log level, feature flags).
- Operational (NODE_ENV, PORT, TRUST_PROXY).

Frontend gets only `VITE_*` vars at build time; never secrets.

## 6. Health and monitoring

- `/api/v1/health` returns 200 with `{ db: 'ok' }` or 503.
- Uptime monitor pings every 60s from two regions.
- Sentry: API + frontend, separate projects.
- Logs stream to a managed log host with 30-day retention.
- Plausible (or similar privacy-friendly) for traffic.

## 7. Backups

- Postgres: daily logical backup `pg_dump --format=custom`, off-site, 30-day retention. PITR via the managed provider.
- Object storage: cross-region replication on the media prefix.
- Backups encrypted at rest. Restoration drill documented in §10.

## 8. Rollback

- **Frontend** — re-upload previous bundle, invalidate CDN. The bundle is content-hashed so revert is instant.
- **Backend** — redeploy previous image tag. Two replicas → blue/green flip.
- **DB migration** — every migration ships with a `down.sql` peer. We **don't** auto-run downs; rollback is a deliberate human decision.

## 9. Domains and TLS

- Apex `<domain>` 301 → `www.<domain>`.
- TLS via Let's Encrypt or the host's managed certs.
- HSTS preload submitted only after staging ran with HSTS for 30+ days.

## 10. Restore drill (quarterly)

1. Spin up a scratch Postgres instance.
2. Pull the most recent prod backup.
3. `pg_restore` into the scratch DB.
4. Connect a temporary backend instance to the scratch DB.
5. Run smoke tests.
6. Document time-to-restore in `docs/runbook/restore-drill.md`.
7. Tear down.

## 11. Incident response

- Pager rotation: one engineer at a time in v1.
- Sev 1 (site down): respond ≤ 15 min, post status update within 30 min.
- Sev 2 (degraded): respond ≤ 1h.
- Postmortem within 5 working days, no-blame, lands in `docs/incidents/`.

## 12. Cost guardrails

- Monthly budget alarm via the cloud provider.
- CDN egress capped per project; alert at 70%.
- Storage: lifecycle rules expire dev/test uploads after 90 days.

## 13. Decommissioning

If we ever pull this site, the runbook is:

1. Snapshot DB and object storage.
2. Hand the snapshots to the institute on encrypted media.
3. Take the site offline, return a `410 Gone` for 30 days with a redirect note.
4. Tear down infrastructure; cancel domains last.
