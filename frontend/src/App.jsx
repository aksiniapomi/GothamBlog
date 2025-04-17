import React from 'react';
import { BrowserRouter, Routes, Route, Navigate, Link, useNavigate } from "react-router-dom";
import Navbar from './components/Navbar';
import Home from './pages/Home';
import Posts from './pages/Posts';
import Login from './pages/Login';
import { AuthProvider } from "./context/AuthContext";
import AdminPage from './pages/Admin'; 
import PrivateRoute from './components/PrivateRoute';
import Register from './pages/Register';
import ErrorPage from './pages/ErrorPage';
import PostForm from './components/posts/PostForm';
import Footer from './components/Footer';
import CreatePost from './components/posts/CreatePost';
import SinglePost from './pages/SinglePost';

const App = () => {

  return (
      <AuthProvider>
        <Navbar />
        <Routes>
        <Route path="/" element={<Home />} />   {/* default homepage */}

        {/* Admin route - only Role 0 (Admin) */}
        <Route path="/admin" element={
          <PrivateRoute roleRequired={0}>
          <AdminPage/>
          </PrivateRoute>
        }
        />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/posts" element={<Posts />} />
        <Route path="/post/:id" element={<SinglePost />} />
        
        {/*Protected route - any logged in user */}
        <Route path="/create-post" element={
          <PrivateRoute>
            <CreatePost />
          </PrivateRoute>
        } />

       <Route path="/error" element={<ErrorPage />} />
        <Route path="*" element={<Navigate to="/error" replace />} /> 
        </Routes>
        <Footer />
      </AuthProvider> 
  ); 
};

export default App;