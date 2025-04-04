import { configureStore } from '@reduxjs/toolkit';
import { issueTrackerSlice } from '../issues/slice';

export const store = configureStore({
  reducer: {
    issueTrack: issueTrackerSlice.reducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
