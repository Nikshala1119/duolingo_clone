// src/App.js - UPDATED VERSION WITH ADMIN FUNCTIONALITY
import React, { useState } from 'react';
import { useAuth } from './context/AuthContext';
import LanguageCard from './components/LanguageCard';
import LessonScreen from './components/LessonScreen';
import StatsDashboard from './components/StatsDashboard';
import InstallPrompt from './components/InstallPrompt';
import AdminLogin from './components/AdminLogin';
import AdminDashboard from './components/AdminDashboard';
import './App.css';

/**
 * MAIN APP COMPONENT - Updated with Admin Functionality
 * 
 * This is the root component that controls the entire application flow.
 * Think of it as the "brain" that decides what to show on the screen.
 * 
 * New Features Added:
 * 1. Admin authentication check
 * 2. Admin login screen
 * 3. Admin dashboard
 * 4. Admin button in the header for easy access
 * 
 * The app now has three main modes:
 * - Student Mode: Learn languages (default)
 * - Admin Login: Authenticate as admin
 * - Admin Dashboard: Manage questions and view student progress
 */
function App() {
  // Get authentication state and functions from AuthContext
  const { isAdmin, isLoading } = useAuth();
  
  // Navigation state
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [showStats, setShowStats] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);

  /**
   * Language Data
   * 
   * These are the four languages students can learn.
   * Each language object contains display information.
   */
  const languages = [
    {
      id: 'spanish',
      flag: '🇪🇸',
      name: 'Spanish',
      description: 'Learn the basics of Spanish'
    },
    {
      id: 'french',
      flag: '🇫🇷',
      name: 'French',
      description: 'Learn the basics of French'
    },
    {
      id: 'german',
      flag: '🇩🇪',
      name: 'German',
      description: 'Learn the basics of German'
    },
    {
      id: 'japanese',
      flag: '🇯🇵',
      name: 'Japanese',
      description: 'Learn the basics of Japanese'
    }
  ];

  /**
   * Handle Language Selection
   * 
   * Called when a student clicks on a language card.
   * Closes any other open views and starts the lesson.
   */
  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
    setShowStats(false);
  };

  /**
   * Handle Exit from Lesson
   * 
   * Returns the student to the language selection screen.
   */
  const handleExitLesson = () => {
    setSelectedLanguage(null);
  };

  /**
   * Toggle Statistics Dashboard
   * 
   * Shows or hides the statistics view.
   */
  const toggleStats = () => {
    setShowStats(!showStats);
    setSelectedLanguage(null);
  };

  /**
   * Toggle Admin Login
   * 
   * Shows or hides the admin login screen.
   */
  const toggleAdminLogin = () => {
    setShowAdminLogin(!showAdminLogin);
    setShowStats(false);
    setSelectedLanguage(null);
  };

  /**
   * Loading State
   * 
   * While we're checking if the user is logged in as admin,
   * show a loading screen to prevent flickering.
   */
  if (isLoading) {
    return (
      <div className="App loading-screen">
        <div className="loading-content">
          <h2>Loading...</h2>
          <div className="spinner"></div>
        </div>
      </div>
    );
  }

  /**
   * Admin Mode
   * 
   * If the user is logged in as admin, show the admin dashboard.
   * This takes over the entire screen.
   */
  if (isAdmin) {
    return (
      <div className="App">
        <AdminDashboard />
      </div>
    );
  }

  /**
   * Admin Login Screen
   * 
   * If the user clicked the admin button but isn't logged in,
   * show the login screen.
   */
  if (showAdminLogin) {
    return (
      <div className="App">
        <button 
          onClick={toggleAdminLogin} 
          className="back-to-home-button"
        >
          ← Back to Home
        </button>
        <AdminLogin />
      </div>
    );
  }

  /**
   * Lesson Mode
   * 
   * If a language is selected, show the lesson screen.
   */
  if (selectedLanguage) {
    return (
      <div className="App">
        <LessonScreen 
          language={selectedLanguage} 
          onExit={handleExitLesson}
        />
      </div>
    );
  }

  /**
   * Statistics View
   * 
   * If the stats button was clicked, show the statistics dashboard.
   */
  if (showStats) {
    return (
      <div className="App">
        <button onClick={toggleStats} className="back-button">
          ← Back
        </button>
        <StatsDashboard />
      </div>
    );
  }

  /**
   * Default View - Language Selection (Student Mode)
   * 
   * This is the main screen students see when they open the app.
   * It shows all available languages to learn.
   */
  return (
    <div className="App">
      {/* PWA Install Prompt */}
      <InstallPrompt />
      
      {/* Header Section */}
      <header className="App-header">
        <div className="header-content">
          <h1>🦉 DuoLingo Clone</h1>
          <p className="subtitle">Learn a new language today!</p>
        </div>
        
        {/* Action Buttons */}
        <div className="header-buttons">
          <button onClick={toggleStats} className="stats-button">
            📊 My Progress
          </button>
          <button onClick={toggleAdminLogin} className="admin-button">
            🔐 Admin
          </button>
        </div>
      </header>

      {/* Language Cards Grid */}
      <main className="App-main">
        <div className="languages-grid">
          {languages.map((language) => (
            <LanguageCard
              key={language.id}
              language={language}
              onSelect={handleLanguageSelect}
            />
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer className="App-footer">
        <p>Made with ❤️ for language learners</p>
      </footer>
    </div>
  );
}

export default App;