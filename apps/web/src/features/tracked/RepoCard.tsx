import BugReportOutlinedIcon from '@mui/icons-material/BugReportOutlined';
import RefreshIcon from '@mui/icons-material/Refresh';
import StarIcon from '@mui/icons-material/StarBorder';
import Button from '@mui/material/Button';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { ErrorState, LoadingState, StatBadge } from 'ui';
import { useEffect } from 'react';
import { useGetRepoDetailsQuery } from '../../store/githubApi';
import { useAppDispatch } from '../../store/hooks';
import { repoUntracked, statsUpdated } from '../../store/trackedReposSlice';

interface RepoCardProps {
  fullName: string;
}

export function RepoCard({ fullName }: RepoCardProps) {
  const dispatch = useAppDispatch();
  const { data, isLoading, isFetching, isError, refetch } = useGetRepoDetailsQuery(fullName);

  useEffect(() => {
    if (data) {
      dispatch(
        statsUpdated({
          id: fullName,
          stats: {
            stars: data.stars,
            openIssues: data.openIssues,
            lastCommitDate: data.lastCommitDate,
          },
        }),
      );
    }
  }, [data, dispatch, fullName]);

  return (
    <Card
      variant="outlined"
      sx={{
        backgroundColor: 'rgba(255, 255, 255, 0.5)',
        backdropFilter: 'blur(10px)',
        borderColor: 'rgba(255, 255, 255, 0.6)',
      }}
    >
      <CardContent>
        <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
          {fullName}
        </Typography>

        {isLoading && <LoadingState label="Loading stats…" />}
        {isError && <ErrorState message="Couldn't load this repo." onRetry={refetch} />}

        {data && (
          <Stack direction="row" spacing={2} sx={{ flexWrap: 'wrap', mt: 1 }}>
            <StatBadge
              icon={StarIcon}
              label={`${data.stars.toLocaleString()} stars`}
              color="warning"
            />
            <StatBadge
              icon={BugReportOutlinedIcon}
              label={`${data.openIssues} open issues`}
              color="error"
            />
            <Typography variant="body2" color="text.secondary">
              Last commit:{' '}
              {data.lastCommitDate ? new Date(data.lastCommitDate).toLocaleDateString() : '—'}
            </Typography>
          </Stack>
        )}
      </CardContent>
      <CardActions>
        <IconButton
          size="small"
          color="primary"
          onClick={() => refetch()}
          disabled={isFetching}
          aria-label="Refresh"
        >
          <RefreshIcon fontSize="small" />
        </IconButton>
        <Button size="small" color="error" onClick={() => dispatch(repoUntracked(fullName))}>
          Untrack
        </Button>
      </CardActions>
    </Card>
  );
}
