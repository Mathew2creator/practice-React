import api from './api';

export async function getAdverts(filters = {}) {
  const params = new URLSearchParams();

  Object.entries(filters).forEach(([key, value]) => {
    if (value !== '' && value !== null && value !== undefined) {
      params.append(key, value);
    }
  });

  const response = await api.get(`?${params.toString()}`);
  return response.data;
}

export async function getTags() {
  const response = await api.get('/tags');
  return response.data;
}

export async function getAdvertById(id) {
  const response = await api.get(`/${id}`);
  return response.data;
}

export async function createAdvert(formData) {
  const response = await api.post('/', formData, {
    headers: {
      'Content-Type': 'multipart/form-data'
    }
  });
  return response.data;
}

export async function deleteAdvert(id) {
  const response = await api.delete(`/${id}`);
  return response.data;
}
