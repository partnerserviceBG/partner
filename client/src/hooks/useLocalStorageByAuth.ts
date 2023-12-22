import { User, UserDto } from '@models/User.ts';

const TOKEN_KEY = 'jwt-token';
const REFRESH_KEY = 'jwt-refresh-token';
const USER_KEY = 'user-local';

export const useLocalStorageByAuth = () => {
  const setTokens = ({ refreshToken, accessToken }: UserDto) => {
    localStorage.setItem(TOKEN_KEY, accessToken);
    localStorage.setItem(REFRESH_KEY, refreshToken);
  };

  const setAuthData = (dto: UserDto): void => {
    const { user } = dto;
    setTokens(dto);
    setAuthUser(user);
  };

  const setAuthUser = (user: User) => {
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  };
  const getAccessToken = () => {
    return localStorage.getItem(TOKEN_KEY);
  };

  const getRefreshToken = () => {
    return localStorage.getItem(REFRESH_KEY);
  };

  const getAuthUser = (): User => {
    return JSON.parse(localStorage.getItem(USER_KEY)!);
  };

  const removeAuthData = () => {
    localStorage.removeItem(TOKEN_KEY);
    localStorage.removeItem(REFRESH_KEY);
    localStorage.removeItem(USER_KEY);
  };

  return { getAccessToken, getRefreshToken, getAuthUser, removeAuthData, setAuthData };
};
