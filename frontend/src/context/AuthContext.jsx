import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const navigate = useNavigate();

  const [user, setUser] = useState(() => {
    try {
      const storedUser = localStorage.getItem("user"); //try to get saved user from the browser history 
      return storedUser && storedUser !== "undefined" //make sure it is not missing 
        ? JSON.parse(storedUser) //convert JSON string back into an object { id, name, email... }
        : null; //if no user found, return null (not logged in)
    } catch (error) { //if there is an error reading JSON, show the error and return null 
      console.error("Failed to parse user from localStorage:", error);
      return null;
    }
  });

  const login = (userData) => {
    localStorage.setItem("user", JSON.stringify(userData));
    setUser(userData);
  };

  const logout = () => {
    localStorage.removeItem("user");
    setUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
}; 
