import { NavLink, useLocation } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { publicNavigation } from '@routes/navigation/public-navigation.tsx';
import { privateNavigation } from '@routes/navigation/private-navigation.tsx';
import { useGetHousesQuery } from '@services/house.service.ts';
import { useGetPostsQuery } from '@services/post.service.ts';
import { Container } from '@components/common';
import { publicInfoNavigation } from '@routes/navigation/public-info-navigation.tsx';
import { Box } from '@mui/material';
import { RoutesNavType } from '@utils/types.ts';
import { getAllChildren } from '@utils/utils.ts';

export const BreadCrumbs = () => {
  const location = useLocation();
  const { data: houses } = useGetHousesQuery();
  const { data: news } = useGetPostsQuery();
  const pathNames = location.pathname.split(/[/]/).filter((x) => x);

  const navigationPath: RoutesNavType[] = [...publicNavigation, ...privateNavigation, ...publicInfoNavigation];

  const getPathTranslate = (path: string) => {
    const flattenNavigation = getAllChildren(navigationPath);
    const getPathById = () => {
      switch (pathNames[0]) {
        case 'news':
          return news?.find((el) => el.id === Number(path))?.title;
        case 'houses':
          return houses?.find((el) => el.id === Number(path))?.full_address;
      }
    };
    return flattenNavigation.find((el) => el.path.includes(path))?.name
      ? flattenNavigation.find((el) => el.path.includes(path))?.name
      : getPathById();
  };

  if (pathNames.length) {
    return (
      <Container
        sx={{
          display: 'flex',
          minHeight: '190px',
          alignItems: 'center',
        }}
      >
        <Breadcrumbs separator={'/'} aria-label='breadcrumb'>
          <NavLink key={'home'} to={'/'}>
            {'Главная'}
          </NavLink>
          {pathNames
            .map((path) => (
              <NavLink key={path} to={path}>
                {getPathTranslate(path)}
              </NavLink>
            ))
            .slice(0, pathNames.length - 1)}
          {pathNames.map((path) => <Box key={path}>{getPathTranslate(path)}</Box>).slice(pathNames.length - 1)}
        </Breadcrumbs>
      </Container>
    );
  }
};
