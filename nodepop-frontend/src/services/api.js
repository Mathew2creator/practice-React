import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:3001/api/v1/adverts',
  headers: {
    'Content-Type': 'application/json'
  }
});

+
// Interceptor para agregar el token de autorización
api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
