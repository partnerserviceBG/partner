import { Themes } from '@styles/utils/types.ts';

export const ThemeStorageKey = 'features-color-theme';
export const getTheme = (): Themes => {
  let theme = localStorage.getItem(ThemeStorageKey);

  if (!theme) {
    localStorage.setItem(ThemeStorageKey, 'lightTheme');
    theme = 'lightTheme';
  }

  return theme as Themes;
};
