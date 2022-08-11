import { Box, TableRow, TableCell, TableHead, TableSortLabel } from '@mui/material';

// --------------------------------------------------------------------------------

const visuallyHidden = {
  border: 0,
  margin: -1,
  padding: 0,
  width: '1px',
  height: '1px',
  overflow: 'hidden',
  position: 'absolute',
  whiteSpace: 'nowrap',
  clip: 'rect(0 0 0 0)',
};

interface GridHeadInterface {
  order: 'asc' | 'desc';
  orderBy: string;
  rowCount: number;
  headLabel: string[];
  numSelected: number;
  onRequestSort: Function;
}

// --------------------------------------------------------------------------------

function TableHeader({
  order,
  orderBy,
  headLabel,
  onRequestSort,
}: GridHeadInterface) {
  const createSortHandler = (property: any) => (event: any) => {
    onRequestSort(event, property);
  };

  return (
    <TableHead>
      <TableRow>
        { headLabel.map((headCell: any) => (
          <TableCell
            key={ headCell.id }
            align={ headCell?.align || 'center' }
            sortDirection={ orderBy === headCell.id ? order : false }
          >
            <TableSortLabel
              active={ orderBy === headCell.id }
              direction={ orderBy === headCell.id ? order : 'asc' }
              onClick={ createSortHandler(headCell.id) }
            >
              { headCell.label }
              { orderBy === headCell.id ? (
                <Box sx={{ ...visuallyHidden }} >
                  { order === 'desc' ? 'sorted descending' : 'sorted ascending' }
                </Box>
              ) : null }
            </TableSortLabel>
          </TableCell>
        )) }
      </TableRow>
    </TableHead>
  );
}

// --------------------------------------------------------------------------------

export default TableHeader;