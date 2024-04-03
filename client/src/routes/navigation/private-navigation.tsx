import { RoutesNavType } from '@utils/types.ts';

export const privateNavigation: RoutesNavType[] = [
  { path: '/admin', name: 'Панель администратора', children: [] },
  {
    path: '/',
    name: 'Выйти',
  },
];
