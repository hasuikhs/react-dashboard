import { filter } from 'lodash';
import { useState } from 'react';
// material
import {
  Card,
  Table,
  Stack,
  Avatar,
  Button,
  Checkbox,
  TableRow,
  TableBody,
  TableCell,
  Container,
  Typography,
  TableContainer,
  TablePagination,
} from '@mui/material';
// components
import Page from '../../components/Page';
import Scrollbar from '../../components/Scrollbar';
import Iconify from '../../components/Iconify';
import SearchNotFound from '../../components/SearchNotFound';
import { TableHeader, TableToolbar, TableControlMenu } from '../../components/mui-table';

import { descendingComparator, getComparator, applySortFilter } from '../../common/TableFunc';
import ServerModal from '../../components/modal/ServerModal';

// --------------------------------------------------------------------------------

const TABLE_HEAD: any[] = [
  { id: 'seq', label: '#' },
  { id: 'serverNm', label: '서버명' },
  { id: 'serverId', label: '서버 ID' },
  { id: 'cpuCnt', label: 'CPU' },
  { id: 'ram', label: 'RAM'  },
  { id: 'disk1', label: 'DISK 1' },
  { id: 'disk2', label: 'DISK 2' },
  { id: 'isActive', label: '상태' },
  { id: 'groupNm', label: '그룹' },
  { id: 'regDt', label: '등록 시간' },
  { id: 'updDt', label: '수정 시간' }
];

// --------------------------------------------------------------------------------

function Server() {

  const [tableData, setTableData] = useState<any[]>([]);
  
  const [page, setPage] = useState<number>(0);

  const [order, setOrder] = useState<'asc'|'desc'>('asc');

  const [selected, setSelected] = useState<any[]>([]);

  const [orderBy, setOrderBy] = useState<string>('name');

  const [filterName, setFilterName] = useState<string>('');

  const [rowsPerPage, setRowsPerPage] = useState(5);

  const [showModal, setShowModal] = useState(false);
  const [modalData, setModalData] = useState({});

  const handleRequestSort = (event: any, property: any) => {
    const isAsc = orderBy === property && order === 'asc';
    setOrder(isAsc ? 'desc' : 'asc');
    setOrderBy(property);
  };

  const handleSelectAllClick = (event: any) => {
    if (event.target.checked) {
      const newSelecteds = tableData.map((n: any) => n.seq);
      setSelected(newSelecteds);
      return;
    }
    setSelected([]);
  };

  const handleClick = (even: any, name: any) => {
    const selectedIndex = selected.indexOf(name);
    let newSelected: any[] = [];
    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, name);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(selected.slice(0, selectedIndex), selected.slice(selectedIndex + 1));
    }
    setSelected(newSelected);
  };

  const handleChangePage = (event: any, newPage: number) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event: any) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const handleFilterByName = (event: any) => {
    setFilterName(event.target.value);
  };

  const emptyRows = page > 0 ? Math.max(0, (1 + page) * rowsPerPage - tableData.length) : 0;

  const filteredUsers = applySortFilter(tableData, getComparator(order, orderBy), filterName);

  const isUserNotFound = filteredUsers.length === 0;

  return (
    <Page title="Server">
      <Container sx={{ p: 0 }} >
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={5}>
          <Typography variant="h4" gutterBottom>
            Server
          </Typography>
          <Button
            variant="contained"
            startIcon={ <Iconify icon="eva:plus-fill" /> }
            onClick={ () => setShowModal(true) }
          >
            New Server
          </Button>
        </Stack>

        <Card>
          <TableToolbar numSelected={ selected.length } filterName={ filterName } onFilterName={ handleFilterByName } />
        
          <Scrollbar>
            <TableContainer sx={{ minWidth: 800 }} >
              <Table>
                <TableHeader
                  order={ order }
                  orderBy={ orderBy }
                  headLabel={ TABLE_HEAD }
                  rowCount={ tableData.length }
                  numSelected={ selected.length }
                  onRequestSort={ handleRequestSort }
                />
              </Table>
            </TableContainer>
          </Scrollbar>
        </Card>
      </Container>

      <ServerModal
        showModal={ showModal }
        setShowModal={ setShowModal }
        modalData={ modalData }
        setModalData={ setModalData }
        updateList={ undefined }
        groupOptions={ undefined }
      />
    </Page>
  );
}

// --------------------------------------------------------------------------------

export default Server;