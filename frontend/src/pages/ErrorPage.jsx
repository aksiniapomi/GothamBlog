
import React from 'react';
import { useNavigate } from 'react-router-dom';

const ErrorPage = () => {
  const navigate = useNavigate();
  
  return (
    <div className="error-page">
      <h2>Something went wrong</h2>
      <p>We couldn't find the page you're looking for.</p>
      <button onClick={() => navigate('/')}>Return Home</button>
    </div>
  );
};

export default ErrorPage;