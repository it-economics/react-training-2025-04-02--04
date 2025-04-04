import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Note } from '../model/notes';
import { getToken } from '../../../auth/auth-utils';

// const API_URL = 'http://localhost:9000';
const API_URL = '/api';

const NOTES_QUERY_KEY = 'notes';

interface NotesResponse {
  notes: Record<string, Note>;
}

const getHeaders = () => ({
  headers: {
    authorization: `Bearer ${getToken()}`,
    'Content-Type': 'application/json',
  },
});

export const fetchNotes = () =>
  fetch(API_URL + '/notes', { ...getHeaders() })
    .then((res) => res.json() as unknown as NotesResponse)
    .then((res) => Object.values(res.notes));

const addNote = (note: Note) =>
  fetch(API_URL + '/notes', {
    method: 'PUT',
    body: JSON.stringify({ note }),
    ...getHeaders(),
  });

const deleteNote = (id: Note['id']) =>
  fetch(`${API_URL}/notes/${id}`, {
    method: 'DELETE',
    ...getHeaders(),
  });

const updateNote = (note: Note) =>
  fetch(`${API_URL}/notes/${note.id}`, {
    method: 'PATCH',
    body: JSON.stringify({ note }),
    ...getHeaders(),
  });

export const useNotes = () => {
  const { data } = useQuery({
    queryKey: [NOTES_QUERY_KEY],
    queryFn: fetchNotes,
  });
  return data ?? [];
};

export const useAddNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: addNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NOTES_QUERY_KEY] });
    },
  });
};

export const useDeleteNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NOTES_QUERY_KEY] });
    },
  });
};

export const useUpdateNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: updateNote,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NOTES_QUERY_KEY] });
    },
  });
};
