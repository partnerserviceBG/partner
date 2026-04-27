import { FC, ReactNode } from 'react';
import { Container } from '@components/common';
import { UnderConstructionState } from '@components/share/view-state/UnderConstructionState.tsx';

export const LicensePage: FC = (): ReactNode => {
  return (
    <Container>
      <UnderConstructionState
        title='Лицензии скоро появятся'
        description='Документы загружаются. Временный доступ к разделу ограничен.'
      />
    </Container>
  );
};
