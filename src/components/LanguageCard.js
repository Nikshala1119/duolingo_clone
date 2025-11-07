// src/components/LanguageCard.js - UPDATED with SVG Flag Images
import React from 'react';
import { useProgress } from '../context/ProgressContext';
import './LanguageCard.css';

/**
 * LANGUAGE CARD COMPONENT - With Reliable Flag Display
 * 
 * This version uses SVG flag images from a CDN instead of emoji flags.
 * This ensures consistent, beautiful flag display across ALL devices and browsers.
 * 
 * WHY SVG FLAGS?
 * - Work on all operating systems (including Windows)
 * - Consistent appearance everywhere
 * - High quality at any size
 * - Reliable rendering
 * 
 * We're using the 'flagcdn.com' service which provides free SVG flags
 * for all countries. The URLs are simple and predictable.
 */
const LanguageCard = ({ language, onSelect }) => {
  const { getLanguageProgress } = useProgress();
  const progress = getLanguageProgress(language.id);

  /**
   * Get Country Information
   * 
   * Returns country data including the ISO country code which we'll use
   * to fetch the flag image from the CDN.
   */
  const getCountryInfo = (languageId) => {
    const countryData = {
      spanish: {
        countryCode: 'es',  // Spain
        countryName: 'Spain',
        flagEmoji: '🇪🇸'
      },
      french: {
        countryCode: 'fr',  // France
        countryName: 'France',
        flagEmoji: '🇫🇷'
      },
      german: {
        countryCode: 'de',  // Germany
        countryName: 'Germany',
        flagEmoji: '🇩🇪'
      },
      japanese: {
        countryCode: 'jp',  // Japan
        countryName: 'Japan',
        flagEmoji: '🇯🇵'
      }
    };

    return countryData[languageId] || { 
      countryCode: 'un', 
      countryName: 'International',
      flagEmoji: '🌍'
    };
  };

  const countryInfo = getCountryInfo(language.id);
  
  /**
   * Get Flag Image URL
   * 
   * This function constructs the URL to fetch the flag image from flagcdn.com
   * The 'w160' means we want the flag at 160px width (high quality for retina displays)
   */
  const getFlagUrl = (countryCode) => {
    return `https://flagcdn.com/w160/${countryCode}.png`;
  };

  return (
    <div className="language-card" onClick={() => onSelect(language)}>
      {/* Card Header with Flag and Language Name */}
      <div className="card-header">
        {/* 
          FLAG CONTAINER with SVG Image
          
          We use an <img> tag to display the actual flag image from the CDN.
          The alt text provides accessibility for screen readers.
          The loading="lazy" attribute improves performance by only loading
          the image when it's about to come into view.
        */}
        <div 
          className="flag-container" 
          data-country={countryInfo.countryCode.toUpperCase()}
        >
          <img 
            src={getFlagUrl(countryInfo.countryCode)}
            alt={`${countryInfo.countryName} flag`}
            className="flag-image"
            loading="lazy"
            onError={(e) => {
              // Fallback: if the image fails to load, show the emoji
              e.target.style.display = 'none';
              e.target.nextSibling.style.display = 'flex';
            }}
          />
          {/* Fallback emoji flag (hidden by default) */}
          <span 
            className="flag-emoji-fallback"
            role="img"
            aria-label={`${countryInfo.countryName} flag`}
          >
            {countryInfo.flagEmoji}
          </span>
        </div>

        {/* Language Name and Country Label */}
        <div className="language-info">
          <h2 className="language-name">{language.name}</h2>
          <span className="country-label">{countryInfo.countryName}</span>
        </div>
      </div>
      
      {/* Language Description */}
      <p className="language-description">{language.description}</p>
      
      {/* Progress Information - Only shown if user has started this language */}
      {progress && (
        <div className="progress-info">
          <div className="progress-stat">
            <span className="stat-icon">🏆</span>
            <div className="stat-content">
              <span className="stat-label">High Score</span>
              <span className="stat-value">{progress.highScore}%</span>
            </div>
          </div>
          
          <div className="progress-divider"></div>
          
          <div className="progress-stat">
            <span className="stat-icon">📚</span>
            <div className="stat-content">
              <span className="stat-label">Lessons</span>
              <span className="stat-value">{progress.completedLessons}</span>
            </div>
          </div>
        </div>
      )}
      
      {/* Start/Continue Button */}
      <button className="start-button">
        <span className="button-text">
          {progress ? 'Continue Learning' : 'Start Learning'}
        </span>
        <span className="button-arrow">→</span>
      </button>
    </div>
  );
};

export default LanguageCard;