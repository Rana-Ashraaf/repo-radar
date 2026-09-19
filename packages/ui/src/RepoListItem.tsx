import StarIcon from '@mui/icons-material/StarBorder';
import Button from '@mui/material/Button';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

interface RepoListItemProps {
  fullName: string;
  description: string | null;
  stars: number;
  isTracked: boolean;
  onToggleTrack: () => void;
}

export function RepoListItem({
  fullName,
  description,
  stars,
  isTracked,
  onToggleTrack,
}: RepoListItemProps) {
  return (
    <ListItem
      divider
      secondaryAction={
        <Button variant={isTracked ? 'outlined' : 'contained'} size="small" onClick={onToggleTrack}>
          {isTracked ? 'Untrack' : 'Track'}
        </Button>
      }
    >
      <ListItemText
        primary={fullName}
        secondary={
          <Stack
            component="span"
            direction="row"
            spacing={1.5}
            sx={{ alignItems: 'center', flexWrap: 'wrap' }}
          >
            {description && (
              <Typography component="span" variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 320 }}>
                {description}
              </Typography>
            )}
            <Stack component="span" direction="row" spacing={0.5} sx={{ alignItems: 'center' }}>
              <StarIcon fontSize="inherit" sx={{ color: 'warning.main' }} />
              <Typography component="span" variant="caption">
                {stars.toLocaleString()}
              </Typography>
            </Stack>
          </Stack>
        }
      />
    </ListItem>
  );
}
