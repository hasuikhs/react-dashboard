import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow } from '@mui/material';

function PopoverTable({ data }: { data: any }) {
  return (
    <TableContainer>
      <Table size="small">
        <TableHead>
          <TableRow>
            <TableCell align="center">그룹명</TableCell>
            <TableCell align="center">서버명</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {
            (data?.length || 0) > 0
              ? (
                  data.map((row: any, idx: number) => {
                    return (
                      <TableRow key={ idx }>
                        <TableCell sx={{ backgroundColor: idx % 2 ? '#FFF' : '#F8F8F8' }} >{ row.info.groupNm }</TableCell>
                        <TableCell sx={{ backgroundColor: idx % 2 ? '#FFF' : '#F8F8F8' }} >{ row.info.serverNm }</TableCell>
                      </TableRow>
                    );
                  })
                )
              : (
                <TableRow>
                  <TableCell colSpan={ 2 }>
                    데이터가 없습니다.
                  </TableCell>
                </TableRow>
                )
          }
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default PopoverTable;