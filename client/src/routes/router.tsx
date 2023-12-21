import { createBrowserRouter } from 'react-router-dom';
import App from '../App';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { SvgIconTypeMap } from '@mui/material';
import { Login } from '@pages/login/login.tsx';
import { ErrorPage } from '@pages/error/error.tsx';
import { HomeLayouts } from '@layouts/home.tsx';

export type RoutesNavType = {
  path: string;
  name: string;
  icon?: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
    muiName: string;
  };
};

export const navigationRoutes = [
  { path: '/rooms', name: 'Доступные номера' },
  { path: '/services', name: 'Услуги' },
  { path: '/vacancy', name: 'Вакансии' },
  { path: '/news', name: 'Новости' },
  { path: '/agreement', name: 'Соглашения' },
];

export const router = createBrowserRouter([
  { path: '/', element: <App />, errorElement: <ErrorPage /> },
  { path: 'login', element: <Login /> },
  { path: 'home', element: <HomeLayouts /> },
]);
