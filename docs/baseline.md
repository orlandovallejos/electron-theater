# Baseline build

What works and what doesn't **before any modernization work**, so later PRs can show what they fixed or broke.

> The project used Yarn 1 when this was written. It now uses npm ([ADR 3](adr/0003-use-npm.md)), so `yarn X`
> below is `npm run X` today (`npm install`, `npm start` and `npm test` need no `run`).

- **Date:** 2026-11-05
- **Commit:** `1d5fa60` (`main`)
- **Machine:** macOS (Apple Silicon, arm64), Yarn 1.22.22

## Environment deviation: Node 16 instead of Node 14

`.nvmrc` pins Node **14.15.0**, but that version has no native Apple Silicon build and needs Rosetta,
which was not installed. This baseline was taken with **Node 16.20.2** (npm 8.19.4) instead. Results on
Node 14 / x86_64 may differ slightly. Tracked by the M1 stack-modernization work.

## Summary

| Command        | Result                 | Details                                                                                              |
| -------------- | ---------------------- | ---------------------------------------------------------------------------------------------------- |
| `yarn install` | Passes (with warnings) | 70 s                                                                                                 |
| `yarn start`   | Starts, with an error  | Dev server and Electron window come up; devtools extension install fails                             |
| `yarn lint`    | **Fails**              | Crashes on TypeScript errors in `.erb` configs; with that worked around, 14 lint errors              |
| `yarn test`    | **Fails**              | Needs `yarn build` first; once built, 12/12 suites and 17/17 tests pass but coverage thresholds fail |
| `yarn build`   | Passes                 | ~11 s, main and renderer both build                                                                  |

## Details

### `yarn install` — passes

Exit 0. The `postinstall` script (native deps, webpack DLL) completes. Warnings only:

- `styled-components@5.3.3` has unmet peer dependency `react-is@>= 16.8.0`.
- `enzyme-adapter-react-16` (and its helpers) expect React 16; the project uses React 17.

Suspected cause: outdated stack (M1).

### `yarn start` — starts, with an error

The webpack dev server comes up on `http://localhost:1212/` and Electron launches the main process.
Observed output:

- `DeprecationWarning: 'onBeforeSetupMiddleware' option is deprecated` (webpack-dev-server).
- `Error: Invalid header: Does not start with Cr24` from `unzip-crx-3` while installing the React
  DevTools extension in development. The app keeps running.
- `Skip checkForUpdatesAndNotify because application is not packed` (expected in development).

Not verified visually: `.env.development` ships `APP_TOKEN=your-token`, so TMDB requests need a real token
to show content. The app is documented to render a blank screen when the configuration request fails
(see `docs/ROADMAP.md`, "Known problems").

Suspected cause for the extension error: the devtools extension download is incompatible with the
current Electron/Chrome extension format (M1). Tracked by #28.

### `yarn lint` — fails

Two separate problems:

1. **Crash before linting any file.** Every file fails with TypeScript errors (about 115 across the
   `.erb/configs/webpack.config.renderer.dev.ts` type-checks, e.g. `TS2306`, `TS2322`, `TS2741`) raised by `ts-node` when ESLint's import resolver loads
   `webpack.config.eslint.ts`. The `lint` script does not set `TS_NODE_TRANSPILE_ONLY=true`, unlike the `start` and
   `build` scripts. Suspected cause: type drift between `webpack` typings and the config files.
2. **With `TS_NODE_TRANSPILE_ONLY=true` set, ESLint runs and reports 14 errors** (0 warnings), 11 auto-fixable:
   - 10 × `prettier/prettier`
   - 2 × `react/require-default-props` (e.g. `PosterItem` `baseUrl`)
   - 1 × `react/jsx-fragments`
   - 1 × `react-hooks/exhaustive-deps` (missing `serieId` dependency in `MovieView`)

Tracked by #25.

### `yarn test` — fails

1. **Run on a fresh clone, all 12 suites fail** with `The main process is not built yet. Build it by
running "npm run build:main"` (from `.erb/scripts/check-build-exists.ts`). Tests depend on a prior build.
2. **After `yarn build`, all 12 suites pass (17 tests)** but the command still exits 1 because the global
   coverage thresholds are not met:

   | Metric     | Actual | Threshold |
   | ---------- | ------ | --------- |
   | Statements | 65.08% | 75%       |
   | Branches   | 31.25% | 70%       |
   | Functions  | 40%    | 70%       |
   | Lines      | 65.52% | 75%       |

Tracked by #26 (build requirement) and #27 (coverage).

### `yarn build` — passes

Exit 0. Main and renderer bundles build. Only `Browserslist: caniuse-lite is outdated` is reported.

## Notes for contributors

- Running `yarn lint` from a git worktree nested inside another checkout of this repo can fail with
  `ESLint couldn't find the config "erb"`, because ESLint also picks up the parent checkout's `.eslintrc.js`.
  This is an environment quirk, not a repository bug; use `--no-eslintrc -c .eslintrc.js` there.
- `yarn install` modifies the tracked file `release/app/node_modules/.yarn-integrity`.
