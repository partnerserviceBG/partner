export interface User {
  email: string;
  id: number;
  role: 'admin' | 'user';
}

export interface UserDto {
  user: User;
  accessToken: string;
  csrfToken?: string;
}
