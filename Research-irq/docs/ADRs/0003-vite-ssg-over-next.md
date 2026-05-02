# ADR 0003 — Vite + SSG over Next.js

Date: 2026-05-02
Status: Accepted

## Context

The site is content-heavy and SEO-critical. We considered Next.js (SSR/SSG, mature ecosystem) vs. Vite + a static-generation plugin.

## Decision

Frontend is Vite + React + a static-generation step for content pages. Admin app is SPA-only.

## Consequences

- Smaller surface area than Next.js, no Node at the edge for content.
- No built-in image component; we own the picture/avif/webp pipeline (sharp on the backend).
- Easier to host: static files on a CDN; the API is a separate, small Node service.
- If we later need on-demand rendering for personalization, we revisit and may migrate.
