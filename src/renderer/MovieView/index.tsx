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

  const {
    match: {
      params: { movieId },
    },
  } = props;

  React.useEffect(() => {
    async function getMovie() {
      const movieResponse = await moviesApi.getMovie(movieId);
      console.log(movieResponse);
      setMovie(movieResponse);
    }
    getMovie();
  }, [movieId]);

  return (
    <div>
      <GoBackButton />
      {movie && <Header movie={movie} />}
      {movie && <Content movie={movie} />}
    </div>
  );
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default MovieView;
