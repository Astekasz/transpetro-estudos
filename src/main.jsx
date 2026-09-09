import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import PasswordRecovery from './PasswordRecovery'
import TranscriptLibrary from './TranscriptLibrary'
import LessonTranscriptButtons from './LessonTranscriptButtons'
import LessonNotes from './LessonNotes'
import AnswerBalancer from './AnswerBalancer'
import ErrorNotebookDetails from './ErrorNotebookDetails'
import './styles.css'
import './lessonTranscriptButtons.css'
import './lessonNotes.css'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <PasswordRecovery />
    <LessonTranscriptButtons />
    <TranscriptLibrary />
    <LessonNotes />
    <AnswerBalancer />
    <ErrorNotebookDetails />
  </React.StrictMode>,
)
