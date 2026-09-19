import type { SvgIconComponent } from '@mui/icons-material';
import Stack from '@mui/material/Stack';
import type { SvgIconProps } from '@mui/material/SvgIcon';
import Typography from '@mui/material/Typography';

interface StatBadgeProps {
  icon: SvgIconComponent;
  label: string;
  color?: SvgIconProps['color'];
}

export function StatBadge({ icon: Icon, label, color = 'action' }: StatBadgeProps) {
  return (
    <Stack direction="row" spacing={0.5} component="span" sx={{ alignItems: 'center' }}>
      <Icon fontSize="small" color={color} />
      <Typography variant="body2" color="text.secondary" component="span">
        {label}
      </Typography>
    </Stack>
  );
}
