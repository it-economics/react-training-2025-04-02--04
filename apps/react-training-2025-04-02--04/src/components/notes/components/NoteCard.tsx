import { Note } from '../model/notes';
import { FC } from 'react';
import {
  Box,
  Card,
  CardActions,
  CardContent,
  Stack,
  Typography,
} from '@mui/material';

interface NoteCardProps {
  note: Note;
}

export const NoteCard: FC<NoteCardProps> = ({ note }) => {
  return (
    <Card
      sx={(theme) => ({
        backgroundColor: theme.palette.primary.light,
        color: 'white',
        width: '100px',
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
      <CardActions></CardActions>
    </Card>
  );
};
