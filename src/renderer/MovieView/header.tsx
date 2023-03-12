/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import Vibrant from 'node-vibrant';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
// Types
import { MovieViewItem } from '../../types';
// Helpers
import imageHelper from '../../helpers/image';
import dateHelper from '../../helpers/date';
// Style
import HeaderWrapper, { Shadow } from './header.style';

const DEFAULT_COLOR = '#fff';
type Props = {
  movie: MovieViewItem;
};
const Header = (props: Props) => {
  const { movie } = props;
  const [bgColor, setBgColor] = React.useState<string>(DEFAULT_COLOR);

  const calculateBgColor = async (imageURL: string) => {
    const palette = await Vibrant.from(
      imageHelper.getPosterImage(imageURL)
    ).getPalette();

    const colorVibrant = palette.Vibrant?.getHex();
    setBgColor(colorVibrant || DEFAULT_COLOR);
  };

  React.useEffect(() => {
    calculateBgColor(movie.poster_path);
  }, [movie.poster_path]);

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
