import { RouterProvider } from 'react-router-dom';
import router from '@routes/index.router.tsx';
import './styles/app.scss';
import { ScrollToButton } from '@components/share/scroll-to-button/ScrollToButton.tsx';
import { supportedThemes } from '@styles/theme.ts';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { useEffect, useState } from 'react';
import { AppThemeContext } from './context/AppThemeContext.tsx';
import { getTheme, ThemeStorageKey } from '@styles/utils/utils.ts';
import { Themes } from '@styles/utils/types.ts';
import { ThemeSettings } from '@components/share/theme-settings/ThemeSettings.tsx';

function App() {
  const [theme, setTheme] = useState<Themes>(getTheme);

  useEffect(() => {
    localStorage.setItem(ThemeStorageKey, theme);
  }, [theme]);
  return (
    <>
      <AppThemeContext.Provider
        value={{
          theme,
          setTheme,
          supportedThemes,
        }}
      >
        <ThemeProvider theme={supportedThemes[theme]}>
          <CssBaseline />
          <RouterProvider router={router} />
          <ScrollToButton />
          <ThemeSettings />
        </ThemeProvider>
      </AppThemeContext.Provider>
    </>
  );
}

export default App;
