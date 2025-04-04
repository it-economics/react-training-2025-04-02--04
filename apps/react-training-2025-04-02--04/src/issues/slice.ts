import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Issue, issueFactory } from './model/issue';
import { RootState } from '../redux/store';
import { useAppSelector } from '../redux/hooks';

type IssueTrackerState = {
  issues: Issue[];
};

const initialState: IssueTrackerState = {
  issues: [],
};

export const issueTrackerSlice = createSlice({
  name: 'issues',
  initialState,
  reducers: {
    add: (state) => {
      state.issues.push(issueFactory());
    },
    remove: (state, action: PayloadAction<string>) => {
      console.log(action);
      state.issues = state.issues.filter(
        (issue) => issue.id !== action.payload
      );
    },
    update: (state, action: PayloadAction<Partial<Issue>>) => {
      console.log(action);
      state.issues = state.issues.map((it) =>
        it.id === action.payload.id ? { ...it, ...action.payload } : it
      );
    },
  },
});

export const { add, remove, update } = issueTrackerSlice.actions;
const issuesSelector = (state: RootState) => state.issueTrack.issues;
export const useIssues = () => useAppSelector(issuesSelector);
