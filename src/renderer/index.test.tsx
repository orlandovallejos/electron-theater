/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import { render } from 'react-dom';
import axiosConfig from '../config/axios-config';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import './index';

jest.mock('react-dom');
jest.mock('../config/axios-config', () => ({
  setup: jest.fn(),
}));

describe('Renderer', () => {
  afterAll(() => {
    jest.resetAllMocks();
  });

  it('should render correctly', () => {
    expect(render).toHaveBeenCalledTimes(1);
    expect(axiosConfig.setup).toHaveBeenCalledTimes(1);
  });
});
