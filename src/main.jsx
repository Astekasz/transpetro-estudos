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
import { examTopicQuestions } from './data/examTopicQuestions'
import { applyErrorDrivenStudyMode, DEFAULT_WRONG_SPECIFIC } from './data/errorDrivenStudyMode'
import './styles.css'
import './simulationSelection.css'
import './answerConfirmation.css'
import './optionEliminator.css'
import './lessonTranscriptButtons.css'
import './lessonNotes.css'
import './lastExam.css'
import './examRetake.css'

const existingQuestionIds = new Set(questions.map(question => question.id))
;[...transcriptQuestions, ...focusedQuestions, ...examTopicQuestions].forEach(question => {
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

function prioritizeUnanswered(answeredIds) {
  const currentOrder = new Map(questions.map((question, index) => [question.id, index]))
  questions.sort((a, b) => {
    const aAnswered = answeredIds.has(a.id) ? 1 : 0
    const bAnswered = answeredIds.has(b.id) ? 1 : 0
    if (aAnswered !== bAnswered) return aAnswered - bAnswered
    return (currentOrder.get(a.id) ?? 0) - (currentOrder.get(b.id) ?? 0)
  })
}

function readLocalAnswers() {
  try {
    return JSON.parse(localStorage.getItem('tp_answers') || '{}')
  } catch {
    return {}
  }
}

function currentWrongSpecificFromLocal(localAnswers) {
  return new Set(
    Object.entries(localAnswers)
      .filter(([id, answer]) => /^tp2023-(?:2[1-9]|[3-6]\d|70)$/.test(id) && answer?.correct === false)
      .map(([id]) => id)
  )
}

function Root() {
  const [ready, setReady] = React.useState(false)

  React.useEffect(() => {
    let cancelled = false

    async function loadAnsweredQuestions() {
      const localAnswers = readLocalAnswers()
      let answeredIds = new Set(Object.keys(localAnswers))
      let wrongSpecific = currentWrongSpecificFromLocal(localAnswers)
      let hasExamHistory = Object.keys(localAnswers).some(id => id.startsWith('tp2023-'))

      if (cloudEnabled) {
        const { data: sessionData } = await supabase.auth.getSession()
        const user = sessionData.session?.user
        if (user) {
          const { data: rows, error } = await supabase
            .from('answers')
            .select('question_id,is_correct')
            .eq('user_id', user.id)

          if (!error) {
            answeredIds = new Set((rows || []).map(row => row.question_id))
            hasExamHistory = (rows || []).some(row => row.question_id?.startsWith('tp2023-'))
            wrongSpecific = new Set(
              (rows || [])
                .filter(row => /^tp2023-(?:2[1-9]|[3-6]\d|70)$/.test(row.question_id || '') && row.is_correct === false)
                .map(row => row.question_id)
            )
          }
        }
      }

      if (cancelled) return

      // Se a prova já foi respondida, o cronograma usa somente os erros que continuam
      // ativos. Sem histórico ainda, parte do diagnóstico atual conhecido para não
      // deixar a sessão vazia.
      applyErrorDrivenStudyMode(hasExamHistory ? wrongSpecific : DEFAULT_WRONG_SPECIFIC)
      prioritizeUnanswered(answeredIds)
      setReady(true)
    }

    loadAnsweredQuestions()
    return () => { cancelled = true }
  }, [])

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
