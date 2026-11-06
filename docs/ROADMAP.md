# Electron Theater — Roadmap

> How many times have you sat on the couch with no idea what to watch, scrolling endlessly?
> Electron Theater lets two people swipe through movies and shows. When both like the same
> title, it's a **match**, and it goes onto a shared list. Tinder, but for movies.

This document explains where the project is today, where it's going, and how the work is
organized. It is a living document: it's updated whenever a milestone closes or the plan changes.

**Contents**
1. [Why this project exists](#1-why-this-project-exists)
2. [Current state](#2-current-state)
3. [Known problems](#3-known-problems)
4. [Milestones](#4-milestones)
5. [How work is organized](#5-how-work-is-organized)

---

## 1. Why this project exists

The project was started in 2021 and paused after the movie detail view shipped. It's being
revived with two goals:

1. **Learning:** a real codebase for practising modern engineering: Electron security, dependency
   upgrades, CI/CD, testing, real-time systems (WebSockets), and AI agents.
2. **Showing the work:** every change is planned in an issue, built on a branch, described in a
   pull request, and reviewed, so the history shows the process as well as the code.

## 2. Current state

Electron desktop app with a React renderer, built on
[electron-react-boilerplate](https://github.com/electron-react-boilerplate/electron-react-boilerplate),
using [The Movie Database (TMDB)](https://www.themoviedb.org/) API.

| Area | What exists | Where |
|---|---|---|
| Home | Random hero banner, rows of trending movies and TV shows, poster borders tinted from the artwork (`node-vibrant`) | `src/renderer/Home` |
| Detail view | Backdrop, poster, rating ring, tagline, overview, YouTube trailer modal, status / language / budget / revenue | `src/renderer/MovieView` |
| Window | Frameless window with custom close / minimize / fullscreen controls over IPC | `src/main`, `src/renderer/common/AppBar` |
| Data | axios client with auth interceptor; response transforms for movies and series | `src/api`, `src/config` |

**Not built yet:** the core idea. There are no accounts, no swiping, no matches, and no shared list.

## 3. Known problems

Found while reviewing the code before restarting. Each one maps to a milestone below.

### Bugs → M3
- The detail view only re-fetches when `movieId` changes, so going from one TV show to another shows stale data.
- The hero's **Trailer** and **Watchlist** buttons have no handlers.
- The detail page's left column only shows the title. Credits, keywords, and similar titles are fetched but never used.
- If the TMDB configuration request fails, the app renders a blank screen forever. There are no loading or error states.
- `AppBar` re-adds its scroll listener on every render.

### Security → M2
- `webSecurity: false` on the main window.
- The TMDB token is sent to the renderer over IPC, so it's readable from DevTools.
- Icons are loaded from a CDN at runtime, and there's no Content Security Policy.
- Uses the deprecated `new-window` event instead of `setWindowOpenHandler`.

### Hygiene → M0
- Package metadata still identifies the app as electron-react-boilerplate, and auto-update points at the boilerplate's repo.
- The git pre-commit hook never runs: husky 7 is installed, but the config uses the husky 4 format.
- IPC channel names are duplicated in two files.

### Outdated stack → M1
Node 14, Electron 15, React 17, React Router 5, TypeScript 4.4, axios 0.23, Jest 27, Enzyme, `@mui/joy` alpha.

## 4. Milestones

Milestones are ordered: foundation and safety first, then features. Each one has a clear
"done when", so it's obvious when it can close.

| | Milestone | Goal | Done when |
|---|---|---|---|
| M0 | [Project Foundation](https://github.com/orlandovallejos/electron-theater/milestone/1) | Run the repo like a professional project | Every PR runs CI, and a new contributor can run the app from the README alone |
| M1 | [Stack Modernization](https://github.com/orlandovallejos/electron-theater/milestone/2) | Pay down dependency debt, one upgrade per PR | Supported versions everywhere, no deprecated APIs, tests pass |
| M2 | [Security & Architecture](https://github.com/orlandovallejos/electron-theater/milestone/3) | Follow Electron's security checklist | The API token never reaches the renderer; no Electron security warnings |
| M3 | [Bug Fixes & UX Polish](https://github.com/orlandovallejos/electron-theater/milestone/4) | Make existing features reliable | No known bugs; every screen handles failure; coverage threshold met |
| M4 | [Watchlist & Persistence](https://github.com/orlandovallejos/electron-theater/milestone/5) | Save what you want to watch | The watchlist survives restarts and is tested |
| M5 | [Match — Real-time Multiplayer](https://github.com/orlandovallejos/electron-theater/milestone/6) | Build the core idea | Two users on different machines pair, swipe, and see a match appear live |
| M6 | [AI Movie Agent](https://github.com/orlandovallejos/electron-theater/milestone/7) | "What should we watch tonight?" assistant | Grounded recommendations from real data and both partners' tastes |
| M7 | [Release & Quality](https://github.com/orlandovallejos/electron-theater/milestone/8) | Ship it like a real product | Tagging a release produces installable, auto-updating builds |

### Learning map

| Milestone | Skills practised |
|---|---|
| M0 | GitHub workflow, CI with GitHub Actions, documentation, ADRs |
| M1 | Safe incremental upgrades, build tooling, test migration |
| M2 | Electron process model, IPC design, CSP, secrets handling |
| M3 | React data fetching (TanStack Query), error handling, testing |
| M4 | Local persistence (electron-store or SQLite), state management |
| M5 | Backend design, auth, WebSockets, Docker, deployment |
| M6 | LLM tool use, agent design, streaming, MCP |
| M7 | E2E testing (Playwright), code signing, auto-update, observability |

## 5. How work is organized

```
Milestone ──▶ Issue ──▶ Branch ──▶ Commits ──▶ Pull request ──▶ Review ──▶ Squash merge
   M0          #12     docs/12-…   docs: …      "Closes #12"
```

- **Issues** state the problem, the proposal, and a checklist of acceptance criteria. Each has a
  milestone and labels: `type: …` (bug, feature, docs, chore, refactor, security, tech-debt,
  test, ci), `area: …` (main, renderer, api, backend, ai, infra), and `priority: …`.
- **Branches** are named `<type>/<issue-number>-<short-slug>`, e.g. `fix/14-movieview-stale-series`.
- **Commits** follow [Conventional Commits](https://www.conventionalcommits.org/), e.g.
  `fix: refetch series when the route changes`.
- **Pull requests** are small and focused, link their issue with `Closes #N`, and say how the change was tested.
- **Decisions** with real trade-offs are recorded as ADRs in `docs/adr/` (see #20).

Full contribution guidelines: `CONTRIBUTING.md` (coming in #18).
