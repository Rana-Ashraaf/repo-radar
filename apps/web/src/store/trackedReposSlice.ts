import { createSlice, type PayloadAction } from '@reduxjs/toolkit';
import type { RepoStats } from './types';

export const TRACKED_REPOS_STORAGE_KEY = 'repo-radar:tracked-repos';

function loadTrackedIds(): string[] {
  try {
    const raw = localStorage.getItem(TRACKED_REPOS_STORAGE_KEY);
    return raw ? (JSON.parse(raw) as string[]) : [];
  } catch {
    return [];
  }
}

export interface TrackedReposState {
  ids: string[];
  statsById: Record<string, RepoStats>;
}

const initialState: TrackedReposState = {
  ids: loadTrackedIds(),
  statsById: {},
};

const trackedReposSlice = createSlice({
  name: 'trackedRepos',
  initialState,
  reducers: {
    repoTracked: (state, action: PayloadAction<string>) => {
      if (!state.ids.includes(action.payload)) {
        state.ids.push(action.payload);
      }
    },
    repoUntracked: (state, action: PayloadAction<string>) => {
      state.ids = state.ids.filter((id) => id !== action.payload);
      delete state.statsById[action.payload];
    },
    statsUpdated: (state, action: PayloadAction<{ id: string; stats: RepoStats }>) => {
      state.statsById[action.payload.id] = action.payload.stats;
    },
  },
});

export const { repoTracked, repoUntracked, statsUpdated } = trackedReposSlice.actions;
export const trackedReposReducer = trackedReposSlice.reducer;
