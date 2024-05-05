import { StyledEngineProvider } from '@mui/material';
import { store } from '@store/store';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import { SnackbarProvider } from 'notistack';

//TODO: не забыть включить </React.StrictMode>

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <Provider store={store}>
    <StyledEngineProvider injectFirst>
      <SnackbarProvider maxSnack={3}>
        <App />
      </SnackbarProvider>
    </StyledEngineProvider>
  </Provider>
);
