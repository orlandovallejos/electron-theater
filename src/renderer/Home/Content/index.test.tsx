/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import shallow from 'enzyme/shallow';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import Content from './index';

describe('<Content />', () => {
  it('should render correctly', () => {
    const wrapper = shallow(<Content movies={[]} series={[]} />);

    expect(wrapper.debug()).toMatchSnapshot();
  });
});
