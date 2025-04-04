import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Issue, issueFactory } from './model/issue';
import { RootState } from '../redux/store';
import { useAppSelector } from '../redux/hooks';
import { getToken } from '../auth/auth-utils';

const API_URL = 'http://localhost:9000';

const getHeaders = () => ({
  headers: {
    authorization: `Bearer ${getToken()}`,
    'Content-Type': 'application/json',
  },
});

type IssueTrackerState = {
  issues: Issue[];
};

const initialState: IssueTrackerState = {
  issues: [],
};

export const fetchIssues = createAsyncThunk('issues/fetch', async () => {
  const response = await fetch(`${API_URL}/issues`, getHeaders());
  const data = await response.json();
  return (data.issues as Issue[]) || [];
});

export const storeIssues = createAsyncThunk(
  'issues/store',
  async (_arg, { getState }) => {
    const issues = (getState() as RootState).issueTrack.issues;
    await fetch(`${API_URL}/issues`, {
      method: 'POST',
      body: JSON.stringify({ issues }),
      ...getHeaders(),
    });
  }
);

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
  extraReducers: (builder) => {
    builder.addCase(fetchIssues.fulfilled, (state, action) => {
      state.issues = action.payload;
    });
    builder.addCase(fetchIssues.rejected, () => {
      throw new Error('Failed to fetch issues');
    });
  },
});

export const { add, remove, update } = issueTrackerSlice.actions;
const issuesSelector = (state: RootState) => state.issueTrack.issues;
export const useIssues = () => useAppSelector(issuesSelector);
