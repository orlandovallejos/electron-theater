/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
// Components
import Button from '../../common/Button';
// Styles
import styles from './index.scss';

const bgImage =
  'url(https://www.themoviedb.org/t/p/original/aI5S2WMoTFVgBznYi2DP3WRojCl.jpg)';

const Hero = () => (
  <div
    className={styles.wrapper}
    style={{
      backgroundImage: bgImage,
    }}
  >
    <div className={styles.info}>
      {/* <div>
        <span>2021</span>
        <span>Animation, Comedy, Family, Fantasy</span>
        <span>1h 35m</span>
      </div> */}
      <span className={styles.title}>Luca</span>
      <div className={styles.btnWrapper}>
        <Button type="primary">Trailer</Button>
        <Button type="secondary">Watchlist</Button>
      </div>
    </div>
  </div>
);

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default Hero;
