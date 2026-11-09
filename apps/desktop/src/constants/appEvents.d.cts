declare const events: {
  readonly CLOSE_APP: 'close-app';
  readonly FULL_SCREEN_APP: 'full-screen-app';
  readonly MINIMIZE_APP: 'minimize-app';
  readonly MAXIMIZE_APP: 'maximize-app';
  readonly TMDB_GET_CONFIGURATION: 'tmdb:get-configuration';
  readonly TMDB_GET_TOP_MOVIES: 'tmdb:get-top-movies';
  readonly TMDB_GET_TOP_SERIES: 'tmdb:get-top-series';
  readonly TMDB_GET_MOVIE: 'tmdb:get-movie';
  readonly TMDB_GET_MOVIE_TRAILER: 'tmdb:get-movie-trailer';
  readonly TMDB_GET_SERIE: 'tmdb:get-serie';
  readonly TMDB_GET_SERIE_TRAILER: 'tmdb:get-serie-trailer';
};
export = events;
