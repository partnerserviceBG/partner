import { createTheme, Theme } from '@mui/material';
import { breakpoints, typography } from '@styles/mui-modules/modules.ts';

const defaultThemesSettings = {
  unstable_strictMode: true,
  typography: {
    htmlFontSize: 16,
    fontFamily: 'Segoe UI',
    ...typography,
  },
  breakpoints: {
    ...breakpoints,
  },
};

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
  ...defaultThemesSettings,
});

const dark = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#525252',
      light: '#FFFFFF',
      dark: '#000000',
      contrastText: '#525252',
    },
    warning: {
      main: '#f50057',
    },
  },
  ...defaultThemesSettings,
});

const purple = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0926b6',
      light: '#FFFFFF',
      dark: '#000000',
      contrastText: '#525252',
    },
    warning: {
      main: '#f50057',
    },
  },
  ...defaultThemesSettings,
});

const getStyleOverrides = (theme: Theme) => {
  return {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: theme.palette.primary.light,
        },
      },
    },
    MuiBreadcrumbs: {
      styleOverrides: {
        ol: {
          '&::before': {
            content: '""',
            position: 'absolute',
            left: 0,
            right: 0,
            zIndex: -1,
            display: 'block',
            background: `${theme.palette.primary.main} url(src/assets/png/breadcrumbs.png) 50% 50% no-repeat`,
            filter: 'blur(5px)',
            width: '100%',
            height: '190px',
            overflowX: 'hidden',
          },
          color: theme.palette.primary.light,
        },
        li: {
          color: theme.palette.primary.light,
          '&:last-child': {
            [theme.breakpoints.down('laptop')]: {
              fontSize: theme.typography.h4.fontSize,
            },
            fontSize: theme.typography.h3.fontSize,
            fontWeight: 'bold',
          },
          a: {
            color: theme.palette.primary.light,
            textDecoration: 'none',
            '&.active': {
              cursor: 'default',
            },
          },
        },
        separator: {
          color: theme.palette.primary.light,
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: 'scroll' },
          style: {
            marginBottom: '100px',
            border: `1px solid ${theme.palette.primary.main}`,
          },
        },
      ],
    },
    MuiTypography: {
      variants: [
        {
          props: { variant: 'border' },
          style: {
            marginBottom: '100px',
            borderBottom: `3px solid ${theme.palette.primary.main}`,
          },
        },
      ],
    },
  };
};

export const lightTheme = createTheme(light, {
  components: {
    ...getStyleOverrides(light),
  },
});

export const purpleTheme = createTheme(purple, {
  components: {
    ...getStyleOverrides(purple),
  },
});

export const darkTheme = createTheme(dark, {
  components: {
    ...getStyleOverrides(dark),
  },
});
