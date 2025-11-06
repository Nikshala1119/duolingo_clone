# Duolingo Clone - Project Documentation

## Table of Contents
1. [Project Overview](#project-overview)
2. [Technology Stack](#technology-stack)
3. [Project Structure](#project-structure)
4. [Core Features](#core-features)
5. [Component Architecture](#component-architecture)
6. [State Management](#state-management)
7. [Data Models](#data-models)
8. [Progressive Web App (PWA)](#progressive-web-app-pwa)
9. [Installation & Setup](#installation--setup)
10. [Available Scripts](#available-scripts)
11. [Future Enhancements](#future-enhancements)

---

## Project Overview

**Duolingo Clone** is a language learning web application inspired by Duolingo. It provides interactive lessons for multiple languages with a gamified learning experience. The application features progress tracking, XP rewards, audio pronunciation, and a beautiful, mobile-responsive UI that follows Duolingo's design principles.

### Key Highlights
- 4 supported languages: Spanish, French, German, and Japanese
- Interactive quiz-based lessons
- Text-to-Speech pronunciation support
- Progress tracking with XP rewards
- Statistics dashboard
- Fully responsive mobile-first design
- Progressive Web App (PWA) with offline capabilities
- Local storage persistence for user progress

---

## Technology Stack

### Core Technologies
- **React 19.2.0** - UI framework
- **React DOM 19.2.0** - DOM rendering
- **Create React App 5.0.1** - Build tooling and configuration

### Development & Testing
- **@testing-library/react 16.3.0** - Component testing
- **@testing-library/jest-dom 6.9.1** - DOM testing utilities
- **@testing-library/user-event 13.5.0** - User interaction simulation

### Web APIs
- **Web Speech API** - Text-to-speech functionality
- **Service Worker API** - PWA offline capabilities
- **LocalStorage API** - Progress persistence
- **beforeinstallprompt API** - PWA installation

### Build Tools
- **Webpack** (via Create React App)
- **Babel** (via Create React App)
- **ESLint** (via Create React App)

---

## Project Structure

```
duolingo_clone/
├── public/
│   ├── favicon.ico
│   ├── index.html
│   ├── logo192.png
│   ├── logo512.png
│   ├── manifest.json          # PWA manifest configuration
│   ├── robots.txt
│   └── service-worker.js      # Service worker for offline support
│
├── src/
│   ├── components/
│   │   ├── InstallPrompt.js       # PWA installation prompt component
│   │   ├── InstallPrompt.css
│   │   ├── LanguageCard.js        # Language selection card component
│   │   ├── LanguageCard.css
│   │   ├── LessonScreen.js        # Main lesson/quiz interface
│   │   ├── LessonScreen.css
│   │   ├── StatsDashboard.js      # User statistics dashboard
│   │   └── StatsDashboard.css
│   │
│   ├── context/
│   │   └── ProgressContext.js     # Global state management for progress
│   │
│   ├── App.js                     # Main application component
│   ├── App.css                    # Main application styles
│   ├── App.test.js                # Application tests
│   ├── index.js                   # Application entry point
│   ├── index.css                  # Global styles
│   ├── serviceWorkerRegistration.js  # PWA service worker registration
│   ├── reportWebVitals.js         # Performance monitoring
│   └── setupTests.js              # Test configuration
│
├── package.json                   # Project dependencies and scripts
├── package-lock.json
└── README.md
```

---

## Core Features

### 1. Multi-Language Support
The application supports learning four languages:
- **Spanish** (🇪🇸)
- **French** (🇫🇷)
- **German** (🇩🇪)
- **Japanese** (🇯🇵)

Each language has its own set of vocabulary lessons focused on basic greetings and common phrases.

### 2. Interactive Lessons
**File:** `src/components/LessonScreen.js`

- **Quiz-based learning:** Multiple-choice questions with 4 options
- **5 questions per lesson** covering basic vocabulary
- **Immediate feedback:** Visual indicators for correct/incorrect answers
- **Score tracking:** Real-time score display during lessons
- **Progress bar:** Visual representation of lesson completion

### 3. Audio Pronunciation
**Implementation:** `src/components/LessonScreen.js:17-42`

- **Text-to-Speech integration** using Web Speech API
- **Language-specific pronunciation:**
  - Spanish: `es-ES`
  - French: `fr-FR`
  - German: `de-DE`
  - Japanese: `ja-JP`
- **Interactive audio button** with visual feedback
- **Adjustable speech rate** (0.9x speed for learning)

### 4. Progress Tracking System
**File:** `src/context/ProgressContext.js`

Features:
- **XP (Experience Points) system:** 10 XP per correct answer
- **Per-language tracking:**
  - Last score achieved
  - High score record
  - Total lessons completed
  - Last completion timestamp
- **LocalStorage persistence:** Progress survives browser refreshes
- **Reset functionality:** Clear all progress with confirmation

### 5. Statistics Dashboard
**File:** `src/components/StatsDashboard.js`

Displays comprehensive user statistics:
- **Total XP earned** across all languages
- **Total lessons completed**
- **Total correct answers**
- **Number of languages started**
- **Per-language progress breakdown** with progress bars
- **High score tracking** for each language

### 6. Language Selection Interface
**File:** `src/components/LanguageCard.js`

- **Visual language cards** with flag emojis
- **Progress preview** showing high scores and completed lessons
- **Dynamic button text:** "Start" for new languages, "Continue" for in-progress
- **Duolingo-inspired visual design**

### 7. Progressive Web App (PWA)
**Files:** `public/manifest.json`, `src/serviceWorkerRegistration.js`, `src/components/InstallPrompt.js`

PWA features:
- **Installable application:** Can be added to home screen
- **Offline capability:** Service worker caching
- **Native app experience:** Standalone display mode
- **Custom install prompt:** User-friendly installation interface
- **App icons:** 192x192 and 512x512 logos
- **Theme colors:** Custom brand colors (#667eea)

---

## Component Architecture

### Main Application Component
**File:** `src/App.js`

The root component manages the application's primary navigation:
- **State management:**
  - `selectedLanguage`: Currently active language for lessons
  - `showStats`: Toggle between language selection and statistics
- **Three main views:**
  1. Language selection screen (default)
  2. Lesson screen (when language selected)
  3. Statistics dashboard (when stats button clicked)
- **Navigation flow:** Seamless transitions between views

### Component Hierarchy

```
App (src/App.js)
├── InstallPrompt (PWA installation banner)
├── LanguageCard (x4, one per language)
│   └── ProgressContext consumer (displays progress)
├── LessonScreen (conditional render)
│   └── ProgressContext consumer (updates progress)
└── StatsDashboard (conditional render)
    └── ProgressContext consumer (displays all stats)
```

---

## State Management

### Global State: ProgressContext
**File:** `src/context/ProgressContext.js`

The application uses React Context API for global state management.

#### Context Provider Setup
```javascript
// src/index.js:11-13
<ProgressProvider>
  <App />
</ProgressProvider>
```

#### State Structure
```javascript
{
  progress: {
    [languageId]: {
      lastScore: number,          // Most recent lesson score
      totalQuestions: number,     // Total questions in last lesson
      completedLessons: number,   // Total lessons completed
      lastCompleted: string,      // ISO timestamp
      highScore: number          // Best score achieved
    }
  },
  totalXP: number               // Total XP across all languages
}
```

#### Context API Methods

1. **`updateProgress(languageId, lessonData)`**
   - Updates lesson completion data
   - Calculates and awards XP
   - Updates high score if improved
   - Returns XP earned
   - **Usage:** `src/components/LessonScreen.js:89`, `src/components/LessonScreen.js:100`

2. **`getLanguageProgress(languageId)`**
   - Retrieves progress data for a specific language
   - Returns null if no progress exists
   - **Usage:** `src/components/LanguageCard.js:7`

3. **`resetProgress()`**
   - Clears all progress with user confirmation
   - Removes localStorage entries
   - Resets state to initial values
   - **Usage:** `src/components/StatsDashboard.js:20`

#### Persistence Strategy
- **Storage:** Browser localStorage
- **Keys:**
  - `duolingo_progress`: JSON-serialized progress object
  - `duolingo_xp`: Total XP as string
- **Load on mount:** `src/context/ProgressContext.js:10-21`
- **Save on change:** `src/context/ProgressContext.js:24-30`

---

## Data Models

### Language Object
**Defined in:** `src/App.js:12-37`

```javascript
{
  id: string,           // Unique identifier (e.g., 'spanish')
  flag: string,         // Emoji flag (e.g., '🇪🇸')
  name: string,         // Display name (e.g., 'Spanish')
  description: string   // Short description
}
```

### Question Object
**Defined in:** `src/components/LessonScreen.js:45-77`

```javascript
{
  question: string,     // Question text (e.g., "What does 'Hola' mean?")
  audioText: string,    // Text to be spoken (e.g., "Hola")
  options: string[],    // Array of 4 answer choices
  correct: number       // Index of correct answer (0-3)
}
```

### Question Bank Structure
**Implemented in:** `src/components/LessonScreen.js:44-77`

```javascript
{
  Spanish: [Question, Question, ...],  // 5 questions
  French: [Question, Question, ...],   // 5 questions
  German: [Question, Question, ...],   // 5 questions
  Japanese: [Question, Question, ...]  // 5 questions
}
```

### Sample Questions by Language

#### Spanish
1. "What does 'Hola' mean?" → Hello
2. "What does 'Gracias' mean?" → Thank you
3. "What does 'Adiós' mean?" → Goodbye
4. "What does 'Sí' mean?" → Yes
5. "What does 'Por favor' mean?" → Please

#### French
1. "What does 'Bonjour' mean?" → Hello
2. "What does 'Merci' mean?" → Thank you
3. "What does 'Au revoir' mean?" → Goodbye
4. "What does 'S'il vous plaît' mean?" → Please
5. "What does 'Oui' mean?" → Yes

#### German
1. "What does 'Hallo' mean?" → Hello
2. "What does 'Danke' mean?" → Thank you
3. "What does 'Tschüss' mean?" → Goodbye
4. "What does 'Ja' mean?" → Yes
5. "What does 'Bitte' mean?" → Please

#### Japanese
1. "What does 'こんにちは (Konnichiwa)' mean?" → Hello
2. "What does 'ありがとう (Arigatou)' mean?" → Thank you
3. "What does 'さようなら (Sayounara)' mean?" → Goodbye
4. "What does 'はい (Hai)' mean?" → Yes
5. "What does 'お願いします (Onegaishimasu)' mean?" → Please

---

## Progressive Web App (PWA)

### PWA Configuration
**File:** `public/manifest.json`

```json
{
  "short_name": "DuoLingo",
  "name": "DuoLingo Clone - Learn Languages",
  "display": "standalone",
  "theme_color": "#667eea",
  "background_color": "#667eea",
  "orientation": "portrait-primary",
  "categories": ["education", "productivity"]
}
```

### Service Worker Implementation
**File:** `src/serviceWorkerRegistration.js`

Features:
- **Cache-first strategy** for offline functionality
- **Update detection** with user notification
- **Localhost detection** for development
- **Error handling** for service worker registration
- **Enabled by default:** `src/index.js:18`

### Installation Prompt Component
**File:** `src/components/InstallPrompt.js`

Implements custom PWA installation flow:
1. **Listens for `beforeinstallprompt` event**
2. **Stores deferred prompt** for manual triggering
3. **Displays custom install banner** with app branding
4. **User actions:**
   - Install: Triggers native install prompt
   - Dismiss: Hides the banner
5. **Auto-hides after installation**

### PWA Benefits
- **Offline access:** Continue learning without internet
- **Fast loading:** Cached resources load instantly
- **Home screen access:** Native app-like experience
- **No app store required:** Direct web installation
- **Automatic updates:** Always use latest version

---

## Installation & Setup

### Prerequisites
- **Node.js** (v14 or higher recommended)
- **npm** (comes with Node.js)

### Installation Steps

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd duolingo_clone
   ```

2. **Install dependencies:**
   ```bash
   npm install
   ```

3. **Start development server:**
   ```bash
   npm start
   ```
   - Opens browser at `http://localhost:3000`
   - Hot-reloading enabled
   - See lint errors in console

4. **Build for production:**
   ```bash
   npm run build
   ```
   - Creates optimized build in `build/` folder
   - Minified and hashed filenames
   - Ready for deployment

---

## Available Scripts

### `npm start`
- Runs the app in development mode
- Opens `http://localhost:3000` in browser
- Hot-reloading on file changes
- Displays lint errors in console

### `npm test`
- Launches test runner in interactive watch mode
- Runs all test files matching `*.test.js`
- Re-runs tests on file changes
- Uses Jest and React Testing Library

### `npm run build`
- Creates production-optimized build
- Output directory: `build/`
- Minifies code for performance
- Adds content hashes to filenames
- Optimizes for best performance
- Ready for deployment to any static host

### `npm run eject`
**Warning:** One-way operation - cannot be undone!
- Exposes all configuration files
- Full control over webpack, Babel, ESLint
- Only use if customization is required

---

## Future Enhancements

### Potential Features
1. **More languages:** Add additional language options
2. **Lesson diversity:** Different question types (fill-in-the-blank, matching, etc.)
3. **Difficulty levels:** Beginner, intermediate, advanced lessons
4. **Daily streak tracking:** Encourage consistent learning
5. **Leaderboards:** Social competition features
6. **Voice recognition:** Practice speaking with speech-to-text
7. **Grammar lessons:** Beyond vocabulary
8. **Sentence construction:** Drag-and-drop word ordering
9. **User accounts:** Cloud synchronization across devices
10. **Achievements system:** Badges and unlockables
11. **Practice mode:** Review incorrect answers
12. **Timed challenges:** Speed-based learning games
13. **Lesson notes:** In-lesson tips and explanations
14. **Custom study sets:** User-created lessons

### Technical Improvements
1. **Backend integration:** User authentication and data persistence
2. **Database:** Store lessons and progress in cloud
3. **API integration:** Real translation services
4. **Analytics:** Track learning patterns and effectiveness
5. **Accessibility:** Enhanced screen reader support, keyboard navigation
6. **Internationalization:** UI translations for non-English speakers
7. **Performance optimization:** Code splitting, lazy loading
8. **Advanced PWA features:** Push notifications for study reminders
9. **Testing:** Comprehensive unit and integration tests
10. **CI/CD:** Automated deployment pipeline

---

## Code Quality & Best Practices

### React Best Practices Implemented
- **Functional components** with React Hooks
- **Context API** for global state management
- **Component composition** for reusability
- **Controlled components** for form inputs
- **Proper key props** in list rendering
- **Effect cleanup** in useEffect hooks
- **Prop validation** via PropTypes (recommended addition)

### File Organization
- **Component colocation:** CSS files next to components
- **Logical grouping:** Components, contexts in separate folders
- **Consistent naming:** PascalCase for components, camelCase for functions

### Performance Considerations
- **LocalStorage** for fast data access
- **Minimal re-renders** with proper state management
- **Service worker caching** for instant loads
- **Lazy loading** potential for future scaling

---

## Browser Compatibility

### Target Browsers (from package.json)

**Production:**
- Browser market share > 0.2%
- Not dead browsers
- Excludes Opera Mini

**Development:**
- Latest Chrome version
- Latest Firefox version
- Latest Safari version

### Required Browser Features
- ES6+ JavaScript support
- Web Speech API (for audio features)
- Service Workers (for PWA)
- LocalStorage API
- Fetch API
- beforeinstallprompt event (for PWA install)

---

## License & Credits

This is an educational project inspired by Duolingo. All design and functionality are created for learning purposes.

**Built with:**
- React
- Create React App
- Web APIs (Speech Synthesis, Service Workers, LocalStorage)

---

## Conclusion

The **Duolingo Clone** demonstrates a fully functional language learning application with modern web technologies. It showcases:
- React component architecture and hooks
- Progressive Web App implementation
- State management with Context API
- Web API integration (Speech, Service Workers)
- Mobile-first responsive design
- Persistent local storage

The application is production-ready and can be extended with additional features, backend integration, and enhanced learning tools.

**For questions or contributions, please refer to the repository's issue tracker and pull request guidelines.**
