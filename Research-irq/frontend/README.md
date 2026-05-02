# Frontend

React 18 + Vite + TypeScript + Tailwind. Public site and admin app live in the same SPA, with route-level code splitting and role-based gating.

## Run

```bash
npm install
cp .env.example .env
npm run dev      # http://localhost:5173
```

## Scripts

```bash
npm run dev          # Vite dev server
npm run build        # production build → dist/
npm run preview      # preview the prod build
npm run typecheck    # tsc --noEmit
npm run lint         # eslint
npm run test         # vitest
npm run test:e2e     # playwright
npm run analyze      # bundle visualizer
```

## Folder structure

```
src/
├── api/             fetch wrappers + TanStack Query keys
├── components/      atoms, molecules, layouts (PageLayout, AdminLayout, …)
├── pages/
│   ├── public/      Home, ResearchIndex, ResearchDetail, People, …
│   └── admin/       Login, Dashboard, ArticleEditor, …
├── hooks/           useAuth, useDebounce
├── lib/             seo.ts, analytics.ts, sanitize.ts
├── styles/          tokens.css, tailwind.config.cjs
├── routes.tsx       central route table
└── main.tsx         entrypoint
```

## See also

- `../docs/DESIGN.md` for visual decisions
- `../docs/ARCHITECTURE.md` for the full system context
- `../skills/frontend-react/SKILL.md` for in-codebase guidance
