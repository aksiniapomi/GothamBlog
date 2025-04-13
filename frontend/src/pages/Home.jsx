import React from 'react';
import './styles/Home.css';
import { Link } from 'react-router-dom';

function Home() {
  return (
    <div className="hero-section">
      <div className="hero-overlay hero-text">
        <h1>Welcome to Gotham Post!</h1>
        <p>Your source for truth, shadows, and justice in Gotham City</p>
        <Link to="/posts" className="enter-button">Enter the Blog</Link>
      </div>
    </div>
  );
}

export default Home;