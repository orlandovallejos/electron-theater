/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import { useHistory } from 'react-router-dom';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import StyledButton from './index.style';

const GoBackButton = () => {
  // useHistory:
  const history = useHistory();

  const handleClick = () => {
    history.goBack();
  };

  return (
    <StyledButton type="button" onClick={handleClick}>
      <ion-icon name="arrow-back-circle-outline" />
    </StyledButton>
  );
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default GoBackButton;
