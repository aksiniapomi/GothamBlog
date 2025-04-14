
import { useState, useEffect, useContext } from 'react';
import { getBlogPosts } from '../services/postService';
import PostList from '../components/posts/PostList';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import './styles/Posts.css';

const Posts = () => {
  const [postsData, setPostsData] = useState(null);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getBlogPosts();
        console.log("Fetched data:", data);
        //setPostsData(data);
        setPostsData(Array.isArray(data) ? data : data?.$values || []);
      } catch (error) {
        console.error('Failed to load Gotham news:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
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
    <PostList posts={postsData} />
  </div>
  </div>
  );
};

export default Posts;