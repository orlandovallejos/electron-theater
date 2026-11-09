# Contributing to Electron Theater

Thanks for helping out. This document explains how work flows through this repository, so changes are
easy to follow and review. The plan and milestones are in [docs/ROADMAP.md](docs/ROADMAP.md).

## Development setup

Follow [Getting started in the README](README.md#getting-started): install the Node version from
`.nvmrc`, run `npm install`, and create `apps/desktop/.env` from `apps/desktop/.env.example`.

`npm install` also sets up the Git hooks (see [Commit messages](#commit-messages)). Run the app with
`npm start`. Before opening a PR, run what CI runs:

```bash
npm run lint
npm run typecheck
npm test
npm run build
```

## Workflow

```
Issue ──▶ Branch ──▶ Commits ──▶ Pull request ──▶ Review ──▶ Squash merge
```

1. **Start from an issue.** Every change has an issue with a milestone, labels and acceptance criteria. If
   there is none, open one first (use the issue forms).
2. **Branch** from an up-to-date `main`, named as described [below](#branch-names).
3. **Commit** in small steps with [Conventional Commits](#commit-messages).
4. **Open a pull request** that links the issue with `Closes #N`, sets the milestone and labels, and says how
   it was tested. The [PR template](.github/pull_request_template.md) has the structure.
5. **Review.** Leave a review on the PR before merging. On this project there is one maintainer, and GitHub
   does not let authors approve their own PRs, so the convention is a **"Comment" review** on every PR.
6. **Squash merge.** The PR title becomes the commit message on `main`, so it must follow Conventional
   Commits too. The branch is deleted after merging.

`main` is protected: changes go through a pull request, history is linear, and the `lint`, `typecheck` and
`build` checks must pass. Nobody is exempt, including admins. Details and the exact settings are in
[docs/branch-protection.md](docs/branch-protection.md).

### Branch names

`<type>/<issue-number>-<short-slug>`, for example `fix/14-movieview-stale-series`.

`<type>` is one of the commit types below.

### Stacked pull requests

When a change depends on an unmerged one, base the second branch on the first and open its PR against the
first branch. Merge them in order. After a squash merge, rebase the next branch onto `main`
(`git rebase --onto origin/main <old-base-tip>`) before merging it.

## Commit messages

We use [Conventional Commits](https://www.conventionalcommits.org/): `<type>: <description>`, optionally
with a scope, a body and footers.

| Type       | Use for                                                 |
| ---------- | ------------------------------------------------------- |
| `feat`     | A new feature                                           |
| `fix`      | A bug fix                                               |
| `docs`     | Documentation only                                      |
| `style`    | Formatting, no code change                              |
| `refactor` | Code change that neither fixes a bug nor adds a feature |
| `test`     | Adding or fixing tests                                  |
| `chore`    | Tooling, config, housekeeping                           |
| `ci`       | CI configuration                                        |
| `build`    | Build system or dependencies                            |
| `perf`     | Performance improvement                                 |

Examples:

```
fix: refetch series when the route changes
feat(match): show a live match notification
docs: explain the .env setup
chore: bump axios to 1.x
```

Keep the description short and in the imperative mood ("add", not "added"). Explain the _why_ in the body,
with lines under 100 characters.

The rules are enforced locally by [commitlint](https://commitlint.js.org/) in a `commit-msg` hook, so a
message like `update stuff` is rejected. A `pre-commit` hook also lints the files you staged with
[lint-staged](https://github.com/okonet/lint-staged). Hooks are a fast first check, not a replacement for CI:
CI runs on every pull request and cannot be skipped.

If a commit fails with `npx: command not found`, your Git client doesn't load your shell setup (common
with nvm). Commit from a terminal, or make Node available to the client.

## Pull request expectations

- **Small and focused.** One issue per PR. Aim for roughly 300 to 500 changed lines, not counting lock files; a
  PR over about 600 lines is too hard to review, so split it. Related issues can share one PR when they fit that size.
- **Stack dependent changes.** If a change needs an unmerged one, base it on that branch. After the first is merged,
  GitHub moves the next PR to `main` and offers **Update branch**.
- **Linked issue.** `Closes #N` in the description.
- **Tested.** Say what you ran and what you saw. Add or update tests for behavior changes.
- **Screenshots** for any UI change.
- **Docs updated** where the change affects setup, scripts or behavior.
- **Honest.** If something is unfinished or unverified, say so in the description.

## Code style

- **Formatting and linting** are handled by Prettier and ESLint (Airbnb and TypeScript rules). Run
  `npm run lint`. Don't disable a rule to make a check pass without a comment explaining why.
- **TypeScript** is used throughout. Avoid `any`; type component props.
- **Comments** explain _why_, not _what_. Good names and small functions say what the code does. Comment
  non-obvious decisions, workarounds (with a link to the issue), and anything that would surprise a reader.
  Don't leave commented-out code.
- **Tests** live next to the code as `*.test.ts(x)`. Snapshots are for stable output only; review a snapshot
  diff before committing it.

## Architecture decisions

Record a decision as an Architecture Decision Record (ADR) when the choice is hard to reverse, affects several
parts of the app, or has real alternatives, such as a new framework, storage engine, protocol or security
boundary. Don't write one for routine changes, bug fixes or small dependency bumps.

Copy [`docs/adr/0000-template.md`](docs/adr/0000-template.md) to the next number, fill it in, and add it to the
[index](docs/adr/README.md), in the same PR as the change or an earlier one. See
[ADR 1](docs/adr/0001-record-architecture-decisions.md) for the full guidance.

## Review checklist

Use this when reviewing a PR, including your own.

- [ ] The PR does what the linked issue asks, and nothing unrelated
- [ ] Title and commits follow Conventional Commits
- [ ] CI is green for the required checks (`lint`, `typecheck`, `build`) and `test` passes except for the known coverage thresholds
- [ ] Tests were added or updated, and the PR says how it was tested
- [ ] No secrets, tokens or `.env` files are committed
- [ ] Docs are updated where needed
- [ ] UI changes include screenshots
- [ ] Any significant decision has an ADR
