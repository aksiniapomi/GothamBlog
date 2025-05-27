import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Loads from .env
  withCredentials: true, //sends cookies like JWT with request; allows the frontend to send the jwt cookie 
});

//Inject JWT from cookie into Authorization header
API.interceptors.request.use(
  (config) => {
    // Parse the document.cookie string to find the jwt cookie
    const jwtCookie = document.cookie.split('; ').find(row => row.startsWith('jwt='));
    if (jwtCookie) {
      const token = jwtCookie.split('=')[1];
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor 
API.interceptors.response.use(   //handle responses globally/ show meesages or log out if 401 
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      console.warn("Unauthorized. You may need to log in again"); 
    }
    return Promise.reject(error);
  }
);
export const getBlogPosts = async () => {
  try {
    const response = await API.get('/blogpost');
    // Extract the $values array from the response
    return response.data.$values || [];
  } catch (error) {
    console.error('Error fetching posts:', error);
    throw error;
  }
}
export default API;

//