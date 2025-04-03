import { Box, Fab } from '@mui/material';
import { Add } from '@mui/icons-material';
import { useAddNote, useNotes } from '../../api/notes-api';
import { Fragment } from 'react';

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
        {notes.map((note) => (
          <Fragment key={note.id}>
            <span>{note.title}</span>
            <br />
          </Fragment>
        ))}
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
