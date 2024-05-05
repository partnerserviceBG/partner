import { FC, ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { useGetPostQuery } from '@services/post.service.ts';
import { Container } from '@components/common';
import { Box, Button, CardContent, CardMedia, CircularProgress, Typography } from '@mui/material';
import { environments } from '@environments/environments.ts';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';

export const News: FC = (): ReactNode => {
  const { id } = useParams();
  const { data, isLoading } = useGetPostQuery(id as string);
  const navigate = useNavigate();

  return <Container>
    {isLoading ? <CircularProgress color='primary' /> :
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '60px 0' }}>
        <CardMedia
          component='img'
          sx={{
            width: '50%',
            height: '50%', marginRight: '30px', position: 'relative',
          }}
          image={`${environments.imageUrl}${data?.image}`}
          alt={`${data?.title}`}
        />
        <CardContent sx={{ display: 'flex', flexDirection: 'column' }}>
          {data && <Typography sx={{ marginBottom: '20px' }} variant='date'>
            {format(new Date(data.updatedAt!), 'dd MMMM yyyy', { locale: ru })}
          </Typography>}
          <Box component={Typography} variant='h2'
               sx={{ width: '100%', wordBreak: 'break-word', marginBottom: '30px' }}>{data?.title}</Box>
          <Box component={Typography} variant='description'
               sx={{ width: '100%', wordBreak: 'break-word' }}>{data?.content}</Box>
        </CardContent>
        <Button onClick={() => navigate(-1)} title='Вернуться к списку новостей' sx={{marginBottom: '60px'}}>{'Вернуться к списку новостей'}</Button>
      </Box>}
  </Container>;
};
