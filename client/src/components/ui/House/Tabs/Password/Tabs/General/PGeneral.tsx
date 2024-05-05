import { FC } from 'react';
import { House } from '@models/Rias-models/House/House.ts';
import { CircularProgress, Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { HouseType } from '@utils/constants/constants.ts';
import { HousePremise } from '@models/Rias-models/House/HousePremise.ts';
interface PGeneralProps {
  data?: House;
}
export const PGeneral: FC<PGeneralProps> = ({ data }) => {
  const getFilterResidential = (flag?: boolean): HousePremise[] | undefined => {
    return data?.premises?.filter((el) => flag ? el.residential : !el.residential);
  }
  const getGrossAreaResidential = (flag?: boolean): number | string => {
    return  getFilterResidential(flag)?.reduce((acc, value) => acc + Number(value.total_area), 0).toFixed(2) || " - ";
  }
  return (
    !data ? <CircularProgress color='primary' /> : <TableContainer component={Table} size='small'>
    {data &&
      [data].map(({
                    cultural_heritage,
                    house_type,
                    id,
                    oktmo,
                    used_year,
                    full_address,
                    block,
                    floor_count,
                    entrances,
                    state,
                    underground_floor_count,
                    premises,
                    total_square,
                    cadastral_number,
                    objectState
                  }) => {
        return (
          <TableBody key={id}>
            <TableRow>
              {<TableCell>{'Год ввода дома в эксплуатацию'}</TableCell>}
              {<TableCell sx={{ fontWeight: 'bold' }}>{`${used_year || ' - '}`}</TableCell>}
            </TableRow>
            <TableRow>
              {<TableCell>{'Статус культурного наследия'}</TableCell>}
              {<TableCell sx={{ fontWeight: 'bold' }}>{cultural_heritage ? 'Да' : 'Нет'}</TableCell>}
            </TableRow>
            <TableRow>
              {<TableCell>{'ОКТМО'}</TableCell>}
              {<TableCell sx={{ fontWeight: 'bold' }}>{`${oktmo || ' - '}`}</TableCell>}
            </TableRow>
            <TableRow>
              {<TableCell>{'Тип дома'}</TableCell>}
              {<TableCell sx={{ fontWeight: 'bold' }}>{`${HouseType[`${house_type}`]}`}</TableCell>}
            </TableRow>
            <TableRow>
              {<TableCell>{'Полный адрес дома (по ГИС)'}</TableCell>}
              {<TableCell sx={{ fontWeight: 'bold' }}>{`${full_address || ' - '}`}</TableCell>}
            </TableRow>
            <TableRow>
              {<TableCell>{'Является ли застройка жилого дома блокированной'}</TableCell>}
              {<TableCell sx={{ fontWeight: 'bold' }}>{block ? 'Да' : 'Нет'}</TableCell>}
            </TableRow>
            <TableRow>
              {<TableCell>{'Код состояния объекта по справочнику НСИ №24 "Состояние дома"'}</TableCell>}
              {<TableCell sx={{ fontWeight: 'bold' }}>{`${state || ' - '}`}</TableCell>}
            </TableRow>
            <TableRow>
              {<TableCell colSpan={2} className='heading'>{'Количество этажей'}</TableCell>}
            </TableRow>
            <TableRow>
              {<TableCell>{'- Наименьшее'}</TableCell>}
              {<TableCell sx={{ fontWeight: 'bold' }}>{`${floor_count || ' - '}`}</TableCell>}
            </TableRow>
            <TableRow>
              {<TableCell>{'- Наибольшее'}</TableCell>}
              {<TableCell sx={{ fontWeight: 'bold' }}>{`${floor_count || ' - '}`}</TableCell>}
            </TableRow>
            <TableRow>
              {<TableCell>{'Количество подъездов, ед.'}</TableCell>}
              {<TableCell sx={{ fontWeight: 'bold' }}>{`${entrances?.length || ' - '}`}</TableCell>}
            </TableRow>
            <TableRow>
              {<TableCell>{'Количество лифтов, ед.'}</TableCell>}
              {<TableCell sx={{ fontWeight: 'bold' }}>{' - '}</TableCell>}
            </TableRow>
            <TableRow>
              {<TableCell>{'Количество подземных этажей'}</TableCell>}
              {<TableCell sx={{ fontWeight: 'bold' }}>{`${underground_floor_count || ' - '}`}</TableCell>}
            </TableRow>
            <TableRow>
              {<TableCell className='heading'>{'Количество помещений, в том числе'}</TableCell>}
              {<TableCell sx={{ fontWeight: 'bold' }}>{`${premises?.length || ' - '}`}</TableCell>}
            </TableRow>
            <TableRow>
              {<TableCell>{'— жилых, ед.'}</TableCell>}
              {<TableCell sx={{ fontWeight: 'bold' }}>{`${getFilterResidential(true)?.length || ' - '}`}</TableCell>}
            </TableRow>
            <TableRow>
              {<TableCell>{'— нежилых, ед.'}</TableCell>}
              {<TableCell sx={{ fontWeight: 'bold' }}>{`${getFilterResidential()?.length || ' - '}`}</TableCell>}
            </TableRow>
            <TableRow>
              {<TableCell className='heading'>{'Общая площадь дома, в том числе, кв.м'}</TableCell>}
              {<TableCell sx={{ fontWeight: 'bold' }}>{`${parseFloat(total_square).toFixed(2) || ' - '}`}</TableCell>}
            </TableRow>
            <TableRow>
              {<TableCell>{'— общая площадь жилых помещений, кв.м'}</TableCell>}
              {<TableCell sx={{ fontWeight: 'bold' }}>{`${getGrossAreaResidential(true) || ' - '}`}</TableCell>}
            </TableRow>
            <TableRow>
              {<TableCell>{'— общая площадь нежилых помещений, кв.м'}</TableCell>}
              {<TableCell sx={{ fontWeight: 'bold' }}>{`${getGrossAreaResidential() || ' - '}`}</TableCell>}
            </TableRow>
            <TableRow>
              {<TableCell colSpan={2} className='heading'>{'Общие сведения о земельном участке, на котором расположен многоквартирный дом'}</TableCell>}
            </TableRow>
            <TableRow>
              {<TableCell>{'Кадастровый номер'}</TableCell>}
              {<TableCell sx={{ fontWeight: 'bold' }}>{`${cadastral_number || ' - '}`}</TableCell>}
            </TableRow>
            <TableRow>
              {<TableCell colSpan={2} className='heading'>{'НСИ №24 "Состояние дома"'}</TableCell>}
            </TableRow>
            <TableRow>
              {<TableCell>{'Архив'}</TableCell>}
              {<TableCell sx={{ fontWeight: 'bold' }}>{`${objectState.archived ? 'Да' : 'Нет'}`}</TableCell>}
            </TableRow>
            <TableRow>
              {<TableCell>{'Актуальная запись'}</TableCell>}
              {<TableCell sx={{ fontWeight: 'bold' }}>{`${objectState.is_actual ? 'Да' : 'Нет'}`}</TableCell>}
            </TableRow>
            <TableRow>
              {<TableCell>{'Дата и время последнего обновления записи в ГИС ЖКХ'}</TableCell>}
              {<TableCell sx={{ fontWeight: 'bold' }}>{`${objectState.modified || ' - ' }`}</TableCell>}
            </TableRow>
            <TableRow>
              {<TableCell>{'Наименование состояние дома'}</TableCell>}
              {<TableCell sx={{ fontWeight: 'bold' }}>{`${objectState.name || ' - ' }`}</TableCell>}
            </TableRow>
          </TableBody>
        );
      })}
  </TableContainer>
  );
};