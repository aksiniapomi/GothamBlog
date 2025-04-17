import API from './axios';

// Fetch all likes for this user (filter by postId in the client)
export const getLikes = async () => {
  const resp = await API.get('/Like');
  return resp.data;
};

// Create a new like for the given post
export const createLike = async (postId) => {
  const resp = await API.post('/Like', { BlogPostId: postId });
  return resp.data;       // the created Like object, including its LikeId
};

// Remove an existing like by its ID
export const deleteLike = async (LikeId) => {
  await API.delete(`/Like/${LikeId}`);
};