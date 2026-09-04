import { useEffect, useMemo, useState } from 'react'
import { cloudEnabled, supabase } from './supabase'
import { studyPlan, editalItems } from './data/studyPlan'
import { questions } from './data/questions'

const weekDayMap = ['Domingo','Segunda','Terça','Quarta','Quinta','Sexta','Sábado']

function App() {
  const [tab, setTab] = useState('inicio')
  const [session, setSession] = useState(null)
  const [authMode, setAuthMode] = useState('login')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [message, setMessage] = useState('')
  const [progress, setProgress] = useState({})
  const [answers, setAnswers] = useState({})
  const [dayFilter, setDayFilter] = useState('Todos')
  const [themeFilter, setThemeFilter] = useState('Todos')

  const todayName = weekDayMap[new Date().getDay()]
  const todayPlan = studyPlan.find(x => x.day === todayName) || studyPlan[0]

  useEffect(() => {
    if (!cloudEnabled) {
      setProgress(JSON.parse(localStorage.getItem('tp_progress') || '{}'))
      setAnswers(JSON.parse(localStorage.getItem('tp_answers') || '{}'))
      return
    }
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession))
    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!cloudEnabled || !session?.user) return
    loadCloudState()
  }, [session])

  async function loadCloudState() {
    const userId = session.user.id
    const [{ data: p }, { data: a }] = await Promise.all([
      supabase.from('progress').select('*').eq('user_id', userId),
      supabase.from('answers').select('*').eq('user_id', userId)
    ])
    const pMap = Object.fromEntries((p || []).map(row => [row.item_key, row.status]))
    const aMap = Object.fromEntries((a || []).map(row => [row.question_id, { selected: row.selected_option, correct: row.is_correct }]))
    setProgress(pMap)
    setAnswers(aMap)
  }

  async function authSubmit(e) {
    e.preventDefault(); setMessage('')
    if (!cloudEnabled) { setMessage('Configure o Supabase para ativar login e sincronização.') ; return }
    const result = authMode === 'login'
      ? await supabase.auth.signInWithPassword({ email, password })
      : await supabase.auth.signUp({ email, password })
    if (result.error) setMessage(result.error.message)
    else setMessage(authMode === 'login' ? 'Login realizado.' : 'Conta criada. Se o Supabase pedir confirmação, verifique seu e-mail.')
  }

  async function signOut() {
    if (cloudEnabled) await supabase.auth.signOut()
  }

  async function setItemProgress(key, status) {
    const next = { ...progress, [key]: status }; setProgress(next)
    if (!cloudEnabled || !session?.user) {
      localStorage.setItem('tp_progress', JSON.stringify(next)); return
    }
    await supabase.from('progress').upsert({ user_id: session.user.id, item_key: key, status }, { onConflict: 'user_id,item_key' })
  }

  async function answerQuestion(q, selected) {
    const entry = { selected, correct: selected === q.correct }
    const next = { ...answers, [q.id]: entry }; setAnswers(next)
    if (!cloudEnabled || !session?.user) {
      localStorage.setItem('tp_answers', JSON.stringify(next)); return
    }
    await supabase.from('answers').upsert({
      user_id: session.user.id, question_id: q.id, selected_option: selected,
      is_correct: selected === q.correct, day_label: q.day, theme: q.theme
    }, { onConflict: 'user_id,question_id' })
  }

  const themes = useMemo(() => ['Todos', ...new Set(questions.map(q => q.theme))], [])
  const filteredQuestions = questions.filter(q => (dayFilter === 'Todos' || q.day === dayFilter) && (themeFilter === 'Todos' || q.theme === themeFilter))
  const incorrect = questions.filter(q => answers[q.id] && !answers[q.id].correct)
  const answeredCount = Object.keys(answers).length
  const correctCount = Object.values(answers).filter(a => a.correct).length
  const finished = Object.values(progress).filter(v => v === 'Concluído').length

  return <div className="app-shell">
    <header className="topbar">
      <div>
        <div className="eyebrow">TRANSPETRO 2026</div>
        <h1>Análise Ambiental</h1>
      </div>
      <div className="sync-pill">{cloudEnabled ? (session ? '☁ Sincronizado' : '☁ Supabase pronto') : '● Modo local'}</div>
    </header>

    <nav className="nav">
      {[
        ['inicio','Início'],['aulas','Aulas'],['questoes','Questões'],['edital','Edital'],['erros','Caderno de erros'],['conta','Conta']
      ].map(([id,label]) => <button key={id} onClick={() => setTab(id)} className={tab===id?'active':''}>{label}</button>)}
    </nav>

    <main>
      {tab === 'inicio' && <>
        <section className="hero-card">
          <div>
            <div className="eyebrow">ESTUDAR HOJE • {todayName.toUpperCase()}</div>
            <h2>{todayPlan.theme}</h2>
            <p>{todayPlan.block}</p>
          </div>
          <button className="primary" onClick={() => setTab('aulas')}>Estudar hoje →</button>
        </section>
        <section className="stats-grid">
          <Stat label="Itens concluídos" value={`${finished}/${editalItems.length}`} />
          <Stat label="Questões respondidas" value={answeredCount} />
          <Stat label="Aproveitamento" value={answeredCount ? `${Math.round(correctCount/answeredCount*100)}%` : '—'} />
          <Stat label="Erros para revisar" value={incorrect.length} />
        </section>
        <section className="panel"><h3>Plano de hoje</h3><LessonList plan={todayPlan} progress={progress} setItemProgress={setItemProgress}/></section>
      </>}

      {tab === 'aulas' && <section className="panel">
        <div className="section-head"><div><div className="eyebrow">CRONOGRAMA</div><h2>Aulas da semana</h2></div></div>
        <div className="day-grid">{studyPlan.map(plan => <div className="day-card" key={plan.id}><h3>{plan.day}</h3><p className="muted">{plan.theme}</p><LessonList plan={plan} progress={progress} setItemProgress={setItemProgress}/></div>)}</div>
      </section>}

      {tab === 'questoes' && <section className="panel">
        <div className="section-head"><div><div className="eyebrow">QUESTÕES</div><h2>Escolha por dia ou tema</h2></div><span className="counter">{filteredQuestions.length} disponíveis</span></div>
        <div className="filters">
          <label>Dia<select value={dayFilter} onChange={e=>setDayFilter(e.target.value)}>{['Todos',...weekDayMap.slice(1),'Domingo'].map(d=><option key={d}>{d}</option>)}</select></label>
          <label>Tema<select value={themeFilter} onChange={e=>setThemeFilter(e.target.value)}>{themes.map(t=><option key={t}>{t}</option>)}</select></label>
        </div>
        <div className="question-list">{filteredQuestions.slice(0,10).map((q,i)=><QuestionCard key={q.id} q={q} n={i+1} state={answers[q.id]} onAnswer={answerQuestion}/>)}</div>
      </section>}

      {tab === 'edital' && <section className="panel">
        <div className="section-head"><div><div className="eyebrow">PROGRESSO</div><h2>Edital verticalizado</h2></div></div>
        <div className="edital-list">{editalItems.map(item => <div className="edital-row" key={item.code}><div><strong>{item.code}</strong><div>{item.title}</div></div><select value={progress[`edital:${item.code}`] || 'Não iniciado'} onChange={e=>setItemProgress(`edital:${item.code}`,e.target.value)}><option>Não iniciado</option><option>Em andamento</option><option>Concluído</option></select></div>)}</div>
      </section>}

      {tab === 'erros' && <section className="panel"><div className="section-head"><div><div className="eyebrow">REVISÃO</div><h2>Caderno de erros</h2></div></div>
        {incorrect.length===0 ? <p className="empty">Nenhum erro registrado ainda.</p> : incorrect.map(q => <div className="error-card" key={q.id}><strong>{q.theme}</strong><p>{q.statement}</p><p><b>Sua resposta:</b> {answers[q.id].selected} • <b>Correta:</b> {q.correct}</p><p className="muted">{q.explanation}</p></div>)}
      </section>}

      {tab === 'conta' && <section className="panel account-panel">
        <div><div className="eyebrow">SINCRONIZAÇÃO</div><h2>Conta</h2></div>
        {!cloudEnabled && <div className="notice">O site está funcionando em modo local. Para sincronizar entre celular e computador, configure as duas variáveis do Supabase na Vercel.</div>}
        {session ? <div><p>Conectado como <b>{session.user.email}</b>.</p><button onClick={signOut}>Sair</button></div> : <form onSubmit={authSubmit} className="auth-form"><input type="email" placeholder="Seu e-mail" value={email} onChange={e=>setEmail(e.target.value)} required/><input type="password" placeholder="Senha" value={password} onChange={e=>setPassword(e.target.value)} minLength="6" required/><button className="primary" type="submit">{authMode==='login'?'Entrar':'Criar conta'}</button><button type="button" className="link-btn" onClick={()=>setAuthMode(authMode==='login'?'signup':'login')}>{authMode==='login'?'Ainda não tenho conta':'Já tenho conta'}</button>{message && <p className="muted">{message}</p>}</form>}
      </section>}
    </main>
  </div>
}

function Stat({label,value}) { return <div className="stat"><span>{label}</span><strong>{value}</strong></div> }

function LessonList({ plan, progress, setItemProgress }) {
  return <div className="lessons">{plan.lessons.map((lesson,i) => {
    const key = `lesson:${plan.id}:${i}`; const done = progress[key] === 'Concluído'
    return <label className={`lesson ${done?'done':''}`} key={key}><input type="checkbox" checked={done} onChange={e=>setItemProgress(key,e.target.checked?'Concluído':'Não iniciado')}/><span>{lesson}</span></label>
  })}</div>
}

function QuestionCard({q,n,state,onAnswer}) {
  return <article className="question-card"><div className="q-meta"><span>Questão {n}</span><span>{q.day} • {q.theme}</span></div><h3>{q.statement}</h3><div className="options">{Object.entries(q.options).map(([key,text]) => <button key={key} disabled={Boolean(state)} onClick={()=>onAnswer(q,key)} className={state ? (key===q.correct?'correct': state.selected===key?'wrong':'') : ''}><b>{key}</b> {text}</button>)}</div>{state && <div className={`feedback ${state.correct?'ok':'bad'}`}><b>{state.correct?'Correto.':'Revisar.'}</b> {q.explanation}</div>}<div className="source">{q.sourceType} • {q.sourceLabel}</div></article>
}

export default App
