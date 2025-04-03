import { lazy } from 'react';
import { createBrowserRouter, Navigate, Outlet } from 'react-router-dom';
import App from './app/app';
import { Home } from './components/home/home';
import { StarWarsPlanetDetails } from './components/star-wars/StarWarsPlanetDetails';
import { StarWarsPlanets } from './components/star-wars/StarWarsPlanets';

const Joke = lazy(() => import('./pages/joke'));
const StarWars = lazy(() => import('./pages/star-wars'));
const SolarSystem = lazy(() => import('./pages/solar-system'));
const NotFound = lazy(() => import('./pages/not-found'));

export const router = createBrowserRouter([
  {
    path: '',
    element: <App />,
    children: [
      { index: true, element: <Navigate to="./home" replace /> },
      { path: 'home', element: <Home /> },
      { path: 'joke', element: <Joke /> },
      { path: 'solar-system', element: <SolarSystem /> },
      {
        path: 'star-wars',
        element: <StarWars />,
        children: [
          {
            index: true,
            element: <Navigate to="./planets" replace />,
          },
          {
            path: 'planets',
            element: (
              <StarWarsPlanets>
                <Outlet />
              </StarWarsPlanets>
            ),
            children: [
              { index: true, element: null },
              { path: ':id', element: <StarWarsPlanetDetails /> },
            ],
          },
        ],
      },
      { path: '*', element: <NotFound /> },
    ],
  },
]);
