/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import styles from './index.scss';

type Props = {
  type: 'primary' | 'secondary';
  children: React.ReactNode;
};

const Button = (props: Props) => {
  const { type, children } = props;
  let wrapper;
  let className = '';

  switch (type) {
    case 'secondary':
      className = styles.secondary;
      wrapper = <div className={styles.secondaryWrapper} />;
      break;
    default:
      className = styles.primary;
      wrapper = <></>;
      break;
  }

  return React.cloneElement(
    wrapper,
    {},
    <button type="button" className={className}>
      {children}
    </button>
  );
};

/*------------------------------------------------*/
/* EXPORTS
/*------------------------------------------------*/
export default Button;
