import React, { createContext, useState, useEffect } from 'react';

export const ProgressContext = createContext();

export function ProgressProvider({ children }) {
  const [progress, setProgress] = useState({});
  const [totalXP, setTotalXP] = useState(0);

  // Load progress from localStorage on mount
  useEffect(() => {
    const savedProgress = localStorage.getItem('duolingo_progress');
    const savedXP = localStorage.getItem('duolingo_xp');
    
    if (savedProgress) {
      setProgress(JSON.parse(savedProgress));
    }
    
    if (savedXP) {
      setTotalXP(parseInt(savedXP));
    }
  }, []);

  // Save progress to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem('duolingo_progress', JSON.stringify(progress));
  }, [progress]);

  useEffect(() => {
    localStorage.setItem('duolingo_xp', totalXP.toString());
  }, [totalXP]);

  const updateProgress = (languageId, lessonData) => {
    setProgress(prev => ({
      ...prev,
      [languageId]: {
        ...(prev[languageId] || {}),
        lastScore: lessonData.score,
        totalQuestions: lessonData.total,
        completedLessons: (prev[languageId]?.completedLessons || 0) + 1,
        lastCompleted: new Date().toISOString(),
        highScore: Math.max(
          prev[languageId]?.highScore || 0,
          lessonData.score
        )
      }
    }));

    // Award XP: 10 XP per correct answer
    const xpEarned = lessonData.score * 10;
    setTotalXP(prev => prev + xpEarned);

    return xpEarned;
  };

  const getLanguageProgress = (languageId) => {
    return progress[languageId] || null;
  };

  const resetProgress = () => {
    if (window.confirm('Are you sure you want to reset all progress?')) {
      setProgress({});
      setTotalXP(0);
      localStorage.removeItem('duolingo_progress');
      localStorage.removeItem('duolingo_xp');
    }
  };

  return (
    <ProgressContext.Provider value={{
      progress,
      totalXP,
      updateProgress,
      getLanguageProgress,
      resetProgress
    }}>
      {children}
    </ProgressContext.Provider>
  );
}