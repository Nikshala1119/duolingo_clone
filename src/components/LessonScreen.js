import React, { useState, useContext } from 'react';
import { ProgressContext } from '../context/ProgressContext';
import './LessonScreen.css';

function LessonScreen({ language, languageId, onBack }) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  const { updateProgress } = useContext(ProgressContext);

  // ✅ Question bank for each language
  const questionBank = {
    Spanish: [
      { question: "What does 'Hola' mean?", options: ["Goodbye", "Hello", "Thank you", "Please"], correct: 1 },
      { question: "What does 'Gracias' mean?", options: ["Hello", "Goodbye", "Thank you", "Sorry"], correct: 2 },
      { question: "What does 'Adiós' mean?", options: ["Hello", "Goodbye", "Yes", "No"], correct: 1 },
      { question: "What does 'Sí' mean?", options: ["No", "Yes", "Maybe", "Please"], correct: 1 },
      { question: "What does 'Por favor' mean?", options: ["Thank you", "Sorry", "Please", "Excuse me"], correct: 2 },
    ],

    French: [
      { question: "What does 'Bonjour' mean?", options: ["Goodbye", "Hello", "Please", "Sorry"], correct: 1 },
      { question: "What does 'Merci' mean?", options: ["Sorry", "Thank you", "Excuse me", "Goodnight"], correct: 1 },
      { question: "What does 'Au revoir' mean?", options: ["Goodnight", "Goodbye", "Welcome", "Hello"], correct: 1 },
      { question: "What does 'S'il vous plaît' mean?", options: ["Please", "Thank you", "Sorry", "Yes"], correct: 0 },
      { question: "What does 'Oui' mean?", options: ["No", "Yes", "Maybe", "Sorry"], correct: 1 },
    ],

    German: [
      { question: "What does 'Hallo' mean?", options: ["Goodbye", "Hello", "Please", "Thanks"], correct: 1 },
      { question: "What does 'Danke' mean?", options: ["Sorry", "Thank you", "Good", "Hello"], correct: 1 },
      { question: "What does 'Tschüss' mean?", options: ["Goodbye", "Please", "Yes", "Hello"], correct: 0 },
      { question: "What does 'Ja' mean?", options: ["No", "Yes", "Maybe", "Sorry"], correct: 1 },
      { question: "What does 'Bitte' mean?", options: ["Please", "Sorry", "Goodbye", "Thanks"], correct: 0 },
    ],

    Japanese: [
      { question: "What does 'こんにちは (Konnichiwa)' mean?", options: ["Goodbye", "Hello", "Thank you", "Yes"], correct: 1 },
      { question: "What does 'ありがとう (Arigatou)' mean?", options: ["Please", "Sorry", "Thank you", "Excuse me"], correct: 2 },
      { question: "What does 'さようなら (Sayounara)' mean?", options: ["Goodbye", "Hello", "Good morning", "Yes"], correct: 0 },
      { question: "What does 'はい (Hai)' mean?", options: ["No", "Yes", "Maybe", "Sorry"], correct: 1 },
      { question: "What does 'お願いします (Onegaishimasu)' mean?", options: ["Please", "Sorry", "Excuse me", "Thank you"], correct: 0 },
    ],
  };

  // ✅ Select the correct language’s questions
  const questions = questionBank[language] || questionBank["Spanish"];

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    setShowResult(true);

    const isCorrect = index === questions[currentQuestion].correct;
    if (isCorrect) {
      setScore(prev => prev + 1);
      const earnedXP = updateProgress(languageId, { score: 1, total: 1 });
      setXpEarned(prev => prev + earnedXP);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(prev => prev + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      updateProgress(languageId, { score, total: questions.length });
      setIsComplete(true);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
    setXpEarned(0);
    setIsComplete(false);
  };

  return (
    <div className="lesson-screen">
      <div className="lesson-header">
        <button className="back-btn" onClick={onBack}>← Back</button>
        <h2>{language} Basics</h2>
        <div className="score">Score: {score}/{questions.length}</div>
      </div>

      <div className="progress-bar">
        <div 
          className="progress-fill" 
          style={{width: `${((currentQuestion + 1) / questions.length) * 100}%`}}
        ></div>
      </div>

      {!isComplete ? (
        <div className="question-container">
          <div className="question-number">
            Question {currentQuestion + 1} of {questions.length}
          </div>
          
          <h3 className="question-text">{questions[currentQuestion].question}</h3>

          <div className="options-grid">
            {questions[currentQuestion].options.map((option, index) => (
              <button
                key={index}
                className={`option-btn ${
                  selectedAnswer === index 
                    ? index === questions[currentQuestion].correct 
                      ? 'correct' 
                      : 'incorrect'
                    : ''
                } ${showResult && index === questions[currentQuestion].correct ? 'correct' : ''}`}
                onClick={() => handleAnswer(index)}
                disabled={showResult}
              >
                {option}
              </button>
            ))}
          </div>

          {showResult && (
            <div className={`result-message ${selectedAnswer === questions[currentQuestion].correct ? 'success' : 'error'}`}>
              {selectedAnswer === questions[currentQuestion].correct 
                ? '🎉 Correct! Great job!' 
                : '❌ Incorrect. Try again next time!'}
            </div>
          )}

          {showResult && (
            <button className="next-btn" onClick={handleNext}>
              {currentQuestion === questions.length - 1 ? 'Finish' : 'Continue'} →
            </button>
          )}
        </div>
      ) : (
        <div className="completion-screen">
          <div className="completion-icon">🏆</div>
          <h2>Lesson Complete!</h2>
          <p className="final-score">Your Score: {score}/{questions.length}</p>
          <p className="percentage">{Math.round((score / questions.length) * 100)}%</p>
          
          <div className="xp-earned">
            <span className="xp-badge">+{xpEarned} XP</span>
          </div>
          
          <div className="completion-actions">
            <button className="restart-btn" onClick={handleRestart}>
              Try Again
            </button>
            <button className="home-btn" onClick={onBack}>
              Back to Languages
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LessonScreen;
