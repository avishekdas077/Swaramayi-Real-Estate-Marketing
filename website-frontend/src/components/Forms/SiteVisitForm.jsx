import React, { useState } from 'react';
import { Calendar, Clock, CheckCircle, AlertCircle } from 'lucide-react';
import { enquiryService } from '../../services/enquiryService';

export default function SiteVisitForm({ propertyId, propertyTitle }) {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    visitDate: '',
    visitTime: '11:00 AM',
  });
  const [loading, setLoading] = useState(false);
  const [successMsg, setSuccessMsg] = useState('');
  const [errorMsg, setErrorMsg] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!formData.name || !formData.phone || !formData.visitDate) {
      setErrorMsg('Please select visit date and fill name & phone.');
      return;
    }
    try {
      setLoading(true);
      setErrorMsg('');
      const res = await enquiryService.scheduleSiteVisit({
        ...formData,
        property: propertyId,
        propertyTitle,
      });
      setSuccessMsg(res.message || 'Site visit request submitted successfully!');
    } catch (err) {
      setErrorMsg(err.response?.data?.message || 'Failed to schedule site visit.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white rounded-2xl p-6 border border-gray-200 shadow-sm">
      <div className="flex items-center space-x-2 text-navy-900 mb-1">
        <Calendar className="w-5 h-5 text-gold-600" />
        <h3 className="text-base font-bold">Schedule Free Site Visit</h3>
      </div>
      <p className="text-xs text-gray-500 mb-4">Pickup & drop assistance available upon request.</p>

      {successMsg ? (
        <div className="bg-green-50 border border-green-300 text-green-800 p-4 rounded-xl flex items-start space-x-3">
          <CheckCircle className="w-5 h-5 text-green-600 shrink-0 mt-0.5" />
          <div className="text-xs font-semibold">{successMsg}</div>
        </div>
      ) : (
        <form onSubmit={handleSubmit} className="space-y-3 text-xs">
          {errorMsg && (
            <div className="bg-red-50 border border-red-200 text-red-700 p-2.5 rounded-lg flex items-center space-x-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMsg}</span>
            </div>
          )}

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Full Name *</label>
            <input
              type="text"
              required
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 focus:border-navy-900 focus:outline-none"
            />
          </div>

          <div className="grid grid-cols-2 gap-2">
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Phone Number *</label>
              <input
                type="tel"
                required
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 focus:border-navy-900 focus:outline-none"
              />
            </div>
            <div>
              <label className="block font-semibold text-gray-700 mb-1">Visit Date *</label>
              <input
                type="date"
                required
                value={formData.visitDate}
                onChange={(e) => setFormData({ ...formData, visitDate: e.target.value })}
                className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 focus:border-navy-900 focus:outline-none"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-gray-700 mb-1">Preferred Time</label>
            <select
              value={formData.visitTime}
              onChange={(e) => setFormData({ ...formData, visitTime: e.target.value })}
              className="w-full bg-gray-50 border border-gray-300 rounded-lg p-2.5 focus:border-navy-900 focus:outline-none"
            >
              <option value="10:00 AM">10:00 AM - Morning</option>
              <option value="12:00 PM">12:00 PM - Noon</option>
              <option value="03:00 PM">03:00 PM - Afternoon</option>
              <option value="05:00 PM">05:00 PM - Evening</option>
            </select>
          </div>

          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 bg-navy-900 hover:bg-navy-800 text-white font-bold rounded-lg shadow transition-colors"
          >
            {loading ? 'Scheduling...' : 'Confirm Site Visit'}
          </button>
        </form>
      )}
    </div>
  );
}
