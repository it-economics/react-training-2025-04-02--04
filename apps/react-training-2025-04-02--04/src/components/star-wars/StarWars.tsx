import { Stack, Typography } from '@mui/material';
import { FC, PropsWithChildren } from 'react';
import { Outlet } from 'react-router-dom';

export const StarWars: FC<PropsWithChildren> = ({ children }) => (
  <Stack>
    <Typography component="h1" variant="h3">
      Star Wars!
    </Typography>
    <Outlet />
  </Stack>
);
