import API from './api';

export const propertyService = {
  getProperties: async (params = {}) => {
    const res = await API.get('/properties', { params });
    return res.data;
  },
  getPropertyBySlug: async (slug) => {
    const res = await API.get(`/properties/${slug}`);
    return res.data;
  },
  getFeaturedProperties: async () => {
    const res = await API.get('/properties/featured');
    return res.data;
  },
  getRecentProperties: async () => {
    const res = await API.get('/properties/recent');
    return res.data;
  },
  getSoldProperties: async () => {
    const res = await API.get('/properties/sold');
    return res.data;
  },
  createProperty: async (data) => {
    const res = await API.post('/properties', data);
    return res.data;
  },
  updateProperty: async (id, data) => {
    const res = await API.put(`/properties/${id}`, data);
    return res.data;
  },
  deleteProperty: async (id) => {
    const res = await API.delete(`/properties/${id}`);
    return res.data;
  },
};
