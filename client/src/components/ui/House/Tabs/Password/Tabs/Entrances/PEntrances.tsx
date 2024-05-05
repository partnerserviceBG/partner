import { FC } from 'react';
import { HouseEntrance } from '@models/Rias-models/House/HouseEntrances.ts';
import {
  AccordionDetails,
  Box,
  CircularProgress,
  Table, TableBody, TableCell, TableContainer, TableRow,
  Typography,
} from '@mui/material';
import { useAccordionExpand } from '@hooks/useAccordionExpand.ts';
import { Accordion } from '@components/common/Accordion/Accordion.tsx';
import { AccordionSummary } from '@components/common/Accordion/AccordionSummary.tsx';

interface PEntrancesProps {
  entrances?: HouseEntrance[]
}

export const PEntrances: FC<PEntrancesProps> = ({entrances}) => {
  const [expanded, setExpanded] = useAccordionExpand();
  const [premisesExpanded, setPremisesExpanded] = useAccordionExpand();

  return !entrances ? <CircularProgress color='primary' /> :  entrances.filter(el => el.number !== 0).map((el, index) => {
    return (
      <Accordion  key={el.id} expanded={expanded === index} onChange={setExpanded(index)}>
        <AccordionSummary aria-controls={`panel${index}-content`} id={`panel${index}-header`}>
          <Box sx={{display: 'flex', width: '100%', alignItems: 'center', justifyContent: 'space-between'}}>
            <Typography color='primary' variant='h4' sx={{fontWeight: 'bold'}}>Подъезд &#8470; {el.number}</Typography>
            <Box sx={{marginLeft: '20px', display: 'flex', gap: 2}}>
              <Typography variant='caption'>Год создания подъезда: <span style={{ 'fontWeight': 'bold' }}>{el.creation_year}</span> </Typography>
              <Typography  variant='caption'>Количество этажей в подъезде: <span style={{ 'fontWeight': 'bold' }}>{el.storeys_number}</span></Typography>
              <Typography  variant='caption'>Количество помещений: <span style={{ 'fontWeight': 'bold' }}>{el.premises.length}</span></Typography>
            </Box>
          </Box>
        </AccordionSummary>
        <AccordionDetails>
          {[...el.premises].sort((a, b) => Number(a.number) - Number(b.number)).filter(el => !el.number.includes('.')).map((premise, index) => {
            return (
              <Accordion key={premise.id} expanded={premisesExpanded === index} onChange={setPremisesExpanded(index)}>
                <AccordionSummary aria-controls={`panel${premisesExpanded}-content`} id={`panel${premisesExpanded}-header`}>
                  <Typography color='primary' variant='h4'>Помещение &#8470; <span style={{ 'fontWeight': 'bold' }}>{premise.number}</span></Typography>
                </AccordionSummary>
                <AccordionDetails>
                  <TableContainer component={Table} size='small'>
                    <TableBody>
                      <TableRow>
                        {<TableCell>{'Категория помещения'}</TableCell>}
                        {<TableCell sx={{ fontWeight: 'bold' }}>{premise.residential ? 'Жилое' : 'Не жилое'}</TableCell>}
                      </TableRow>
                      <TableRow>
                        {<TableCell>{'Общая площадь помещения'}</TableCell>}
                        {<TableCell sx={{ fontWeight: 'bold' }}>{Number(premise.total_area).toFixed(2)}</TableCell>}
                      </TableRow>
                      <TableRow>
                        {<TableCell>{'Жилая площадь жилого помещения по паспорту помещения'}</TableCell>}
                        {<TableCell sx={{ fontWeight: 'bold' }}>{Number(premise.gross_area).toFixed(2)}</TableCell>}
                      </TableRow>
                      <TableRow>
                        {<TableCell>{'Кадастровый номер'}</TableCell>}
                        {<TableCell sx={{ fontWeight: 'bold' }}>{premise.cadastral_number}</TableCell>}
                      </TableRow>
                      <TableRow>
                        {<TableCell>{'Информация подтверждена поставщиком'}</TableCell>}
                        {<TableCell sx={{ fontWeight: 'bold' }}>{premise.information_confirmed ? 'Да' : 'Нет'}</TableCell>}
                      </TableRow>
                      <TableRow>
                        {<TableCell>{'Дата последней модификации данных по помещению в ГИС ЖКХ'}</TableCell>}
                        {<TableCell sx={{ fontWeight: 'bold' }}>{premise.modification_date}</TableCell>}
                      </TableRow>
                    </TableBody>
                  </TableContainer>
                </AccordionDetails>
              </Accordion>
            )
          })}
        </AccordionDetails>
      </Accordion>
    )
  })
}