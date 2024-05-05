import { FC, ReactNode, useEffect, useState } from 'react';
import { useGetHousesQuery } from '@services/house.service.ts';
import { MapY } from '@components/ui/MapY/MapY.tsx';
import { House } from '@models/Rias-models/House/House.ts';
import { YMapsApi } from '@pbe/react-yandex-maps/typings/util/typing';
import { Box, styled, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Portal } from '@components/share/portal/Portal.tsx';
import { Container } from '@components/common';
import { Progress } from '@components/share/progress/Progress.tsx';
import { groupByHouses } from '@utils/utils.ts';

const NavItem = styled(NavLink)(({ theme }) => {
  return {
    transition: 'all 0.2s linear',
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    '&:hover': {
      opacity: 0.7,
      textDecoration: 'none',
    },
  };
});
export const HousesPage: FC = (): ReactNode => {
  const { data, isLoading } = useGetHousesQuery();

  const [housesList, setHousesList] = useState<{ [key: string]: Partial<House> }[]>();
  const [dataWithGeometry, setDataWithGeometry] = useState<House[]>([]);
  const [ymap, setYmap] = useState<YMapsApi>();
  const [house, setHouse] = useState<House>();
  const [container, setContainer] = useState<Element | DocumentFragment>();
  const onLoadGeoMap = async (ymap?: YMapsApi) => {
    if (data) {
      const dataGeometry = await Promise.all(
        data.map(async (item) => {
          try {
            const geometry = await ymap?.geocode(`${item.full_address}`);
            // @ts-ignore
            return { ...item, geometry: geometry?.geoObjects.get(0).geometry?.getCoordinates() };
          } catch (error) {
            return item;
          }
        })
      );
      setDataWithGeometry(dataGeometry);
    }
  };

  useEffect(() => {
    setHousesList(groupByHouses(data));
  }, [data]);

  useEffect(() => {
    onLoadGeoMap(ymap).then();
  }, [ymap]);

  const onPlacemarkYClickHandler = (house?: House): void => {
    setHouse(house);
    setTimeout(() => {
      setContainer(document.getElementById(`house-link`) as Element);
    }, 0);
  };
  return (
    <>
      {data && (
        <MapY onPlacemarkYClick={onPlacemarkYClickHandler} onLoadGeoMap={setYmap} data={dataWithGeometry} zoom={12} />
      )}
      {isLoading ?  <Progress /> :  (
        <Container
          sx={{
            marginBottom: '60px',
            marginTop: '60px',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
          }}
        >
          {housesList?.map((el) => {
            return Object.entries(el).map(([key, value]) => {
              return (
                <Box key={key}>
                  <Box>
                    <Typography sx={{ marginBottom: '15px' }} variant='h2'>
                      {key.includes('Богородск')
                        ? 'обл. Нижегородская, г. Богородск'
                        : 'обл. Нижегородская, р-он Богородский, п. Центральный'}
                    </Typography>
                    <Box sx={{ marginBottom: '35px', marginTop: '45px', display: 'flex', flexWrap: 'wrap' }}>
                      {Object.entries(value).map(([key, value]) => {
                        return (
                          <Box key={key} sx={{ margin: '20px', flex: '0 1 180px' }}>
                            <Typography sx={{ width: 'fit-content' }} variant='border_bottom'>
                              {key}
                            </Typography>
                            <Box sx={{ padding: '10px 0' }}>
                              {[...value].map((el) => {
                                return (
                                  <NavItem title={el.full_address} key={el.id} sx={{ paddingRight: '10px' }} to={`${el.id}`}>
                                    {el.houseNumber}
                                  </NavItem>
                                );
                              })}
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </Box>
              );
            });
          })}
        </Container>
      )}
      {container && (
        <Portal container={container}>
          <NavItem to={`${house?.id}`}>{'Подробнее'}</NavItem>
        </Portal>
      )}
    </>
  );
};
