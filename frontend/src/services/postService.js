import axios from './axios';

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

export const createPost = async ({ title, content, categoryId }) => {
  const resp = await api.post('/blogpost', {
    Title:      title,
    Content:    content,
    CategoryId: categoryId
  });
  return resp.data;
};

export async function getBlogPostById(id) {
  const { data } = await api.get(`/blogPost/${id}`);
  return data;
}

export async function updatePost(id, { title, content, categoryId }) {
  const payload = {
    Title:      title,
    Content:    content,
    CategoryId: categoryId
  };
  const { data } = await api.put(`/blogpost/${id}`, payload);
  return data;
}

export const deletePost = async (id) => {
  await api.delete(`/blogpost/${id}`);
};