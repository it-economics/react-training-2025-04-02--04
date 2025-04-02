import { Box, Paper, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { Planet } from './model';

export const StarWarsPlanet: FC<{ planet: Planet }> = ({ planet }) => (
  <Box height="100%" width="100%">
    <Paper sx={{ height: '100%', width: '100%' }}>
      <Stack spacing={2}>
        <Typography variant="h5">{planet.name}</Typography>
        <Typography>Diameter: {planet.diameter}</Typography>
      </Stack>
    </Paper>
  </Box>
);
