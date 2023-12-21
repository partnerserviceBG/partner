import React from 'react';
import { navigationRoutes } from '@routes/router';
import { Container, Logo, NavList } from '@components/common';

const Header: React.FC = () => {
  return (
    <header className='header'>
      <Container>
        <div className='header__inner'>
          <Logo className='header__logo' />
          <NavList routes={navigationRoutes} className='header-nav' />
        </div>
      </Container>
    </header>
  );
};

export default React.memo(Header);
