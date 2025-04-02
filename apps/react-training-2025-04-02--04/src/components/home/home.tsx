import { Button, Stack } from '@mui/material';
import { createContext, use, useEffect, useState } from 'react';
import { ErrorBoundary } from '../error-boundary/ErrorBoundary';
import Hello from '../hello/hello';
import Input from '../input/input';
import Joke from '../joke/joke';
import { SolarSystem } from '../solar-system/SolarSystem';
import { StarWars } from '../star-wars';

export const Home = () => {
  const [name, setName] = useState('');

  return (
    <div>
      <NameContext value={{ name }}>
        <Stack>
          <Hello name={name} />
          <Input onInputChange={(value) => setName(value)} />
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-around"
          >
            <Content />
            <Counter />
          </Stack>
        </Stack>
      </NameContext>
      <SolarSystem />
      <ErrorBoundary fallback={<span>Chuck Norris has failed us </span>}>
        <Joke />
      </ErrorBoundary>
      <StarWars />
    </div>
  );
};

const Counter = () => {
  const [count, setCount] = useState(0);
  const [count2, setCount2] = useState(0);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count, count2]);

  useEffect(() => {
    document.title = `Count: ${count}`;
  }, [count, count2]);

  return (
    <div>
      <h1>Counter: {count}</h1>
      <Button onClick={() => setCount((prev) => prev + 1)}>Increment</Button>
      <Button onClick={() => setCount2((prev) => prev + 1)}>Increment 2</Button>
    </div>
  );
};

interface INameContext {
  name: string;
}

const NameContext = createContext<INameContext>({ name: 'Context not set!' });

const useName = () => use(NameContext).name;

const NestedContent = () => {
  // Show name here as well
  // useContext(NameContext)
  const { name } = use(NameContext);
  const name2 = useName();

  return (
    <div>
      <span>Nested - Name is {name}</span>
      <br />
      <span>From custom Hook - Name is {name2}</span>
    </div>
  );
};

const Content = () => {
  return (
    <div>
      <NestedContent />
    </div>
  );
};
