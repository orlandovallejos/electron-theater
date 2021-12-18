/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
// Components
import Hero from './Hero';
import Content from './Content';
// Styles
import styles from './index.scss';

const Home = () => (
  <div className={styles.wrapper}>
    <Hero />
    <Content />
  </div>
);

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default Home;
