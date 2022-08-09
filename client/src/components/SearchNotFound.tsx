import { Paper, Typography } from '@mui/material';

// --------------------------------------------------------------------------------

interface SearchNotFoundInterface {
  searchQuery: string;
}

// --------------------------------------------------------------------------------

function SearchNotFound({ searchQuery = '', ...other }: SearchNotFoundInterface) {
  return (
    <Paper {...other} >
      <Typography gutterBottom align="center" variant="subtitle1" >
        Not found
      </Typography>
      <Typography variant="body2" align="center" >
        No results found for &nbsp;
        <strong>&quot;{ searchQuery }&quot;</strong>. Try checking for typos or using complete words.
      </Typography>
    </Paper>
  );
}

// --------------------------------------------------------------------------------

export default SearchNotFound;