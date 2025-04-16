import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import API from '../services/axios';
import './styles/SinglePost.css';
import { format } from 'date-fns';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getCommentsForPost, createComment } from '../services/commentService';

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

const formatDate = (dateString) => {
    try {
      return dateString ? format(new Date(dateString), 'dd/MM/yyyy') : 'Unknown Date';
    } catch {
      return 'Unknown Date';
    }
  };  

  useEffect(() => {
    const fetchPostAndComments = async () => {
      try {
        const response = await API.get(`/BlogPost/${id}`);
        setPost(response.data);

        const commentsData = await getCommentsForPost(Number(id));
        setComments(commentsData);
      } catch (err) {
        console.error('Error fetching post or comments:', err);
        setError('Could not load post.');
      }
    };

    fetchPostAndComments();
  }, [id]);

  if (error) return <p className="text-danger">{error}</p>;
  if (!post) return <p>Loading...</p>;

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

  return (
    <div className="single-post-page">
    <div className="single-post-container">
    <button onClick={() => navigate('/posts')} className="back-button">
     ← Back to Posts
    </button>

      <h2 className="single-post-title">{post.Title}</h2>
      <p className="single-post-meta">
      By: <span className="font-semibold">{post.Username || 'Unknown'}</span> | {formatDate(post.DateCreated)}
      </p>

      <img
        src={getImageForPost(post)}
        alt="Blog visual"
        className="single-post-image"
      />
      <p className="single-post-content">{post.Content}</p>

      <hr />
        <div className="comments-section">
          <h4>💬 Comments</h4>
          {comments.length === 0 ? (
            <p>No comments yet. Be the first to comment!</p>
          ) : (
            comments.map((comment) => (
              <div key={comment.CommentId} className="comment">
                <p><strong>{comment?.User?.Username || 'Anonymous'}</strong>:</p>
                <p>{comment.CommentContent}</p>
              </div>
            ))
          )}
        </div>

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
    </div>
  );
};


export default SinglePost;