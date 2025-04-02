import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { expect } from 'vitest';

import Input from './input';

describe('Input', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Input onInputChange={() => {}} />);
    expect(baseElement).toBeTruthy();
  });

  it('should have input element', () => {
    const { input } = renderInput();
    expect(input).toBeTruthy();
  });

  it('should call onInputChange when user types new name', async () => {
    const onInputChange = vi.fn();
    const { input } = renderInput(onInputChange);

    const name = 'Another Name';
    await userEvent.type(input, name);
    expect(onInputChange).toHaveBeenLastCalledWith(name);
  });
});

const renderInput = (onInputChange: (value: string) => void = vi.fn()) => {
  render(<Input onInputChange={onInputChange} />);
  const input = screen.getByLabelText(/input/i);
  return { input };
};
