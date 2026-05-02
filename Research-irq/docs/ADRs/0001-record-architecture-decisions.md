# ADR 0001 — Record architecture decisions

Date: 2026-05-02
Status: Accepted

## Context

Decisions about technology choices, structure, and trade-offs accumulate quickly on a new project. We need a lightweight way to capture the *why* without slowing the team down.

## Decision

We will use Architecture Decision Records (ADRs), one per non-trivial choice. Each ADR is a short markdown file in `docs/ADRs/` with the format below.

```
# ADR NNNN — Title
Date: YYYY-MM-DD
Status: Proposed | Accepted | Superseded by NNNN

## Context
## Decision
## Consequences
```

ADRs are immutable once accepted. Reverse a decision by writing a new ADR that supersedes it.

## Consequences

- A clear, searchable history of why the codebase looks the way it does.
- Onboarding cost goes down.
- Slight overhead per decision; only used when the choice is non-obvious or hard to reverse.
