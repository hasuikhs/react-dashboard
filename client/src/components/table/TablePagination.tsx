import React from 'react';
// import Pagination from 'react-bootstrap/Pagination';
import { styled } from '@mui/material/styles';
import { Stack, Pagination, PaginationItem, Select, MenuItem } from '@mui/material'

// --------------------------------------------------------------------------------

interface PaginationInerface {
  pageIndex: number;
  pageCount: number;
  gotoPage: Function;
  canPreviousPage: boolean;
  canNextPage: boolean;
  previousPage: Function;
  nextPage: Function;
  pageSize: number;
  setPageSize: Function;
}

// --------------------------------------------------------------------------------

const StyledSelect = styled(Select)(({ theme }: any) => ({
  width: 120,
  height: 30,
  fontSize: '14px',
  borderColor: 'transparent',
  '& legend': { display: 'none' },
  '& fieldset': { border: 'none' }
}));

// --------------------------------------------------------------------------------

function TablePagination({ pageIndex, pageCount, gotoPage, previousPage, canPreviousPage, nextPage, canNextPage, pageSize, setPageSize }: PaginationInerface) {

  const pages: number[] = [];
  // const prevEllipsis: number[] = [];
  // const nextEllipsis: number[] = [];

  let leftSide: number = pageIndex - 10;
  if (leftSide <= 0) leftSide = 0;

  let rightSide: number = pageIndex + 10;
  if (rightSide >= pageCount) rightSide = pageCount;

  for (let num: number = leftSide; num < rightSide; num++) {
    if (num <= pageCount) {
      pages.push(num);

      if (pageCount === 1) break;
    }
  }

  // if (leftSide !== 0) {
  //   prevEllipsis.push(leftSide - 1);
  // }

  // if (rightSide !== pageCount) {
  //   nextEllipsis.push(rightSide + 1);
  // }

  // mui
  const onPageChange = (e: React.ChangeEvent<unknown>, page: number) => {
    gotoPage(page - 1);
  };

  console.log(pageCount)

  return (
    <Stack direction="row" spacing={ 1 } sx={{ p: 1, float: 'right', margin: '5px' }} >

      <StyledSelect
        defaultValue={ pageSize }
        onChange={ (e: any) => setPageSize(e?.target.value || pageSize) }
      >
        <MenuItem value={ pageSize }>{ pageSize }개 보기</MenuItem>
        <MenuItem value={ pageSize * 2 }>{ pageSize * 2 }개 보기</MenuItem>
        <MenuItem value={ pageSize * 4 }>{ pageSize * 4 }개 보기</MenuItem>
        <MenuItem value={ pageSize * 10 }>{ pageSize * 10 }개 보기</MenuItem>
      </StyledSelect>

      <Pagination
        // disabled={ pageCount === 1 ? true : false }
        showFirstButton
        showLastButton
        count={ pageCount }
        page={ pageIndex + 1 }
        onChange={ onPageChange }
        size="medium"
        // renderItem={ (item) => (
        //   <PaginationItem { ...item } sx={{ fontSize: 14 }} />
        // ) }
        />

    </Stack>
  );

  // bootstrap
  // return (
  //   <>
  //     <Pagination className="justify-content-md-center fr">
  //     <Pagination.First onClick={ () => gotoPage(0) } disabled={ !canPreviousPage } />
  //       <Pagination.Prev onClick={ () => previousPage() } disabled={ !canPreviousPage } />

  //       {/* { prevEllipsis.map(prev => (
  //           <Pagination.Ellipsis
  //             key={ prev }
  //             onClick={ () => gotoPage(prev) }
  //           />
  //       )) } */}

  //       { pages.map(curPage => {
  //         return (
  //         <Pagination.Item
  //           key={ curPage }
  //           active={ curPage === pageIndex }
  //           onClick={ () => gotoPage(curPage) }
  //         >
  //           { curPage + 1 }
  //         </Pagination.Item>
  //       )}) }

  //       {/* { nextEllipsis.map(next => (
  //           <Pagination.Ellipsis
  //             key={ next }
  //             onClick={ () => gotoPage(next) }
  //           />
  //       )) } */}

  //       <Pagination.Next onClick={ () => nextPage() } disabled={ !canNextPage } />
  //       <Pagination.Last onClick={ () => gotoPage(pageCount - 1) } disabled={ !canNextPage } />
  //     </Pagination>
  //   </>
  // );
}

export default TablePagination;