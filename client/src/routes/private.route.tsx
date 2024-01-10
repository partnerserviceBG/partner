import { PrivateRoutes } from '@routes/utils/privateRoutes.tsx';
import { PagesLayout } from '@layouts/pages-layout/pagesLayout.tsx';
import { NewsPage } from '@pages/news/NewsPage.tsx';

export const privateRoute = [
  {
    element: <PrivateRoutes />,
    children: [
      {
        path: '/admin',
        element: <PagesLayout />,
        children: [
          {
            index: true,
            element: <NewsPage />,
          },
        ],
      },
    ],
  },
];
