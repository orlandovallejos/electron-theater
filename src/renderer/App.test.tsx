/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import { act } from 'react-test-renderer';
import shallow from 'enzyme/shallow';
import moviesApi from '../api/Movies';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import App from './App';

jest.mock('../api/Movies');

describe('<App />', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', async () => {
    moviesApi.getConfiguration = jest.fn().mockResolvedValue({
      images: {
        base_url: 'www.test.com/',
      },
    });

    const wrapper = shallow(<App />);
    // This refresh the component and renders the last state:
    await act(async () => {});
    expect(wrapper.debug()).toMatchSnapshot();
  });
});
