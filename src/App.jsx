import { useEffect, useMemo, useState } from 'react'
import { cloudEnabled, supabase } from './supabase'
import { studyPlan, editalItems } from './data/studyPlan'
import { questions } from './data/questions'

const weekDayMap = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado']
const weekStudyDays = ['Segunda','Terça','Quarta','Quinta','Sexta','Sábado']
const REVIEW_INTERVALS = [1, 7, 30]
const CONTENT_MINUTES = 105
const QUESTIONS_MINUTES = 45
const REVIEW_MINUTES = 30
const ESTIMATED_LESSON_MINUTES = 35

function shuffle(array) {
  const copy = [...array]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function addDays(date, days) {
  const d = new Date(date)
  d.setDate(d.getDate() + days)
  return d
}

function dayStart(date = new Date()) {
  const d = new Date(date)
  d.setHours(0,0,0,0)
  return d
}

function extractEditalCodes(block = '') {
  return [...block.matchAll(/\b\d+\.\d+\b/g)].map(m => m[0])
}

function questionStatsByTheme(answerMap) {
  const stats = {}
  questions.forEach(q => {
    const a = answerMap[q.id]
    if (!a) return
    if (!stats[q.theme]) stats[q.theme] = { total: 0, correct: 0 }
    stats[q.theme].total += 1
    if (a.correct) stats[q.theme].correct += 1
  })
  return stats
}

function App() {
  const [tab, setTab] = useState('inicio')
  const [session, setSession] = useState(null)
  const [authMode, setAuthMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const [progress, setProgress] = useState({})
  const [progressMeta, setProgressMeta] = useState({})
  const [answers, setAnswers] = useState({})
  const [errorNotebook, setErrorNotebook] = useState([])
  const [simHistory, setSimHistory] = useState([])

  const [dayFilter, setDayFilter] = useState('Todos')
  const [themeFilter, setThemeFilter] = useState('Todos')
  const [questionLimit, setQuestionLimit] = useState(10)
  const [openStudyBlocks, setOpenStudyBlocks] = useState({})

  const [simMode, setSimMode] = useState('Semana atual')
  const [simQuantity, setSimQuantity] = useState(20)
  const [includeAnswered, setIncludeAnswered] = useState(true)
  const [weakWeight, setWeakWeight] = useState(true)
  const [simQuestions, setSimQuestions] = useState([])
  const [simAnswers, setSimAnswers] = useState({})
  const [simFinished, setSimFinished] = useState(false)
  const [simResult, setSimResult] = useState(null)
  const [simMessage, setSimMessage] = useState('')

  const todayName = weekDayMap[new Date().getDay()]

  useEffect(() => {
    if (!cloudEnabled) {
      setProgress(JSON.parse(localStorage.getItem('tp_progress') || '{}'))
      setProgressMeta(JSON.parse(localStorage.getItem('tp_progress_meta') || '{}'))
      setAnswers(JSON.parse(localStorage.getItem('tp_answers') || '{}'))
      setErrorNotebook(JSON.parse(localStorage.getItem('tp_error_notebook') || '[]'))
      setSimHistory(JSON.parse(localStorage.getItem('tp_sim_history') || '[]'))
      return
    }
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession))
    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (cloudEnabled && session?.user) loadCloudState()
  }, [session])

  async function loadCloudState() {
    const userId = session.user.id
    const [{ data: p }, { data: a }, { data: errors }, { data: sims }] = await Promise.all([
      supabase.from('progress').select('*').eq('user_id', userId),
      supabase.from('answers').select('*').eq('user_id', userId),
      supabase.from('error_notebook').select('*').eq('user_id', userId).order('last_error_at', { ascending: false }),
      supabase.from('simulation_results').select('*').eq('user_id', userId).order('created_at', { ascending: false }).limit(30)
    ])
    setProgress(Object.fromEntries((p || []).map(row => [row.item_key, row.status])))
    setProgressMeta(Object.fromEntries((p || []).map(row => [row.item_key, row.updated_at])))
    setAnswers(Object.fromEntries((a || []).map(row => [row.question_id, { selected: row.selected_option, correct: row.is_correct }])))
    setErrorNotebook(errors || [])
    setSimHistory(sims || [])
  }

  async function authSubmit(e) {
    e.preventDefault()
    setMessage('')
    if (!cloudEnabled) return setMessage('Configure o Supabase para ativar a sincronização.')
    const result = authMode === 'login'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password })
    setMessage(result.error ? result.error.message : authMode === 'login' ? 'Login realizado.' : 'Conta criada.')
  }

  async function signOut() {
    if (cloudEnabled) await supabase.auth.signOut()
  }

  async function saveProgressKey(key, status) {
    const now = new Date().toISOString()
    setProgress(prev => ({ ...prev, [key]: status }))
    setProgressMeta(prev => ({ ...prev, [key]: now }))

    if (!cloudEnabled || !session?.user) {
      const next = { ...progress, [key]: status }
      const nextMeta = { ...progressMeta, [key]: now }
      localStorage.setItem('tp_progress', JSON.stringify(next))
      localStorage.setItem('tp_progress_meta', JSON.stringify(nextMeta))
      return
    }

    await supabase.from('progress').upsert({
      user_id: session.user.id,
      item_key: key,
      status,
      updated_at: now
    }, { onConflict: 'user_id,item_key' })
  }

  function lessonInfoFromKey(key) {
    const match = key.match(/^lesson:(.+):(\d+)$/)
    if (!match) return null
    const plan = studyPlan.find(p => p.id === match[1])
    if (!plan) return null
    return { plan, lessonIndex: Number(match[2]) }
  }

  async function syncEditalForPlan(plan, overrideProgress = progress) {
    const codes = extractEditalCodes(plan.block)
    if (!codes.length) return
    const lessonKeys = plan.lessons.map((_, i) => `lesson:${plan.id}:${i}`)
    const completed = lessonKeys.filter(k => overrideProgress[k] === 'Concluído').length
    const status = completed === 0 ? 'Não iniciado' : completed === lessonKeys.length ? 'Concluído' : 'Em andamento'
    for (const code of codes) await saveProgressKey(`edital:${code}`, status)
  }

  async function setItemProgress(key, status) {
    const next = { ...progress, [key]: status }
    await saveProgressKey(key, status)
    if (key.startsWith('lesson:')) {
      const info = lessonInfoFromKey(key)
      if (info) await syncEditalForPlan(info.plan, next)
    }
  }

  async function addErrorToNotebook(q, selected, source) {
    const now = new Date().toISOString()
    if (!cloudEnabled || !session?.user) {
      const existing = JSON.parse(localStorage.getItem('tp_error_notebook') || '[]')
      const found = existing.find(item => item.question_id === q.id)
      const next = found
        ? existing.map(item => item.question_id === q.id ? { ...item, selected_option: selected, source, error_count: (item.error_count || 1) + 1, last_error_at: now, reviewed: false } : item)
        : [{ id: crypto.randomUUID(), question_id: q.id, source, theme: q.theme, statement: q.statement, selected_option: selected, correct_option: q.correct, explanation: q.explanation, error_count: 1, reviewed: false, last_error_at: now }, ...existing]
      localStorage.setItem('tp_error_notebook', JSON.stringify(next))
      setErrorNotebook(next)
      return
    }
    const existing = errorNotebook.find(item => item.question_id === q.id)
    const payload = {
      user_id: session.user.id,
      question_id: q.id,
      source,
      theme: q.theme,
      statement: q.statement,
      selected_option: selected,
      correct_option: q.correct,
      explanation: q.explanation,
      error_count: existing ? (existing.error_count || 1) + 1 : 1,
      reviewed: false,
      last_error_at: now
    }
    const { data, error } = await supabase.from('error_notebook').upsert(payload, { onConflict: 'user_id,question_id' }).select().single()
    if (!error && data) setErrorNotebook(prev => [data, ...prev.filter(item => item.question_id !== q.id)])
  }

  async function markErrorReviewed(id, reviewed) {
    if (!cloudEnabled || !session?.user) {
      const next = errorNotebook.map(item => item.id === id ? { ...item, reviewed } : item)
      setErrorNotebook(next)
      localStorage.setItem('tp_error_notebook', JSON.stringify(next))
      return
    }
    const { data, error } = await supabase.from('error_notebook').update({ reviewed }).eq('id', id).eq('user_id', session.user.id).select().single()
    if (!error && data) setErrorNotebook(prev => prev.map(item => item.id === id ? data : item))
  }

  async function answerQuestion(q, selected, source = 'Questão normal') {
    const isCorrect = selected === q.correct
    const next = { ...answers, [q.id]: { selected, correct: isCorrect } }
    setAnswers(next)
    if (!isCorrect) await addErrorToNotebook(q, selected, source)
    if (!cloudEnabled || !session?.user) {
      localStorage.setItem('tp_answers', JSON.stringify(next))
      return
    }
    await supabase.from('answers').upsert({
      user_id: session.user.id,
      question_id: q.id,
      selected_option: selected,
      is_correct: isCorrect,
      day_label: q.day,
      theme: q.theme
    }, { onConflict: 'user_id,question_id' })
  }

  const themes = useMemo(() => ['Todos', ...new Set(questions.map(q => q.theme))], [])
  const filteredQuestions = questions.filter(q => (dayFilter === 'Todos' || q.day === dayFilter) && (themeFilter === 'Todos' || q.theme === themeFilter))
  const visibleQuestions = filteredQuestions.slice(0, questionLimit)
  useEffect(() => setQuestionLimit(10), [dayFilter, themeFilter])

  const activeErrors = errorNotebook.filter(item => !item.reviewed)
  const answeredCount = Object.keys(answers).length
  const correctCount = Object.values(answers).filter(a => a.correct).length
  const themeStats = useMemo(() => questionStatsByTheme(answers), [answers])
  const weakThemes = useMemo(() => new Set(Object.entries(themeStats).filter(([,s]) => s.total >= 2 && s.correct / s.total < 0.7).map(([theme]) => theme).concat(activeErrors.map(e => e.theme))), [themeStats, activeErrors])

  const reviewSchedule = useMemo(() => {
    const due = []
    const upcoming = []
    const today = dayStart()
    studyPlan.forEach(plan => {
      plan.lessons.forEach((lesson, i) => {
        const lessonKey = `lesson:${plan.id}:${i}`
        if (progress[lessonKey] !== 'Concluído') return
        const completedAt = progressMeta[lessonKey]
        if (!completedAt) return
        REVIEW_INTERVALS.forEach(days => {
          const reviewKey = `review:${lessonKey}:${days}`
          if (progress[reviewKey] === 'Concluído') return
          const dueDate = dayStart(addDays(completedAt, days))
          const item = { reviewKey, lessonKey, lesson, theme: plan.theme, day: plan.day, interval: days, dueDate }
          if (dueDate <= today) due.push(item)
          else upcoming.push(item)
        })
      })
    })
    due.sort((a,b) => a.dueDate - b.dueDate || a.interval - b.interval)
    upcoming.sort((a,b) => a.dueDate - b.dueDate)
    return { due, upcoming }
  }, [progress, progressMeta])

  function isQuestionTask(item) {
    return /quest/i.test(item.lesson)
  }

  function getQuestionsForStudyItem(item) {
    const exact = questions.filter(q => q.theme === item.theme)
    const sameDay = questions.filter(q => q.day === item.day)
    const seen = new Set()
    const combined = []
    for (const q of [...exact, ...sameDay]) {
      if (!seen.has(q.id)) { seen.add(q.id); combined.push(q) }
      if (combined.length >= 10) break
    }
    return combined
  }

  function toggleStudyBlock(key) {
    setOpenStudyBlocks(prev => ({ ...prev, [key]: !prev[key] }))
  }

  const adaptiveSession = useMemo(() => {
    const todayIndex = studyPlan.findIndex(plan => plan.day === todayName)
    const overdue = []
    const todayPending = []

    studyPlan.forEach((plan, planIndex) => {
      plan.lessons.forEach((lesson, lessonIndex) => {
        const key = `lesson:${plan.id}:${lessonIndex}`
        if (progress[key] === 'Concluído') return
        const item = { key, lesson, day: plan.day, theme: plan.theme, planId: plan.id, planIndex, lessonIndex }
        if (todayIndex >= 0 && planIndex < todayIndex) overdue.push(item)
        if (plan.day === todayName) todayPending.push(item)
      })
    })

    overdue.sort((a,b) => a.planIndex - b.planIndex || a.lessonIndex - b.lessonIndex)
    const maxContentItems = Math.floor(CONTENT_MINUTES / ESTIMATED_LESSON_MINUTES)
    const selectedOverdue = overdue.slice(0, maxContentItems)
    const selectedToday = todayPending.slice(0, Math.max(0, maxContentItems - selectedOverdue.length))
    const contentQueue = [...selectedOverdue.map(x => ({ ...x, type: 'overdue' })), ...selectedToday.map(x => ({ ...x, type: 'today' }))]

    const sessionThemes = new Set(contentQueue.map(item => item.theme))
    let pool = questions.filter(q => sessionThemes.has(q.theme))
    if (pool.length < 10) {
      const days = new Set(contentQueue.map(item => item.day))
      pool = questions.filter(q => days.has(q.day))
    }
    if (pool.length < 10) pool = questions.filter(q => weekStudyDays.includes(q.day))

    const score = q => {
      let s = 0
      if (!answers[q.id]) s += 5
      if (weakThemes.has(q.theme)) s += 4
      const err = activeErrors.find(e => e.question_id === q.id)
      if (err) s += 3 + (err.error_count || 1)
      return s + Math.random()
    }
    const todayQuestions = [...pool].sort((a,b) => score(b) - score(a)).slice(0,10)
    const reviewItems = activeErrors.slice().sort((a,b) => (b.error_count || 1) - (a.error_count || 1)).slice(0,5)

    let nextAction = 'Sessão concluída'
    if (selectedOverdue.length) nextAction = `Recuperar: ${selectedOverdue[0].lesson}`
    else if (selectedToday.length) nextAction = `Estudar: ${selectedToday[0].lesson}`
    else if (reviewSchedule.due.length) nextAction = `Revisão programada: ${reviewSchedule.due[0].lesson}`
    else if (todayQuestions.some(q => !answers[q.id])) nextAction = 'Resolver questões do conteúdo'
    else if (reviewItems.length) nextAction = 'Revisar o Caderno de erros'

    return { overdue, selectedOverdue, selectedToday, contentQueue, todayQuestions, reviewItems, nextAction }
  }, [progress, answers, activeErrors, weakThemes, reviewSchedule.due, todayName])

  const estimatedDoneMinutes = Math.min(180,
    adaptiveSession.contentQueue.filter(item => progress[item.key] === 'Concluído').length * ESTIMATED_LESSON_MINUTES +
    adaptiveSession.todayQuestions.filter(q => answers[q.id]).length * (QUESTIONS_MINUTES / 10)
  )

  const studiedDays = useMemo(() => {
    const set = new Set()
    studyPlan.forEach(plan => {
      if (plan.lessons.some((_,i) => progress[`lesson:${plan.id}:${i}`] === 'Concluído')) set.add(plan.day)
    })
    return set
  }, [progress])

  function getSimulationPool(mode = simMode) {
    let pool = []
    if (mode === 'Semana atual') pool = questions.filter(q => weekStudyDays.includes(q.day))
    if (mode === 'Tudo estudado') pool = studiedDays.size ? questions.filter(q => studiedDays.has(q.day)) : questions.filter(q => weekStudyDays.includes(q.day))
    if (mode === 'Só pontos fracos') pool = weakThemes.size ? questions.filter(q => weakThemes.has(q.theme)) : questions.filter(q => weekStudyDays.includes(q.day))
    if (!includeAnswered && mode === simMode) pool = pool.filter(q => !answers[q.id])
    return pool
  }

  function orderedSimulationPool(pool) {
    if (!weakWeight || !weakThemes.size) return shuffle(pool)
    return [...pool].sort((a,b) => Number(weakThemes.has(b.theme)) - Number(weakThemes.has(a.theme)) || Math.random() - 0.5)
  }

  function createSimulation(mode = simMode, quantity = simQuantity) {
    const pool = getSimulationPool(mode)
    if (!pool.length) return setSimMessage('Não há questões disponíveis com esses critérios.')
    const selected = orderedSimulationPool(pool).slice(0, Math.min(quantity, pool.length))
    setSimMode(mode)
    setSimQuantity(quantity)
    setSimQuestions(selected)
    setSimAnswers({})
    setSimFinished(false)
    setSimResult(null)
    setSimMessage(selected.length < quantity ? `O banco possui ${selected.length} questões disponíveis.` : '')
    setTab('simulado')
  }

  function selectSimulationAnswer(questionId, option) {
    if (!simFinished) setSimAnswers(prev => ({ ...prev, [questionId]: option }))
  }

  async function finishSimulation() {
    if (Object.keys(simAnswers).length < simQuestions.length) return setSimMessage('Responda todas as questões antes de finalizar o simulado.')
    let correct = 0
    const byTheme = {}
    const details = []
    for (const q of simQuestions) {
      const selected = simAnswers[q.id]
      const ok = selected === q.correct
      if (ok) correct++
      else await addErrorToNotebook(q, selected, 'Simulado')
      if (!byTheme[q.theme]) byTheme[q.theme] = { total: 0, correct: 0 }
      byTheme[q.theme].total++
      if (ok) byTheme[q.theme].correct++
      details.push({ question_id: q.id, theme: q.theme, selected, correct: q.correct, is_correct: ok })
    }
    const result = { correct, total: simQuestions.length, percentage: Number((correct / simQuestions.length * 100).toFixed(1)), themeStats: byTheme, details }
    setSimResult(result)
    setSimFinished(true)
    setSimMessage('')
    await saveSimulationResult(result)
  }

  async function saveSimulationResult(result) {
    const record = { mode: simMode, total: result.total, correct: result.correct, percentage: result.percentage, details: result.details }
    if (!cloudEnabled || !session?.user) {
      const existing = JSON.parse(localStorage.getItem('tp_sim_history') || '[]')
      const localRecord = { ...record, id: crypto.randomUUID(), created_at: new Date().toISOString() }
      const next = [localRecord, ...existing].slice(0,30)
      localStorage.setItem('tp_sim_history', JSON.stringify(next))
      setSimHistory(next)
      return
    }
    const { data, error } = await supabase.from('simulation_results').insert({ ...record, user_id: session.user.id }).select().single()
    if (!error && data) setSimHistory(prev => [data, ...prev].slice(0,30))
  }

  function resetSimulation() {
    setSimQuestions([]); setSimAnswers({}); setSimFinished(false); setSimResult(null); setSimMessage('')
  }

  function exportBackup() {
    const payload = {
      exported_at: new Date().toISOString(),
      progress,
      progress_meta: progressMeta,
      answers,
      error_notebook: errorNotebook,
      simulation_history: simHistory
    }
    const blob = new Blob([JSON.stringify(payload, null, 2)], { type: 'application/json' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `transpetro-backup-${new Date().toISOString().slice(0,10)}.json`
    a.click()
    URL.revokeObjectURL(url)
  }

  const weeklySimulationDue = todayName === 'Domingo'
  const lowestThemes = Object.entries(themeStats).map(([theme,s]) => ({ theme, ...s, pct: Math.round(s.correct / s.total * 100) })).sort((a,b) => a.pct - b.pct)

  return (
    <div className="app-shell">
      <header className="topbar">
        <div><div className="eyebrow">TRANSPETRO 2026</div><h1>Análise Ambiental</h1></div>
        <div className="sync-pill">{cloudEnabled ? session ? `☁ Sincronizado • ${session.user.email}` : '⚠ Entre na conta para sincronizar' : '● Modo local'}</div>
      </header>

      <nav className="nav">
        {[
          ['inicio','Início'],['hoje','Estudar hoje'],['aulas','Aulas'],['questoes','Questões'],['simulado','Simulado'],['painel','Painel'],['edital','Edital'],['erros','Caderno de erros'],['conta','Conta']
        ].map(([id,label]) => <button key={id} onClick={() => setTab(id)} className={tab === id ? 'active' : ''}>{label}</button>)}
      </nav>

      <main>
        {tab === 'inicio' && <>
          <section className="hero-card">
            <div>
              <div className="eyebrow">SESSÃO DE HOJE • 3 HORAS</div>
              <h2>{adaptiveSession.overdue.length ? `${adaptiveSession.overdue.length} pendência(s) antes do conteúdo de hoje` : reviewSchedule.due.length ? `${reviewSchedule.due.length} revisão(ões) programada(s)` : 'Tudo em dia'}</h2>
              <p><strong>Próxima ação:</strong> {adaptiveSession.nextAction}</p>
            </div>
            <button className="primary" onClick={() => setTab('hoje')}>Estudar hoje →</button>
          </section>
          <section className="stats-grid">
            <Stat label="Sessão de hoje" value={`${Math.round(estimatedDoneMinutes)}/180 min`} />
            <Stat label="Pendências" value={adaptiveSession.overdue.length} />
            <Stat label="Revisões vencidas" value={reviewSchedule.due.length} />
            <Stat label="Erros para revisar" value={activeErrors.length} />
          </section>
          {weeklySimulationDue && <section className="panel">
            <div className="eyebrow">DOMINGO • AUTOMÁTICO</div>
            <h3>Seu simulado semanal está pronto</h3>
            <p className="muted">20 questões dos conteúdos da semana, com prioridade para seus pontos fracos.</p>
            <button className="primary" onClick={() => createSimulation('Semana atual', 20)}>Iniciar simulado semanal</button>
          </section>}
          <section className="panel">
            <div className="eyebrow">AUTOMAÇÕES ATIVAS</div>
            <h3>O site já decide o próximo passo por você</h3>
            <p><b>1.</b> Atrasados → <b>2.</b> Conteúdo de hoje → <b>3.</b> Revisões 1/7/30 → <b>4.</b> Questões adaptativas → <b>5.</b> Caderno de erros.</p>
          </section>
        </>}

        {tab === 'hoje' && <section className="panel">
          <div className="section-head"><div><div className="eyebrow">ESTUDAR HOJE</div><h2>Sessão adaptativa de 3 horas</h2><p className="muted">Pendências antigas continuam tendo prioridade absoluta.</p></div><span className="counter">{Math.round(estimatedDoneMinutes)}/180 min</span></div>
          <p><strong>Próxima ação:</strong> {adaptiveSession.nextAction}</p>

          {adaptiveSession.overdue.length > 0 && <div className="notice" style={{marginTop:20}}><strong>Recuperação prioritária</strong><p>{adaptiveSession.overdue.length} pendência(s). As mais antigas entram primeiro.</p></div>}

          <StudySection number="1" title={`Conteúdo • ${CONTENT_MINUTES} min`} subtitle="Atrasados primeiro; questões atrasadas podem ser feitas aqui mesmo.">
            {!adaptiveSession.contentQueue.length ? <p className="empty">Nenhum conteúdo pendente.</p> : adaptiveSession.contentQueue.map(item => {
              const questionTask = isQuestionTask(item)
              const blockQuestions = questionTask ? getQuestionsForStudyItem(item) : []
              const answeredBlock = blockQuestions.filter(q => answers[q.id]).length
              const blockFinished = blockQuestions.length > 0 && answeredBlock === blockQuestions.length
              const isOpen = Boolean(openStudyBlocks[item.key])
              return <div className="day-card" key={item.key} style={{marginBottom:16}}>
                <div className="q-meta"><span>{item.type === 'overdue' ? '⚠ ATRASADO' : 'HOJE'}</span><span>{item.day}</span></div>
                <strong>{item.theme}</strong><p>{item.lesson}</p>
                {!questionTask && <label className={`lesson ${progress[item.key] === 'Concluído' ? 'done' : ''}`}><input type="checkbox" checked={progress[item.key] === 'Concluído'} onChange={e => setItemProgress(item.key, e.target.checked ? 'Concluído' : 'Não iniciado')} /><span>Marcar conteúdo como concluído</span></label>}
                {questionTask && <div>
                  <div style={{display:'flex',justifyContent:'space-between',gap:12,alignItems:'center',flexWrap:'wrap'}}><span><b>{answeredBlock}/{blockQuestions.length}</b> questões respondidas</span>{blockQuestions.length > 0 && <button className="primary" onClick={() => toggleStudyBlock(item.key)}>{isOpen ? 'Fechar questões' : answeredBlock ? 'Continuar questões' : 'Começar questões'}</button>}</div>
                  {isOpen && <div className="question-list" style={{marginTop:20}}>{blockQuestions.map((q,i) => <QuestionCard key={q.id} q={q} n={i+1} state={answers[q.id]} onAnswer={(question, selected) => answerQuestion(question, selected, 'Estudar hoje')} />)}</div>}
                  <div style={{marginTop:15}}>{progress[item.key] === 'Concluído' ? <button onClick={() => setItemProgress(item.key, 'Não iniciado')}>✓ Bloco concluído</button> : <button className={blockFinished ? 'primary' : ''} disabled={blockQuestions.length > 0 && !blockFinished} onClick={() => setItemProgress(item.key, 'Concluído')}>{blockFinished ? 'Marcar bloco como concluído' : 'Responda todas para concluir'}</button>}</div>
                </div>}
              </div>
            })}
          </StudySection>

          <StudySection number="2" title="Revisões automáticas • 1, 7 e 30 dias" subtitle="São geradas a partir da data em que você conclui cada aula.">
            {!reviewSchedule.due.length ? <p className="empty">Nenhuma revisão programada vencida hoje.</p> : reviewSchedule.due.slice(0,6).map(item => <div className="day-card" key={item.reviewKey} style={{marginBottom:12}}><div className="q-meta"><span>REVISÃO {item.interval}D</span><span>{item.theme}</span></div><p><strong>{item.lesson}</strong></p><button className="primary" onClick={() => saveProgressKey(item.reviewKey, 'Concluído')}>Marcar revisão como concluída</button></div>)}
          </StudySection>

          <StudySection number="3" title={`Questões adaptativas • ${QUESTIONS_MINUTES} min`} subtitle="Prioriza questões não respondidas, temas abaixo de 70% e erros recorrentes.">
            <div className="question-list">{adaptiveSession.todayQuestions.map((q,i) => <QuestionCard key={q.id} q={q} n={i+1} state={answers[q.id]} onAnswer={(question, selected) => answerQuestion(question, selected, 'Estudar hoje')} />)}</div>
          </StudySection>

          <StudySection number="4" title={`Caderno de erros • ${REVIEW_MINUTES} min`} subtitle="Os erros mais recorrentes aparecem primeiro.">
            {!adaptiveSession.reviewItems.length ? <p className="empty">Nenhum erro pendente.</p> : adaptiveSession.reviewItems.map(item => <ErrorCard key={item.id} item={item} onToggle={() => markErrorReviewed(item.id, true)} />)}
          </StudySection>
        </section>}

        {tab === 'aulas' && <section className="panel"><div className="section-head"><div><div className="eyebrow">CRONOGRAMA</div><h2>Aulas da semana</h2></div></div><div className="day-grid">{studyPlan.map(plan => <div className="day-card" key={plan.id}><h3>{plan.day}</h3><p className="muted">{plan.theme}</p><LessonList plan={plan} progress={progress} setItemProgress={setItemProgress} /></div>)}</div></section>}

        {tab === 'questoes' && <section className="panel">
          <div className="section-head"><div><div className="eyebrow">QUESTÕES</div><h2>Escolha por dia ou tema</h2></div><span className="counter">{filteredQuestions.length} disponíveis</span></div>
          <div className="filters"><label>Dia<select value={dayFilter} onChange={e => setDayFilter(e.target.value)}>{['Todos',...weekDayMap.slice(1),'Domingo'].filter((v,i,a)=>a.indexOf(v)===i).map(d => <option key={d}>{d}</option>)}</select></label><label>Tema<select value={themeFilter} onChange={e => setThemeFilter(e.target.value)}>{themes.map(t => <option key={t}>{t}</option>)}</select></label></div>
          <div className="question-list">{visibleQuestions.map((q,i) => <QuestionCard key={q.id} q={q} n={i+1} state={answers[q.id]} onAnswer={answerQuestion} />)}</div>
          {questionLimit < filteredQuestions.length && <div style={{display:'flex',justifyContent:'center',marginTop:20}}><button className="primary" onClick={() => setQuestionLimit(v => Math.min(v+10, filteredQuestions.length))}>Mostrar mais 10 questões</button></div>}
        </section>}

        {tab === 'simulado' && <section className="panel">
          <div className="section-head"><div><div className="eyebrow">SIMULADO</div><h2>Simulado personalizado</h2><p className="muted">O gabarito aparece somente no final.</p></div></div>
          {!simQuestions.length ? <>
            <div className="filters"><label>Conteúdo<select value={simMode} onChange={e => setSimMode(e.target.value)}><option>Semana atual</option><option>Tudo estudado</option><option>Só pontos fracos</option></select></label><label>Quantidade<select value={simQuantity} onChange={e => setSimQuantity(Number(e.target.value))}><option value={10}>10 questões</option><option value={20}>20 questões</option><option value={30}>30 questões</option><option value={40}>40 questões</option></select></label></div>
            <div style={{marginTop:20,display:'grid',gap:12}}><label><input type="checkbox" checked={includeAnswered} onChange={e => setIncludeAnswered(e.target.checked)} /> Permitir questões já respondidas</label><label><input type="checkbox" checked={weakWeight} onChange={e => setWeakWeight(e.target.checked)} /> Dar mais peso aos pontos fracos</label></div>
            <div style={{marginTop:24}}><button className="primary" onClick={() => createSimulation()}>Criar simulado</button>{weeklySimulationDue && <button style={{marginLeft:10}} onClick={() => createSimulation('Semana atual',20)}>Simulado semanal automático</button>}</div>
            {simMessage && <p className="muted">{simMessage}</p>}
            {!!simHistory.length && <div style={{marginTop:35}}><h3>Histórico</h3><div className="edital-list">{simHistory.map(sim => <div key={sim.id} className="edital-row"><div><strong>{sim.correct}/{sim.total}</strong><div>{sim.mode}</div><small className="muted">{new Date(sim.created_at).toLocaleString('pt-BR')}</small></div><strong>{Number(sim.percentage).toFixed(1)}%</strong></div>)}</div></div>}
          </> : <>
            <div className="section-head"><div><strong>{simMode}</strong><p className="muted">{simQuestions.length} questões</p></div>{!simFinished && <span className="counter">{Object.keys(simAnswers).length}/{simQuestions.length} respondidas</span>}</div>
            <div className="question-list">{simQuestions.map((q,i) => <SimulationQuestion key={q.id} q={q} n={i+1} selected={simAnswers[q.id]} finished={simFinished} onSelect={selectSimulationAnswer} />)}</div>
            {!simFinished && <div style={{marginTop:25,display:'flex',gap:12}}><button className="primary" onClick={finishSimulation}>Finalizar simulado</button><button onClick={resetSimulation}>Cancelar</button></div>}
            {simMessage && <p className="muted">{simMessage}</p>}
            {simFinished && simResult && <SimulationResult result={simResult} resetSimulation={resetSimulation} />}
          </>}
        </section>}

        {tab === 'painel' && <section className="panel">
          <div className="section-head"><div><div className="eyebrow">DESEMPENHO ADAPTATIVO</div><h2>Painel</h2><p className="muted">O reforço automático usa estes dados para escolher suas próximas questões.</p></div></div>
          <section className="stats-grid"><Stat label="Respondidas" value={answeredCount} /><Stat label="Aproveitamento" value={answeredCount ? `${Math.round(correctCount/answeredCount*100)}%` : '—'} /><Stat label="Temas fracos" value={weakThemes.size} /><Stat label="Simulados" value={simHistory.length} /></section>
          <h3 style={{marginTop:30}}>Desempenho por tema</h3>
          {!lowestThemes.length ? <p className="empty">Responda questões para formar seu diagnóstico.</p> : <div className="edital-list">{lowestThemes.map(s => <div className="edital-row" key={s.theme}><div><strong>{s.theme}</strong><div>{s.correct}/{s.total} acertos</div></div><strong>{s.pct}% {s.pct < 70 ? '• reforço ativo' : ''}</strong></div>)}</div>}
          <h3 style={{marginTop:30}}>Evolução dos simulados</h3>
          {!simHistory.length ? <p className="empty">Nenhum simulado concluído.</p> : <div className="edital-list">{simHistory.slice(0,10).map((sim,i) => <div className="edital-row" key={sim.id}><div>#{simHistory.length-i} • {new Date(sim.created_at).toLocaleDateString('pt-BR')}</div><strong>{Number(sim.percentage).toFixed(1)}%</strong></div>)}</div>}
        </section>}

        {tab === 'edital' && <section className="panel"><div className="section-head"><div><div className="eyebrow">PROGRESSO AUTOMÁTICO</div><h2>Edital verticalizado</h2><p className="muted">Ao concluir aulas, os códigos vinculados ao bloco são atualizados automaticamente. Você ainda pode ajustar manualmente.</p></div></div><div className="edital-list">{editalItems.map(item => <div className="edital-row" key={item.code}><div><strong>{item.code}</strong><div>{item.title}</div></div><select value={progress[`edital:${item.code}`] || 'Não iniciado'} onChange={e => saveProgressKey(`edital:${item.code}`, e.target.value)}><option>Não iniciado</option><option>Em andamento</option><option>Concluído</option></select></div>)}</div></section>}

        {tab === 'erros' && <section className="panel"><div className="section-head"><div><div className="eyebrow">REVISÃO</div><h2>Caderno de erros</h2><p className="muted">Erros de questões normais, Estudar hoje e simulados.</p></div><span className="counter">{activeErrors.length} para revisar</span></div>{!errorNotebook.length ? <p className="empty">Nenhum erro registrado.</p> : errorNotebook.map(item => <ErrorCard key={item.id} item={item} onToggle={() => markErrorReviewed(item.id, !item.reviewed)} />)}</section>}

        {tab === 'conta' && <section className="panel account-panel">
          <div><div className="eyebrow">SINCRONIZAÇÃO E BACKUP</div><h2>Conta</h2></div>
          {session ? <div><p>☁ Sincronizado como <b>{session.user.email}</b></p><p className="muted">A sessão permanece salva neste navegador.</p><div style={{display:'flex',gap:10,flexWrap:'wrap'}}><button className="primary" onClick={exportBackup}>Exportar backup completo</button><button onClick={signOut}>Sair</button></div></div> : <form onSubmit={authSubmit} className="auth-form"><input type="email" placeholder="Seu e-mail" value={email} onChange={e => setEmail(e.target.value)} required /><input type="password" placeholder="Senha" value={password} onChange={e => setPassword(e.target.value)} minLength="6" required /><button className="primary" type="submit">{authMode === 'login' ? 'Entrar' : 'Criar conta'}</button><button type="button" className="link-btn" onClick={() => setAuthMode(authMode === 'login' ? 'signup' : 'login')}>{authMode === 'login' ? 'Ainda não tenho conta' : 'Já tenho conta'}</button>{message && <p className="muted">{message}</p>}</form>}
        </section>}
      </main>
    </div>
  )
}

function StudySection({ number, title, subtitle, children }) {
  return <div style={{marginTop:35}}><div className="eyebrow">ETAPA {number}</div><h2>{title}</h2><p className="muted">{subtitle}</p><div style={{marginTop:15}}>{children}</div></div>
}

function Stat({ label, value }) {
  return <div className="stat"><span>{label}</span><strong>{value}</strong></div>
}

function LessonList({ plan, progress, setItemProgress }) {
  return <div className="lessons">{plan.lessons.map((lesson,i) => {
    const key = `lesson:${plan.id}:${i}`
    const done = progress[key] === 'Concluído'
    return <label className={`lesson ${done ? 'done' : ''}`} key={key}><input type="checkbox" checked={done} onChange={e => setItemProgress(key, e.target.checked ? 'Concluído' : 'Não iniciado')} /><span>{lesson}</span></label>
  })}</div>
}

function QuestionCard({ q, n, state, onAnswer }) {
  return <article className="question-card"><div className="q-meta"><span>Questão {n}</span><span>{q.day} • {q.theme}</span></div><h3>{q.statement}</h3><div className="options">{Object.entries(q.options).map(([key,text]) => <button key={key} disabled={Boolean(state)} onClick={() => onAnswer(q,key)} className={state ? key === q.correct ? 'correct' : state.selected === key ? 'wrong' : '' : ''}><b>{key}</b> {text}</button>)}</div>{state && <div className={`feedback ${state.correct ? 'ok' : 'bad'}`}><b>{state.correct ? 'Correto.' : 'Revisar.'}</b> {q.explanation}</div>}<div className="source">{q.sourceType} • {q.sourceLabel}</div></article>
}

function ErrorCard({ item, onToggle }) {
  return <div className="error-card" style={{opacity:item.reviewed ? .55 : 1}}><div className="q-meta"><span>{item.source}</span><span>{item.theme}</span></div><p><strong>{item.statement}</strong></p><p><b>Sua resposta:</b> {item.selected_option} • <b>Correta:</b> {item.correct_option}</p><p className="muted">{item.explanation}</p><p><b>Erros nessa questão:</b> {item.error_count}</p><button className={item.reviewed ? '' : 'primary'} onClick={onToggle}>{item.reviewed ? 'Marcar como pendente' : 'Marcar como revisado'}</button></div>
}

function SimulationQuestion({ q, n, selected, finished, onSelect }) {
  return <article className="question-card"><div className="q-meta"><span>Questão {n}</span><span>{q.theme}</span></div><h3>{q.statement}</h3><div className="options">{Object.entries(q.options).map(([key,text]) => {
    let className = ''
    if (finished) className = key === q.correct ? 'correct' : selected === key ? 'wrong' : ''
    else if (selected === key) className = 'selected'
    return <button key={key} className={className} onClick={() => onSelect(q.id,key)} disabled={finished}><b>{key}</b> {text}</button>
  })}</div>{finished && <div className={`feedback ${selected === q.correct ? 'ok' : 'bad'}`}><b>{selected === q.correct ? 'Correto.' : `Resposta correta: ${q.correct}.`}</b> {q.explanation}</div>}</article>
}

function SimulationResult({ result, resetSimulation }) {
  return <div className="panel" style={{marginTop:30}}><div className="eyebrow">RESULTADO</div><h2>{result.correct}/{result.total} — {result.percentage}%</h2><h3>Desempenho por tema</h3><div className="edital-list">{Object.entries(result.themeStats).map(([theme,stats]) => <div className="edital-row" key={theme}><div>{theme}</div><strong>{stats.correct}/{stats.total} • {Math.round(stats.correct/stats.total*100)}%</strong></div>)}</div><div style={{marginTop:20}}><button className="primary" onClick={resetSimulation}>Criar outro simulado</button></div></div>
}

export default App
