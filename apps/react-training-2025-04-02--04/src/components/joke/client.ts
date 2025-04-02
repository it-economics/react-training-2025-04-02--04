const API_URL = 'https://api.chucknorris.io/jokes/random?category=dev';

const examplePayload = {
  icon_url: 'https://api.chucknorris.io/img/avatar/chuck-norris.png',
  id: '0bTbvjwqRESWTyBSYNmAZw',
  url: '',
  value: "The power level for Chuck Norris' roundhouse kick is infinity.",
};

export type JokeResponse = Pick<typeof examplePayload, 'value'>;

export const fetchNewJoke = () =>
  fetch(API_URL + 'asas')
    .then((response) => response.json() as unknown as JokeResponse)
    .then(({ value }) => {
      throw new Error('ohoh');
    });
