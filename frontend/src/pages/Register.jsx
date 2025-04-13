import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { registerUser } from '../services/authService';
import '../pages/styles/Register.css';

const Register = () => {
    const [formData, setFormData] = useState({
      username: '',
      email: '',
      password: '',
      role: 2, // Default to Reader
    });
    const [error, setError] = useState('');
    const navigate = useNavigate();
  
    const handleChange = (e) => {
      setFormData(prev => ({
        ...prev,
        [e.target.name]: e.target.name === 'role'
          ? parseInt(e.target.value)
          : e.target.value
      }));
    };
  
    const handleSubmit = async (e) => {
      e.preventDefault();
      try {
        await registerUser(formData);
        navigate('/login');
      } catch (err) {
        setError(err.response?.data || 'Registration failed.');
      }
    };
  
    return (
        <div className="register-background">
          <div className="register-box">
            <h2 className="register-title">Register to Gotham Post</h2>
            {error && <div className="register-error">{error}</div>}
            
            <form onSubmit={handleSubmit}>
          <div className="form-row">
            <label>Email:</label>
            <input
              className="register-input"
              name="email"
              type="email"
              placeholder="Email"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label>Username:</label>
            <input
              className="register-input"
              name="username"
              placeholder="Username"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label>Password:</label>
            <input
              className="register-input"
              name="password"
              type="password"
              placeholder="Password"
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-row">
            <label>Role:</label>
            <select
              className="register-input"
              name="role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value={2}>Reader</option>
              <option value={1}>Registered User</option>
              <option value={0}>Admin</option>
            </select>
          </div>

          <button className="register-button">Register</button>
        </form>

        <p className="register-link">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
};

export default Register;