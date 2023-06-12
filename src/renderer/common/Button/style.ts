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
  transition: all 0.5s;

  &:hover {
    opacity: 0.9;
  }
`;
ButtonPrimary.displayName = 'ButtonPrimary';

const ButtonOutlined = styled.button`
  ${() => getButtonProps()};
  background: transparent;
  border: 1px solid #101010;
  padding: 4px 10px;
  font-size: 12px;
  line-height: 16px;
  display: flex;
  align-items: center;
  color: #101010;

  ion-icon {
    font-size: 22px;
  }
  span {
    margin: 4px 0 0 0;
  }
`;
ButtonOutlined.displayName = 'ButtonOutlined';

const WrapperSecondary = styled.div`
  backdrop-filter: blur(5px) contrast(0.8);
  border-radius: 5px;
  transition: all 0.5s;

  &:hover {
    opacity: 0.9;
  }
`;
const ButtonSecondary = styled.button`
  ${() => getButtonProps()};
  background: none;
`;
ButtonSecondary.displayName = 'ButtonSecondary';

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export { ButtonPrimary, ButtonOutlined, WrapperSecondary, ButtonSecondary };
export default null;
