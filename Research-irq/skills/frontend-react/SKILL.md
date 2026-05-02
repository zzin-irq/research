---
name: frontend-react
description: Use this skill when working in the `frontend/` folder of this repo — i.e. anything involving React components, pages, routing, hooks, Tailwind styling, API client code, forms, or admin UI. Trigger on file paths starting with `frontend/`, on requests like "add a page", "build a component", "wire up the admin form", or any change to JSX/TSX/CSS in this project. Do NOT use for backend (`backend/`), database SQL, or content authoring through the admin UI.
---

# Frontend (React) skill

This skill captures how the frontend of this Research Institute site is built. Read it before adding pages, components, or styling changes.

## Project shape

```
frontend/
├── src/
│   ├── api/                Fetch wrappers, TanStack Query keys
│   ├── components/         Atoms, molecules, layouts
│   ├── pages/
│   │   ├── public/         Home, research, people, events, contact
│   │   └── admin/          Login, dashboard, editors
│   ├── hooks/              useAuth, useDebounce, etc.
│   ├── lib/                seo.ts, analytics.ts, sanitize.ts
│   ├── styles/             tokens.css, tailwind.config.cjs
│   ├── routes.tsx          Centralized route table
│   └── main.tsx
└── tests/
```

## Stack

- React 18 (hooks only — no class components).
- Vite + TypeScript (strict).
- React Router 6.
- Tailwind CSS with the design tokens in `docs/DESIGN.md`.
- TanStack Query for server state; Zustand for tiny UI state.
- `react-helmet-async` for meta.
- `react-hook-form` + `zod` for forms.

## Always do this

- **Mobile first.** Start designs at 360px, scale up with `sm:`/`md:`/`lg:`.
- **Use design tokens**, not raw colors. e.g. `bg-surface`, `text-text`, `border-border`. Tokens are CSS variables defined in `src/styles/tokens.css`.
- **Type everything.** No `any`. Prefer `unknown` when the shape isn't yet known.
- **Validate at boundaries.** Forms use `react-hook-form` with a `zod` resolver. The same zod schema (or its server twin) is the runtime contract.
- **Accessible by default.** Use semantic elements (`button`, `nav`, `main`, `header`); never `<div onClick>`. Every input has a `<label>`; errors connect via `aria-describedby`.
- **One h1 per page.** Headings nest in order.
- **`<title>` and `<meta name="description">`** on every route via `react-helmet-async`. Helpers in `src/lib/seo.ts`.
- **Code-split routes** with `React.lazy` + `Suspense`. Initial JS budget ≤ 80 KB gzipped on home.
- **Images:** always `width`/`height`, `loading="lazy"` below the fold, AVIF/WebP via `<picture>`.
- **Auth-gated routes** wrap in `<RequireRole role="admin">`. Frontend gate is for UX only — the backend is the source of truth.

## Never do this

- Don't introduce a new UI library. We have Tailwind + Lucide; that's it.
- Don't use `localStorage` for tokens. Refresh tokens are in `__Host-` cookies; access tokens stay in memory.
- Don't read or write the `Authorization` header manually — the API client does it.
- Don't fetch in `useEffect`. Use TanStack Query.
- Don't sprinkle inline `style={...}` for theming — use Tailwind tokens.
- Don't render unsanitized HTML. If you absolutely must, use the `<SafeHtml>` component in `src/components/SafeHtml.tsx` (server already sanitizes; this is defense in depth).
- Don't add a route without:
  - a route-level `<title>` and meta description,
  - a Playwright spec under `tests/e2e/` if it's a critical journey,
  - keyboard navigation verified.

## Common patterns

### A new public page

1. Add a file under `src/pages/public/<Page>.tsx`.
2. Register in `src/routes.tsx` with `React.lazy`.
3. Add a `<Helmet>` block at the top.
4. Use `<PageLayout>` for consistent header/footer.
5. Compose with primitives from `src/components/`.
6. Add a unit test (component renders, accessible roles), and a Playwright spec if user-facing.

### A new form

1. Define a zod schema in `src/api/schemas/`.
2. `useForm` with `zodResolver(schema)`.
3. Inputs from `src/components/Form/*`.
4. Submit via TanStack Query mutation in `src/api/`.
5. Surface backend field errors by mapping to `setError`.

### An admin route

- Place under `src/pages/admin/`.
- Wrap in `<RequireRole role="admin">` (or `'super'` where needed).
- Admin pages set `<meta name="robots" content="noindex,nofollow">`.

## Performance budget (CI-enforced)

- Home initial JS ≤ 80 KB gzip.
- LCP < 2.5s on simulated 4G mobile.
- CLS < 0.1.
- Run `npm run analyze` to inspect the bundle.

## When in doubt

- Read `docs/DESIGN.md` for visual decisions.
- Read `docs/SECURITY.md` before touching auth or rich-text rendering.
- Read `docs/TESTING.md` before opening a PR.
