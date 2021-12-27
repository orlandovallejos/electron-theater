/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import Vibrant from 'node-vibrant';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
// Styles
import Wrapper, { ImageWrapper } from 'renderer/common/PosterItem/style';
// Helpers
import imageHelper from 'helpers/image';

type Props = {
  url: string;
  title: string;
  voteAverage: number;
  releaseDate: string;
};
const PosterItem = (props: Props) => {
  const { url, title, voteAverage, releaseDate } = props;
  const [borderVibrant, setBorderVibrant] = React.useState<string>('#ffffff');
  const [borderDarkVibrant, setBorderDarkVibrant] =
    React.useState<string>('#ffffff');

  React.useEffect(() => {
    type NewMethodType = {
      DarkVibrant?: {
        getHex: () => string;
      };
      Vibrant?: {
        getHex: () => string;
      };
    };

    Vibrant.from(imageHelper.getPosterImage(url))
      .getPalette()
      .then((palette: NewMethodType) => {
        const colorVibrant = palette.Vibrant?.getHex();
        setBorderVibrant(colorVibrant || '#fff');
        const colorDarkVibrant = palette.DarkVibrant?.getHex();
        setBorderDarkVibrant(colorDarkVibrant || '#fff');

        return palette;
      })
      .catch(() => {});
  }, [url]);

  return (
    <Wrapper>
      <ImageWrapper vibrant={borderVibrant} darkVibrant={borderDarkVibrant}>
        <div className="item">
          <img src={imageHelper.getPosterImage(url)} alt={title} />
        </div>
      </ImageWrapper>
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
    </Wrapper>
  );
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default PosterItem;
