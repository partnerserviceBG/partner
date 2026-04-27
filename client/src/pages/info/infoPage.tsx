import { FC, ReactNode } from 'react';
import { Container } from '@components/common';
import { UnderConstructionState } from '@components/share/view-state/UnderConstructionState.tsx';

export const InfoPage: FC = (): ReactNode => {
  return (
    <Container>
      <UnderConstructionState
        title='Раздел обновляется'
        description='Мы готовим подробную информацию. Пока можно вернуться на главную.'
      />
    </Container>
  );
};
