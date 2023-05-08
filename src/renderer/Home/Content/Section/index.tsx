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
  baseUrl?: string;
};

const Section = (props: Props) => {
  const { items, baseUrl } = props;
  return (
    <SectionWrapper>
      {items.map((item) => {
        return (
          <PosterItem
            key={item.id}
            id={item.id}
            url={item.posterPath}
            title={item.title}
            voteAverage={item.voteAverage}
            releaseDate={item.releaseDate}
            baseUrl={baseUrl}
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
