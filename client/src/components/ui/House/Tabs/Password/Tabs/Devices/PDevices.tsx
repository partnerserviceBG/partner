import { FC } from 'react';
import { useGetMeteringDevicesQuery } from '@services/metering-devices.service.ts';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableRow, Typography } from '@mui/material';
import { DeviceType } from '@utils/constants/constants.ts';

export interface PDevicesProps {
  houseId?: string;
}

export const PDevices: FC<PDevicesProps> = ({ houseId }) => {
  const { data: devices, isLoading } = useGetMeteringDevicesQuery();
  const device = devices?.find(el => el.house_id === Number(houseId));
  const deviceInfo = () => {
    return <TableContainer component={Table} size='small'>
      {device &&
        [device].map(({
                        id,
                        stamp,
                        model,
                        installation_date,
                        commissioning_date,
                        remote_metering_mode,
                        pressure_sensor,
                        temperature_sensor,
                        readings_delivery_first_day,
                        readings_delivery_first_day_next_month,
                        readings_delivery_last_day,
                        readings_delivery_last_day_next_month,
                        type, resources,
                        verificationInterval,
                        first_verification_date,
                        factory_seal_date
                      }) => {
          return (
            <TableBody key={id}>
              <TableRow>
                {<TableCell colSpan={2} className='heading'>{'Общее'}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Тип прибора учета'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${DeviceType[`${type}`]}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Марка прибора учета'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${stamp || ' - '}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Модель прибора учета'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${model || ' - '}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Дата установки прибора учета'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${installation_date || ' - '}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Дата опломбирования прибора учета заводом-изготовителем'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${factory_seal_date || ' - '}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Дата ввода в эксплуатацию прибора учета'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${commissioning_date || ' - '}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Наличие возможности дистанционного снятия показаний прибора учета'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${remote_metering_mode ? 'Да' : 'Нет'}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Наличие датчиков давления'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${pressure_sensor ? 'Да' : 'Нет'}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Наличие датчиков температур'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${temperature_sensor ? 'Да' : 'Нет'}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell colSpan={2} className='heading'>{'Вид коммунального ресурса'}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Наименование ресурса'}</TableCell>}
                {<TableCell
                  sx={{ fontWeight: 'bold' }}>{`${Object.values(resources)[0]?.municipalResource.name || ' - '}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Сокращенное наименование'}</TableCell>}
                {<TableCell
                  sx={{ fontWeight: 'bold' }}>{`${Object.values(resources)[0]?.municipalResource.short_name || ' - '}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Можно ли для данного ресурса установить связь с прибором учета'}</TableCell>}
                {<TableCell
                  sx={{ fontWeight: 'bold' }}>{`${Object.values(resources)[0]?.municipalResource.can_link_with_device ? 'Да' : 'Нет'}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Единица измерения'}</TableCell>}
                {<TableCell
                  sx={{ fontWeight: 'bold' }}>{`${Object.values(resources)[0]?.municipalResource.okei || ' - '}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell colSpan={2} className='heading'>{'Информация по сдачи показаний'}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Число (день месяца) начала сдачи показаний'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${readings_delivery_first_day}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Число (день месяца) окончания сдачи показаний'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${readings_delivery_last_day}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Месяц начала сдачи показаний'}</TableCell>}
                {<TableCell
                  sx={{ fontWeight: 'bold' }}>{`${readings_delivery_first_day_next_month ? 'Cледующий месяц за расчётным' : 'Текущий расчётный месяц'}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Месяц окончания сдачи показаний'}</TableCell>}
                {<TableCell
                  sx={{ fontWeight: 'bold' }}>{`${readings_delivery_last_day_next_month ? 'Cледующий месяц за расчётным' : 'Текущий расчётный месяц'}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell colSpan={2} className='heading'>{'Межповерочный интервал'}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Межповерочный интервал'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${ verificationInterval.interval || ' - '}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Единица измерения интервала'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${ verificationInterval.unit || ' - '}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Дата последней поверки прибора учета'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${ first_verification_date || ' - '}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Дата и время последнего обновления записи в ГИС ЖКХ'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${ verificationInterval.modified || ' - '}`}</TableCell>}
              </TableRow>
            </TableBody>
          );
        })}
    </TableContainer>;
  };

  return isLoading ? <CircularProgress color='primary' /> : device ? deviceInfo() :
    <Typography variant='h2'>{'Нет данных о приборах учёта'}</Typography>;
};