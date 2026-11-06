// Single source of truth for IPC channel names. It is a CommonJS file because the
// preload script is plain JavaScript loaded by Electron; TypeScript reads the types
// from appEvents.d.cts.
const events = {
  CLOSE_APP: 'close-app',
  FULL_SCREEN_APP: 'full-screen-app',
  MINIMIZE_APP: 'minimize-app',
  MAXIMIZE_APP: 'maximize-app',
  TMDB_GET_CONFIGURATION: 'tmdb:get-configuration',
  TMDB_GET_TOP_MOVIES: 'tmdb:get-top-movies',
  TMDB_GET_TOP_SERIES: 'tmdb:get-top-series',
  TMDB_GET_MOVIE: 'tmdb:get-movie',
  TMDB_GET_MOVIE_TRAILER: 'tmdb:get-movie-trailer',
  TMDB_GET_SERIE: 'tmdb:get-serie',
  TMDB_GET_SERIE_TRAILER: 'tmdb:get-serie-trailer',
};

module.exports = events;
