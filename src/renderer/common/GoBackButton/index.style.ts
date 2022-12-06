/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import styled from 'styled-components';

const StyledButton = styled.button`
  background: transparent;
  border: none;
  cursor: pointer;
  left: 20px;
  outline: none;
  position: absolute;
  top: 30px;
  z-index: 1;

  ion-icon {
    font-size: 40px;
  }
`;
StyledButton.displayName = 'HeaderWrapper';

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default StyledButton;
