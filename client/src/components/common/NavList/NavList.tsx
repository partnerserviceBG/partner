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
    ...(variant === 'header' && {
      color: theme.palette.primary.contrastText,
      textDecoration: 'none',
      fontWeight: theme.typography.subtitle1.fontWeight,
      fontSize: theme.typography.subtitle1.fontSize,
      lineHeight: theme.typography.subtitle1.lineHeight,
      '&:not(:last-child)': {
        paddingRight: '20px',
      },
      '&:hover': {
        '&:not(.active)': {
          textDecoration: 'underline',
        },
        textDecoration: 'none',
      },
      '&.active': {
        color: theme.palette.primary.main,
      },
    }),
    ...(variant === 'footer' && {
      color: theme.palette.primary.light,
      fontWeight: 'bold',
      textDecoration: 'none',
      '&:not(:last-child)': {
        paddingRight: '10px',
      },
      '&:hover': {
        opacity: 0.5,
      },
      '&.active': {
        opacity: 0.5,
      },
    }),
    ...(variant === 'menu' && {
      color: '#fff',
    }),
    ...(variant === 'custom' && {
      color: theme.palette.primary.light,
      fontSize: theme.typography.caption.fontSize,
      opacity: 0.7,
      '&:hover': {
        opacity: 0.4,
      },
      '&.active': {
        opacity: 0.4,
      },
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
          <NavItem key={route.path} onClick={handleLogout} to='' variant={variant}>
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
