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

declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    back: true;
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
    h1: true;
    h2: true;
    h3: true;
    h4: true;
    title: true;
    subtitle: true;
    caption: true;
    p: true;
    field: true;
    filedValue: true;
    border_bottom: true;
    description: true;
    description_large: true;
    date: true;
  }
}
export const typography = {
  h1: {
    fontSize: '3.125rem',
    fontWeight: 'bold',
    lineHeight: '3.75rem',
  },
  h2: {
    fontSize: '1.625rem',
    fontWeight: 400,
    lineHeight: '1.875rem',
  },
  h3: {
    fontSize: '1.375rem',
    fontWeight: 400,
    lineHeight: '1.75rem',
  },
  h4: {
    fontSize: '1.125rem',
    fontWeight: 400,
    lineHeight: '1.5rem',
  },
  border_bottom: {
    fontSize: '1.125rem',
    fontWeight: 500,
    lineHeight: '1.25rem',
  },
  description: {
    fontSize: '0.8125rem',
    lineHeight: '1.57',
  },
  description_large: {
    fontSize: '0.9375rem',
    lineHeight: '1.57rem',
  },
  date: {
    fontSize: '0.75rem',
  },
  body2: {
    fontSize: '2.125rem',
    fontWeight: 'bold',
    lineHeight: '2.75rem',
  },
};
