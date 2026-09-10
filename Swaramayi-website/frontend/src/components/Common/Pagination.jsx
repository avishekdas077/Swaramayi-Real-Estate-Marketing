import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

export default function Pagination({ currentPage, totalPages, onPageChange }) {
  if (totalPages <= 1) return null;

  const pages = Array.from({ length: totalPages }, (_, i) => i + 1);

  return (
    <div className="flex items-center justify-center space-x-2 py-8">
      <button
        disabled={currentPage === 1}
        onClick={() => onPageChange(currentPage - 1)}
        className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 disabled:opacity-40 hover:bg-gold-500 hover:text-navy-900 transition-colors"
      >
        <ChevronLeft className="w-4 h-4" />
      </button>

      {pages.map((page) => (
        <button
          key={page}
          onClick={() => onPageChange(page)}
          className={`w-9 h-9 rounded-lg font-bold text-xs transition-colors ${
            currentPage === page
              ? 'bg-navy-900 text-white shadow-sm'
              : 'bg-white border border-gray-200 text-gray-700 hover:bg-gold-500/20'
          }`}
        >
          {page}
        </button>
      ))}

      <button
        disabled={currentPage === totalPages}
        onClick={() => onPageChange(currentPage + 1)}
        className="p-2 rounded-lg bg-white border border-gray-200 text-gray-600 disabled:opacity-40 hover:bg-gold-500 hover:text-navy-900 transition-colors"
      >
        <ChevronRight className="w-4 h-4" />
      </button>
    </div>
  );
}
