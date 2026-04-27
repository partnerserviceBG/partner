import { FC } from 'react';
import { Box, Typography } from '@mui/material';

interface ViewStateProps {
  title: string;
  description?: string;
}

export const EmptyState: FC<ViewStateProps> = ({ title, description }) => {
  return (
    <Box sx={{ textAlign: 'center', padding: '40px 0' }}>
      <Typography variant='h3' sx={{ marginBottom: description ? '8px' : 0 }}>
        {title}
      </Typography>
      {description ? (
        <Typography variant='description'>
          {description}
        </Typography>
      ) : null}
    </Box>
  );
};

export const ErrorState: FC<ViewStateProps> = ({ title, description }) => {
  return (
    <Box sx={{ textAlign: 'center', padding: '40px 0' }}>
      <Typography variant='h3' color='error.main' sx={{ marginBottom: description ? '8px' : 0 }}>
        {title}
      </Typography>
      {description ? (
        <Typography variant='description'>
          {description}
        </Typography>
      ) : null}
    </Box>
  );
};
