import React from 'react';
import { Container, Divider, NavList } from '@components/common';
import { Box, Grid, Link, Typography } from '@mui/material';
import { NavLink } from 'react-router-dom';
import { publicNavigation } from '@routes/navigation/public-navigation.tsx';
import { useGetOrganisationInfoQuery } from '@services/organisation-info.service.ts';

// @ts-ignore
import vk from '../../../assets/icons/vk.svg';

const Footer = () => {
  const { data } = useGetOrganisationInfoQuery();

  if (data) {
    const { locationOfControls, email, contactPhoneNumber } = data.info[0];
    const location = locationOfControls.value.split(',').slice(2).join(',');

    return (
      <footer className='footer'>
        <Container>
          <Grid container spacing={2}>
            <Grid item lg={3} md={12}>
              <Typography className='copyring' variant='h6'>
                ООО "Партнёр Сервис"
              </Typography>
              <Box className='bottom-options'>
                <NavLink to={'/agreement'}>
                  <Typography className='agreement' variant='caption'>
                    Согласие на обработку персональных данных
                  </Typography>
                </NavLink>
                <NavLink to={'/license'}>
                  <Typography className='license' variant='caption'>
                    Лицензия на осуществление деятельности
                  </Typography>
                </NavLink>
              </Box>
            </Grid>
            <Grid item xs={12} sm={9} lg={9} md={9}>
              <Box className='footer-top-block'>
                <NavList routes={publicNavigation} />
                <Divider />
                <Box className='bottom-social-nav'>
                  <Link href={'/'}>
                    <img src={vk} alt='Вконтакте' />
                  </Link>
                </Box>
              </Box>
              <Box className='footer-bottom-block'>
                <Typography variant='subtitle1' className='phone'>
                  <Link href={`tel:${contactPhoneNumber.value}`}>{contactPhoneNumber.value}</Link>
                </Typography>
                <Typography variant='subtitle1' className='email'>
                  <Link href={`mailto:${email.value}`}>{email.value}</Link>
                </Typography>
                <Typography variant='subtitle1' className='address'>
                  {location}
                </Typography>
              </Box>
            </Grid>
          </Grid>
        </Container>
      </footer>
    );
  }
};

export default React.memo(Footer);
