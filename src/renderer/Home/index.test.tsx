/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import { act } from 'react-test-renderer';
import shallow from 'enzyme/shallow';
import moviesApi from '../../api/Movies';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import Home from './index';

jest.mock('../../api/Movies');

describe('<Home />', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', async () => {
    moviesApi.getTopMovies = jest.fn().mockResolvedValue({
      results: [],
    });
    moviesApi.getTopSeries = jest.fn().mockResolvedValue({
      results: [],
    });

    const wrapper = shallow(<Home />);
    // This refresh the component and renders the last state:
    await act(async () => {});
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
