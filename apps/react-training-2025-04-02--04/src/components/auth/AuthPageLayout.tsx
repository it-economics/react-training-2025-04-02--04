import { Box, Paper } from '@mui/material';
import { FC, PropsWithChildren } from 'react';

export const AuthPageLayout: FC<PropsWithChildren> = ({ children }) => (
  <Box
    sx={(theme) => ({
      height: '100vh',
      width: '100vw',
      display: 'flex',
      alignItems: 'center',
      backgroundColor: theme.palette.primary.main,
    })}
  >
    <Paper
      sx={{ width: '80%', maxWidth: '500px', margin: 'auto', padding: '2rem' }}
    >
      {children}
    </Paper>
  </Box>
);
