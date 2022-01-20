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
import { MovieItem } from '../../../../types';
// Styles
import SectionWrapper from './style';

type Props = {
  items: MovieItem[];
};

const Section = (props: Props) => {
  const { items } = props;
  return (
    <SectionWrapper>
      {items.map((item) => {
        return (
          <PosterItem
            key={item.id}
            url={item.posterPath}
            title={item.title}
            voteAverage={item.voteAverage}
            releaseDate={item.releaseDate}
          />
        );
      })}
    </SectionWrapper>
  );
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default Section;
