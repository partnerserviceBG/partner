import { NavLink, useLocation } from 'react-router-dom';
import Breadcrumbs from '@mui/material/Breadcrumbs';
import { publicNavigation } from '@routes/navigation/public-navigation.tsx';
import { privateNavigation } from '@routes/navigation/private-navigation.tsx';
import { useGetHousesQuery } from '@services/house.service.ts';
import { useGetPostsQuery } from '@services/post.service.ts';
import { BoxLineClamp, Container } from '@components/common';
import { publicInfoNavigation } from '@routes/navigation/public-info-navigation.tsx';
import { RoutesNavType } from '@utils/types.ts';
import { getAllChildren, getShortAddress } from '@utils/utils.ts';

export const BreadCrumbs = () => {
  const location = useLocation();
  const { data: houses } = useGetHousesQuery();
  const { data: news } = useGetPostsQuery();
  const pathNames = location.pathname.split(/[/]/).filter((x) => x);

  const navigationPath: RoutesNavType[] = [...publicNavigation, ...privateNavigation, ...publicInfoNavigation];

  const getPathTranslate = (path: string): string | undefined => {
    const flattenNavigation = getAllChildren(navigationPath);
    const getPathById = () => {
      switch (pathNames[0]) {
        case 'news':
          return news?.find((el) => el.id  === Number(path))?.title;
        case 'admin':
          return news?.find((el) => el.id === Number(path))?.title;
        case 'houses':
          return getShortAddress(houses?.find((el) => el.id === Number(path))?.full_address);
      }
    };
    return flattenNavigation.find((el) => el.path.includes(path))?.name
      ? flattenNavigation.find((el) => el.path.includes(path))?.name
      : getPathById();
  };

  const getPath = (path: string): string => {
    const houseId = houses?.find((el) => el.id === Number(path))?.id;
    switch (pathNames[1]) {
      case `${houseId}`:
        return pathNames[0] + '/' + pathNames[1];
      case `news-panel` || "vacancy-panel":
        return pathNames[0] + '/' + pathNames[1];
    }
    return path;
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
            .map((path) => {
              return (
                <NavLink key={path} to={getPath(path)}>
                  {getPathTranslate(path)}
                </NavLink>
              );
            })
            .slice(0, pathNames.length - 1)}
          {pathNames.map((path) => <BoxLineClamp key={path}>{getPathTranslate(path)}</BoxLineClamp>).slice(pathNames.length - 1)}
        </Breadcrumbs>
      </Container>
    );
  }
};
