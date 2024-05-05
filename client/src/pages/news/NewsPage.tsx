import { ChangeEvent, FC, ReactNode, useState } from 'react';
import { useGetPostsQuery } from '@services/post.service.ts';
import { Container } from '@components/common';
import { Table, TableBody, TableCell, TableContainer, TablePagination, TableRow } from '@mui/material';
import { NewsItem } from '@components/ui/News/news-item/NewsItem.tsx';
import { Progress } from '@components/share/progress/Progress.tsx';
export const NewsPage: FC = (): ReactNode => {
  const { data, isLoading } = useGetPostsQuery();

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // @ts-ignore
  const handleChangePage = (event: unknown, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: ChangeEvent<HTMLInputElement>) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  return <Container  sx={{padding: '60px 0'}}>
    {isLoading ? <Progress /> :
      <TableContainer >
        <TablePagination
          rowsPerPageOptions={[5, 10, 25, { value: -1, label: 'Все' }]}
          component='div'
          count={data?.length!}
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
        <Table size='small'>
          <TableBody>
            {data &&  (rowsPerPage > 0
                ? data.slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                : data).map((news, index) => {
              return (
                <TableRow key={news.id}>
                  <TableCell>{<NewsItem  news={news} large={index === 0} />}</TableCell>
                </TableRow>
              )
            })}
          </TableBody>
        </Table>
      </TableContainer>
    }
  </Container>
};
