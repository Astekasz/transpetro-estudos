import { useEffect, useMemo, useState } from 'react'
import { createPortal } from 'react-dom'
import { lastExamQuestions } from './data/lastExamQuestions'
import { cloudEnabled, supabase } from './supabase'

const PAGE_SIZE = 10

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
  const [filter, setFilter] = useState('Todas')
  const [page, setPage] = useState(0)
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
    const ids = new Set(lastExamQuestions.map(question => question.id))
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
      source: 'Prova Transpetro 2023 • original',
      theme: 'Conhecimentos Específicos',
      statement: question.statement,
      selected_option: selected,
      correct_option: question.correct,
      explanation: `Gabarito oficial: ${question.correct}.`,
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
      day_label: 'Prova 2023',
      theme: 'Conhecimentos Específicos'
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

  const answered = lastExamQuestions.filter(question => answers[question.id]).length
  const correctCount = lastExamQuestions.filter(question => answers[question.id]?.correct).length
  const accuracy = answered ? Math.round((correctCount / answered) * 100) : 0

  const filteredQuestions = useMemo(() => {
    if (filter === 'Não respondidas') return lastExamQuestions.filter(question => !answers[question.id])
    if (filter === 'Erradas') return lastExamQuestions.filter(question => answers[question.id] && !answers[question.id].correct)
    if (filter === 'Corretas') return lastExamQuestions.filter(question => answers[question.id]?.correct)
    return lastExamQuestions
  }, [answers, filter])

  const pageCount = Math.max(1, Math.ceil(filteredQuestions.length / PAGE_SIZE))
  const safePage = Math.min(page, pageCount - 1)
  const visible = filteredQuestions.slice(safePage * PAGE_SIZE, safePage * PAGE_SIZE + PAGE_SIZE)

  useEffect(() => setPage(0), [filter])
  useEffect(() => {
    if (page > pageCount - 1) setPage(Math.max(0, pageCount - 1))
  }, [pageCount, page])

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
          <div className="eyebrow">TRANSPETRO 2023 • CESGRANRIO • PROVA 3</div>
          <h2>Questões reais de Análise Ambiental</h2>
          <p className="muted">Conhecimentos Específicos • questões 21 a 70, transcritas do caderno que você enviou e corrigidas pelo gabarito oficial enviado junto.</p>
        </div>
      </div>

      <div className="notice last-exam-note">
        <strong>Sem adaptações:</strong> o texto das questões e das alternativas foi mantido conforme a prova. Foram removidas apenas quebras de linha e hifenações causadas pela diagramação do PDF.
      </div>

      <div className="last-exam-stats">
        <div className="stat"><span>Questões</span><strong>{lastExamQuestions.length}</strong></div>
        <div className="stat"><span>Respondidas</span><strong>{answered}</strong></div>
        <div className="stat"><span>Acertos</span><strong>{correctCount}</strong></div>
        <div className="stat"><span>Aproveitamento</span><strong>{answered ? `${accuracy}%` : '—'}</strong></div>
      </div>

      <div className="last-exam-toolbar">
        <label>Mostrar
          <select value={filter} onChange={event => setFilter(event.target.value)}>
            <option>Todas</option>
            <option>Não respondidas</option>
            <option>Erradas</option>
            <option>Corretas</option>
          </select>
        </label>
        <span className="counter">{filteredQuestions.length} questão(ões) • página {safePage + 1} de {pageCount}</span>
      </div>

      {message && <div className="notice">{message}</div>}

      {!visible.length ? (
        <div className="empty">Nenhuma questão neste filtro.</div>
      ) : (
        <div className="question-list">
          {visible.map(question => {
            const state = answers[question.id]
            return <article className="question-card last-exam-question" key={question.id}>
              <div className="q-meta">
                <span>Questão {question.number}</span>
                <span>Conhecimentos Específicos</span>
              </div>
              <h3 className="last-exam-statement">{question.statement}</h3>

              {question.figure && <div className="last-exam-figure-wrap">
                <img className="last-exam-figure" src={question.figure} alt={question.figureAlt || `Figura da questão ${question.number}`} />
              </div>}

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
                <b>{state.correct ? 'Correto.' : `Gabarito oficial: ${question.correct}.`}</b>
              </div>}

              <div className="last-exam-card-footer">
                <div className="source">{question.sourceLabel}</div>
                {state && <button type="button" className="last-exam-retry" onClick={() => retryQuestion(question)}>Responder novamente</button>}
              </div>
            </article>
          })}
        </div>
      )}

      <div className="last-exam-pagination">
        <button type="button" disabled={safePage === 0} onClick={() => setPage(value => Math.max(0, value - 1))}>← 10 anteriores</button>
        <button type="button" className="primary" disabled={safePage >= pageCount - 1} onClick={() => {
          setPage(value => Math.min(pageCount - 1, value + 1))
          window.scrollTo({ top: 0, behavior: 'smooth' })
        }}>Próximas 10 →</button>
      </div>
    </section>,
    mainTarget
  ) : null

  return <>{navButton}{panel}</>
}
