import { FC, ReactNode } from 'react';
import { useGetHouseQuery } from '@services/house.service.ts';
import { useParams } from 'react-router-dom';
import { useGetMeteringDeviceQuery } from '@services/metering-devices.service.ts';

export const House: FC = (): ReactNode => {
  const { id } = useParams();
  const { data } = useGetHouseQuery(id);
  const { data: device } = useGetMeteringDeviceQuery('355595');
  console.log(device);

  return <div>{data?.full_address}</div>;
};
