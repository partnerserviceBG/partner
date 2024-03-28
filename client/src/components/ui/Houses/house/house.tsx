import { FC, ReactNode } from 'react';
import { useGetHouseQuery } from '@services/house.service.ts';
import { NavLink, useParams } from 'react-router-dom';
import { useGetMeteringDeviceQuery } from '@services/metering-devices.service.ts';
import { Container } from '@components/common';
import { styled } from '@mui/material';

const NavItem = styled(NavLink)(({ theme }) => {
  return {
    transition: 'all 0.3s linear',
    color: theme.palette.primary.main,
    backgroundColor: theme.palette.info.main,
    padding: '10px 10px 10px 15px',
    textDecoration: 'none',
    fontWeight: 'bold',
    '&::before': {
      content: '"<"',
      marginRight: '5px',
      fontWeight: 'bold',
    },
    '&:hover': {
      opacity: 0.7,
    },
    '&:hover:before': {
      position: 'relative',
      right: '10px',
    },
  };
});

export const House: FC = (): ReactNode => {
  const { id } = useParams();
  const { data } = useGetHouseQuery(id);
  const { data: device } = useGetMeteringDeviceQuery('355595');
  console.log(device);

  return (
    <Container>
      <div>{data?.full_address}</div>
      <NavItem to={'/houses'}>{'Вернуться к списку домов'}</NavItem>
    </Container>
  );
};
