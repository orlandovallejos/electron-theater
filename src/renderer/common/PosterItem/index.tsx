/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
// Styles
import styles from './index.scss';
// Helpers
import imageHelper from '../../../helpers/image';

type Props = {
  url: string;
  title: string;
  voteAverage: number;
  releaseDate: string;
};

const PosterItem = (props: Props) => {
  const { url, title, voteAverage, releaseDate } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.imgWrapper}>
        <img src={imageHelper.getPosterImage(url)} alt={title} />
      </div>
      <div className={styles.titleWrapper}>
        <span className={styles.title}>{title}</span>
      </div>
      <div className={styles.titleExtraWrapper}>
        <div className={styles.extraItem}>
          <ion-icon name="star" />
          <span className={styles.text}>{voteAverage}</span>
        </div>
        <div className={styles.extraItem}>
          <ion-icon name="calendar-clear" />
          <span className={styles.text}>{releaseDate.substring(0, 4)}</span>
        </div>
      </div>
    </div>
  );
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default PosterItem;
