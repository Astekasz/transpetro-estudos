import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App'
import PasswordRecovery from './PasswordRecovery'
import TranscriptLibrary from './TranscriptLibrary'
import LessonTranscriptButtons from './LessonTranscriptButtons'
import LessonNotes from './LessonNotes'
import AnswerBalancer from './AnswerBalancer'
import ErrorNotebookDetails from './ErrorNotebookDetails'
import AnswerConfirmation from './AnswerConfirmation'
import AnswerFeedbackNormalizer from './AnswerFeedbackNormalizer'
import ExtraStudyOptions from './ExtraStudyOptions'
import { questions } from './data/questions'
import { transcriptQuestions } from './data/transcriptQuestions'
import { focusedQuestions } from './data/focusedQuestions'
import './styles.css'
import './simulationSelection.css'
import './answerConfirmation.css'
import './lessonTranscriptButtons.css'
import './lessonNotes.css'

const existingQuestionIds = new Set(questions.map(question => question.id))
;[...transcriptQuestions, ...focusedQuestions].forEach(question => {
  if (!existingQuestionIds.has(question.id)) {
    questions.push(question)
    existingQuestionIds.add(question.id)
  }
})

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <PasswordRecovery />
    <LessonTranscriptButtons />
    <TranscriptLibrary />
    <LessonNotes />
    <AnswerBalancer />
    <ErrorNotebookDetails />
    <AnswerConfirmation />
    <AnswerFeedbackNormalizer />
    <ExtraStudyOptions />
  </React.StrictMode>,
)