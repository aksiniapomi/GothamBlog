//display a single post (title, author, etc.) with comments and likes
//simpler than PostCard and is great for showing posts in a table, sidebar, or list layout

import React from 'react';

const PostItem = ({ post }) => {
  return (
    <div className="post-item">
      <h4 className="post-item-title">{post.title}</h4>
      <p className="post-item-meta">
        By: {post.username || 'Unknown'} | {new Date(post.dateCreated).toLocaleDateString()}
      </p>
    </div>
  );
};

export default PostItem;