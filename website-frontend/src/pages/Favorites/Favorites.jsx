import React from 'react';
import SEO from '../../components/Common/SEO';
import Breadcrumbs from '../../components/Common/Breadcrumbs';
import PropertyCard from '../../components/PropertyCard/PropertyCard';
import EmptyState from '../../components/Common/EmptyState';
import { useFavorites } from '../../context/FavoritesContext';

export default function Favorites() {
  const { favorites } = useFavorites();

  return (
    <>
      <SEO title="Saved Favorite Properties | Swarnamayi Real Estate" />

      <div className="bg-light-bg min-h-screen pb-16">
        <div className="bg-navy-900 text-white py-10 border-b border-gold-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: 'Saved Favorites' }]} />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Your Favorite Properties</h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl">
              Bookmark and manage properties you are considering in Kolkata.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          {favorites.length === 0 ? (
            <EmptyState
              title="No Favorites Saved Yet"
              message="Click the heart icon on any property card to save it to your favorites list for quick access."
            />
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {favorites.map((prop, idx) => (
                <PropertyCard key={prop.id || prop._id || prop.slug || idx} property={prop} />
              ))}
            </div>
          )}
        </div>
      </div>
    </>
  );
}
