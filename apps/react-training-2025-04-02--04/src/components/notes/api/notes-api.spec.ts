import { describe } from 'vitest';
import { fetchNotes } from './notes-api';

describe('notes-api', () => {
  it('calls the msw API', async () => {
    const notes = await fetchNotes()
    expect(notes).toHaveLength(1);
    expect(notes[0].id).toBe('abcd');
    expect(notes[0].title).toBe('My Cool Title');
  });
})
