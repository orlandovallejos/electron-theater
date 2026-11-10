/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import { Vibrant } from 'node-vibrant/browser';
import { Link } from 'react-router-dom';
import { imageHelper } from '@electron-theater/core';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
// Styles
import PosterItemWrapper, { ImageWrapper } from './style';
import Icon from '../Icon';

const DEFAULT_COLOR = '#fff';

type Props = {
  id: string;
  url: string;
  title: string;
  voteAverage: number;
  releaseDate: string;
  baseUrl: string;
};
const PosterItem = (props: Props) => {
  const { id, url, title, voteAverage, releaseDate, baseUrl } = props;
  const [borderVibrant, setBorderVibrant] =
    React.useState<string>(DEFAULT_COLOR);
  const [borderDarkVibrant, setBorderDarkVibrant] =
    React.useState<string>(DEFAULT_COLOR);

  const setBorderColors = async (imageURL: string) => {
    try {
      const palette = await new Vibrant(
        imageHelper.getPosterImage(imageURL)
      ).getPalette();

      const colorVibrant = palette.Vibrant?.hex;
      setBorderVibrant(colorVibrant || DEFAULT_COLOR);
      const colorDarkVibrant = palette.DarkVibrant?.hex;
      setBorderDarkVibrant(colorDarkVibrant || DEFAULT_COLOR);
    } catch {
      // Reading the pixels needs the image server to allow it (CORS). The poster
      // still shows, so keep the default border colors.
      setBorderVibrant(DEFAULT_COLOR);
      setBorderDarkVibrant(DEFAULT_COLOR);
    }
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
          <Icon name="star" />
          <span className="text">{voteAverage}</span>
        </div>
        <div className="extra-item">
          <Icon name="calendar-clear" />
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
