/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import { mathHelper } from '@movie-mates/core';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import moviesApi from '../../api/Movies';
import Home from './index';

jest.mock('../../api/Movies');

// The children are tested on their own, here only what Home gives them matters.
jest.mock('./Hero', () => ({
  __esModule: true,
  default: ({ movie }: { movie: { title: string } }) => (
    <div data-testid="hero">{movie.title}</div>
  ),
}));
jest.mock('./Content', () => ({
  __esModule: true,
  default: ({
    movies,
    series,
  }: {
    movies: { title: string }[];
    series: { title: string }[];
  }) => (
    <div data-testid="content">
      movies: {movies.map((movie) => movie.title).join(',')} | series:{' '}
      {series.map((serie) => serie.title).join(',')}
    </div>
  ),
}));

const buildItem = (id: string, title: string) => ({
  id,
  backdropPath: 'backdrop path',
  posterPath: 'poster path',
  title,
  voteAverage: 7,
  releaseDate: '2021-04-19',
});

describe('<Home />', () => {
  beforeEach(() => {
    jest.mocked(moviesApi.getTopMovies).mockResolvedValue({
      results: [buildItem('m1', 'Movie one')],
    });
    jest.mocked(moviesApi.getTopSeries).mockResolvedValue({
      results: [buildItem('s1', 'Series one')],
    });
    // Only the random pick is replaced; the rest of core stays real.
    jest.spyOn(mathHelper, 'randomIntFromInterval').mockReturnValue(1);
  });

  afterEach(() => {
    jest.resetAllMocks();
    jest.restoreAllMocks();
  });

  it('should load the trending movies and series into the content', async () => {
    render(<Home />);

    // Movies and series arrive one after the other, so wait for both.
    await waitFor(() =>
      expect(screen.getByTestId('content')).toHaveTextContent(
        'movies: Movie one | series: Series one'
      )
    );
  });

  it('should show a randomly chosen title in the hero', async () => {
    render(<Home />);

    // Index 1 of [movies..., series...] is the first series.
    expect(await screen.findByTestId('hero')).toHaveTextContent('Series one');
    expect(mathHelper.randomIntFromInterval).toHaveBeenCalledWith(0, 1);
  });

  it('should not show a hero when nothing was loaded', async () => {
    jest.mocked(moviesApi.getTopMovies).mockResolvedValue({ results: [] });
    jest.mocked(moviesApi.getTopSeries).mockResolvedValue({ results: [] });

    render(<Home />);

    expect(await screen.findByTestId('content')).toBeVisible();
    expect(screen.queryByTestId('hero')).not.toBeInTheDocument();
  });
});
