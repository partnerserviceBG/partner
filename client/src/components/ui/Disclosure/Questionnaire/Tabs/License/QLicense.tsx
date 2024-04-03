import { FC, useEffect, useState } from 'react';
import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';
import { useGetLicenseQuery } from '@services/organisation-info.service.ts';
import { License } from '@models/License.ts';
export const QLicense: FC = () => {
  const { data } = useGetLicenseQuery();
  const [rowData, setRowData] = useState<License>();

  useEffect(() => {
    data && setRowData(data);
  }, [data]);
  return (
    <TableContainer component={Table} size='small'>
      <TableHead>
        {rowData && (
          <TableRow>
            {Object.keys(rowData).map((key) => {
              if (rowData[key]?.field) {
                const { field } = rowData[key];
                return <TableCell key={key}>{field}</TableCell>;
              }
            })}
          </TableRow>
        )}
      </TableHead>
      <TableBody>
        {rowData && (
          <TableRow>
            {Object.keys(rowData).map((key) => {
              if (rowData[key]?.value) {
                const { value } = rowData[key];
                return <TableCell key={key}>{value}</TableCell>;
              }
            })}
          </TableRow>
        )}
      </TableBody>
    </TableContainer>
  );
};
