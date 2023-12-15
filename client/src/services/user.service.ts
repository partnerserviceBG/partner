import { User } from '../models/User';
import localStorageService from './localStorage.service';

import { createApi } from '@reduxjs/toolkit/query/react';
import { SignInDataType } from '../types/SignInDataType';
import { baseQueryWithReAuth } from '../store/utils/baseQueryAuth';

export const usersApi = createApi({
  reducerPath: 'usersApi',
  baseQuery: baseQueryWithReAuth,
  tagTypes: ['Users'],
  endpoints: (build) => ({
    getUsers: build.query<User[], void>({
      query: () => 'users',
      providesTags: (result) => ['Users'],
    }),
    login: build.mutation<User, SignInDataType>({
      query: (body) => ({
        url: `/users/login`,
        method: 'POST',
        body,
      }),
      transformResponse: (data: User) => {
        if (data) {
          const { accessToken, refreshToken, user } = data;
          const { id } = user;
          localStorageService.setTokens({ accessToken, refreshToken, userId: id });
        }
        return data;
      },
      invalidatesTags: [{ type: 'Users' }],
    }),
    logout: build.mutation({
      query: () => ({
        url: `/users/logout`,
        method: 'POST',
        body: { refreshToken: localStorageService.getRefreshToken() },
      }),
      transformResponse: () => {
        localStorageService.removeAuthData();
      },
      invalidatesTags: [{ type: 'Users' }],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = usersApi;
