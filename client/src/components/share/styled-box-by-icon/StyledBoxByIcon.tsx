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

interface StyledSvgIconBoxProps extends SvgIconProps {
  iconSrc?: string;
  iconAlt?: string;
}

export const StyledSvgIconBox = ({ iconSrc, iconAlt, ...props }: StyledSvgIconBoxProps) => {
  if (iconSrc) {
    return (
      <StyledBox>
        <Box
          component='img'
          src={iconSrc}
          alt={iconAlt || ''}
          sx={{ width: '2em', height: '2em', display: 'block' }}
        />
      </StyledBox>
    );
  }
  return <StyledBox><StyledSvg  inheritViewBox {...props}/></StyledBox>
};
