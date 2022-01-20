/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import shallow from 'enzyme/shallow';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import Hero from './index';

describe('<Hero />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Hero />);

    expect(wrapper.debug()).toMatchSnapshot();
  });
});
