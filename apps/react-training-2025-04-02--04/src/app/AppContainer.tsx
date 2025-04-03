import { AppBar, Box, Button, Stack, Toolbar, Typography } from '@mui/material';
import { FC, ReactNode, Suspense } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuthContext } from '../auth/components/AuthContext';

export const AppContainer = () => {
  const { isLoggedIn, logout } = useAuthContext();

  return (
    <Box height="100vh" width="100vw">
      <AppBar position="static">
        <Stack direction="row">
          <Toolbar>
            <MenuButton to="/home" label="Home" />
            <MenuButton to="/star-wars" label="Star Wars" />
            <MenuButton to="/solar-system" label="Solar System" />
            <MenuButton to="/joke" label="Chuck Norris Jokes" />
            {isLoggedIn && <Button onClick={logout}>Logout</Button>}
          </Toolbar>
        </Stack>
      </AppBar>
      <Suspense fallback={<Typography>Loading in AppContainer</Typography>}>
        <Box padding="20px">
          <Outlet />
        </Box>
      </Suspense>
    </Box>
  );
};

const MenuButton: FC<{ to: string; label: ReactNode }> = ({ to, label }) => (
  <NavLink to={to}>
    {({ isActive }) => (
      <Button variant={isActive ? 'contained' : 'text'} color="secondary">
        {label}
      </Button>
    )}
  </NavLink>
);
