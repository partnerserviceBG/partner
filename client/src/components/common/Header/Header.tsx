import React from 'react';
import { Container, Logo, NavList } from '@components/common';
import { useAuth } from '@hooks/useAuth.ts';
import { publicNavigation } from '@routes/navigation/public-navigation.tsx';
import { AppBar, Avatar, Box, IconButton, Link, Menu, Toolbar, Tooltip, Typography } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { privateNavigation } from '@routes/navigation/private-navigation.tsx';
import { useGetOrganisationInfoQuery } from '@services/organisation-info.service.ts';
const Header: React.FC = () => {
  const { user } = useAuth();

  const { data } = useGetOrganisationInfoQuery();

  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
  const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };
  const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = () => {
    setAnchorElUser(null);
  };

  return (
    <header className='header'>
      <AppBar position='static'>
        <Container maxWidth='xl'>
          <Toolbar disableGutters>
            <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
              <IconButton
                size='large'
                aria-label='account of current user'
                aria-controls='menu-appbar'
                aria-haspopup='true'
                onClick={handleOpenNavMenu}
              >
                <MenuIcon />
              </IconButton>
              <Menu
                id='menu-appbar'
                anchorEl={anchorElNav}
                anchorOrigin={{
                  vertical: 'bottom',
                  horizontal: 'left',
                }}
                keepMounted
                transformOrigin={{
                  vertical: 'top',
                  horizontal: 'left',
                }}
                open={Boolean(anchorElNav)}
                onClose={handleCloseNavMenu}
                sx={{
                  display: { xs: 'block', md: 'none' },
                }}
              >
                <NavList direction='column' routes={publicNavigation} />
              </Menu>
            </Box>
            <Container sx={{ display: { xs: 'none', md: 'flex' } }}>
              <Logo />
              <NavList routes={publicNavigation} />
            </Container>
            {data && (
              <Box className='contact-block'>
                <Typography variant='subtitle1' className='dispatcher'>
                  Диспетчер 24/7
                </Typography>
                <Typography variant='subtitle1' className='phone'>
                  <Link href={`tel:${data.info[0].contactPhoneNumber.value}`}>
                    {data.info[0].contactPhoneNumber.value}
                  </Link>
                </Typography>
              </Box>
            )}
            {user && (
              <Box className='admin'>
                <Tooltip title='Админирстрирование'>
                  <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                    <Avatar alt='Remy Sharp' src='/static/images/avatar/2.jpg' />
                  </IconButton>
                </Tooltip>
                <Menu
                  sx={{ mt: '45px' }}
                  id='menu-appbar'
                  anchorEl={anchorElUser}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  keepMounted
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                  }}
                  open={Boolean(anchorElUser)}
                  onClose={handleCloseUserMenu}
                >
                  <NavList direction='column' routes={privateNavigation} />
                </Menu>
              </Box>
            )}
          </Toolbar>
        </Container>
      </AppBar>
    </header>
  );
};

export default React.memo(Header);
