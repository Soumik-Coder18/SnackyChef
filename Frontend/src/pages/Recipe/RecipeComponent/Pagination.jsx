import React, { useEffect } from 'react';
import { motion } from 'framer-motion';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

function Pagination({ currentPage, totalPages, onPageChange }) {
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [currentPage]);

  if (totalPages <= 1) return null;

  const renderPageNumbers = () => {
    const pageNumbers = [];
    const maxVisiblePages = 5; // Reduced for better mobile experience
    const halfVisible = Math.floor(maxVisiblePages / 2);
    
    let start = Math.max(currentPage - halfVisible, 1);
    let end = Math.min(start + maxVisiblePages - 1, totalPages);

    // Adjust if we're at the end
    if (end - start + 1 < maxVisiblePages) {
      start = Math.max(end - maxVisiblePages + 1, 1);
    }

    // Always show first page
    if (start > 1) {
      pageNumbers.push(
        <PageButton 
          key={1}
          page={1}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      );
      if (start > 2) {
        pageNumbers.push(<Ellipsis key="start-ellipsis" />);
      }
    }

    // Main page range
    for (let i = start; i <= end; i++) {
      if (i > 0 && i <= totalPages) {
        pageNumbers.push(
          <PageButton 
            key={i}
            page={i}
            currentPage={currentPage}
            onPageChange={onPageChange}
          />
        );
      }
    }

    // Always show last page
    if (end < totalPages) {
      if (end < totalPages - 1) {
        pageNumbers.push(<Ellipsis key="end-ellipsis" />);
      }
      pageNumbers.push(
        <PageButton 
          key={totalPages}
          page={totalPages}
          currentPage={currentPage}
          onPageChange={onPageChange}
        />
      );
    }

    return pageNumbers;
  };

  const goToPage = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages && newPage !== currentPage) {
      onPageChange(newPage);
    }
  };

  return (
    <div className="flex justify-center items-center gap-1 sm:gap-2 mt-8 mb-12">
      <NavButton
        direction="prev"
        onClick={() => goToPage(currentPage - 1)}
        disabled={currentPage === 1}
      />
      
      <div className="flex items-center gap-1 sm:gap-2 mx-1 sm:mx-2">
        {renderPageNumbers()}
      </div>
      
      <NavButton
        direction="next"
        onClick={() => goToPage(currentPage + 1)}
        disabled={currentPage === totalPages}
      />
    </div>
  );
}

// Component for individual page buttons
const PageButton = ({ page, currentPage, onPageChange }) => (
  <motion.button
    whileHover={{ scale: 1.05 }}
    whileTap={{ scale: 0.95 }}
    onClick={() => onPageChange(page)}
    className={`flex items-center justify-center w-10 h-10 rounded-full text-sm font-medium transition-all ${
      page === currentPage
        ? 'bg-gradient-to-r from-[#FF7F50] to-[#E07A5F] text-white shadow-md'
        : 'bg-white text-[#5C2C1E] hover:bg-[#FFF7ED] border border-[#FFD6A5]'
    }`}
  >
    {page}
  </motion.button>
);

// Component for navigation arrows
const NavButton = ({ direction, onClick, disabled }) => (
  <motion.button
    whileHover={!disabled ? { scale: 1.1 } : {}}
    whileTap={!disabled ? { scale: 0.9 } : {}}
    onClick={onClick}
    disabled={disabled}
    className={`flex items-center justify-center w-10 h-10 rounded-full bg-white border border-[#FFD6A5] text-[#5C2C1E] ${
      disabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-[#FFF7ED]'
    }`}
  >
    {direction === 'prev' ? <FiChevronLeft size={18} /> : <FiChevronRight size={18} />}
  </motion.button>
);

// Component for ellipsis
const Ellipsis = () => (
  <div className="flex items-center justify-center w-10 h-10 text-[#5C2C1E]">
    ...
  </div>
);

export default Pagination;