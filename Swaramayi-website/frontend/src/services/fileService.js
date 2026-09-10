import API from './api';

export const fileService = {
  getFiles: async (category = '') => {
    const res = await API.get('/files', { params: { category } });
    return res.data;
  },
  uploadFile: async (formData) => {
    const res = await API.post('/files', formData, {
      headers: { 'Content-Type': 'multipart/form-data' },
    });
    return res.data;
  },
  deleteFile: async (id) => {
    const res = await API.delete(`/files/${id}`);
    return res.data;
  },
};
