import React, { useEffect, useState } from 'react';
import { navigationPrivateRoutes, navigationRoutes } from '@routes/router';
import { Container, Logo, NavList } from '@components/common';
import { useAuth } from '@hooks/useAuth.ts';
import { useNavigate } from 'react-router-dom';
import { useLogoutMutation } from '@services/user.service.ts';

const Header: React.FC = () => {
  const [currentRoutes, setCurrentRoutes] = useState(navigationRoutes);
  const { user, removeAuthData } = useAuth();
  const navigate = useNavigate();
  const [logOut, { data: userId }] = useLogoutMutation();

  useEffect(() => {
    if (userId) {
      removeAuthData();
      setCurrentRoutes(navigationRoutes);
      navigate('/', { replace: true });
    }
  }, [userId]);

  useEffect(() => {
    if (user) {
      setCurrentRoutes(navigationPrivateRoutes);
    }
  }, []);
  return (
    <header className='header'>
      <Container>
        <div className='header__inner'>
          <Logo className='header__logo' />
          <NavList logOut={logOut} routes={currentRoutes} className='header-nav' />
        </div>
      </Container>
    </header>
  );
};

export default React.memo(Header);
