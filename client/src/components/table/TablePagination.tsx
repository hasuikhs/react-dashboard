import React from 'react';
// import Pagination from 'react-bootstrap/Pagination';
import { Stack, Pagination, PaginationItem } from '@mui/material'

interface PaginationInerface {
  pageIndex: number;
  pageCount: number;
  gotoPage: Function;
  canPreviousPage: boolean;
  canNextPage: boolean;
  previousPage: Function;
  nextPage: Function;
}

function TablePagination({ pageIndex, pageCount, gotoPage, previousPage, canPreviousPage, nextPage, canNextPage }: PaginationInerface) {

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
    gotoPage(page);
  };

  return (
    <Stack spacing={ 2 } sx={{ p: 1 }} >
      <Pagination
        disabled={ pageCount === 1 ? true : false }
        showFirstButton
        showLastButton
        count={ pageCount -1 }
        page={ pageIndex }
        onChange={ onPageChange }
        size="medium"
        sx={{
          display: "flex",
          justifyContent: "end"
        }}
        renderItem={ (item) => (
          <PaginationItem { ...item } sx={{ fontSize: 14 }} />
        ) }
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