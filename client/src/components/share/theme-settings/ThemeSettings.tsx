import React, { FC, ReactNode, useState } from 'react';
import { Box, Button, Popover, Typography } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { supportedThemes } from '@styles/theme.ts';
import { Themes } from '@styles/utils/types.ts';
import { useAppTheme } from '@hooks/useAppTheme.ts';

export const ThemeSettings: FC = (): ReactNode => {
  const { theme, setTheme } = useAppTheme();
  const [anchorEl, setAnchorEl] = useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTheme = (value: Themes): void => {
    if (!theme.includes(value)) {
      setTheme(value);
      handleClose();
    }
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <Button
        sx={{ position: 'fixed', top: '50%', right: 0, minWidth: '30px' }}
        aria-orientation='vertical'
        variant='outlined'
        onClick={handleClick}
      >
        <SettingsIcon />
      </Button>
      <Popover
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'center',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'center',
          horizontal: 'right',
        }}
      >
        <Box sx={{ padding: '20px' }}>
          <Typography sx={{ fontWeight: 'bold' }} variant='description_large'>
            Настройки
          </Typography>
          <Box>
            <Typography variant='description'>{'Выберите цвет'}</Typography>
            <Box display='flex'>
              {Object.entries(supportedThemes).map(([key, value]) => {
                return (
                  <Box
                    key={key}
                    onClick={() => handleTheme(key as Themes)}
                    sx={{
                      cursor: 'pointer',
                      margin: '3px',
                      width: '20px',
                      height: '20px',
                      color: `${value['palette'].primary.dark}`,
                      backgroundColor: `${value['palette'].primary.main}`,
                    }}
                  ></Box>
                );
              })}
            </Box>
          </Box>
        </Box>
      </Popover>
    </>
  );
};
