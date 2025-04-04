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
  climate: planet.climate,
  terrain: planet.terrain,
  gravity: planet.gravity,
});

const fetchPlanet = (id: string) =>
  fetch(`${PLANETS_URL}${id}`).then((res) => {
    if (!res.ok || res.status !== 200) {
      throw new Error("Invalid response")
    }
    return res.json() as unknown as PlanetResponse;
  });

export const usePlanet = (id?: string) => {
  const [planet, setPlanet] = useState<PlanetResponse>();
  const [error, setError] = useState(false);
  const [isPending, startTransition] = useTransition();

  useEffect(() => {
    if (!id) return;

    setError(false);
    startTransition(() =>
      fetchPlanet(id)
        .then((planet) => setPlanet(planet))
        .catch((err) => {
          console.error(err);
          setError(true);
        })
    );
  }, [id]);

  return {
    isLoading: isPending,
    error,
    planet: planet ? toModel(planet): undefined,
  };
};
