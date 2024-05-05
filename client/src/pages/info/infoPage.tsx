import { FC, ReactNode } from 'react';
import { Container } from '@components/common';
import { Typography } from '@mui/material';

export const InfoPage: FC = (): ReactNode => {
  return <Container sx={{padding: '60px 0'}}><Typography variant='h2'>{'Страница в разработке'}</Typography></Container>
};
