import React from 'react';
import { Link } from 'react-router-dom';

//reusable UI components 

function Navbar() {
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <Link className="navbar-brand" to="/">
        <img src="/Gotham_City_Batman_Vol_3_14.png" alt="Logo" height="40" style={{ marginRight: '10px' }} />
        Gotham Blog
      </Link>
      <div className="collapse navbar-collapse">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item"><Link className="nav-link" to="/">Home</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/posts">Posts</Link></li>
          <li className="nav-item"><Link className="nav-link" to="/login">Login</Link></li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;