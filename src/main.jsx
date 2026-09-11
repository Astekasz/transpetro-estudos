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

// As questões das degravações e as inspiradas na última prova recebem destaque
// nos blocos que respeitam a ordem do banco (Questões e blocos do Estudar hoje).
// Elas são intercaladas para manter uma mistura equilibrada das duas fontes.
const transcriptBased = questions.filter(question => question.sourceType?.includes('degravação'))
const transpetroBased = questions.filter(question => question.sourceType?.includes('Transpetro 2023'))
const regularQuestions = questions.filter(question => !question.sourceType?.includes('degravação') && !question.sourceType?.includes('Transpetro 2023'))
const prioritizedQuestions = []
const priorityLength = Math.max(transcriptBased.length, transpetroBased.length)
for (let index = 0; index < priorityLength; index += 1) {
  if (transcriptBased[index]) prioritizedQuestions.push(transcriptBased[index])
  if (transpetroBased[index]) prioritizedQuestions.push(transpetroBased[index])
}
questions.splice(0, questions.length, ...prioritizedQuestions, ...regularQuestions)

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