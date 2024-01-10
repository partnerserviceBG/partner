import { Card, CardActionArea, CardContent, CardMedia, Typography } from '@mui/material';
import { FC } from 'react';
import { NavLink } from 'react-router-dom';
// @ts-ignore
import NewsImg from '@assets/svg/news.svg';
import { Post } from '@models/Post.ts';

interface NewsCardProps {
  news: Post;
}
export const NewsCard: FC<NewsCardProps> = ({ news }) => {
  return (
    <Card elevation={4} sx={{ maxWidth: 200 }}>
      <CardActionArea>
        <NavLink className='card-link' to={`${news.id}`}>
          <CardMedia component='img' src={news.image ? `http://localhost:5000/${news.image}` : NewsImg} alt='Новость' />
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
