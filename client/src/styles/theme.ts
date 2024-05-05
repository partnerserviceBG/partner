import { createTheme, Theme } from '@mui/material';
import { breakpoints, typography } from '@styles/mui-modules/modules.ts';
import { hexToRgbA } from '@styles/utils/utils.ts';

const defaultThemesSettings = {
  unstable_strictMode: true,
  typography: {
    ...typography,
    htmlFontSize: 16,
    fontFamily: 'Segoe UI',
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
      main: `${hexToRgbA('#fd7e14', 0.5)}`,
      light: `${hexToRgbA('#fd7e14', 0.3)}`,
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
    info: {
      main: `${hexToRgbA('#525252', 0.5)}`,
      light: `${hexToRgbA('#525252', 0.3)}`,
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

const purple = createTheme({
  palette: {
    mode: 'light',
    primary: {
      main: '#0926b6',
      light: '#FFFFFF',
      dark: '#000000',
      contrastText: '#505050',
    },
    info: {
      main: `${hexToRgbA('#0926b6', 0.5)}`,
      light: `${hexToRgbA('#0926b6', 0.3)}`,
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

const getStyleOverrides = (theme: Theme) => {
  return {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          '& ::-webkit-scrollbar': {
            width: '0.2em',
            height: '0.3em'
          },
          '& ::-webkit-scrollbar-track': {
            '-webkit-box-shadow': theme.palette.info.light
          },
          '& ::-webkit-scrollbar-thumb': {
            backgroundColor: theme.palette.info.light,
            outline: 'none'
          },
          '& ::-webkit-scrollbar-thumb:hover': {
            cursor: 'pointer'
          },
        },
      },
    },
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
        root: {
          width: '100%'
        },
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
        {
          props: { variant: 'routes' },
          style: {
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
    MuiTab: {
      styleOverrides: {
        root: {
          '&.variant_button': {
            transition: 'all 0.2s linear',
            width: '100%',
            maxWidth: '200px',
            minWidth: 'fit-content',
            border: `2px solid ${theme.palette.info.light}`,
            height: '56px',
            '&:hover': {
              color: `${theme.palette.primary.main}`,
              border: `2px solid ${theme.palette.primary.main}`,
            },
            '&.Mui-selected': {
              color: `${theme.palette.primary.light}`,
              background: `${theme.palette.primary.main}`,
            },
          }
        }
      }
    },
    MuiTabs: {
      styleOverrides: {
        flexContainer: {
          alignItems: 'center',
        },
        indicator: {
          left: '0',
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        body: {
          // @ts-ignore
          fontSize: theme.typography['tableCell'].fontSize,
          // @ts-ignore
          lineHeight: theme.typography['tableCell'].lineHeight,
          // @ts-ignore
          fontWeight: theme.typography['tableCell'].fontWeight,
          borderBottom: `1px solid ${theme.palette.info.light}`,
          '&.heading': {
            fontSize: theme.typography.h4.fontSize,
            color: theme.palette.primary.main,
            fontWeight: 'bold',
            paddingLeft: '30px',
            '&::after': {
              content: '":"',
              marginLeft: "2px"
            }
          }
        },
        head: {
          // @ts-ignore
          fontSize: theme.typography['tableCell'].fontSize,
          // @ts-ignore
          lineHeight: theme.typography['tableCell'].lineHeight,
          // @ts-ignore
          fontWeight: 'bold',
          color: `${theme.palette.primary.main}`,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          // @ts-ignore
          fontSize: theme.typography['tableCell'].fontSize,
          // @ts-ignore
          lineHeight: theme.typography['tableCell'].lineHeight,
          // @ts-ignore
          fontWeight: 400,
          borderBottom: `2px solid ${theme.palette.primary.main}`,
        },
      },
    },
    MuiTableRow: {
      styleOverrides: {
        root: {
          '&:last-child td': {
            border: 0,
          },
        },
      },
    },
    MuiTablePagination: {
      styleOverrides: {
        actions: {
          marginLeft: '5px',
          'button': {
            padding: '2px',
            '&:hover': {
              backgroundColor: theme.palette.info.light
            }
          }
        },
        displayedRows: {
          [theme.breakpoints.down('tablet')]: {
            fontSize: theme.typography.caption.fontSize,
          },
          fontSize: theme.typography.h4.fontSize
        },
        selectLabel: {
          [theme.breakpoints.down('tablet')]: {
            fontSize: theme.typography.caption.fontSize,
          },
          fontSize: theme.typography.h4.fontSize
        },
        input: {
          backgroundColor: theme.palette.info.light
        },
        menuItem: {
          '&:hover': {
            backgroundColor: theme.palette.info.light
          }
        }
      }
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          fill: theme.palette.info.main,
          '& g': {
            fill: theme.palette.info.main,
          },
          '&:hover': {
            fill: theme.palette.primary.main,
            '& g': {
              fill: theme.palette.primary.main,
            }
          }
        },
      },
    },
    MuiCardActionArea: {
      styleOverrides: {
        root: {
          '&:hover': {
            transition: 'all 0.3s linear',
            opacity: 0.7,
            '&::after': {
              content: "''",
              position: 'absolute',
              top: 0,
              width: '100%',
              height: '100%',
              opacity: 0.5,
              backgroundColor: theme.palette.primary.main
            },
            '&::before': {
              content: "''",
              position: 'absolute',
              top: 0,
              width: '100%',
              height: '100%',
              background: `url(./images/png/imgBack.png) 50% 50% no-repeat`,
              zIndex: 100,
            }
          }
        }
      }
    }
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
