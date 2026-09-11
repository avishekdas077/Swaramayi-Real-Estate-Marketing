import React from 'react';
import { Link } from 'react-router-dom';
import { ChevronRight, Home } from 'lucide-react';

export default function Breadcrumbs({ items = [] }) {
  return (
    <nav className="flex items-center space-x-2 text-xs font-semibold text-gray-500 py-3">
      <Link to="/" className="hover:text-navy-900 flex items-center space-x-1">
        <Home className="w-3.5 h-3.5 text-gold-600" />
        <span>Home</span>
      </Link>
      {items.map((item, index) => (
        <React.Fragment key={index}>
          <ChevronRight className="w-3.5 h-3.5 text-gray-400" />
          {item.link ? (
            <Link to={item.link} className="hover:text-navy-900 transition-colors">
              {item.label}
            </Link>
          ) : (
            <span className="text-navy-900 font-bold truncate max-w-xs">{item.label}</span>
          )}
        </React.Fragment>
      ))}
    </nav>
  );
}
