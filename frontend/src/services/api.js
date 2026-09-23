import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  timeout: 12000
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('bazaarpulse_token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}, (error) => Promise.reject(error));

export const authApi = {
  login: (data) => api.post('/auth/login', data),
  register: (data) => api.post('/auth/register', data),
  demoLogin: (role) => api.post(`/auth/demo/${role}`),
  getMe: () => api.get('/auth/me')
};

export const commodityApi = {
  getAll: (params) => api.get('/commodities', { params }),
  getLiveTicker: () => api.get('/commodities/live-ticker'),
  forceSync: () => api.post('/commodities/force-sync'),
  getById: (id) => api.get(`/commodities/${id}`)
};

export const tcbApi = {
  getTrucks: (params) => api.get('/tcb/trucks', { params }),
  updateStock: (id, data) => api.put(`/tcb/trucks/${id}`, data)
};

export const hoardingApi = {
  getColdStorages: (params) => api.get('/hoarding/cold-storages', { params }),
  updateInspection: (id, data) => api.put(`/hoarding/cold-storages/${id}`, data)
};

export const whistleApi = {
  submitReport: (data) => api.post('/whistle/report', data),
  getReports: (params) => api.get('/whistle/reports', { params }),
  updateStatus: (id, data) => api.put(`/whistle/reports/${id}/status`, data)
};

export const analyticsApi = {
  getAgroForex: () => api.get('/analytics/agro-forex'),
  getMarketSpread: () => api.get('/analytics/market-spread'),
  calcBudget: (data) => api.post('/analytics/family-budget', data),
  calcIftarBasket: () => api.get('/analytics/ramadan-iftar')
};

export const authorityApi = {
  getRaids: () => api.get('/authority/raids'),
  logRaid: (data) => api.post('/authority/raids', data),
  getAuditLogs: () => api.get('/authority/audit-logs'),
  getBulletins: () => api.get('/authority/bulletins'),
  publishBulletin: (data) => api.post('/authority/bulletins', data)
};

export default api;
