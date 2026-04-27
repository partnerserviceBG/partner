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
  const isDarkMode = theme.palette.mode === 'dark';
  const defaultTextColor = isDarkMode ? theme.palette.primary.light : theme.palette.primary.dark;
  const secondaryTextColor = isDarkMode ? theme.palette.primary.light : theme.palette.primary.contrastText;
  const mutedTextColor = isDarkMode ? theme.palette.primary.light : theme.palette.grey['50'];
  const accentTextColor = isDarkMode ? '#ffb26b' : theme.palette.primary.main;
  const tableHeaderTextColor = isDarkMode ? theme.palette.primary.light : theme.palette.primary.main;
  const iconColor = isDarkMode ? theme.palette.primary.light : theme.palette.info.main;

  return {
    MuiCssBaseline: {
      styleOverrides: {
        html: {
          '& ::-webkit-scrollbar': {
            width: '0.2em',
            height: '0.3em'
          },
          '& ::-webkit-scrollbar-track': {
            WebkitBoxShadow: theme.palette.info.light
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
      styleOverrides: {
        root: {
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.warning.main}`,
            outlineOffset: '2px',
          },
        },
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
      styleOverrides: {
        root: {
          '&:focus-visible': {
            outline: `2px solid ${theme.palette.warning.main}`,
            outlineOffset: '2px',
          },
        },
      },
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
          props: { variant: 'h1' },
          style: {
            color: defaultTextColor,
          },
        },
        {
          props: { variant: 'h2' },
          style: {
            color: defaultTextColor,
          },
        },
        {
          props: { variant: 'h4' },
          style: {
            color: defaultTextColor,
          },
        },
        {
          props: { variant: 'description' },
          style: {
            color: defaultTextColor,
          },
        },
        {
          props: { variant: 'description_large' },
          style: {
            color: defaultTextColor,
          },
        },
        {
          props: { variant: 'h3' },
          style: {
            color: mutedTextColor,
          },
        },
        {
          props: { variant: 'p' },
          style: {
            color: secondaryTextColor,
          },
        },
        {
          props: { variant: 'subtitle' },
          style: {
            color: secondaryTextColor,
          },
        },
        {
          props: { variant: 'caption' },
          style: {
            color: secondaryTextColor,
          },
        },
        {
          props: { variant: 'date' },
          style: {
            color: accentTextColor,
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
              color: tableHeaderTextColor,
              border: `2px solid ${tableHeaderTextColor}`,
            },
            '&.Mui-selected': {
              color: `${theme.palette.primary.light}`,
              background: isDarkMode ? '#6a6a6a' : theme.palette.primary.main,
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
    MuiInputBase: {
      styleOverrides: {
        root: {},
      },
    },
    MuiTableCell: {
      styleOverrides: {
        body: {
          fontSize: theme.typography.tableCell.fontSize,
          lineHeight: theme.typography.tableCell.lineHeight,
          fontWeight: theme.typography.tableCell.fontWeight,
          borderBottom: `1px solid ${theme.palette.info.light}`,
          '&.heading': {
            fontSize: theme.typography.h4.fontSize,
            color: tableHeaderTextColor,
            fontWeight: 'bold',
            paddingLeft: '30px',
            '&::after': {
              content: '":"',
              marginLeft: "2px"
            }
          }
        },
        head: {
          fontSize: theme.typography.tableCell.fontSize,
          lineHeight: theme.typography.tableCell.lineHeight,
          fontWeight: 'bold',
          color: tableHeaderTextColor,
        },
      },
    },
    MuiTableHead: {
      styleOverrides: {
        root: {
          fontSize: theme.typography.tableCell.fontSize,
          lineHeight: theme.typography.tableCell.lineHeight,
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
          fill: iconColor,
          '& g': {
            fill: iconColor,
          },
          '&:hover': {
            fill: tableHeaderTextColor,
            '& g': {
              fill: tableHeaderTextColor,
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
