import { User, UserDto } from '@models/User.ts';

const LEGACY_TOKEN_KEY = 'jwt-token';
const USER_KEY = 'user-local';
const CSRF_KEY = 'csrf-token';
const AUTH_CHANGE_EVENT = 'auth-change';
let accessTokenState: string | null = null;
let csrfTokenState: string | null = null;
let authUserState: User | null | undefined;

const emitAuthChange = () => {
  window.dispatchEvent(new Event(AUTH_CHANGE_EVENT));
};

export const useLocalStorageByAuth = () => {
  localStorage.removeItem(LEGACY_TOKEN_KEY);

  const setTokens = ({ accessToken, csrfToken }: UserDto) => {
    accessTokenState = accessToken;
    csrfTokenState = csrfToken || null;
    if (csrfToken) {
      localStorage.setItem(CSRF_KEY, csrfToken);
    }
  };

  const setAuthData = (dto: UserDto): void => {
    const { user } = dto;
    setTokens(dto);
    setAuthUser(user);
    emitAuthChange();
  };

  const setAuthUser = (user: User) => {
    authUserState = user;
    localStorage.setItem(USER_KEY, JSON.stringify(user));
  };
  const getAccessToken = () => {
    return accessTokenState;
  };

  const getCsrfToken = () => {
    if (csrfTokenState) {
      return csrfTokenState;
    }
    const storedToken = localStorage.getItem(CSRF_KEY);
    csrfTokenState = storedToken || null;
    return csrfTokenState;
  };

  const getAuthUser = (): User | null => {
    if (authUserState !== undefined) {
      return authUserState;
    }

    const rawUser = localStorage.getItem(USER_KEY);
    if (!rawUser) {
      authUserState = null;
      return null;
    }

    try {
      const parsedUser = JSON.parse(rawUser) as User;
      authUserState = parsedUser;
      return parsedUser;
    } catch {
      localStorage.removeItem(USER_KEY);
      authUserState = null;
      return null;
    }
  };

  const removeAuthData = () => {
    accessTokenState = null;
    csrfTokenState = null;
    authUserState = null;
    localStorage.removeItem(USER_KEY);
    localStorage.removeItem(CSRF_KEY);
    emitAuthChange();
  };

  return { getAccessToken, getAuthUser, getCsrfToken, removeAuthData, setAuthData };
};

export { AUTH_CHANGE_EVENT };
