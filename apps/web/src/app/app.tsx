import GitHubIcon from '@mui/icons-material/GitHub';
import AppBar from '@mui/material/AppBar';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { SearchPanel } from '../features/search/SearchPanel';
import { TrackedReposPanel } from '../features/tracked/TrackedReposPanel';

export function App() {
  return (
    <>
      <AppBar position="static" elevation={0} sx={{ bgcolor: '#000' }}>
        <Toolbar sx={{ gap: 1.5 }}>
          <IconButton
            component="a"
            href="https://github.com"
            target="_blank"
            rel="noopener noreferrer"
            aria-label="GitHub"
            sx={{ color: '#fff' }}
          >
            <GitHubIcon />
          </IconButton>
          <Typography
            variant="h5"
            component="h1"
            sx={{
              fontFamily: '"Space Grotesk", sans-serif',
              fontWeight: 700,
              letterSpacing: 0.5,
              color: '#fff',
            }}
          >
            Repo Radar
          </Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Stack spacing={3}>
          <SearchPanel />
          <TrackedReposPanel />
        </Stack>
      </Container>
    </>
  );
}

export default App;