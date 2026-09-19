import {
  repoTracked,
  repoUntracked,
  statsUpdated,
  trackedReposReducer,
} from './trackedReposSlice';

describe('trackedReposReducer', () => {
  const initialState = { ids: [], statsById: {} };

  it('tracks a repo', () => {
    const state = trackedReposReducer(initialState, repoTracked('facebook/react'));
    expect(state.ids).toEqual(['facebook/react']);
  });

  it('does not track the same repo twice', () => {
    const once = trackedReposReducer(initialState, repoTracked('facebook/react'));
    const twice = trackedReposReducer(once, repoTracked('facebook/react'));
    expect(twice.ids).toEqual(['facebook/react']);
  });

  it('untracks a repo and drops its cached stats', () => {
    const tracked = trackedReposReducer(initialState, repoTracked('facebook/react'));
    const withStats = trackedReposReducer(
      tracked,
      statsUpdated({ id: 'facebook/react', stats: { stars: 1, openIssues: 1, lastCommitDate: null } }),
    );

    const state = trackedReposReducer(withStats, repoUntracked('facebook/react'));
    expect(state.ids).toEqual([]);
    expect(state.statsById['facebook/react']).toBeUndefined();
  });

  it('stores stats per repo id', () => {
    const state = trackedReposReducer(
      initialState,
      statsUpdated({
        id: 'facebook/react',
        stats: { stars: 42, openIssues: 3, lastCommitDate: '2026-01-01' },
      }),
    );

    expect(state.statsById['facebook/react']).toEqual({
      stars: 42,
      openIssues: 3,
      lastCommitDate: '2026-01-01',
    });
  });
});
