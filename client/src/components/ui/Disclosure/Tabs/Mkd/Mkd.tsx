import { FC, useEffect, useMemo, useState } from 'react';
import { useGetHousesQuery } from '@services/house.service.ts';
import { Container } from '@components/common';
import {
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from '@mui/material';
import { NavLink, useSearchParams } from 'react-router-dom';
import { getShortAddress } from '@utils/utils.ts';
import { HouseFilter, HouseFilterOption } from '@components/share/house-filter/HouseFilter.tsx';
import { EmptyState, ErrorState } from '@components/share/view-state/ViewState.tsx';

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
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, error } = useGetHousesQuery();
  const houses = (data || []).filter((house) => house?.id && house?.full_address);
  const [selectedHouseId, setSelectedHouseId] = useState<string | null>(
    searchParams.get('houseId'),
  );
  const houseOptions: HouseFilterOption[] = useMemo(() => {
    return houses.map((house) => ({
      id: String(house.id),
      label: getShortAddress(house.full_address) || String(house.id),
    }));
  }, [houses]);
  const filteredHouses = useMemo(() => {
    if (!selectedHouseId) {
      return houses;
    }
    return houses.filter((house) => String(house.id) === selectedHouseId);
  }, [houses, selectedHouseId]);
  const formatNumber = (value: number | string | undefined): string => {
    const num = Number(value);
    return Number.isFinite(num) ? num.toString() : ' - ';
  };
  const formatArea = (value: string | number | undefined): string => {
    const num = Number(value);
    return Number.isFinite(num) ? num.toFixed(1) : ' - ';
  };

  useEffect(() => {
    setSelectedHouseId(searchParams.get('houseId'));
  }, [searchParams]);

  const handleHouseFilterChange = (houseId: string | null) => {
    setSelectedHouseId(houseId);
    setSearchParams((prevParams) => {
      const nextParams = new URLSearchParams(prevParams);
      if (houseId) {
        nextParams.set('houseId', houseId);
      } else {
        nextParams.delete('houseId');
      }
      return nextParams;
    });
  };

  return (
    <Container>
      <HouseFilter
        options={houseOptions}
        selectedHouseId={selectedHouseId}
        onChange={handleHouseFilterChange}
      />
      {error ? (
        <ErrorState
          title='Не удалось загрузить список МКД'
          description='Попробуйте обновить страницу.'
        />
      ) : null}
      {!error && filteredHouses.length === 0 ? (
        <EmptyState title='МКД не найдены' />
      ) : null}
      {!error && filteredHouses.length > 0 ? (
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
          {filteredHouses.map((el) => {
              return (
                <TableRow key={el.id}>
                  <TableCell>{<NavItem to={`/houses/${el.id}`}>{getShortAddress(el.full_address)}</NavItem>}</TableCell>
                  <TableCell align='left'>{formatNumber(el.floor_count)}</TableCell>
                  <TableCell align='left'>{el.entrances?.length ?? ' - '}</TableCell>
                  <TableCell align='left'>{el.premises?.length ?? ' - '}</TableCell>
                  <TableCell align='left'>{el.cadastral_number || ' - '}</TableCell>
                  <TableCell align='left'>{formatArea(el.total_square)}</TableCell>
                  <TableCell align='left'>{formatNumber(el.used_year)}</TableCell>
                </TableRow>
              );
            })}
        </TableBody>
        </Table>
      </TableContainer>
      ) : null}
    </Container>
  );
};
