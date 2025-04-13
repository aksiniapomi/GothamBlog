import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Posts from './pages/Posts';
import Login from './pages/Login';
import { AuthProvider } from "./context/AuthContext";
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
      <AuthProvider>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />   {/* default homepage */}
        <Route path="/login" element={<Login />} />
        
          {/* only logged in users can access posts */}
          <Route path="/posts" element={<Posts />} />
        </Routes>
      </AuthProvider>
  );
};

export default App;