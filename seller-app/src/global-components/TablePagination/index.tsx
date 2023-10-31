'use client'
import React, { useRef, useState } from "react";
import {ReactComponent as Arrow}from '../../assets/icons/Arrow.svg'
import useOnClickOutSide from "../../utilities/onClickOutSide";

interface TablePaginationProps {
  noPadding?: boolean
  data?: any
  limit: number
  setLimit: (item: number) => void
  currentPage: number
  setCurrentPage: (item: number) => void
}

function TablePagination({ noPadding = false, data, limit = 10, currentPage = 1, setCurrentPage, setLimit }: TablePaginationProps) {

  const [openSelect, setOpenSelect] = useState<boolean>(false);

  let selectRef: any = useRef();
  useOnClickOutSide(selectRef, () => setOpenSelect(false))

  const handlePageChange = (page: number) => {
    if (page > 0 && page <= (data ? Math.ceil(data?.total / limit) : 0)) {
      setCurrentPage(page);
    }
  };

  const paginationItems = generatePaginationItems(currentPage, (data ? Math.ceil(data?.total / limit) : 0), handlePageChange);

  return <div className={`flex items-center justify-between w-full ${!noPadding ? 'otherWidth:px-6' : ''}`}>
    <div className="pagination flex items-center space-x-2.5">
      <div className={`pagination-preview flex items-center ${data?.previous_page_url ? 'cursor-pointer' : 'cursor-not-allowed'}`}
        onClick={() => handlePageChange(currentPage - 1)}>
        <Arrow className="h-3 w-auto mr-2 transform -rotate-180"
        /> Previous
      </div>

      <div className="flex items-center space-x-2">
        {paginationItems}
      </div>

      <div className={`pagination-next flex items-center ${data?.next_page_url ? 'cursor-pointer' : 'cursor-not-allowed'}`}
        onClick={() => handlePageChange(currentPage + 1)}
      >
        Next <Arrow className="h-3 w-auto ml-2" />
      </div>
    </div>

    <div className="hidden bigTablet:block pagination">
      <div className="pagination-next mb-1" onClick={(e) => {
        e.stopPropagation()
        setOpenSelect(!openSelect)
      }}>
        {limit} / Pages
        <Arrow className="ml-2 h-3 w-auto transform rotate-90" />
      </div>
      {openSelect && <div className="pagination-select text-center" ref={selectRef}>
        {
          [10, 20, 50].filter((item) => item !== limit).map((item: number) => (
            <div className="px-3 py-2 cursor-pointer"
              key={item}
              onClick={(e: any) => {
                e.stopPropagation()
                if (data?.total) {
                  if (item > data?.total) {
                    setCurrentPage(1);
                  }
                  setLimit(item)
                }
                setOpenSelect(false)
              }}
            >
              {item} / Pages
            </div>
          ))
        }
      </div>}
    </div>
  </div>;
}

const renderItem = (i: number, page: number, handlePageChange: Function) => {
  return <div
    key={i}
    className={`pagination-item ${page === i ? 'pagination-item-selected' : ''}`}
    onClick={() => handlePageChange(i)}
  >
    {i}
  </div>
}

// Function to generate pagination items
const generatePaginationItems = (currentPage: number, totalPages: number, handlePageChange: Function) => {

  const paginationItems = [];
  if (totalPages <= 5) {
    // Display 1 2 3 4 5
    for (let i = 1; i <= totalPages; i++) {
      paginationItems.push(
        renderItem(i, currentPage, handlePageChange)
      );
    }
  } else {
    if ((currentPage - 1) > 3) {
      // CurrentPage > 5 => Display 1 2 ... 5 6+
      paginationItems.push(
        renderItem(1, currentPage, handlePageChange)
      );
      paginationItems.push(
        renderItem(2, currentPage, handlePageChange)
      );
      paginationItems.push(<div key="ellipsis" className="pagination-item">...</div>);
      paginationItems.push(
        renderItem(currentPage - 1, currentPage, handlePageChange)
      );
      paginationItems.push(
        renderItem(currentPage, currentPage, handlePageChange)
      );
    } else {
      // Current <= 4 Display 1 2 3 4 5 ... 
      for (let i = 1; i <= currentPage; i++) {
        paginationItems.push(
          renderItem(i, currentPage, handlePageChange)
        );
      }
    }
    if ((currentPage + 1) < totalPages - 2) {
      // CurrentPage = 5 =>  6 ... 9 10
      paginationItems.push(
        renderItem(currentPage + 1, currentPage, handlePageChange)
      );
      paginationItems.push(<div key="ellipsis" className="pagination-item">...</div>);
      paginationItems.push(
        renderItem(totalPages - 1, currentPage, handlePageChange)
      );
      paginationItems.push(
        renderItem(totalPages, currentPage, handlePageChange)
      );
    } else {
      // CurrentPage = 5 =>  6 7 8 9 10
      for (let i = currentPage + 1; i <= totalPages; i++) {
        paginationItems.push(
          renderItem(i, currentPage, handlePageChange)
        );
      }
    }
  }
  return paginationItems;
}


export default TablePagination;
