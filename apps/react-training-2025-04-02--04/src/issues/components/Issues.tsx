import { IssuesTable } from './IssuesTable';
import { IssuesHandlingContextProvider } from '../contexts/IssuesHandlingContext';

export const Issues = () => {
  return (
    <>
      <h1>Issues</h1>
      <IssuesHandlingContextProvider>
        <IssuesTable />
      </IssuesHandlingContextProvider>
    </>
  );
};
