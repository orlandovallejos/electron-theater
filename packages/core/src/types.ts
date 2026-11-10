/**
 * A movie or TV show as the app uses it, whatever TMDB endpoint it came from.
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
 * A movie as TMDB's list endpoints return it.
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
 * A TV show as TMDB's list endpoints return it.
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
 * A movie or TV show with the details the detail view shows. TV shows are mapped to this shape.
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
