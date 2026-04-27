import React, { FC, ReactNode, useState } from 'react';
import { Box, Button, Popover, Typography, useTheme } from '@mui/material';
import SettingsIcon from '@mui/icons-material/Settings';
import { supportedThemes } from '@styles/theme.ts';
import { Themes } from '@styles/utils/types.ts';
import { useAppTheme } from '@hooks/useAppTheme.ts';

export const ThemeSettings: FC = (): ReactNode => {
  const { theme, setTheme } = useAppTheme();
  const currentTheme = useTheme();
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
        PaperProps={{
          sx: {
            backgroundColor: currentTheme.palette.mode === 'dark'
              ? 'rgba(38, 38, 38, 0.95)'
              : '#fff',
          },
        }}
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
                const isSelected = key === theme;
                return (
                  <Box
                    key={key}
                    onClick={() => handleTheme(key as Themes)}
                    sx={{
                      cursor: 'pointer',
                      margin: '3px',
                      width: '20px',
                      height: '20px',
                      borderRadius: '4px',
                      color: `${value['palette'].primary.dark}`,
                      backgroundColor: `${value['palette'].primary.main}`,
                      border: isSelected
                        ? `2px solid ${currentTheme.palette.primary.light}`
                        : `1px solid ${currentTheme.palette.info.light}`,
                      opacity: isSelected ? 1 : 0.85,
                      '&:hover': {
                        opacity: 0.7,
                      },
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
