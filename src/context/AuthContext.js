// src/context/AuthContext.js
import React, { createContext, useContext, useState, useEffect } from 'react';

// Create the context - think of this as creating a "channel" for sharing authentication data
const AuthContext = createContext();

// This is a custom hook that makes it easy to use our auth context in any component
// Instead of writing useContext(AuthContext), we can just write useAuth()
export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};

// This component wraps your entire app and provides authentication functionality everywhere
export const AuthProvider = ({ children }) => {
  // State to track if someone is logged in as admin
  const [isAdmin, setIsAdmin] = useState(false);
  
  // State to track if we're still checking localStorage for saved login status
  const [isLoading, setIsLoading] = useState(true);

  // When the component first loads, check if there's a saved admin session
  useEffect(() => {
    // localStorage.getItem() retrieves saved data from the browser
    // Even if you close and reopen the browser, this data persists
    const savedAdminStatus = localStorage.getItem('duolingo_admin');
    
    if (savedAdminStatus === 'true') {
      setIsAdmin(true);
    }
    
    // We're done checking, so set loading to false
    setIsLoading(false);
  }, []); // Empty array means this only runs once when component mounts

  // Function to log in as admin
  // In a real app, you'd verify username/password against a database
  // For learning purposes, we're using a simple password check
  const login = (password) => {
    // IMPORTANT: In a real application, NEVER store passwords in code like this!
    // You'd send the password to a secure backend server to verify it
    const ADMIN_PASSWORD = 'admin123'; // This is just for learning
    
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      // Save the admin status to localStorage so it persists across page refreshes
      localStorage.setItem('duolingo_admin', 'true');
      return true; // Login successful
    }
    return false; // Login failed
  };

  // Function to log out
  const logout = () => {
    setIsAdmin(false);
    // Remove the saved admin status from localStorage
    localStorage.removeItem('duolingo_admin');
  };

  // The "value" prop contains all the data and functions we want to share
  // Any component that uses useAuth() will have access to these
  const value = {
    isAdmin,      // Boolean: are we logged in as admin?
    isLoading,    // Boolean: are we still checking login status?
    login,        // Function: attempt to log in
    logout        // Function: log out
  };

  // The Provider component makes these values available to all children
  // "children" is everything inside <AuthProvider> tags
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};