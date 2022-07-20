import { useTable, usePagination } from 'react-table';

import 'bootstrap/dist/css/bootstrap.min.css';

import BTable from 'react-bootstrap/Table';
import TablePagination from './TablePagination';


// https://react-table-v7.tanstack.com/docs/examples/basic
function Table({ columns, data }: { columns: any, data: any}): JSX.Element {
  
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    prepareRow,
    page,
    canPreviousPage,
    canNextPage,
    pageOptions,
    pageCount,
    gotoPage,
    nextPage,
    previousPage,
    setPageSize,
    state: { pageIndex, pageSize }
  } = useTable({
    columns,
    data
  }, usePagination);

  // Render the UI for your table
  return (
    <>
      <BTable striped bordered hover size="sm" { ...getTableProps() }>
        <thead>
          { headerGroups.map(headerGroup => (
            <tr { ...headerGroup.getHeaderGroupProps() }>
              { headerGroup.headers.map(column => (
                <th { ...column.getHeaderProps() }>{ column.render('Header') }</th>
              )) }
            </tr>
          )) }
        </thead>
        <tbody { ...getTableBodyProps() }>
          { page.map((row, i) => {
            prepareRow(row);

            return (
              <tr { ...row.getRowProps() }>
                { row.cells.map(cell => {
                  return <td { ...cell.getCellProps() }>{ cell.render('Cell') }</td>
                }) }
              </tr>
            )
          }) }
        </tbody>
      </BTable>
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

export default Table;