import { ErrorState, LoadingState, RepoListItem, SearchBar, useDebouncedValue } from 'ui';
import List from '@mui/material/List';
import Paper from '@mui/material/Paper';
import Typography from '@mui/material/Typography';
import { useState } from 'react';
import { useSearchRepositoriesQuery } from '../../store/githubApi';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { repoTracked, repoUntracked } from '../../store/trackedReposSlice';

export function SearchPanel() {
  const [query, setQuery] = useState('');
  const debouncedQuery = useDebouncedValue(query, 400);
  const trackedIds = useAppSelector((state) => state.trackedRepos.ids);
  const dispatch = useAppDispatch();

  const {
    data: results,
    isFetching,
    isError,
    refetch,
  } = useSearchRepositoriesQuery(debouncedQuery, {
    skip: debouncedQuery.trim().length < 2,
  });

  const hasSearched = debouncedQuery.trim().length >= 2;

  return (
    <Paper
      elevation={0}
      sx={{
        p: 2,
        borderTop: 3,
        borderColor: 'primary.main',
        backgroundColor: 'rgba(255, 255, 255, 0.55)',
        backdropFilter: 'blur(14px)',
        boxShadow: '0 8px 32px rgba(31, 41, 55, 0.12)',
      }}
    >
      <Typography variant="h6" gutterBottom>
        Search
      </Typography>
      <SearchBar value={query} onChange={setQuery} />

      {isFetching && <LoadingState label="Searching…" />}
      {isError && <ErrorState message="Couldn't search GitHub." onRetry={refetch} />}

      {!isFetching && !isError && hasSearched && results?.length === 0 && (
        <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
          No repositories found.
        </Typography>
      )}

      {!isFetching && hasSearched && results && results.length > 0 && (
        <List dense sx={{ mt: 1, maxHeight: 360, overflowY: 'auto' }}>
          {results.map((repo) => (
            <RepoListItem
              key={repo.id}
              fullName={repo.full_name}
              description={repo.description}
              stars={repo.stargazers_count}
              isTracked={trackedIds.includes(repo.full_name)}
              onToggleTrack={() =>
                dispatch(
                  trackedIds.includes(repo.full_name)
                    ? repoUntracked(repo.full_name)
                    : repoTracked(repo.full_name),
                )
              }
            />
          ))}
        </List>
      )}
    </Paper>
  );
}
