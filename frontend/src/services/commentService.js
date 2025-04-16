import API from './axios';

export const getCommentsForPost = async (postId) => {
  try {
    const response = await API.get('/Comment');
    // Filter comments for the specific post
    return response.data.filter(comment => comment?.BlogPostId === postId);
  } catch (error) {
    console.error('Error fetching comments:', error);
    throw error;
  }
};