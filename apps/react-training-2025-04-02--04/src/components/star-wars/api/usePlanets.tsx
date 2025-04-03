import { useEffect, useState, useTransition } from 'react';
import { Planet } from '../model';
import { PlanetResponse, PlanetsResponse } from './client';

const SWAPI_URL = 'https://swapi.dev/api';
const PLANETS_URL = `${SWAPI_URL}/planets/`;

const fetchPlanets = (url: string) =>
  fetch(url).then((res) => res.json() as unknown as PlanetsResponse);

export const usePlanets = () => {
  const [url, setUrl] = useState(PLANETS_URL);
  const [planets, setPlanets] = useState<PlanetsResponse>();
  const [error, setError] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    setError(false);
    startTransition(() =>
      fetchPlanets(url)
        .then((planets) => setPlanets(planets))
        .catch((err) => {
          console.error(err);
          setError(true);
        })
    );
  }, [url]);

  return {
    previous: planets?.previous ? () => setUrl(planets.previous) : undefined,
    next: planets?.next ? () => setUrl(planets.next) : undefined,
    isLoading: isPending || !planets,
    error,
    planets: planets?.results?.map(toModel) ?? [],
  };
};

const urlRegex = /^.*\/(\d+)\/?$/

const toModel = (planet: PlanetResponse): Planet => ({
  name: planet.name,
  id: urlRegex.exec(planet.url)![1],
  diameter: Number(planet.diameter),
});
