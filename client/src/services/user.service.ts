import { UserDto } from '@models/User';

import { createApi } from '@reduxjs/toolkit/query/react';

// @ts-ignore
import { SignInDataType } from '@types/SignInDataType';
import { baseQueryWithReAuth } from '@store/utils/baseQueryAuth';
import { useLocalStorageByAuth } from '@hooks/useLocalStorageByAuth.ts';

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
      query: () => {
        const { getRefreshToken } = useLocalStorageByAuth();
        return {
          url: `/users/logout`,
          method: 'POST',
          body: { refreshToken: getRefreshToken() },
        };
      },
      invalidatesTags: [{ type: 'Users' }],
    }),
  }),
});

export const { useLoginMutation, useLogoutMutation } = usersApi;
