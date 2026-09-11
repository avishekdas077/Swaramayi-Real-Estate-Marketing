import API from './api';

export const enquiryService = {
  submitEnquiry: async (data) => {
    const res = await API.post('/enquiries', data);
    return res.data;
  },
  scheduleSiteVisit: async (data) => {
    const res = await API.post('/site-visits', data);
    return res.data;
  },
  getEnquiries: async () => {
    const res = await API.get('/enquiries');
    return res.data;
  },
  updateEnquiry: async (id, data) => {
    const res = await API.put(`/enquiries/${id}`, data);
    return res.data;
  },
  getSiteVisits: async () => {
    const res = await API.get('/site-visits');
    return res.data;
  },
  updateSiteVisit: async (id, data) => {
    const res = await API.put(`/site-visits/${id}`, data);
    return res.data;
  },
};
