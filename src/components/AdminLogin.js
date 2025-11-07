// src/components/AdminLogin.js
import React, { useState } from 'react';
import { useAuth } from '../context/AuthContext';
import './AdminLogin.css';

// This component handles the admin login form
const AdminLogin = () => {
  // useState creates a "state variable" - a special variable that when changed, causes React to re-render
  // The first value is the current state, the second is a function to update it
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  
  // Get the login function from our AuthContext
  const { login } = useAuth();

  // This function runs when the form is submitted
  const handleSubmit = (e) => {
    // e.preventDefault() stops the form from doing its default action (refreshing the page)
    // We want to handle the submission ourselves with JavaScript
    e.preventDefault();
    
    // Clear any previous error messages
    setError('');
    
    // Try to log in with the entered password
    const success = login(password);
    
    if (!success) {
      // If login failed, show an error message
      setError('Incorrect password. Please try again.');
      // Clear the password field for security
      setPassword('');
    }
    // If login succeeded, the AuthContext will update isAdmin to true
    // and the App component will automatically show the admin dashboard
  };

  return (
    <div className="admin-login-container">
      <div className="admin-login-card">
        <h2>🔐 Admin Login</h2>
        <p className="admin-login-subtitle">Enter admin credentials to continue</p>
        
        {/* This is a controlled form - React controls all the input values */}
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            {/* A controlled input: its value comes from state, and onChange updates state */}
            {/* This creates a "two-way binding" - state controls the input, input updates state */}
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter admin password"
              required
            />
          </div>
          
          {/* Conditional rendering: only show error if it exists */}
          {/* In React, you can use && to conditionally render elements */}
          {error && <div className="error-message">{error}</div>}
          
          <button type="submit" className="login-button">
            Login as Admin
          </button>
        </form>
        
        <div className="login-hint">
          <small>Hint: Default password is "admin123"</small>
        </div>
      </div>
    </div>
  );
};

export default AdminLogin;