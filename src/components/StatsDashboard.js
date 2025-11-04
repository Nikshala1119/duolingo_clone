import React, { useContext } from 'react';
import { ProgressContext } from '../context/ProgressContext';
import './StatsDashboard.css';

function StatsDashboard() {
  const { totalXP, progress, resetProgress } = useContext(ProgressContext);

  const totalLessons = Object.values(progress).reduce(
    (sum, lang) => sum + (lang.completedLessons || 0), 0
  );

  const totalCorrect = Object.values(progress).reduce(
    (sum, lang) => sum + (lang.lastScore || 0), 0
  );

  return (
    <div className="stats-dashboard">
      <div className="stats-header">
        <h2>📊 Your Stats</h2>
        <button className="reset-btn" onClick={resetProgress}>
          Reset Progress
        </button>
      </div>

      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">⭐</div>
          <div className="stat-value">{totalXP}</div>
          <div className="stat-label">Total XP</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📚</div>
          <div className="stat-value">{totalLessons}</div>
          <div className="stat-label">Lessons Completed</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">✅</div>
          <div className="stat-value">{totalCorrect}</div>
          <div className="stat-label">Correct Answers</div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🔥</div>
          <div className="stat-value">{Object.keys(progress).length}</div>
          <div className="stat-label">Languages Started</div>
        </div>
      </div>

      {Object.keys(progress).length > 0 && (
        <div className="language-progress-list">
          <h3>Language Progress</h3>
          {Object.entries(progress).map(([langId, data]) => (
            <div key={langId} className="progress-item">
              <div className="progress-info">
                <span className="lang-name">{langId.charAt(0).toUpperCase() + langId.slice(1)}</span>
                <span className="progress-detail">
                  {data.completedLessons} lessons • High Score: {data.highScore}/{data.totalQuestions}
                </span>
              </div>
              <div className="progress-bar-small">
                <div 
                  className="progress-fill-small"
                  style={{width: `${(data.highScore / data.totalQuestions) * 100}%`}}
                ></div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default StatsDashboard;