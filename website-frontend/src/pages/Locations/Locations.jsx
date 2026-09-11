import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import SEO from '../../components/Common/SEO';
import Breadcrumbs from '../../components/Common/Breadcrumbs';
import { locationService } from '../../services/locationService';
import { MapPin, ArrowRight } from 'lucide-react';

export default function Locations() {
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLocations();
  }, []);

  const fetchLocations = async () => {
    try {
      setLoading(true);
      const res = await locationService.getLocations();
      setLocations(res.data || []);
    } catch (error) {
      console.error('Error fetching locations:', error);
    } finally {
      setLoading(false);
    }
  };

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

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-10">
          {loading ? (
            <div className="py-20 text-center text-navy-900 font-bold">Loading locations...</div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {locations.map((loc, idx) => (
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
          )}
        </div>
      </div>
    </>
  );
}
