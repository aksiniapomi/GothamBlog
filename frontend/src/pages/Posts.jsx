
import { useState, useEffect, useContext } from 'react';
import { getBlogPosts } from '../services/postService';
import PostList from '../components/posts/PostList';
import { AuthContext } from '../context/AuthContext';
import { useNavigate } from 'react-router-dom';
import { getLikes, createLike, deleteLike } from '../services/likeService';
import './styles/Posts.css';
import API from '../services/axios';

const Posts = () => {
  const [postsData, setPostsData] = useState(null);
  const [likedMap, setLikedMap] = useState(new Map());  // postId → likeId track a Map<BlogPostId, LikeId> for the current user
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const loadPosts = async () => {
      setLoading(true);
      try {
        const posts = await getBlogPosts();
        setPostsData(Array.isArray(posts) ? posts : posts?.$values || []);

        // once posts are in, if there’s a logged‑in user fetch their likes
        if (user) {
          const likes = await getLikes();
          setLikedMap(new Map(likes.map(l => [l.BlogPostId, l.LikeId])));
        }

      } catch (error) {
        console.error('Error loading posts:', error);
      } finally {
        setLoading(false);
      }
    };
    loadPosts();
  }, []);

  // toggle handler (called by each PostCard)
  const handleToggleLike = async (blogPostId) => {
    if (!user) {
      alert('Please log in to like posts.');
      return;
    }
    // if already liked -> remove
    if (likedMap.has(blogPostId)) {
      const likeId = likedMap.get(blogPostId);
      await deleteLike(likeId);
      const copy = new Map(likedMap);
      copy.delete(blogPostId);
      setLikedMap(copy);
    }
    // otherwise create a new like
    else {
      const newLike = await createLike(blogPostId);
      const copy = new Map(likedMap);
      copy.set(blogPostId, newLike.LikeId);
      setLikedMap(copy);
    }
  };


  if (loading) return <div className="loading">Loading Gotham headlines...</div>;

  return (
    <div className="post-list-page">
      <h1 className="gotham-title">Gotham Feed</h1>
      <div className="posts-page">
        {user && (
          <div className="create-post-button-container">
            <button onClick={() => navigate('/create-post')} className="create-post-button">
              Create New Post
            </button>
          </div>
        )}
        <PostList posts={postsData}
          // categories={categories}
          likedMap={likedMap}
          onToggleLike={handleToggleLike} />
      </div>
    </div>
  );
};

export default Posts;