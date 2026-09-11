import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/Common/SEO';
import Breadcrumbs from '../../components/Common/Breadcrumbs';
import { locationService } from '../../services/locationService';
import { MapPin, ArrowRight, Search } from 'lucide-react';

export default function Locations() {
  const [locations, setLocations] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const res = await locationService.getLocations();
      const rawList = Array.isArray(res?.data)
        ? res.data
        : Array.isArray(res?.data?.locations)
        ? res.data.locations
        : Array.isArray(res)
        ? res
        : [];

      const formattedList = rawList.map((item, idx) => {
        if (typeof item === 'string') {
          const slug = item.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
          return {
            id: slug || `loc-${idx}`,
            name: item,
            slug: slug,
            description: `Explore premium residential properties, commercial listings, and real estate market opportunities in ${item}, Kolkata.`
          };
        }
        return {
          id: item.id || item._id || item.slug || `loc-${idx}`,
          name: item.name || item.title || item.locality || 'Kolkata Locality',
          slug: item.slug || (item.name ? item.name.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '') : `loc-${idx}`),
          description: item.description || `Explore premium residential properties and market opportunities in ${item.name || 'this locality'}, Kolkata.`
        };
      });

      setLocations(formattedList);
    } catch (error) {
      console.error('Error fetching locations:', error);
      setLocations([]);
    } finally {
      setLoading(false);
    }
  };

  const filteredLocations = locations.filter(loc => 
    loc.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    loc.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <SEO
        title="Kolkata Real Estate Locations & Locality Guides | Swarnamayi"
        description="Explore top property hubs across Kolkata: New Town, Rajarhat, Salt Lake, EM Bypass, Ballygunge, Alipore, Garia, Tollygunge."
      />

      <div className="bg-light-bg min-h-screen pb-16">
        <div className="bg-navy-900 text-white py-10 border-b border-gold-500/30">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <Breadcrumbs items={[{ label: 'Kolkata Locations' }]} />
            <h1 className="text-3xl sm:text-4xl font-extrabold text-white mt-1">Kolkata Prime Real Estate Locations</h1>
            <p className="text-xs sm:text-sm text-gray-300 mt-1 max-w-2xl">
              Factual locality guides and property market trends across Kolkata's top residential and commercial hubs.
            </p>
          </div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8">
          {/* Locality Search Input */}
          <div className="bg-white rounded-2xl p-4 border border-gray-200 shadow-sm mb-8 flex items-center space-x-3">
            <Search className="w-5 h-5 text-gold-600 shrink-0" />
            <input
              type="text"
              placeholder="Search Kolkata locality by name (e.g. Alipore, Ballygunge, Barasat, Salt Lake)..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full text-xs sm:text-sm text-navy-900 placeholder-gray-400 focus:outline-none font-medium"
            />
            {searchTerm && (
              <button onClick={() => setSearchTerm('')} className="text-xs text-gray-400 hover:text-navy-900 font-bold">
                Clear
              </button>
            )}
          </div>

          {loading ? (
            <div className="py-20 text-center text-navy-900 font-bold">Loading locations...</div>
          ) : filteredLocations.length === 0 ? (
            <div className="py-16 bg-white rounded-2xl border text-center text-sm font-bold text-gray-500">
              No locality found matching "{searchTerm}".
            </div>
          ) : (
            <div>
              <div className="text-xs font-bold text-gray-500 mb-4 uppercase tracking-wider">
                Showing {filteredLocations.length} Kolkata Localities
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                {filteredLocations.map((loc, idx) => (
                  <Link
                    key={loc.id || loc._id || loc.slug || idx}
                    to={`/locations/${loc.slug}`}
                    className="group bg-white rounded-2xl border border-gray-200 p-6 shadow-sm hover:shadow-navy transition-all duration-300 flex flex-col justify-between"
                  >
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-gold-500/10 border border-gold-500/30 flex items-center justify-center text-gold-600 mb-4 group-hover:scale-110 transition-transform">
                        <MapPin className="w-6 h-6" />
                      </div>
                      <h3 className="text-lg font-bold text-navy-900 group-hover:text-navy-800 mb-2">{loc.name}</h3>
                      <p className="text-xs text-gray-500 line-clamp-3 leading-relaxed mb-4">{loc.description}</p>
                    </div>

                    <div className="pt-3 border-t border-gray-100 flex items-center justify-between text-xs font-bold text-gold-600">
                      <span>Explore Locality</span>
                      <ArrowRight className="w-4 h-4" />
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
