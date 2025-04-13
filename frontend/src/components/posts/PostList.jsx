//list all posts

import React from 'react';
import PostItem from './PostItem';

const PostList = ({ posts }) => {
    if (!Array.isArray(posts)) {
      console.error("Expected posts to be an array, but got:", posts);
      return <p>No posts found.</p>;
    }
  
    return (
      <div>
        {posts.length === 0 ? (
          <p>No posts found.</p>
        ) : (
          posts.map(post => (
            <PostItem key={post.blogPostId} post={post} />
          ))
        )}
      </div>
    );
  };
  
  export default PostList;