import { FC, ReactNode } from 'react';
import { useParams } from 'react-router-dom';
import { useGetPostQuery } from '@services/post.service.ts';

export const News: FC = (): ReactNode => {
  const { id } = useParams();
  const { data } = useGetPostQuery(id as string);
  return <div>{data?.title}</div>;
};
