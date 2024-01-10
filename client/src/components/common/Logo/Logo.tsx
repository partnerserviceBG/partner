import React from 'react';
import { NavLink } from 'react-router-dom';
// @ts-ignore
import ImgLogo from '@assets/png/logo.png';

export const Logo: React.FC = () => {
  return (
    <NavLink to='/' className='logo'>
      <img src={ImgLogo} alt='Логотип' title='УК "Партнёр Сервис"' />
    </NavLink>
  );
};
