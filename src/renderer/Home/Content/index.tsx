/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
// Types
import { Movie } from '../../../types';
// Api
import moviesApi from '../../../api/Movies';
// Helpers
import imageHelper from '../../../helpers/image';
// Styles
import styles from './index.scss';

const Content = () => {
  const [movies, setMovies] = React.useState<Movie[]>([]);

  React.useEffect(() => {
    async function getMovies() {
      const data = await moviesApi.getTopMovies();
      setMovies(data.results);
    }
    getMovies();
  }, []);

  return (
    <div className={styles.wrapper}>
      {movies.map((movie) => {
        return (
          <div key={movie.id}>
            <img
              src={imageHelper.getPosterImage(movie.poster_path)}
              alt={movie.title}
            />
            <span>{movie.title}</span>
          </div>
        );
      })}
    </div>
  );
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default Content;
