import {
  createContext,
  FC,
  PropsWithChildren,
  useCallback,
  useContext,
  useMemo,
} from 'react';
import { Issue } from '../model/issue';
import { add, remove, update, useIssues } from '../slice';
import { useAppDispatch } from '../../redux/hooks';

type IssueUpdate = Partial<Issue> & Pick<Issue, 'id'>;
type IssuesHandlingContextType = {
  issues: Issue[];
  addIssue: () => void;
  deleteIssue: (id: Issue['id']) => void;
  updateIssue: (update: IssueUpdate) => void;
  saveIssues: () => void;
};

const throwContextError = () => {
  throw new Error('IssuesHandlingContext is not available in the parent tee');
};

const IssuesHandlingContext = createContext<IssuesHandlingContextType>({
  issues: [],
  addIssue: throwContextError,
  deleteIssue: throwContextError,
  updateIssue: throwContextError,
  saveIssues: throwContextError,
});

export const IssuesHandlingContextProvider: FC<PropsWithChildren> = ({
  children,
}) => {
  const issues = useIssues();
  const dispatch = useAppDispatch();

  const deleteIssue = useCallback(
    (id: Issue['id']) => {
      console.log('Delete issue with id:', id);
      dispatch(remove(id));
    },
    [dispatch]
  );

  const addIssue = useCallback(() => {
    dispatch(add());
  }, [dispatch]);

  const updateIssue = useCallback(
    (issueUpdate: IssueUpdate) => {
      dispatch(update(issueUpdate));
    },
    [dispatch]
  );

  const saveIssues = useCallback(() => {
    // TODO
  }, []);

  const contextValue: IssuesHandlingContextType = useMemo(
    () => ({
      issues,
      addIssue,
      deleteIssue,
      updateIssue,
      saveIssues,
    }),
    [issues, addIssue, deleteIssue, updateIssue, saveIssues]
  );

  return (
    <IssuesHandlingContext.Provider value={contextValue}>
      {children}
    </IssuesHandlingContext.Provider>
  );
};

export const useIssuesHandling = () => useContext(IssuesHandlingContext);
