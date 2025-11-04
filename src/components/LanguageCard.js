import React, { useContext } from 'react';
import { ProgressContext } from '../context/ProgressContext';
import './LanguageCard.css';

function LanguageCard(props) {
  const { getLanguageProgress } = useContext(ProgressContext);
  const progressData = getLanguageProgress(props.languageId);

  return (
    <div className="language-card" onClick={props.onSelect}>
      <div className="language-flag">{props.flag}</div>
      <h3>{props.language}</h3>
      <p>{props.description}</p>
      
      {progressData && (
        <div className="card-progress">
          <div className="progress-stats">
            <span>🏆 High Score: {progressData.highScore}/{progressData.totalQuestions}</span>
            <span>📖 {progressData.completedLessons} lessons</span>
          </div>
        </div>
      )}
      
      <button className="start-btn">
        {progressData ? 'Continue Learning' : 'Start Learning'}
      </button>
    </div>
  );
}

export default LanguageCard;