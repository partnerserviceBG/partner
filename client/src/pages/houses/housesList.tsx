import { FC, ReactNode } from 'react';
import { useGetHousesQuery } from '@services/house.service.ts';
import { Link } from 'react-router-dom';

export const HousesList: FC = (): ReactNode => {
  const { data } = useGetHousesQuery();
  return (
    <div>
      {data?.map((el) => (
        <Link to={`${el.id}`} key={el.id}>
          {el.full_address}
        </Link>
      ))}
    </div>
  );
};
