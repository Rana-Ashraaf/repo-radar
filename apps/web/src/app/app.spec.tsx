import { ThemeProvider, createTheme } from '@mui/material/styles';
import { render } from '@testing-library/react';
import { Provider } from 'react-redux';
import { store } from '../store/store';
import App from './app';

function renderApp() {
  return render(
    <Provider store={store}>
      <ThemeProvider theme={createTheme()}>
        <App />
      </ThemeProvider>
    </Provider>,
  );
}

describe('App', () => {
  it('renders the dashboard title', () => {
    const { getByText } = renderApp();
    expect(getByText('Repo Radar')).toBeTruthy();
  });

  it('renders both panels', () => {
    const { getByText } = renderApp();
    expect(getByText('Search')).toBeTruthy();
    expect(getByText('Tracked Repos')).toBeTruthy();
  });
});
