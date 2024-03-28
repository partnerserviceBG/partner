import { createContext } from 'react';
import { Themes } from '@styles/utils/types.ts';
import { Theme } from '@mui/material';

export const AppThemeContext = createContext<
  | {
      theme: Themes;
      setTheme: (Theme: Themes) => void;
      supportedThemes: { [key: string]: Theme };
    }
  | undefined
>(undefined);
