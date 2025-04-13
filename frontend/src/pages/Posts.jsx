
import { useState, useEffect } from 'react';
import { getBlogPosts } from '../services/postService';
import PostList from '../components/posts/PostList';

const Posts = () => {
  const [postsData, setPostsData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getBlogPosts();
        setPostsData(data);
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
    <div className="gotham-feed">
      <h1>🦇 Gotham City News Feed</h1>
      <PostList posts={postsData} />
    </div>
  );
};

export default Posts;