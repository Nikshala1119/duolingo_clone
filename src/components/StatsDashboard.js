// src/components/StatsDashboard.js - UPDATED to use useProgress hook
import React from 'react';
import { useProgress } from '../context/ProgressContext';
import './StatsDashboard.css';

/**
 * STATS DASHBOARD COMPONENT
 * 
 * This component displays comprehensive statistics about the user's progress
 * across all languages.
 * 
 * WHAT CHANGED:
 * Instead of: import { ProgressContext } from '../context/ProgressContext'
 * We now use: import { useProgress } from '../context/ProgressContext'
 * 
 * And instead of: const { progress, totalXP, resetProgress } = useContext(ProgressContext)
 * We now use: const { progress, totalXP, resetProgress } = useProgress()
 * 
 * This is the modern React pattern - custom hooks make code cleaner and easier to read!
 */
const StatsDashboard = () => {
  // Use the custom hook to get all progress-related data and functions
  const { progress, totalXP, resetProgress } = useProgress();

  /**
   * Calculate Overall Statistics
   * 
   * This function processes the progress data to generate summary statistics.
   * It counts total lessons, correct answers, and active languages.
   */
  const calculateStats = () => {
    let totalLessons = 0;
    let totalCorrectAnswers = 0;
    let languagesStarted = 0;

    // Loop through each language in the progress object
    Object.keys(progress).forEach(key => {
      const lang = progress[key];
      if (lang.completedLessons > 0) {
        languagesStarted++;
        totalLessons += lang.completedLessons;
        // Each lesson has the score stored as the last score
        // We estimate total correct answers based on high scores
        totalCorrectAnswers += Math.round((lang.highScore / 100) * lang.totalQuestions * lang.completedLessons);
      }
    });

    return {
      totalLessons,
      totalCorrectAnswers,
      languagesStarted
    };
  };

  const stats = calculateStats();

  /**
   * Get Language Display Name
   * 
   * Converts the language ID (like 'spanish') to a display name (like 'Spanish')
   */
  const getLanguageName = (langId) => {
    return langId.charAt(0).toUpperCase() + langId.slice(1);
  };

  /**
   * Get Language Flag Emoji
   * 
   * Returns the appropriate flag emoji for each language
   */
  const getLanguageFlag = (langId) => {
    const flags = {
      spanish: '🇪🇸',
      french: '🇫🇷',
      german: '🇩🇪',
      japanese: '🇯🇵'
    };
    return flags[langId] || '🌍';
  };

  return (
    <div className="stats-dashboard">
      <h1 className="dashboard-title">📊 Your Progress</h1>

      {/* Overall Statistics Summary */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-value">{totalXP}</div>
          <div className="stat-label">Total XP</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-value">{stats.totalLessons}</div>
          <div className="stat-label">Lessons Completed</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✓</div>
          <div className="stat-value">{stats.totalCorrectAnswers}</div>
          <div className="stat-label">Correct Answers</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🌍</div>
          <div className="stat-value">{stats.languagesStarted}</div>
          <div className="stat-label">Languages Started</div>
        </div>
      </div>

      {/* Per-Language Progress */}
      <div className="language-progress-section">
        <h2 className="section-title">Progress by Language</h2>
        
        {Object.keys(progress).length === 0 ? (
          <div className="no-progress">
            <p>No progress yet. Start learning to see your stats here!</p>
          </div>
        ) : (
          <div className="language-progress-list">
            {Object.keys(progress).map(langId => {
              const lang = progress[langId];
              return (
                <div key={langId} className="language-progress-card">
                  <div className="language-header">
                    <span className="language-flag">{getLanguageFlag(langId)}</span>
                    <h3 className="language-title">{getLanguageName(langId)}</h3>
                  </div>
                  
                  <div className="language-stats">
                    <div className="language-stat">
                      <span className="stat-label">Lessons:</span>
                      <span className="stat-value">{lang.completedLessons}</span>
                    </div>
                    <div className="language-stat">
                      <span className="stat-label">High Score:</span>
                      <span className="stat-value">{lang.highScore}%</span>
                    </div>
                    <div className="language-stat">
                      <span className="stat-label">Last Score:</span>
                      <span className="stat-value">{lang.lastScore}%</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="progress-bar-container">
                    <div className="progress-bar-label">Completion</div>
                    <div className="progress-bar">
                      <div 
                        className="progress-bar-fill"
                        style={{ width: `${Math.min(lang.highScore, 100)}%` }}
                      />
                    </div>
                    <div className="progress-bar-percentage">{lang.highScore}%</div>
                  </div>

                  {lang.lastCompleted && (
                    <div className="last-completed">
                      Last completed: {new Date(lang.lastCompleted).toLocaleDateString()}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </div>

      {/* Reset Progress Button */}
      {Object.keys(progress).length > 0 && (
        <div className="reset-section">
          <button onClick={resetProgress} className="reset-button">
            🔄 Reset All Progress
          </button>
          <p className="reset-warning">
            Warning: This will permanently delete all your progress data.
          </p>
        </div>
      )}
    </div>
  );
};

export default StatsDashboard;