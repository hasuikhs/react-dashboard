import { TableHead, TableRow, TableCell, TableSortLabel } from '@mui/material';
import { HeaderGroup } from 'react-table' 

function ReactTableHead({ headerGroups }: { headerGroups: HeaderGroup<object>[]}): JSX.Element {
  return (
    <TableHead>
      { headerGroups.map(headerGroup => (
        <TableRow { ...headerGroup.getHeaderGroupProps() } >
          { headerGroup.headers.map(column => (
              <TableCell
                align="center"
                sortDirection={ column.isSortedDesc ? 'desc' : 'asc' }
                { ...column.getHeaderProps(column.getSortByToggleProps()) }
              >
                { column.render('Header') }
                <TableSortLabel
                  hideSortIcon
                  active={ column.isSorted }
                  direction={ column.isSortedDesc ? 'desc' : 'asc' }
                />
              </TableCell>
            )) }
        </TableRow>
      ))}
    </TableHead>
  );
}

export default ReactTableHead;