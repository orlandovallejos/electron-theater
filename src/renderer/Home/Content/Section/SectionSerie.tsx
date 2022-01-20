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
import { Serie } from '../../../../types';
// Styles
import SectionWrapper from './style';

type Props = {
  series: Serie[];
};

const SectionSerie = (props: Props) => {
  const { series } = props;
  return (
    <SectionWrapper>
      {series.map((item) => {
        return (
          <PosterItem
            key={item.id}
            url={item.poster_path}
            title={item.name}
            voteAverage={item.vote_average}
            releaseDate={item.first_air_date}
          />
        );
      })}
    </SectionWrapper>
  );
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default SectionSerie;
