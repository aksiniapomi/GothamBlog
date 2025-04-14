//list all posts

import React from 'react';
import { format } from 'date-fns';

const PostList = ({ posts = [] }) => {
  if (!Array.isArray(posts) || posts.length === 0) {
    return (
      <div className="no-posts">
        <p>No Gotham news to display. Check back later!</p>
      </div>
    );
  }

  const formatDate = (dateString) => {
    try {
      return format(new Date(dateString), 'dd/MM/yyyy');
    } catch {
      return 'Unknown Date';
    }
  };

  const renderContent = (content) => {
    if (!content) return 'No content available';
    return content.length > 150 
      ? `${content.substring(0, 150)}...` 
      : content;
  };

  return (
    <div className="post-list">
      {posts.map((post) => (
  <div key={post.BlogPostId} className="post-card">
    <h3>{post.Title || 'Untitled Gotham Story'}</h3>
    <div className="post-meta">
      <span>By: {post.Username || 'Anonymous'}</span>
      <span>{formatDate(post.DateCreated)}</span>
    </div>
    <p className="post-content">
      {renderContent(post.Content)}
    </p>
  </div>
   ))}
    </div>
  );
};

export default PostList;