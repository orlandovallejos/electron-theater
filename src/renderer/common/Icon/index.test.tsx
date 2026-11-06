import React from 'react';
import { render } from '@testing-library/react';
import Icon from '.';

describe('Icon', () => {
  it('renders the bundled SVG, hidden from assistive tech', () => {
    const { container } = render(<Icon name="star" />);
    const wrapper = container.querySelector('.icon');
    expect(wrapper).toHaveAttribute('aria-hidden', 'true');
    expect(wrapper?.querySelector('svg')).toBeInTheDocument();
  });

  it('renders a different SVG for each icon', () => {
    const star = render(<Icon name="star" />).container.innerHTML;
    const calendar = render(<Icon name="calendar-clear" />).container.innerHTML;
    expect(star).not.toEqual(calendar);
  });
});
