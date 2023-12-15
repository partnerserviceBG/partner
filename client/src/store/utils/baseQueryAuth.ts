import localStorageService from '../../services/localStorage.service';
import {
  BaseQueryApi,
  BaseQueryFn,
  FetchArgs,
  fetchBaseQuery,
  FetchBaseQueryError,
} from '@reduxjs/toolkit/query/react';
import { User } from '../../models/User';

const baseQueryAuth = fetchBaseQuery({
  baseUrl: 'http://localhost:5000/api/',
  prepareHeaders: (headers) => {
    const token = localStorageService.getAccessToken();
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }

    return headers;
  },
});

export const baseQueryWithReAuth: BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQueryAuth(args, api, extraOptions);
  // @ts-ignore
  if (result.error && result.error.originalStatus === 401) {
    const refreshToken = localStorageService.getRefreshToken();
    const refreshResult = await baseQueryAuth(
      { url: `users/refresh`, method: 'POST', body: { refreshToken } },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { data } = refreshResult as { data: User };
      const { accessToken, refreshToken, user } = data;

      localStorageService.setTokens({ accessToken, refreshToken, userId: user.id });

      result = await baseQueryAuth(args, api, extraOptions);
    } else {
      localStorageService.removeAuthData();
    }
  }

  return result;
};
