import { render, screen } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { describe, expect } from 'vitest';
import { LoginResponse } from '../../auth/auth-utils';
import { LoginForm } from './LoginForm';

const mocks = vi.hoisted(() => ({
  login: vi.fn(),
}));

vi.mock('../../auth/auth-utils', async (importOriginal) => {
  const original = (await importOriginal()) as any;
  return {
    ...original, // keep original implementation
    login: mocks.login, // only override login
  };
});

describe('LoginForm', () => {
  beforeEach(() => {
    mocks.login.mockClear();
    mocks.login.mockResolvedValueOnce({
      json: () => Promise.resolve({ token: 'abc' } satisfies LoginResponse),
    });
  });

  it('should render', () => {
    renderLogin();
  });

  it('should have email and password fields and submit button', () => {
    const { emailInput, passwordInput, submitBtn } = renderLogin();
    expect(emailInput).toBeTruthy();
    expect(passwordInput).toBeTruthy();
    expect(submitBtn).toBeTruthy();
  });

  it('should call login with entered credentials when clicking on login', async () => {
    const { emailInput, passwordInput, submitBtn } = renderLogin();

    const email = 'my-test@mail.com';
    const password = 'my-super-secret-password';

    userEvent.setup();

    await userEvent.type(emailInput, email);
    await userEvent.type(passwordInput, password);
    await userEvent.click(submitBtn);

    expect(mocks.login).toHaveBeenCalledWith(email, password);
  });
});

const renderLogin = () => {
  render(
    <MemoryRouter>
      {/* Necessary, because we use react-router Links in our page */}
      <LoginForm />
    </MemoryRouter>
  );

  return {
    emailInput: screen.getByLabelText(/mail/i),
    passwordInput: screen.getByLabelText(/password/i),
    submitBtn: screen.getByRole('button', { name: /login/i }),
  };
};
