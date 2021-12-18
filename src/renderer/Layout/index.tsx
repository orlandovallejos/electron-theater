/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
// Styles
import styles from './index.scss';
// Components
import Home from '../Home';

const Layout = () => (
  <div className={styles.main}>
    {/* <div className={styles.sidebar}>sidebar</div> */}
    <div className={styles.content}>
      <Router>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </div>
  </div>
);

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default Layout;
