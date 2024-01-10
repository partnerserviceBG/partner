import { FC, ReactNode } from 'react';
import { NewsList } from '@components/ui/News/news-list/newsList.tsx';
import { Container } from '@components/common';

export const Home: FC = (): ReactNode => {
  return (
    <Container>
      <NewsList />
    </Container>
  );
};
