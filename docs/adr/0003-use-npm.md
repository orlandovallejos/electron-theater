# 3. Use npm as the package manager

- **Status:** Accepted
- **Date:** 2026-11-07

## Context

The project used Yarn 1 (classic) since it was created from electron-react-boilerplate in 2021. Yarn 1 only
gets maintenance fixes now. Several scripts already called `npm run` inside Yarn, so the tooling was mixed.

Milestone M3 turns the repo into a monorepo (desktop, web and mobile apps plus shared packages), and the
package manager is the base of that layout. Changing it later would mean migrating every workspace at once.
What matters most here is broad support (Electron, electron-builder, Expo / React Native, Dependabot,
GitHub Actions) and as few extra tools as possible. Install speed matters less.

This change is made on the current layout, before any folder moves (#82), so if something breaks later we
know it wasn't the package manager.

## Decision

We will use **npm**, the version that ships with the Node version in `.nvmrc` (Node 24, npm 11).

- `package-lock.json` is the lockfile; `yarn.lock` is removed. CI installs with `npm ci`.
- Yarn `resolutions` become npm `overrides`. An override for a direct dependency uses the `$name`
  reference form, as npm requires.
- Git hooks call `npx --no -- commitlint` and `npx --no -- lint-staged`.
- Monorepo workspaces will be npm workspaces (see ADR 4).

npm 11 blocks dependency install scripts unless `package.json` approves them in `allowScripts`. We approve
none. The ones in the tree today are not needed:

| Package                   | Script               | Why it's denied                                          |
| ------------------------- | -------------------- | -------------------------------------------------------- |
| `core-js`, `core-js-pure` | Funding message      | Prints a message only                                    |
| `electron-winstaller`     | Picks a 7-Zip binary | For Squirrel.Windows; our Windows target is NSIS         |
| `@parcel/watcher`         | Builds from source   | A prebuilt binary is installed as an optional dependency |

Electron itself has no install script: it downloads its binary the first time it runs. When a new
dependency needs its install script, review it and approve it with `npm install-scripts approve <pkg>`.

## Consequences

- No extra tool to install: npm comes with Node, for contributors and in CI.
- Install scripts are opt-in, which narrows what a compromised dependency can run during install.
- npm resolves some transitive versions differently from Yarn. The switch kept every direct dependency
  at the same version; the transitive changes were older duplicates that npm deduplicated, plus
  electron-builder's optional `electron-builder-squirrel-windows` peer, which npm installs and Yarn 1 did
  not. `plist` (used only when packaging) resolves to 3.1.0 everywhere, because electron-builder pins it.
- Installs are somewhat slower than with pnpm. That's acceptable for a project this size, and CI caches
  the npm cache.
- npm has no per-package `nohoist`. If hoisting breaks electron-builder in the monorepo, the workaround
  has to be found then (ADR 4).

## Alternatives considered

- **Stay on Yarn 1:** maintenance mode only, and a second migration later.
- **Yarn 4 (Berry):** modern and fast, but Plug'n'Play needs workarounds with Electron and React Native,
  and `node_modules` mode gives up most of its advantages. It also means one more tool for contributors.
- **pnpm:** the fastest and strictest. Its symlinked `node_modules` is a known source of trouble with
  electron-builder and React Native/Metro, which usually ends in `node-linker=hoisted` and loses most of
  the benefit.
