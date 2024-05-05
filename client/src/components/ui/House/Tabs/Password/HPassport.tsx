import { FC } from 'react';
import { Container, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import { TabPanel } from '@components/share/tab-panel/TabPanel.tsx';
import { PGeneral } from '@components/ui/House/Tabs/Password/Tabs/General/PGeneral.tsx';
import { PEntrances } from '@components/ui/House/Tabs/Password/Tabs/Entrances/PEntrances.tsx';
import { PDevices } from '@components/ui/House/Tabs/Password/Tabs/Devices/PDevices.tsx';
import { House } from '@models/Rias-models/House/House.ts';
import { useHandlerTabsParams } from '@hooks/useHandlerеTabsParams.ts';

interface HPassportProps {
  data?: House;
}

const tabs = [
  { label: 'Общие сведения', path: 'general' },
  { label: 'Подъезды', path: 'entrances' },
  { label: 'Приборы учёта', path: 'devices' },
];
export const HPassport: FC<HPassportProps> = ({data}) => {
  const theme = useTheme();
  const {tabIndex, handleChange} = useHandlerTabsParams({tabs, tabsName: 'ptabs', nested: true});
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('tablet'));

  return (
    <Container sx={{ width: '100%' }}>
      <Tabs orientation={`${isSmallScreen ? 'vertical' : 'horizontal'}`} value={tabIndex}>
        {tabs.map((el) => {
          return <Tab onClick={() => handleChange(el.path)} key={el.label} label={el.label} />;
        })}
      </Tabs>
      <TabPanel index={0} value={tabIndex}>
        <PGeneral data={data} />
      </TabPanel>
      <TabPanel index={1} value={tabIndex}>
        <PEntrances entrances={data?.entrances} />
      </TabPanel>
      <TabPanel index={2} value={tabIndex}>
        <PDevices houseId={data?.id.toString()} />
      </TabPanel>
    </Container>
  );
};
