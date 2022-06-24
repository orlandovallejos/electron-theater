/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import _debounce from 'lodash/debounce';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
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
      <span className="icon close" />
      <span className="icon minimize" />
      <span className="icon maximize" />
    </AppBarWrapper>
  );
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default Layout;
