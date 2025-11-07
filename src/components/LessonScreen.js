// src/components/LessonScreen.js - UPDATED VERSION
import React, { useState, useEffect } from 'react';
import { useProgress } from '../context/ProgressContext';
import './LessonScreen.css';

/**
 * LESSON SCREEN COMPONENT - Updated for Dynamic Questions
 * 
 * This component has been updated to load questions from localStorage
 * instead of having them hardcoded. This means admins can now add/edit/delete
 * questions, and students will see those changes immediately.
 * 
 * Key Changes:
 * 1. Questions are loaded from localStorage in useEffect
 * 2. If no questions exist in localStorage, we create default ones
 * 3. Everything else works the same as before
 */
const LessonScreen = ({ language, onExit }) => {
  const { updateProgress } = useProgress();
  
  // State management
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [score, setScore] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [lessonComplete, setLessonComplete] = useState(false);
  const [xpEarned, setXpEarned] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  /**
   * Load Questions from LocalStorage
   * 
   * This useEffect runs when the component mounts or when the language changes.
   * It tries to load questions from localStorage. If none exist, it creates
   * a default set of questions.
   */
  useEffect(() => {
    loadQuestionsForLanguage();
  }, [language.name]); // Re-run if language changes

  const loadQuestionsForLanguage = () => {
    // Try to get questions from localStorage
    const savedQuestions = localStorage.getItem('duolingo_questions');
    
    if (savedQuestions) {
      const allQuestions = JSON.parse(savedQuestions);
      const languageQuestions = allQuestions[language.name] || [];
      
      if (languageQuestions.length > 0) {
        setQuestions(languageQuestions);
      } else {
        // If no questions for this language, load defaults
        loadDefaultQuestions();
      }
    } else {
      // If no questions at all in localStorage, load defaults
      loadDefaultQuestions();
    }
  };

  /**
   * Load Default Questions
   * 
   * This function creates a default set of questions for all languages.
   * It's the same data that was previously hardcoded in the component.
   */
  const loadDefaultQuestions = () => {
    const defaultQuestions = {
      Spanish: [
        {
          id: 1,
          question: "What does 'Hola' mean?",
          audioText: "Hola",
          options: ["Hello", "Goodbye", "Thank you", "Please"],
          correct: 0
        },
        {
          id: 2,
          question: "What does 'Gracias' mean?",
          audioText: "Gracias",
          options: ["Hello", "Goodbye", "Thank you", "Please"],
          correct: 2
        },
        {
          id: 3,
          question: "What does 'Adiós' mean?",
          audioText: "Adiós",
          options: ["Hello", "Goodbye", "Thank you", "Please"],
          correct: 1
        },
        {
          id: 4,
          question: "What does 'Sí' mean?",
          audioText: "Sí",
          options: ["No", "Yes", "Maybe", "Please"],
          correct: 1
        },
        {
          id: 5,
          question: "What does 'Por favor' mean?",
          audioText: "Por favor",
          options: ["Hello", "Goodbye", "Thank you", "Please"],
          correct: 3
        }
      ],
      French: [
        {
          id: 6,
          question: "What does 'Bonjour' mean?",
          audioText: "Bonjour",
          options: ["Hello", "Goodbye", "Thank you", "Please"],
          correct: 0
        },
        {
          id: 7,
          question: "What does 'Merci' mean?",
          audioText: "Merci",
          options: ["Hello", "Goodbye", "Thank you", "Please"],
          correct: 2
        },
        {
          id: 8,
          question: "What does 'Au revoir' mean?",
          audioText: "Au revoir",
          options: ["Hello", "Goodbye", "Thank you", "Please"],
          correct: 1
        },
        {
          id: 9,
          question: "What does 'S'il vous plaît' mean?",
          audioText: "S'il vous plaît",
          options: ["Hello", "Goodbye", "Thank you", "Please"],
          correct: 3
        },
        {
          id: 10,
          question: "What does 'Oui' mean?",
          audioText: "Oui",
          options: ["No", "Yes", "Maybe", "Hello"],
          correct: 1
        }
      ],
      German: [
        {
          id: 11,
          question: "What does 'Hallo' mean?",
          audioText: "Hallo",
          options: ["Hello", "Goodbye", "Thank you", "Please"],
          correct: 0
        },
        {
          id: 12,
          question: "What does 'Danke' mean?",
          audioText: "Danke",
          options: ["Hello", "Goodbye", "Thank you", "Please"],
          correct: 2
        },
        {
          id: 13,
          question: "What does 'Tschüss' mean?",
          audioText: "Tschüss",
          options: ["Hello", "Goodbye", "Thank you", "Please"],
          correct: 1
        },
        {
          id: 14,
          question: "What does 'Ja' mean?",
          audioText: "Ja",
          options: ["No", "Yes", "Maybe", "Please"],
          correct: 1
        },
        {
          id: 15,
          question: "What does 'Bitte' mean?",
          audioText: "Bitte",
          options: ["Hello", "Goodbye", "Thank you", "Please"],
          correct: 3
        }
      ],
      Japanese: [
        {
          id: 16,
          question: "What does 'こんにちは (Konnichiwa)' mean?",
          audioText: "こんにちは",
          options: ["Hello", "Goodbye", "Thank you", "Please"],
          correct: 0
        },
        {
          id: 17,
          question: "What does 'ありがとう (Arigatou)' mean?",
          audioText: "ありがとう",
          options: ["Hello", "Goodbye", "Thank you", "Please"],
          correct: 2
        },
        {
          id: 18,
          question: "What does 'さようなら (Sayounara)' mean?",
          audioText: "さようなら",
          options: ["Hello", "Goodbye", "Thank you", "Please"],
          correct: 1
        },
        {
          id: 19,
          question: "What does 'はい (Hai)' mean?",
          audioText: "はい",
          options: ["No", "Yes", "Maybe", "Hello"],
          correct: 1
        },
        {
          id: 20,
          question: "What does 'お願いします (Onegaishimasu)' mean?",
          audioText: "お願いします",
          options: ["Hello", "Goodbye", "Thank you", "Please"],
          correct: 3
        }
      ]
    };

    // Save these default questions to localStorage
    localStorage.setItem('duolingo_questions', JSON.stringify(defaultQuestions));
    
    // Set the questions for the current language
    setQuestions(defaultQuestions[language.name] || []);
  };

  /**
   * Play Audio Pronunciation
   * 
   * Uses the Web Speech API to pronounce the word in the target language.
   * This is the same functionality as before, unchanged.
   */
  const playAudio = () => {
    if ('speechSynthesis' in window && questions.length > 0) {
      setIsPlaying(true);
      
      // Cancel any ongoing speech
      window.speechSynthesis.cancel();
      
      const utterance = new SpeechSynthesisUtterance(questions[currentQuestion].audioText);
      
      // Set language-specific voice
      const langCode = {
        'Spanish': 'es-ES',
        'French': 'fr-FR',
        'German': 'de-DE',
        'Japanese': 'ja-JP'
      }[language.name] || 'en-US';
      
      utterance.lang = langCode;
      utterance.rate = 0.9; // Slightly slower for learning
      
      utterance.onend = () => setIsPlaying(false);
      utterance.onerror = () => setIsPlaying(false);
      
      window.speechSynthesis.speak(utterance);
    }
  };

  /**
   * Handle Answer Selection
   * 
   * Called when a student clicks on an answer option.
   * Checks if the answer is correct and updates the score.
   */
  const handleAnswerClick = (index) => {
    if (showResult || questions.length === 0) return;
    
    setSelectedAnswer(index);
    setShowResult(true);
    
    if (index === questions[currentQuestion].correct) {
      setScore(score + 1);
    }
  };

  /**
   * Move to Next Question
   * 
   * Advances to the next question or completes the lesson.
   */
  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowResult(false);
    } else {
      completeLesson();
    }
  };

  /**
   * Complete the Lesson
   * 
   * Called when all questions are answered.
   * Updates progress and calculates XP earned.
   */
  const completeLesson = () => {
    const earnedXP = updateProgress(language.id, {
      score: score,
      totalQuestions: questions.length
    });
    
    setXpEarned(earnedXP);
    setLessonComplete(true);
  };

  // Show loading state if questions haven't loaded yet
  if (questions.length === 0) {
    return (
      <div className="lesson-screen">
        <div className="lesson-header">
          <button onClick={onExit} className="back-button">← Back</button>
          <h2>Loading questions...</h2>
        </div>
      </div>
    );
  }

  // Show completion screen after lesson is done
  if (lessonComplete) {
    const percentage = Math.round((score / questions.length) * 100);
    
    return (
      <div className="lesson-screen">
        <div className="completion-screen">
          <h1>🎉 Lesson Complete!</h1>
          <div className="score-display">
            <div className="score-circle">
              <span className="score-percentage">{percentage}%</span>
              <span className="score-text">{score}/{questions.length} correct</span>
            </div>
          </div>
          <div className="xp-earned">
            <span className="xp-badge">+{xpEarned} XP</span>
          </div>
          <button onClick={onExit} className="continue-button">
            Continue
          </button>
        </div>
      </div>
    );
  }

  // Main lesson interface
  const question = questions[currentQuestion];
  
  return (
    <div className="lesson-screen">
      <div className="lesson-header">
        <button onClick={onExit} className="back-button">← Back</button>
        <div className="progress-bar">
          <div 
            className="progress-fill" 
            style={{ width: `${((currentQuestion + 1) / questions.length) * 100}%` }}
          />
        </div>
        <span className="question-counter">{currentQuestion + 1}/{questions.length}</span>
      </div>

      <div className="lesson-content">
        <div className="question-section">
          <h2 className="question-text">{question.question}</h2>
          <button 
            onClick={playAudio} 
            className={`audio-button ${isPlaying ? 'playing' : ''}`}
            disabled={isPlaying}
          >
            🔊 {isPlaying ? 'Playing...' : 'Listen'}
          </button>
        </div>

        <div className="options-section">
          {question.options.map((option, index) => {
            let optionClass = 'option-button';
            
            if (showResult) {
              if (index === question.correct) {
                optionClass += ' correct';
              } else if (index === selectedAnswer) {
                optionClass += ' incorrect';
              }
            }
            
            return (
              <button
                key={index}
                onClick={() => handleAnswerClick(index)}
                className={optionClass}
                disabled={showResult}
              >
                {option}
              </button>
            );
          })}
        </div>

        {showResult && (
          <div className="result-section">
            <div className={`result-message ${selectedAnswer === question.correct ? 'success' : 'error'}`}>
              {selectedAnswer === question.correct ? '✓ Correct!' : '✗ Incorrect'}
            </div>
            <button onClick={handleNextQuestion} className="next-button">
              {currentQuestion + 1 < questions.length ? 'Next Question' : 'Finish Lesson'}
            </button>
          </div>
        )}
      </div>

      <div className="score-indicator">
        Score: {score}/{currentQuestion + (showResult ? 1 : 0)}
      </div>
    </div>
  );
};

export default LessonScreen;