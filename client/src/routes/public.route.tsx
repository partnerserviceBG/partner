import { Login } from '@pages/login/login.tsx';
import { PagesLayout } from '@layouts/pages-layout/pagesLayout.tsx';
import { Home } from '@pages/home/home.tsx';
import { About } from '@pages/about/about.tsx';
import { House } from '@components/ui/Houses/house/house.tsx';
import { Vacancy } from '@pages/vacancy/vacancy.tsx';
import { DisclosurePage } from '@pages/disclosure/DisclosurePage.tsx';
import { Contacts } from '@pages/contacts/Contacts.tsx';
import { NewsPage } from '@pages/news/NewsPage.tsx';
import { HousesPage } from '@pages/houses/HousesPage.tsx';
import { News } from '@components/ui/News/news/news.tsx';
import { InfoPage } from '@pages/info/infoPage.tsx';
import { LicensePage } from '@pages/license/LicensePage.tsx';
import { AgreementPage } from '@pages/agreement/AgreementPage.tsx';
import { Questionnaire } from '@components/ui/Disclosure/Questionnaire/Questionnaire.tsx';
import { GeneralInfo } from '@components/ui/Disclosure/GeneralInfo/GeneralInfo.tsx';
import { Mkd } from '@components/ui/Disclosure/Mkd/Mkd.tsx';
import { RouteObject } from 'react-router-dom';

export const publicRoute: RouteObject[] = [
  { path: 'login', element: <Login /> },
  {
    path: '/',
    element: <PagesLayout />,
    children: [
      { index: true, element: <Home /> },
      { path: 'about', element: <About /> },
      {
        path: 'houses',
        children: [
          {
            index: true,
            element: <HousesPage />,
          },
          { path: ':id', element: <House /> },
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
        children: [
          {
            path: '',
            element: <GeneralInfo />,
          },
          {
            path: 'questionnaire',
            element: <Questionnaire />,
          },
          { path: 'mkd', element: <Mkd /> },
        ],
      },
      { path: 'info', element: <InfoPage /> },
      { path: 'contacts', element: <Contacts /> },
      { path: 'license', element: <LicensePage /> },
      { path: 'agreement', element: <AgreementPage /> },
    ],
  },
];
