import { RoutesNavType } from '@utils/types.ts';

export const publicNavigation: RoutesNavType[] = [
  { path: '/about', name: 'О нас' },
  { path: '/houses', name: 'Дома под управлением' },
  { path: '/news', name: 'Новости' },
  { path: '/vacancy', name: 'Вакансии' },
  {
    path: '/disclosure',
    name: 'Раскрытие информации',
    children: [
      { path: '', name: 'Общая информация' },
      { path: 'questionnaire', name: 'Анкета организации' },
      { path: 'mkd', name: 'Список МКД' },
    ],
  },
  { path: '/info', name: 'Информация' },
  { path: '/contacts', name: 'Контакты' },
];
