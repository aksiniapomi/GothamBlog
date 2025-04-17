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

export const createComment = async (commentContent, postId) => {
    try {
      const response = await API.post('/Comment', {
        CommentContent: commentContent,
        BlogPostId: postId,
      });
      return response.data;
    } catch (error) {
      console.error('Failed to create comment:', error);
      throw error;
    }
  };

export const deleteComment = (commentId) =>
     API.delete(`/Comment/${commentId}`);

// <p><strong>{comment?.User?.Username || 'Anonymous'}</strong>:</p>