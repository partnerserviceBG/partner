import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  CardMedia, CSSObject,
  styled,
  Typography,
  useMediaQuery,
  useTheme,
} from '@mui/material';
import { FC } from 'react';
import { Post } from '@models/Post.ts';
import { format } from 'date-fns';
import { ru } from 'date-fns/locale';
import { environments } from '@environments/environments.ts';
import { NavLink } from 'react-router-dom';
import { BoxLineClamp } from '@components/common/BoxLineClamp/BoxLineClamp.tsx';

const NavItem = styled(NavLink)(({ theme }) => {
  return {
    transition: 'all 0.3s linear',
    color: theme.palette.primary.main,
    textDecoration: 'none',
    '&:hover': {
      opacity: 0.7,
    },
  };
});

interface NewsItemProps {
  news: Post;
  large?: boolean;
  houses?: Array<{
    id: string;
    label: string;
  }>;
}

export const NewsItem: FC<NewsItemProps> = ({ news, large, houses }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('tablet'));
  const imagePath = (news.image || 'Images/default_news_img.jpg').replace(/\\/g, '/');

  const getDefaultParam = (): CSSObject => {
    return {
      width: large ? 300 : 200,
      height: large ? 200 : 165
    }
  }
  return (
      <Card elevation={0} sx={{display: 'flex', padding: '0 30px', flexDirection: isSmallScreen ? 'column' : 'row'}}>
      <CardActionArea component={NavLink} to={`${news.id}`}  sx={{ ...getDefaultParam() }}>
        <CardMedia
          component="img"
          sx={{
            ...getDefaultParam(),
            marginRight: '30px',
            position: 'relative',
            objectFit: 'contain',
            backgroundColor: theme.palette.background.default,
          }}
          image={`${environments.imageUrl}${imagePath}`}
          alt={`${news.title}`}
        />
     </CardActionArea>
        <CardContent sx={{display: 'flex', flexDirection: 'column', overflow: 'hidden'}} >
          <Typography variant='date'>
            {format(new Date(news.updatedAt!), "dd MMMM yyyy", { locale: ru })}
          </Typography>
          <BoxLineClamp lineClamp={3} component={Typography}  sx={{marginBottom: '10px'}} variant={large ? 'h2' : 'h4'}>
            <NavItem to={`${news.id}`}>
              {news.title}
            </NavItem>
          </BoxLineClamp>
          <BoxLineClamp component={Typography} lineClamp={2} sx={{marginBottom: '10px'}} variant={large ? 'description_large' : 'description'}>
            {news.content}
          </BoxLineClamp>
          {houses && houses.length > 0 ? (
            <Box>
              <Typography component='span' variant='description' sx={{ fontWeight: 700 }}>
                Дом:{' '}
              </Typography>
              {houses.map((house, index) => (
                <Typography component='span' variant='description' key={house.id}>
                  <NavItem to={`/houses/${house.id}`}>{house.label}</NavItem>
                  {index < houses.length - 1 ? '; ' : ''}
                </Typography>
              ))}
            </Box>
          ) : null}
        </CardContent>
    </Card>
  );
};
