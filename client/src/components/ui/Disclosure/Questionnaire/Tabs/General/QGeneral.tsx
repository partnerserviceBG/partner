import { FC, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableRow } from '@mui/material';
import { InfoAll } from '@models/InfoAll.ts';
import { useGetAllInfoQuery } from '@services/organisation-info.service.ts';

export const QGeneral: FC = () => {
  const { data } = useGetAllInfoQuery();

  const [rowData, setRowData] = useState<InfoAll>();

  useEffect(() => {
    data && setRowData({ ...data[1], ...data[2] });
  }, [data]);

  return (
    <TableContainer component={Table} size='small'>
      <TableBody>
        {rowData &&
          Object.keys(rowData).map((key) => {
            const { field, value } = rowData[key];
            return (
              <TableRow key={key}>
                {field && <TableCell>{field}</TableCell>}
                {value && <TableCell sx={{ fontWeight: 'bold' }}>{value}</TableCell>}
              </TableRow>
            );
          })}
      </TableBody>
    </TableContainer>
  );
};
