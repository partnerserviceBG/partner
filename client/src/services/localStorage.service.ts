const TOKEN_KEY = 'jwt-token';
const REFRESH_KEY = 'jwt-refresh-token';
const USER_ID_KEY = 'user-local-id';

type SetTokensProps = {
  accessToken: string;
  userId: number;
  refreshToken: string;
};

export function setTokens({ accessToken, userId, refreshToken }: SetTokensProps) {
  localStorage.setItem(TOKEN_KEY, accessToken);
  localStorage.setItem(REFRESH_KEY, refreshToken);
  localStorage.setItem(USER_ID_KEY, userId.toString());
}

export function getAccessToken() {
  return localStorage.getItem(TOKEN_KEY);
}

export function getRefreshToken() {
  return localStorage.getItem(REFRESH_KEY);
}
export function getUserId() {
  return localStorage.getItem(USER_ID_KEY);
}
export function removeAuthData() {
  localStorage.removeItem(TOKEN_KEY);
  localStorage.removeItem(REFRESH_KEY);
  localStorage.removeItem(USER_ID_KEY);
}

const localStorageService = {
  setTokens,
  getAccessToken,
  getRefreshToken,
  getUserId,
  removeAuthData,
};

export default localStorageService;
