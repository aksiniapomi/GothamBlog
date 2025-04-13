import API from './axios';

// Fetch all blog posts from the backend
export const getBlogPosts = async () => {
  const response = await API.get('/BlogPost'); //Matches BlogPostController route
  return response.data;
};