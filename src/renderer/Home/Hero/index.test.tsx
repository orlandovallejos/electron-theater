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
    const wrapper = shallow(<Hero movie={{
      id: 'item-01',
      backdropPath: 'backdrop path',
      posterPath: 'poster path',
      title: 'My movie',
      voteAverage: 7,
      releaseDate: '2021-04-19',
    }} />);

    expect(wrapper.debug()).toMatchSnapshot();
  });
});
