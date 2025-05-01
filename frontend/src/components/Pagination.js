import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';

const Pagination = ({ currentPage, totalPages, onPageChange }) => {
  // Generate pagination numbers
  const getPageNumbers = () => {
    const numbers = [];
    
    // If 7 or fewer pages, show all
    if (totalPages <= 7) {
      for (let i = 1; i <= totalPages; i++) {
        numbers.push(i);
      }
      return numbers;
    }
    
    // If current page is among the first 3 pages
    if (currentPage <= 3) {
      return [1, 2, 3, 4, 5, '...', totalPages];
    }
    
    // If current page is among the last 3 pages
    if (currentPage >= totalPages - 2) {
      return [1, '...', totalPages - 4, totalPages - 3, totalPages - 2, totalPages - 1, totalPages];
    }
    
    // If current page is somewhere in the middle
    return [
      1,
      '...',
      currentPage - 1,
      currentPage,
      currentPage + 1,
      '...',
      totalPages
    ];
  };

  // Handle navigation to previous page
  const goToPrevPage = () => {
    if (currentPage > 1) {
      onPageChange(currentPage - 1);
    }
  };
  
  // Handle navigation to next page
  const goToNextPage = () => {
    if (currentPage < totalPages) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    <div className="flex justify-center">
      <nav className="inline-flex rounded-md shadow">
        {/* Previous Button */}
        <button
          onClick={goToPrevPage}
          disabled={currentPage === 1}
          className={`
            px-3 py-2 rounded-l-md border border-gray-300 
            ${currentPage === 1 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-white text-gray-700 hover:bg-gray-50'}
            flex items-center
          `}
        >
          <FaChevronLeft className="h-4 w-4" />
          <span className="ml-1">Prev</span>
        </button>
        
        {/* Page Numbers */}
        {getPageNumbers().map((number, index) => (
          <button
            key={index}
            onClick={() => number !== '...' && onPageChange(number)}
            disabled={number === '...'}
            className={`
              px-4 py-2 border-t border-b border-r border-gray-300
              ${number === currentPage 
                ? 'bg-blue-600 text-white' 
                : number === '...' 
                  ? 'bg-gray-100 text-gray-400 cursor-default' 
                  : 'bg-white text-gray-700 hover:bg-gray-50'}
            `}
          >
            {number}
          </button>
        ))}
        
        {/* Next Button */}
        <button
          onClick={goToNextPage}
          disabled={currentPage === totalPages}
          className={`
            px-3 py-2 rounded-r-md border-t border-r border-b border-gray-300
            ${currentPage === totalPages 
              ? 'bg-gray-100 text-gray-400 cursor-not-allowed' 
              : 'bg-white text-gray-700 hover:bg-gray-50'}
            flex items-center
          `}
        >
          <span className="mr-1">Next</span>
          <FaChevronRight className="h-4 w-4" />
        </button>
      </nav>
    </div>
  );
};

export default Pagination;