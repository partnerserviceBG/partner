import React, { ReactNode } from 'react';
import { Box, styled } from '@mui/material';

type Variant = 'before' | 'after';

interface QuoteProps {
  variant: Variant;
  children: ReactNode;
}

// content: '\201C';
// font-size: 192px;
// line-height: 192px;
// position: absolute;
// -webkit-text-stroke: 2px #8eb9dc;
// color: transparent;
// left: 0;
// top: -10px;

const QuoteStyle = styled(Box)<{ variant: Variant }>(({ theme, variant }) => ({
  [`&::${variant}`]: {
    content: "'\\201D'",
    fontSize: '192px',
    lineHeight: '192px',
    position: 'absolute',
    color: theme.palette.primary.main,
    top: 0,
  },
}));
const Quote: React.FC<QuoteProps> = (props) => {
  return <QuoteStyle variant={props.variant}>{props.children}</QuoteStyle>;
};

export default Quote;
