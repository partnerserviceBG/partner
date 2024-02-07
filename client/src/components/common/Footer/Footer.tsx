import React, { useMemo } from 'react';
import { Container, Divider, NavList } from '@components/common';
import { Box, Grid, Link, styled, Typography } from '@mui/material';
import { publicNavigation } from '@routes/navigation/public-navigation.tsx';
import { useGetInfoQuery } from '@services/organisation-info.service.ts';

// @ts-ignore
import vk from '@assets/svg/vk.svg';
import { OrganisationInfo } from '@models/OrganisationInfo.ts';
import { getShortAddress } from '@utils/utils.ts';
import { publicInfoNavigation } from '@routes/navigation/public-info-navigation.tsx';
import SocialShare from '@components/share/social-share-block/SocialShare.tsx';

interface FooterListProps<T> {
  data: T[];
}

type LinkType = 'tel' | 'email' | 'location';

const StyledFooter = styled('footer')(({ theme }) => ({
  backgroundColor: theme.palette.primary.main,
  padding: '65px 0 85px',
  position: 'relative',
}));

const CompanyBlockStyle = styled(Typography)(({ theme }) => ({
  color: theme.palette.primary.light,
  marginBottom: '10px',
  '&::before': {
    content: '"\\00A9"',
    marginRight: '10px',
  },
}));

const LinkStyle = styled(Link)<{ type: LinkType }>(({ theme, type }) => {
  return {
    transition: 'all 0.2s linear',
    color: theme.palette.primary.light,
    textDecoration: 'none',
    fontWeight: 'bold',
    '&:hover': {
      opacity: 0.7,
    },
    ...(type === 'tel' && {
      '&::before': {
        marginRight: '10px',
        content: '"📱"',
      },
    }),
    ...(type === 'email' && {
      textDecoration: 'underline',
      '&::before': {
        marginRight: '10px',
        content: '"📧"',
      },
    }),
    ...(type === 'location' && {
      '&:hover': {
        opacity: 1,
      },
      '&::before': {
        content: '"🖈"',
      },
    }),
  };
});

const FooterList: React.FC<FooterListProps<OrganisationInfo>> = ({ data }) => {
  return useMemo(
    () => (
      <>
        {data.map((el) => {
          return (
            <Box
              key={el.id}
              sx={{
                display: 'flex',
                flexDirection: { tablet: 'column', laptop: 'row', mobile: 'column' },
                alignItems: 'start',
                justifyContent: 'space-between',
              }}
            >
              <LinkStyle type='tel' href={`tel:${el.contactPhoneNumber.value}`}>
                {el.contactPhoneNumber.value}
              </LinkStyle>
              <LinkStyle type='email' href={`mailto:${el.email.value}`}>
                {el.email.value}
              </LinkStyle>
              <LinkStyle type='location'>{getShortAddress(el.locationOfControls.value)}</LinkStyle>
            </Box>
          );
        })}
      </>
    ),
    data
  );
};

const Footer = () => {
  const { data } = useGetInfoQuery();

  return (
    <StyledFooter>
      <Container>
        <Grid container spacing={2}>
          <Grid item mobile={12} desktop={3} mr={2}>
            <CompanyBlockStyle variant='h5'>УК "Партнёр Сервис"</CompanyBlockStyle>
            <NavList
              sx={{ flexDirection: 'column', alignItems: 'start' }}
              variant='custom'
              routes={publicInfoNavigation}
            ></NavList>
          </Grid>
          <Grid item mobile={12} desktop={8}>
            <Box sx={{ display: 'flex', flexDirection: 'column' }}>
              <Box>
                <NavList
                  sx={{
                    flexDirection: { mobile: 'column', laptop: 'row' },
                    display: 'flex',
                    alignItems: 'flex-start',
                    marginBottom: '20px',
                  }}
                  variant='footer'
                  routes={publicNavigation}
                />
                <Link href={'/'} title='ВКонтатке'>
                  <img src={vk} alt='ВКонтакте' />
                </Link>
              </Box>
              <Divider sx={{ marginBottom: '20px' }} />
              <Box>{data && <FooterList data={data} />}</Box>
            </Box>
          </Grid>
        </Grid>
        <SocialShare />
      </Container>
    </StyledFooter>
  );
};

export default React.memo(Footer);
