import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/axios';
import './styles/SinglePost.css';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getCommentsForPost, createComment, deleteComment } from '../services/commentService';
import { getLikes, createLike, deleteLike } from '../services/likeService';
import { updatePost, deletePost } from '../services/postService';

const getImageForPost = (post) => {
  const title = (post.Title || "").toLowerCase();

  if (title.includes('batman')) return '/posts-images/batman.jpg';
  if (title.includes('catwoman')) return '/posts-images/catwoman.jpg';
  if (title.includes('jewel')) return '/posts-images/catwomanjewels.jpg';
  if (title.includes('lives')) return '/posts-images/catwoman.jpg';
  if (title.includes('joker')) return '/posts-images/joker.jpg';
  if (title.includes('gotham')) return '/posts-images/gotham-default.jpg';

  return '/posts-images/gotham-default.jpg';
};

const SinglePost = () => {
  const { id } = useParams(); // get post ID from URL
  const navigate = useNavigate();
  const [post, setPost] = useState(null);
  const [comments, setComments] = useState([]);
  const [error, setError] = useState('');
  const [commentInput, setCommentInput] = useState("");
  const { user } = useContext(AuthContext);

  const categoryName = post?.CategoryName || 'Unknown';

  // track the user's like (if any) on this post
  const [isLiked, setIsLiked] = useState(false);
  const [likeId, setLikeId] = useState(null);

  const formatDate = (dateString) => {
    try {
      return dateString ? format(new Date(dateString), 'dd/MM/yyyy') : 'Unknown Date';
    } catch {
      return 'Unknown Date';
    }
  };

  useEffect(() => {
    let cancelled = false;
    //load post & comments in parallel
    const loadContent = async () => {
      try {
        const [postResp, commentsData] = await Promise.all([
          API.get(`/BlogPost/${id}`),
          getCommentsForPost(+id),
        ]);
        if (cancelled) return;
        setPost(postResp.data);
        setComments(commentsData);
      } catch (e) {
        console.error(e);
        if (!cancelled) setError('Could not load post');
      }
    };

    //load this user's like once (fire & forget)
    const loadLike = async () => {
      if (!user) return;
      try {
        const all = await getLikes();
        if (cancelled) return;
        const me = all.find(l => l.BlogPostId === +id);
        if (me) {
          setIsLiked(true);
          setLikeId(me.LikeId);
        }
      } catch (e) {
        console.warn('couldn’t load like state', e);
      }
    };

    loadContent();
    loadLike();

    return () => { cancelled = true; };
  }, [id, user]);

  const handleLikeClick = async () => {
    if (!user) {
      alert('Please log in or register to like posts.');
      return;
    }

    try {
      if (isLiked) {
        // unlike
        await deleteLike(likeId);
        setIsLiked(false);
        setLikeId(null);
      } else {
        // like
        const newLike = await createLike(post.BlogPostId);
        setIsLiked(true);
        setLikeId(newLike.likeId);
      }
    } catch (e) {
      console.error('Failed to toggle like:', e);
    }
  };

  const handleCommentSubmit = async () => {
    try {
      await createComment(commentInput, post.BlogPostId);
      setCommentInput('');
      //re-fetch comments to show the new one
      const updated = await getCommentsForPost(post.BlogPostId);
      setComments(updated);
    } catch (error) {
      console.error('Failed to post comment:', error);
    }
  };
  if (error) return <p className="text-danger">{error}</p>;
  if (!post) return <p>Loading...</p>;

  const handleDeleteComment = async (commentId) => {
    try {
      await deleteComment(commentId);
      setComments(cs => cs.filter(c => c.CommentId !== commentId));
    } catch (e) {
      console.error('delete failed', e);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Ready to delete this post?')) return;
    await deletePost(post.BlogPostId);
    navigate('/posts');
  };

  const handleEdit = () => {
    navigate(`/edit-post/${post.BlogPostId}`);
  };

  return (
    <div className="single-post-page">
      <div className="single-post-container">

        {user && (user.UserId === post.UserId || user.Role === 'Admin') && (
          <div className="post-actions">
            <button className="btn btn-sm btn-outline-warning" onClick={handleEdit}>
              Edit
            </button>
            <button className="btn btn-sm btn-outline-danger ms-2" onClick={handleDelete}>
              Delete
            </button>
          </div>
        )}

        <button onClick={() => navigate('/posts')} className="back-button">
          ← Back to Posts
        </button>

        <h2 className="single-post-title">{post.Title}</h2>
        <p className="single-post-meta">
          By: <span className="font-semibold">{post.Username || 'Unknown'}</span>
          {' '}| {formatDate(post.DateCreated)}
          {' '}| Category: <em>{categoryName}</em>
        </p>

        <img
          src={getImageForPost(post)}
          alt="Blog visual"
          className="single-post-image"
        />
        <p className="single-post-content">{post.Content}</p>

        <button
          onClick={handleLikeClick}
          className="like-button"
          aria-label={isLiked ? 'Unlike' : 'Like'}
        >
          {isLiked ? '❤️' : '🤍'} {isLiked ? 'Unlike' : 'Like'}
        </button>

        <hr />
        <div className="comments-section">
          <h4>💬 Comments</h4>
          {comments.map(c => (
            <div key={c.CommentId} className="comment">
              <p>
                <strong>{c.User.Username}</strong>: {c.CommentContent}
                {user.Role === 0 && (
                  <button
                    type="button"
                    className="delete-comment-btn"
                    onClick={() => handleDeleteComment(c.CommentId)}
                    aria-label="Delete comment"
                  >
                    🗑️ <span className="delete-comment-text">Delete comment?</span>
                  </button>
                )}
              </p>
            </div>
          ))
          }

          {user ? (
            <div className="comment-form">
              <textarea
                value={commentInput}
                onChange={(e) => setCommentInput(e.target.value)}
                placeholder="Share your thoughts..."
                rows={4}
              />
              <button onClick={handleCommentSubmit}>Post Comment</button>
            </div>
          ) : (
            <p className="login-reminder"> Please log in to post a comment.</p>
          )}

          <button className="back-button" onClick={() => navigate('/posts')}>← Back to Posts</button>
        </div>
      </div >
    </div >
  );
};


export default SinglePost;