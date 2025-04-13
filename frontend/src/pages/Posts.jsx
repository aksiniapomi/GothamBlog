import React, { useEffect, useState } from 'react';
import PostList from '../components/posts/PostList';
import './styles/Posts.css';
import { getBlogPosts } from '../services/postService';

const Posts = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const data = await getBlogPosts(); 
        setPosts(data.$values || []);
      } catch (err) {
        console.error("Error fetching posts", err);
        setPosts([]); 
      }
    };

    fetchPosts();
  }, []);

  return (
    <div className="posts-page">
      <h2>🦇 <span className="batman-style">GOTHAM BLOG FEED</span></h2>
      <PostList posts={posts} />
    </div>
  );
};

export default Posts;