import React from 'react';
import { NavLink } from 'react-router-dom';
import { RoutesNavType } from '@utils/types.ts';
import { useAuth } from '@hooks/useAuth.ts';
import { useLogoutMutation } from '@services/user.service.ts';
import { store } from '@store/store.ts';
import { postsApi } from '@services/post.service.ts';
import { housesApi } from '@services/house.service.ts';
import { usersApi } from '@services/user.service.ts';
import { managementContractsApi } from '@services/management-contracts.service.ts';
import { meteringDevicesApi } from '@services/metering-devices.service.ts';
import { organisationInfoApi } from '@services/organisation-info.service.ts';
import { nsiApi } from '@services/nsi.service.ts';
import { debtRequestApi } from '@services/debt-request.service.ts';
import { appealsApi } from '@services/appeals.service.ts';
import { styled, SxProps, Theme } from '@mui/material';

export interface NavigationLinkProps {
  routes: RoutesNavType[];
  variant: Variant;
  handleLogout?: () => void;
  sx?: SxProps<Theme>;
}

type Variant = 'header' | 'footer' | 'menu' | 'custom';

const NavRoot = styled('nav')<{ sx?: SxProps<Theme> }>((props) => {
  return {
    display: 'flex',
    alignItems: 'center',
    flexWrap: 'wrap',
    ...(Array.isArray(props.sx) ? props.sx : [props.sx]),
  };
});

const NavItem = styled(NavLink)<{ variant: Variant }>(({ theme, variant }) => {
  return {
    transition: 'all 0.2s linear',
    color: theme.palette.primary.light,
    textDecoration: 'none',
    fontWeight: 'bold',
    '&:not(:last-child)': {
      paddingRight: '20px',
    },
    '&:hover': {
      opacity: 0.7,
    },
    '&.active': {
      opacity: 0.7,
    },
    '&:focus-visible': {
      outline: `2px solid ${theme.palette.warning.main}`,
      outlineOffset: '2px',
      borderRadius: '4px',
    },
    ...(variant === 'header' && {
      color: theme.palette.primary.main,
    }),
    ...(variant === 'footer' && {
      '&:hover': {
        opacity: 0.7,
        '&:not(.active)': {
          textDecoration: 'none',
        },
      },
    }),
    ...(variant === 'custom' && {
      fontSize: theme.typography.caption.fontSize,
    }),
    ...(variant === 'menu' && {
      fontSize: theme.typography.caption.fontSize,
      color: theme.palette.primary.main,
      padding: '5px',
    }),
  };
});

const resetApiCaches = () => {
  store.dispatch(postsApi.util.resetApiState());
  store.dispatch(housesApi.util.resetApiState());
  store.dispatch(usersApi.util.resetApiState());
  store.dispatch(managementContractsApi.util.resetApiState());
  store.dispatch(meteringDevicesApi.util.resetApiState());
  store.dispatch(organisationInfoApi.util.resetApiState());
  store.dispatch(nsiApi.util.resetApiState());
  store.dispatch(debtRequestApi.util.resetApiState());
  store.dispatch(appealsApi.util.resetApiState());
};

export const NavList: React.FC<NavigationLinkProps> = (props) => {
  const { removeAuthData } = useAuth();
  const [logOut] = useLogoutMutation();

  const { routes, variant } = props;
  const handleLogout = async () => {
    await logOut(undefined);
    removeAuthData();
    resetApiCaches();
  };
  return (
    <NavRoot {...props}>
      {routes.map((route) =>
        route.name === 'Выйти' ? (
          <NavItem key={route.path} onClick={handleLogout} to={'/'} variant={variant}>
            {route.name}
          </NavItem>
        ) : (
          <NavItem key={route.path} variant={variant} to={route.path}>
            {route.name}
          </NavItem>
        )
      )}
    </NavRoot>
  );
};
