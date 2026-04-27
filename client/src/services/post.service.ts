import { Post } from '@models/Post';
import {
  createApi,
  FetchBaseQueryError,
  FetchBaseQueryMeta,
} from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from '@store/utils/baseQueryAuth';

export interface PostsQueryParams {
  houseId?: string | null;
  page?: number;
  limit?: number;
  search?: string;
}

export interface PaginatedPosts {
  items: Post[];
  total: number;
}

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Posts'],
  endpoints: (build) => ({
    getPosts: build.query<PaginatedPosts, PostsQueryParams | void>({
      query: (params) => ({
        url: 'posts',
        params: {
          ...(params?.houseId ? { houseId: params.houseId } : {}),
          ...(params?.page ? { page: params.page } : {}),
          ...(params?.limit ? { limit: params.limit } : {}),
          ...(params?.search ? { search: params.search } : {}),
        },
      }),
      providesTags: () => ['Posts'],
      transformResponse: (data: Post[], meta?: FetchBaseQueryMeta) => {
        const total = Number(meta?.response?.headers.get('x-total-count') || data.length);
        const items = [...data].sort((a,b) => new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime());
        return {
          items,
          total,
        };
      },
    }),
    getPost: build.query<Post, string>({
      query: (id) => `posts/${id}`,
      providesTags: () => [{ type: 'Posts' }],
    }),
    addPost: build.mutation<Post, FormData>({
      query: (body) => ({
        url: `posts`,
        method: 'POST',
        body,
      }),
      invalidatesTags: ['Posts'],
    }),
    updatePost: build.mutation<Post, FormData>({
      query: (body ) => ({
        url: `posts/${body.get('id')}`,
        method: 'PUT',
        body
      }),
      invalidatesTags: ['Posts'],
    }),
    deletePost: build.mutation<{error: FetchBaseQueryError} | {message: string}, number>({
      query(id) {
        return {
          url: `posts/${id}`,
          method: 'DELETE',
        };
      },
      invalidatesTags: ['Posts'],
    }),
  }),
});

export const { useGetPostsQuery, useGetPostQuery, useAddPostMutation, useUpdatePostMutation, useDeletePostMutation } =
  postsApi;
