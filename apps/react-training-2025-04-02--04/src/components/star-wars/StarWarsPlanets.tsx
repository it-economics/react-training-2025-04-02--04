import {
  Box,
  Button,
  Grid,
  LinearProgress,
  Stack,
  Tooltip,
  Typography,
} from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { usePlanets } from './api';
import { StarWarsPlanet } from './StarWarsPlanet';

export const StarWarsPlanets: FC<PropsWithChildren> = ({ children }) => {
  const { planets, next, isLoading, previous, error } = usePlanets();

  if (error)
    return <Typography color="error">Something went wrong 😔</Typography>;

  return (
    <Stack spacing={2}>
      {isLoading && <LinearProgress />}
      <Grid container spacing={6} columns={10}>
        {planets.map((planet) => (
          <Grid key={planet.name} size={{ xs: 2.5, md: 2 }}>
            <StarWarsPlanet planet={planet} />
          </Grid>
        ))}
      </Grid>
      <Stack direction="row" justifyContent="space-between">
        <NavButton label="Previous" onClick={previous} loading={isLoading} />
        <NavButton label="Next" onClick={next} loading={isLoading} />
      </Stack>
      {children}
    </Stack>
  );
};
const NavButton: FC<{
  label: string;
  onClick?: VoidFunction;
  loading?: boolean;
}> = ({ label, onClick, loading }) => (
  <Tooltip
    title={
      !onClick
        ? 'This is not the route you are looking for!'
        : loading
        ? 'Hold your horses, loading in progress!'
        : undefined
    }
  >
    <Box>
      <Button disabled={!onClick} loading={loading} onClick={() => onClick?.()}>
        {label}
      </Button>
    </Box>
  </Tooltip>
);
