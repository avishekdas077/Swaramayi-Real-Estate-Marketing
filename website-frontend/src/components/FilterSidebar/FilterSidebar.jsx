import React from 'react';
import { SlidersHorizontal, RotateCcw, Check } from 'lucide-react';

export default function FilterSidebar({ filters, setFilters, onReset, isMobile = false }) {
  const handleChange = (key, value) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
  };

  return (
    <div className={`bg-white rounded-2xl border border-gray-200 p-5 ${isMobile ? '' : 'sticky top-24'}`}>
      <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-100">
        <div className="flex items-center space-x-2 text-navy-900 font-extrabold text-sm uppercase tracking-wider">
          <SlidersHorizontal className="w-4 h-4 text-gold-600" />
          <span>Filter Properties</span>
        </div>
        <button
          onClick={onReset}
          className="text-xs text-gold-600 hover:text-navy-900 font-semibold flex items-center space-x-1"
        >
          <RotateCcw className="w-3 h-3" />
          <span>Reset</span>
        </button>
      </div>

      <div className="space-y-5 text-xs">
        {/* Category */}
        <div>
          <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1.5">Category</label>
          <select
            value={filters.category || ''}
            onChange={(e) => handleChange('category', e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-xs text-navy-900 focus:outline-none focus:border-navy-900"
          >
            <option value="">All Categories</option>
            <option value="Buy">Buy</option>
            <option value="Rent">Rent</option>
            <option value="Commercial">Commercial</option>
            <option value="PG">PG / Co-Living</option>
          </select>
        </div>

        {/* Location */}
        <div>
          <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1.5">Kolkata Location</label>
          <select
            value={filters.location || ''}
            onChange={(e) => handleChange('location', e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-xs text-navy-900 focus:outline-none focus:border-navy-900"
          >
            <option value="">All Locations</option>
            <option value="Alipore">Alipore</option>
            <option value="Anwar Shah Road">Anwar Shah Road</option>
            <option value="Ashok Nagar Road">Ashok Nagar Road</option>
            <option value="Ballygunge">Ballygunge</option>
            <option value="Bamangachhi">Bamangachhi</option>
            <option value="Bansdroni">Bansdroni</option>
            <option value="Barasat">Barasat</option>
            <option value="Behala">Behala</option>
            <option value="Bhawanipur">Bhawanipur</option>
            <option value="Bidhan Nagar Road">Bidhan Nagar Road</option>
            <option value="Bira">Bira</option>
            <option value="Birati">Birati</option>
            <option value="Bisharpara Kodaliya">Bisharpara Kodaliya</option>
            <option value="Chetla">Chetla</option>
            <option value="Dattapukur">Dattapukur</option>
            <option value="Dhakuria">Dhakuria</option>
            <option value="Dum Dum">Dum Dum</option>
            <option value="Dum Dum Cantonment">Dum Dum Cantonment</option>
            <option value="Dum Dum Junction">Dum Dum Junction</option>
            <option value="Durganagar">Durganagar</option>
            <option value="EM Bypass">EM Bypass</option>
            <option value="Garia">Garia</option>
            <option value="Gariahat">Gariahat</option>
            <option value="Golf Green">Golf Green</option>
            <option value="Guma">Guma</option>
            <option value="Hazra">Hazra</option>
            <option value="Howrah">Howrah</option>
            <option value="Hridaypur">Hridaypur</option>
            <option value="Jadavpur">Jadavpur</option>
            <option value="Jodhpur Park">Jodhpur Park</option>
            <option value="Kalighat">Kalighat</option>
            <option value="Kasba">Kasba</option>
            <option value="Kudghat">Kudghat</option>
            <option value="Lake Gardens">Lake Gardens</option>
            <option value="Lansdowne">Lansdowne</option>
            <option value="Madhyamgram">Madhyamgram</option>
            <option value="Mukundapur">Mukundapur</option>
            <option value="Naktala">Naktala</option>
            <option value="Netaji Nagar">Netaji Nagar</option>
            <option value="New Alipore">New Alipore</option>
            <option value="New Barrackpore">New Barrackpore</option>
            <option value="New Town">New Town</option>
            <option value="Prince Anwar Shah Road">Prince Anwar Shah Road</option>
            <option value="Rajarhat">Rajarhat</option>
            <option value="Rashbehari Avenue">Rashbehari Avenue</option>
            <option value="Regent Park">Regent Park</option>
            <option value="Ruby">Ruby</option>
            <option value="Salt Lake">Salt Lake</option>
            <option value="Santoshpur">Santoshpur</option>
            <option value="Sarat Bose Road">Sarat Bose Road</option>
            <option value="Sealdah">Sealdah</option>
            <option value="Tollygunge">Tollygunge</option>
          </select>
        </div>

        {/* Property Status */}
        <div>
          <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1.5">Availability Status</label>
          <select
            value={filters.status || (filters.isSold === 'true' ? 'Sold Out' : '')}
            onChange={(e) => {
              const val = e.target.value;
              if (val === 'Sold Out') {
                handleChange('isSold', 'true');
                handleChange('status', 'Sold Out');
              } else {
                handleChange('isSold', '');
                handleChange('status', val);
              }
            }}
            className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-xs text-navy-900 focus:outline-none focus:border-navy-900 font-medium"
          >
            <option value="">All Statuses</option>
            <option value="Live">🟢 Live / Available</option>
            <option value="Under Construction">🏗️ Under Construction</option>
            <option value="Booked">🟡 Booked</option>
            <option value="Hold">⚡ Hold / Reserved</option>
            <option value="Sold Out">🔴 Sold Out</option>
          </select>
        </div>

        {/* Property Type */}
        <div>
          <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1.5">Property Type</label>
          <select
            value={filters.propertyType || ''}
            onChange={(e) => handleChange('propertyType', e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-xs text-navy-900 focus:outline-none focus:border-navy-900"
          >
            <option value="">All Types</option>
            <option value="Apartment">Apartment / Flat</option>
            <option value="Villa">Villa / House</option>
            <option value="Penthouse">Sky Villa / Penthouse</option>
            <option value="Commercial Office">Commercial Office</option>
            <option value="Retail Shop">Retail Shop</option>
            <option value="Plot">Plot / Land</option>
          </select>
        </div>

        {/* Bedrooms / BHK */}
        <div>
          <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1.5">Bedrooms (BHK)</label>
          <div className="grid grid-cols-4 gap-1.5">
            {['1', '2', '3', '4'].map((bhk) => (
              <button
                key={bhk}
                type="button"
                onClick={() => handleChange('bedrooms', filters.bedrooms === bhk ? '' : bhk)}
                className={`py-2 rounded-lg font-bold border transition-colors ${
                  filters.bedrooms === bhk
                    ? 'bg-navy-900 text-gold-400 border-navy-900'
                    : 'bg-gray-50 border-gray-200 text-gray-700 hover:border-gold-500'
                }`}
              >
                {bhk} BHK
              </button>
            ))}
          </div>
        </div>

        {/* Budget Range */}
        <div>
          <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1.5">Price Range (₹)</label>
          <div className="grid grid-cols-2 gap-2">
            <input
              type="number"
              placeholder="Min Price"
              value={filters.minPrice || ''}
              onChange={(e) => handleChange('minPrice', e.target.value)}
              className="bg-gray-50 border border-gray-300 rounded-lg p-2 text-xs text-navy-900 focus:outline-none"
            />
            <input
              type="number"
              placeholder="Max Price"
              value={filters.maxPrice || ''}
              onChange={(e) => handleChange('maxPrice', e.target.value)}
              className="bg-gray-50 border border-gray-300 rounded-lg p-2 text-xs text-navy-900 focus:outline-none"
            />
          </div>
        </div>

        {/* Furnishing */}
        <div>
          <label className="block font-bold text-gray-700 uppercase tracking-wider mb-1.5">Furnishing</label>
          <select
            value={filters.furnishing || ''}
            onChange={(e) => handleChange('furnishing', e.target.value)}
            className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 text-xs text-navy-900 focus:outline-none"
          >
            <option value="">Any Furnishing</option>
            <option value="Unfurnished">Unfurnished</option>
            <option value="Semi-Furnished">Semi-Furnished</option>
            <option value="Fully Furnished">Fully Furnished</option>
          </select>
        </div>

        {/* RERA Approved Checkbox */}
        <div className="pt-2 border-t border-gray-100">
          <label className="flex items-center space-x-2.5 cursor-pointer">
            <input
              type="checkbox"
              checked={filters.reraApproved === 'true'}
              onChange={(e) => handleChange('reraApproved', e.target.checked ? 'true' : '')}
              className="w-4 h-4 rounded text-gold-500 accent-navy-900 focus:ring-0"
            />
            <span className="font-semibold text-gray-800">RERA Approved Properties Only</span>
          </label>
        </div>
      </div>
    </div>
  );
}
