import React from 'react';
import { useNavigate } from 'react-router-dom';
import { createPost } from '../../services/postService';
import PostForm from './PostForm';

const CreatePost = () => {
  const navigate = useNavigate();

  const handleCreatePost = async (postData) => {
    try {
      const newPost = await createPost(postData);
      console.log("Post created:", newPost);
      navigate('/posts');
    } catch (error) {
      console.error("Failed to create post:", error);
    }
  };

  return (
    <div className="container mt-4">
      <h2>Create Post</h2>
      <PostForm onSubmit={handleCreatePost} />
    </div>
  );
};

export default CreatePost;