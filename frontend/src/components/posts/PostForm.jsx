//for adding or editing a post
import React, { useState, useEffect } from 'react';
import { getCategories } from '../../services/categoryService';

const PostForm = ({ onSubmit, initialValues }) => {
  const [title, setTitle] = useState('');
  const [categories, setCategories] = useState([]);
  const [content, setContent] = useState(initialValues?.content || '');
  const [categoryId, setCategoryId] = useState(initialValues?.categoryId || '');

  // fetch categories on mount 
  useEffect(() => {
    async function load() {
      try {
        const cats = await getCategories();
        setCategories(cats);
        // default to first one
        if (cats.length) setCategoryId(cats[0].CategoryId);
      } catch (err) {
        console.error('Could not load categories', err);
      }
    }
    load();
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSubmit === 'function') {
      onSubmit({ title, content, categoryId });
    } else {
      console.error("onSubmit is not a function");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="p-4 text-light">
      <div className="mb-3">
        <label htmlFor="title" className="form-label fw-bold">Title</label>
        <input type="text" className="form-control" id="title" value={title}
          onChange={(e) => setTitle(e.target.value)} />

      </div>
      <div className="mb-3">
        <label htmlFor="content" className="form-label fw-bold">Content</label>
        <textarea className="form-control" id="content" rows="4" value={content}
          onChange={(e) => setContent(e.target.value)} />
      </div>

      <div className="mb-3">
        <label htmlFor="category" className="form-label fw-bold">Category</label>
        <select
          id="category"
          className="form-control"
          value={categoryId}
          onChange={e => setCategoryId(Number(e.target.value))}
          required
        >
          {categories.map(c => (
            <option key={c.CategoryId} value={c.CategoryId}>
              {c.Name}
            </option>
          ))}
        </select>
      </div>

      <button type="submit" className="btn btn-warning fw-bold">Create Post</button>
    </form>
  );
};

export default PostForm;