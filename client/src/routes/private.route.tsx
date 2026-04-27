import { PrivateRoutes } from '@routes/utils/privateRoutes.tsx';
import { PagesLayout } from '@layouts/pages-layout/pagesLayout.tsx';
import { lazy, Suspense } from 'react';
import { News } from '@components/ui/News/news/News.tsx';

const AdminPanelPage = lazy(async () => {
  const module = await import('@pages/admin-panel/adminPanelPage.tsx');
  return { default: module.AdminPanelPage };
});
const NewsPanel = lazy(async () => {
  const module = await import(
    '@components/ui/Admin-panel/NewsPanel/NewsPanel.tsx'
  );
  return { default: module.NewsPanel };
});
const VacancyPanel = lazy(async () => {
  const module = await import(
    '@components/ui/Admin-panel/VacancyPanel/VacancyPanel.tsx'
  );
  return { default: module.VacancyPanel };
});
const withSuspense = (element: JSX.Element) => {
  return <Suspense fallback={null}>{element}</Suspense>;
};

export const privateRoute = [
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: '/',
        element: <PagesLayout />,
        children: [
          {
            element: withSuspense(<AdminPanelPage />),
            path: '/admin',
            children: [
                {
                  path: "news-panel",
                  children: [
                    { path: ':id', element: <News /> },
                    { index: true, element: withSuspense(<NewsPanel />) }
                  ]
                },
                {
                  path: "vacancy-panel",
                  element: withSuspense(<VacancyPanel />)
                },
            ]
          },
        ],
      },
    ],
  },
];
