// src/components/AdminDashboard.js
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { useProgress } from '../context/ProgressContext';
import './AdminDashboard.css';

/**
 * ADMIN DASHBOARD COMPONENT
 * 
 * This is the main control center for admins. Think of it like the cockpit of an airplane -
 * it gives you all the controls and information you need to manage the application.
 * 
 * Key Concepts Demonstrated:
 * 1. Multiple useState hooks for managing different pieces of state
 * 2. useEffect for loading data when component mounts
 * 3. Conditional rendering (showing different views based on state)
 * 4. Form handling with controlled components
 * 5. CRUD operations (Create, Read, Update, Delete)
 */
const AdminDashboard = () => {
  const { logout } = useAuth();
  const { progress } = useProgress();
  
  // Navigation state - which tab is currently active
  const [activeTab, setActiveTab] = useState('questions'); // 'questions' or 'students'
  
  // Questions management state
  const [questions, setQuestions] = useState({});
  const [selectedLanguage, setSelectedLanguage] = useState('Spanish');
  const [editingQuestion, setEditingQuestion] = useState(null);
  
  // Form state for adding/editing questions
  // Each field in the form has its own state variable
  const [formData, setFormData] = useState({
    question: '',
    audioText: '',
    option1: '',
    option2: '',
    option3: '',
    option4: '',
    correct: 0
  });

  /**
   * useEffect Hook - Loading Questions from LocalStorage
   * 
   * This hook runs when the component first appears on screen (mounts).
   * It's like setting up your workspace when you arrive at your desk in the morning.
   * 
   * The empty array [] at the end means "only run this once when component mounts"
   */
  useEffect(() => {
    const savedQuestions = localStorage.getItem('duolingo_questions');
    if (savedQuestions) {
      // JSON.parse converts the stored string back into a JavaScript object
      setQuestions(JSON.parse(savedQuestions));
    } else {
      // If no questions exist, load the default questions
      loadDefaultQuestions();
    }
  }, []);

  /**
   * Load Default Questions
   * 
   * This provides starter content so the app works out of the box.
   * In a real application, these would come from a database on your server.
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
    
    setQuestions(defaultQuestions);
    saveQuestionsToStorage(defaultQuestions);
  };

  /**
   * Save Questions to LocalStorage
   * 
   * Whenever we modify questions, we save them to localStorage.
   * This is like clicking "Save" in a document - it persists the changes.
   * 
   * JSON.stringify converts the JavaScript object into a string that can be stored.
   */
  const saveQuestionsToStorage = (questionsData) => {
    localStorage.setItem('duolingo_questions', JSON.stringify(questionsData));
  };

  /**
   * Handle Form Input Changes
   * 
   * This is a "generic" change handler. Instead of writing separate functions
   * for each input field, we use one function that works for all of them.
   * 
   * The "name" attribute of each input tells us which field is being changed.
   * We use the spread operator (...) to copy all existing form data,
   * then we update just the one field that changed.
   */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  /**
   * Add New Question
   * 
   * This demonstrates the "Create" part of CRUD.
   * We create a new question object and add it to our questions array.
   */
  const handleAddQuestion = (e) => {
    e.preventDefault();
    
    // Create a new question object
    const newQuestion = {
      id: Date.now(), // Use timestamp as a simple unique ID
      question: formData.question,
      audioText: formData.audioText,
      options: [
        formData.option1,
        formData.option2,
        formData.option3,
        formData.option4
      ],
      correct: parseInt(formData.correct)
    };
    
    // Add the new question to the selected language's question array
    const updatedQuestions = {
      ...questions,
      [selectedLanguage]: [
        ...(questions[selectedLanguage] || []),
        newQuestion
      ]
    };
    
    setQuestions(updatedQuestions);
    saveQuestionsToStorage(updatedQuestions);
    
    // Reset the form to empty values
    resetForm();
    
    alert('Question added successfully!');
  };

  /**
   * Edit Question
   * 
   * This demonstrates the "Update" part of CRUD.
   * We find the question by its ID and replace it with updated data.
   */
  const handleEditQuestion = (e) => {
    e.preventDefault();
    
    const updatedQuestion = {
      id: editingQuestion.id,
      question: formData.question,
      audioText: formData.audioText,
      options: [
        formData.option1,
        formData.option2,
        formData.option3,
        formData.option4
      ],
      correct: parseInt(formData.correct)
    };
    
    // Map through all questions and replace the one being edited
    const updatedQuestions = {
      ...questions,
      [selectedLanguage]: questions[selectedLanguage].map(q =>
        q.id === editingQuestion.id ? updatedQuestion : q
      )
    };
    
    setQuestions(updatedQuestions);
    saveQuestionsToStorage(updatedQuestions);
    setEditingQuestion(null);
    resetForm();
    
    alert('Question updated successfully!');
  };

  /**
   * Delete Question
   * 
   * This demonstrates the "Delete" part of CRUD.
   * We filter out the question with the matching ID.
   */
  const handleDeleteQuestion = (questionId) => {
    // Ask for confirmation before deleting (safety measure)
    if (!window.confirm('Are you sure you want to delete this question?')) {
      return;
    }
    
    // Filter keeps all questions except the one with matching ID
    const updatedQuestions = {
      ...questions,
      [selectedLanguage]: questions[selectedLanguage].filter(
        q => q.id !== questionId
      )
    };
    
    setQuestions(updatedQuestions);
    saveQuestionsToStorage(updatedQuestions);
    
    alert('Question deleted successfully!');
  };

  /**
   * Start Editing a Question
   * 
   * When you click "Edit" on a question, we populate the form with that question's data.
   * This allows you to see what you're editing and make changes.
   */
  const startEditQuestion = (question) => {
    setEditingQuestion(question);
    setFormData({
      question: question.question,
      audioText: question.audioText,
      option1: question.options[0],
      option2: question.options[1],
      option3: question.options[2],
      option4: question.options[3],
      correct: question.correct
    });
  };

  /**
   * Reset Form
   * 
   * Clears all form fields back to empty values.
   * Used after adding/editing a question or canceling an edit.
   */
  const resetForm = () => {
    setFormData({
      question: '',
      audioText: '',
      option1: '',
      option2: '',
      option3: '',
      option4: '',
      correct: 0
    });
    setEditingQuestion(null);
  };

  /**
   * Get Student Statistics
   * 
   * This processes the progress data to show useful information about students.
   * In a real app, each student would have their own account and data.
   */
  const getStudentStats = () => {
    // Since we don't have individual student accounts yet, we show aggregate stats
    const languages = ['spanish', 'french', 'german', 'japanese'];
    
    return languages.map(lang => {
      const langProgress = progress[lang];
      if (!langProgress) return null;
      
      return {
        language: lang.charAt(0).toUpperCase() + lang.slice(1),
        completedLessons: langProgress.completedLessons || 0,
        highScore: langProgress.highScore || 0,
        lastCompleted: langProgress.lastCompleted
          ? new Date(langProgress.lastCompleted).toLocaleDateString()
          : 'Never'
      };
    }).filter(Boolean); // Remove null entries
  };

  // Render the component
  return (
    <div className="admin-dashboard">
      {/* Header with logout button */}
      <div className="admin-header">
        <h1>🎓 Admin Dashboard</h1>
        <button onClick={logout} className="logout-button">
          Logout
        </button>
      </div>

      {/* Tab Navigation */}
      <div className="admin-tabs">
        <button
          className={`tab-button ${activeTab === 'questions' ? 'active' : ''}`}
          onClick={() => setActiveTab('questions')}
        >
          📝 Manage Questions
        </button>
        <button
          className={`tab-button ${activeTab === 'students' ? 'active' : ''}`}
          onClick={() => setActiveTab('students')}
        >
          👥 View Students
        </button>
      </div>

      {/* Questions Management Tab */}
      {activeTab === 'questions' && (
        <div className="admin-content">
          {/* Language Selector */}
          <div className="language-selector">
            <label>Select Language:</label>
            <select
              value={selectedLanguage}
              onChange={(e) => {
                setSelectedLanguage(e.target.value);
                resetForm(); // Clear form when switching languages
              }}
            >
              <option value="Spanish">Spanish 🇪🇸</option>
              <option value="French">French 🇫🇷</option>
              <option value="German">German 🇩🇪</option>
              <option value="Japanese">Japanese 🇯🇵</option>
            </select>
          </div>

          {/* Add/Edit Question Form */}
          <div className="question-form-container">
            <h2>{editingQuestion ? 'Edit Question' : 'Add New Question'}</h2>
            <form onSubmit={editingQuestion ? handleEditQuestion : handleAddQuestion}>
              <div className="form-row">
                <div className="form-group">
                  <label>Question Text *</label>
                  <input
                    type="text"
                    name="question"
                    value={formData.question}
                    onChange={handleInputChange}
                    placeholder="e.g., What does 'Hola' mean?"
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Audio Text (for pronunciation) *</label>
                  <input
                    type="text"
                    name="audioText"
                    value={formData.audioText}
                    onChange={handleInputChange}
                    placeholder="e.g., Hola"
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Option 1 *</label>
                  <input
                    type="text"
                    name="option1"
                    value={formData.option1}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Option 2 *</label>
                  <input
                    type="text"
                    name="option2"
                    value={formData.option2}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Option 3 *</label>
                  <input
                    type="text"
                    name="option3"
                    value={formData.option3}
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Option 4 *</label>
                  <input
                    type="text"
                    name="option4"
                    value={formData.option4}
                    onChange={handleInputChange}
                    required
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Correct Answer *</label>
                <select
                  name="correct"
                  value={formData.correct}
                  onChange={handleInputChange}
                  required
                >
                  <option value={0}>Option 1</option>
                  <option value={1}>Option 2</option>
                  <option value={2}>Option 3</option>
                  <option value={3}>Option 4</option>
                </select>
              </div>

              <div className="form-actions">
                <button type="submit" className="btn-primary">
                  {editingQuestion ? 'Update Question' : 'Add Question'}
                </button>
                {editingQuestion && (
                  <button type="button" onClick={resetForm} className="btn-secondary">
                    Cancel
                  </button>
                )}
              </div>
            </form>
          </div>

          {/* Questions List */}
          <div className="questions-list">
            <h2>Existing Questions ({(questions[selectedLanguage] || []).length})</h2>
            {(questions[selectedLanguage] || []).length === 0 ? (
              <p className="no-questions">No questions available for this language.</p>
            ) : (
              <div className="questions-grid">
                {questions[selectedLanguage].map((q, index) => (
                  <div key={q.id} className="question-card">
                    <div className="question-number">Question {index + 1}</div>
                    <div className="question-text">{q.question}</div>
                    <div className="question-audio">🔊 {q.audioText}</div>
                    <div className="question-options">
                      {q.options.map((opt, i) => (
                        <div
                          key={i}
                          className={`option ${i === q.correct ? 'correct' : ''}`}
                        >
                          {i === q.correct && '✓ '}
                          {opt}
                        </div>
                      ))}
                    </div>
                    <div className="question-actions">
                      <button
                        onClick={() => startEditQuestion(q)}
                        className="btn-edit"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDeleteQuestion(q.id)}
                        className="btn-delete"
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}

      {/* Students Tab */}
      {activeTab === 'students' && (
        <div className="admin-content">
          <h2>Student Progress Overview</h2>
          <p className="students-note">
            Note: In the current version, progress is tracked locally. 
            Future versions will include individual student accounts.
          </p>
          
          <div className="students-stats">
            {getStudentStats().length === 0 ? (
              <p className="no-stats">No student activity yet.</p>
            ) : (
              <table className="stats-table">
                <thead>
                  <tr>
                    <th>Language</th>
                    <th>Lessons Completed</th>
                    <th>High Score</th>
                    <th>Last Activity</th>
                  </tr>
                </thead>
                <tbody>
                  {getStudentStats().map((stat, index) => (
                    <tr key={index}>
                      <td>{stat.language}</td>
                      <td>{stat.completedLessons}</td>
                      <td>{stat.highScore}%</td>
                      <td>{stat.lastCompleted}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminDashboard;