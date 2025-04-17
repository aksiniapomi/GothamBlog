import API from '../../services/axios';
import React, { useState, useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import PostForm from './PostForm.jsx';
import { AuthContext } from '../../context/AuthContext';
import { getBlogPostById, updatePost } from '../../services/postService';
import './CreateEditPost.css';

const EditPost = () => {
    const { id } = useParams();
    const nav = useNavigate();
    const { user } = useContext(AuthContext);
    const [initial, setInitial] = useState(null);
    const [categories, setCategories] = useState([]);

    // fetch post + categories
    useEffect(() => {
        API.get('/category').then(r => setCategories(r.data)).catch(console.error);
        getBlogPostById(id)
            .then(data => {
                setInitial({
                    title: data.Title,
                    content: data.Content,
                    categoryId: data.CategoryId
                });
            })
            .catch(console.error);
    }, [id]);

    const handleSubmit = async vals => {
        await updatePost(id, vals);
        nav(`/post/${id}`);
    };

    if (!initial) return <p>Loading…</p>;

    return (
        <div className="create-post-page">
            <div className="inner-container">
                <h1 className="page-heading">Edit Post</h1>
                <div className="form-container">
                    <PostForm
                        initialValues={initial}
                        categories={categories}
                        onSubmit={handleSubmit}
                    />
                </div>
            </div>
        </div>
    );
};

export default EditPost;