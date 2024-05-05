import { RoutesNavType } from '@utils/types.ts';

export const privateNavigation: RoutesNavType[] = [
  { path: '/admin', name: 'Панель администратора', children: [{ path: 'news-panel', name: 'Панель новостей' }, {path: 'vacancy-panel', name: 'Панель вакансий'}]},
  {
    path: '/',
    name: 'Выйти',
  },
];
