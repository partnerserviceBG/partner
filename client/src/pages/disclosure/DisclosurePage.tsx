import { FC, ReactNode, useEffect, useState } from 'react';
import { publicNavigation } from '@routes/navigation/public-navigation.tsx';
import { BottomNavigation, BottomNavigationAction, Box, styled } from '@mui/material';
import { NavLink, Outlet, useLocation } from 'react-router-dom';
import { RoutesNavType } from '@utils/types.ts';
import { Container } from '@components/common';

const NavItem = styled(NavLink)(({ theme }) => {
  return {
    transition: 'all 0.2s linear',
    color: theme.palette.primary.main,
    textDecoration: 'none',
    fontWeight: 'bold',
    '&:hover': {
      opacity: 0.7,
    },
  };
});

export const DisclosurePage: FC = (): ReactNode => {
  const path = publicNavigation.filter((el) => {
    return el.path.includes('disclosure');
  });

  const location = useLocation();
  const pathNames = location.pathname.split(/[/]/).filter((x) => x);
  const [value, setValue] = useState<number>();

  useEffect(() => {
    const indexButton = path.flatMap((el) => el.children).findIndex((el) => el?.path && pathNames.includes(el?.path));
    indexButton !== -1 ? setValue(indexButton) : setValue(0);
  }, [location]);

  const renderMenuItems = (data: RoutesNavType[]): ReactNode[] => {
    return data.map((item) =>
      item?.children && item?.children.length ? (
        renderMenuItems(item.children)
      ) : (
        <BottomNavigationAction
          sx={{ marginLeft: '15px', marginTop: '15px' }}
          label={item.name}
          to={item.path}
          component={NavItem}
          key={item.name}
        />
      )
    );
  };

  return (
    <Container sx={{ marginTop: '60px', paddingBottom: '80px' }}>
      <Box sx={{ display: 'flex', flexDirection: 'column' }}>
        <BottomNavigation showLabels sx={{ marginBottom: '45px' }} value={value}>
          {renderMenuItems(path)}
        </BottomNavigation>
        {<Outlet />}
      </Box>
    </Container>
  );
};
