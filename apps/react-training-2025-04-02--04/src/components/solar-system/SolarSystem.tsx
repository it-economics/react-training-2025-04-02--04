import { Grid, Stack, Typography } from '@mui/material';
import { MyPlanet, SolarSystem as SolarSystemModel } from './model';
import { Planet } from './Planet';

export const SolarSystem = () => {
  return (
    <Stack>
      <Typography variant="h3" component="h1">
        Our Solar System
      </Typography>
      <Grid container spacing={2}>
        {solarSystem.map((planet) => (
          <Grid size={4} key={planet.name}>
            <Planet {...planet} />
          </Grid>
        ))}
      </Grid>
    </Stack>
  );
};

const mars = new MyPlanet();

const solarSystem: SolarSystemModel = [
  { name: 'Mercury', isPopulated: false },
  { name: 'Venus', isPopulated: false },
  {
    name: 'Earth',
    isPopulated: true,
    moons: [{ name: 'Moon' }],
    diameter: 16000,
  },
  mars,
];
