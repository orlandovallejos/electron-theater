/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import styled from 'styled-components';
import { rem } from 'polished';

const ContentWrapper = styled.div`
  background: green;
  display: flex;

  .left-content {
    background: red;
    flex: 1;
  }
  .right-content {
    background: blue;
    background: blue;
    width: 220px;
    padding: 0 24px;
    font-size: ${rem('14px')};

    .additional-info {
      .item {
        margin: 0 0 12px 0;

        .title {
          font-weight: bold;
          display: block;
        }
      }
    }
  }
`;
ContentWrapper.displayName = 'ContentWrapper';

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default ContentWrapper;
