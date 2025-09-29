import { BASE_URL } from '../utils/constants';

const handleResponse = async (response) => {
  const data = await response.json();
  if (!response.ok) {
    const error = new Error(data.message || 'Something went wrong');
    error.status = response.status;
    throw error;
  }
  return data;
};

export const taskService = {
  getAll: async () => {
    const response = await fetch(`${BASE_URL}/api/tasks`, {
      credentials: 'include',
    });
    return handleResponse(response);
  },

  create: async (taskData) => {
    const response = await fetch(`${BASE_URL}/api/tasks`, {
      method: 'POST',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(taskData),
    });
    return handleResponse(response);
  },

  update: async (id, updates) => {
    const response = await fetch(`${BASE_URL}/api/tasks/${id}`, {
      method: 'PATCH',
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(updates),
    });
    return handleResponse(response);
  },

  delete: async (id) => {
    const response = await fetch(`${BASE_URL}/api/tasks/${id}`, {
      method: 'DELETE',
      credentials: 'include',
    });
    return handleResponse(response);
  },
};
