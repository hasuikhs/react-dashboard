import { styled } from '@mui/material/styles'

import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableRow from '@mui/material/TableRow';

// --------------------------------------------------------------------------------

const CustomTableCell = styled(TableCell)(({ theme }) => ({
  textAlign: 'right',
  paddingRight: '20px',
  borderLeft: '3px solid #f1f3f4'
}));

const CellHaed = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bolder',
  textAlign: 'center',
  borderLeft: '1px solid #f1f3f4'
}));

// --------------------------------------------------------------------------------

function CardTable({ serverInfo, monitoringData, overData }: { serverInfo: any, monitoringData: any, overData: any}) {

  const presentData = monitoringData.slice(-1)?.[0];

  return (
    <TableContainer>
      <Table>
        <TableBody>
        
          <TableRow>
            <CellHaed rowSpan={ 3 }>LoadAvg <br></br>({ serverInfo.cpuCnt } Core)</CellHaed>
            <CellHaed>mi01</CellHaed>
            <CustomTableCell>{ (presentData?.mi01 || 0).toFixed(2) }</CustomTableCell>
          </TableRow>
          <TableRow>
            <CellHaed>mi05</CellHaed>
            <CustomTableCell>{ (presentData?.mi05 || 0).toFixed(2) }</CustomTableCell>
          </TableRow>
          <TableRow>
            <CellHaed>mi15</CellHaed>
            <CustomTableCell>{ (presentData?.mi15 || 0).toFixed(2) }</CustomTableCell>
          </TableRow>

          <TableRow>
            <CellHaed colSpan={ 2 }>Swap</CellHaed>
            <CustomTableCell>{ (presentData?.swap || 0).toFixed(2) } %</CustomTableCell>
          </TableRow>

          <TableRow>
            <CellHaed colSpan={ 2 }>Memory ({ serverInfo.ram }GB)</CellHaed>
            <CustomTableCell>{ (presentData?.mem || 0).toFixed(2) } %</CustomTableCell>
          </TableRow>

          <TableRow>
            <CellHaed rowSpan={ 4 }>Disk <br></br> disk1: ({ serverInfo.disk1 }GB) <br></br> disk2: ({ serverInfo.disk2 }GB)</CellHaed>
            <CellHaed>total</CellHaed>
            <CustomTableCell>{ (presentData?.totalDisk || 0).toFixed(2) } %</CustomTableCell>
          </TableRow>
          <TableRow>
            <CellHaed>xvda1</CellHaed>
            <CustomTableCell>{ (presentData?.disk1 || 0).toFixed(2) } %</CustomTableCell>
          </TableRow>
          <TableRow>
            <CellHaed>xvdb1</CellHaed>
            <CustomTableCell>{ (presentData?.disk2 || 0).toFixed(2) } %</CustomTableCell>
          </TableRow>
          <TableRow>
            <CellHaed>xvdc1</CellHaed>
            <CustomTableCell>{ (presentData?.disk3 || 0).toFixed(2) } %</CustomTableCell>
          </TableRow>

        </TableBody>


      </Table>
    </TableContainer>
  );
}

// --------------------------------------------------------------------------------

export default CardTable;