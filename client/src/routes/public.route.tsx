import { Login } from '@pages/login/login.tsx';
import { PagesLayout } from '@layouts/pages-layout/pagesLayout.tsx';
import { Home } from '@pages/home/home.tsx';
import { AboutPage } from '@pages/about/aboutPage.tsx';
import { House } from '@components/ui/House/House.tsx';
import { Vacancy } from '@pages/vacancy/vacancy.tsx';
import { DisclosurePage } from '@pages/disclosure/DisclosurePage.tsx';
import { ContactsPage } from '@pages/contacts/ContactsPage.tsx';
import { NewsPage } from '@pages/news/NewsPage.tsx';
import { HousesPage } from '@pages/houses/HousesPage.tsx';
import { News } from '@components/ui/News/news/News.tsx';
import { InfoPage } from '@pages/info/infoPage.tsx';
import { LicensePage } from '@pages/license/LicensePage.tsx';
import { AgreementPage } from '@pages/agreement/AgreementPage.tsx';
import { RouteObject } from 'react-router-dom';

export const publicRoute: RouteObject[] = [
  { path: 'login', element: <Login /> },
  {
    path: '/',
    element: <PagesLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <AboutPage /> },
      {
        path: 'houses',
        children: [
          {
            index: true,
            element: <HousesPage />,
          },
          {
            path: ':id',
            element: <House />,
          },
        ],
      },
      {
        path: 'news',
        children: [
          {
            index: true,
            element: <NewsPage />,
          },
          { path: ':id', element: <News /> },
        ],
      },
      { path: 'vacancy', element: <Vacancy /> },
      {
        path: 'disclosure',
        element: <DisclosurePage />,
      },
      { path: 'info', element: <InfoPage /> },
      { path: 'contacts', element: <ContactsPage /> },
      { path: 'license', element: <LicensePage /> },
      { path: 'agreement', element: <AgreementPage /> },
    ],
  },
];
