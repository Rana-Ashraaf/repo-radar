import { configureStore } from '@reduxjs/toolkit';
import { githubApi } from './githubApi';
import { TRACKED_REPOS_STORAGE_KEY, trackedReposReducer } from './trackedReposSlice';

export const store = configureStore({
  reducer: {
    [githubApi.reducerPath]: githubApi.reducer,
    trackedRepos: trackedReposReducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(githubApi.middleware),
});

let previousIds = store.getState().trackedRepos.ids;
store.subscribe(() => {
  const ids = store.getState().trackedRepos.ids;
  if (ids !== previousIds) {
    previousIds = ids;
    localStorage.setItem(TRACKED_REPOS_STORAGE_KEY, JSON.stringify(ids));
  }
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
