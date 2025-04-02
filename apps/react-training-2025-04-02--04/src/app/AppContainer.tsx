import { AppBar, Box, Stack, Typography } from '@mui/material';
import Home from '../pages/home';

export const AppContainer = () => (
  <Box height="100vh" width="100vw">
    <AppBar position="static">
      <Stack direction="row">
        <Typography variant="h4">Home</Typography>
      </Stack>
    </AppBar>
    <Home />
  </Box>
);
