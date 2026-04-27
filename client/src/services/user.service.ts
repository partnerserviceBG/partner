import { UserDto } from '@models/User';

import { createApi } from '@reduxjs/toolkit/query/react';

import { baseQueryWithReAuth } from '@store/utils/baseQueryAuth';
import { SignInDataType } from '@utils/types.ts';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Users'],
  endpoints: (build) => ({
    login: build.mutation<UserDto, SignInDataType>({
      query: (body) => ({
        url: `/users/login`,
        method: 'POST',
        body,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: `/users/logout`,
        method: 'POST',
      }),
      invalidatesTags: [{ type: 'Users' }],
    }),
    refresh: build.mutation<UserDto, void>({
      query: () => ({
        url: `/users/refresh`,
        method: 'POST',
      }),
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation, useRefreshMutation } = usersApi;
