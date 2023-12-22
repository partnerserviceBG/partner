import { FC, ReactNode } from 'react';
import { useGetHouseQuery } from '@services/house.service.ts';
import { useParams } from 'react-router-dom';

export const House: FC = (): ReactNode => {
  const { id } = useParams();
  const { data } = useGetHouseQuery(id);

  return <div>{data?.full_address}</div>;
};
