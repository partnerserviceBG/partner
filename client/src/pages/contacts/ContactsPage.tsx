import { FC, ReactElement, ReactNode } from 'react';
import { MapY } from '@components/ui/MapY/MapY.tsx';
import { useGetInfoQuery, useGetScheduleCompanyQuery } from '@services/organisation-info.service.ts';
import { Box, Grid, Link, styled, Typography } from '@mui/material';
import { Container } from '@components/common';

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

export const ContactsPage: FC = (): ReactNode => {
  const { data: info } = useGetInfoQuery();
  const { data: schedule } = useGetScheduleCompanyQuery();

  const getBlock = (title: string, emptyField?: boolean): ReactElement => {
    return (
      <Grid sx={{ marginBottom: '40px' }} item laptop={6} tablet={12}>
        <Box component={Typography} variant='border_bottom'>
          {title}
        </Box>
        <Box sx={{ marginTop: '21px' }} display='flex' flexDirection='column'>
          {info && (
            <Box>
              {getTextValue(info['contactPhoneNumber'].field, info['contactPhoneNumber'].value, 'info', 'tel:')}
            </Box>
          )}
          {info && <Box>{getTextValue(info['email'].field, info['email'].value, 'info', 'mailto:')}</Box>}
          {schedule && !emptyField ? (
            Object.keys(schedule).map((key) => {
              const { field, value } = schedule[key];
              return value && <Box key={key}>{getTextValue(field, value, 'schedule')}</Box>;
            })
          ) : (
            <Box color={'main'}>{getTextValue('Часы работы', 'Круглосуточно', 'schedule')}</Box>
          )}
        </Box>
      </Grid>
    );
  };
  const getTextValue = (
    field: string,
    value: string,
    data: 'info' | 'schedule',
    fieldType?: 'tel:' | 'mailto:'
  ): ReactElement => {
    switch (data) {
      case 'info':
        return (
          <Box display='flex'>
            <Typography sx={{ marginRight: '10px', fontWeight: 'bold' }}>{`${field}:`}</Typography>
            <Typography>
              <LinkStyle href={`${fieldType}:${value}`}>{value}</LinkStyle>
            </Typography>
          </Box>
        );
      case 'schedule':
        return (
          <Box display='flex'>
            <Typography sx={{ marginRight: '10px', fontWeight: 'bold' }}>{`${field}:`}</Typography>
            <Typography>{value}</Typography>
          </Box>
        );
    }
  };

  return (
    <>
      <Box sx={{ marginBottom: 5 }}>
        <MapY />
      </Box>
      <Container sx={{ marginBottom: '70px' }}>
        <Grid container spacing={2}>
          {info &&
            [info].map((info) => {
              return (
                <Grid key={info.id} component={Typography} variant='h2' item mobile={12} sx={{ marginBottom: '60px' }}>
                  {info.locationOfControls.value}
                </Grid>
              );
            })}
          {getBlock('Приёмная')}
          {getBlock('Аварийно-ремонтная служба', true)}
        </Grid>
      </Container>
    </>
  );
};
