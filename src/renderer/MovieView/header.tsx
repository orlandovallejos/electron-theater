/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import Vibrant from 'node-vibrant';
import CircularProgress from '@mui/joy/CircularProgress';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
// Types
import { MovieViewItem } from '../../types';
// Helpers
import imageHelper from '../../helpers/image';
import dateHelper from '../../helpers/date';
import mathHelper from '../../helpers/math';
// Style
import HeaderWrapper, { Shadow } from './header.style';

const DEFAULT_COLOR = '#fff';
type Props = {
  movie: MovieViewItem;
};
type AllowedCircularColors = 'success' | 'warning' | 'danger';

const Header = (props: Props) => {
  /* PROPS -------------------------*/
  const { movie } = props;
  /* STATE -------------------------*/
  const [bgColor, setBgColor] = React.useState<string>(DEFAULT_COLOR);

  /* METHODS -------------------------*/
  const calculateBgColor = async (imageURL: string) => {
    const palette = await Vibrant.from(
      imageHelper.getPosterImage(imageURL)
    ).getPalette();

    const colorVibrant = palette.Vibrant?.getHex();
    setBgColor(colorVibrant || DEFAULT_COLOR);
  };

  /* EFFECTS -------------------------*/
  React.useEffect(() => {
    calculateBgColor(movie.poster_path);
  }, [movie.poster_path]);

  /* RENDER -------------------------*/
  let circularColor: AllowedCircularColors;
  circularColor = 'danger';
  if (movie.vote_average >= 7) {
    circularColor = 'success';
  } else if (movie.vote_average >= 4) {
    circularColor = 'warning';
  }

  return (
    <HeaderWrapper
      style={{
        backgroundImage: `url(${imageHelper.getBackdropImage(
          movie.backdrop_path
        )})`,
      }}
    >
      <Shadow color={bgColor}>
        <img
          src={imageHelper.getPosterImage(movie.poster_path)}
          alt={movie.title}
          className="poster"
        />
        <div className="description-wrapper">
          <h1 className="title">{movie.title}</h1>
          <h4 className="tagline">{movie.tagline}</h4>

          <div className="icons-section">
            <div className="vote-wrapper">
              <CircularProgress
                size="lg"
                variant="soft"
                determinate
                thickness={6}
                value={movie.vote_average * 10}
                color={circularColor}
              >
                {mathHelper.getNumerWithNDecimals(movie.vote_average, 1)}
              </CircularProgress>
            </div>
          </div>
          <h5 className="release-date">
            {dateHelper.getFormattedDate(movie.release_date)}
          </h5>
          <h2 className="subtitle">Overview</h2>
          <p className="overview">{movie.overview}</p>
        </div>
      </Shadow>
    </HeaderWrapper>
  );
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default Header;
