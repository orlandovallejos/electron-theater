/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import { useParams } from 'react-router-dom';
import { MovieViewItem } from '@electron-theater/core';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
// Components
import Header from './header';
import GoBackButton from '../common/GoBackButton';
// Api
import moviesApi from '../../api/Movies';
import Content from './content';

const MovieView = () => {
  // useState:
  const [movie, setMovie] = React.useState<MovieViewItem>();
  const [movieTrailerKey, setMovieTrailerKey] = React.useState<string>('');

  const { movieId, serieId } = useParams<'movieId' | 'serieId'>();

  React.useEffect(() => {
    async function getMovie() {
      let movieResponse: MovieViewItem;
      let movieTrailerKeyResponse: string;

      if (movieId) {
        movieResponse = await moviesApi.getMovie(movieId);
        movieTrailerKeyResponse = await moviesApi.getMovieTrailer(movieId);

        setMovie(movieResponse);
        setMovieTrailerKey(movieTrailerKeyResponse);
      }
      if (serieId) {
        movieResponse = await moviesApi.getSerie(serieId);
        movieTrailerKeyResponse = await moviesApi.getSerieTrailer(serieId);

        setMovie(movieResponse);
        setMovieTrailerKey(movieTrailerKeyResponse);
      }
    }

    getMovie();
  }, [movieId, serieId]);

  return (
    <div>
      <GoBackButton />
      {movie && <Header movie={movie} trailerKey={movieTrailerKey} />}
      {movie && <Content movie={movie} />}
    </div>
  );
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default MovieView;
