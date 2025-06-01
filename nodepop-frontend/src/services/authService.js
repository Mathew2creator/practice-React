import axios from 'axios';

const BASE_URL = 'http://localhost:3001/api/auth';

export async function login(email, password) {
  const response = await axios.post(`${BASE_URL}/login`, { email, password });
  return response.data;
}

export async function signup(userData) {
  const response = await axios.post(`${BASE_URL}/signup`, userData);
  return response.data;
}

export async function getMe(token) {
  const response = await axios.get(`${BASE_URL}/me`, {
    headers: {
      Authorization: `Bearer ${token}`
    }
  });
  return response.data;
}
