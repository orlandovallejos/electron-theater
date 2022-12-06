/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import styled from 'styled-components';
import { transparentize } from 'polished';

const HeaderWrapper = styled.div`
  background: #000;
  background-position: top;
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
  height: 500px;
  position: relative;

  .poster {
    height: 100%;
    border-radius: 16px;
  }

  .description-wrapper {
    flex: 1;
    padding: 30px;

    .title {
      margin: 0 0 10px 0;
    }
    .tagline {
      margin: 0;
    }
    .subtitle {
      margin: 0;
    }
    .overview {
      line-height: 28px;
      margin: 10px 0 0 0;
    }
  }
`;
HeaderWrapper.displayName = 'HeaderWrapper';

const Shadow = styled.div`
  padding: 80px 30px 30px 30px;
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
