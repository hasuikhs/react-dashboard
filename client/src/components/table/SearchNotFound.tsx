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
        {
          searchQuery === ''
            ? '데이터가 없습니다.'
            : '검색된 데이터가 없습니다.'
        }
      </Typography>
      <Typography variant="body2" align="center" >
        {
          searchQuery === ''
            ? '데이터를 추가하거나 문의바랍니다.'
            : '검색어를 확인해주세요.'
        }
      </Typography>
    </Paper>
  );
}

// --------------------------------------------------------------------------------

export default SearchNotFound;