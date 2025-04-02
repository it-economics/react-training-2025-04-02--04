import { Stack, Typography } from '@mui/material';
import { StarWarsPlanets } from './StarWarsPlanets';

export const StarWars = () => (
  <Stack>
    <Typography component="h1" variant="h3">
      Star Wars!
    </Typography>
    <StarWarsPlanets />
  </Stack>
);
