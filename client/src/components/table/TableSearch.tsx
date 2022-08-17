import { useState } from 'react';
// material
import { styled } from '@mui/material/styles';
import { Toolbar, OutlinedInput, InputAdornment } from '@mui/material';
// fontawesome
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
  height: '50px',
  width: 220,
  transition: theme.transitions.create(['box-shadow', 'width'], {
    easing: theme.transitions.easing.easeInOut,
    duration: theme.transitions.duration.shorter,
  }),
  '&.Mui-focused': { width: 250, boxShadow: theme.customShadows.z8 },
  '& fieldset': {
    borderWidth: `1px !important`,
    borderColor: `${theme.palette.grey[500_32]} !important`,
  },
  '& legend': { display: 'none' }
}));

// --------------------------------------------------------------------------------

interface SearchInterface {
  globalFilter: any;
  setGlobalFilter: any;
  useAsyncDebounce: any;
}

// --------------------------------------------------------------------------------

function TableSearch({ globalFilter, setGlobalFilter, useAsyncDebounce }: SearchInterface) {

  const [searchText, setSerchText] = useState<string>(globalFilter);
  const onChange = useAsyncDebounce((value: any) => {
    setGlobalFilter(value || undefined);
  }, 200);

  return (
  <RootStyle>
    <SearchStyle
      placeholder="Search"
      value={ searchText || '' }
      onChange={ e => {
        setSerchText(e.target.value);
        onChange(e.target.value);
      } }
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

export default TableSearch;