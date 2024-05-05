import { FC, ReactNode } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { Container } from '@components/common';
import { Button, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import { TabPanel } from '@components/share/tab-panel/TabPanel.tsx';
import { HControl } from '@components/ui/House/Tabs/Control/HControl.tsx';
import { HPassport } from '@components/ui/House/Tabs/Password/HPassport.tsx';
import { HInfo } from '@components/ui/House/Tabs/Info/HInfo.tsx';
import { useGetHouseQuery } from '@services/house.service.ts';
import { useHandlerTabsParams } from '@hooks/useHandlerеTabsParams.ts';

const tabs = [
  { label: 'Информация о доме', path: 'general' },
  { label: 'Паспорт', path: 'passport' },
  { label: 'Управление', path: 'control' },
];
export const House: FC = (): ReactNode => {
  const { id } = useParams();

  const { data, isLoading } = useGetHouseQuery(id);
  const navigate = useNavigate();

  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('tablet'));

  const { tabIndex, handleChange } = useHandlerTabsParams({ tabs, tabsName: 'tabs' });

  return (
    <Container sx={{ marginBottom: '60px' }}>
      <Tabs TabIndicatorProps={{
        style: { display: 'none' },
      }} sx={{ margin: '60px 0' }} orientation={`${isSmallScreen ? 'vertical' : 'horizontal'}`} value={tabIndex}>
        {tabs.map((el) => {
          return <Tab sx={{ marginRight: '20px', marginBottom: '10px' }} onClick={() => handleChange(el.path)}
                      key={el.label} label={el.label}
                      className='variant_button' />;
        })}
      </Tabs>
      <TabPanel index={0} value={tabIndex}>
        <HInfo data={data} isLoading={isLoading} />
      </TabPanel>
      <TabPanel index={1} value={tabIndex}>
        <HPassport data={data} />
      </TabPanel>
      <TabPanel index={2} value={tabIndex}>
        <HControl data={data} />
      </TabPanel>
      <Button onClick={() => navigate(-1)} title='Вернуться к списку домов'>{'Вернуться к списку домов'}</Button>
    </Container>
  );
};
