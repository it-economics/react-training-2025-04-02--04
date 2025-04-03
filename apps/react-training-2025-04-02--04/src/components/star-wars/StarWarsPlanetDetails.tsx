import { LinearProgress, Stack, Typography } from '@mui/material';
import { FC } from 'react';
import { useParams } from 'react-router-dom';
import { usePlanet } from './api/usePlanets';
import { Planet } from './model';

export const StarWarsPlanetDetails = () => {
  const { id: planetId } = useParams<{ id: string }>();
  const { planet, isLoading, error } = usePlanet(planetId);

  if (error)
    return <Typography color="error">Something went wrong 😔</Typography>;

  return (
    <Stack>
      <Typography variant="h3">Planet Details</Typography>
      <Typography variant="h4">Planet ID: {planetId}</Typography>
      {isLoading && <LinearProgress />}
      <PlanetDetails planet={planet} />
    </Stack>
  );
};

const PlanetDetails: FC<{ planet?: Planet }> = ({ planet }) => planet ? (
  <>
    <Typography>Planet-Name: {planet.name}</Typography>
    <Typography>Gravity: {planet.gravity}</Typography>
    <Typography>Terrain: {planet.terrain}</Typography>
    <Typography>Climate: {planet.climate}</Typography>
  </>
): null
