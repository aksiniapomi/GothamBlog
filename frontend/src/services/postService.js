import axios from 'axios';

// Fetch all blog posts from the backend
export const getBlogPosts = async () => {
  try {
    const response = await api.get('/blogpost');
    
    // Handle both direct array and Entity Framework response
    return response.data.$values || response.data;
  } catch (error) {
    console.error('Error fetching Gotham news:', error);
    throw error;
  }
};