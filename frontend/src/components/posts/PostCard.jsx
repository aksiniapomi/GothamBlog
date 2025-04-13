//displays an individual post (title, content, author)
//reusable card used on the /posts page to show each post

import React from 'react';
import './PostCard.css'; 

const PostCard = ({ title, content, author, date }) => {
  return (
    <div className="post-card bg-dark text-white p-4 rounded mb-4 shadow">
      <h3 className="mb-2">{title}</h3>
      <p className="mb-2"><strong>By:</strong> {author}</p>
      <p className="mb-2">{content}</p>
      <small className="text-muted">Posted on: {new Date(date).toLocaleString()}</small>
    </div>
  );
};

export default PostCard;