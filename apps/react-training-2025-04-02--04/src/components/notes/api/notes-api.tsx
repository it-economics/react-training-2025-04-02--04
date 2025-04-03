import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { Note } from '../model/notes';
import { getToken } from '../../../auth/auth-utils';

const API_URL = 'http://localhost:9000';

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

export const useNotes = () => {
  const { data } = useQuery({
    queryKey: [NOTES_QUERY_KEY],
    queryFn: () =>
      fetch(API_URL + '/notes', { ...getHeaders() })
        .then((res) => res.json() as unknown as NotesResponse)
        .then((res) => Object.values(res.notes)),
  });
  return data ?? [];
};

export const useAddNote = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (note: Note) =>
      fetch(API_URL + '/notes', {
        method: 'PUT',
        body: JSON.stringify({ note }),
        ...getHeaders(),
      }),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: [NOTES_QUERY_KEY] });
    },
  });
};
