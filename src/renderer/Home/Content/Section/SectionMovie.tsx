/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
// Components
import PosterItem from '../../../common/PosterItem';
// Types
import { Movie } from '../../../../types';
// Styles
import SectionWrapper from './style';

type Props = {
  movies: Movie[];
};

const SectionMovie = (props: Props) => {
  const { movies } = props;
  return (
    <SectionWrapper>
      {movies.map((item) => {
        return (
          <PosterItem
            key={item.id}
            url={item.poster_path}
            title={item.title}
            voteAverage={item.vote_average}
            releaseDate={item.release_date}
          />
        );
      })}
    </SectionWrapper>
  );
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default SectionMovie;
