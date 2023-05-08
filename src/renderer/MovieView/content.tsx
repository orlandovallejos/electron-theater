/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import _get from 'lodash/get';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
// Types
import { MovieViewItem } from '../../types';
// Helpers
import dateHelper from '../../helpers/date';
import mathHelper from '../../helpers/math';
// Style
import ContentWrapper from './content.style';

type Props = {
  movie: MovieViewItem;
};
const Content = (props: Props) => {
  const { movie } = props;

  return (
    <ContentWrapper>
      <div className="left-content">{movie.title}</div>
      <div className="right-content">
        <div className="additional-info">
          <div className="item">
            <span className="title">Status</span>
            <span>{_get(movie, 'status')}</span>
          </div>
          <div className="item">
            <span className="title">Original language</span>
            <span>
              {dateHelper.getLanguageFromLocale(
                _get(movie, 'original_language')
              )}
            </span>
          </div>
          <div className="item">
            <span className="title">Budget</span>
            <span>
              {mathHelper.convertBigNumberToReadable(_get(movie, 'budget', 0))}
            </span>
          </div>
          <div className="item">
            <span className="title">Revenue</span>
            <span>
              {mathHelper.convertBigNumberToReadable(_get(movie, 'revenue', 0))}
            </span>
          </div>
        </div>
      </div>
    </ContentWrapper>
  );
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default Content;
