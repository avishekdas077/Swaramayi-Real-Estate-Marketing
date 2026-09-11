import React from 'react';

export default function LoadingSkeleton({ count = 6 }) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {Array.from({ length: count }).map((_, i) => (
        <div key={i} className="bg-white rounded-2xl border border-gray-200 p-4 space-y-4 animate-pulse">
          <div className="w-full h-48 bg-gray-200 rounded-xl" />
          <div className="h-4 bg-gray-200 rounded w-3/4" />
          <div className="h-3 bg-gray-200 rounded w-1/2" />
          <div className="grid grid-cols-3 gap-2">
            <div className="h-8 bg-gray-200 rounded-lg" />
            <div className="h-8 bg-gray-200 rounded-lg" />
            <div className="h-8 bg-gray-200 rounded-lg" />
          </div>
          <div className="h-10 bg-gray-200 rounded-lg w-full" />
        </div>
      ))}
    </div>
  );
}
