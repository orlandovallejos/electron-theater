/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import { MovieItem } from '@movie-mates/core';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import Section from './Section';
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
      <Section items={movies} baseUrl="movie" />
      <h1>Trending TV Shows</h1>
      <Section items={series} baseUrl="serie" />
    </ContentWrapper>
  );
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default Content;
