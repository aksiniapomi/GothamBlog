//for adding or editing a post

import React, { useState } from 'react';

const PostForm = ({ onSubmit }) => {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [imageUrl, setImageUrl] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSubmit === 'function') {
      onSubmit({ title, content, imageUrl });
    } else {
      console.error("onSubmit is not a function");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 bg-dark text-light">
      <div className="mb-3">
        <label htmlFor="title">Title</label>
        <input type="text" className="form-control" id="title" value={title}
          onChange={(e) => setTitle(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="content">Content</label>
        <textarea className="form-control" id="content" rows="4" value={content}
          onChange={(e) => setContent(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="imageUrl">Image URL</label>
        <input type="text" className="form-control" id="imageUrl" value={imageUrl}
          onChange={(e) => setImageUrl(e.target.value)} />
      </div>
      <button type="submit" className="btn btn-warning">Create Post</button>
    </form>
  );
};

export default PostForm;