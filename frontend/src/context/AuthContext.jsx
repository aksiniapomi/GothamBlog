import React, { createContext, useState, useEffect, useContext } from "react";
import { jwtDecode } from "jwt-decode";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [authUser, setAuthUser] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const token = Cookies.get("jwt");

    if (token) {
      try {
        const decoded = jwtDecode(token);

        const roleMap = {
          "0": "Admin",
          "1": "RegisteredUser",
          "2": "Reader"
        };

        const user = {
          userId: parseInt(decoded.nameid || decoded.UserId || decoded.sub || decoded.name),
          email: decoded.email || decoded.Email || "unknown",
          role: parseInt(decoded.Role ?? decoded.role ?? 2)  
        };

        console.log("Decoded JWT:", decoded);
        console.log("Mapped user:", user);

        setAuthUser(user);
      } catch (error) {
        console.error("Failed to decode JWT:", error);
        setAuthUser(null);
      }
    }
  }, []);

  const login = (user) => {
    setAuthUser(user);
  //  navigate("/posts"); 
  if (user.Role === "Admin" || user.Role === 0 || user.Role === "0") {
    navigate("/admin");
  } else {
    navigate("/posts");
  }
  };

  const logout = () => {
    Cookies.remove("jwt");
    setAuthUser(null);
    navigate("/login");
  };

  return (
    <AuthContext.Provider value={{ user: authUser, setUser: setAuthUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);