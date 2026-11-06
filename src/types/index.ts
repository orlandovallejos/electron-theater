/**
 * TMDB API exposed to the renderer by the preload script. The calls run in the main
 * process, which is the only place that knows the API token.
 */
export type TmdbApi = {
  getConfiguration(): Promise<{ images: { base_url: string } }>;
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
  // eslint-disable-next-line @typescript-eslint/no-namespace
  namespace JSX {
    interface IntrinsicElements {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      'ion-icon': any;
    }
  }
}

/**
 * Type use across the app
 */
export type MovieItem = {
  id: string;
  title: string;
  backdropPath: string;
  posterPath: string;
  voteAverage: number;
  releaseDate: string;
};
/**
 * Response type
 */
export type Movie = {
  id: string;
  title: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
};
/**
 * Response type
 */
export type Serie = {
  id: string;
  name: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  first_air_date: string;
};
/**
 * Response type
 */
export type MovieViewItem = {
  id: string;
  title: string;
  backdrop_path: string;
  poster_path: string;
  vote_average: number;
  release_date: string;
  tagline: string;
  overview: string;
  original_language: string;
  budget: string;
  revenue: string;
};
export {};
