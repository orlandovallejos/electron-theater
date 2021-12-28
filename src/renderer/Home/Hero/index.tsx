/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
// Components
import Button from 'renderer/common/Button';
// Styles
import HeroWrapper from 'renderer/Home/Hero/style';

const bgImage =
  'url(https://www.themoviedb.org/t/p/original/aI5S2WMoTFVgBznYi2DP3WRojCl.jpg)';

const Hero = () => (
  <HeroWrapper
    style={{
      backgroundImage: bgImage,
    }}
  >
    <div className="info">
      {/* <div>
        <span>2021</span>
        <span>Animation, Comedy, Family, Fantasy</span>
        <span>1h 35m</span>
      </div> */}
      <span className="title">Luca</span>
      <div className="btn-wrapper">
        <Button type="primary">Trailer</Button>
        <Button type="secondary">Watchlist</Button>
      </div>
    </div>
  </HeroWrapper>
);

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default Hero;
