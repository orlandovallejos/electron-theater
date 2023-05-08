/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
// Components
import Header from './header';
import GoBackButton from '../common/GoBackButton';
// Types
import { MovieViewItem } from '../../types';
// Api
import moviesApi from '../../api/Movies';
import Content from './content';

type Props = {
  match: {
    params: {
      movieId: string;
      serieId: string;
    };
  };
};
const MovieView = (props: Props) => {
  // useState:
  const [movie, setMovie] = React.useState<MovieViewItem>();
  const [movieTrailerKey, setMovieTrailerKey] = React.useState<string>('');

  const {
    match: {
      params: { movieId, serieId },
    },
  } = props;

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
        setMovie(movieResponse);
      }
    }

    getMovie();
  }, [movieId]);

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
