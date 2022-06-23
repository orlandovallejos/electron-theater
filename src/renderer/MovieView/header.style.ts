/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import styled from 'styled-components';
import { transparentize } from 'polished';

const HeaderWrapper = styled.div`
  background: #000;
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
  height: 450px;
  position: relative;

  .poster {
    height: 100%;
    border-radius: 16px;
  }
`;
HeaderWrapper.displayName = 'HeaderWrapper';

const Shadow = styled.div`
  padding: 30px;
  background: ${(props: { color: string }) => transparentize(0.1, props.color)};
  height: 390px;
  display: flex;
`;
Shadow.displayName = 'Shadow';

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export { Shadow };
export default HeaderWrapper;
