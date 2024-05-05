import { FC } from 'react';
import { House } from '@models/Rias-models/House/House.ts';
import { Container, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import { TabPanel } from '@components/share/tab-panel/TabPanel.tsx';
import { CContracts } from '@components/ui/House/Tabs/Control/Tabs/Contracts/CContracts.tsx';
import { useHandlerTabsParams } from '@hooks/useHandlerеTabsParams.ts';

interface HControlProps {
  data?: House;
}

const tabs = [
  { label: 'Договоры управления', path: 'general' },
];
export const HControl: FC<HControlProps> = ({ data }) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('tablet'));
  const { tabIndex, handleChange } = useHandlerTabsParams({ tabs, tabsName: 'сtabs', nested: true });

  return (
    <Container sx={{ width: '100%' }}>
      <Tabs orientation={`${isSmallScreen ? 'vertical' : 'horizontal'}`} value={tabIndex}>
        {tabs.map((el) => {
          return <Tab onClick={() => handleChange(el.path)} key={el.label} label={el.label} />;
        })}
      </Tabs>
      <TabPanel index={0} value={tabIndex}>
        <CContracts contractId={data?.managementContracts[0].id} />
      </TabPanel>
    </Container>
  );
};
