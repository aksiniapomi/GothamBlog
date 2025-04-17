//list all posts

import React from 'react';
import { format } from 'date-fns';
import PostCard from './PostCard';
import { Link } from 'react-router-dom';

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
        <Link
          to={`/post/${post.BlogPostId}`}
          key={post.BlogPostId}
          className="post-link"
        >
          <PostCard post={post} />
        </Link>
      ))}
    </div>
  );
};

export default PostList;