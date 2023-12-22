import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';

export type RoutesNavType = {
  path: string;
  name: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
};

export const navigationRoutes = [
  { path: '/about', name: 'О нас' },
  { path: '/houses', name: 'Дома под управлением' },
  { path: '/news', name: 'Новости' },
  { path: '/vacancy', name: 'Вакансии' },
  { path: '/disclosure', name: 'Раскрытие информации' },
  { path: '/contacts', name: 'Контакты' },
];

export const navigationPrivateRoutes = [...navigationRoutes, { path: '/admin', name: 'Панель администратора' }];
