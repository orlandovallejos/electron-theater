/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import { MemoryRouter } from 'react-router-dom';
import { render, screen, waitFor } from '@testing-library/react';
import { imageHelper } from '@electron-theater/core';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import PosterItem from './index';

jest.mock('node-vibrant/browser', () => {
  return {
    Vibrant: jest.fn(() => ({
      getPalette: jest.fn().mockResolvedValue({
        Vibrant: { hex: 'blue' },
        DarkVibrant: { hex: 'red' },
      }),
    })),
  };
});

type Overrides = { id?: string; url?: string; baseUrl?: string };

const renderPoster = ({
  id = 'movie-01',
  url = '/img.jpg',
  baseUrl = 'movie',
}: Overrides) =>
  render(
    <MemoryRouter>
      <PosterItem
        id={id}
        url={url}
        title="My movie"
        voteAverage={7.8}
        releaseDate="2018-05-15"
        baseUrl={baseUrl}
      />
    </MemoryRouter>
  );

describe('<PosterItem />', () => {
  beforeAll(() => {
    imageHelper.setBaseURL({ url: 'https://images.test/' });
  });

  it('should show the title, rating and release year', async () => {
    renderPoster({});

    expect(screen.getByText('My movie')).toBeVisible();
    expect(screen.getByText('7.8')).toBeVisible();
    expect(screen.getByText('2018')).toBeVisible();
    // Let the async palette update finish before the test ends.
    await waitFor(() => expect(screen.getByRole('img')).toBeVisible());
  });

  it('should show the poster image with the title as alt text', async () => {
    renderPoster({});

    const image = await screen.findByRole('img', { name: 'My movie' });
    expect(image).toHaveAttribute(
      'src',
      imageHelper.getPosterImage('/img.jpg')
    );
  });

  it('should link to the detail page using the base url and id', async () => {
    renderPoster({ baseUrl: 'serie', id: 'tv-42' });

    expect(screen.getByRole('link')).toHaveAttribute('href', '/serie/tv-42');
    await screen.findByRole('img');
  });

  it('should not render an image when there is no poster', () => {
    renderPoster({ url: '' });

    expect(screen.queryByRole('img')).not.toBeInTheDocument();
    expect(screen.getByText('My movie')).toBeVisible();
  });
});
