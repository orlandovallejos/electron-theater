/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import styled from 'styled-components';

const getButtonProps = () => `
  border: none;
  padding: 14px 50px;
  border-radius: 5px;
  color: #fff;
  font-weight: 400;
  font-size: 16px;
  cursor: pointer;
  outline: none;
`;

const ButtonPrimary = styled.button`
  ${() => getButtonProps()};
  background: linear-gradient(244deg, #068eff 30.91%, #95d8ff 150.35%);
`;
ButtonPrimary.displayName = 'ButtonPrimary';

const WrapperSecondary = styled.div`
  backdrop-filter: blur(5px) contrast(0.8);
  border-radius: 5px;
`;
const ButtonSecondary = styled.button`
  ${() => getButtonProps()};
  background: none;
`;
ButtonSecondary.displayName = 'ButtonSecondary';

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export { ButtonPrimary, WrapperSecondary, ButtonSecondary };
export default null;
