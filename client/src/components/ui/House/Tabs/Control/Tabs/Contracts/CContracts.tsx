import React, { FC } from 'react';
import {
  useGetManagementContractQuery,
} from '@services/management-contracts.service.ts';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { ManagementContractsStatus, ProtocolType } from '@utils/constants/constants.ts';

interface PContractsProps {
  contractId?: number | undefined;
}
export const CContracts: FC<PContractsProps> = ({contractId}) => {
  const {data, isLoading} = useGetManagementContractQuery(contractId?.toString())

  const contractsInfo = () => {
    return <TableContainer component={Table} size='small'>
      {data &&
        [data].map(({
                        id,
                      number,
          status,
                      signing_date,
                      effective_date,
                      planned_completion_date,
                      validity_year,
                      validity_month,
                      rollover,
                      rollover_date,
                      period_metering_start_day,
                      period_metering_start_day_next_month,
                      period_metering_end_day,
                      period_metering_end_day_next_month,
                      indications_any_day,
                      payment_document_last_day,
                      payment_document_last_day_next_month,
                      payment_last_day,
                      payment_last_day_next_month,
                      protocols,
                      contractBase
                      }) => {
          return (
            <TableBody key={id}>
              <TableRow>
                {<TableCell colSpan={2} className='heading'>{'Общее'}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Номер договора'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${number || ' - '}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Статус договора в ГИС ЖКХ'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${ManagementContractsStatus[`${status}`]}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Дата заключения договора'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${signing_date || ' - '}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Дата вступления договора в силу'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${effective_date || ' - '}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Планируемая дата окончания действия договора'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${planned_completion_date || ' - '}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Договор пролонгирован'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${rollover ? 'Да' : "Нет"}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Дата пролонгации договора'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${rollover_date || ' - '}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Дата пролонгации договора'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${rollover_date || ' - '}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell colSpan={2} className='heading'>{'Основание заключения договора'}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Основание'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${contractBase.title || ' - '}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Актуальная запись'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${contractBase.is_actual ? "Да" : "Нет"}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Применимо ли к договорам управления'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${contractBase.applicable_to_management_contracts ? "Да" : "Нет"}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Применимо ли к договорам ресурсоснабжения'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${contractBase.applicable_to_resource_supply_contracts ? "Да" : "Нет"}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell colSpan={2} className='heading'>{'Сроки действия договора,в том числе'}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'- лет'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${validity_year || ' - '}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'- месяцев'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${validity_month || ' - '}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell colSpan={2} className='heading'>{'Передача показаний приборов учёта'}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Число (день месяца) начала передачи показаний индивидуальных и общих (квартирных) приборов учета'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${period_metering_start_day || ' - '}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Месяц начала передачи показаний индивидуальных и общих (квартирных) приборов учета'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${period_metering_start_day_next_month ? "Cледующий месяц за расчётным" : "Текущий расчётный месяц"}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Число (день месяца) окончания передачи показаний индивидуальных и общих (квартирных) приборов учета'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${period_metering_end_day || ' - '}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Месяц окончания передачи показаний индивидуальных и общих (квартирных) приборов учета'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${period_metering_end_day_next_month ? "Cледующий месяц за расчётным" : "Текущий расчётный месяц"}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Разрешить передачу гражданам текущих показаний по индивидуальным приборам учета в любой день месяца'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${indications_any_day ? "Да" : "Нет"}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell colSpan={2} className='heading'>{'Представления (выставления) платежных документов для внесения платы за жилое помещение и (или) коммунальные услуги'}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Число (день месяца) представления (выставления) платежных документов для внесения платы за жилое помещение и (или) коммунальные услуги'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${payment_document_last_day || ' - '}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Месяц представления (выставления) платежных документов для внесения платы за жилое помещение и (или) коммунальные услуги'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${payment_document_last_day_next_month ? "Cледующий месяц за расчётным" : "Текущий расчётный месяц"}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Число (день месяца) платы за жилое помещение и (или) коммунальные услуги (не позднее)'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${payment_last_day || ' - '}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell>{'Месяц платы за жилое помещение и (или) коммунальные услуги'}</TableCell>}
                {<TableCell sx={{ fontWeight: 'bold' }}>{`${payment_last_day_next_month ? "Cледующий месяц за расчётным" : "Текущий расчётный месяц"}`}</TableCell>}
              </TableRow>
              <TableRow>
                {<TableCell colSpan={2} className='heading'>{'Протоколы к договору управления'}</TableCell>}
              </TableRow>
              <TableRow>
                {protocols.length && protocols.map((el) => {
                  return <React.Fragment key={el.id}>
                    {<TableCell>{'Тип протокола'}</TableCell>}
                    {<TableCell sx={{ fontWeight: 'bold' }}>{`${ProtocolType[`${el.type}`]}`}</TableCell>}</React.Fragment>
                })}
              </TableRow>
            </TableBody>
          );
        })}
    </TableContainer>;
  }
  return isLoading ? <CircularProgress color='primary' /> : contractsInfo()
}