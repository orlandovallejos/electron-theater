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
