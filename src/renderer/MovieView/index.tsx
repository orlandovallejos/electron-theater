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
    };
  };
};
const MovieView = (props: Props) => {
  // useState:
  const [movie, setMovie] = React.useState<MovieViewItem>();
  const [movieTrailerKey, setMovieTrailerKey] = React.useState<string>('');

  const {
    match: {
      params: { movieId },
    },
  } = props;

  React.useEffect(() => {
    async function getMovie() {
      const movieResponse = await moviesApi.getMovie(movieId);
      const movieTrailerKeyResponse = await moviesApi.getMovieTrailer(movieId);

      console.log(movieResponse, movieTrailerKey);
      setMovie(movieResponse);
      setMovieTrailerKey(movieTrailerKeyResponse);
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
