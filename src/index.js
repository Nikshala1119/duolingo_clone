import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { ProgressProvider } from './context/ProgressContext';
import * as serviceWorkerRegistration from './serviceWorkerRegistration';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <ProgressProvider>
      <App />
    </ProgressProvider>
  </React.StrictMode>
);

// Enable PWA - Change unregister() to register()
serviceWorkerRegistration.register();