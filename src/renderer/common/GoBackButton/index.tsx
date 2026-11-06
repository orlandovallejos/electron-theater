/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import { useNavigate } from 'react-router-dom';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import StyledButton from './index.style';
import Icon from '../Icon';

const GoBackButton = () => {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate(-1);
  };

  return (
    <StyledButton type="button" onClick={handleClick}>
      <Icon name="arrow-back-circle-outline" />
    </StyledButton>
  );
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default GoBackButton;
