import { FC } from 'react';
import { useGetHousesQuery } from '@services/house.service.ts';
import { Container } from '@components/common';
import { styled, Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { getShortAddress } from '@utils/utils.ts';

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

const headCells = [
  {
    label: 'Адрес',
  },
  {
    label: 'Количество этажей',
  },
  {
    label: 'Количество подъездов',
  },
  {
    label: 'Количество квартир',
  },
  {
    label: 'Кадастровый номер',
  },
  {
    label: 'Площадь М2',
  },
  {
    label: 'Дата постройки',
  },
];
export const Mkd: FC = () => {
  const { data } = useGetHousesQuery();

  return (
    <Container>
      <TableContainer >
        <Table  size='small'>
        <TableHead>
          <TableRow>
            {headCells.map(({ label }) => {
              return <TableCell key={label}>{label}</TableCell>;
            })}
          </TableRow>
        </TableHead>
        <TableBody>
          {data &&
            data.map((el) => {
              return (
                <TableRow key={el.id}>
                  <TableCell>{<NavItem to={`/houses/${el.id}`}>{getShortAddress(el.full_address)}</NavItem>}</TableCell>
                  <TableCell align='left'>{el.floor_count}</TableCell>
                  <TableCell align='left'>{el.entrances.length || 0}</TableCell>
                  <TableCell align='left'>{el.premises.length || 0}</TableCell>
                  <TableCell align='left'>{el.cadastral_number}</TableCell>
                  <TableCell align='left'>{parseFloat(el.total_square).toFixed(1)}</TableCell>
                  <TableCell align='left'>{el.used_year}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
        </Table>
      </TableContainer>
    </Container>
  );
};
