import { FC, ReactNode } from 'react';
import { Container } from '@components/common';
import { MapY } from '@components/ui/MapY/MapY.tsx';

export const Home: FC = (): ReactNode => {
  return (
    <Container disableGutters maxWidth={false}>
      <MapY />
    </Container>
  );
};
