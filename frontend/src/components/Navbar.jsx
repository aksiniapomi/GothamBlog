import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import batLogo from '../assets/Gotham_City_Batman_Vol_3_14.png';

function Navbar() {
  const { user, logout } = useContext(AuthContext);
  console.log("Navbar user role:", user?.Role, typeof user?.Role);
  console.log("Auth user:", user);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login"); // redirect to login after logout
  };

  //<nav className="navbar navbar-expand-lg navbar-dark">, which tells Bootstrap to collapse the menu on screens smaller than “large.”
  return (
    <nav className="navbar navbar-expand-lg navbar-dark px-4"
      style={{ backgroundColor: '#0d1b2a' }}>

      <Link className="navbar-brand" to="/">
        <img src={batLogo} alt="Logo" height="40" style={{ marginRight: '10px', borderRadius: '50%' }} />
        Gotham Blog
      </Link>


      {/* Mobile hamburger button */}
      <button
        className="navbar-toggler"
        type="button"
        data-bs-toggle="collapse"
        data-bs-target="#mainNav"
        aria-controls="mainNav"
        aria-expanded="false"
        aria-label="Toggle navigation"
      >
        <span className="navbar-toggler-icon"></span>
      </button>

      {/* Collapsible menu */}
      <div className="collapse navbar-collapse" id="mainNav">
        <ul className="navbar-nav ms-auto">
          <li className="nav-item">
            <Link className="nav-link" to="/">Home</Link>
          </li>
          <li className="nav-item">
            <Link className="nav-link" to="/posts">Posts</Link>
          </li>

          {user?.Role === 0 && (
            <li className="nav-item">
              <Link className="nav-link" to="/admin">Admin Dashboard</Link>
            </li>
          )}

          {user && (
            <>
              <li className="nav-item nav-link text-light">
                Welcome, <strong>{user.Role === 0 ? "Admin" : user.Role === 1 ? "Registered User" : "Reader"}</strong>
              </li>
              <li className="nav-item nav-link text-light">
                <small>{user.email ?? user.Email ?? 'No email found'}</small>
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