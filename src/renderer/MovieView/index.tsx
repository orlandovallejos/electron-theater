/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
// Components
// Types
import { MovieViewItem } from '../../types';
// Api
import moviesApi from '../../api/Movies';

type Props = {
  match: {
    params: {
      movieId: string;
    };
  };
};
const MovieView = (props: Props) => {
  const [movie, setMovie] = React.useState<MovieViewItem>();

  const {
    match: {
      params: { movieId },
    },
  } = props;

  React.useEffect(() => {
    async function getMoviesAndSeries() {
      const movieResponse = await moviesApi.getMovie(movieId);
      setMovie(movieResponse);
    }
    getMoviesAndSeries();
  }, [movieId]);

  return (
    <div>
      Hello there!
      {movie && movie.title}
    </div>
  );
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default MovieView;
