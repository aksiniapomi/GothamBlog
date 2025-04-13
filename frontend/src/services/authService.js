//Handles login, registration, and auth-related actions

import API from './axios';

// Send login request to backend
export const loginUser = async (email, password) => {
  const response = await API.post('/User/login', {
    email,
    password,
  });

  //return the user data from the response
  return response.data; // { message, user }
};

//register function
export const registerUser = async (userData) => {
  const { username, email, password, role } = userData;
  const response = await API.post('/User/register', {
    username,
    email,
    password,
    role,
  });

  return response.data;
};