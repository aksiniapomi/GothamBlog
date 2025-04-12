import React, { useState, useContext } from "react";
import { Navigate, useNavigate } from "react-router-dom"; 
import { loginUser } from "../services/authService";
import { AuthContext } from "../context/AuthContext";

const Login = () => {
  const { authToken, login } = useContext(AuthContext);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const navigate = useNavigate(); // navigate function

  //Is the user already logged in? Redirect 
  if (authToken) {
    return <Navigate to="/posts" />; 
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const data = await loginUser(email, password);
      login(data.user); //only pass the user, not the token 
      navigate("/posts"); //Redirect after login to posts 
    } catch (err) {
      console.error("Login failed:", err); 
      setError("Login failed. Please check credentials.");
    }
  };

  return (
    <div className="container mt-5" style={{ maxWidth: "400px" }}>
      <h2>Login</h2>
      {error && <div className="alert alert-danger">{error}</div>}
      <form onSubmit={handleSubmit}>
        <div className="mb-3">
          <label>Email:</label>
          <input className="form-control" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="mb-3">
          <label>Password:</label>
          <input className="form-control" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button className="btn btn-primary w-100" type="submit">Login</button>
      </form>
    </div>
  );
};

export default Login;