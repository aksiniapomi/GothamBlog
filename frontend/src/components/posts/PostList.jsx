//list all posts

import React from 'react';
import { format } from 'date-fns';

const PostList = ({ posts = [] }) => {
  // Safely handle the posts data
  const validPosts = Array.isArray(posts) ? posts : [];

  const formatDate = (dateString) => {
    try {
      return dateString ? format(new Date(dateString), 'dd/MM/yyyy') : 'Unknown Date';
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

  if (!validPosts.length) {
    return (
      <div className="no-posts">
        <p>No Gotham news to display. Check back later!</p>
      </div>
    );
  }

  return (
    <div className="post-list">
      {validPosts.map((post) =>
  post.blogPostId && (
    <div key={post.blogPostId} className="post-card">
      <h3>{post.title || 'Untitled Gotham Story'}</h3>
      <div className="post-meta">
        <span>By: {post.user?.username || 'Anonymous'}</span>
        <span>{formatDate(post.dateCreated)}</span>
      </div>
      <p className="post-content">
        {renderContent(post.content)}
      </p>
    </div>
  )
)}
</div>
  );
};

export default PostList;