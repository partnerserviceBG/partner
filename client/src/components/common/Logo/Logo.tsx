import React from 'react';
import { NavLink } from 'react-router-dom';

type LogoProps = {
  className?: string;
};

export const Logo: React.FC<LogoProps> = ({ className }) => {
  return (
    <div className={className}>
      <NavLink to='/' className='logo-link'></NavLink>
    </div>
  );
};
