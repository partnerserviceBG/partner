import { FC, ReactNode, useEffect, useState } from 'react';
import { useGetHousesQuery } from '@services/house.service.ts';
import { MapY } from '@components/ui/MapY/MapY.tsx';
import { House } from '@models/House.ts';
import { YMapsApi } from '@pbe/react-yandex-maps/typings/util/typing';
import { Box, Container } from '@mui/material';

export const HousesPage: FC = (): ReactNode => {
  const { data } = useGetHousesQuery();

  const [dataWithGeometry, setDataWithGeometry] = useState<House[]>([]);
  const [ymap, setYmap] = useState<YMapsApi>();
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

  return (
    <>
      {data && <MapY onLoadGeoMap={setYmap} data={dataWithGeometry} zoom={12} />}
      {data && (
        <Container sx={{ marginBottom: '60px' }}>
          {data.map((el) => {
            console.log(el.full_address?.split(','));
            return <Box>{el.full_address}</Box>;
          })}
        </Container>
      )}
    </>
  );
};
