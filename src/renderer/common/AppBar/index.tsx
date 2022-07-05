/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import _debounce from 'lodash/debounce';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
// Helpers
import electronHelper from 'helpers/electron';
// Styles
import AppBarWrapper from './style';

const Layout = () => {
  // State:
  const [showBackground, setShowBackground] = React.useState(false);

  // Functions:
  const scrollHandler = _debounce(() => {
    if (document.documentElement.scrollTop > 100) {
      setShowBackground(true);
    } else {
      setShowBackground(false);
    }
  }, 100);

  const cleanUp = () => {
    window.removeEventListener('scroll', scrollHandler);
  };

  // Effects:
  React.useEffect(() => {
    window.addEventListener('scroll', scrollHandler);

    return cleanUp;
  });

  return (
    <AppBarWrapper showBackground={showBackground}>
      <div className="button-wrapper">
        <button type="button" onClick={electronHelper.closeApp}>
          <span className="icon close" />
        </button>
        <button type="button" onClick={electronHelper.minimizeApp}>
          <span className="icon minimize" />
        </button>
        <button type="button" onClick={electronHelper.maximizeApp}>
          <span className="icon maximize" />
        </button>
      </div>
    </AppBarWrapper>
  );
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default Layout;
