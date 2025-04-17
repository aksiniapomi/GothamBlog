import { useNavigate } from 'react-router-dom';
import { createPost } from '../../services/postService';
import PostForm from './PostForm';
import { getCategories } from '../../services/categoryService';
import React, { useState, useEffect } from 'react';
import './CreateEditPost.css';

const CreatePost = () => {
  const navigate = useNavigate();
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    getCategories().then(setCategories).catch(console.error);
  }, []);

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
    <div className="create-post-page">
      <div className="inner-container">
        <h1 className="page-heading">Create Post</h1>
        <div className="form-container">
          <PostForm
            categories={categories}
            onSubmit={handleCreatePost}
          />
        </div>
      </div>
    </div>
  );
};

export default CreatePost;