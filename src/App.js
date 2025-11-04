import React, { useState } from 'react';
import './App.css';
import LanguageCard from './components/LanguageCard';
import LessonScreen from './components/LessonScreen';

function App() {
  const [selectedLanguage, setSelectedLanguage] = useState(null);

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
      {!selectedLanguage ? (
        <>
          <header className="app-header">
            <h1>🦉 DuoLingo Clone</h1>
            <p>Learn languages for free, forever.</p>
          </header>

          <div className="language-grid">
            {languages.map((lang) => (
              <LanguageCard 
                key={lang.id}
                flag={lang.flag}
                language={lang.name}
                description={lang.description}
                onSelect={() => handleLanguageSelect(lang)}
              />
            ))}
          </div>
        </>
      ) : (
        <LessonScreen 
          language={selectedLanguage.name}
          onBack={handleBack}
        />
      )}
    </div>
  );
}

export default App;