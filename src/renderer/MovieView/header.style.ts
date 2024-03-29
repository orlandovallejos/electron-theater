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
  position: relative;

  .poster {
    height: 390px;
    border-radius: 16px;
  }

  .description-wrapper {
    flex: 1;
    padding: 30px 30px 0 30px;

    .title {
      margin: 0 0 10px 0;
    }
    .tagline {
      margin: 0;
    }
    .release-date {
      margin: 26px 0 0 0;
    }
    .icons-section {
      margin: 26px 0;
      display: flex;
      align-items: center;

      & > * {
        margin: 0 12px 0 0;
      }

      .vote-wrapper {
        background: ${transparentize(0.2, '#101010')};
        display: inline-flex;
        padding: 4px;
        border-radius: 50%;

        .MuiCircularProgress-colorDanger,
        .MuiCircularProgress-colorWarning,
        .MuiCircularProgress-colorSuccess {
          color: #ffffff;
          .MuiCircularProgress-track {
            stroke: #99999940;
          }
        }
        .MuiCircularProgress-colorDanger {
          .MuiCircularProgress-progress {
            stroke: #a30110;
          }
        }
        .MuiCircularProgress-colorWarning {
          .MuiCircularProgress-progress {
            stroke: #bec103;
          }
        }
        .MuiCircularProgress-colorSuccess {
          .MuiCircularProgress-progress {
            stroke: #099b21;
          }
        }
      }

      iframe {
        border-radius: 30px;
      }
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
  display: flex;
`;
Shadow.displayName = 'Shadow';

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export { Shadow };
export default HeaderWrapper;
