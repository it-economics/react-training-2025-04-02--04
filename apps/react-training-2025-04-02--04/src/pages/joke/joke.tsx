import { ErrorBoundary } from '../../components/error-boundary/ErrorBoundary';
import { Joke } from '../../components/joke/joke';

export const JokePage = () => (
  <ErrorBoundary fallback={<span>Chuck Norris has failed us </span>}>
    <Joke />
  </ErrorBoundary>
);
