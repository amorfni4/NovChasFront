import React, { useContext, useEffect } from 'react';
import "../styleSheets/layout.css";
import { Context } from '..';
import ReactPaginate from 'react-paginate'  
import { observer } from 'mobx-react-lite';

const Pages = observer(() => {
    const {product} = useContext(Context)
    const pageCount = Math.ceil(product.totalCount / product.limit)

    const handlePageClick = (event) => {
        product.setPage(event.selected + 1)
    };

    return (
        <ReactPaginate  
            forcePage={product.page - 1}
            onPageChange={handlePageClick}
            DisplayedPageRange={5}  
            pageCount={pageCount}  
            renderOnZeroPageCount={null}  
            previousLabel="<"
            pageClassName="page-item"
            pageLinkClassName="page-link"
            previousClassName="page-item"
            previousLinkClassName="page-link"
            nextClassName="page-item"
            nextLinkClassName="page-link"
            breakLabel="..."
            breakClassName="page-item"
            breakLinkClassName="page-link"
            containerClassName="pagination"
            activeClassName="active"
            nextLabel=">"  
        />  
    )
});

export default Pages;