import { FC, useEffect, useState } from 'react';
import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import { Box, useTheme } from '@mui/material';

export const ScrollToButton: FC = () => {
  const [visible, setVisible] = useState<boolean>(false);

  useEffect(() => {
    window.addEventListener('scroll', (event) => {
      //@ts-ignore
      if (event.currentTarget?.pageYOffset >= 195) {
        setVisible(true);
      } else {
        setVisible(false);
      }
    });
    return () => {
      window.removeEventListener('scroll', () => {});
    };
  }, []);

  const theme = useTheme();
  return (
    visible && (
      <Box
        onClick={() =>
          window.scrollTo({
            left: 0,
            top: 0,
            behavior: 'smooth',
          })
        }
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'fixed',
          right: '15px',
          bottom: '50px',
          width: '40px',
          height: '40px',
          cursor: 'pointer',
          borderRadius: '3px',
          backgroundColor: theme.palette.primary.main,
          transition: 'all 0.3s',
          boxShadow: '0 0 5px rgba(255, 255, 255, 0.5)',
          zIndex: 1,
        }}
      >
        <ArrowUpwardIcon
          sx={{
            fill: theme.palette.primary.light,
          }}
        ></ArrowUpwardIcon>
      </Box>
    )
  );
};
