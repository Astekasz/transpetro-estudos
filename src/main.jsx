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
import OptionEliminator from './OptionEliminator'
import AnswerFeedbackNormalizer from './AnswerFeedbackNormalizer'
import ExtraStudyOptions from './ExtraStudyOptions'
import LastExamTab from './LastExamTab'
import ExamRetakeButton from './ExamRetakeButton'
import { cloudEnabled, supabase } from './supabase'
import { questions } from './data/questions'
import { transcriptQuestions } from './data/transcriptQuestions'
import { focusedQuestions } from './data/focusedQuestions'
import './styles.css'
import './simulationSelection.css'
import './answerConfirmation.css'
import './optionEliminator.css'
import './lessonTranscriptButtons.css'
import './lessonNotes.css'
import './lastExam.css'
import './examRetake.css'

const existingQuestionIds = new Set(questions.map(question => question.id))
;[...transcriptQuestions, ...focusedQuestions].forEach(question => {
  if (!existingQuestionIds.has(question.id)) {
    questions.push(question)
    existingQuestionIds.add(question.id)
  }
})

// As questões das degravações e as inspiradas na última prova recebem destaque
// dentro de cada grupo de prioridade. A prioridade principal da aba Questões passa
// a ser: ainda não respondidas primeiro; respondidas depois.
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

const baseQuestionOrder = new Map(questions.map((question, index) => [question.id, index]))

function prioritizeUnanswered(answeredIds) {
  questions.sort((a, b) => {
    const aAnswered = answeredIds.has(a.id) ? 1 : 0
    const bAnswered = answeredIds.has(b.id) ? 1 : 0
    if (aAnswered !== bAnswered) return aAnswered - bAnswered
    return (baseQuestionOrder.get(a.id) ?? 0) - (baseQuestionOrder.get(b.id) ?? 0)
  })
}

function readLocalAnsweredIds() {
  try {
    const stored = JSON.parse(localStorage.getItem('tp_answers') || '{}')
    return new Set(Object.keys(stored))
  } catch {
    return new Set()
  }
}

function Root() {
  const [ready, setReady] = React.useState(false)
  const [, refreshQuestionOrder] = React.useState(0)
  const answeredIdsRef = React.useRef(new Set())

  React.useEffect(() => {
    let cancelled = false

    async function loadAnsweredQuestions() {
      let answeredIds = readLocalAnsweredIds()

      if (cloudEnabled) {
        const { data: sessionData } = await supabase.auth.getSession()
        const user = sessionData.session?.user
        if (user) {
          const { data: rows, error } = await supabase
            .from('answers')
            .select('question_id')
            .eq('user_id', user.id)

          if (!error) answeredIds = new Set((rows || []).map(row => row.question_id))
        }
      }

      if (cancelled) return
      answeredIdsRef.current = answeredIds
      prioritizeUnanswered(answeredIds)
      setReady(true)
    }

    loadAnsweredQuestions()
    return () => { cancelled = true }
  }, [])

  React.useEffect(() => {
    if (!ready) return

    function handleQuestionAnswer(event) {
      if (event.target.closest('.option-eliminate')) return

      const option = event.target.closest('.question-card .options button')
      if (!option || option.disabled) return

      const card = option.closest('.question-card')
      if (!card || card.closest('.last-exam-panel')) return

      const statement = card.querySelector('h3')?.textContent?.trim()
      if (!statement) return

      const question = questions.find(item => item.statement.trim() === statement)
      if (!question) return

      answeredIdsRef.current.add(question.id)
      setTimeout(() => {
        prioritizeUnanswered(answeredIdsRef.current)
        refreshQuestionOrder(value => value + 1)
      }, 0)
    }

    document.addEventListener('click', handleQuestionAnswer)
    return () => document.removeEventListener('click', handleQuestionAnswer)
  }, [ready])

  if (!ready) return null

  return <>
    <App />
    <PasswordRecovery />
    <LessonTranscriptButtons />
    <TranscriptLibrary />
    <LessonNotes />
    <AnswerBalancer />
    <ErrorNotebookDetails />
    <AnswerConfirmation />
    <OptionEliminator />
    <AnswerFeedbackNormalizer />
    <ExtraStudyOptions />
    <LastExamTab />
    <ExamRetakeButton />
  </>
}

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Root />
  </React.StrictMode>,
)
