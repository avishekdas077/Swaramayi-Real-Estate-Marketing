import React from 'react';
import { SearchX, RefreshCw } from 'lucide-react';

export default function EmptyState({
  title = 'No Properties Found',
  message = 'Try modifying your search keywords or resetting filter options to explore available Kolkata properties.',
  onReset,
}) {
  return (
    <div className="bg-white border border-gray-200 rounded-2xl p-12 text-center max-w-md mx-auto my-8 shadow-sm">
      <div className="w-16 h-16 rounded-full bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-600 mx-auto mb-4">
        <SearchX className="w-8 h-8" />
      </div>
      <h3 className="text-xl font-bold text-navy-900 mb-2">{title}</h3>
      <p className="text-xs text-gray-500 mb-6 leading-relaxed">{message}</p>
      {onReset && (
        <button
          onClick={onReset}
          className="inline-flex items-center space-x-2 px-5 py-2.5 bg-navy-900 hover:bg-navy-800 text-white font-bold text-xs rounded-xl shadow transition-colors"
        >
          <RefreshCw className="w-4 h-4" />
          <span>Reset Filters</span>
        </button>
      )}
    </div>
  );
}
