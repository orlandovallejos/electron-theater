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
import { Movie } from 'renderer/../types';
// Styles
import styles from './index.scss';

type Props = {
  movies: Movie[];
};

const SectionMovie = (props: Props) => {
  const { movies } = props;
  return (
    <div className={styles.wrapper}>
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
    </div>
  );
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default SectionMovie;
