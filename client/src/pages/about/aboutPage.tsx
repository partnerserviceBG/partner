import { FC, ReactNode } from 'react';
import { Container } from '@components/common';
import { UnderConstructionState } from '@components/share/view-state/UnderConstructionState.tsx';

export const AboutPage: FC = (): ReactNode => {
  return (
    <Container>
      <UnderConstructionState
        title='Раздел обновляется'
        description='Скоро здесь появится подробная информация о компании.'
      />
    </Container>
  );
};
