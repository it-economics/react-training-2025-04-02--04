import { Box, Fab, Stack } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useAddNote, useNotes } from '../../api/notes-api';
import { NoteCard } from '../../components/NoteCard';

export const NotesGallery = () => {
  const notes = useNotes();
  const { mutateAsync: addNewNote } = useAddNote();

  return (
    <Box sx={{ width: '100%', height: 'calc(100% - 40px)' }}>
      <Box
        sx={{
          width: 'calc(100% - 4rem)',
          height: 'calc(100% - 4rem)',
          position: 'relative',
          padding: '2rem',
          overflow: 'auto',
        }}
      >
        <Stack direction="row" flexWrap="wrap">
          {notes.map((note) => (
            <NoteCard note={note} key={note.id} />
          ))}
        </Stack>
      </Box>
      <Box sx={{ position: 'absolute', bottom: '1.5rem', right: '1.5rem' }}>
        <Fab
          color="primary"
          aria-label={'Add note'}
          onClick={() => addNewNote({ title: 'new note', text: '1234' })}
        >
          <Add />
        </Fab>
      </Box>
    </Box>
  );
};
