import { FC, ReactNode, useEffect, useMemo, useState } from 'react';
import { useGetHousesQuery } from '@services/house.service.ts';
import { MapY } from '@components/ui/MapY/MapY.tsx';
import { House } from '@models/Rias-models/House/House.ts';
import { YMapsApi } from '@pbe/react-yandex-maps/typings/util/typing';
import { Box, styled, Typography } from '@mui/material';
import { NavLink, useSearchParams } from 'react-router-dom';
import { Portal } from '@components/share/portal/Portal.tsx';
import { Container } from '@components/common';
import { getShortAddress, groupByHouses } from '@utils/utils.ts';
import { HouseFilter, HouseFilterOption } from '@components/share/house-filter/HouseFilter.tsx';
import { EmptyState, ErrorState } from '@components/share/view-state/ViewState.tsx';
import { getCachedGeometry, setCachedGeometry } from '@utils/geocode-cache.ts';
import { SkeletonState } from '@components/share/skeleton/SkeletonState.tsx';

interface GeoObjectCollection {
  get(index: number): {
    geometry?: {
      getCoordinates: () => number[];
    };
  };
}

interface GeocodeResult {
  geoObjects: GeoObjectCollection;
}

const NavItem = styled(NavLink)(({ theme }) => {
  return {
    transition: 'all 0.2s linear',
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    '&:hover': {
      opacity: 0.7,
      textDecoration: 'none',
    },
  };
});
export const HousesPage: FC = (): ReactNode => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data, isLoading, isFetching, error } = useGetHousesQuery();
  const [dataWithGeometry, setDataWithGeometry] = useState<House[]>([]);
  const [ymap, setYmap] = useState<YMapsApi>();
  const [house, setHouse] = useState<House>();
  const [container, setContainer] = useState<Element | DocumentFragment>();
  const [selectedHouseId, setSelectedHouseId] = useState<string | null>(
    searchParams.get('houseId'),
  );

  const houseOptions: HouseFilterOption[] = useMemo(() => {
    return (data || []).map((item) => ({
      id: String(item.id),
      label: getShortAddress(item.full_address) || String(item.id),
    }));
  }, [data]);

  const filteredHouses = useMemo(() => {
    if (!selectedHouseId) {
      return data || [];
    }
    return (data || []).filter((item) => String(item.id) === selectedHouseId);
  }, [data, selectedHouseId]);

  const housesList = useMemo(() => {
    return groupByHouses(filteredHouses);
  }, [filteredHouses]);

  const filteredDataWithGeometry = useMemo(() => {
    if (!selectedHouseId) {
      return dataWithGeometry;
    }
    return dataWithGeometry.filter((item) => String(item.id) === selectedHouseId);
  }, [dataWithGeometry, selectedHouseId]);

  const onLoadGeoMap = async (ymap?: YMapsApi) => {
    if (data) {
      const dataGeometry = await Promise.all(
        data.map(async (item) => {
          try {
            const cachedGeometry = getCachedGeometry(item.full_address);
            if (cachedGeometry) {
              return { ...item, geometry: cachedGeometry };
            }
            const geometry = await ymap?.geocode(`${item.full_address}`) as GeocodeResult | undefined;
            const coordinates = geometry?.geoObjects.get(0).geometry?.getCoordinates();
            if (coordinates) {
              setCachedGeometry(item.full_address, coordinates);
            }
            return { ...item, geometry: coordinates || [] };
          } catch (error) {
            return { ...item, geometry: [] };
          }
        })
      );
      setDataWithGeometry(dataGeometry);
    }
  };

  useEffect(() => {
    onLoadGeoMap(ymap).then();
  }, [ymap]);

  useEffect(() => {
    setSelectedHouseId(searchParams.get('houseId'));
  }, [searchParams]);

  const onPlacemarkYClickHandler = (house?: House): void => {
    setHouse(house);
    setTimeout(() => {
      setContainer(document.getElementById(`house-link`) as Element);
    }, 0);
  };

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
    <>
      {data && (
        <MapY
          onPlacemarkYClick={onPlacemarkYClickHandler}
          onLoadGeoMap={setYmap}
          data={filteredDataWithGeometry}
          zoom={12}
        />
      )}
      <Container
          sx={{
            marginBottom: '60px',
            marginTop: '60px',
            display: 'flex',
            flexDirection: 'column',
            flexWrap: 'wrap',
            minHeight: '520px',
          }}
        >
          {error ? (
            <ErrorState
              title='Не удалось загрузить список домов'
              description='Попробуйте обновить страницу.'
            />
          ) : null}
          <Box
            sx={{
              marginBottom: '25px',
              display: 'flex',
              alignItems: 'flex-end',
              justifyContent: 'space-between',
              flexDirection: 'row',
              gap: '12px',
              flexWrap: 'wrap',
            }}
          >
            <Typography variant='h2'>{'обл. Нижегородская, г. Богородск'}</Typography>
            <HouseFilter
              options={houseOptions}
              selectedHouseId={selectedHouseId}
              onChange={handleHouseFilterChange}
            />
          </Box>
          {isLoading || isFetching ? (
            <SkeletonState rows={4} minHeight={420} />
          ) : null}
          {!isLoading && !isFetching ? housesList?.map((el) => {
            return Object.entries(el).map(([key, value]) => {
              return (
                <Box key={key}>
                  <Box>
                    {!key.includes('Богородск') ? (
                      <Typography sx={{ marginBottom: '15px' }} variant='h3'>
                        {'обл. Нижегородская, р-он Богородский, п. Центральный'}
                      </Typography>
                    ) : null}
                    <Box sx={{ marginBottom: '35px', marginTop: '45px', display: 'flex', flexWrap: 'wrap' }}>
                      {Object.entries(value).map(([key, value]) => {
                        return (
                          <Box key={key} sx={{ margin: '20px', flex: '0 1 180px' }}>
                            <Typography sx={{ width: 'fit-content' }} variant='border_bottom'>
                              {key}
                            </Typography>
                            <Box sx={{ padding: '10px 0' }}>
                              {[...value].map((el) => {
                                return (
                                  <NavItem title={el.full_address} key={el.id} sx={{ paddingRight: '10px' }} to={`${el.id}`}>
                                    {el.houseNumber}
                                  </NavItem>
                                );
                              })}
                            </Box>
                          </Box>
                        );
                      })}
                    </Box>
                  </Box>
                </Box>
              );
            });
          }) : null}
          {!isLoading && !isFetching && !error && housesList?.length === 0 ? (
            <EmptyState title='Дома не найдены' />
          ) : null}
        </Container>
      {container && (
        <Portal container={container}>
          <NavItem to={`${house?.id}`}>{'Подробнее'}</NavItem>
        </Portal>
      )}
    </>
  );
};
