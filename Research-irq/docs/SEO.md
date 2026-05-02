# SEO and discoverability

Research institutions live and die by being findable. The site needs to be cleanly indexed, citation-friendly, and shareable.

## 1. Rendering strategy

- Public pages are statically generated where their content allows (home, about, topic indices).
- Article and person pages are server-side rendered or pre-rendered on publish.
- Admin and search pages are SPA-only and `noindex`.

## 2. URL conventions

Clean, lower-case, hyphenated, no trailing slash.

| Pattern                                  | Example                                            |
| ---------------------------------------- | -------------------------------------------------- |
| Home                                     | `/`                                                |
| Topic                                    | `/topics/public-policy`                            |
| Article                                  | `/research/post-bretton-woods-monetary-order`      |
| Person                                   | `/people/maya-rodriguez`                           |
| Event                                    | `/events/2026/europe-after-the-storm`              |
| Static                                   | `/about`, `/about/mission`                         |
| Admin                                    | `/admin/...`                                       |

Slugs are immutable once an article is published. If renamed, we add a 301 from the old slug.

## 3. Metadata

Per-page through `react-helmet-async`:

- `<title>` — page title, suffixed with the institute name.
- `<meta name="description">` — 140–160 chars, hand-written for landing pages, summary for articles.
- Canonical link.
- `<meta name="robots">` — `index, follow` on public, `noindex, nofollow` on `/admin/*` and search results.
- Open Graph + Twitter Card for shareability with a 1200×630 image per content piece.

## 4. Structured data

JSON-LD on every content page:

- **Article** — `headline`, `author` (with `Person`), `datePublished`, `dateModified`, `image`, `publisher`.
- **Person** — `name`, `jobTitle`, `affiliation`, `sameAs` (ORCID, university page).
- **Event** — `startDate`, `endDate`, `location`, `eventStatus`, `eventAttendanceMode`.
- **Organization** on the home page — `name`, `logo`, `sameAs` for social, `address`.

JSON-LD validated in CI by `schema-dts` types and a snapshot test.

## 5. Sitemap and robots

- Sitemap auto-built on every publish/unpublish event; static `sitemap.xml` at root.
- For sites with > 50k URLs, sitemap index. We're nowhere near that.
- `robots.txt`:
  ```
  User-agent: *
  Allow: /
  Disallow: /admin
  Disallow: /api
  Sitemap: https://<domain>/sitemap.xml
  ```

## 6. Performance for SEO

- Core Web Vitals are an SEO signal; budgets enforced (see `docs/TESTING.md`).
- Render-blocking JS minimized; CSS inlined for the critical path.
- Self-hosted fonts subset to needed glyphs; preload the body weight.
- Images: explicit `width`/`height`, AVIF + WebP, `loading="lazy"` below fold.

## 7. Internationalization (forward-looking)

- HTML `lang` attribute set per page.
- URL strategy reserved for v2: `/<lang>/...`.
- Content models include a nullable `locale`; default `en` in v1.

## 8. Editorial conventions for SEO

Editors are coached (and the admin UI nudges them):

- Title 50–60 chars.
- Meta description 140–160 chars; never copy the title.
- Descriptive alt text on every image (no "image of …" filler).
- Link text describes the destination ("read the 2025 monetary policy report"), never "click here".

## 9. Crawlability checks

- The home page must reach every section of the site within 3 clicks.
- A nightly job crawls the site with `simplecrawler`, asserts no broken links, no orphan pages, and all canonical URLs resolve 200.
- `noindex` accidentally on a public page would be caught by this crawler.

## 10. Accessibility ↔ SEO

The two reinforce each other. Every accessibility fix (semantic landmarks, headings in order, descriptive links, alt text) improves SEO. Treat them as one.
