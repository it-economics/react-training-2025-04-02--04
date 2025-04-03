import { Note } from '../model/notes';
import { FC } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  IconButton,
  Stack,
  Typography,
} from '@mui/material';
import { useDeleteNote } from '../api/notes-api';
import Delete from '@mui/icons-material/Delete';

interface NoteCardProps {
  note: Note;
}

export const NoteCard: FC<NoteCardProps> = ({ note }) => {
  const { mutateAsync: deleteNote, isPending: isDeleting } = useDeleteNote();

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
            <Typography variant="h5">{note.title}</Typography>
            <Typography variant="h6">{note.text}</Typography>
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
      </CardActions>
    </Card>
  );
};
