import { FC, useEffect, useState } from 'react';
import { Box, Paper, styled, Typography } from '@mui/material';
import {
  StyledSvgIconBox,
} from '@components/share/styled-box-by-icon/StyledBoxByIcon.tsx';
// @ts-ignore
import area from '@images/svg/area.svg?react';
// @ts-ignore
import entrances from '@images/svg/entrances.svg?react';
// @ts-ignore
import stairs from '@images/svg/stairs.svg?react';
// @ts-ignore
import flats from '@images/svg/flats.svg?react';
// @ts-ignore
import year from '@images/svg/year.svg?react';
import { GeneralInfo } from '@components/ui/Disclosure/Tabs/GeneralInfo/GeneralInfo.tsx';
import { ContactsPage } from '@pages/contacts/ContactsPage.tsx';
import { House } from '@models/Rias-models/House/House.ts';
import { Progress } from '@components/share/progress/Progress.tsx';
import { MapY } from '@components/ui/MapY/MapY.tsx';
import { YMapsApi } from '@pbe/react-yandex-maps/typings/util/typing';

const BoxStyle = styled(Box)(() => ({
  marginTop: '20px',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  padding: '30px',
}));

const TypographyInfoStyle = styled(Typography)(({theme}) => ({
  fontWeight: 'bold',
  color: theme.palette.info.main,
  margin: '10px 0'
}));

const TypographyCaptionStyle = styled(Typography)(() => ({
  fontWeight: 'bold',
  display: 'flex',
  alignItems: 'center',
  '.sup': {
    marginLeft: '10px'
  }
}));

interface HInfoProps {
  data?: House;
  isLoading?: boolean;
}

export const HInfo: FC<HInfoProps> = ({data, isLoading}) => {
  const [ymap, setYmap] = useState<YMapsApi>();
  const [house, setHouse] = useState<House>();

  useEffect(() => {
    setHouse(data)
    onLoadGeoMap(ymap).then();
  }, [ymap]);
  const onLoadGeoMap = async (ymap?: YMapsApi) => {
    if (house) {
      const geometry = await ymap?.geocode(`${house.full_address}`);
      // @ts-ignore
      house.geometry = geometry?.geoObjects.get(0).geometry?.getCoordinates();
    }
  };
  return (
    isLoading ? <Progress/> : <>
      <Paper
        sx={{
          display: 'flex',
          justifyContent: 'space-around',
          flexWrap: 'wrap',
          marginBottom: '100px'
        }}
        elevation={3}
      >
        <BoxStyle>
          <StyledSvgIconBox component={entrances}/>
          <TypographyInfoStyle variant='h2'>{house?.entrances?.length}</TypographyInfoStyle>
          <TypographyCaptionStyle variant='h4'>{'Подъезды'}</TypographyCaptionStyle>
        </BoxStyle>
        <BoxStyle>
          <StyledSvgIconBox component={stairs}/>
          <TypographyInfoStyle variant='h2'>{house?.floor_count}</TypographyInfoStyle>
          <TypographyCaptionStyle variant='h4'>{'Этажей'}</TypographyCaptionStyle>
        </BoxStyle>
        <BoxStyle>
          <StyledSvgIconBox component={flats}/>
          <TypographyInfoStyle variant='h2'>{house?.premises?.length}</TypographyInfoStyle>
          <TypographyCaptionStyle variant='h4'>{'Квартир'}</TypographyCaptionStyle>
        </BoxStyle>
        <BoxStyle>
          <StyledSvgIconBox component={year}/>
          <TypographyInfoStyle variant='h2'>{ house?.used_year }</TypographyInfoStyle>
          <TypographyCaptionStyle variant='h4'>{'Год'}</TypographyCaptionStyle>
        </BoxStyle>
        <BoxStyle>
          <StyledSvgIconBox component={area}/>
          <TypographyInfoStyle variant='h2'>{ house && parseFloat(house.total_square).toFixed(1) }</TypographyInfoStyle>
          <TypographyCaptionStyle variant='h4'>{'Площадь'}<sup className='sup'>м2</sup></TypographyCaptionStyle>
        </BoxStyle>
      </Paper>
      <Box sx={{marginBottom: '40px'}}>
        <MapY height={300} onLoadGeoMap={setYmap} house={house} zoom={12} />
      </Box>
      <GeneralInfo />
      <ContactsPage />
    </>
  );
};
