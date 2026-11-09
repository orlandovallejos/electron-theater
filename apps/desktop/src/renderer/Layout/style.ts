/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import styled from 'styled-components';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import theme from '../themes/default';

const LayoutWrapper = styled.div`
  background: red;
  display: flex;
  height: 100vh;
`;
LayoutWrapper.displayName = 'LayoutWrapper';

// const SidebarWrapper = styled.div`
//   background: green;
//   width: 250px;
// `;
// SidebarWrapper.displayName = 'SidebarWrapper';

const ContentWrapper = styled.div`
  background: ${theme.background.primary};
  flex: 1;
`;
ContentWrapper.displayName = 'ContentWrapper';

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export { ContentWrapper };
export default LayoutWrapper;
