# Changelog

All notable changes to this project are documented here. The format follows
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/), and versions follow
[Semantic Versioning](https://semver.org/).

## [Unreleased]

### Fixed

- TMDB images are loaded over HTTPS, so the Content Security Policy no longer blocks them.
- A failed TMDB request no longer prints the API token in the logs.
- The update check no longer causes an unhandled promise rejection when there is no release yet.

### Added

- Home screen with a hero banner and rows of trending movies and TV shows.
- Detail view with backdrop, poster, rating, overview and a YouTube trailer.
- Frameless window with custom close, minimize and fullscreen controls.

### Changed

- The repository is an npm workspaces monorepo: the desktop app is in `apps/desktop`, shared types and
  helpers in `packages/core`, and the shared Prettier, TypeScript and ESLint settings in `packages/config`.
  The commands are the same from the root. `.env` now lives in `apps/desktop/`.
- npm replaces Yarn as the package manager.
- CI builds the Linux installer on every pull request.

- Renamed the app from the electron-react-boilerplate template to Electron Theater, with its own
  app ID and update repository. The boilerplate's changelog was removed.
- Renamed the project from Electron Theater to Movie Mates, since Electron is only the desktop client.
  The app ID, the package scope (`@movie-mates/`) and the repository name changed with it.
