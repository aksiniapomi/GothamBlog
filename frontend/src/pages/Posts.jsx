
import { useState, useEffect, useContext } from 'react';
import { getBlogPosts } from '../services/postService';
import PostList from '../components/posts/PostList';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './styles/Posts.css';
import API from '../services/axios';

const Posts = () => {
  const [postsData, setPostsData] = useState(null);
  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const posts = await getBlogPosts();
        setPostsData(Array.isArray(posts) ? posts : posts?.$values || []);
      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  if (loading) return <div className="loading">Loading Gotham headlines...</div>;

  return (
    <div className="post-list-page">
      <h1 className="gotham-title">Gotham Feed</h1>
      <div className="posts-page">
        {user && (
          <div className="create-post-button-container">
            <button onClick={() => navigate('/create-post')} className="create-post-button">
              Create New Post
            </button>
          </div>
        )}
        <PostList posts={postsData} categories={categories} />
      </div>
    </div>
  );
};

export default Posts;