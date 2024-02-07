import React from 'react';
import { Container, NavList } from '@components/common';
import { useAuth } from '@hooks/useAuth.ts';
import { publicNavigation } from '@routes/navigation/public-navigation.tsx';
import { AppBar, Avatar, Box, IconButton, Link, Menu, styled, Tooltip, Typography, useTheme } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { privateNavigation } from '@routes/navigation/private-navigation.tsx';
import { useGetInfoQuery } from '@services/organisation-info.service.ts';
import { NavLink } from 'react-router-dom';

const CompanyStyle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
  opacity: 0.4,
  fontWeight: 'bold',
}));

const CaptionStyle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
  fontWeight: 'bold',
}));
const Header: React.FC = () => {
  const { user } = useAuth();
  const theme = useTheme();

  const { data } = useGetInfoQuery();

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
    <AppBar position='static' elevation={0}>
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          maxHeight: '120px',
          minHeight: '120px',
        }}
      >
        <Box sx={{ display: { mobile: 'flex', laptop: 'none' } }}>
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
              display: { tablet: 'block', desktop: 'none' },
            }}
          >
            <NavList variant='menu' sx={{ flexDirection: 'column' }} routes={publicNavigation} />
          </Menu>
        </Box>
        <Box
          sx={{
            display: { mobile: 'none', laptop: 'flex' },
            flexDirection: 'column',
            minWidth: '280px',
            marginRight: '20px',
          }}
        >
          <NavLink style={{ textDecoration: 'none' }} to={'/'}>
            <CompanyStyle variant='h4'>Партнер Сервис</CompanyStyle>
            <CaptionStyle variant='caption'>Управляющая компания</CaptionStyle>
          </NavLink>
        </Box>
        <Box sx={{ display: { mobile: 'none', laptop: 'flex' }, alignItems: 'center' }}>
          <NavList variant='header' routes={publicNavigation} />
        </Box>

        {data && (
          <Box sx={{ display: 'flex', flexDirection: 'column', marginLeft: '10px', minWidth: '165px' }}>
            <Box
              component={Typography}
              sx={{
                color: theme.palette.warning.main,
              }}
              variant='subtitle1'
            >
              Диспетчер 24/7
            </Box>
            <Box sx={{ textDecoration: 'none' }} component={Typography} variant='subtitle1'>
              {data &&
                data.map((el) => (
                  <Link
                    underline='none'
                    sx={{
                      color: theme.palette.primary.light,
                      '&::after': {
                        content: '"📱"',
                        ml: '5px',
                      },
                    }}
                    key={el.id}
                    href={`tel:${el.contactPhoneNumber.value}`}
                  >
                    {el.contactPhoneNumber.value}
                  </Link>
                ))}
            </Box>
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
              <NavList variant='menu' sx={{ flexDirection: 'column' }} routes={privateNavigation} />
            </Menu>
          </Box>
        )}
      </Container>
    </AppBar>
  );
};

export default React.memo(Header);
