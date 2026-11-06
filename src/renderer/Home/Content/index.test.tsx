/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import { render, screen, within } from '@testing-library/react';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import Content from './index';

// Shows which items and base url each section received.
jest.mock('./Section', () => ({
  __esModule: true,
  default: ({
    items,
    baseUrl,
  }: {
    items: { title: string }[];
    baseUrl: string;
  }) => (
    <ul data-testid={`section-${baseUrl}`}>
      {items.map((item) => (
        <li key={item.title}>{item.title}</li>
      ))}
    </ul>
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

describe('<Content />', () => {
  it('should render a heading for movies and one for TV shows', () => {
    render(<Content movies={[]} series={[]} />);

    expect(
      screen.getByRole('heading', { name: 'Trending movies' })
    ).toBeVisible();
    expect(
      screen.getByRole('heading', { name: 'Trending TV Shows' })
    ).toBeVisible();
  });

  it('should send movies and series to their own section', () => {
    render(
      <Content
        movies={[buildItem('1', 'A movie')]}
        series={[buildItem('2', 'A series')]}
      />
    );

    const movies = within(screen.getByTestId('section-movie'));
    const series = within(screen.getByTestId('section-serie'));
    expect(movies.getByText('A movie')).toBeVisible();
    expect(movies.queryByText('A series')).not.toBeInTheDocument();
    expect(series.getByText('A series')).toBeVisible();
  });
});
