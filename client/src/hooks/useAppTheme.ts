import { useContext } from 'react';
import { AppThemeContext } from '../context/AppThemeContext.tsx';

export const useAppTheme = () => {
  const context = useContext(AppThemeContext);

  if (!context) {
    throw new Error('You can use "useAppTheme" hook only within a <ThemeProvider> component.');
  }

  return context;
};
