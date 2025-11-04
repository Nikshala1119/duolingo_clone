import React from 'react';
import './LanguageCard.css';

function LanguageCard(props) {
  return (
    <div className="language-card" onClick={props.onSelect}>
      <div className="language-flag">{props.flag}</div>
      <h3>{props.language}</h3>
      <p>{props.description}</p>
      <button className="start-btn">Start Learning</button>
    </div>
  );
}

export default LanguageCard;