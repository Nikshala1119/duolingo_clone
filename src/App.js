import React, { useState } from 'react';
import './App.css';
import LanguageCard from './components/LanguageCard';
import LessonScreen from './components/LessonScreen';
import StatsDashboard from './components/StatsDashboard';
import InstallPrompt from './components/InstallPrompt';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);
  const [showStats, setShowStats] = useState(false);

  const languages = [
    {
      id: 'spanish',
      flag: '🇪🇸',
      name: 'Spanish',
      description: 'Learn Spanish with interactive lessons'
    },
    {
      id: 'french',
      flag: '🇫🇷',
      name: 'French',
      description: 'Master French pronunciation and grammar'
    },
    {
      id: 'german',
      flag: '🇩🇪',
      name: 'German',
      description: 'Discover German language and culture'
    },
    {
      id: 'japanese',
      flag: '🇯🇵',
      name: 'Japanese',
      description: 'Learn Japanese characters and phrases'
    }
  ];

  const handleLanguageSelect = (language) => {
    setSelectedLanguage(language);
  };

  const handleBack = () => {
    setSelectedLanguage(null);
  };

  return (
    <div className="App">
      <InstallPrompt />
      
      {!selectedLanguage && !showStats && (
        <>
          <header className="app-header">
            <div className="header-content">
              <div className="header-title">
                <h1>🦉 Duolingo</h1>
                <p>Learn languages for free, forever.</p>
              </div>
              <div className="header-actions">
                <button className="stats-toggle-btn" onClick={() => setShowStats(true)}>
                  📊 Stats
                </button>
              </div>
            </div>
          </header>

          <div className="learning-path-container">
            <div className="path-title">
              <h2>Your Learning Path</h2>
              <p>Choose a language to start your journey</p>
            </div>
            <div className="learning-path">
              {languages.map((lang, index) => (
                <React.Fragment key={lang.id}>
                  <div className="path-node">
                    <LanguageCard
                      languageId={lang.id}
                      flag={lang.flag}
                      language={lang.name}
                      description={lang.description}
                      onSelect={() => handleLanguageSelect(lang)}
                    />
                  </div>
                  {index < languages.length - 1 && (
                    <div className="path-connector"></div>
                  )}
                </React.Fragment>
              ))}
            </div>
          </div>
        </>
      )}

      {showStats && (
        <>
          <StatsDashboard />
          <div style={{textAlign: 'center', marginTop: '20px'}}>
            <button 
              className="back-to-home-btn" 
              onClick={() => setShowStats(false)}
            >
              ← Back to Languages
            </button>
          </div>
        </>
      )}

      {selectedLanguage && (
        <LessonScreen 
          language={selectedLanguage.name}
          languageId={selectedLanguage.id}
          onBack={handleBack}
        />
      )}
    </div>
  );
}

export default App;