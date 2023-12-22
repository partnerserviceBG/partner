import React from 'react';
import { NavLink } from 'react-router-dom';
import { RoutesNavType } from '@routes/router';
import { useAuth } from '@hooks/useAuth.ts';

type NavListProps = {
  label?: string;
  direction?: 'row' | 'column';
  routes: RoutesNavType[];
  logOut?: (id: number) => void;
  [x: string]: any;
};

export const NavList: React.FC<NavListProps> = ({ label, routes, direction = 'row', logOut, ...rest }) => {
  const { user } = useAuth();
  return (
    <nav {...rest}>
      {label && <h3>{label}</h3>}
      <ul className='nav-wrapper' style={{ flexDirection: direction }}>
        {routes.map((route) => (
          <li key={route.name} className='nav-item'>
            <NavLink className='nav-item__link' to={route.path}>
              {route.name}
            </NavLink>
          </li>
        ))}
        {user && <button onClick={() => logOut && logOut(user.id)}>logout</button>}
      </ul>
    </nav>
  );
};
