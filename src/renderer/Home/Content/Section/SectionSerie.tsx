/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
// Components
import PosterItem from 'renderer/common/PosterItem';
// Types
import { Serie } from 'renderer/../types';
// Styles
import styles from './index.scss';

type Props = {
  series: Serie[];
};

const SectionSerie = (props: Props) => {
  const { series } = props;
  return (
    <div className={styles.wrapper}>
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
    </div>
  );
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default SectionSerie;
