import { useTable, usePagination, useGlobalFilter, useAsyncDebounce, useSortBy } from 'react-table';

import './ReactTable.css';
import 'bootstrap/dist/css/bootstrap.min.css';

import Table from 'react-bootstrap/Table';
import TablePagination from './TablePagination';
import TableSearch from './TableSearch';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSortDown, faSortUp } from '@fortawesome/free-solid-svg-icons';

// https://react-table-v7.tanstack.com/docs/examples/basic
function ReactTable({ columns, data }: { columns: any, data: any}): JSX.Element {
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    state,
    page,
    canPreviousPage,
    canNextPage,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    state: { pageIndex },
    preGlobalFilteredRows,
    setGlobalFilter
  } = useTable(
    {
      columns,
      data,
      initialState: { pageSize: 15 }
    },
    useGlobalFilter,
    useSortBy,
    usePagination
  );

  // Render the UI for your table
  return (
    <>
      <TableSearch
        preGlobalFilteredRows={ preGlobalFilteredRows }
        globalFilter={ state.globalFilter }
        setGlobalFilter={ setGlobalFilter }
        useAsyncDebounce={ useAsyncDebounce }
      />

      <Table striped bordered hover size="sm" { ...getTableProps() }>
        <thead>
          { headerGroups.map(headerGroup => (
            <tr { ...headerGroup.getHeaderGroupProps() }>
              { headerGroup.headers.map(column => (
                <th className="tc" { ...column.getHeaderProps(column.getSortByToggleProps()) }>
                  { column.render('Header') }
                  <span>
                    { ' ' }
                    { column.isSorted
                        ? column.isSortedDesc
                          ? <FontAwesomeIcon icon={ faSortDown } />
                          : <FontAwesomeIcon icon={ faSortUp } />
                        : '' }
                  </span>
                </th>
              )) }
            </tr>
          )) }
        </thead>
        <tbody { ...getTableBodyProps() }>
          { page.length > 0
              ? page.map((row, i) => {
                  prepareRow(row);

                  return (
                    <tr { ...row.getRowProps() }>
                      { row.cells.map(cell => {
                        return <td { ...cell.getCellProps() }>{ cell.render('Cell') }</td>
                      }) }
                    </tr>
                  )
                })
              : <tr><td className="tc" colSpan={ headerGroups[0].headers.length }>데이터가 없습니다.</td></tr>}
        </tbody>
      </Table>

      <TablePagination
        pageIndex={ pageIndex }
        pageCount={ pageCount }
        gotoPage={ gotoPage }
        previousPage={ previousPage }
        canPreviousPage={ canPreviousPage }
        nextPage={ nextPage }
        canNextPage={ canNextPage }
      />
    </>
    
  );
}

export default ReactTable;