import { ChangeEvent, FC, ReactNode, useEffect, useState } from 'react';
import { useGetPostsQuery } from '@services/post.service.ts';
import { useGetHousesQuery } from '@services/house.service.ts';
import { Container } from '@components/common';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow,
} from '@mui/material';
import { TablePaginationProps } from '@mui/material/TablePagination';
import { NewsItem } from '@components/ui/News/news-item/NewsItem.tsx';
import { getShortAddress } from '@utils/utils.ts';
import { normalizePostHousesIds } from '@models/Post.ts';
import { HouseFilter, HouseFilterOption } from '@components/share/house-filter/HouseFilter.tsx';
import { useSearchParams } from 'react-router-dom';
import { EmptyState, ErrorState } from '@components/share/view-state/ViewState.tsx';
import { SkeletonState } from '@components/share/skeleton/SkeletonState.tsx';

export const NewsPage: FC = (): ReactNode => {
  const [searchParams, setSearchParams] = useSearchParams();
  const { data: houses } = useGetHousesQuery();
  const houseOptions: HouseFilterOption[] = (houses || []).map((house) => ({
    id: String(house.id),
    label: getShortAddress(house.full_address) || String(house.id),
  }));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [selectedHouseId, setSelectedHouseId] = useState<string | null>(
    searchParams.get('houseId'),
  );
  const {
    data,
    isLoading,
    isFetching,
    error,
  } = useGetPostsQuery({
    houseId: selectedHouseId,
    page: page + 1,
    limit: rowsPerPage > 0 ? rowsPerPage : 1000,
  });
  const posts = data?.items || [];
  const total = data?.total || 0;

  useEffect(() => {
    setSelectedHouseId(searchParams.get('houseId'));
  }, [searchParams]);

  const handleChangePage: TablePaginationProps['onPageChange'] = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleHouseFilterChange = (houseId: string | null) => {
    setSelectedHouseId(houseId);
    setPage(0);
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

  const getHousesByPost = (housesId: (string | number)[] | string | null | undefined) => {
    const ids = normalizePostHousesIds(housesId);
    return houseOptions.filter((house) => ids.includes(house.id));
  };

  return <Container  sx={{padding: '60px 0'}}>
      <TableContainer sx={{ minHeight: '520px' }}>
        <HouseFilter
          options={houseOptions}
          selectedHouseId={selectedHouseId}
          onChange={handleHouseFilterChange}
        />
        {error ? (
          <ErrorState
            title='Не удалось загрузить новости'
            description='Попробуйте обновить страницу.'
          />
        ) : null}
        {posts.length > 0 ? (
          <TablePagination
            rowsPerPageOptions={[5, 10, 25, { value: -1, label: 'Все' }]}
            component='div'
            count={total}
            rowsPerPage={rowsPerPage}
            labelRowsPerPage={'Отображать по:'}
            labelDisplayedRows={
              ({ from, to, count }) => {
                return '' + from + '-' + to + ' из ' + count
              }
            }
            page={page}
            onPageChange={handleChangePage}
            onRowsPerPageChange={handleChangeRowsPerPage}
          />
        ) : null}
        {isLoading || isFetching ? (
          <SkeletonState rows={3} withImage minHeight={420} />
        ) : null}
        {!isLoading && !isFetching && !error && posts.length === 0 ? (
          <EmptyState title='Пока новостей нет' />
        ) : null}
        {!isLoading && !isFetching && !error && posts.length > 0 ? (
          <Table size='small'>
          <TableBody>
            {posts.map((news, index) => {
              return (
                <TableRow key={news.id}>
                  <TableCell>
                    <NewsItem
                      news={news}
                      large={index === 0}
                      houses={getHousesByPost(news.housesId)}
                    />
                  </TableCell>
                </TableRow>
              )
            })}
          </TableBody>
          </Table>
        ) : null}
      </TableContainer>
  </Container>
};
