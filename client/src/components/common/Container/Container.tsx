import { Container as MuiContainer, ContainerProps } from '@mui/material';
import React from 'react';

export const Container: React.FC<ContainerProps> = ({ children, ...rest }) => {
  return <MuiContainer {...rest}>{children}</MuiContainer>;
};
