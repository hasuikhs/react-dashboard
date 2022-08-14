import { useEffect, useState } from 'react';
import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from 'react-table';
// material
import { styled, alpha } from '@mui/material/styles';
import {
  Typography,
  Table,
  TableRow,
  TableBody,
  TableCell,
  TableContainer,
} from '@mui/material';
// components
import TablePagination from './TablePagination';
import TableSearch from './TableSearch';
import ReactTableHead from './ReactTableHead';
import SearchNotFound from './SearchNotFound';

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:hover': {
    backgroundColor: '#F2F5FB !important'
  },
  '&:nth-of-type(odd)': {
    backgroundColor:  alpha('#F6F6F6', 0.8),
  }
}));

// https://react-table-v7.tanstack.com/docs/examples/basic
function ReactTable({ columns, data }: { columns: any, data: any}): JSX.Element {

  const [curPage, setCurPage] = useState(0);
  const defaultPageSize = 5;

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    page,
    canPreviousPage,
    canNextPage,
    rows,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex },
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: defaultPageSize, pageIndex: curPage }
    },
    useGlobalFilter,
    useSortBy,
    usePagination,
  );

  // 테이블 등록, 수정 됐을시 보던 페이지 유지
  useEffect(() => {
    setCurPage(pageIndex);
  }, [pageIndex]);

  return (
    <>
      <TableSearch
        globalFilter={ state.globalFilter }
        setGlobalFilter={ setGlobalFilter }
        useAsyncDebounce={ useAsyncDebounce }
      />

      <TableContainer>
        <Table { ...getTableProps() } >
          <ReactTableHead headerGroups={ headerGroups } />

          <TableBody { ...getTableBodyProps() }>
            {
              page.length > 0
                ? page.map((row, i) => {
                    prepareRow(row);

                    return (
                      <StyledTableRow { ...row.getRowProps() } >
                        {
                          row.cells.map(cell => (
                            <TableCell { ...cell.getCellProps() }>
                              { cell.render('Cell') }
                            </TableCell>
                          ))
                        }
                      </StyledTableRow>
                    )
                  })
                : (
                  <TableRow>
                    <TableCell
                      align="center"
                      colSpan={ columns.length }
                      sx={{ py: 2 }}
                    >
                      <SearchNotFound searchQuery={ state.globalFilter } />
                    </TableCell>
                  </TableRow>
                )
            }
          </TableBody>
        </Table>
      </TableContainer>
      
      <Typography variant="body2" sx={{ float: 'left', p: 1, paddingLeft: '15px',  lineHeight: '32px', margin: '5px' }}>
        { rows.length ? `Rows: ${ rows.length }` : '' }
      </Typography>


      <TablePagination
        pageIndex={ pageIndex }
        pageCount={ pageCount }
        gotoPage={ gotoPage }
        previousPage={ previousPage }
        canPreviousPage={ canPreviousPage }
        nextPage={ nextPage }
        canNextPage={ canNextPage }
        pageSize={ defaultPageSize }
        setPageSize={ setPageSize }
      />
    </>
  );
}

export default ReactTable;