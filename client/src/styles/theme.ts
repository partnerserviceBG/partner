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
      contrastText: '#505050',
    },
    info: {
      main: 'rgba(253, 126, 20, 0.5)',
    },
    warning: {
      main: '#f50057',
    },
    grey: {
      50: '#6d6d6d',
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
      contrastText: '#505050',
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
      contrastText: '#505050',
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
            background: `${theme.palette.primary.main} url(./images/png/breadcrumbs.png) 50% 50% no-repeat`,
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
              fontSize: theme.typography.h2.fontSize,
            },
            fontSize: theme.typography.body2.fontSize,
            fontWeight: theme.typography.body2.fontWeight,
          },
          a: {
            color: theme.palette.primary.light,
            textDecoration: 'none',
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
          props: { variant: 'h1' || 'h2' || 'h4' || 'description' || 'description_large' },
          style: {
            color: `${theme.palette.primary.dark}`,
          },
        },
        {
          props: { variant: 'h3' },
          style: {
            color: `${theme.palette.grey['50']}`,
          },
        },
        {
          props: { variant: 'p' || 'subtitle' || 'caption' },
          style: {
            color: `${theme.palette.primary.contrastText}`,
          },
        },
        {
          props: { variant: 'date' },
          style: {
            color: `${theme.palette.primary.main}`,
          },
        },
        {
          props: { variant: 'border_bottom' },
          style: {
            paddingBottom: '0.25rem',
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

export const supportedThemes = {
  lightTheme: lightTheme,
  darkTheme: darkTheme,
  purpleTheme: purpleTheme,
};
