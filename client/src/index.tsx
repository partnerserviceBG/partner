import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import { CssBaseline, StyledEngineProvider, ThemeProvider } from '@mui/material';
import { store } from '@store/store';
import App from './App.tsx';
import { lightTheme } from '@styles/theme.ts';

//TODO: не забыть включить </React.StrictMode>

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <ThemeProvider theme={lightTheme}>
      <CssBaseline />
      <StyledEngineProvider injectFirst>
        <App />
      </StyledEngineProvider>
    </ThemeProvider>
  </Provider>
);
