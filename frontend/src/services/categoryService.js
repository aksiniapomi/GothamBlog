import api from './axios';

export const getCategories = async () => {
  const response = await api.get('/Category');
  return response.data;       // array of { categoryId, name, description }
};