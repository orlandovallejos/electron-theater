# 2. TMDB calls live in the main process

- **Status:** Accepted
- **Date:** 2026-11-06

## Context

The renderer used to read `API_URL` and `APP_TOKEN` through a `GET_ENV_VARS` IPC call and then call TMDB
with axios. That put the TMDB token in the renderer's memory, where any script that runs in the page
(a compromised dependency, an XSS bug) can read it. The renderer also ran with `webSecurity: false`
(to allow those cross-origin calls), which is the root of several Electron security warnings.

The goal of milestone M2 is that the token never reaches the renderer.

## Decision

The main process owns the token and makes every TMDB request.

- `src/main/tmdb.ts` builds an axios client from `process.env` (loaded by dotenv) and exposes one function
  per use case. Response transforms (`tmdbTransforms.ts`) run in the main process too.
- `main.ts` registers one `ipcMain.handle` per `TMDB_*` channel. The renderer calls them with
  `ipcRenderer.invoke`, so each call is a request/response pair that rejects on failure.
- The preload script exposes a typed `window.electron.tmdb` object (`TmdbApi` in `src/types`). It has no
  generic "send any channel" or "get env vars" function for TMDB.
- `src/api/Movies.ts` stays as a thin wrapper over `window.electron.tmdb`, so components and their tests
  keep the same method names.
- Ids coming from the renderer are validated in main (digits only) and URL-encoded before they are put in
  a request path, so the renderer cannot steer a request to another TMDB endpoint.
- Channel names live in one file, `src/constants/appEvents.cjs`, with types in `appEvents.d.cts`. Main and
  preload both import it (this also closes #45).

## Consequences

- The token is only in the main process. `getEnvVars` is gone, and nothing in the renderer holds a secret.
- `webSecurity: false` is no longer needed for TMDB, so it can be removed (planned in #71).
- Errors reach the renderer as an `Error` with a message, not as an axios `response` object. Renderer code
  must not depend on axios error details.
- Adding an endpoint takes three edits (client, channel constant, handler plus preload entry). That is the
  accepted price of a small, explicit API surface.
- The renderer can still make the main process send requests to TMDB with a valid id. That is by design.

## Alternatives considered

- **Keep calls in the renderer and hide the token behind a proxy server:** adds a server to run and
  deploy for a desktop app that otherwise needs none.
- **One generic `request(path)` IPC channel:** less code, but it lets the renderer ask for any path with
  the token attached, which defeats the point.
- **Intercept renderer requests in main and add the header (`webRequest`):** the renderer would still
  build the requests and the rules would be easy to get wrong.
- **`ipcRenderer.send` plus reply events:** works, but needs manual correlation of replies and has no
  error propagation. `invoke`/`handle` gives both.
