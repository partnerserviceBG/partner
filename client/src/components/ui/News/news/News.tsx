import { FC, ReactNode } from 'react';
import { NavLink, useNavigate, useParams } from 'react-router-dom';
import { useGetPostQuery } from '@services/post.service.ts';
import { useGetHousesQuery } from '@services/house.service.ts';
import { Container } from '@components/common';
import { Box, Button, CardContent, CardMedia, Typography } from '@mui/material';
import { environments } from '@environments/environments.ts';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { getShortAddress } from '@utils/utils.ts';
import { normalizePostHousesIds } from '@models/Post.ts';
import { SkeletonState } from '@components/share/skeleton/SkeletonState.tsx';
import { EmptyState } from '@components/share/view-state/ViewState.tsx';

export const News: FC = (): ReactNode => {
  const { id } = useParams();
  const { data, isLoading, isFetching } = useGetPostQuery(id as string);
  const { data: houses } = useGetHousesQuery();
  const navigate = useNavigate();
  const imagePath = data?.image || 'Images/default_news_img.jpg';
  const selectedHouseIds = normalizePostHousesIds(data?.housesId);
  const houseLabels = (houses || [])
    .filter((house) => selectedHouseIds.includes(String(house.id)))
    .map((house) => ({
      id: String(house.id),
      label: getShortAddress(house.full_address),
    }))
    .filter((house) => Boolean(house.label));

  return <Container>
    {isLoading || isFetching ? <SkeletonState rows={1} withImage minHeight={360} /> :
      !data ? <EmptyState title='Новость не найдена' description='Возможно, запись была удалена.' /> :
      <Box sx={{ display: 'flex', flexDirection: 'column', gap: 10, padding: '60px 0' }}>
        <CardMedia
          component='img'
          sx={{
            width: '50%',
            maxHeight: '420px',
            height: 'auto',
            marginRight: '30px',
            position: 'relative',
            objectFit: 'contain',
          }}
          image={`${environments.imageUrl}${imagePath}`}
          src={`${environments.imageUrl}${imagePath}`}
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
          {houseLabels.length > 0 ? (
            <Box
              sx={{ width: '100%', wordBreak: 'break-word', marginTop: '20px' }}
            >
              <Typography component='span' variant='description' sx={{ fontWeight: 700 }}>
                Дом:{' '}
              </Typography>
              {houseLabels.map((house, index) => (
                <Typography component='span' variant='description' key={house.id}>
                  <Box
                    component={NavLink}
                    to={`/houses/${house.id}`}
                    sx={{
                      color: 'primary.main',
                      textDecoration: 'none',
                      '&:hover': { opacity: 0.7 },
                    }}
                  >
                    {house.label}
                  </Box>
                  {index < houseLabels.length - 1 ? '; ' : ''}
                </Typography>
              ))}
            </Box>
          ) : null}
        </CardContent>
        <Button onClick={() => navigate(-1)} title='Вернуться к списку новостей' sx={{marginBottom: '60px'}}>{'Вернуться к списку новостей'}</Button>
      </Box>
    }
  </Container>;
};
