/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import type { TmdbApi } from '../types';

// The renderer never talks to TMDB (or sees the token): it calls the main process
// through the API that the preload script exposes.
const tmdb = (): TmdbApi => window.electron.tmdb;

export default {
  getConfiguration: () => tmdb().getConfiguration(),
  getTopMovies: () => tmdb().getTopMovies(),
  getTopSeries: () => tmdb().getTopSeries(),
  getMovie: (movieId: string) => tmdb().getMovie(movieId),
  getMovieTrailer: (movieId: string) => tmdb().getMovieTrailer(movieId),
  getSerie: (serieId: string) => tmdb().getSerie(serieId),
  getSerieTrailer: (serieId: string) => tmdb().getSerieTrailer(serieId),
};
