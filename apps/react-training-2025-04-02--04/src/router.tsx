import { lazy } from 'react';
import { createBrowserRouter, Navigate } from 'react-router-dom';
import App from './app/app';
import { Home } from './components/home/home';

const Joke = lazy(() => import('./pages/joke'));
const StarWars = lazy(() => import('./pages/star-wars'));
const SolarSystem = lazy(() => import('./pages/solar-system'));

export const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="./home" replace /> },
      { path: 'home', element: <Home /> },
      { path: 'joke', element: <Joke /> },
      { path: 'solar-system', element: <SolarSystem /> },
      { path: 'star-wars', element: <StarWars /> },
    ],
  },
]);
