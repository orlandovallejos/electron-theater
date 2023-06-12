/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import { act } from 'react-test-renderer';
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

  it('should render a poster', async () => {
    const wrapper = shallow(
      <PosterItem
        id="movie-01"
        url="www.site.com/img.jpg"
        title="My movie"
        voteAverage={7.8}
        releaseDate="2018-05-15"
      />
    );

    // This refresh the component and renders the last state:
    await act(async () => {});

    expect(wrapper.debug()).toMatchSnapshot();
  });
});
