const examplePlanetsResponse = {
  count: 60,
  next: 'https://swapi.dev/api/planets/?page=2',
  previous: null,
  results: [
    {
      name: 'Tatooine',
      rotation_period: '23',
      orbital_period: '304',
      diameter: '10465',
      climate: 'arid',
      gravity: '1 standard',
      terrain: 'desert',
      surface_water: '1',
      population: '200000',
      residents: [
        'https://swapi.dev/api/people/1/',
        'https://swapi.dev/api/people/2/',
        'https://swapi.dev/api/people/4/',
        'https://swapi.dev/api/people/6/',
        'https://swapi.dev/api/people/7/',
        'https://swapi.dev/api/people/8/',
        'https://swapi.dev/api/people/9/',
        'https://swapi.dev/api/people/11/',
        'https://swapi.dev/api/people/43/',
        'https://swapi.dev/api/people/62/',
      ],
      films: [
        'https://swapi.dev/api/films/1/',
        'https://swapi.dev/api/films/3/',
        'https://swapi.dev/api/films/4/',
        'https://swapi.dev/api/films/5/',
        'https://swapi.dev/api/films/6/',
      ],
      created: '2014-12-09T13:50:49.641000Z',
      edited: '2014-12-20T20:58:18.411000Z',
      url: 'https://swapi.dev/api/planets/1/',
    },
  ],
};

export type PlanetResponse = (typeof examplePlanetsResponse)['results'][0];

export type PlanetsResponse = Omit<
  typeof examplePlanetsResponse,
  'next' | 'previous' | 'results'
> & {
  next: string | null;
  previous: string | null;
  results: PlanetResponse[];
};
