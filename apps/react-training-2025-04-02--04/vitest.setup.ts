import { delay, http, HttpResponse } from 'msw';
import { setupServer } from 'msw/node'; // Server/node-mode for testing
import { afterAll, afterEach, beforeAll } from 'vitest';

export const server = setupServer(
  http.get(/\/notes/i, async () => {
    await delay();
    return HttpResponse.json({ notes: { abc: { id: 'abcd', title: 'My Cool Title' } } });
  })
);

// Establish API mocking before all tests.
beforeAll(() => server.listen());

// Reset any request handlers that we may add during the tests,
// so they don't affect other tests.
afterEach(() => server.resetHandlers());

// Clean up after the tests are finished.
afterAll(() => server.close());
