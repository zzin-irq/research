# Backend

Express + TypeScript API for the Research Institute site. Talks to PostgreSQL via Kysely (typed query builder, no heavy ORM). zod validates every public boundary.

## Run

```bash
npm install
cp .env.example .env
docker compose -f ../docker-compose.yml up -d db   # if not already up
npm run migrate
npm run dev      # http://localhost:4000
```

## Scripts

```bash
npm run dev          # tsx watch + pretty pino
npm run build        # tsc → dist/
npm run start        # node dist/server.js
npm run migrate      # apply pending SQL migrations
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm run test         # vitest
```

## Folder structure

```
src/
├── server.ts         entrypoint
├── app.ts            Express composition
├── config/env.ts     zod-validated env
├── db/               pg pool + Kysely + migrations runner
├── routes/
├── controllers/
├── services/
├── middleware/
├── schemas/
├── jobs/
└── lib/              hashing, mail, storage adapters
```

## See also

- `../docs/ARCHITECTURE.md` for system context
- `../docs/SECURITY.md` for the security baseline
- `../skills/backend-node/SKILL.md` for in-codebase guidance
