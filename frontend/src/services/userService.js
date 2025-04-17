//Handles user data, like fetching user lists or profiles

import API from './axios';

export const fetchAllUsers = async () => {
  const response = await API.get('/User'); // protected: requires token
  return response.data;
};

export async function deleteUser(userId) {
  await API.delete(`/user/${userId}`);
}