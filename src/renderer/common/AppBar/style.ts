/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import styled from 'styled-components';

interface AppBarWrapperProps {
  readonly showBackground: boolean;
}
const AppBarWrapper = styled.div<AppBarWrapperProps>`
  background: transparent;
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  height: 16px;
  z-index: 1;
  padding: 12px 16px;
  -webkit-app-region: drag;

  ${(props) =>
    props.showBackground &&
    `
    backdrop-filter: blur(5px) contrast(0.8);
  `}

  .icon {
    height: 12px;
    width: 12px;
    display: inline-flex;
    border-radius: 50%;

    &.close {
      background: #ff605c;
      margin: 0 8px 0 0;
    }
    &.minimize {
      background: #ffbd44;
      margin: 0 8px 0 0;
    }
    &.maximize {
      background: #00ca4e;
    }
  }
`;
AppBarWrapper.displayName = 'AppBarWrapper';

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default AppBarWrapper;
