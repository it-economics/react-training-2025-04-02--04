import { FC } from 'react';
import styles from './hello.module.css';

export interface HelloProps {
  name?: string;
  stuff: {
    bar: number;
  };
}

export const Hello: FC<HelloProps> = ({ name = 'World', stuff: { bar } }) => {
  return (
    <div className={styles.container}>
      <h1 className={styles.text}>Hello {name}!</h1>
      <h2>Bar: {bar}</h2>
    </div>
  );
};

export default Hello;
