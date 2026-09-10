import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, MapPin, Home, IndianRupee, Layers, SlidersHorizontal, ArrowRight } from 'lucide-react';

export default function PropertySearchBox() {
  const [activeTab, setActiveTab] = useState('Buy');
  const [location, setLocation] = useState('');
  const [propertyType, setPropertyType] = useState('');
  const [bedrooms, setBedrooms] = useState('');
  const [maxPrice, setMaxPrice] = useState('');
  const [minSqft, setMinSqft] = useState('');
  const navigate = useNavigate();

  const handleSearch = (e) => {
    e.preventDefault();
    const params = new URLSearchParams();
    params.set('category', activeTab);
    if (location) params.set('location', location);
    if (propertyType) params.set('propertyType', propertyType);
    if (bedrooms) params.set('bedrooms', bedrooms);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (minSqft) params.set('minSqft', minSqft);

    navigate(`/properties?${params.toString()}`);
  };

  return (
    <div className="relative z-30 max-w-6xl mx-auto px-4 -mt-16 sm:-mt-24 mb-12">
      <div className="bg-navy-900/95 backdrop-blur-xl border border-gold-500/40 rounded-2xl p-4 sm:p-6 shadow-2xl">
        {/* TABS: BUY | RENT | COMMERCIAL | PG */}
        <div className="flex flex-wrap items-center gap-2 pb-4 mb-4 border-b border-gray-800">
          {['Buy', 'Rent', 'Commercial', 'PG'].map((tab) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`px-5 py-2.5 rounded-xl font-bold text-xs sm:text-sm tracking-wide transition-all ${
                activeTab === tab
                  ? 'bg-gold-500 text-navy-900 shadow-gold'
                  : 'text-gray-300 hover:text-white hover:bg-navy-800'
              }`}
            >
              {tab.toUpperCase()}
            </button>
          ))}
        </div>

        {/* SEARCH FORM */}
        <form onSubmit={handleSearch} className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-3.5">
          {/* Location Field */}
          <div>
            <label className="block text-[11px] font-bold text-gold-400 uppercase tracking-wider mb-1">
              Location / Area
            </label>
            <div className="relative">
              <MapPin className="w-4 h-4 text-gold-500 absolute left-3 top-3" />
              <select
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full bg-navy-800 text-white text-xs sm:text-sm rounded-xl pl-9 pr-4 py-2.5 border border-gray-700 focus:border-gold-500 focus:outline-none"
              >
                <option value="">All Kolkata Locations</option>
                <option value="New Town">New Town</option>
                <option value="Rajarhat">Rajarhat</option>
                <option value="Salt Lake">Salt Lake</option>
                <option value="EM Bypass">EM Bypass</option>
                <option value="Ballygunge">Ballygunge</option>
                <option value="Alipore">Alipore</option>
                <option value="Garia">Garia</option>
                <option value="Tollygunge">Tollygunge</option>
                <option value="Behala">Behala</option>
                <option value="Dum Dum">Dum Dum</option>
                <option value="Howrah">Howrah</option>
              </select>
            </div>
          </div>

          {/* Property Type Field */}
          <div>
            <label className="block text-[11px] font-bold text-gold-400 uppercase tracking-wider mb-1">
              Property Type
            </label>
            <div className="relative">
              <Home className="w-4 h-4 text-gold-500 absolute left-3 top-3" />
              <select
                value={propertyType}
                onChange={(e) => setPropertyType(e.target.value)}
                className="w-full bg-navy-800 text-white text-xs sm:text-sm rounded-xl pl-9 pr-4 py-2.5 border border-gray-700 focus:border-gold-500 focus:outline-none"
              >
                <option value="">All Property Types</option>
                <option value="Apartment">Apartment / Flat</option>
                <option value="Villa">Villa / House</option>
                <option value="Penthouse">Sky Villa / Penthouse</option>
                <option value="Commercial Office">Commercial Office</option>
                <option value="Retail Shop">Retail Shop</option>
                <option value="Plot">Plot / Land</option>
              </select>
            </div>
          </div>

          {/* BHK / Bedrooms */}
          <div>
            <label className="block text-[11px] font-bold text-gold-400 uppercase tracking-wider mb-1">
              Bedrooms (BHK)
            </label>
            <div className="relative">
              <Layers className="w-4 h-4 text-gold-500 absolute left-3 top-3" />
              <select
                value={bedrooms}
                onChange={(e) => setBedrooms(e.target.value)}
                className="w-full bg-navy-800 text-white text-xs sm:text-sm rounded-xl pl-9 pr-4 py-2.5 border border-gray-700 focus:border-gold-500 focus:outline-none"
              >
                <option value="">Any BHK</option>
                <option value="1">1 BHK</option>
                <option value="2">2 BHK</option>
                <option value="3">3 BHK</option>
                <option value="4">4 BHK</option>
                <option value="5">5+ BHK</option>
              </select>
            </div>
          </div>

          {/* Max Budget */}
          <div>
            <label className="block text-[11px] font-bold text-gold-400 uppercase tracking-wider mb-1">
              Max Budget
            </label>
            <div className="relative">
              <IndianRupee className="w-4 h-4 text-gold-500 absolute left-3 top-3" />
              <select
                value={maxPrice}
                onChange={(e) => setMaxPrice(e.target.value)}
                className="w-full bg-navy-800 text-white text-xs sm:text-sm rounded-xl pl-9 pr-4 py-2.5 border border-gray-700 focus:border-gold-500 focus:outline-none"
              >
                <option value="">Any Budget</option>
                <option value="4000000">Up to ₹40 Lakhs</option>
                <option value="6000000">Up to ₹60 Lakhs</option>
                <option value="10000000">Up to ₹1 Crore</option>
                <option value="20000000">Up to ₹2 Crores</option>
                <option value="50000000">Up to ₹5 Crores</option>
              </select>
            </div>
          </div>

          {/* Search Button */}
          <div className="flex items-end">
            <button
              type="submit"
              className="w-full bg-gold-500 hover:bg-gold-400 text-navy-900 font-extrabold py-2.5 px-4 rounded-xl shadow-gold transition-all duration-300 flex items-center justify-center space-x-2 text-xs sm:text-sm"
            >
              <Search className="w-4 h-4" />
              <span>SEARCH PROPERTY</span>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
