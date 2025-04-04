import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { render, screen } from '@testing-library/react';
import { describe } from 'vitest';
import { NotesGallery } from './NotesGallery';

const queryClient = new QueryClient();

describe('NotesGallery', () => {
  it('show notes', async () => {
    render(
      <QueryClientProvider client={queryClient}>
        <NotesGallery />
      </QueryClientProvider>
    );
    expect(await screen.findByText('My Cool Title')).toBeTruthy();
  });
});
