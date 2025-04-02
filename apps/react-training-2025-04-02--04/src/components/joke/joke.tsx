import { Button, Typography } from '@mui/material';
import { useState } from 'react';
import { fetchNewJoke } from './client';
import styles from './joke.module.css';

export function Joke() {
  const [joke, setJoke] = useState<string | undefined>();
  const [error, setError] = useState(false);

  return (
    <div className={styles['container']}>
      <Typography component="h1" variant="h3">
        Chuck Norris Jokes!
      </Typography>
      <Button
        onClick={() => {
          setError(false);
          fetchNewJoke()
            .then((joke) => setJoke(joke))
            .catch((err) => {
              console.error(err);
              setError(true);
            });
        }}
      >
        New Joke!
      </Button>
      <Typography>{joke}</Typography>
      {error && (
        <Typography>
          Sorry, an error occurred while fetching the Joke (Chuck Norris would
          have avoided that)
        </Typography>
      )}
    </div>
  );
}

export default Joke;
