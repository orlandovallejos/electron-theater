import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { Vibrant } from 'node-vibrant/browser';
import imageHelper from '../../helpers/image';
import Header from './header';

jest.mock('node-vibrant/browser', () => ({
  Vibrant: jest.fn(),
}));

const baseMovie = {
  title: 'A movie',
  tagline: 'A tagline',
  overview: 'An overview',
  release_date: '2018-05-15T12:00:00',
  poster_path: '/poster.jpg',
  backdrop_path: '/backdrop.jpg',
  vote_average: 7.84,
};
const movie = baseMovie as never;

const mockPalette = (getPalette: jest.Mock) => {
  jest.mocked(Vibrant).mockImplementation((() => ({ getPalette })) as never);
};

describe('<Header />', () => {
  beforeAll(() => {
    imageHelper.setBaseURL({ url: 'https://images.test/' });
  });

  beforeEach(() => {
    mockPalette(jest.fn().mockResolvedValue({ Vibrant: { hex: '#123456' } }));
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should show the movie details', async () => {
    render(<Header movie={movie} />);

    expect(screen.getByText('A movie', { selector: 'h1' })).toBeInTheDocument();
    expect(screen.getByText('A tagline')).toBeInTheDocument();
    expect(screen.getByText('An overview')).toBeInTheDocument();
    expect(screen.getByText('5/15/2018')).toBeInTheDocument();
    expect(screen.getByText('7.8')).toBeInTheDocument();
    expect(screen.getByRole('img', { name: 'A movie' })).toHaveAttribute(
      'src',
      imageHelper.getPosterImage('/poster.jpg')
    );
    await waitFor(() => expect(Vibrant).toHaveBeenCalled());
  });

  it('should not offer a trailer without a key', () => {
    render(<Header movie={movie} />);

    expect(screen.queryByText('Play trailer')).not.toBeInTheDocument();
  });

  it('should open the trailer in a modal', async () => {
    render(<Header movie={movie} trailerKey="abc123" />);

    fireEvent.click(screen.getByText('Play trailer'));

    const frame = await screen.findByTitle('YouTube video player');
    expect(frame).toHaveAttribute(
      'src',
      'https://www.youtube-nocookie.com/embed/abc123'
    );
  });

  it.each([
    [8, 'success'],
    [5, 'warning'],
    [2, 'danger'],
  ])('should color a rating of %p as %s', (voteAverage, color) => {
    const { container } = render(
      <Header movie={{ ...baseMovie, vote_average: voteAverage } as never} />
    );

    expect(container.querySelector('[role="progressbar"]')).toHaveClass(
      `MuiCircularProgress-color${color[0].toUpperCase()}${color.slice(1)}`
    );
  });

  it('should fall back to the default color when the palette fails', async () => {
    const getPalette = jest.fn().mockRejectedValue(new Error('CORS'));
    mockPalette(getPalette);

    render(<Header movie={movie} />);

    await waitFor(() => expect(getPalette).toHaveBeenCalled());
    expect(screen.getByText('A movie', { selector: 'h1' })).toBeInTheDocument();
  });
});
