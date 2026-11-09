/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import GoBackButton from './index';

describe('<GoBackButton />', () => {
  it('should go back to the previous screen when it is clicked', async () => {
    // Jest uses fake timers in this project, so user-event must advance them.
    const user = userEvent.setup({ advanceTimers: jest.advanceTimersByTime });
    render(
      <MemoryRouter initialEntries={['/', '/movie/1']} initialIndex={1}>
        <Routes>
          <Route path="/" element={<div>home screen</div>} />
          <Route path="/movie/:movieId" element={<GoBackButton />} />
        </Routes>
      </MemoryRouter>
    );

    await user.click(screen.getByRole('button'));

    expect(screen.getByText('home screen')).toBeVisible();
  });
});
