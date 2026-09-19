import { createTheme } from '@mui/material/styles';

export const theme = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#3454d1',
    },
    background: {
      default: '#eef0f7',
    },
  },
  shape: {
    borderRadius: 12,
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          background: 'linear-gradient(135deg, #dde5fb 0%, #f2f3f8 45%, #eef1ff 100%)',
          minHeight: '100vh',
        },
      },
    },
  },
});