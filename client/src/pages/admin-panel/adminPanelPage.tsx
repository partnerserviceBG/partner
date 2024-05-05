import { FC, ReactNode, SyntheticEvent, useEffect, useState } from 'react';
import { Container } from '@components/common';
import { Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import { TabPanel } from '@components/share/tab-panel/TabPanel.tsx';
import { Outlet, useLocation, useNavigate } from 'react-router-dom';

const tabs = [
  { label: 'Новости', path: 'news-panel' },
  { label: 'Вакансии', path: 'vacancy-panel' },
]
export const AdminPanelPage: FC = (): ReactNode => {
  const theme = useTheme();
  const navigate = useNavigate();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('tablet'));
  const location = useLocation();
  const [value, setValue] = useState(0);

  const pathName = location.pathname.split('/')[2]
  // @ts-ignore
  const handleChange = (event: SyntheticEvent, index: number, path: string) => {
    if(index !== value) {
      setValue(index);
      navigate(path)
    }
  };

  useEffect(() => {
    if(!pathName) {
      navigate('news-panel')
    }
  }, [location])


  useEffect(() => {
    const findIndex = tabs.findIndex((el) => el.path.includes(pathName));
    if(findIndex !== -1) {
      setValue(findIndex)
    }
  }, [location])

  return (
    <Container maxWidth={false} sx={{ margin: '60px 0' }}>
        <Tabs TabIndicatorProps={{
          style: { display: 'none' },
        }} orientation={ isSmallScreen ? "vertical" : 'horizontal'} value={value}>
          {tabs.map((el, index) => {
            return <Tab sx={{ marginBottom: '10px', marginRight: '10px' }} onClick={(e) => handleChange(e, index, el.path)} key={el.label} label={el.label} className='variant_button' />;
          })}
        </Tabs>
        {tabs.map((_, index) => {
          return <TabPanel key={index} index={index} value={value}>
            <Outlet/>
          </TabPanel>
        })}
    </Container>
  );
};
