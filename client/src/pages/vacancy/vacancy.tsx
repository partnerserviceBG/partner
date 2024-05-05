import { FC, ReactNode } from 'react';
import { Container } from '@components/common';
import { Typography } from '@mui/material';

export const Vacancy: FC = (): ReactNode => {
  return <Container sx={{padding: '60px 0'}}><Typography variant='h2'>{'Вакансий отсутствуют...'}</Typography></Container>
};
