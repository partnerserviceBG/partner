import { FC } from 'react';
import { Box } from '@mui/material';
import { BoxOwnProps } from '@mui/system/Box/Box';
import * as React from 'react';

interface BoxLineClampProps {
  lineClamp?: number;
  variant?: string;
  component?: React.ElementType;
}
export const BoxLineClamp: FC<BoxOwnProps & BoxLineClampProps> = ({children, sx, component, lineClamp, ...props}) => {
  return <Box {...props} component={component}  sx={{
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    wordBreak: 'break-all',
    display: '-webkit-box',
    '-webkit-line-clamp': lineClamp ? `${lineClamp}` : '2',
    '-webkit-box-orient': 'vertical',
    ...sx
  }}>
    {children}
  </Box>
}