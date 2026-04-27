import { StyledEngineProvider } from '@mui/material';
import { store } from '@store/store';
import ReactDOM from 'react-dom/client';
import { Provider } from 'react-redux';
import App from './App.tsx';
import { SnackbarProvider } from 'notistack';
import React from 'react';

//TODO: не забыть включить </React.StrictMode>

const root = ReactDOM.createRoot(document.getElementById('root') as HTMLElement);
root.render(
  <React.StrictMode>
    <Provider store={store}>
      <StyledEngineProvider injectFirst>
        <SnackbarProvider maxSnack={3}>
          <App />
        </SnackbarProvider>
      </StyledEngineProvider>
    </Provider>
  </React.StrictMode>
);
