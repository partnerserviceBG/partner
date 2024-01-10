import React from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { RoutesNavType } from '@utils/types.ts';
import { useAuth } from '@hooks/useAuth.ts';
import { useLogoutMutation } from '@services/user.service.ts';

type NavListProps = {
  direction?: 'row' | 'column';
  routes: RoutesNavType[];
};

export const NavList: React.FC<NavListProps> = ({ routes, direction, ...rest }) => {
  const { user, removeAuthData } = useAuth();
  const [logOut] = useLogoutMutation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logOut(user.id);
    removeAuthData();
    navigate('/', { replace: true });
  };
  return (
    <nav {...rest}>
      <ul className='nav-wrapper' style={{ flexDirection: direction }}>
        {routes.map((route) =>
          route.name === 'Выйти' ? (
            <li onClick={handleLogout} key={route.name} className='nav-item'>
              <div className='nav-item__link'>{route.name}</div>
            </li>
          ) : (
            !route.hiddenRoute && (
              <li key={route.name} className='nav-item'>
                <NavLink className='nav-item__link' to={route.path}>
                  {route.name}
                </NavLink>
              </li>
            )
          )
        )}
      </ul>
    </nav>
  );
};
