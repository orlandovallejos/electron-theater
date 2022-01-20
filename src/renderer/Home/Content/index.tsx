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
import ContentWrapper from './style';

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
    <ContentWrapper>
      <h1>Trending movies</h1>
      <SectionMovie movies={movies} />
      <h1>Trending TV Shows</h1>
      <SectionSerie series={series} />
    </ContentWrapper>
  );
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default Content;
