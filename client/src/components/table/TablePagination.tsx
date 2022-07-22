import React from 'react';
import Pagination from 'react-bootstrap/Pagination';

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

  return (
    <>
      <Pagination className="justify-content-md-center">
      <Pagination.First onClick={ () => gotoPage(0) } disabled={ !canPreviousPage } />
        <Pagination.Prev onClick={ () => previousPage() } disabled={ !canPreviousPage } />

        {/* { prevEllipsis.map(prev => (
            <Pagination.Ellipsis
              key={ prev }
              onClick={ () => gotoPage(prev) }
            />
        )) } */}

        { pages.map(curPage => {
          return (
          <Pagination.Item
            key={ curPage }
            active={ curPage === pageIndex }
            onClick={ () => gotoPage(curPage) }
          >
            { curPage + 1 }
          </Pagination.Item>
        )}) }

        {/* { nextEllipsis.map(next => (
            <Pagination.Ellipsis
              key={ next }
              onClick={ () => gotoPage(next) }
            />
        )) } */}

        <Pagination.Next onClick={ () => nextPage() } disabled={ !canNextPage } />
        <Pagination.Last onClick={ () => gotoPage(pageCount - 1) } disabled={ !canNextPage } />
      </Pagination>
    </>
  )
}

export default TablePagination;