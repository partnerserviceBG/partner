import React from 'react';
import { NavLink } from 'react-router-dom';
import { RoutesNavType } from '@utils/types.ts';
import { useAuth } from '@hooks/useAuth.ts';
import { useLogoutMutation } from '@services/user.service.ts';
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
      '&:not(.active)': {
        textDecoration: 'underline',
      },
    },
    '&.active': {
      opacity: 0.4,
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

export const NavList: React.FC<NavigationLinkProps> = (props) => {
  const { user, removeAuthData } = useAuth();
  const [logOut] = useLogoutMutation();

  const { routes, variant } = props;
  const handleLogout = () => {
    logOut(user.id);
    removeAuthData();
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
