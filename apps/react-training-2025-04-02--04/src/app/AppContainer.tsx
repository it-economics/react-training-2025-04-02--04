import {
  AppBar,
  Box,
  Button,
  Stack,
  Switch,
  Toolbar,
  Typography,
} from '@mui/material';
import { FC, ReactNode, Suspense, useEffect, useState } from 'react';
import { NavLink, Outlet } from 'react-router-dom';
import { useAuthContext } from '../auth/components/AuthContext';
import i18next from 'i18next';

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
            <MenuButton to="/notes" label="Notes" />
            <MenuButton to="/issues" label="Issues" />
            <LanguageSwitch />
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

const LanguageSwitch = () => {
  const [language, setLanguage] = useState('en');

  useEffect(() => {
    i18next.changeLanguage(language);
  }, [language]);

  return (
    <Stack direction="row" padding={1} sx={{ alignItems: 'center' }}>
      <Typography>English</Typography>
      <Switch
        color={'info'}
        onChange={() =>
          language === 'en' ? setLanguage('de') : setLanguage('en')
        }
      />
      <Typography>German</Typography>
    </Stack>
  );
};
