import { FC, ReactNode } from 'react';
import { Container } from '@components/common';
import { UnderConstructionState } from '@components/share/view-state/UnderConstructionState.tsx';

export const Vacancy: FC = (): ReactNode => {
  return (
    <Container sx={{ padding: '60px 0', minHeight: '420px' }}>
      <UnderConstructionState
        title='Вакансий пока нет'
        description='Как только появятся открытые позиции, они будут опубликованы здесь.'
      />
    </Container>
  );
};
