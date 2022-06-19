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
// Helpers
import mathHelper from '../../helpers/math';

const Home = () => {
  const [movies, setMovies] = React.useState<MovieItem[]>([]);
  const [series, setSeries] = React.useState<MovieItem[]>([]);
  const [heroItem, setHeroItem] = React.useState<MovieItem | null>(null);

  React.useEffect(() => {
    async function getMoviesAndSeries() {
      const dataMovies = await moviesApi.getTopMovies();
      setMovies(dataMovies.results);

      const dataSeries = await moviesApi.getTopSeries();
      setSeries(dataSeries.results);

      const allItems = dataMovies.results.concat(dataSeries.results);
      const randomItem =
        allItems[mathHelper.randomIntFromInterval(0, allItems.length - 1)];
      setHeroItem(randomItem);
    }
    getMoviesAndSeries();
  }, []);

  return (
    <div>
      {heroItem && <Hero movie={heroItem} />}
      <Content movies={movies} series={series} />
    </div>
  );
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default Home;
