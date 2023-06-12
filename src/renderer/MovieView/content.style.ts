/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import styled from 'styled-components';
import { rem } from 'polished';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import theme from '../themes/default';

const ContentWrapper = styled.div`
  background: green;
  display: flex;

  .left-content {
    background: ${theme.background.primary};
    flex: 1;
  }
  .right-content {
    background: ${theme.background.primary};
    color: ${theme.fonts.color.primary};
    width: 220px;
    padding: 24px 12px;
    font-size: ${rem('14px')};

    .additional-info {
      background: ${theme.background.content};
      padding: 12px;
      border-radius: ${theme.general.borderRadius};

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
