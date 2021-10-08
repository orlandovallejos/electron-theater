/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
// Components
import Hero from './Hero';
// Styles
import styles from './index.scss';

const Home = () => (
  <div className={styles.wrapper}>
    <Hero />
  </div>
);

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default Home;
