import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; 
import batLogo from '../assets/Gotham_City_Batman_Vol_3_14.png';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  console.log("Auth user:", user);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // redirect to login after logout
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-4"
     style={{ backgroundColor: '#0d1b2a' }}>
      <Link className="navbar-brand" to="/">
      <img src={batLogo} alt="Logo" height="40" style={{ marginRight: '10px', borderRadius: '50%' }} />
        Gotham Blog
      </Link>
      <div className="collapse navbar-collapse">
      <ul className="navbar-nav ms-auto">
  <li className="nav-item">
    <Link className="nav-link" to="/">Home</Link>
  </li>
  <li className="nav-item">
    <Link className="nav-link" to="/posts">Posts</Link>
  </li>

  {user && (
    <>
      <li className="nav-item nav-link text-light">
      Welcome, <strong>{user.role === 0 ? "Admin" : user.role === 1 ? "Registered User" : "Reader"}</strong>
      </li>
      <li className="nav-item nav-link text-light">
        <small>{user.email}</small>
      </li>
      <li className="nav-item">
        <button className="btn btn-outline-light btn-sm nav-link" onClick={handleLogout}>
          Logout
        </button>
      </li>
    </>
  )}
  {!user && (
    <li className="nav-item">
      <Link className="nav-link" to="/login">Login</Link>
    </li>
  )}
</ul>
      </div>
    </nav>
  );
}

export default Navbar;