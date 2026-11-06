/*------------------------------------------------*/
/* LIBRARIES
/*------------------------------------------------*/
import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
/*------------------------------------------------*/
/* INTERNAL DEPENDENCIES
/*------------------------------------------------*/
import Button from './index';

// Jest uses fake timers in this project, so user-event must advance them.
const setupUser = () =>
  userEvent.setup({ advanceTimers: jest.advanceTimersByTime });

describe('<Button />', () => {
  it.each(['primary', 'secondary', 'outlined'] as const)(
    'should render a %s button with its label',
    (types) => {
      render(<Button types={types}>Click me!</Button>);

      expect(screen.getByRole('button', { name: 'Click me!' })).toBeVisible();
    }
  );

  it('should call onClick when it is clicked', async () => {
    const onClick = jest.fn();
    render(
      <Button types="primary" onClick={onClick}>
        Click me!
      </Button>
    );

    await setupUser().click(screen.getByRole('button', { name: 'Click me!' }));

    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('should not call onClick when it is disabled', async () => {
    const onClick = jest.fn();
    render(
      <Button types="secondary" onClick={onClick} disabled>
        Click me!
      </Button>
    );

    await setupUser().click(screen.getByRole('button', { name: 'Click me!' }));

    expect(onClick).not.toHaveBeenCalled();
  });
});
