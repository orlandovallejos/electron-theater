/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import { MemoryRouter as Router, Routes, Route } from 'react-router-dom';
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
          <Routes>
            <Route path="/movie/:movieId" element={<MovieView />} />
            <Route path="/serie/:serieId" element={<MovieView />} />
            {/* Any other path shows the home screen, like the old "/" route did. */}
            <Route path="*" element={<Home />} />
          </Routes>
        </Router>
      </ContentWrapper>
    </LayoutWrapper>
  </>
);

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default Layout;
