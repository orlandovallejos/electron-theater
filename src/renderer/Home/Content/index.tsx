/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import Section from './Section';
// Types
import { MovieItem } from '../../../types';
// Styles
import ContentWrapper from './style';

type Props = {
  movies: MovieItem[];
  series: MovieItem[];
};
const Content = (props: Props) => {
  const { movies, series } = props;

  return (
    <ContentWrapper>
      <h1>Trending movies</h1>
      <Section items={movies} />
      <h1>Trending TV Shows</h1>
      <Section items={series} />
    </ContentWrapper>
  );
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default Content;
