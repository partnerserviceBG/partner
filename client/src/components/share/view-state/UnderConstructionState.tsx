import { FC } from 'react';
import { Box, Button } from '@mui/material';
import { useNavigate } from 'react-router-dom';
import { EmptyState } from './ViewState.tsx';

interface UnderConstructionStateProps {
  title: string;
  description: string;
}

export const UnderConstructionState: FC<UnderConstructionStateProps> = ({
  title,
  description,
}) => {
  const navigate = useNavigate();

  return (
    <Box sx={{ padding: '60px 0' }}>
      <Box sx={{ maxWidth: '640px', margin: '0 auto' }}>
        <EmptyState title={title} description={description} />
      </Box>
      <Box sx={{ display: 'flex', justifyContent: 'center', marginTop: '16px' }}>
        <Button
          variant='contained'
          onClick={() => navigate('/')}
          sx={{
            color: '#fff',
            '&:hover': {
              color: '#fff',
              opacity: 0.7,
              backgroundColor: 'primary.main',
            },
          }}
        >
          {'На главную'}
        </Button>
      </Box>
    </Box>
  );
};
