/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import { render, screen } from '@testing-library/react';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import Section from './index';

// The poster is tested on its own, here only what Section passes to it matters.
jest.mock('../../../common/PosterItem', () => ({
  __esModule: true,
  default: ({ title, baseUrl }: { title: string; baseUrl: string }) => (
    <div data-testid="poster" data-base-url={baseUrl}>
      {title}
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

describe('<Section />', () => {
  it('should render one poster per item', () => {
    render(
      <Section
        items={[buildItem('1', 'First movie'), buildItem('2', 'Second movie')]}
        baseUrl="movie"
      />
    );

    expect(screen.getAllByTestId('poster')).toHaveLength(2);
    expect(screen.getByText('First movie')).toBeVisible();
    expect(screen.getByText('Second movie')).toBeVisible();
  });

  it('should pass the base url to every poster', () => {
    render(<Section items={[buildItem('1', 'A series')]} baseUrl="serie" />);

    expect(screen.getByTestId('poster')).toHaveAttribute(
      'data-base-url',
      'serie'
    );
  });

  it('should render no posters for an empty list', () => {
    render(<Section items={[]} baseUrl="movie" />);

    expect(screen.queryByTestId('poster')).not.toBeInTheDocument();
  });
});
