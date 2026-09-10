import API from './api';

export const projectService = {
  getProjects: async (params = {}) => {
    const res = await API.get('/projects', { params });
    return res.data;
  },
  getProjectBySlug: async (slug) => {
    const res = await API.get(`/projects/${slug}`);
    return res.data;
  },
  createProject: async (data) => {
    const res = await API.post('/projects', data);
    return res.data;
  },
  updateProject: async (id, data) => {
    const res = await API.put(`/projects/${id}`, data);
    return res.data;
  },
  deleteProject: async (id) => {
    const res = await API.delete(`/projects/${id}`);
    return res.data;
  },
};
