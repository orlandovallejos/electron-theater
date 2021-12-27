/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import styled from 'styled-components';
import { transparentize } from 'polished';

const Wrapper = styled.div`
  width: 230px;
  height: auto;
  overflow: hidden;
  padding: 16px 8px;

  .title-wrapper {
    margin: 12px 20px 0 20px;

    .title {
      font-size: 12px;
      color: #f5f5f5;
    }
  }

  .title-extra-wrapper {
    margin: 4px 20px;
    display: flex;
    justify-content: space-between;

    .extra-item {
      align-items: center;
      display: flex;
      color: #747474;

      ion-icon {
        margin: 0 5px 0 0;
      }
      .text {
        font-size: 12px;
        margin-top: 5px;
      }
    }
  }
`;
Wrapper.displayName = 'Wrapper';

interface TitleProps {
  readonly vibrant: string;
  readonly darkVibrant: string;
}
const ImageWrapper = styled.div<TitleProps>`
  display: flex;

  .item {
    width: 204px;
    height: 304px;
    border-radius: 7px;
    margin: auto;
    transition: box-shadow 0.5s, transform 0.5s;

    img {
      width: 200px;
      border-radius: 7px;
      height: 300px;
      margin: 2px;
      /* display: none; */
    }

    &:hover {
      box-shadow: ${(props) => `
        14px 12px 10px -9px ${transparentize(0.5, props.darkVibrant)},
        -8px 12px 10px -10px ${transparentize(0.5, props.darkVibrant)},
        16px -8px 10px -10px ${transparentize(0.5, props.darkVibrant)},
        -12px -12px 10px -10px ${transparentize(0.5, props.vibrant)},
        -12px 8px 10px -10px ${transparentize(0.5, props.vibrant)},
        0px -12px 10px -10px ${transparentize(0.5, props.vibrant)};
      `};
      transform: translate(0, -5px);
      transition: box-shadow 0.5s, transform 0.5s;
      background: ${(props) => `
        linear-gradient(to right, ${props.vibrant}, ${props.darkVibrant});
      `};
    }
  }
`;
ImageWrapper.displayName = 'ImageWrapper';

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export { ImageWrapper };
export default Wrapper;
