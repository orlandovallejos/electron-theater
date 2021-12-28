/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import styled from 'styled-components';

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
  background: #080808;
  flex: 1;
`;
ContentWrapper.displayName = 'ContentWrapper';

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export { ContentWrapper };
export default LayoutWrapper;
