import { Post } from '@models/Post';
import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQueryWithReAuth } from '@store/utils/baseQueryAuth';

export const postsApi = createApi({
  reducerPath: 'postsApi',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Posts'],
  endpoints: (build) => ({
    getPosts: build.query<Post[], void>({
      query: () => 'posts',
      providesTags: () => ['Posts'],
      transformResponse: (data: Post[]) => {
        return [...data].sort((a,b) => new Date(b.updatedAt!).getTime() - new Date(a.updatedAt!).getTime());
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
    deletePost: build.mutation<{ success: boolean; id: number }, number>({
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
