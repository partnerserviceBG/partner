declare module '@mui/material/styles' {
  interface BreakpointOverrides {
    xs: false;
    sm: false;
    md: false;
    lg: false;
    xl: false;
    mobile: true;
    tablet: true;
    laptop: true;
    desktop: true;
    container: true;
  }
}

export const breakpoints = {
  values: {
    mobile: 0,
    small: 576,
    tablet: 768,
    laptop: 992,
    desktop: 1200,
    container: 1400,
  },
};

declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    name: true;
    h1: true;
    title: true;
    subtitle: true;
    caption: true;
    paragraph: true;
    field: true;
    filedValue: true;
  }
}
export const typography = {
  name: {
    fontSize: '3.125rem',
    fontWeight: 400,
    lineHeight: '3.75rem',
  },
};
