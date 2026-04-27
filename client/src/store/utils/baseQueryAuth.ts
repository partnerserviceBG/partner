import { BaseQueryFn, FetchArgs, fetchBaseQuery, FetchBaseQueryError } from '@reduxjs/toolkit/query/react';
import { UserDto } from '@models/User';
import { environments } from '@environments/environments';
import { useLocalStorageByAuth } from '@hooks/useLocalStorageByAuth.ts';

const baseQueryAuth = fetchBaseQuery({
  baseUrl: environments.baseUrl,
  credentials: 'include',
  prepareHeaders: (headers) => {
    const { getAccessToken, getCsrfToken } = useLocalStorageByAuth();
    const token = getAccessToken();
    const csrfToken = getCsrfToken();
    if (token) {
      headers.set('authorization', `Bearer ${token}`);
    }
    if (csrfToken) {
      headers.set('x-csrf-token', csrfToken);
    }

    return headers;
  },
});

let refreshRequest: Promise<UserDto | null> | null = null;

const refreshSession = async (
  api: Parameters<typeof baseQueryAuth>[1],
  extraOptions: Parameters<typeof baseQueryAuth>[2],
) => {
  if (!refreshRequest) {
    refreshRequest = (async () => {
      const refreshResult = await baseQueryAuth(
        { url: `users/refresh`, method: 'POST' },
        api,
        extraOptions
      );
      if (refreshResult.data) {
        const { data } = refreshResult as { data: UserDto };
        return data;
      }
      return null;
    })();
  }
  const result = await refreshRequest;
  refreshRequest = null;
  return result;
};

export const baseQueryWithReAuth:  BaseQueryFn<string | FetchArgs, unknown, FetchBaseQueryError> = async (
  args,
  api,
  extraOptions
) => {
  let result = await baseQueryAuth(args, api, extraOptions);
  const { setAuthData, removeAuthData, getAccessToken, getAuthUser } = useLocalStorageByAuth();
  const requestUrl = typeof args === 'string' ? args : (args?.url ?? '');
  const isAuthEndpoint = requestUrl.includes('users/login')
    || requestUrl.includes('users/logout')
    || requestUrl.includes('users/refresh');
  const hasAuthContext = Boolean(getAccessToken()) || Boolean(getAuthUser());

  if (result.error && result.error.status === 401 && !isAuthEndpoint && hasAuthContext) {
    const data = await refreshSession(api, extraOptions);
    if (data) {
      setAuthData(data);
      result = await baseQueryAuth(args, api, extraOptions);
    } else {
      if (hasAuthContext) {
        removeAuthData();
      }
    }
  }

  return result;
};
