import { render, screen } from '@testing-library/react';
import { expect } from 'vitest';

import Hello from './hello';

describe('Hello', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Hello />);
    expect(baseElement).toBeTruthy();
    expect(screen.queryByText(/hello/i)).not.toBeNull()
    expect(screen.getByTestId('hello')).toBeTruthy();
  });

  it('should display fallback when no name is set', () => {
    render(<Hello name={undefined} />)
    expect(screen.getByText('Hello World', {exact: false})).toBeTruthy()
  });

  it('should display name when it is set', () => {
    const name = 'My-cool-name'
    render(<Hello name={name} />)
    expect(screen.getByText(name, {exact: false})).toBeTruthy()
    expect(screen.getByText(new RegExp(name, 'ig'))).toBeTruthy()
  });
});
