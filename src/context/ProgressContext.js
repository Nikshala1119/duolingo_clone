// src/context/ProgressContext.js - UPDATED VERSION
import React, { createContext, useState, useEffect, useContext } from 'react';

/**
 * PROGRESS CONTEXT - Updated with useProgress Hook
 * 
 * This context manages all the progress tracking for the application.
 * Think of it as a central "database" that all components can read from and write to.
 * 
 * We're adding a custom hook (useProgress) to make it easier to use this context.
 */

// Create the context
const ProgressContext = createContext();

/**
 * Custom Hook: useProgress
 * 
 * This is a "custom hook" - a reusable piece of React logic.
 * Instead of components needing to write useContext(ProgressContext) everywhere,
 * they can just write useProgress() which is cleaner and easier to remember.
 * 
 * It also includes error checking to make sure it's being used correctly.
 */
export const useProgress = () => {
  const context = useContext(ProgressContext);
  if (!context) {
    throw new Error('useProgress must be used within a ProgressProvider');
  }
  return context;
};

// Provider Component
export const ProgressProvider = ({ children }) => {
  // State for tracking progress by language
  const [progress, setProgress] = useState({});
  
  // State for total XP across all languages
  const [totalXP, setTotalXP] = useState(0);

  /**
   * Load saved progress from localStorage when component mounts
   * This ensures progress persists even if the user closes the browser
   */
  useEffect(() => {
    try {
      const savedProgress = localStorage.getItem('duolingo_progress');
      const savedXP = localStorage.getItem('duolingo_xp');
      
      if (savedProgress) {
        setProgress(JSON.parse(savedProgress));
      }
      
      if (savedXP) {
        setTotalXP(parseInt(savedXP));
      }
    } catch (error) {
      console.error('Error loading progress:', error);
    }
  }, []);

  /**
   * Save progress to localStorage whenever it changes
   * This automatic saving means we never lose progress
   */
  useEffect(() => {
    try {
      localStorage.setItem('duolingo_progress', JSON.stringify(progress));
      localStorage.setItem('duolingo_xp', totalXP.toString());
    } catch (error) {
      console.error('Error saving progress:', error);
    }
  }, [progress, totalXP]);

  /**
   * Update Progress for a Language
   * 
   * This function is called when a student completes a lesson.
   * It updates the progress data and calculates XP rewards.
   * 
   * @param {string} languageId - The language being studied (e.g., 'spanish')
   * @param {object} lessonData - Contains score, totalQuestions, etc.
   * @returns {number} - The amount of XP earned
   */
  const updateProgress = (languageId, lessonData) => {
    const currentProgress = progress[languageId] || {
      lastScore: 0,
      totalQuestions: 0,
      completedLessons: 0,
      highScore: 0
    };

    // Calculate XP earned (10 XP per correct answer)
    const xpEarned = lessonData.score * 10;
    
    // Calculate percentage score
    const percentageScore = Math.round((lessonData.score / lessonData.totalQuestions) * 100);
    
    // Update high score if this score is better
    const newHighScore = Math.max(currentProgress.highScore, percentageScore);

    // Update progress for this language
    const updatedLanguageProgress = {
      lastScore: percentageScore,
      totalQuestions: lessonData.totalQuestions,
      completedLessons: currentProgress.completedLessons + 1,
      lastCompleted: new Date().toISOString(),
      highScore: newHighScore
    };

    // Update the progress state
    setProgress(prev => ({
      ...prev,
      [languageId]: updatedLanguageProgress
    }));

    // Add XP to total
    setTotalXP(prev => prev + xpEarned);

    return xpEarned;
  };

  /**
   * Get Progress for a Specific Language
   * 
   * @param {string} languageId - The language to get progress for
   * @returns {object|null} - Progress data or null if no progress exists
   */
  const getLanguageProgress = (languageId) => {
    return progress[languageId] || null;
  };

  /**
   * Reset All Progress
   * 
   * This clears all progress data. Used when a user wants to start over.
   * Includes a confirmation dialog for safety.
   */
  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress? This cannot be undone.')) {
      setProgress({});
      setTotalXP(0);
      localStorage.removeItem('duolingo_progress');
      localStorage.removeItem('duolingo_xp');
    }
  };

  // The value object contains all data and functions we want to share
  const value = {
    progress,
    totalXP,
    updateProgress,
    getLanguageProgress,
    resetProgress
  };

  return (
    <ProgressContext.Provider value={value}>
      {children}
    </ProgressContext.Provider>
  );
};

// Keep the old export for backwards compatibility
export default ProgressContext;