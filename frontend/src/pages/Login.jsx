import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom"; 
import { loginUser } from "../services/authService";
import { useAuth } from "../context/AuthContext";
import './styles/Login.css';

const Login = () => {
  const { authUser, login } = useAuth(); 
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate();

  
  if (authUser) {
    return <Navigate to="/posts" />;
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      login(data.user); 
      navigate("/posts");
    } catch (err) {
      console.error("Login failed:", err); 
      setError("Login failed. Please check credentials.");
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h2 className="login-title">LOGIN TO GOTHAM POST</h2>
        {error && <div className="alert alert-danger">{error}</div>}

        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email:</label>
            <input 
              id="email" 
              type="email" 
              value={email} 
              onChange={(e) => setEmail(e.target.value)} 
            />
          </div>

          <div className="form-group">
            <label htmlFor="password">Password:</label>
            <input 
              id="password" 
              type="password" 
              value={password} 
              onChange={(e) => setPassword(e.target.value)} 
            />
          </div>

          <button className="btn btn-primary" type="submit">Login</button>
        </form>
      </div>
    </div>
  );
};

export default Login;