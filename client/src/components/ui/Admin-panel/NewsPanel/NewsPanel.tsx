import { ChangeEvent, FC, useEffect, useState } from 'react';
import {
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TablePagination,
  TableRow, Typography, useMediaQuery, useTheme,
} from '@mui/material';
import { TablePaginationProps } from '@mui/material/TablePagination';
import { Container } from '@components/common';
import { useGetPostsQuery } from '@services/post.service.ts';
import { NewsItem } from '@components/ui/News/news-item/NewsItem.tsx';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import TextField from '@mui/material/TextField';
import { Post } from '@models/Post.ts';
import EditIcon from '@mui/icons-material/Edit';
import DeleteForeverIcon from '@mui/icons-material/DeleteForever';
import { AddOrEditModal } from '@components/ui/Admin-panel/NewsPanel/News/AddOrEdit/AddOrEditModal.tsx';
import { DeleteNewsModal } from '@components/ui/Admin-panel/NewsPanel/News/Delete/DeleteNewsModal.tsx';
import { Outlet } from 'react-router-dom';
import { EmptyState } from '@components/share/view-state/ViewState.tsx';
import { SkeletonState } from '@components/share/skeleton/SkeletonState.tsx';

export const NewsPanel: FC = () => {
  const { data, isLoading } = useGetPostsQuery();
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('tablet'));

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [search, setSearch] = useState('');
  const [newsData, setNewsData] = useState<Post[] | undefined>([]);
  const [news, setNews] = useState<Post | undefined>();

  const [openAddModal, setOpenAddModal] = useState(false);
  const [openDeleteModal, setOpenDeleteModal] = useState(false);
  const [openEditModal, setOpenEditModal] = useState(false);

  const handleClickOpenModal = (open: 'edit' | 'delete' | 'add', news?: Post) => {
    switch (open) {
      case 'add':
        setOpenAddModal(true);
        break;
      case 'delete':
        setNews(news)
        setOpenDeleteModal(true);
        break;
      case 'edit':
        setNews(news)
        setOpenEditModal(true);
    }
  };

  useEffect(() => {
    if (data) {
      setNewsData(data.items);
      setSearch('')
    }
  }, [data]);

  const handleChangePage: TablePaginationProps['onPageChange'] = (_, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  useEffect(() => {
    if (search) {
      const searchData = data?.items.filter((el) => el.title?.toLocaleLowerCase().includes(search.toLocaleLowerCase()));
      setNewsData(searchData);
    } else {
      setNewsData(data?.items);
    }
  }, [search]);

  return <Container>
    {isLoading ? <SkeletonState rows={3} withImage minHeight={420} /> :
      <>
        <AddOrEditModal open={openAddModal} setOpen={setOpenAddModal} />
        <DeleteNewsModal news={news} open={openDeleteModal} setOpen={setOpenDeleteModal} />
        <AddOrEditModal news={news} open={openEditModal} setOpen={setOpenEditModal} />
        <TableContainer sx={{ overflowX: 'auto' }}>
          <Box sx={{
            marginBottom: '10px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexDirection: isSmallScreen ? 'column' : 'row',
          }}>
            <Outlet/>
            <TablePagination
              rowsPerPageOptions={[5, 10, 25, { value: -1, label: 'Все' }]}
              component='div'
              count={newsData?.length! || 0}
              rowsPerPage={rowsPerPage}
              labelRowsPerPage={'Отображать по:'}
              labelDisplayedRows={
                ({ from, to, count }) => {
                  return '' + from + '-' + to + ' из ' + count;
                }
              }
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
              sx={{ ...(isSmallScreen && { marginBottom: '20px' }) }}
            />
            <TextField onChange={(event) => setSearch(event.target.value)} label='Найти новость' color='primary'
                       variant='outlined' size='small'
                       value={search}
                       focused />
            <Box onClick={() => handleClickOpenModal('add')} sx={{
              display: 'flex',
              alignItems: 'center',
              cursor: 'pointer', ...(isSmallScreen && { marginTop: '20px' }),
              '&:hover': { color: theme.palette.primary.main },
            }}>
              <AddCircleIcon fontSize='large' sx={{ marginRight: '10px' }} />
              <Typography variant='h4'>Добавить новость</Typography>
            </Box>
          </Box>
          <Table size='small'>
            <TableBody>
              {newsData && newsData.length > 0 && (rowsPerPage > 0
                ? newsData.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : newsData).map((news) => {
                return (
                  <TableRow key={news.id}>
                    <TableCell>{<NewsItem news={news} />}</TableCell>
                    <TableCell>{
                      <Box sx={{ display: 'flex' }}>
                        <EditIcon titleAccess='Редактировать' onClick={() => handleClickOpenModal('edit', news)} fontSize='medium' sx={{
                          cursor: 'pointer',
                          marginRight: '10px',
                        }}/>
                      <DeleteForeverIcon titleAccess='Удалить' onClick={() => handleClickOpenModal('delete', news)}  sx={{ cursor: 'pointer' }} />
                    </Box>
                    }</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
          {newsData?.length === 0 ? (
            <EmptyState
              title='Новости не найдены'
              description='Измени критерий поиска или добавь новую новость.'
            />
          ) : null}
        </TableContainer>
      </>
    }
  </Container>;
};