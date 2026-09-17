import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { focusedQuestions } from './data/focusedQuestions'
import { cloudEnabled, supabase } from './supabase'

const SOURCE_URL = 'https://www.qconcursos.com/questoes-de-concursos/provas/cesgranrio-2023-transpetro-profissional-transpetro-de-nivel-superior-junior-enfase-3-analise-ambiental'
const PAGE_SIZE = 10

const examQuestions = focusedQuestions.filter(question => question.sourceType?.includes('Transpetro 2023'))

function localAnswers() {
  try {
    return JSON.parse(localStorage.getItem('tp_answers') || '{}')
  } catch {
    return {}
  }
}

export default function LastExamTab() {
  const [navTarget, setNavTarget] = useState(null)
  const [mainTarget, setMainTarget] = useState(null)
  const [open, setOpen] = useState(false)
  const [session, setSession] = useState(null)
  const [answers, setAnswers] = useState({})
  const [filter, setFilter] = useState('Não respondidas')
  const [limit, setLimit] = useState(PAGE_SIZE)
  const [message, setMessage] = useState('')

  useEffect(() => {
    setNavTarget(document.querySelector('nav.nav'))
    setMainTarget(document.querySelector('main'))

    const nav = document.querySelector('nav.nav')
    const handleNativeTab = event => {
      if (!event.target.closest('.last-exam-nav-button')) setOpen(false)
    }
    nav?.addEventListener('click', handleNativeTab)
    return () => nav?.removeEventListener('click', handleNativeTab)
  }, [])

  useEffect(() => {
    const shell = document.querySelector('.app-shell')
    shell?.classList.toggle('last-exam-open', open)
    if (open) window.scrollTo({ top: 0, behavior: 'smooth' })
    return () => shell?.classList.remove('last-exam-open')
  }, [open])

  useEffect(() => {
    if (!cloudEnabled) {
      setAnswers(localAnswers())
      return
    }

    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession))
    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!cloudEnabled || !session?.user) return
    loadCloudAnswers()
  }, [session?.user?.id])

  async function loadCloudAnswers() {
    const ids = new Set(examQuestions.map(question => question.id))
    const { data, error } = await supabase
      .from('answers')
      .select('question_id, selected_option, is_correct')
      .eq('user_id', session.user.id)

    if (error) {
      setMessage(`Não foi possível carregar seu progresso: ${error.message}`)
      return
    }

    setAnswers(Object.fromEntries(
      (data || [])
        .filter(row => ids.has(row.question_id))
        .map(row => [row.question_id, { selected: row.selected_option, correct: row.is_correct }])
    ))
  }

  async function saveWrongAnswer(question, selected) {
    if (!cloudEnabled || !session?.user) return

    const now = new Date().toISOString()
    const { data: existing } = await supabase
      .from('error_notebook')
      .select('error_count')
      .eq('user_id', session.user.id)
      .eq('question_id', question.id)
      .limit(1)

    const errorCount = Number(existing?.[0]?.error_count || 0) + 1
    await supabase.from('error_notebook').upsert({
      user_id: session.user.id,
      question_id: question.id,
      source: 'Prova Transpetro 2023',
      theme: question.theme,
      statement: question.statement,
      selected_option: selected,
      correct_option: question.correct,
      explanation: question.explanation,
      error_count: errorCount,
      reviewed: false,
      last_error_at: now
    }, { onConflict: 'user_id,question_id' })
  }

  async function answerQuestion(question, selected) {
    const correct = selected === question.correct
    const nextAnswer = { selected, correct }
    setAnswers(prev => ({ ...prev, [question.id]: nextAnswer }))
    setMessage('')

    if (!cloudEnabled || !session?.user) {
      const all = localAnswers()
      all[question.id] = nextAnswer
      localStorage.setItem('tp_answers', JSON.stringify(all))
      return
    }

    const { error } = await supabase.from('answers').upsert({
      user_id: session.user.id,
      question_id: question.id,
      selected_option: selected,
      is_correct: correct,
      day_label: question.day,
      theme: question.theme
    }, { onConflict: 'user_id,question_id' })

    if (error) {
      setMessage(`Não foi possível sincronizar a resposta: ${error.message}`)
      return
    }

    if (!correct) await saveWrongAnswer(question, selected)
  }

  async function retryQuestion(question) {
    setAnswers(prev => {
      const next = { ...prev }
      delete next[question.id]
      return next
    })

    if (!cloudEnabled || !session?.user) {
      const all = localAnswers()
      delete all[question.id]
      localStorage.setItem('tp_answers', JSON.stringify(all))
      return
    }

    await supabase
      .from('answers')
      .delete()
      .eq('user_id', session.user.id)
      .eq('question_id', question.id)
  }

  const answered = examQuestions.filter(question => answers[question.id]).length
  const correct = examQuestions.filter(question => answers[question.id]?.correct).length
  const accuracy = answered ? Math.round((correct / answered) * 100) : 0

  const filteredQuestions = useMemo(() => {
    if (filter === 'Não respondidas') return examQuestions.filter(question => !answers[question.id])
    if (filter === 'Erradas') return examQuestions.filter(question => answers[question.id] && !answers[question.id].correct)
    if (filter === 'Corretas') return examQuestions.filter(question => answers[question.id]?.correct)
    return examQuestions
  }, [answers, filter])

  useEffect(() => setLimit(PAGE_SIZE), [filter])

  const visible = filteredQuestions.slice(0, limit)

  const navButton = navTarget ? createPortal(
    <button
      type="button"
      className={`last-exam-nav-button ${open ? 'active' : ''}`}
      onClick={() => setOpen(true)}
    >
      Prova 2023
    </button>,
    navTarget
  ) : null

  const panel = open && mainTarget ? createPortal(
    <section className="panel last-exam-panel">
      <div className="section-head last-exam-head">
        <div>
          <div className="eyebrow">TRANSPETRO 2023 • CESGRANRIO</div>
          <h2>Treino da última prova de Análise Ambiental</h2>
          <p className="muted">Questões inéditas construídas a partir dos temas e do padrão de cobrança da prova de 2023, separadas do banco geral para você resolver quando tiver alguns minutos livres.</p>
        </div>
        <a className="last-exam-source-link" href={SOURCE_URL} target="_blank" rel="noreferrer">Consultar prova original ↗</a>
      </div>

      <div className="notice last-exam-note">
        <strong>Importante:</strong> os enunciados desta aba são adaptações próprias baseadas na prova de 2023; não são uma transcrição literal do caderno original.
      </div>

      <div className="last-exam-stats">
        <div className="stat"><span>Disponíveis</span><strong>{examQuestions.length}</strong></div>
        <div className="stat"><span>Respondidas</span><strong>{answered}</strong></div>
        <div className="stat"><span>Acertos</span><strong>{correct}</strong></div>
        <div className="stat"><span>Aproveitamento</span><strong>{answered ? `${accuracy}%` : '—'}</strong></div>
      </div>

      <div className="last-exam-toolbar">
        <label>Mostrar
          <select value={filter} onChange={event => setFilter(event.target.value)}>
            <option>Não respondidas</option>
            <option>Todas</option>
            <option>Erradas</option>
            <option>Corretas</option>
          </select>
        </label>
        <span className="counter">{filteredQuestions.length} questão(ões)</span>
      </div>

      {message && <div className="notice">{message}</div>}

      {!visible.length ? (
        <div className="empty">
          {filter === 'Não respondidas' && examQuestions.length ? 'Você já respondeu todas as questões deste bloco. Use o filtro “Erradas” para revisar ou “Todas” para refazer uma questão.' : 'Nenhuma questão neste filtro.'}
        </div>
      ) : (
        <div className="question-list">
          {visible.map((question, index) => {
            const state = answers[question.id]
            return <article className="question-card last-exam-question" key={question.id}>
              <div className="q-meta">
                <span>Questão {index + 1}</span>
                <span>{question.theme}</span>
              </div>
              <h3>{question.statement}</h3>
              <div className="options">
                {Object.entries(question.options).map(([letter, text]) => {
                  const className = state
                    ? letter === question.correct
                      ? 'correct'
                      : state.selected === letter
                        ? 'wrong'
                        : ''
                    : ''
                  return <button
                    type="button"
                    key={letter}
                    className={className}
                    disabled={Boolean(state)}
                    onClick={() => answerQuestion(question, letter)}
                  >
                    <b>{letter}</b> {text}
                  </button>
                })}
              </div>

              {state && <div className={`feedback ${state.correct ? 'ok' : 'bad'}`}>
                <b>{state.correct ? 'Correto.' : `Resposta correta: ${question.correct}.`}</b> {question.explanation}
              </div>}

              <div className="last-exam-card-footer">
                <div className="source">{question.sourceLabel}</div>
                {state && <button type="button" className="last-exam-retry" onClick={() => retryQuestion(question)}>Responder novamente</button>}
              </div>
            </article>
          })}
        </div>
      )}

      {limit < filteredQuestions.length && <div className="last-exam-more">
        <button type="button" className="primary" onClick={() => setLimit(value => value + PAGE_SIZE)}>Mostrar mais {PAGE_SIZE}</button>
      </div>}
    </section>,
    mainTarget
  ) : null

  return <>{navButton}{panel}</>
}
