/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import { MemoryRouter as Router, Switch, Route } from 'react-router-dom';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
// Components
import Home from '../Home';
// Styles
import LayoutWrapper, { ContentWrapper } from './style';

const Layout = () => (
  <LayoutWrapper>
    {/* <div className={styles.sidebar}>sidebar</div> */}
    <ContentWrapper>
      <Router>
        <Switch>
          <Route path="/" component={Home} />
        </Switch>
      </Router>
    </ContentWrapper>
  </LayoutWrapper>
);

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default Layout;
