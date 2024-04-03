import { FC } from 'react';
import { Container, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import { TabPanel } from '@components/share/tab-panel/TabPanel.tsx';
import { useHandlerParams } from '@hooks/useHandlerParams.ts';
import { QGeneral } from '@components/ui/Disclosure/Questionnaire/Tabs/General/QGeneral.tsx';
import { QLicense } from '@components/ui/Disclosure/Questionnaire/Tabs/License/QLicense.tsx';
import { QViolations } from '@components/ui/Disclosure/Questionnaire/Tabs/Violations/QViolations.tsx';

const tabs = [
  { label: 'Общие сведения об организации', path: 'general' },
  { label: 'Сведения о лицензии', path: 'license' },
  { label: 'Нарушения', path: 'violations' },
];
export const Questionnaire: FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('tablet'));

  const { index, setSearchParams } = useHandlerParams({ path: 'tab', tabs });

  const handleChangeA = (path: string) => {
    setSearchParams({ tab: path });
  };

  return (
    <Container sx={{ width: '100%' }}>
      <Tabs orientation={`${isSmallScreen ? 'vertical' : 'horizontal'}`} value={index}>
        {tabs.map((el) => {
          return <Tab onClick={() => handleChangeA(el.path)} key={el.label} label={el.label} />;
        })}
      </Tabs>
      <TabPanel index={0} value={index}>
        <QGeneral />
      </TabPanel>
      <TabPanel index={1} value={index}>
        <QLicense />
      </TabPanel>
      <TabPanel index={2} value={index}>
        <QViolations />
      </TabPanel>
    </Container>
  );
};
