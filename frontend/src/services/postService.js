import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5113/api',
  withCredentials: true,
});

export const getBlogPosts = async () => {
  try {
    const response = await api.get('/blogpost');
    const rawData = response.data;
    const postsArray = rawData?.$values || rawData;
    return postsArray.filter(post => !post.$ref);
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
};

export const createPost = async ({ title, content, imageUrl, categoryId }) => {
  const resp = await api.post('/blogpost', {
    Title:      title,
    Content:    content,
    CategoryId: categoryId
  });
  return resp.data;
};