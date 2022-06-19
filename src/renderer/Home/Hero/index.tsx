/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import { MovieItem } from 'types';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
// Components
import Button from '../../common/Button';
// Styles
import HeroWrapper from './style';
// Helpers
import imageHelper from '../../../helpers/image';

type Props = {
  movie: MovieItem;
};
const Hero = (props: Props) => {
  const { movie } = props;

  return (
    <HeroWrapper
      style={{
        backgroundImage: `url(${imageHelper.getBackdropImage(
          movie.backdropPath
        )})`,
      }}
    >
      <div className="info">
        {/* <div>
          <span>2021</span>
          <span>Animation, Comedy, Family, Fantasy</span>
          <span>1h 35m</span>
        </div> */}
        <span className="title">{movie.title}</span>
        <div className="btn-wrapper">
          <Button types="primary" className="btn-trailer">
            Trailer
          </Button>
          <Button types="secondary">Watchlist</Button>
        </div>
      </div>
    </HeroWrapper>
  );
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default Hero;
