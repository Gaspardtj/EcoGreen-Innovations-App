/* eslint-disable react-hooks/set-state-in-effect */
/* eslint-disable react-refresh/only-export-components */

import { createContext, useState, useContext, useEffect } from "react";
import PropTypes from "prop-types";
import api from "../api/axios";

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }

  return context;
};

export const AuthProvider = ({ children }) => {

  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [token, setToken] = useState(localStorage.getItem("token"));

  useEffect(() => {

    const storedUser = localStorage.getItem("user");

    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (error) {
        console.error("Error parsing user data:", error);
        localStorage.removeItem("user");
      }
    }

    setLoading(false);

  }, []);

  const login = async (username, password) => {

    try {

      if (!username || !password) {
        return { success: false, error: "Username and password are required" };
      }

      const response = await api.post("token/", { username, password });
      const { access, refresh } = response.data;

      // Get user details
      const userResponse = await api.get("users/me/", {
        headers: { Authorization: `Bearer ${access}` }
      });

      const userData = userResponse.data;

      localStorage.setItem("token", access);
      localStorage.setItem("refresh", refresh);
      localStorage.setItem("user", JSON.stringify(userData));
      localStorage.setItem("userRole", userData.role);

      setToken(access);
      setUser(userData);

      return { success: true };

    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      return { 
        success: false, 
        error: error.response?.data?.detail || "Invalid credentials" 
      };

    }

  };

  const register = async (userData) => {

    try {
      const response = await api.post("register/", userData);
      return { success: true, data: response.data };

    } catch (error) {
      console.error("Registration error:", error.response?.data || error.message);
      return { 
        success: false, 
        error: error.response?.data ? Object.values(error.response.data).flat().join(", ") : "Registration failed" 
      };

    }

  };

  const logout = () => {

    localStorage.removeItem("token");
    localStorage.removeItem("refresh");
    localStorage.removeItem("user");
    localStorage.removeItem("userRole");

    setToken(null);
    setUser(null);

  };

  const value = {
    user,
    token,
    loading,
    login,
    register,
    logout,
    isAuthenticated: !!token,
    userRole: user?.role || null
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

AuthProvider.propTypes = {
  children: PropTypes.node.isRequired
};
