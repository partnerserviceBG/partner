import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
import { Post } from '@models/Post.ts';
import { environments } from '@environments/environments.ts';

interface NewsCardProps {
  news: Post;
}
export const NewsCard: FC<NewsCardProps> = ({ news }) => {
  return (
    <Card elevation={4} sx={{ maxWidth: 200 }}>
      <CardActionArea>
        <NavLink className='card-link' to={`${news.id}`}>
          <CardMedia component='img' src={news.image ? `${environments.baseUrl}${news.image}` : ''} alt='Новость' />
          <CardContent>
            <Typography gutterBottom variant='body1' component='div'>
              {news.title}
            </Typography>
            <Typography gutterBottom variant='caption' component='div'>
              {news.content}
            </Typography>
          </CardContent>
        </NavLink>
      </CardActionArea>
    </Card>
  );
};
