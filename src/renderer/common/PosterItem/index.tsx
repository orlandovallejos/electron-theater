/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import Vibrant from 'node-vibrant';
import { Link } from 'react-router-dom';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
// Styles
import PosterItemWrapper, { ImageWrapper } from './style';
// Helpers
import imageHelper from '../../../helpers/image';

const DEFAULT_COLOR = '#fff';

type Props = {
  id: string;
  url: string;
  title: string;
  voteAverage: number;
  releaseDate: string;
  baseUrl?: string;
};
const PosterItem = (props: Props) => {
  const { id, url, title, voteAverage, releaseDate, baseUrl } = props;
  const [borderVibrant, setBorderVibrant] =
    React.useState<string>(DEFAULT_COLOR);
  const [borderDarkVibrant, setBorderDarkVibrant] =
    React.useState<string>(DEFAULT_COLOR);

  const setBorderColors = async (imageURL: string) => {
    const palette = await Vibrant.from(
      imageHelper.getPosterImage(imageURL)
    ).getPalette();

    const colorVibrant = palette.Vibrant?.getHex();
    setBorderVibrant(colorVibrant || DEFAULT_COLOR);
    const colorDarkVibrant = palette.DarkVibrant?.getHex();
    setBorderDarkVibrant(colorDarkVibrant || DEFAULT_COLOR);
  };

  React.useEffect(() => {
    if (url) {
      setBorderColors(url);
    }
  }, [url]);

  return (
    <PosterItemWrapper>
      <Link to={`${baseUrl}/${id}`}>
        <ImageWrapper vibrant={borderVibrant} darkVibrant={borderDarkVibrant}>
          <div className="item">
            {url && <img src={imageHelper.getPosterImage(url)} alt={title} />}
          </div>
        </ImageWrapper>
      </Link>
      <div className="title-wrapper">
        <span className="title">{title}</span>
      </div>
      <div className="title-extra-wrapper">
        <div className="extra-item">
          <ion-icon name="star" />
          <span className="text">{voteAverage}</span>
        </div>
        <div className="extra-item">
          <ion-icon name="calendar-clear" />
          <span className="text">{releaseDate.substring(0, 4)}</span>
        </div>
      </div>
    </PosterItemWrapper>
  );
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default PosterItem;
