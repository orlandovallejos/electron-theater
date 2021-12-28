/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import {
  ButtonPrimary,
  WrapperSecondary,
  ButtonSecondary,
} from 'renderer/common/Button/style';

type Props = {
  type: 'primary' | 'secondary';
  children: React.ReactNode;
};

const Button = (props: Props) => {
  const { type, children } = props;
  let component;

  switch (type) {
    case 'secondary':
      component = (
        <WrapperSecondary>
          <ButtonSecondary>{children}</ButtonSecondary>
        </WrapperSecondary>
      );
      break;
    default:
      component = <ButtonPrimary>{children}</ButtonPrimary>;
      break;
  }

  return component;
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default Button;
