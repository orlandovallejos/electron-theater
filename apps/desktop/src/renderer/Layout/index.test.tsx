/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import { render, screen } from '@testing-library/react';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import Layout from './index';

// The screens are tested on their own, here only the layout and routing matter.
jest.mock('../common/AppBar', () => ({
  __esModule: true,
  default: () => <div data-testid="app-bar" />,
}));
jest.mock('../Home', () => ({
  __esModule: true,
  default: () => <div data-testid="home" />,
}));
jest.mock('../MovieView', () => ({
  __esModule: true,
  default: () => <div data-testid="movie-view" />,
}));

describe('<Layout />', () => {
  it('should render the app bar', () => {
    render(<Layout />);

    expect(screen.getByTestId('app-bar')).toBeVisible();
  });

  it('should open the home screen at the start', () => {
    render(<Layout />);

    expect(screen.getByTestId('home')).toBeVisible();
    expect(screen.queryByTestId('movie-view')).not.toBeInTheDocument();
  });
});
