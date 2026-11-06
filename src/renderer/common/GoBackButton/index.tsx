/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import { useNavigate } from 'react-router-dom';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import StyledButton from './index.style';

const GoBackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
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
