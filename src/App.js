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
            <h1>🦉 DuoLingo Clone</h1>
            <p>Learn languages for free, forever.</p>
            <button className="stats-toggle-btn" onClick={() => setShowStats(true)}>
              📊 View Stats
            </button>
          </header>

          <div className="language-grid">
            {languages.map((lang) => (
              <LanguageCard 
                key={lang.id}
                languageId={lang.id}
                flag={lang.flag}
                language={lang.name}
                description={lang.description}
                onSelect={() => handleLanguageSelect(lang)}
              />
            ))}
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