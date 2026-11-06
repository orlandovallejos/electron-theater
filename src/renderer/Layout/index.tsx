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
import AppBar from '../common/AppBar';
import MovieView from '../MovieView';
// Styles
import LayoutWrapper, { ContentWrapper } from './style';

const Layout = () => (
  <>
    <AppBar />
    <LayoutWrapper>
      {/* <div className={styles.sidebar}>sidebar</div> */}
      <ContentWrapper>
        <Router>
          <Switch>
            <Route path="/movie/:movieId" component={MovieView} />
            <Route path="/serie/:serieId" component={MovieView} />
            <Route path="/" component={Home} />
          </Switch>
        </Router>
      </ContentWrapper>
    </LayoutWrapper>
  </>
);

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default Layout;
