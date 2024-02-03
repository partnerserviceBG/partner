import { FC, Fragment, ReactNode } from 'react';
import { MapY } from '@components/ui/MapY/MapY.tsx';
import { useGetInfoQuery, useGetScheduleCompanyQuery } from '@services/organisation-info.service.ts';
import { Box, Grid, Typography } from '@mui/material';
import { Container } from '@components/common';

export const Contacts: FC = (): ReactNode => {
  const { data: info } = useGetInfoQuery();
  const { data: schedule } = useGetScheduleCompanyQuery();
  console.log(info);
  console.log(schedule);

  return (
    <>
      <Box sx={{ marginBottom: 5 }}>
        <MapY />
      </Box>
      <Container sx={{ marginBottom: '50px' }}>
        <Grid container spacing={2}>
          {info &&
            info.map((el) => {
              return (
                <Grid key={el.id} component={Typography} variant='name' item mobile={12}>
                  <Box>Приёмная</Box>
                  {el.locationOfControls.value}
                </Grid>
              );
            })}
          {schedule &&
            schedule.map((el) => {
              return (
                <Fragment key={el.id}>
                  <Grid item mobile={12} desktop={6}>
                    {el.organizationOperatingHours.field}: {el.organizationOperatingHours.value}
                  </Grid>
                  <Grid item mobile={12} desktop={6}>
                    {el.personalByDirector.value}
                  </Grid>
                </Fragment>
              );
            })}
        </Grid>
      </Container>
    </>
  );
};
