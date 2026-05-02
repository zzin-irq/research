# Skills for this repo

These skills guide Claude when working in this codebase. Each is a self-contained markdown file with YAML frontmatter (`name` and `description` — the trigger contract), followed by practical, prescriptive guidance.

| Skill                  | When it triggers                                               |
| ---------------------- | -------------------------------------------------------------- |
| `frontend-react`       | Anything in `frontend/` — pages, components, hooks, styling   |
| `backend-node`         | Anything in `backend/` — routes, middleware, services         |
| `database-postgres`    | Anything in `database/` — schema, migrations, queries, seeds  |
| `content-management`   | Editorial UI, publishing workflow, admin app concerns         |
| `qa-testing`           | Tests, a11y, performance, security checks, release QA         |

## Authoring guidelines

When adding or editing a skill in this folder:

- Keep the description **specific** — list exact triggers and at least one negative case.
- Lead with project-specific rules; defer general best practices to the docs.
- Prefer short, prescriptive bullets over essays.
- Include "Always do this" and "Never do this" sections.
- Link to the canonical docs (`docs/ARCHITECTURE.md`, etc.) instead of restating them.
- Update the table above when you add a skill.
