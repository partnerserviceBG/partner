import { Box, styled } from '@mui/material';

const StyledBox = styled(Box)(({ theme }) => {
  return {
    display: 'flex',
    alignItems: 'center',
    position: 'relative',
    marginBottom: '40px',
    '::before': {
      content: '""',
      position: 'absolute',
      backgroundColor: theme.palette.info.light,
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      opacity: 0.4,
      left: 10,
    },
  };
});

// @ts-ignore
export const StyledBoxByIcon = ({ children }) => {
  return <StyledBox children={children} />;
};
