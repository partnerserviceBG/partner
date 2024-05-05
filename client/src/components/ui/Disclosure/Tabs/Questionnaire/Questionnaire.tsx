import { FC } from 'react';
import { Container, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import { TabPanel } from '@components/share/tab-panel/TabPanel.tsx';
import { QGeneral } from '@components/ui/Disclosure/Tabs/Questionnaire/Tabs/General/QGeneral.tsx';
import { QLicense } from '@components/ui/Disclosure/Tabs/Questionnaire/Tabs/License/QLicense.tsx';
import { QViolations } from '@components/ui/Disclosure/Tabs/Questionnaire/Tabs/Violations/QViolations.tsx';
import { useHandlerTabsParams } from '@hooks/useHandlerеTabsParams.ts';

const tabs = [
  { label: 'Общие сведения об организации', path: 'general' },
  { label: 'Сведения о лицензии', path: 'license' },
  { label: 'Нарушения', path: 'violations' },
];
export const Questionnaire: FC = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('tablet'));
  const {tabIndex, handleChange} = useHandlerTabsParams({tabs, tabsName: 'gtabs', nested: true});

  return (
    <Container sx={{ width: '100%' }}>
      <Tabs orientation={`${isSmallScreen ? 'vertical' : 'horizontal'}`} value={tabIndex}>
        {tabs.map((el) => {
          return <Tab onClick={() => handleChange(el.path)} key={el.label} label={el.label} />;
        })}
      </Tabs>
      <TabPanel index={0} value={tabIndex}>
        <QGeneral />
      </TabPanel>
      <TabPanel index={1} value={tabIndex}>
        <QLicense />
      </TabPanel>
      <TabPanel index={2} value={tabIndex}>
        <QViolations />
      </TabPanel>
    </Container>
  );
};
