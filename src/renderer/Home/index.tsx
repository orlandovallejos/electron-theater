/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
// Components
import Hero from './Hero';
import Content from './Content';
// Types
import { MovieItem } from '../../types';
// Api
import moviesApi from '../../api/Movies';

const Home = () => {
  const [movies, setMovies] = React.useState<MovieItem[]>([]);
  const [series, setSeries] = React.useState<MovieItem[]>([]);

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
    <div>
      <Hero />
      <Content movies={movies} series={series} />
    </div>
  );
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default Home;
