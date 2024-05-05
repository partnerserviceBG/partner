import { Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import { Container } from '@components/common';
import { TabPanel } from '@components/share/tab-panel/TabPanel.tsx';
import { Questionnaire } from '@components/ui/Disclosure/Tabs/Questionnaire/Questionnaire.tsx';
import { GeneralInfo } from '@components/ui/Disclosure/Tabs/GeneralInfo/GeneralInfo.tsx';
import { Mkd } from '@components/ui/Disclosure/Tabs/Mkd/Mkd.tsx';
import { useHandlerTabsParams } from '@hooks/useHandlerеTabsParams.ts';

const tabs = [
  { label: 'Общая информация', path: 'general' },
  { label: 'Анкета организации', path: 'questionnaire' },
  { label: 'Список МКД', path: 'mkd' },]
export const Diclosure = () => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('tablet'));
  const {tabIndex, handleChange} = useHandlerTabsParams({tabs, tabsName: 'tabs'});

  return (
    <Container sx={{ marginBottom: '60px' }}>
      <Tabs TabIndicatorProps={{
        style: { display: 'none' },
      }} sx={{ margin: '60px 0' }} orientation={`${isSmallScreen ? 'vertical' : 'horizontal'}`} value={tabIndex}>
        {tabs.map((el) => {
          return <Tab sx={{ marginRight: '20px', marginBottom: '10px' }} onClick={() => handleChange(el.path)} key={el.label} label={el.label} className='variant_button' />;
        })}
      </Tabs>
      <TabPanel index={0} value={tabIndex}>
        <GeneralInfo />
      </TabPanel>
      <TabPanel index={1} value={tabIndex}>
        <Questionnaire />
      </TabPanel>
      <TabPanel index={2} value={tabIndex}>
        <Mkd />
      </TabPanel>
    </Container>
  );
}