// src/components/LanguageCard.js - UPDATED to use useProgress hook
import React from 'react';
import { useProgress } from '../context/ProgressContext';
import './LanguageCard.css';

/**
 * LANGUAGE CARD COMPONENT
 * 
 * This component displays a card for each language with progress information.
 * 
 * WHAT CHANGED:
 * Instead of: import { ProgressContext } from '../context/ProgressContext'
 * We now use: import { useProgress } from '../context/ProgressContext'
 * 
 * And instead of: const { getLanguageProgress } = useContext(ProgressContext)
 * We now use: const { getLanguageProgress } = useProgress()
 * 
 * This is cleaner and more modern! The useProgress hook does the useContext
 * work for us behind the scenes.
 */
const LanguageCard = ({ language, onSelect }) => {
  // Use the custom hook to get progress data
  // This is much cleaner than using useContext directly!
  const { getLanguageProgress } = useProgress();
  
  // Get progress for this specific language
  const progress = getLanguageProgress(language.id);

  return (
    <div className="language-card" onClick={() => onSelect(language)}>
      <div className="card-header">
        <span className="flag-icon">{language.flag}</span>
        <h2 className="language-name">{language.name}</h2>
      </div>
      
      <p className="language-description">{language.description}</p>
      
      {/* Show progress if the user has started this language */}
      {progress && (
        <div className="progress-info">
          <div className="progress-stat">
            <span className="stat-label">High Score:</span>
            <span className="stat-value">{progress.highScore}%</span>
          </div>
          <div className="progress-stat">
            <span className="stat-label">Lessons:</span>
            <span className="stat-value">{progress.completedLessons}</span>
          </div>
        </div>
      )}
      
      <button className="start-button">
        {progress ? 'Continue' : 'Start'} →
      </button>
    </div>
  );
};

export default LanguageCard;