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

export const hexToRgbA = (hex: string, alpha = 1) => {
  if (alpha > 1) alpha = 1;
  if (alpha < 0) alpha = 0;
  let c;
  if (/^#([A-Fa-f0-9]{3}){1,2}$/.test(hex)) {
    c = hex.substring(1).split('');
    if (c.length == 3) {
      c = [c[0], c[0], c[1], c[1], c[2], c[2]];
    }
    c = '0x' + c.join('');
    // @ts-ignore
    return 'rgba(' + [(c >> 16) & 255, (c >> 8) & 255, c & 255].join(',') + ',' + alpha + ')';
  }
  throw new Error('Bad Hex');
};
