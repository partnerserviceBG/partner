import { FC, ReactNode } from 'react';
import { useGetHousesQuery } from '@services/house.service.ts';
import { HouseCard } from '@components/ui/Houses/house-card/HouseCard.tsx';

export const HousesPage: FC = (): ReactNode => {
  const { data } = useGetHousesQuery();
  return <div className='card-template'>{data?.map((el) => <HouseCard key={el.id} house={el} />)}</div>;
};
