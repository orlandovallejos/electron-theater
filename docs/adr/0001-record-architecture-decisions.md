# 1. Record architecture decisions

- **Status:** Accepted
- **Date:** 2026-11-06

## Context

Upcoming milestones involve real trade-offs: which build tooling to use, how to persist the watchlist,
which WebSocket library to pick, where the AI agent runs. Months from now, the code will show *what* was
chosen but not *why*, and the options that were rejected will be forgotten. The project is also meant to
show its engineering process (see the roadmap), so the reasoning should be visible.

## Decision

We will record each architecturally significant decision as an Architecture Decision Record (ADR), following
the format described by Michael Nygard in
["Documenting Architecture Decisions"](https://cognitect.com/blog/2011/11/15/documenting-architecture-decisions).

- ADRs live in `docs/adr/` as numbered Markdown files: `NNNN-short-title.md`.
- New ADRs start from [`0000-template.md`](0000-template.md) and are listed in the [index](README.md).
- An ADR is added in the same pull request as the change it describes, or in an earlier one.
- Accepted ADRs are not edited to change the decision. To reverse one, write a new ADR and mark the old one
  "Superseded by NNNN". Typos and links can be fixed in place.

Write an ADR when a choice is hard to reverse, affects several parts of the app, or has real alternatives
(a new framework, storage engine, protocol, or security boundary). Do not write one for routine changes,
bug fixes, or small dependency bumps.

## Consequences

- The reasoning behind big choices is easy to find and review.
- Each significant decision costs a short write-up, which is the intended trade-off.
- ADRs can go stale if they are not marked superseded. Reviewers should check for this.

## Alternatives considered

- **Put decisions in the pull request description only:** PRs are hard to search later and are not part of the repository.
- **Keep one long design document:** it gets edited in place, so the history of *why things changed* is lost.
- **Do nothing:** cheapest now, but the rationale is lost, which defeats the learning and showcase goals.
