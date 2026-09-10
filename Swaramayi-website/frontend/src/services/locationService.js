import API from './api';

export const locationService = {
  getLocations: async () => {
    const res = await API.get('/locations');
    return res.data;
  },
  getLocationBySlug: async (slug) => {
    const res = await API.get(`/locations/${slug}`);
    return res.data;
  },
  getCities: async () => {
    const res = await API.get('/locations/cities');
    return res.data;
  },
  getSocieties: async () => {
    const res = await API.get('/locations/societies');
    return res.data;
  },
  getPhases: async () => {
    const res = await API.get('/locations/phases');
    return res.data;
  },
  createLocation: async (data) => {
    const res = await API.post('/locations', data);
    return res.data;
  },
};
