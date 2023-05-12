/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import Vibrant from 'node-vibrant';
import CircularProgress from '@mui/joy/CircularProgress';
import Modal from '@mui/joy/Modal';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
// Components
import Button from 'renderer/common/Button';
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
  trailerKey?: string;
};
type AllowedCircularColors = 'success' | 'warning' | 'danger';

const Header = (props: Props) => {
  /* PROPS -------------------------*/
  const { movie, trailerKey } = props;
  /* STATE -------------------------*/
  const [bgColor, setBgColor] = React.useState<string>(DEFAULT_COLOR);
  const [modalOpen, setModalOpen] = React.useState<boolean>(false);

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
          <div className="extra-info">
            <h5 className="release-date">
              {dateHelper.getFormattedDate(movie.release_date)}
            </h5>
          </div>
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
            {trailerKey && (
              <>
                <Button types="outlined" onClick={() => setModalOpen(true)}>
                  <ion-icon name="play-circle-outline" />
                  <span>Play trailer</span>
                </Button>
                <Modal
                  open={modalOpen}
                  onClose={() => setModalOpen(false)}
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}
                >
                  <iframe
                    width="75%"
                    height="55%"
                    src={`https://www.youtube-nocookie.com/embed/${trailerKey}`}
                    title="YouTube video player"
                    frameBorder="0"
                    allow="accelerometer; autoplay=true; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                    allowFullScreen
                  />
                </Modal>
              </>
            )}
          </div>
          <h2 className="subtitle">Overview</h2>
          <p className="overview">{movie.overview}</p>
        </div>
      </Shadow>
    </HeaderWrapper>
  );
};

Header.defaultProps = {
  trailerKey: '',
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default Header;
