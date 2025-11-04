import React, { useState } from 'react';
import './LessonScreen.css';

function LessonScreen(props) {
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);

  // Sample questions for Spanish
  const questions = [
    {
      question: "What does 'Hola' mean?",
      options: ["Goodbye", "Hello", "Thank you", "Please"],
      correct: 1
    },
    {
      question: "What does 'Gracias' mean?",
      options: ["Hello", "Goodbye", "Thank you", "Sorry"],
      correct: 2
    },
    {
      question: "What does 'Adiós' mean?",
      options: ["Hello", "Goodbye", "Yes", "No"],
      correct: 1
    },
    {
      question: "What does 'Sí' mean?",
      options: ["No", "Yes", "Maybe", "Please"],
      correct: 1
    },
    {
      question: "What does 'Por favor' mean?",
      options: ["Thank you", "Sorry", "Please", "Excuse me"],
      correct: 2
    }
  ];

  const handleAnswer = (index) => {
    setSelectedAnswer(index);
    setShowResult(true);

    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  const handleNext = () => {
    if (currentQuestion < questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    }
  };

  const handleRestart = () => {
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  // Check if quiz is complete
  const isComplete = currentQuestion === questions.length - 1 && showResult;

  return (
    <div className="lesson-screen">
      <div className="lesson-header">
        <button className="back-btn" onClick={props.onBack}>← Back</button>
        <h2>{props.language} Basics</h2>
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
              Continue →
            </button>
          )}
        </div>
      ) : (
        <div className="completion-screen">
          <div className="completion-icon">🏆</div>
          <h2>Lesson Complete!</h2>
          <p className="final-score">Your Score: {score}/{questions.length}</p>
          <p className="percentage">{Math.round((score / questions.length) * 100)}%</p>
          
          <div className="completion-actions">
            <button className="restart-btn" onClick={handleRestart}>
              Try Again
            </button>
            <button className="home-btn" onClick={props.onBack}>
              Back to Languages
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default LessonScreen;
