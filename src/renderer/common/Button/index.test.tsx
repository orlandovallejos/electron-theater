/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import shallow from 'enzyme/shallow';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import Button from './index';

describe('<Button />', () => {
  it('should render a primary button', () => {
    const wrapper = shallow(<Button types="primary">Click me!</Button>);

    expect(wrapper.debug()).toMatchSnapshot();
  });

  it('should render a secondary button', () => {
    const wrapper = shallow(<Button types="secondary">Click me!</Button>);

    expect(wrapper.debug()).toMatchSnapshot();
  });
});
