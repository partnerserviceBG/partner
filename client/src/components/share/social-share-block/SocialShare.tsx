import React from 'react';
import { Box, Link, styled } from '@mui/material';
import { VkIcon } from '@components/share/icons/VkIcon.tsx';

const SocialShareBoxStyle = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  color: theme.palette.primary.main,
  display: 'flex',
  alignItems: 'center',
  maxWidth: 'fit-content',
  maxHeight: '50px',
  borderRadius: '30px',
  padding: '17px 25px',
  boxShadow: '0 9px 30px rgba(0, 0, 0, 0.1)',
  top: '-25px',
  position: 'absolute',
}));
const SocialShare: React.FC = () => {
  return (
    <SocialShareBoxStyle>
      Поделиться:
      <Box sx={{ display: 'flex', marginTop: '10px' }}>
        <Link href={'/'} target='_blank' sx={{ marginLeft: '20px', cursor: 'pointer' }} title='ВКонтакте'>
          <VkIcon viewBox='0 0 48 48' fontSize='small' />
        </Link>
      </Box>
    </SocialShareBoxStyle>
  );
};

export default SocialShare;
