/* eslint-disable react/jsx-props-no-spreading */
/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import { ButtonPrimary, WrapperSecondary, ButtonSecondary } from './style';

interface Props extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  types: 'primary' | 'secondary';
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  children: any;
}

const Button = (props: Props) => {
  const { types, children, ...rest } = props;
  let component: React.ReactElement;

  switch (types) {
    case 'secondary':
      component = (
        <WrapperSecondary>
          <ButtonSecondary {...rest}>{children}</ButtonSecondary>
        </WrapperSecondary>
      );
      break;
    default:
      component = <ButtonPrimary {...rest}>{children}</ButtonPrimary>;
      break;
  }

  return component;
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default Button;
