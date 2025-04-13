import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Posts from './pages/Posts';
import Login from './pages/Login';
import { AuthProvider } from "./context/AuthContext";
import AdminPage from './pages/Admin'; 
import PrivateRoute from './components/PrivateRoute';

const App = () => {
  return (
      <AuthProvider>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />   {/* default homepage */}
        <Route path="/admin" element={
          <PrivateRoute roleRequired="Admin">
          <AdminPage/>
          </PrivateRoute>
        }/>
        <Route path="/login" element={<Login />} />
        <Route path="/posts" element={<Posts />} />
        </Routes>
      </AuthProvider>
  );
};

export default App;