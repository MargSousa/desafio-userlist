import React from 'react';
import { Pagination } from 'react-bootstrap';
import './PaginationBar.css';

const PaginationBar = (props) => {

  const { pages, current, changePage } = props;

  const handleChangePage = (event) => {
    changePage(event.target.id)
  }

  return (
    <div className="Pagination-main">
      <Pagination size="sm">
        { pages.map((page) =>
          <Pagination.Item className="pagination-item" key={page} id={page} active={page === Number(current) ? true : false} onClick={handleChangePage}>
            {page}
          </Pagination.Item>
        )}
      </Pagination>
    </div>
  );
}
 
export default PaginationBar;