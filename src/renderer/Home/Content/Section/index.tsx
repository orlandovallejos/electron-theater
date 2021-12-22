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

const Section = (props: Props) => {
  const { movies } = props;
  return (
    <div className={styles.wrapper}>
      {movies.map((movie) => {
        return (
          <PosterItem
            key={movie.id}
            url={movie.poster_path}
            title={movie.title}
          />
        );
      })}
    </div>
  );
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default Section;