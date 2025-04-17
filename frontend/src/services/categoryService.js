import API from './axios';

export const getCategories = async () => {
  const response = await API.get('/Category');
  return response.data;       // array of { categoryId, name, description }
};