import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5113/api',
  withCredentials: true 
});

// Fetch all blog posts from the backend
export const getBlogPosts = async () => {
  try {
    const response = await api.get('/blogpost');
    const rawData = response.data;
    
    const postsArray = rawData?.$values || rawData;

    //Filter out EF reference placeholders
    return postsArray.filter(post => !post.$ref);
  } catch (error) {
    console.error('Error fetching Gotham news:', error);
    return [];
  }
};