import React from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/Common/SEO';
import logoImg from '../../assets/logo.png';
import { Home, Search } from 'lucide-react';

export default function NotFound() {
  return (
    <>
      <SEO title="Page Not Found | Swarnamayi Real Estate" />

      <div className="min-h-screen bg-light-bg flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white rounded-3xl border border-gray-200 shadow-2xl p-8 text-center space-y-6">
          <img src={logoImg} alt="Swarnamayi Logo" className="h-16 w-auto mx-auto object-contain" />
          <div className="text-6xl font-black text-navy-900">404</div>
          <h2 className="text-2xl font-extrabold text-navy-900">Looks like this property has moved.</h2>
          <p className="text-xs text-gray-500">
            The page or property URL you are trying to reach is not available or has been updated.
          </p>

          <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
            <Link
              to="/"
              className="w-full sm:w-auto px-6 py-3 bg-navy-900 text-white font-bold text-xs rounded-xl shadow flex items-center justify-center space-x-2"
            >
              <Home className="w-4 h-4 text-gold-400" />
              <span>Back to Home</span>
            </Link>
            <Link
              to="/properties"
              className="w-full sm:w-auto px-6 py-3 bg-gold-500 hover:bg-gold-400 text-navy-900 font-bold text-xs rounded-xl shadow flex items-center justify-center space-x-2"
            >
              <Search className="w-4 h-4" />
              <span>Explore Properties</span>
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
