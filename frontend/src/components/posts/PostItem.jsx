//display a single post (title, author, etc.) with comments and likes
//simpler than PostCard and is great for showing posts in a table, sidebar, or list layout

import React from 'react';

const PostItem = ({ post }) => {
  return (
    <div className="post-item">
      <h4 className="post-item-title">{post.title}</h4>
      <div className="post-item-meta">
        <p><strong>By:</strong> {post.username || 'Unknown'}</p>
        <p>{post.dateCreated ? new Date(post.dateCreated).toLocaleDateString('en-GB') : 'Unknown Date'}</p>
      </div>
    </div>
  );
};

export default PostItem;