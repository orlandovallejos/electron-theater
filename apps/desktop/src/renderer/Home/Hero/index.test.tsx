/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import { render, screen } from '@testing-library/react';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import imageHelper from '../../../helpers/image';
import Hero from './index';

const movie = {
  id: 'item-01',
  backdropPath: '/backdrop.jpg',
  posterPath: '/poster.jpg',
  title: 'My movie',
  voteAverage: 7,
  releaseDate: '2021-04-19',
};

describe('<Hero />', () => {
  beforeAll(() => {
    imageHelper.setBaseURL({ url: 'https://images.test/' });
  });

  it('should show the movie title', () => {
    render(<Hero movie={movie} />);

    expect(screen.getByText('My movie')).toBeVisible();
  });

  it('should use the backdrop as the background image', () => {
    const { container } = render(<Hero movie={movie} />);

    const backdrop = imageHelper.getBackdropImage('/backdrop.jpg');
    expect(container.firstChild).toHaveStyle({
      backgroundImage: `url(${backdrop})`,
    });
  });

  it('should show the Trailer and Watchlist buttons', () => {
    render(<Hero movie={movie} />);

    expect(screen.getByRole('button', { name: 'Trailer' })).toBeVisible();
    expect(screen.getByRole('button', { name: 'Watchlist' })).toBeVisible();
  });
});
