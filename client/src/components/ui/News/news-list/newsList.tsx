// @ts-ignore
import NewsImg from '../../../../../public/images/svg/news.svg';
import { FC } from 'react';
import { useGetPostsQuery } from '@services/post.service.ts';
import { NewsItem } from '@components/ui/News/news-list/news-item/newsItem.tsx';
import { Stack } from '@mui/material';

export const NewsList: FC = () => {
  const { data } = useGetPostsQuery();

  return (
    <>
      {data?.length ? (
        <Stack direction={{ xs: 'column', sm: 'row' }} spacing={{ xs: 1, sm: 2, md: 4 }}>
          {data.map((news) => (
            <NewsItem news={news} />
          ))}
        </Stack>
      ) : null}
    </>
  );
};
