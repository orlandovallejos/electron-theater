import type { MovieItem, MovieViewItem } from '@movie-mates/core';

/**
 * TMDB API exposed to the renderer by the preload script. The calls run in the main
 * process, which is the only place that knows the API token.
 */
export type TmdbApi = {
  getConfiguration(): Promise<{ images: { secure_base_url: string } }>;
  getTopMovies(): Promise<{ results: MovieItem[] }>;
  getTopSeries(): Promise<{ results: MovieItem[] }>;
  getMovie(movieId: string): Promise<MovieViewItem>;
  getMovieTrailer(movieId: string): Promise<string>;
  getSerie(serieId: string): Promise<MovieViewItem>;
  getSerieTrailer(serieId: string): Promise<string>;
};

declare global {
  interface Window {
    electron: {
      tmdb: TmdbApi;
      ipcRenderer: {
        closeApp(): undefined;
        fullScreenApp(): undefined;
        maximizeApp(): undefined;
        minimizeApp(): undefined;
      };
    };
  }
}
