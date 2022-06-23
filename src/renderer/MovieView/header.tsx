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
        <div>
          <h1>{movie.title}</h1>
        </div>
      </Shadow>
    </HeaderWrapper>
  );
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default Header;
