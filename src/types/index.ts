declare global {
  interface Window {
    electron: {
      ipcRenderer: {
        getEnvVars(): {
          API_URL: string;
          APP_TOKEN: string;
        };
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
};
export {};
