import { render, screen, waitFor } from '@testing-library/react';
import { userEvent } from '@testing-library/user-event';
import { JokeResponse } from './client';

import Joke from './joke';

const fetchMock = vi.fn();
global.fetch = fetchMock;

describe('Joke', () => {
  it('should render successfully', () => {
    const { baseElement } = render(<Joke />);
    expect(baseElement).toBeTruthy();
  });

  it('should render a header', () => {
    renderJoke();
    expect(screen.getByText('Chuck Norris Jokes!')).toBeTruthy();
  });

  it('should display button to fetch a new joke', () => {
    const { newJokeBtn } = renderJoke();
    expect(newJokeBtn).toBeTruthy();
  });

  it('should display new joke after button was clicked', async () => {
    const { newJokeBtn } = renderJoke();

    const joke = 'Chuck Norris can divide by zero.';
    const joke2 = 'Chuck Norris can do all the push-ups.';
    const mockResponse: JokeResponse = { value: joke };

    fetchMock.mockResolvedValueOnce({
      json: () => Promise.resolve(mockResponse),
    });
    fetchMock.mockResolvedValue({
      json: () => Promise.resolve({ value: joke2 }),
    });

    await userEvent.click(newJokeBtn);
    expect(await screen.findByText(joke)).toBeTruthy();

    await userEvent.click(newJokeBtn);
    expect(await screen.findByText(joke2)).toBeTruthy();
  });

  it('should display error message when joke fetching fails', async () => {
    const { newJokeBtn } = renderJoke();

    fetchMock.mockRejectedValueOnce(new Error('Oh No!'));
    await userEvent.click(newJokeBtn);
    expect(await screen.findByText(/error/i)).toBeTruthy();

    fetchMock.mockResolvedValue({
      json: () => Promise.resolve({ value: 'Some joke' }),
    });
    await userEvent.click(newJokeBtn);
    await waitFor(() => expect(screen.queryByText(/error/i)).toBeNull());
  });
});

function renderJoke() {
  render(<Joke />);
  const newJokeBtn = screen.getByText(/new joke/i);
  return { newJokeBtn };
}
