import { FC, ReactNode, useState } from 'react';
import { useGetHousesQuery } from '@services/house.service.ts';
import { YMapsApi } from 'react-yandex-maps';
import { MapY } from '@components/ui/MapY/MapY.tsx';
import { House } from '@models/House.ts';

export const HousesPage: FC = (): ReactNode => {
  const { data } = useGetHousesQuery();

  const [dataWithGeometry, setDataWithGeometry] = useState<House[]>([]);
  const onLoadGeoMap = async (ymap: YMapsApi) => {
    if (data) {
      const dataGeometry = await Promise.all(
        data.map(async (item) => {
          try {
            const geometry = await ymap.geocode(`${item.full_address}`);
            return { ...item, geometry: geometry?.geoObjects.get(0).geometry.getCoordinates() };
          } catch (error) {
            return item;
          }
        })
      );
      setDataWithGeometry(dataGeometry);
    }
  };

  return <>{data && <MapY onLoadGeoMap={onLoadGeoMap} data={dataWithGeometry} zoom={12} />}</>;
};
