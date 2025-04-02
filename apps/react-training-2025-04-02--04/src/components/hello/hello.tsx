import { Stack } from '@mui/material';
import { FC } from 'react';
import styles from './hello.module.css';

export interface HelloProps {
  name?: string;
  stuff?: {
    bar: number;
  };
}

export const Hello: FC<HelloProps> = ({
  name = 'World',
  stuff: { bar } = { bar: 42 },
}) => {
  return (
    <div className={styles.container} data-testid="hello">
      <Stack direction="row" alignItems="center" justifyContent="space-around">
        <h1 className={styles.text}>Hello {name}!</h1>
        <h2>Bar: {bar}</h2>
      </Stack>
    </div>
  );
};

export default Hello;
