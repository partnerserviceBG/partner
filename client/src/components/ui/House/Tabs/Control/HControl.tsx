import { FC, useEffect, useState } from 'react';
import { House } from '@models/Rias-models/House/House.ts';
import { Container, Tab, Tabs, useMediaQuery, useTheme } from '@mui/material';
import { useSearchParams } from 'react-router-dom';
import { TabPanel } from '@components/share/tab-panel/TabPanel.tsx';
import { CContracts } from '@components/ui/House/Tabs/Control/Tabs/Contracts/CContracts.tsx';
interface HControlProps {
  data?: House;
}

const tabs = [
  { label: 'Договоры управления', path: 'general' },
];
export const HControl: FC<HControlProps> = ({data}) => {
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('tablet'));
  const [tabIndex, setTabIndex] = useState(0);
  const [searchParams, setSearchParams] = useSearchParams();
  const handleChange = (path: string) => {
    const newParams = { 'сtabs': path }
    const index = tabs.findIndex((el) => el.path.includes(path));
    if(index !== tabIndex) {
      setSearchParams((searchParams) => {
        const prevParams: {[key: string]: string} = {};
        searchParams.forEach((value, key) => {
          prevParams[key] = value;
        });
        return { ...prevParams, ...newParams };
      });
    }
  };
  useEffect(() => {
    const param = searchParams.get('сtabs')
    if(param) {
      const index = tabs.findIndex((el) => el.path.includes(param));
      setTabIndex(index);
    } else {
      handleChange(tabs[0].path)
    }

  }, [searchParams]);


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
