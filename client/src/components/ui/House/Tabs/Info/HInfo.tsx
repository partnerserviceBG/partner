import { FC, useEffect, useState } from 'react';
import { Box, Paper, styled, Typography } from '@mui/material';
import {
  StyledSvgIconBox,
} from '@components/share/styled-box-by-icon/StyledBoxByIcon.tsx';
import { House } from '@models/Rias-models/House/House.ts';
import { MapY } from '@components/ui/MapY/MapY.tsx';
import { YMapsApi } from '@pbe/react-yandex-maps/typings/util/typing';
import { useGetPostsQuery } from '@services/post.service.ts';
import { NavLink } from 'react-router-dom';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { getCachedGeometry, setCachedGeometry } from '@utils/geocode-cache.ts';
import { EmptyState, ErrorState } from '@components/share/view-state/ViewState.tsx';
import { SkeletonState } from '@components/share/skeleton/SkeletonState.tsx';

const BoxStyle = styled(Box)(() => ({
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '30px',
}));

const TypographyInfoStyle = styled(Typography)(({theme}) => ({
  fontWeight: 'bold',
  color: theme.palette.info.main,
  margin: '10px 0'
}));

const TypographyCaptionStyle = styled(Typography)(() => ({
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  '.sup': {
    marginLeft: '10px'
  }
}));

const NewsLink = styled(NavLink)(({ theme }) => ({
  transition: 'all 0.2s linear',
  color: theme.palette.primary.main,
  textDecoration: 'none',
  fontStyle: 'italic',
  fontWeight: 'bold',
  display: 'inline-flex',
  alignItems: 'center',
  gap: '8px',
  '&:hover': {
    opacity: 0.8,
    '& .arrow': {
      transform: 'translateX(5px)',
    },
  },
  '& .arrow': {
    transition: 'transform 0.2s linear',
  },
}));

interface HInfoProps {
  data?: House;
  isLoading?: boolean;
}

interface GeocodeResult {
  geoObjects: {
    get(index: number): {
      geometry?: {
        getCoordinates: () => number[];
      };
    };
  };
}

export const HInfo: FC<HInfoProps> = ({data, isLoading}) => {
  const [ymap, setYmap] = useState<YMapsApi>();
  const [house, setHouse] = useState<House>();
  const {
    data: postsByHouse,
    isLoading: isPostsLoading,
    isFetching: isPostsFetching,
    isError: isPostsError,
  } = useGetPostsQuery(
    { houseId: String(data?.id), limit: 20 },
    { skip: !data?.id },
  );
  const posts = postsByHouse?.items || [];

  useEffect(() => {
    if (!data) {
      setHouse(undefined);
      return;
    }
    setHouse(data);

    const enrichWithGeometry = async () => {
      if (!ymap) {
        return;
      }
      try {
        const cachedGeometry = getCachedGeometry(data.full_address);
        if (cachedGeometry) {
          setHouse((prevHouse) => prevHouse ? { ...prevHouse, geometry: cachedGeometry } : prevHouse);
          return;
        }
        const geometry = await ymap.geocode(`${data.full_address}`) as unknown as GeocodeResult | undefined;
        const coordinates = geometry?.geoObjects.get(0).geometry?.getCoordinates();
        if (coordinates) {
          setCachedGeometry(data.full_address, coordinates);
          setHouse((prevHouse) => prevHouse ? { ...prevHouse, geometry: coordinates } : prevHouse);
        }
      } catch {
        setHouse(data);
      }
    };

    enrichWithGeometry().then();
  }, [data, ymap]);

  return (
    isLoading ? <SkeletonState rows={2} minHeight={320} /> : <>
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          marginBottom: '40px'
        }}
        elevation={3}
      >
        <BoxStyle>
          <StyledSvgIconBox iconSrc='/images/svg/entrances.svg' iconAlt='Подъезды' />
          <TypographyInfoStyle variant='h2'>{house?.entrances?.length}</TypographyInfoStyle>
          <TypographyCaptionStyle variant='h4'>{'Подъезды'}</TypographyCaptionStyle>
        </BoxStyle>
        <BoxStyle>
          <StyledSvgIconBox iconSrc='/images/svg/stairs.svg' iconAlt='Этажи' />
          <TypographyInfoStyle variant='h2'>{house?.floor_count}</TypographyInfoStyle>
          <TypographyCaptionStyle variant='h4'>{'Этажей'}</TypographyCaptionStyle>
        </BoxStyle>
        <BoxStyle>
          <StyledSvgIconBox iconSrc='/images/svg/flats.svg' iconAlt='Квартиры' />
          <TypographyInfoStyle variant='h2'>{house?.premises?.length}</TypographyInfoStyle>
          <TypographyCaptionStyle variant='h4'>{'Квартир'}</TypographyCaptionStyle>
        </BoxStyle>
        <BoxStyle>
          <StyledSvgIconBox iconSrc='/images/svg/year.svg' iconAlt='Год' />
          <TypographyInfoStyle variant='h2'>{ house?.used_year }</TypographyInfoStyle>
          <TypographyCaptionStyle variant='h4'>{'Год'}</TypographyCaptionStyle>
        </BoxStyle>
        <BoxStyle>
          <StyledSvgIconBox iconSrc='/images/svg/area.svg' iconAlt='Площадь' />
          <TypographyInfoStyle variant='h2'>{ house && parseFloat(house.total_square).toFixed(1) }</TypographyInfoStyle>
          <TypographyCaptionStyle variant='h4'>{'Площадь'}<sup className='sup'>м2</sup></TypographyCaptionStyle>
        </BoxStyle>
      </Paper>
      {!isPostsLoading && !isPostsFetching && isPostsError ? (
        <ErrorState
          title='Не удалось загрузить новости по дому'
          description='Попробуйте обновить страницу позже.'
        />
      ) : null}
      {isPostsLoading || isPostsFetching ? (
        <SkeletonState rows={2} minHeight={220} />
      ) : null}
      {!isPostsLoading && !isPostsFetching && !isPostsError && posts.length > 0 ? (
        <Box sx={{ marginBottom: '40px' }}>
          <Typography variant='h2' sx={{ marginBottom: '20px' }}>
            Новости и объявления
          </Typography>
          <Box sx={{ display: 'flex', gap: '20px', flexWrap: 'wrap' }}>
            {posts.slice(0, 3).map((post) => (
              <Box
                key={post.id}
                sx={{
                  flex: '1 1 260px',
                  minWidth: '260px',
                  borderBottom: (theme) => `1px solid ${theme.palette.info.light}`,
                  paddingBottom: '10px',
                }}
              >
                <Typography variant='date' sx={{ marginBottom: '8px' }}>
                  {post.updatedAt
                    ? format(new Date(post.updatedAt), 'dd MMMM yyyy', { locale: ru })
                    : ''}
                </Typography>
                <Typography variant='h4' sx={{ marginBottom: '8px' }}>
                  <NewsLink to={`/news/${post.id}`}>
                    {post.title}
                    <Box component='span' className='arrow'>{'→'}</Box>
                  </NewsLink>
                </Typography>
                <Typography variant='description'>
                  {post.content || 'Без описания'}
                </Typography>
              </Box>
            ))}
          </Box>
          <Box sx={{ marginTop: '12px' }}>
            <NewsLink to='/news'>
              {'Посмотреть все новости'}
              <Box component='span' className='arrow'>{'→'}</Box>
            </NewsLink>
          </Box>
        </Box>
      ) : null}
      {!isPostsLoading && !isPostsFetching && !isPostsError && posts.length === 0 ? (
        <EmptyState title='По этому дому пока нет новостей' />
      ) : null}
      <Box sx={{marginBottom: '40px'}}>
        <MapY height={300} onLoadGeoMap={setYmap} house={house} zoom={12} />
      </Box>
    </>
  );
};
