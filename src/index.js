// src/index.js - UPDATED VERSION
import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { AuthProvider } from './context/AuthContext';
import { ProgressProvider } from './context/ProgressContext';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';
import reportWebVitals from './reportWebVitals';

/**
 * APPLICATION ENTRY POINT
 * 
 * This is where everything begins. When your app starts, this file runs first.
 * 
 * Think of it like the foundation of a house - everything else is built on top of it.
 * 
 * KEY CONCEPTS EXPLAINED:
 * 
 * 1. ReactDOM.createRoot():
 *    This is how React "connects" to your HTML page. It finds the div with id="root"
 *    in your index.html file and says "I'll render my components here!"
 * 
 * 2. React.StrictMode:
 *    This is like a "safety mode" during development. It helps catch potential problems
 *    by intentionally running some code twice and warning you about issues.
 *    It only runs during development, not in production.
 * 
 * 3. Provider Pattern (Context Wrapping):
 *    Notice how AuthProvider wraps ProgressProvider, which wraps App?
 *    This creates layers like an onion. Every component inside can access:
 *    - Authentication data (from AuthProvider)
 *    - Progress data (from ProgressProvider)
 *    
 *    The order matters! AuthProvider is on the outside, so it loads first.
 *    This is important because we need to know if someone is an admin before
 *    we show them any content.
 * 
 * 4. Service Worker:
 *    This enables the Progressive Web App (PWA) features like offline access.
 *    We register it after the app starts so it doesn't slow down the initial load.
 */

// Get the root element from your HTML
const root = ReactDOM.createRoot(document.getElementById('root'));

// Render the entire application
root.render(
  <React.StrictMode>
    {/* 
      AuthProvider wraps everything - this makes authentication available everywhere.
      Any component can now use useAuth() to check if someone is logged in as admin.
    */}
    <AuthProvider>
      {/* 
        ProgressProvider wraps the App - this makes progress tracking available everywhere.
        Any component can now use useProgress() to read or update student progress.
      */}
      <ProgressProvider>
        {/* 
          The actual App component with all your UI.
          Thanks to the providers above, it has access to both authentication and progress.
        */}
        <App />
      </ProgressProvider>
    </AuthProvider>
  </React.StrictMode>
);

/**
 * Service Worker Registration
 * 
 * This makes your app work offline (PWA functionality).
 * 
 * We use .register() to enable it. If you want to disable offline functionality,
 * you can change this to .unregister()
 * 
 * The service worker caches your app's files so they load even without internet.
 * It's like downloading a copy of the app to your device.
 */
serviceWorkerRegistration.register();

/**
 * Web Vitals (Performance Monitoring)
 * 
 * This is optional. It measures how fast your app loads and responds.
 * You can connect this to analytics tools to track performance over time.
 * 
 * For learning purposes, we just log it to the console.
 * In a real app, you might send this data to a monitoring service.
 */
reportWebVitals(console.log);