import { FC } from 'react';
import { Box, CircularProgress, styled, SxProps } from '@mui/material';

interface ProgressProps {
  sx?: SxProps;
}

const StyledContainer = styled(Box)((props) => {
  return {
    display: 'flex', alignItems: 'center', justifyContent: 'center', height: '18vw',
    ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
  };
});
export const Progress: FC<ProgressProps> = (props) => {
  return <StyledContainer {...props} ><CircularProgress color='primary' /></StyledContainer>
}