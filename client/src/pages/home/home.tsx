import { FC, ReactNode } from 'react';
import { NewsList } from '@components/ui/News/news-list/newsList.tsx';
import { Container } from '@components/common';
import { MapY } from '@components/ui/MapY/MapY.tsx';

export const Home: FC = (): ReactNode => {
  return (
    <Container disableGutters maxWidth={false}>
      <NewsList />
      <MapY />
    </Container>
  );
};
