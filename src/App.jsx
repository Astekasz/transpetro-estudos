import { useEffect, useMemo, useState } from 'react'
import { cloudEnabled, supabase } from './supabase'
import { studyPlan, editalItems } from './data/studyPlan'
import { questions } from './data/questions'

const weekDayMap = [
  'Domingo',
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado'
]

const weekStudyDays = [
  'Segunda',
  'Terça',
  'Quarta',
  'Quinta',
  'Sexta',
  'Sábado'
]

function shuffle(array) {
  const copy = [...array]

  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }

  return copy
}

function App() {
  const [tab, setTab] = useState('inicio')
  const [session, setSession] = useState(null)

  const [authMode, setAuthMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')

  const [progress, setProgress] = useState({})
  const [answers, setAnswers] = useState({})
  const [errorNotebook, setErrorNotebook] = useState([])

  const [dayFilter, setDayFilter] = useState('Todos')
  const [themeFilter, setThemeFilter] = useState('Todos')
  const [questionLimit, setQuestionLimit] = useState(10)

  const [simMode, setSimMode] = useState('Semana atual')
  const [simQuantity, setSimQuantity] = useState(20)
  const [includeAnswered, setIncludeAnswered] = useState(true)
  const [weakWeight, setWeakWeight] = useState(true)

  const [simQuestions, setSimQuestions] = useState([])
  const [simAnswers, setSimAnswers] = useState({})
  const [simFinished, setSimFinished] = useState(false)
  const [simResult, setSimResult] = useState(null)
  const [simMessage, setSimMessage] = useState('')
  const [simHistory, setSimHistory] = useState([])

  const todayName = weekDayMap[new Date().getDay()]
  const todayPlan =
    studyPlan.find(x => x.day === todayName) ||
    studyPlan[0]

  useEffect(() => {
    if (!cloudEnabled) {
      setProgress(
        JSON.parse(localStorage.getItem('tp_progress') || '{}')
      )

      setAnswers(
        JSON.parse(localStorage.getItem('tp_answers') || '{}')
      )

      setErrorNotebook(
        JSON.parse(localStorage.getItem('tp_error_notebook') || '[]')
      )

      setSimHistory(
        JSON.parse(localStorage.getItem('tp_sim_history') || '[]')
      )

      return
    }

    supabase.auth.getSession().then(({ data }) => {
      setSession(data.session)
    })

    const { data: listener } =
      supabase.auth.onAuthStateChange(
        (_event, nextSession) => {
          setSession(nextSession)
        }
      )

    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!cloudEnabled || !session?.user) return
    loadCloudState()
  }, [session])

  async function loadCloudState() {
    const userId = session.user.id

    const [
      { data: p },
      { data: a },
      { data: errors },
      { data: sims }
    ] = await Promise.all([
      supabase
        .from('progress')
        .select('*')
        .eq('user_id', userId),

      supabase
        .from('answers')
        .select('*')
        .eq('user_id', userId),

      supabase
        .from('error_notebook')
        .select('*')
        .eq('user_id', userId)
        .order('last_error_at', { ascending: false }),

      supabase
        .from('simulation_results')
        .select('*')
        .eq('user_id', userId)
        .order('created_at', { ascending: false })
        .limit(20)
    ])

    setProgress(
      Object.fromEntries(
        (p || []).map(row => [row.item_key, row.status])
      )
    )

    setAnswers(
      Object.fromEntries(
        (a || []).map(row => [
          row.question_id,
          {
            selected: row.selected_option,
            correct: row.is_correct
          }
        ])
      )
    )

    setErrorNotebook(errors || [])
    setSimHistory(sims || [])
  }

  async function authSubmit(e) {
    e.preventDefault()
    setMessage('')

    if (!cloudEnabled) {
      setMessage('Configure o Supabase para ativar login e sincronização.')
      return
    }

    const result =
      authMode === 'login'
        ? await supabase.auth.signInWithPassword({
            email,
            password
          })
        : await supabase.auth.signUp({
            email,
            password
          })

    if (result.error) {
      setMessage(result.error.message)
    } else {
      setMessage(
        authMode === 'login'
          ? 'Login realizado.'
          : 'Conta criada. Se necessário, confirme pelo e-mail.'
      )
    }
  }

  async function signOut() {
    if (cloudEnabled) {
      await supabase.auth.signOut()
    }
  }

  async function setItemProgress(key, status) {
    const next = {
      ...progress,
      [key]: status
    }

    setProgress(next)

    if (!cloudEnabled || !session?.user) {
      localStorage.setItem('tp_progress', JSON.stringify(next))
      return
    }

    await supabase
      .from('progress')
      .upsert(
        {
          user_id: session.user.id,
          item_key: key,
          status
        },
        {
          onConflict: 'user_id,item_key'
        }
      )
  }

  async function addErrorToNotebook(q, selected, source) {
    const now = new Date().toISOString()

    if (!cloudEnabled || !session?.user) {
      const existing =
        JSON.parse(localStorage.getItem('tp_error_notebook') || '[]')

      const found = existing.find(item => item.question_id === q.id)

      let next

      if (found) {
        next = existing.map(item =>
          item.question_id === q.id
            ? {
                ...item,
                selected_option: selected,
                source,
                error_count: (item.error_count || 1) + 1,
                last_error_at: now,
                reviewed: false
              }
            : item
        )
      } else {
        next = [
          {
            id: crypto.randomUUID(),
            question_id: q.id,
            source,
            theme: q.theme,
            statement: q.statement,
            selected_option: selected,
            correct_option: q.correct,
            explanation: q.explanation,
            error_count: 1,
            reviewed: false,
            last_error_at: now
          },
          ...existing
        ]
      }

      localStorage.setItem(
        'tp_error_notebook',
        JSON.stringify(next)
      )

      setErrorNotebook(next)
      return
    }

    const existing =
      errorNotebook.find(item => item.question_id === q.id)

    const payload = {
      user_id: session.user.id,
      question_id: q.id,
      source,
      theme: q.theme,
      statement: q.statement,
      selected_option: selected,
      correct_option: q.correct,
      explanation: q.explanation,
      error_count: existing
        ? (existing.error_count || 1) + 1
        : 1,
      reviewed: false,
      last_error_at: now
    }

    const { data, error } =
      await supabase
        .from('error_notebook')
        .upsert(payload, {
          onConflict: 'user_id,question_id'
        })
        .select()
        .single()

    if (!error && data) {
      setErrorNotebook(prev => {
        const without = prev.filter(
          item => item.question_id !== q.id
        )

        return [data, ...without]
      })
    }
  }

  async function markErrorReviewed(id, reviewed) {
    if (!cloudEnabled || !session?.user) {
      const next = errorNotebook.map(item =>
        item.id === id
          ? { ...item, reviewed }
          : item
      )

      setErrorNotebook(next)

      localStorage.setItem(
        'tp_error_notebook',
        JSON.stringify(next)
      )

      return
    }

    const { data, error } =
      await supabase
        .from('error_notebook')
        .update({ reviewed })
        .eq('id', id)
        .eq('user_id', session.user.id)
        .select()
        .single()

    if (!error && data) {
      setErrorNotebook(prev =>
        prev.map(item =>
          item.id === id ? data : item
        )
      )
    }
  }

  async function answerQuestion(q, selected) {
    const isCorrect = selected === q.correct

    const entry = {
      selected,
      correct: isCorrect
    }

    const next = {
      ...answers,
      [q.id]: entry
    }

    setAnswers(next)

    if (!isCorrect) {
      await addErrorToNotebook(
        q,
        selected,
        'Questão normal'
      )
    }

    if (!cloudEnabled || !session?.user) {
      localStorage.setItem('tp_answers', JSON.stringify(next))
      return
    }

    await supabase
      .from('answers')
      .upsert(
        {
          user_id: session.user.id,
          question_id: q.id,
          selected_option: selected,
          is_correct: isCorrect,
          day_label: q.day,
          theme: q.theme
        },
        {
          onConflict: 'user_id,question_id'
        }
      )
  }

  const themes = useMemo(
    () => [
      'Todos',
      ...new Set(questions.map(q => q.theme))
    ],
    []
  )

  const filteredQuestions =
    questions.filter(
      q =>
        (
          dayFilter === 'Todos' ||
          q.day === dayFilter
        ) &&
        (
          themeFilter === 'Todos' ||
          q.theme === themeFilter
        )
    )

  const visibleQuestions =
    filteredQuestions.slice(0, questionLimit)

  useEffect(() => {
    setQuestionLimit(10)
  }, [dayFilter, themeFilter])

  const answeredCount =
    Object.keys(answers).length

  const correctCount =
    Object.values(answers).filter(a => a.correct).length

  const finished =
    Object.values(progress).filter(
      v => v === 'Concluído'
    ).length

  const activeErrors =
    errorNotebook.filter(item => !item.reviewed)

  const studiedDays = useMemo(() => {
    const result = new Set()

    studyPlan.forEach(plan => {
      const studied =
        plan.lessons.some(
          (_, i) =>
            progress[
              `lesson:${plan.id}:${i}`
            ] === 'Concluído'
        )

      if (studied) {
        result.add(plan.day)
      }
    })

    return result
  }, [progress])

  const weakThemes = useMemo(() => {
    return new Set(
      activeErrors.map(item => item.theme)
    )
  }, [activeErrors])

  function getSimulationPool() {
    let pool = []

    if (simMode === 'Semana atual') {
      pool = questions.filter(
        q => weekStudyDays.includes(q.day)
      )
    }

    if (simMode === 'Tudo estudado') {
      if (studiedDays.size > 0) {
        pool = questions.filter(
          q => studiedDays.has(q.day)
        )
      } else {
        pool = questions.filter(
          q => weekStudyDays.includes(q.day)
        )
      }
    }

    if (simMode === 'Só pontos fracos') {
      if (weakThemes.size > 0) {
        pool = questions.filter(
          q => weakThemes.has(q.theme)
        )
      } else {
        pool = questions.filter(
          q => weekStudyDays.includes(q.day)
        )
      }
    }

    if (!includeAnswered) {
      pool = pool.filter(
        q => !answers[q.id]
      )
    }

    return pool
  }

  function weightedQuestionOrder(pool) {
    if (!weakWeight || weakThemes.size === 0) {
      return shuffle(pool)
    }

    const weighted = []

    pool.forEach(q => {
      weighted.push(q)

      if (weakThemes.has(q.theme)) {
        weighted.push(q)
        weighted.push(q)
      }
    })

    const shuffled = shuffle(weighted)
    const unique = []
    const ids = new Set()

    for (const q of shuffled) {
      if (!ids.has(q.id)) {
        ids.add(q.id)
        unique.push(q)
      }
    }

    return unique
  }

  function createSimulation() {
    const pool = getSimulationPool()

    if (pool.length === 0) {
      setSimMessage(
        'Não há questões disponíveis com esses filtros.'
      )
      return
    }

    const ordered = weightedQuestionOrder(pool)

    const selected =
      ordered.slice(
        0,
        Math.min(
          simQuantity,
          ordered.length
        )
      )

    setSimQuestions(selected)
    setSimAnswers({})
    setSimFinished(false)
    setSimResult(null)

    if (selected.length < simQuantity) {
      setSimMessage(
        `O banco possui ${selected.length} questões disponíveis para esses critérios.`
      )
    } else {
      setSimMessage('')
    }
  }

  function selectSimulationAnswer(questionId, option) {
    if (simFinished) return

    setSimAnswers(prev => ({
      ...prev,
      [questionId]: option
    }))
  }

  async function finishSimulation() {
    if (
      Object.keys(simAnswers).length <
      simQuestions.length
    ) {
      setSimMessage(
        'Responda todas as questões antes de finalizar o simulado.'
      )
      return
    }

    let correct = 0
    const themeStats = {}

    const details = []

    for (const q of simQuestions) {
      const selected = simAnswers[q.id]
      const isCorrect = selected === q.correct

      if (isCorrect) {
        correct++
      } else {
        await addErrorToNotebook(
          q,
          selected,
          'Simulado'
        )
      }

      if (!themeStats[q.theme]) {
        themeStats[q.theme] = {
          total: 0,
          correct: 0
        }
      }

      themeStats[q.theme].total++

      if (isCorrect) {
        themeStats[q.theme].correct++
      }

      details.push({
        question_id: q.id,
        theme: q.theme,
        selected,
        correct: q.correct,
        is_correct: isCorrect
      })
    }

    const percentage =
      Number(
        (
          correct /
          simQuestions.length *
          100
        ).toFixed(1)
      )

    const result = {
      correct,
      total: simQuestions.length,
      percentage,
      themeStats,
      details
    }

    setSimResult(result)
    setSimFinished(true)
    setSimMessage('')

    await saveSimulationResult(result)
  }

  async function saveSimulationResult(result) {
    const record = {
      mode: simMode,
      total: result.total,
      correct: result.correct,
      percentage: result.percentage,
      details: result.details
    }

    if (!cloudEnabled || !session?.user) {
      const existing =
        JSON.parse(
          localStorage.getItem('tp_sim_history') || '[]'
        )

      const localRecord = {
        ...record,
        id: crypto.randomUUID(),
        created_at: new Date().toISOString()
      }

      const next = [
        localRecord,
        ...existing
      ].slice(0, 20)

      localStorage.setItem(
        'tp_sim_history',
        JSON.stringify(next)
      )

      setSimHistory(next)
      return
    }

    const { data, error } =
      await supabase
        .from('simulation_results')
        .insert({
          ...record,
          user_id: session.user.id
        })
        .select()
        .single()

    if (!error && data) {
      setSimHistory(prev => [
        data,
        ...prev
      ].slice(0, 20))
    }
  }

  function resetSimulation() {
    setSimQuestions([])
    setSimAnswers({})
    setSimFinished(false)
    setSimResult(null)
    setSimMessage('')
  }

  return (
    <div className="app-shell">

      <header className="topbar">
        <div>
          <div className="eyebrow">
            TRANSPETRO 2026
          </div>

          <h1>Análise Ambiental</h1>
        </div>

        <div className="sync-pill">
          {cloudEnabled
            ? session
              ? `☁ Sincronizado • ${session.user.email}`
              : '⚠ Entre na conta para sincronizar'
            : '● Modo local'}
        </div>
      </header>

      <nav className="nav">
        {[
          ['inicio','Início'],
          ['aulas','Aulas'],
          ['questoes','Questões'],
          ['simulado','Simulado'],
          ['edital','Edital'],
          ['erros','Caderno de erros'],
          ['conta','Conta']
        ].map(([id,label]) => (
          <button
            key={id}
            onClick={() => setTab(id)}
            className={tab === id ? 'active' : ''}
          >
            {label}
          </button>
        ))}
      </nav>

      <main>

        {tab === 'inicio' && (
          <>
            <section className="hero-card">
              <div>
                <div className="eyebrow">
                  ESTUDAR HOJE • {todayName.toUpperCase()}
                </div>

                <h2>{todayPlan.theme}</h2>
                <p>{todayPlan.block}</p>
              </div>

              <button
                className="primary"
                onClick={() => setTab('aulas')}
              >
                Estudar hoje →
              </button>
            </section>

            <section className="stats-grid">
              <Stat
                label="Itens concluídos"
                value={`${finished}/${editalItems.length}`}
              />

              <Stat
                label="Questões respondidas"
                value={answeredCount}
              />

              <Stat
                label="Aproveitamento"
                value={
                  answeredCount
                    ? `${Math.round(
                        correctCount /
                        answeredCount *
                        100
                      )}%`
                    : '—'
                }
              />

              <Stat
                label="Erros para revisar"
                value={activeErrors.length}
              />
            </section>

            {!session && cloudEnabled && (
              <section className="panel">
                <strong>
                  ⚠ Seu progresso não está sincronizado.
                </strong>

                <p>
                  Entre na aba Conta para salvar
                  automaticamente seu progresso.
                </p>

                <button
                  className="primary"
                  onClick={() => setTab('conta')}
                >
                  Entrar na conta
                </button>
              </section>
            )}

            <section className="panel">
              <h3>Plano de hoje</h3>

              <LessonList
                plan={todayPlan}
                progress={progress}
                setItemProgress={setItemProgress}
              />
            </section>
          </>
        )}

        {tab === 'aulas' && (
          <section className="panel">
            <div className="section-head">
              <div>
                <div className="eyebrow">
                  CRONOGRAMA
                </div>

                <h2>Aulas da semana</h2>
              </div>
            </div>

            <div className="day-grid">
              {studyPlan.map(plan => (
                <div
                  className="day-card"
                  key={plan.id}
                >
                  <h3>{plan.day}</h3>

                  <p className="muted">
                    {plan.theme}
                  </p>

                  <LessonList
                    plan={plan}
                    progress={progress}
                    setItemProgress={setItemProgress}
                  />
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === 'questoes' && (
          <section className="panel">
            <div className="section-head">
              <div>
                <div className="eyebrow">
                  QUESTÕES
                </div>

                <h2>
                  Escolha por dia ou tema
                </h2>
              </div>

              <span className="counter">
                {filteredQuestions.length} disponíveis
              </span>
            </div>

            <div className="filters">
              <label>
                Dia

                <select
                  value={dayFilter}
                  onChange={e =>
                    setDayFilter(e.target.value)
                  }
                >
                  {[
                    'Todos',
                    'Segunda',
                    'Terça',
                    'Quarta',
                    'Quinta',
                    'Sexta',
                    'Sábado',
                    'Domingo'
                  ].map(d => (
                    <option key={d}>
                      {d}
                    </option>
                  ))}
                </select>
              </label>

              <label>
                Tema

                <select
                  value={themeFilter}
                  onChange={e =>
                    setThemeFilter(e.target.value)
                  }
                >
                  {themes.map(t => (
                    <option key={t}>
                      {t}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            <div className="question-list">
              {visibleQuestions.map((q,i) => (
                <QuestionCard
                  key={q.id}
                  q={q}
                  n={i + 1}
                  state={answers[q.id]}
                  onAnswer={answerQuestion}
                />
              ))}
            </div>

            {questionLimit < filteredQuestions.length && (
              <div
                style={{
                  display:'flex',
                  justifyContent:'center',
                  marginTop:'20px'
                }}
              >
                <button
                  className="primary"
                  onClick={() =>
                    setQuestionLimit(
                      v =>
                        Math.min(
                          v + 10,
                          filteredQuestions.length
                        )
                    )
                  }
                >
                  Mostrar mais 10 questões
                </button>
              </div>
            )}
          </section>
        )}

        {tab === 'simulado' && (
          <section className="panel">
            <div className="section-head">
              <div>
                <div className="eyebrow">
                  SIMULADO
                </div>

                <h2>Simulado personalizado</h2>

                <p className="muted">
                  O gabarito aparece somente
                  depois da finalização.
                </p>
              </div>
            </div>

            {simQuestions.length === 0 ? (
              <>
                <div className="filters">
                  <label>
                    Conteúdo

                    <select
                      value={simMode}
                      onChange={e =>
                        setSimMode(e.target.value)
                      }
                    >
                      <option>Semana atual</option>
                      <option>Tudo estudado</option>
                      <option>Só pontos fracos</option>
                    </select>
                  </label>

                  <label>
                    Quantidade

                    <select
                      value={simQuantity}
                      onChange={e =>
                        setSimQuantity(
                          Number(e.target.value)
                        )
                      }
                    >
                      <option value={10}>10 questões</option>
                      <option value={20}>20 questões</option>
                      <option value={30}>30 questões</option>
                      <option value={40}>40 questões</option>
                    </select>
                  </label>
                </div>

                <div
                  style={{
                    marginTop:'20px',
                    display:'grid',
                    gap:'12px'
                  }}
                >
                  <label>
                    <input
                      type="checkbox"
                      checked={includeAnswered}
                      onChange={e =>
                        setIncludeAnswered(
                          e.target.checked
                        )
                      }
                    />{' '}
                    Permitir questões já respondidas
                  </label>

                  <label>
                    <input
                      type="checkbox"
                      checked={weakWeight}
                      onChange={e =>
                        setWeakWeight(
                          e.target.checked
                        )
                      }
                    />{' '}
                    Dar mais peso aos temas
                    do caderno de erros
                  </label>
                </div>

                <div style={{ marginTop:'24px' }}>
                  <button
                    className="primary"
                    onClick={createSimulation}
                  >
                    Criar simulado
                  </button>
                </div>

                {simMessage && (
                  <p className="muted">
                    {simMessage}
                  </p>
                )}

                {simHistory.length > 0 && (
                  <div style={{ marginTop:'35px' }}>
                    <h3>Histórico de simulados</h3>

                    <div className="edital-list">
                      {simHistory.map(sim => (
                        <div
                          key={sim.id}
                          className="edital-row"
                        >
                          <div>
                            <strong>
                              {sim.correct}/{sim.total}
                            </strong>

                            <div>
                              {sim.mode}
                            </div>

                            <small className="muted">
                              {new Date(
                                sim.created_at
                              ).toLocaleString('pt-BR')}
                            </small>
                          </div>

                          <strong>
                            {Number(
                              sim.percentage
                            ).toFixed(1)}%
                          </strong>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </>
            ) : (
              <>
                <div className="section-head">
                  <div>
                    <strong>{simMode}</strong>
                    <p className="muted">
                      {simQuestions.length} questões
                    </p>
                  </div>

                  {!simFinished && (
                    <span className="counter">
                      {Object.keys(simAnswers).length}/
                      {simQuestions.length} respondidas
                    </span>
                  )}
                </div>

                <div className="question-list">
                  {simQuestions.map((q,i) => (
                    <SimulationQuestion
                      key={q.id}
                      q={q}
                      n={i + 1}
                      selected={simAnswers[q.id]}
                      finished={simFinished}
                      onSelect={selectSimulationAnswer}
                    />
                  ))}
                </div>

                {!simFinished && (
                  <div
                    style={{
                      marginTop:'25px',
                      display:'flex',
                      gap:'12px'
                    }}
                  >
                    <button
                      className="primary"
                      onClick={finishSimulation}
                    >
                      Finalizar simulado
                    </button>

                    <button
                      onClick={resetSimulation}
                    >
                      Cancelar
                    </button>
                  </div>
                )}

                {simMessage && (
                  <p className="muted">
                    {simMessage}
                  </p>
                )}

                {simFinished && simResult && (
                  <SimulationResult
                    result={simResult}
                    resetSimulation={resetSimulation}
                  />
                )}
              </>
            )}
          </section>
        )}

        {tab === 'edital' && (
          <section className="panel">
            <div className="section-head">
              <div>
                <div className="eyebrow">
                  PROGRESSO
                </div>

                <h2>Edital verticalizado</h2>
              </div>
            </div>

            <div className="edital-list">
              {editalItems.map(item => (
                <div
                  className="edital-row"
                  key={item.code}
                >
                  <div>
                    <strong>{item.code}</strong>
                    <div>{item.title}</div>
                  </div>

                  <select
                    value={
                      progress[`edital:${item.code}`] ||
                      'Não iniciado'
                    }
                    onChange={e =>
                      setItemProgress(
                        `edital:${item.code}`,
                        e.target.value
                      )
                    }
                  >
                    <option>Não iniciado</option>
                    <option>Em andamento</option>
                    <option>Concluído</option>
                  </select>
                </div>
              ))}
            </div>
          </section>
        )}

        {tab === 'erros' && (
          <section className="panel">
            <div className="section-head">
              <div>
                <div className="eyebrow">
                  REVISÃO
                </div>

                <h2>Caderno de erros</h2>

                <p className="muted">
                  Erros de questões normais e simulados.
                </p>
              </div>

              <span className="counter">
                {activeErrors.length} para revisar
              </span>
            </div>

            {errorNotebook.length === 0 ? (
              <p className="empty">
                Nenhum erro registrado ainda.
              </p>
            ) : (
              errorNotebook.map(item => (
                <div
                  className="error-card"
                  key={item.id}
                  style={{
                    opacity: item.reviewed ? 0.55 : 1
                  }}
                >
                  <div className="q-meta">
                    <span>
                      {item.source}
                    </span>

                    <span>
                      {item.theme}
                    </span>
                  </div>

                  <p>
                    <strong>
                      {item.statement}
                    </strong>
                  </p>

                  <p>
                    <b>Sua resposta:</b>{' '}
                    {item.selected_option}
                    {' • '}
                    <b>Correta:</b>{' '}
                    {item.correct_option}
                  </p>

                  <p className="muted">
                    {item.explanation}
                  </p>

                  <p>
                    <b>Erros nessa questão:</b>{' '}
                    {item.error_count}
                  </p>

                  <button
                    className={item.reviewed ? '' : 'primary'}
                    onClick={() =>
                      markErrorReviewed(
                        item.id,
                        !item.reviewed
                      )
                    }
                  >
                    {item.reviewed
                      ? 'Marcar como pendente'
                      : 'Marcar como revisado'}
                  </button>
                </div>
              ))
            )}
          </section>
        )}

        {tab === 'conta' && (
          <section className="panel account-panel">
            <div>
              <div className="eyebrow">
                SINCRONIZAÇÃO
              </div>

              <h2>Conta</h2>
            </div>

            {session ? (
              <div>
                <p>
                  ☁ Sincronizado como{' '}
                  <b>{session.user.email}</b>
                </p>

                <p className="muted">
                  Neste navegador, sua sessão
                  permanece salva automaticamente.
                </p>

                <button onClick={signOut}>
                  Sair
                </button>
              </div>
            ) : (
              <form
                onSubmit={authSubmit}
                className="auth-form"
              >
                <input
                  type="email"
                  placeholder="Seu e-mail"
                  value={email}
                  onChange={e =>
                    setEmail(e.target.value)
                  }
                  required
                />

                <input
                  type="password"
                  placeholder="Senha"
                  value={password}
                  onChange={e =>
                    setPassword(e.target.value)
                  }
                  minLength="6"
                  required
                />

                <button
                  className="primary"
                  type="submit"
                >
                  {authMode === 'login'
                    ? 'Entrar'
                    : 'Criar conta'}
                </button>

                <button
                  type="button"
                  className="link-btn"
                  onClick={() =>
                    setAuthMode(
                      authMode === 'login'
                        ? 'signup'
                        : 'login'
                    )
                  }
                >
                  {authMode === 'login'
                    ? 'Ainda não tenho conta'
                    : 'Já tenho conta'}
                </button>

                {message && (
                  <p className="muted">
                    {message}
                  </p>
                )}
              </form>
            )}
          </section>
        )}

      </main>
    </div>
  )
}

function Stat({ label, value }) {
  return (
    <div className="stat">
      <span>{label}</span>
      <strong>{value}</strong>
    </div>
  )
}

function LessonList({
  plan,
  progress,
  setItemProgress
}) {
  return (
    <div className="lessons">
      {plan.lessons.map((lesson,i) => {
        const key = `lesson:${plan.id}:${i}`
        const done =
          progress[key] === 'Concluído'

        return (
          <label
            className={`lesson ${done ? 'done' : ''}`}
            key={key}
          >
            <input
              type="checkbox"
              checked={done}
              onChange={e =>
                setItemProgress(
                  key,
                  e.target.checked
                    ? 'Concluído'
                    : 'Não iniciado'
                )
              }
            />

            <span>{lesson}</span>
          </label>
        )
      })}
    </div>
  )
}

function QuestionCard({
  q,
  n,
  state,
  onAnswer
}) {
  return (
    <article className="question-card">
      <div className="q-meta">
        <span>Questão {n}</span>
        <span>{q.day} • {q.theme}</span>
      </div>

      <h3>{q.statement}</h3>

      <div className="options">
        {Object.entries(q.options).map(
          ([key,text]) => (
            <button
              key={key}
              disabled={Boolean(state)}
              onClick={() => onAnswer(q,key)}
              className={
                state
                  ? key === q.correct
                    ? 'correct'
                    : state.selected === key
                      ? 'wrong'
                      : ''
                  : ''
              }
            >
              <b>{key}</b> {text}
            </button>
          )
        )}
      </div>

      {state && (
        <div
          className={`feedback ${
            state.correct ? 'ok' : 'bad'
          }`}
        >
          <b>
            {state.correct
              ? 'Correto.'
              : 'Revisar.'}
          </b>{' '}
          {q.explanation}
        </div>
      )}

      <div className="source">
        {q.sourceType} • {q.sourceLabel}
      </div>
    </article>
  )
}

function SimulationQuestion({
  q,
  n,
  selected,
  finished,
  onSelect
}) {
  return (
    <article className="question-card">
      <div className="q-meta">
        <span>Questão {n}</span>
        <span>{q.theme}</span>
      </div>

      <h3>{q.statement}</h3>

      <div className="options">
        {Object.entries(q.options).map(
          ([key,text]) => {
            let className = ''

            if (finished) {
              if (key === q.correct) {
                className = 'correct'
              } else if (selected === key) {
                className = 'wrong'
              }
            } else if (selected === key) {
              className = 'selected'
            }

            return (
              <button
                key={key}
                className={className}
                onClick={() =>
                  onSelect(q.id,key)
                }
                disabled={finished}
              >
                <b>{key}</b> {text}
              </button>
            )
          }
        )}
      </div>

      {finished && (
        <div
          className={`feedback ${
            selected === q.correct
              ? 'ok'
              : 'bad'
          }`}
        >
          <b>
            {selected === q.correct
              ? 'Correto.'
              : `Resposta correta: ${q.correct}.`}
          </b>{' '}

          {q.explanation}
        </div>
      )}
    </article>
  )
}

function SimulationResult({
  result,
  resetSimulation
}) {
  return (
    <div
      className="panel"
      style={{ marginTop:'30px' }}
    >
      <div className="eyebrow">
        RESULTADO
      </div>

      <h2>
        {result.correct}/{result.total}
        {' — '}
        {result.percentage}%
      </h2>

      <h3>
        Desempenho por tema
      </h3>

      <div className="edital-list">
        {Object.entries(
          result.themeStats
        ).map(([theme,stats]) => {
          const pct =
            Math.round(
              stats.correct /
              stats.total *
              100
            )

          return (
            <div
              className="edital-row"
              key={theme}
            >
              <div>{theme}</div>

              <strong>
                {stats.correct}/{stats.total}
                {' • '}
                {pct}%
              </strong>
            </div>
          )
        })}
      </div>

      <div style={{ marginTop:'20px' }}>
        <button
          className="primary"
          onClick={resetSimulation}
        >
          Criar outro simulado
        </button>
      </div>
    </div>
  )
}

export default App
