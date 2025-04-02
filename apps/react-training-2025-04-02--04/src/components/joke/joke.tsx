import { Button, Stack, Typography } from '@mui/material';
import { useState, useTransition } from 'react';
import { fetchNewJoke } from './client';

export function Joke() {
  const [joke, setJoke] = useState<string | undefined>();
  const [error, setError] = useState(false);
  const [isPending, startTransition] = useTransition();

  return (
    <Stack>
      <Typography component="h1" variant="h3">
        Chuck Norris Jokes!
      </Typography>
      <Stack direction="row" alignItems="center" spacing={2}>
        <Button
          loading={isPending}
          onClick={() => {
            setError(false);
            startTransition(() =>
              fetchNewJoke()
                .then((joke) => setJoke(joke))
                // .catch((err) => {
                //   console.error(err);
                //   setError(true);
                // })
            );
          }}
        >
          New Joke!
        </Button>
        <Typography>{joke}</Typography>
      </Stack>
      {error && (
        <Typography>
          Sorry, an error occurred while fetching the Joke (Chuck Norris would
          have avoided that)
        </Typography>
      )}
    </Stack>
  );
}

export default Joke;
