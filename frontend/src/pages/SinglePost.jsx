import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/axios';
import './styles/SinglePost.css';
import { format } from 'date-fns';

const getImageForPost = (post) => {
    const title = (post.Title || "").toLowerCase();
  
    if (title.includes('batman')) return '/posts-images/batman.jpg';
    if (title.includes('catwoman')) return '/posts-images/catwoman.jpg';
    if (title.includes('lives')) return '/posts-images/catwoman.jpg';
    if (title.includes('joker')) return '/posts-images/joker.jpg';
    if (title.includes('gotham')) return '/posts-images/gotham-default.jpg';
  
    return '/posts-images/gotham-default.jpg'; 
  };

const SinglePost = () => {
  const { id } = useParams(); // get post ID from URL
  const [post, setPost] = useState(null);
  const [error, setError] = useState('');

const formatDate = (dateString) => {
    try {
      return dateString ? format(new Date(dateString), 'dd/MM/yyyy') : 'Unknown Date';
    } catch {
      return 'Unknown Date';
    }
  };  

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await API.get(`/BlogPost/${id}`);
        setPost(response.data);
      } catch (err) {
        console.error('Error fetching post:', err);
        setError('Could not load post.');
      }
    };

    fetchPost();
  }, [id]);

  if (error) return <p className="text-danger">{error}</p>;
  if (!post) return <p>Loading...</p>;

  return (
    <div className="single-post-page">
    <div className="single-post-container">
      <h2 className="single-post-title">{post.Title}</h2>
      <p className="single-post-meta">
      By: <span className="font-semibold">{post.Username || 'Unknown'}</span> | {formatDate(post.DateCreated)}
      </p>
      
      <img
        src={getImageForPost(post)}
        alt="Blog visual"
        className="single-post-image"
      />

      <p className="single-post-content">{post.Content}</p>

      <hr />
      <p>💬 Comments will go here</p>
      <p>❤️ Like button goes here</p>
    </div>
  </div>
);
};


export default SinglePost;