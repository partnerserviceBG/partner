import { createTheme } from '@mui/material';
import { breakpoints, typography } from '@styles/mui-modules/modules.ts';

const light = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#fd7e14',
      light: '#FFFFFF',
      dark: '#000000',
      contrastText: '#525252',
    },
    warning: {
      main: '#f50057',
    },
  },
  typography: {
    htmlFontSize: 16,
    fontFamily: 'Segoe UI',
    ...typography,
  },
  breakpoints: {
    ...breakpoints,
  },
});

export const lightTheme = createTheme(light, {
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          colorDefault: light.palette.primary.light,
          backgroundColor: light.palette.primary.light,
        },
      },
    },
    MuiTypography: {
      variants: [],
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        ol: {
          color: light.palette.primary.light,
        },
        li: {
          color: light.palette.primary.light,
          '&:last-child': {
            fontSize: light.typography.h3.fontSize,
            fontWeight: 'bold',
          },
          a: {
            color: light.palette.primary.light,
            textDecoration: 'none',
          },
        },
        separator: {
          color: light.palette.primary.light,
        },
      },
    },
  },
});
