import { PrivateRoutes } from '@routes/utils/privateRoutes.tsx';
import { PagesLayout } from '@layouts/pages-layout/pagesLayout.tsx';
import { AdminPanelPage } from '@pages/admin-panel/adminPanelPage.tsx';
import { NewsPanel } from '@components/ui/Admin-panel/NewsPanel/NewsPanel.tsx';
import { VacancyPanel } from '@components/ui/Admin-panel/VacancyPanel/VacancyPanel.tsx';
import { News } from '@components/ui/News/news/News.tsx';

export const privateRoute = [
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: '/',
        element: <PagesLayout />,
        children: [
          {
            element: <AdminPanelPage/>,
            path: '/admin',
            children: [
                {
                  path: "news-panel",
                  children: [{ path: ':id', element: <News />}, {index: true, element: <NewsPanel />} ]
                },
                {
                  path: "vacancy-panel", element: <VacancyPanel/>
                },
            ]
          },
        ],
      },
    ],
  },
];
