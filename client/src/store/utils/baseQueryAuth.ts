import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { UserDto } from '@models/User';
import { environments } from '@environments/environments';
import { useLocalStorageByAuth } from '@hooks/useLocalStorageByAuth.ts';

const baseQueryAuth = fetchBaseQuery({
  baseUrl: environments.baseUrl,
  prepareHeaders: (headers) => {
    const { getAccessToken } = useLocalStorageByAuth();
    const token = getAccessToken();
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
  const { getRefreshToken, setAuthData, removeAuthData } = useLocalStorageByAuth();
  // @ts-ignore
  if (result.error && result.error.originalStatus === 401) {
    const refreshToken = getRefreshToken();
    const refreshResult = await baseQueryAuth(
      { url: `users/refresh`, method: 'POST', body: { refreshToken } },
      api,
      extraOptions
    );

    if (refreshResult.data) {
      const { data } = refreshResult as { data: UserDto };
      setAuthData(data);
      result = await baseQueryAuth(args, api, extraOptions);
    } else {
      removeAuthData();
    }
  }

  return result;
};
