import { NavLink, useLocation } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { publicNavigation } from '@routes/navigation/public-navigation.tsx';
import { privateNavigation } from '@routes/navigation/private-navigation.tsx';
import { useGetHousesQuery } from '@services/house.service.ts';
import { useGetPostsQuery } from '@services/post.service.ts';
import { Container } from '@components/common';
import { publicInfoNavigation } from '@routes/navigation/public-info-navigation.tsx';
import { Box } from '@mui/material';

export const BreadCrumbs = () => {
  const location = useLocation();
  const { data: houses } = useGetHousesQuery();
  const { data: news } = useGetPostsQuery();
  const pathNames = location.pathname.split(/[/]/).filter((x) => x);

  const navigationPath = [...publicNavigation, ...privateNavigation, ...publicInfoNavigation];
  const getPath = (path: string) => {
    const getPathById = () => {
      switch (pathNames[0]) {
        case 'news':
          return news?.find((el) => el.id === Number(path))?.title;
        case 'houses':
          return houses?.find((el) => el.id === Number(path))?.full_address;
      }
    };
    return navigationPath.find((el) => el.path.includes(path))?.name
      ? navigationPath.find((el) => el.path.includes(path))?.name
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
                {getPath(path)}
              </NavLink>
            ))
            .slice(0, pathNames.length - 1)}
          {pathNames.map((path) => <Box key={path}>{getPath(path)}</Box>).slice(pathNames.length - 1)}
        </Breadcrumbs>
      </Container>
    );
  }
};
