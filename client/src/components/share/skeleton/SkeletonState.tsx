import { FC } from 'react';
import { Box, Skeleton } from '@mui/material';

interface SkeletonStateProps {
  rows?: number;
  withImage?: boolean;
  minHeight?: number;
}

export const SkeletonState: FC<SkeletonStateProps> = ({
  rows = 3,
  withImage = false,
  minHeight = 0,
}) => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '16px',
        padding: '20px 0',
        minHeight: minHeight > 0 ? `${minHeight}px` : undefined,
      }}
    >
      {Array.from({ length: rows }).map((_, index) => (
        <Box
          key={`skeleton-row-${index}`}
          sx={{
            border: '1px solid',
            borderColor: 'divider',
            borderRadius: '8px',
            padding: '16px',
          }}
        >
          {withImage ? (
            <Skeleton
              variant='rectangular'
              height={180}
              sx={{ borderRadius: '8px', marginBottom: '12px' }}
            />
          ) : null}
          <Skeleton variant='text' width='45%' height={36} />
          <Skeleton variant='text' width='100%' />
          <Skeleton variant='text' width='90%' />
          <Skeleton variant='text' width='65%' />
        </Box>
      ))}
    </Box>
  );
};
