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
  borderLeft: '3px solid #F1F3F4'
}));

const CellHaed = styled(TableCell)(({ theme }) => ({
  fontWeight: 'bolder',
  textAlign: 'center',
  borderLeft: '1px solid #F1F3F4'
}));

// --------------------------------------------------------------------------------

function CardTable({ serverInfo, monitoringData, overData }: { serverInfo: any, monitoringData: any, overData: any}) {

  const presentData = monitoringData.slice(-1)?.[0];
  const percentLimit: number = 90;
  const diskUsageLimit: number = 80;

  return (
    <TableContainer>
      <Table>
        <TableBody>
        
          <TableRow>
            <CellHaed rowSpan={ 3 }>LoadAvg <br></br>({ serverInfo.cpuCnt } Core)</CellHaed>
            <CellHaed>mi01</CellHaed>
            <CustomTableCell
              sx={{ color: (presentData?.mi01 || 0) > serverInfo.cpuCnt ? 'red' : 'black' }}
            >
              { (presentData?.mi01 || 0).toFixed(2) }
            </CustomTableCell>
          </TableRow>
          <TableRow>
            <CellHaed>mi05</CellHaed>
            <CustomTableCell
              sx={{ color: (presentData?.mi05 || 0) > serverInfo.cpuCnt ? 'red' : 'black' }}
            >
              { (presentData?.mi05 || 0).toFixed(2) }
            </CustomTableCell>
          </TableRow>
          <TableRow>
            <CellHaed>mi15</CellHaed>
            <CustomTableCell
              sx={{ color: (presentData?.mi15 || 0) > serverInfo.cpuCnt ? 'red' : 'black' }}
            >
              { (presentData?.mi15 || 0).toFixed(2) }
            </CustomTableCell>
          </TableRow>

          <TableRow>
            <CellHaed colSpan={ 2 }>Memory ({ serverInfo.ram }GB)</CellHaed>
            <CustomTableCell
              sx={{ color: (presentData?.mem || 0) > percentLimit ? 'red' : 'black' }}
            >
              { (presentData?.mem || 0).toFixed(2) } %
            </CustomTableCell>
          </TableRow>
          <TableRow>
            <CellHaed colSpan={ 2 }>Swap</CellHaed>
            <CustomTableCell
              sx={{ color: (presentData?.swap || 0) > percentLimit ? 'red' : 'black' }}
            >
              { (presentData?.swap || 0).toFixed(2) } %
            </CustomTableCell>
          </TableRow>


          <TableRow>
            <CellHaed rowSpan={ 4 }>Disk <br></br> disk1: ({ serverInfo.disk1 }GB) <br></br> disk2: ({ serverInfo.disk2 }GB)</CellHaed>
            <CellHaed>total</CellHaed>
            <CustomTableCell
              sx={{ color: (presentData?.totalDisk || 0) > diskUsageLimit ? 'red' : 'black' }}
            >
              { (presentData?.totalDisk || 0).toFixed(2) } %
            </CustomTableCell>
          </TableRow>
          <TableRow>
            <CellHaed>xvda1</CellHaed>
            <CustomTableCell
              sx={{ color: (presentData?.disk1 || 0) > diskUsageLimit ? 'red' : 'black' }}
            >
              { (presentData?.disk1 || 0).toFixed(2) } %
            </CustomTableCell>
          </TableRow>
          <TableRow>
            <CellHaed>xvdb1</CellHaed>
            <CustomTableCell
              sx={{ color: (presentData?.disk2 || 0) > diskUsageLimit ? 'red' : 'black' }}
            >
              { (presentData?.disk2 || 0).toFixed(2) } %
            </CustomTableCell>
          </TableRow>
          <TableRow>
            <CellHaed>xvdc1</CellHaed>
            <CustomTableCell
              sx={{ color: (presentData?.disk3 || 0) > diskUsageLimit ? 'red' : 'black' }}
            >
              { (presentData?.disk3 || 0).toFixed(2) } %
            </CustomTableCell>
          </TableRow>

        </TableBody>


      </Table>
    </TableContainer>
  );
}

// --------------------------------------------------------------------------------

export default CardTable;