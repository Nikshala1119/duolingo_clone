import React from 'react';
import './App.css';
import LanguageCard from './components/LanguageCard';

function App() {
  return (
    <div className="App">
      <header className="app-header">
        <h1>🦉 DuoLingo Clone</h1>
        <p>Learn languages for free, forever.</p>
      </header>

      <div className="language-grid">
        <LanguageCard 
          flag="🇪🇸"
          language="Spanish"
          description="Learn Spanish with interactive lessons"
        />
        <LanguageCard 
          flag="🇫🇷"
          language="French"
          description="Master French pronunciation and grammar"
        />
        <LanguageCard 
          flag="🇩🇪"
          language="German"
          description="Discover German language and culture"
        />
        <LanguageCard 
          flag="🇯🇵"
          language="Japanese"
          description="Learn Japanese characters and phrases"
        />
      </div>
    </div>
  );
}

export default App;