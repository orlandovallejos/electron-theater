/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import { render, screen } from '@testing-library/react';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import moviesApi from '../api/Movies';
import imageHelper from '../helpers/image';
import App from './App';

jest.mock('../api/Movies');
jest.mock('./Layout', () => ({
  __esModule: true,
  default: () => <div data-testid="layout" />,
}));

describe('<App />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should render nothing until the configuration is loaded', () => {
    // A request that never finishes.
    jest
      .mocked(moviesApi.getConfiguration)
      .mockReturnValue(new Promise(() => {}));

    const { container } = render(<App />);

    expect(container).toBeEmptyDOMElement();
  });

  it('should render the layout once the configuration is loaded', async () => {
    jest.mocked(moviesApi.getConfiguration).mockResolvedValue({
      images: { secure_base_url: 'www.test.com/' },
    });

    render(<App />);

    expect(await screen.findByTestId('layout')).toBeVisible();
  });

  it('should use the configured images base url', async () => {
    jest.mocked(moviesApi.getConfiguration).mockResolvedValue({
      images: { secure_base_url: 'www.test.com/' },
    });

    render(<App />);
    await screen.findByTestId('layout');

    expect(imageHelper.getPosterImage('/poster.jpg')).toMatch(
      /^www\.test\.com\//
    );
  });

  it('should load images from the https base url, which the CSP allows', async () => {
    jest.mocked(moviesApi.getConfiguration).mockResolvedValue({
      images: { secure_base_url: 'https://image.tmdb.org/t/p/' },
    });

    render(<App />);
    await screen.findByTestId('layout');

    expect(imageHelper.getPosterImage('/poster.jpg')).toMatch(
      /^https:\/\/image\.tmdb\.org\//
    );
  });
});
