---
name: content-management
description: Use this skill when work touches the editorial / content management layer of the Research Institute site — admin UI for articles, publications, people, events, topics; the rich-text editor and its sanitization rules; media uploads as seen by editors; draft → publish workflow; user/role management UX; the audit log surface. Trigger on requests mentioning "admin", "editor", "publish", "draft", "author", "media library", "Tiptap", "rich text", or paths like `frontend/src/pages/admin/`. Do NOT use for raw SQL, generic React component work outside the admin app, or backend services unrelated to content (use the matching skill instead).
---

# Content management skill

The admin app is what makes this site useful in the long run. Editors are non-technical; the UI must be calm, friendly, and forgiving. Engineers must keep the schema → form → preview → published pipeline tight.

## Roles and what they see

- **`admin`** — sees Content (articles, publications, people, events, topics), Media library, their own Profile. No user management.
- **`super`** — sees everything `admin` does, plus Users, Site settings, Audit log.

The role pill in the top bar makes the active role obvious. Admin pages are noindex.

## Content types (v1)

| Type           | Notes                                                                  |
| -------------- | ---------------------------------------------------------------------- |
| Article        | Long-form research piece. Body via Tiptap. Topic + author required.    |
| Publication    | Formal research output (paper, report). Has PDF, DOI, year, abstract.  |
| Person         | Researcher/fellow/staff. Bio, photo, links (ORCID, university page).   |
| Event          | Talk, conference, seminar. Start/end, location, RSVP link.             |
| Topic          | Public Policy, International Relations, History, plus extensible.     |
| Page           | Static editorial pages (About, Mission, History).                      |

Each type has its own zod schema (in `backend/src/schemas/` and mirrored to `frontend/src/api/schemas/`).

## Editor experience principles

- **Schema-driven forms.** Field labels, help text, validation come from one source. Don't hand-build forms — extend `<EntityForm>` with a field config.
- **Helpful errors.** Inline, plain English ("Subtitle is too long — keep it under 200 characters"), never JSON.
- **Drafts always autosave** every 5 seconds and on blur. Show a "Saved 2s ago" indicator.
- **Live preview** alongside the form on desktop, behind a toggle on mobile.
- **Publish is two-click**: a "Ready to publish" button → confirmation dialog showing diff vs. live → confirm.
- **Unpublish** is reversible (sets `status` to `archived`). True deletion is super-only and requires typed confirmation.
- **Slug** is auto-generated from title on first save; locked once the article is published.

## Rich text rules

- Tiptap with a constrained schema:
  - Allowed marks: bold, italic, code, link.
  - Allowed nodes: paragraph, heading (h2, h3), bulletList, orderedList, blockquote, codeBlock, image, hr.
- Server runs DOMPurify on save; same allowlist as the editor.
- Images uploaded via the editor go through the same media pipeline (sharp variants, magic-byte validation).
- Links default to `target="_blank" rel="noopener noreferrer"` for external URLs.

## Media library

- Drag-drop upload, multiple at once.
- Each asset has alt text (required for `image/*`), credit, and source URL.
- Filters: type, uploaded-by, date range.
- Reuse via picker on every form. We track usage so editors know if deleting an asset will break a page.

## Audit log (super only)

- Every create, update, delete, role change, and publish action is logged.
- Diff stored as JSON (`before`, `after`).
- UI: filterable timeline, can drill into a single change.

## Draft → publish workflow

```
draft → in_review (optional) → scheduled → published → archived
```

- `scheduled` rows publish via a 1-minute cron job. We never trust client clocks.
- Publish action sets `published_at`, regenerates the sitemap entry, and pings the static-rebuild webhook.
- Unpublish moves to `archived` and removes from sitemap.

## Engineering notes

- The same zod schema validates the form on the client and the request on the server.
- The form component reads schema metadata to choose the right input (`TextField`, `RichTextField`, `MediaPickerField`, `DateField`, `MultiSelectField`).
- New content types should not require new components — extend the field config.
- Preview renders in an iframe pointed at `/preview/<id>?token=<short-lived>` so styles match production exactly.

## Don'ts

- Don't add a new "where to enter this" surface — extend the existing entity form.
- Don't ship a content type without seed examples and a Playwright "create + publish" spec.
- Don't expose the audit log to admins — super only.
- Don't allow HTML paste from the clipboard without going through the sanitizer.
