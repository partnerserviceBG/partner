import { FC } from 'react';
import { Post } from '@models/Post.ts';

export interface NewsItemProps {
  news: Post;
}
export const NewsItem: FC<NewsItemProps> = ({ news }) => {
  return <div>{news.title}</div>;
};
