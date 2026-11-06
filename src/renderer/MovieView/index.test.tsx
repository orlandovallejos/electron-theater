/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import moviesApi from '../../api/Movies';
import MovieView from './index';

jest.mock('../../api/Movies');
// The pieces are tested on their own, here only what MovieView loads matters.
jest.mock('../common/GoBackButton', () => ({
  __esModule: true,
  default: () => <button type="button">back</button>,
}));
jest.mock('./header', () => ({
  __esModule: true,
  default: ({
    movie,
    trailerKey,
  }: {
    movie: { title: string };
    trailerKey: string;
  }) => (
    <div data-testid="header">
      {movie.title} / trailer {trailerKey}
    </div>
  ),
}));
jest.mock('./content', () => ({
  __esModule: true,
  default: () => <div data-testid="content" />,
}));

const renderAt = (path: string) =>
  render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/movie/:movieId" element={<MovieView />} />
        <Route path="/serie/:serieId" element={<MovieView />} />
      </Routes>
    </MemoryRouter>
  );

describe('<MovieView />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should load the movie from the route and show it', async () => {
    jest
      .mocked(moviesApi.getMovie)
      .mockResolvedValue({ title: 'A movie' } as never);
    jest.mocked(moviesApi.getMovieTrailer).mockResolvedValue('abc123');

    renderAt('/movie/42');

    expect(await screen.findByTestId('header')).toHaveTextContent(
      'A movie / trailer abc123'
    );
    expect(moviesApi.getMovie).toHaveBeenCalledWith('42');
    expect(moviesApi.getSerie).not.toHaveBeenCalled();
  });

  it('should load the series from the route and show it', async () => {
    jest
      .mocked(moviesApi.getSerie)
      .mockResolvedValue({ title: 'A series' } as never);
    jest.mocked(moviesApi.getSerieTrailer).mockResolvedValue('xyz789');

    renderAt('/serie/7');

    expect(await screen.findByTestId('header')).toHaveTextContent(
      'A series / trailer xyz789'
    );
    expect(moviesApi.getSerie).toHaveBeenCalledWith('7');
    expect(moviesApi.getMovie).not.toHaveBeenCalled();
  });

  it('should show the back button before the data arrives', () => {
    jest.mocked(moviesApi.getMovie).mockReturnValue(new Promise(() => {}));
    jest
      .mocked(moviesApi.getMovieTrailer)
      .mockReturnValue(new Promise(() => {}));

    renderAt('/movie/1');

    expect(screen.getByRole('button', { name: 'back' })).toBeVisible();
    expect(screen.queryByTestId('header')).not.toBeInTheDocument();
  });
});
