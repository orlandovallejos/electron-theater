/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import SectionMovie from './Section/SectionMovie';
import SectionSerie from './Section/SectionSerie';
// Types
import { Movie, Serie } from '../../../types';
// Api
import moviesApi from '../../../api/Movies';
// Styles
import styles from './index.scss';

const Content = () => {
  const [movies, setMovies] = React.useState<Movie[]>([]);
  const [series, setSeries] = React.useState<Serie[]>([]);

  React.useEffect(() => {
    async function getMovies() {
      const data = await moviesApi.getTopMovies();
      setMovies(data.results);
    }
    getMovies();
  }, []);

  React.useEffect(() => {
    async function getSeries() {
      const data = await moviesApi.getTopSeries();
      setSeries(data.results);
    }
    getSeries();
  }, []);

  return (
    <div className={styles.wrapper}>
      <SectionMovie movies={movies} />
      <SectionSerie series={series} />
    </div>
  );
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default Content;
