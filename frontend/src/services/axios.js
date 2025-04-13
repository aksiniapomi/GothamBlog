import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL, // Loads from .env
  withCredentials: true, //sends cookies like our JWT
});

// Response interceptor 
API.interceptors.response.use(   //handle responses globally/ show meesages or log out if 401 
  response => response,
  error => {
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized – maybe redirect to login?');
    }
    return Promise.reject(error);
  }
);

export default API;