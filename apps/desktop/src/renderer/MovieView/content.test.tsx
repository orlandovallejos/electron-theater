import React from 'react';
import { render, screen } from '@testing-library/react';
import Content from './content';

const movie = {
  title: 'A movie',
  status: 'Released',
  original_language: 'en',
  budget: 1500000,
  revenue: 2500000000,
} as never;

describe('<Content />', () => {
  it('should show the title and the additional info', () => {
    render(<Content movie={movie} />);

    expect(screen.getByText('A movie')).toBeInTheDocument();
    expect(screen.getByText('Released')).toBeInTheDocument();
    expect(screen.getByText('English')).toBeInTheDocument();
    expect(screen.getByText('1.50 M')).toBeInTheDocument();
    expect(screen.getByText('2.50 B')).toBeInTheDocument();
  });
});
