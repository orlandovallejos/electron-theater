/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import shallow from 'enzyme/shallow';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import PosterItem from './index';

jest.mock('node-vibrant', () => {
  return {
    from: jest.fn(() => ({
      getPalette: jest.fn().mockResolvedValue({
        Vibrant: {
          getHex: jest.fn(() => 'blue'),
        },
        DarkVibrant: {
          getHex: jest.fn(() => 'red'),
        },
      }),
    })),
  };
});

describe('<PosterItem />', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should render a poster', () => {
    const wrapper = shallow(
      <PosterItem
        url="www.site.com/img.jpg"
        title="My movie"
        voteAverage={7.8}
        releaseDate="2018-05-15"
      />
    );

    expect(wrapper.debug()).toMatchSnapshot();
  });
});
