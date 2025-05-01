import React, { createContext, useState, useContext, useEffect } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  // Setup axios defaults
  useEffect(() => {
    // Set the base URL for all axios requests
    axios.defaults.baseURL = 'http://localhost:5000';
    
    // Add token to all requests if available
    const token = localStorage.getItem('token');
    if (token) {
      axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
    }
  }, []);

  // Check if user is logged in on app load
  useEffect(() => {
    const checkLoggedIn = async () => {
      try {
        const token = localStorage.getItem('token');
        
        if (!token) {
          setLoading(false);
          return;
        }
        
        // Set authorization header for the verification request
        axios.defaults.headers.common['Authorization'] = `Bearer ${token}`;
        
        // Verify token with the backend
        const response = await axios.get('/api/v1/auth/verify');
        
        if (response.data?.user) {
          setCurrentUser(response.data.user);
          setIsAuthenticated(true);
          // Update localStorage with fresh user data
          localStorage.setItem('userData', JSON.stringify(response.data.user));
        } else {
          // If verification fails without throwing an error, clean up
          localStorage.removeItem('token');
          localStorage.removeItem('userData');
          delete axios.defaults.headers.common['Authorization'];
          setIsAuthenticated(false);
        }
      } catch (error) {
        console.error("Session verification error:", error);
        // Clean up on verification error
        localStorage.removeItem('token');
        localStorage.removeItem('userData');
        delete axios.defaults.headers.common['Authorization'];
        setIsAuthenticated(false);
      } finally {
        setLoading(false);
      }
    };

    checkLoggedIn();
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const { data } = await axios.post('/api/v1/auth/login', { email, password });
      
      // Save token and user data
      localStorage.setItem('token', data.token);
      localStorage.setItem('userData', JSON.stringify(data.user));
      
      // Update auth state
      setCurrentUser(data.user);
      setIsAuthenticated(true);
      
      // Set token for future requests
      axios.defaults.headers.common['Authorization'] = `Bearer ${data.token}`;
      
      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Login failed' 
      };
    }
  };

  // Register function
  const register = async (userData) => {
    try {
      // Register the user
      await axios.post('/api/v1/auth/signup', userData);
      
      // After successful registration, automatically log in
      return await login(userData.email, userData.password);
    } catch (error) {
      console.error("Registration error:", error);
      return { 
        success: false, 
        error: error.response?.data?.message || 'Registration failed' 
      };
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userData');
    delete axios.defaults.headers.common['Authorization'];
    setCurrentUser(null);
    setIsAuthenticated(false);
  };

  const value = {
    currentUser,
    isAuthenticated,
    loading,
    login,
    register,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
};

// Custom hook to use auth context
export const useAuth = () => {
  return useContext(AuthContext);
};

export default AuthContext;