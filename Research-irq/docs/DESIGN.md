# Design system

The site needs to feel like a serious institution: confident, considered, quiet. The visual language draws on academic publishing — generous whitespace, restrained color, real typography hierarchy — translated to a modern responsive web.

## 1. Voice and posture

- **Confident, not loud.** No shout-y CTAs. Plain language.
- **Editorial.** Body type is the hero on content pages.
- **Quiet color.** Color earns its place; default surfaces are paper-toned.
- **Mobile first.** Every layout is sketched at 360px before scaling up.

## 2. Color tokens

A "soft palette" anchored on a deep navy primary, warm neutrals, and a single quiet accent. All tokens have a light and dark variant. WCAG AA contrast verified for every text/background pair we ship.

### Light theme (default)

| Token                          | Hex       | Usage                              |
| ------------------------------ | --------- | ---------------------------------- |
| `--color-bg`                   | `#FAF7F2` | Page background (warm off-white)   |
| `--color-surface`              | `#FFFFFF` | Cards, modals                      |
| `--color-surface-muted`        | `#F2EEE6` | Sectional backgrounds              |
| `--color-border`               | `#E5DFD3` | Hairline borders                   |
| `--color-border-strong`        | `#C9C0AC` | Emphasized borders                 |
| `--color-text`                 | `#1F2A37` | Body text                          |
| `--color-text-muted`           | `#566273` | Secondary text                     |
| `--color-text-faint`           | `#8A93A3` | Captions, metadata                 |
| `--color-primary`              | `#1E3A5F` | Headings, links, primary buttons   |
| `--color-primary-hover`        | `#162A45` | Hover state                        |
| `--color-accent`               | `#A87C3F` | Quiet gold for highlights, badges  |
| `--color-accent-soft`          | `#EFE3CC` | Accent fill, callout backgrounds   |
| `--color-success`              | `#2F6B4A` |                                    |
| `--color-warning`              | `#9A6A1A` |                                    |
| `--color-danger`               | `#9A2A2A` |                                    |
| `--color-focus-ring`           | `#1E3A5F` | 2px outside ring for keyboard      |

### Dark theme

| Token                          | Hex       |
| ------------------------------ | --------- |
| `--color-bg`                   | `#11141A` |
| `--color-surface`              | `#181C24` |
| `--color-surface-muted`        | `#1F2530` |
| `--color-border`               | `#2A3140` |
| `--color-text`                 | `#ECEAE3` |
| `--color-text-muted`           | `#B0B4BD` |
| `--color-primary`              | `#9DB7D9` |
| `--color-accent`               | `#D6B27A` |

## 3. Typography

We pair a serif for headings (editorial gravitas) with a humanist sans for UI and body text (modern readability).

- **Headings:** *Source Serif 4* (or *Crimson Pro* as a free fallback). Weights 400, 600.
- **Body / UI:** *Inter*. Weights 400, 500, 600.
- **Mono:** *JetBrains Mono* for code blocks (rare on this site).

Self-host both via `@fontsource`, subset to Latin, preload the body weight, lazy-load the rest.

### Type scale (rem, mobile → desktop)

| Token         | Mobile | Desktop | Use                            |
| ------------- | ------ | ------- | ------------------------------ |
| `text-display`| 2.25   | 3.5     | Hero h1 (institute name)       |
| `text-h1`     | 1.875  | 2.5     | Page titles                    |
| `text-h2`     | 1.5    | 1.875   | Section titles                 |
| `text-h3`     | 1.25   | 1.5     | Subsections                    |
| `text-h4`     | 1.125  | 1.25    | Card titles                    |
| `text-body`   | 1      | 1.0625  | Default                        |
| `text-small`  | 0.875  | 0.9375  | Metadata                       |
| `text-caption`| 0.8125 | 0.8125  | Image captions, footnotes      |

Body line-height 1.65 on long-form pages, 1.5 on UI. Measure target 60–75 characters on prose pages.

## 4. Spacing and layout

8-point grid: 4, 8, 12, 16, 24, 32, 48, 64, 96 px.

Container widths:
- `max-w-prose` 65ch for article body.
- `max-w-content` 1080px for landing/section pages.
- `max-w-wide` 1280px for media-rich layouts.

Page gutter: 16px on mobile, 24px tablet, 48px desktop.

## 5. Components

### Header
- 72px tall, sticky, white surface with hairline bottom border.
- **Logo** top-left at 40×40px (32×32 on mobile).
- Centered nav: *Research · People · Topics · Events · About · Contact*.
- Right side: search icon, *Subscribe* CTA, theme toggle.
- Admin signed-in users see a quiet "Admin →" link in place of *Subscribe*.

### Hero (home)
- Full-bleed warm-paper background, no image.
- **Institute name centered** in *Source Serif 4* at `text-display`, weight 600.
- One-line tagline below in `text-h3` muted.
- Two CTAs: primary *Read the latest research*, ghost *About the institute*.
- Subtle gold horizontal rule beneath title.

### Cards
- White surface, 12px radius, 1px hairline border, no shadow at rest.
- 24px padding desktop, 16px mobile.
- Hover: border-strong + 2px translateY.

### Buttons
- Primary: filled `--color-primary`, white text, 8px radius, 44px min-height.
- Ghost: transparent, 1px border, primary text on hover.
- Quiet text-link buttons for secondary actions.
- Disabled state: 50% opacity, no pointer events.

### Forms
- Labels above inputs, never placeholder-as-label.
- Inputs 44px tall, 1px border, 8px radius.
- Error text below input in `--color-danger`, with `aria-describedby` wiring.
- Required fields marked with a small `*` and the word "required" in label for screen readers.

### Tables (admin)
- Zebra rows on `--color-surface-muted`.
- Sticky header on long tables.
- Row actions in an overflow menu, never a row of icons.

## 6. Iconography

- **Lucide** icons throughout.
- 20px in body, 16px inline, 24px in nav. Stroke 1.75.
- Decorative icons get `aria-hidden="true"`. Functional icons get an `aria-label`.

## 7. Imagery and media

- Photos color-graded toward warm neutrals, low saturation.
- Always provide alt text. Decorative images use empty alt.
- Author/portrait images: 1:1, 320px served, displayed at up to 160px.
- Hero images on article pages: 16:9, 1920×1080 max.

## 8. Motion

- Default transition 150ms `cubic-bezier(0.2, 0, 0, 1)`.
- Fade + 4px translate on cards/menus. No bouncing, no parallax.
- Respect `prefers-reduced-motion`: drop transforms, keep opacity at 0ms.

## 9. Accessibility (designed in, not bolted on)

- Color contrast AA minimum on all text; AAA where the design allows.
- Focus ring is **always visible** for keyboard users — `2px solid var(--color-focus-ring)` with 2px offset.
- All interactive elements ≥ 44×44px hit area.
- Heading order strict: every page has exactly one h1, headings nest in order.
- Form errors associated via `aria-describedby`; live regions for async errors.
- Skip-to-content link as first focusable element.
- Site works at 200% zoom and at 320px viewport without horizontal scroll.

## 10. Page templates

The site uses six templates. Designs sketched in `docs/wireframes/` (to be added).

1. **Home** — Hero (centered name), three featured research items, recent events strip, mission excerpt, newsletter CTA.
2. **Index** (research, people, events) — Filter bar + responsive grid.
3. **Article / Publication detail** — Reading-optimized single column, sidebar metadata on desktop.
4. **Person profile** — Portrait, role, bio, recent work, contact.
5. **Static page** (About, Mission) — Editorial layout with image slot.
6. **Admin dashboard** — Two-column app shell, content list view, form view.

## 11. Admin design notes

- Same tokens, but `--color-bg` is `--color-surface-muted` to differentiate from public site at a glance.
- A persistent role pill in the header (`Admin`, `Super`) makes power obvious.
- Destructive actions ask for typed confirmation ("type *delete* to confirm").
- The editor is full-width on desktop with a live preview pane behind a toggle.

## 12. Logo placement spec

- Top-left of header.
- 40×40px on desktop, 32×32px on mobile.
- 16px left padding from the page gutter.
- Vertically centered against the 72px header.
- Provide both a full-color SVG and a single-color SVG for dark backgrounds.
- Wordmark appears next to the symbol on screens ≥ 1024px wide; symbol-only below.

## 13. Brand placeholders

Until the institute name is finalized, use:

- Display name: *Institute for Policy, International Studies & History*
- Short name: *IPISH*
- Tagline: *Independent research on the questions that shape public life.*
