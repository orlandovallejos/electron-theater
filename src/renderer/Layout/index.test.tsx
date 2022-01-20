/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import shallow from 'enzyme/shallow';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import Layout from './index';

describe('<Layout />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Layout />);

    expect(wrapper.debug()).toMatchSnapshot();
  });
});
