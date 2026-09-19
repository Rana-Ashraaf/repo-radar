import Button from '@mui/material/Button';
import Paper from '@mui/material/Paper';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { StarsBarChart, toStarsChartData } from 'charts';
import { useMemo } from 'react';
import { githubApi } from '../../store/githubApi';
import { useAppDispatch, useAppSelector } from '../../store/hooks';
import { RepoCard } from './RepoCard';

export function TrackedReposPanel() {
  const dispatch = useAppDispatch();
  const trackedIds = useAppSelector((state) => state.trackedRepos.ids);
  const statsById = useAppSelector((state) => state.trackedRepos.statsById);

  const chartData = useMemo(
    () => toStarsChartData(trackedIds, statsById),
    [trackedIds, statsById],
  );

  function refreshAll() {
    dispatch(
      githubApi.util.invalidateTags(trackedIds.map((id) => ({ type: 'RepoDetails' as const, id }))),
    );
  }

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
      <Stack direction="row" sx={{ justifyContent: 'space-between', alignItems: 'center', mb: 2 }}>
        <Typography variant="h6">Tracked Repos</Typography>
        {trackedIds.length > 0 && (
          <Button size="small" onClick={refreshAll}>
            Refresh all
          </Button>
        )}
      </Stack>

      {trackedIds.length === 0 && (
        <Typography variant="body2" color="text.secondary">
          Track a repository from search to see it here.
        </Typography>
      )}

      <Stack spacing={2}>
        {trackedIds.map((id) => (
          <RepoCard key={id} fullName={id} />
        ))}
      </Stack>

      {chartData.length > 0 && (
        <Stack sx={{ mt: 3 }}>
          <Typography variant="subtitle2" gutterBottom>
            Stars per repo
          </Typography>
          <StarsBarChart data={chartData} />
        </Stack>
      )}
    </Paper>
  );
}
