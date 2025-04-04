import { Note } from '../model/notes';
import { FC, useEffect, useState } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { useDeleteNote, useUpdateNote } from '../api/notes-api';
import Delete from '@mui/icons-material/Delete';
import { Edit, Save } from '@mui/icons-material';

interface NoteCardProps {
  note: Note;
}

export const NoteCard: FC<NoteCardProps> = ({ note }) => {
  const { mutateAsync: deleteNote, isPending: isDeleting } = useDeleteNote();
  const { mutateAsync: updateNote, isPending: isUpdating } = useUpdateNote();

  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title);
  const [text, setText] = useState(note.text);

  useEffect(() => {
    setTitle(note.title);
    setText(note.text);
  }, [note]);

  const save = () => {
    console.log('saving note', { title, text });
    updateNote({ ...note, title, text }).then(() => console.log('note saved'));
    setIsEditing(false);
  };

  return (
    <Card
      sx={(theme) => ({
        backgroundColor: theme.palette.primary.light,
        color: 'white',
        width: '200px',
        margin: '5px',
        '&:hover': {
          '& .actions': {
            opacity: '1 !important',
            pointerEvents: 'auto !important',
          },
        },
      })}
    >
      <CardContent>
        <Box height="200px">
          <Stack spacing={2}>
            {isEditing ? (
              <TextField
                value={title}
                onChange={(event) => setTitle(event.target.value)}
                fullWidth
                label={'Title'}
              />
            ) : (
              <Typography variant="h5">{note.title}</Typography>
            )}
            {isEditing ? (
              <TextField
                value={text}
                onChange={(event) => setText(event.target.value)}
                fullWidth
                label={'Text'}
                multiline
                rows={4}
              />
            ) : (
              <Typography variant="h6">{note.text}</Typography>
            )}
          </Stack>
        </Box>
      </CardContent>
      <CardActions>
        <IconButton
          color="inherit"
          onClick={() => deleteNote(note.id)}
          disabled={isDeleting}
        >
          <Delete />
        </IconButton>
        {isEditing ? (
          <IconButton
            color="inherit"
            onClick={() => save()}
            loading={isUpdating}
          >
            <Save />
          </IconButton>
        ) : (
          <IconButton color="inherit" onClick={() => setIsEditing(true)}>
            <Edit />
          </IconButton>
        )}
      </CardActions>
    </Card>
  );
};
