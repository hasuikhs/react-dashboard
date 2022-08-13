// material
import { styled } from '@mui/material/styles';
import { Toolbar, OutlinedInput, InputAdornment } from '@mui/material';
// component
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMagnifyingGlass } from '@fortawesome/free-solid-svg-icons';

// --------------------------------------------------------------------------------

const RootStyle = styled(Toolbar)(({ theme }) => ({
  height: 96,
  display: 'flex',
  justifyContent: 'space-between',
  padding: theme.spacing(0, 1, 0, 3),
}));

const SearchStyle = styled(OutlinedInput)(({ theme }: any) => ({
  width: 240,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': { width: 320, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
  '& legend': { display: 'none' }
}));

// --------------------------------------------------------------------------------

interface GridToolbarInterface {
  numSelected: number;
  filterName: string;
  onFilterName: React.ChangeEventHandler<HTMLInputElement | HTMLTextAreaElement> | undefined;
}

// --------------------------------------------------------------------------------

function TableToolbar({ numSelected, filterName, onFilterName }: GridToolbarInterface) {
  return (
    <RootStyle>
      <SearchStyle
        value={ filterName }
        onChange={ onFilterName }
        placeholder="Search"
        startAdornment={
          <InputAdornment position="start" >
            <FontAwesomeIcon icon={ faMagnifyingGlass } />
          </InputAdornment>
        }
      />
    </RootStyle>
  );
}

// --------------------------------------------------------------------------------

export default TableToolbar;