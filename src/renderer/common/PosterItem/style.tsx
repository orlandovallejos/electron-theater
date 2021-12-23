/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import styled from 'styled-components';

const Wrapper = styled.div`
  width: 230px;
  height: auto;
  overflow: hidden;
  padding: 16px 8px;

  .img-wrapper {
    display: flex;

    img {
      width: 200px;
      border-radius: 7px;
      margin: auto;
      box-shadow: 0 5px 15px 5px rgb(0 0 0 / 10%);
      transition: box-shadow 0.5s, transform 0.5s;
      border: 1px solid transparent;

      &:hover {
        box-shadow: 0 5px 45px 5px rgb(0 0 0 / 5%);
        transform: translate(0, -5px);
        transition: box-shadow 0.5s, transform 0.5s;
        border-color: #e9e9e9;
      }
    }
  }

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

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default Wrapper;
