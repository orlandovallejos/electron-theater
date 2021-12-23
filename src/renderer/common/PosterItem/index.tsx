/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
// Styles
import Wrapper from 'renderer/common/PosterItem/style';
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
  return (
    <Wrapper>
      <div className="img-wrapper">
        <img src={imageHelper.getPosterImage(url)} alt={title} />
      </div>
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
