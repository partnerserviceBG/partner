import { FC, ReactNode } from 'react';
import { Container } from '@components/common';
import { UnderConstructionState } from '@components/share/view-state/UnderConstructionState.tsx';

export const AgreementPage: FC = (): ReactNode => {
  return (
    <Container>
      <UnderConstructionState
        title='Раздел договоров обновляется'
        description='Скоро здесь будут опубликованы актуальные документы.'
      />
    </Container>
  );
};
