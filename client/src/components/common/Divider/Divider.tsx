import { Divider as MuiDivider, DividerProps } from '@mui/material';
import React from 'react';

export const Divider: React.FC<DividerProps> = ({ ...props }) => {
  return <MuiDivider {...props} />;
};
