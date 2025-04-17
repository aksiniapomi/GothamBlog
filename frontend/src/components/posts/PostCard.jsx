//displays an individual post (title, content, author)
//reusable card used on the /posts page to show each post

import React from 'react';
import './PostCard.css';
import { format } from 'date-fns';

const PostCard = ({ post, likedMap, onToggleLike }) => {
  const formatDate = (dateString) => {
    try {
      return dateString ? format(new Date(dateString), 'dd/MM/yyyy') : 'Unknown Date';
    } catch {
      return 'Unknown Date';
    }
  };

  const renderContent = (content) => {
    if (!content) return 'No content available';
    return content.length > 150 ? `${content.substring(0, 150)}...` : content;
  };

  const categoryName = post.CategoryName || 'Unknown';

  const getImageForPost = (post) => {
    const title = (post.Title || post.title || "").toLowerCase();
    if (title.includes('batman')) return '/posts-images/batman.jpg';
    if (title.includes('catwoman')) return '/posts-images/catwoman.jpg';
    if (title.includes('jewel')) return '/posts-images/catwomanjewels.jpg';
    if (title.includes('lives')) return '/posts-images/catwoman.jpg';
    if (title.includes('joker')) return '/posts-images/joker.jpg';
    if (title.includes('gotham')) return '/posts-images/gotham-default.jpg';

    return '/posts-images/gotham-default.jpg';
  };

  const isLiked = likedMap.has(post.BlogPostId);

  return (
    <div className="post-card">

      <img src={getImageForPost(post)}
        alt="Post visual"
      />

      <div className="post-card-header">
        <h3>{post.Title || 'Untitled Gotham Story'}</h3>

        <button
          className="heart-button"
          onClick={e => {
            e.preventDefault();      // stop the <Link> navigation
            e.stopPropagation();
            onToggleLike(post.BlogPostId);
          }}
          aria-label={isLiked ? 'Unlike' : 'Like'}
        >
          {isLiked ? '❤️' : '🤍'}
        </button>

        <span className="category-badge">{categoryName}</span>
      </div>

      <div className="meta">
        By: <span className="font-semibold">{post.Username || 'Anonymous'}</span> | {formatDate(post.DateCreated)}
      </div>
      <p className="content">{renderContent(post.Content)}</p>
    </div>
  );
};

export default PostCard;