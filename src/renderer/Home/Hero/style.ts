/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import styled from 'styled-components';

const HeroWrapper = styled.div`
  background: pink;
  background-position: center; /* Center the image */
  background-repeat: no-repeat; /* Do not repeat the image */
  background-size: cover;
  min-height: 60vh;
  position: relative;

  &::after {
    content: '';
    height: 60vh;
    width: 100%;
    background: linear-gradient(0deg, #101010 0%, rgba(255, 255, 255, 0) 35%);
    display: table;
  }

  .info {
    position: absolute;
    left: 50px;
    bottom: 100px;
    display: flex;
    flex-direction: column;
    min-width: 350px;

    .title {
      color: white;
      font-size: 60px;
      font-weight: 600;
      margin: 0 0 20px 0;
    }

    .btn-wrapper {
      display: flex;
      justify-content: space-between;
    }
  }
`;
HeroWrapper.displayName = 'HeroWrapper';

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default HeroWrapper;
