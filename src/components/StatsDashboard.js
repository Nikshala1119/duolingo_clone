// src/components/StatsDashboard.js - UPDATED WITH FLAG IMAGES
import React from 'react';
import { useProgress } from '../context/ProgressContext';
import './StatsDashboard.css';

/**
 * STATS DASHBOARD COMPONENT - Enhanced with Flag Images
 * 
 * This component displays comprehensive statistics about the user's progress
 * across all languages, now with beautiful flag images instead of emoji flags.
 * 
 * WHY FLAG IMAGES?
 * - Consistent appearance across all devices and operating systems
 * - High quality at any size
 * - Works perfectly on Windows where emoji flags don't display
 * - Professional appearance
 * 
 * We use the same flagcdn.com service as the LanguageCard for consistency.
 */
const StatsDashboard = () => {
  const { progress, totalXP, resetProgress } = useProgress();

  /**
   * Calculate Overall Statistics
   * 
   * Processes progress data to generate summary statistics.
   */
  const calculateStats = () => {
    let totalLessons = 0;
    let totalCorrectAnswers = 0;
    let languagesStarted = 0;

    Object.keys(progress).forEach(key => {
      const lang = progress[key];
      if (lang.completedLessons > 0) {
        languagesStarted++;
        totalLessons += lang.completedLessons;
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
   * Converts language ID to display name with proper capitalization.
   */
  const getLanguageName = (langId) => {
    return langId.charAt(0).toUpperCase() + langId.slice(1);
  };

  /**
   * Get Language Info with Flag Image URL
   * 
   * Returns comprehensive language information including the flag image URL.
   * This ensures consistent flag display across all devices.
   */
  const getLanguageInfo = (langId) => {
    const languageData = {
      spanish: {
        countryCode: 'es',
        countryName: 'Spain',
        flagEmoji: '🇪🇸'
      },
      french: {
        countryCode: 'fr',
        countryName: 'France',
        flagEmoji: '🇫🇷'
      },
      german: {
        countryCode: 'de',
        countryName: 'Germany',
        flagEmoji: '🇩🇪'
      },
      japanese: {
        countryCode: 'jp',
        countryName: 'Japan',
        flagEmoji: '🇯🇵'
      }
    };

    return languageData[langId] || {
      countryCode: 'un',
      countryName: 'International',
      flagEmoji: '🌍'
    };
  };

  /**
   * Get Flag Image URL
   * 
   * Constructs the URL to fetch flag images from flagcdn.com.
   * Using w80 (80px width) for optimal quality at the display size.
   */
  const getFlagUrl = (countryCode) => {
    return `https://flagcdn.com/w80/${countryCode}.png`;
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
              const languageInfo = getLanguageInfo(langId);
              
              return (
                <div key={langId} className="language-progress-card">
                  <div className="language-header">
                    {/* 
                      FLAG IMAGE CONTAINER
                      
                      Styled similarly to LanguageCard for visual consistency.
                      The circular container with border creates a polished look.
                    */}
                    <div className="flag-container-stats">
                      <img 
                        src={getFlagUrl(languageInfo.countryCode)}
                        alt={`${languageInfo.countryName} flag`}
                        className="flag-image-stats"
                        loading="lazy"
                        onError={(e) => {
                          // Fallback to emoji if image fails to load
                          e.target.style.display = 'none';
                          e.target.nextSibling.style.display = 'flex';
                        }}
                      />
                      {/* Fallback emoji flag */}
                      <span 
                        className="flag-emoji-fallback-stats"
                        role="img"
                        aria-label={`${languageInfo.countryName} flag`}
                      >
                        {languageInfo.flagEmoji}
                      </span>
                    </div>

                    <div className="language-info-stats">
                      <h3 className="language-title">{getLanguageName(langId)}</h3>
                      <span className="country-label-stats">{languageInfo.countryName}</span>
                    </div>
                  </div>
                  
                  <div className="language-stats">
                    <div className="language-stat">
                      <span className="stat-label">Lessons</span>
                      <span className="stat-value">{lang.completedLessons}</span>
                    </div>
                    <div className="language-stat">
                      <span className="stat-label">High Score</span>
                      <span className="stat-value">{lang.highScore}%</span>
                    </div>
                    <div className="language-stat">
                      <span className="stat-label">Last Score</span>
                      <span className="stat-value">{lang.lastScore}%</span>
                    </div>
                  </div>

                  {/* Progress Bar */}
                  <div className="progress-bar-container">
                    <div className="progress-bar-label">
                      <span>Completion</span>
                      <span className="progress-bar-percentage">{lang.highScore}%</span>
                    </div>
                    <div className="progress-bar">
                      <div 
                        className="progress-bar-fill"
                        style={{ width: `${Math.min(lang.highScore, 100)}%` }}
                      />
                    </div>
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