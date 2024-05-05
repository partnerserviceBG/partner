import { FC } from 'react';
import { Box, Container, Grid, Link, styled, Typography } from '@mui/material';
// @ts-ignore
import Info from '@images/svg/info.svg?react';
import { useGetInfoQuery, useGetScheduleCompanyQuery } from '@services/organisation-info.service.ts';
import { getShortAddress } from '@utils/utils.ts';
import { StyledSvgIconBox } from '@components/share/styled-box-by-icon/StyledBoxByIcon.tsx';

const LinkStyle = styled(Link)(({ theme }) => {
  return {
    transition: 'all 0.2s linear',
    color: theme.palette.primary.main,
    textDecoration: 'underline',
    fontWeight: 'bold',
    '&:hover': {
      opacity: 0.7,
      textDecoration: 'none',
    },
  };
});

export const GeneralInfo: FC = () => {
  const { data: info } = useGetInfoQuery();
  const { data: schedule } = useGetScheduleCompanyQuery();

  return (
    <Container sx={{ width: '100%', marginBottom: '60px' }}>
      <Typography sx={{ marginBottom: '20px' }} variant='h2'>
        {'Управляющий организацией'}
      </Typography>
      <Box sx={{display: 'flex', alignItems: 'center', marginBottom: '40px'}} >
        <StyledSvgIconBox component={Info}/>
        <Typography sx={{ marginLeft: '60px' }} variant='h2'>
          {info && info['director'].value}
        </Typography>
      </Box>

      <Grid container spacing={3}>
        <Grid item mobile={12} tablet={4} laptop={3} sx={{ marginBottom: '30px' }}>
          <Typography variant='border_bottom'>{'Адрес'}</Typography>
          <Box sx={{ marginTop: '15px' }}>{info && getShortAddress(info['locationOfControls'].value)}</Box>
        </Grid>
        <Grid item mobile={12} tablet={4} laptop={3} sx={{ marginBottom: '30px' }}>
          <Typography variant='border_bottom'>{'Телефон'}</Typography>
          {info && (
            <Box sx={{ marginTop: '15px' }}>
              <LinkStyle href={`tel:${info['contactPhoneNumber'].value}`}>{info['contactPhoneNumber'].value}</LinkStyle>
            </Box>
          )}
        </Grid>
        <Grid item mobile={12} tablet={12} laptop={6}>
          <Typography variant='border_bottom'>{'Режим работы и часы личного приёма граждан'}</Typography>
          <Box sx={{ marginTop: '15px' }}>
            {schedule &&
              Object.keys(schedule).map((key) => {
                const { field, value } = schedule[key];
                return (
                  field && (
                    <Box display='flex' key={key}>
                      <Typography>{`${field}:`}</Typography>
                      <Typography sx={{ marginLeft: '10px', fontWeight: 'bold' }}>{value}</Typography>
                    </Box>
                  )
                );
              })}
          </Box>
        </Grid>
      </Grid>
    </Container>
  );
};
