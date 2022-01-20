/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import { MovieItem, Movie, Serie } from '../types';

const transformMovie = (movie: Movie): MovieItem => {
  return {
    id: movie.id,
    title: movie.title,
    backdropPath: movie.backdrop_path,
    posterPath: movie.poster_path,
    voteAverage: movie.vote_average,
    releaseDate: movie.release_date,
  };
};
const transformSerie = (movie: Serie): MovieItem => {
  return {
    id: movie.id,
    title: movie.name,
    backdropPath: movie.backdrop_path,
    posterPath: movie.poster_path,
    voteAverage: movie.vote_average,
    releaseDate: movie.first_air_date,
  };
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default {
  transformMovie,
  transformSerie,
};
