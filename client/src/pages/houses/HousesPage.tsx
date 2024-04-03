import { FC, ReactNode, useEffect, useState } from 'react';
import { useGetHousesQuery } from '@services/house.service.ts';
import { MapY } from '@components/ui/MapY/MapY.tsx';
import { House } from '@models/House.ts';
import { YMapsApi } from '@pbe/react-yandex-maps/typings/util/typing';
import { Box, Container, styled } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { Portal } from '@components/share/portal/Portal.tsx';

const NavItem = styled(NavLink)(({ theme }) => {
  return {
    transition: 'all 0.2s linear',
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    fontWeight: 'bold',
    '&:hover': {
      opacity: 0.7,
      textDecoration: 'none',
    },
  };
});
export const HousesPage: FC = (): ReactNode => {
  const { data } = useGetHousesQuery();

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
      {data && (
        <Container sx={{ marginBottom: '60px' }}>
          {data.map((el) => {
            return <Box key={el.id}>{el.full_address}</Box>;
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
