import { FC, ReactNode } from 'react';
import { NewsList } from '@components/ui/News/news-list/newsList.tsx';

export const NewsPage: FC = (): ReactNode => {
  return <div className='card-template'>{<NewsList />}</div>;
};
