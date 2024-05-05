import { Box, styled, SvgIcon, SvgIconProps } from '@mui/material';

const StyledSvg = styled(SvgIcon)(() => {
  return {
    width: '2em',
    height: '2em',
  };
});

const StyledBox = styled(Box)(({ theme }) => {
  return {
    position: 'relative',
    '::before': {
      content: '""',
      position: 'absolute',
      backgroundColor: theme.palette.info.light,
      width: '60px',
      height: '60px',
      borderRadius: '50%',
      opacity: 0.4,
      top: '-5px',
      left: '20px'
    },
  };
});

export const StyledSvgIconBox = (props: SvgIconProps) => {
  return <StyledBox><StyledSvg  inheritViewBox {...props}/></StyledBox>
};
