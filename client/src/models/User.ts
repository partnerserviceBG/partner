export interface User {
  user: { email: string; id: number; isActivated: boolean };
  accessToken: string;
  refreshToken: string;
}
