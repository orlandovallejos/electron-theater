# 4. Monorepo layout and shared packages

- **Status:** Accepted
- **Date:** 2026-11-07

## Context

Today the repo is one Electron app at the root. The roadmap adds a web client (M8), a mobile app (M9), a
backend (M7) and an AI agent (M10), and they should share types, logic, the API client and the design
tokens instead of copying them. M3 creates the layout for that; later milestones fill it in.

Facts that shape the decision:

- The package manager is npm ([ADR 3](0003-use-npm.md)), so workspaces are npm workspaces. npm has no
  `workspace:` protocol; a workspace depends on another with a normal version range, and npm links it.
- The desktop app uses electron-react-boilerplate's two-`package.json` setup: the root `package.json`
  holds the build tooling and dependencies that webpack bundles, and `release/app/package.json` is what
  ships inside the installer (it has no dependencies today, so no native modules).
- Webpack (`ts-loader`) and Jest (`ts-jest`) already compile TypeScript, and Metro (React Native) can
  compile TypeScript source as well.
- The goal for M3 is mechanical: move code, change no behavior, and keep CI and the installer working.

## Decision

We will use **npm workspaces** with this layout:

```
package.json         private workspace root: shared dev tooling, Git hooks, scripts that run every workspace
apps/
  desktop/           the Electron app, including its release/app package and electron-builder config
packages/
  config/            shared Prettier, TypeScript and ESLint settings
  core/              types, pure logic and response transforms
```

`apps/web`, `apps/mobile`, `packages/api-client`, `packages/ui` and `packages/screens` are added by the
milestones that give them code. **There are no empty packages.** `services/backend` (Node) will be a
workspace too; `services/agent` (Python) lives in the repo but is not an npm workspace.

**Packages are source-only TypeScript.** A package's `main` and `types` point at `src/index.ts`, and there
is no build step. Each app's bundler compiles the package with the app, and each package runs its own
tests with ts-jest. A package gets a build step only when something outside the repo needs to install it.

**Names and versions.** Each workspace has its own `package.json`. These rules say what goes in it:

- **Name:** the folder name with an `@electron-theater/` prefix, so `packages/core` is called
  `@electron-theater/core`. The prefix (an npm "scope") makes it clear that a package is ours, and it
  can't clash with a public npm package that happens to be called `core`.
- **`"private": true`:** npm refuses to publish the package, so it can't end up on the public registry
  by mistake. Our packages are only used inside this repo.
- **`"version": "0.0.0"`:** the packages are never released on their own, so their version number has
  no meaning. Only the apps have real versions (the desktop app's version is in `release/app`).
- **Depending on a package:** an app lists it with the version `"*"`. In a workspace, npm then links the
  folder from this repo instead of downloading anything, so the app always uses the current code of
  the package. (npm has no special `workspace:` syntax for this, unlike Yarn and pnpm.)

For example, `packages/core/package.json`:

```json
{
  "name": "@electron-theater/core",
  "version": "0.0.0",
  "private": true,
  "main": "src/index.ts",
  "types": "src/index.ts"
}
```

`apps/desktop/package.json` then lists it like any other dependency:

```json
{
  "name": "@electron-theater/desktop",
  "private": true,
  "dependencies": {
    "@electron-theater/core": "*"
  }
}
```

And code in the desktop app imports it by name instead of with a relative path:

```ts
// before: import { MovieItem } from '../../types';
import { MovieItem } from '@electron-theater/core';
```

**What goes where.**

| Code                                                                         | Place                                 |
| ---------------------------------------------------------------------------- | ------------------------------------- |
| Domain types (`MovieItem`, `Movie`, `Serie`, `MovieViewItem`, …)             | `core`                                |
| Pure functions with no platform APIs (date, math, image URL helpers)         | `core`                                |
| TMDB response transforms                                                     | `core`                                |
| Design tokens                                                                | `core` (in M4)                        |
| Anything that touches Electron, `window.electron`, Node-only APIs or the DOM | the app                               |
| React components and screens                                                 | the app now; `ui` and `screens` in M5 |

`core` must not import Electron, React, the DOM or Node-only modules, so it runs in every client and in
the backend.

**Tooling at the root.** husky, commitlint and lint-staged run once per repo, so they stay at the root.
Every workspace has its own `lint`, `typecheck` and `test` scripts. The root runs them with
`npm run <script> --workspaces --if-present`, so `npm test` from the root still tests everything and CI
calls the same commands as today.

**The desktop app moves as a unit.** `src/`, `.erb/`, `assets/`, `release/app` and the electron-builder
config move to `apps/desktop` with `git mv`, so history and blame are kept. electron-builder runs from
`apps/desktop`.

## Consequences

- One `npm ci` at the root installs every workspace, and dependencies are hoisted to the root
  `node_modules`. A package that every workspace needs is installed once.
- Sharing code needs no publish step and no build step: change `core`, and the desktop app picks it up on
  the next build or hot reload.
- Workspaces are symlinked into `node_modules`, but webpack and Jest resolve symlinks to their real path
  (`packages/core/src/...`). So the `exclude: /node_modules/` rule in the webpack config and Jest's default
  `transformIgnorePatterns` still compile the packages. If a tool does not resolve symlinks, it needs an
  explicit include for `packages/`.
- **Hoisting and electron-builder:** electron-builder packages the dependencies of `release/app`, which
  has none today, so hoisting should not change the installer. CI builds the installer on every PR (#85)
  to catch it if that changes. npm has no per-package `nohoist`. If a workspace ever needs its own copy of
  a package, the fix is to install it in that workspace, so npm places it in the workspace's own
  `node_modules`.
- Source-only packages tie each package to the TypeScript settings of the apps that compile it. Shared
  settings in `packages/config` keep them aligned.
- Root scripts get slightly longer, and a workspace without a script is skipped with `--if-present`.
- There is no task runner, so nothing is cached between runs and every check runs on every workspace. That
  is fine at this size. Revisit it if CI gets slow.

## Alternatives considered

- **Nx or Turborepo:** caching and running only affected workspaces help in large repos. With one app and
  two packages, they would add config and concepts without a measurable gain. Turborepo can be added
  later on top of npm workspaces without changing the layout.
- **Build each package with `tsc` (or tsup) and publish `dist/`:** a clean boundary, but it needs a build
  before every test and a watch process in development, and nothing outside the repo needs the packages.
- **TypeScript project references:** faster incremental type-checking across packages, but more config.
  Worth it when type-checking gets slow.
- **Keep the desktop app at the root and add packages next to it:** fewer moves, but the root would mix
  app files and workspace tooling, and the web and mobile apps would not sit next to the desktop app.
- **Separate repositories per client:** changes that span clients (a type in `core` and its users) would
  need coordinated releases across repos.
