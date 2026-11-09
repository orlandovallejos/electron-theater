import React from 'react';
import { act, fireEvent, render, screen } from '@testing-library/react';
import electronHelper from '../../../helpers/electron';
import AppBar from './index';

jest.mock('../../../helpers/electron');

describe('<AppBar />', () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should close, minimize and toggle full screen from the buttons', () => {
    render(<AppBar />);

    fireEvent.click(screen.getByRole('button', { name: 'Close' }));
    fireEvent.click(screen.getByRole('button', { name: 'Minimize' }));
    fireEvent.click(screen.getByRole('button', { name: 'Toggle full screen' }));

    expect(electronHelper.closeApp).toHaveBeenCalledTimes(1);
    expect(electronHelper.minimizeApp).toHaveBeenCalledTimes(1);
    expect(electronHelper.fullScreenApp).toHaveBeenCalledTimes(1);
  });

  it('should maximize on double click', () => {
    const { container } = render(<AppBar />);

    fireEvent.doubleClick(container.firstChild as Element);

    expect(electronHelper.maximizeApp).toHaveBeenCalledTimes(1);
  });

  it('should handle scrolling without errors and stop listening on unmount', () => {
    const remove = jest.spyOn(window, 'removeEventListener');
    const { unmount } = render(<AppBar />);

    document.documentElement.scrollTop = 200;
    fireEvent.scroll(window);
    act(() => {
      jest.advanceTimersByTime(150);
    });
    document.documentElement.scrollTop = 0;
    fireEvent.scroll(window);
    act(() => {
      jest.advanceTimersByTime(150);
    });

    unmount();
    expect(remove).toHaveBeenCalledWith('scroll', expect.any(Function));
    remove.mockRestore();
  });
});
