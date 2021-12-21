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
};

const PosterItem = (props: Props) => {
  const { url, title } = props;
  return (
    <div className={styles.wrapper}>
      <div className={styles.imgWrapper}>
        <img src={imageHelper.getPosterImage(url)} alt={title} />
      </div>
      <div className={styles.titleWrapper}>
        <span className={styles.title}>{title}</span>
      </div>
    </div>
  );
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default PosterItem;
