import { FC, ReactNode } from 'react';
import { useGetPostsQuery } from '@services/post.service.ts';
import { Link } from 'react-router-dom';

export const NewsList: FC = (): ReactNode => {
  const { data } = useGetPostsQuery();
  return (
    <div>
      {data?.map((el) => (
        <Link to={`${el.id}`} key={el.id} style={{ margin: 20 }}>
          {el.title}
        </Link>
      ))}
    </div>
  );
};
