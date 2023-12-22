export interface User {
  email: string;
  id: number;
}

export interface UserDto {
  user: User;
  accessToken: string;
  refreshToken: string;
}
