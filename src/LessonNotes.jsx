import { useEffect, useMemo, useState } from 'react'
import { studyPlan } from './data/studyPlan'
import { cloudEnabled, supabase } from './supabase'

function isActualLesson(title = '') {
  const text = title.trim().toLowerCase()
  if (!text) return false
  return !(
    text.startsWith('questão') ||
    text.startsWith('questões') ||
    text.startsWith('revisão') ||
    text.startsWith('simulado') ||
    text.startsWith('flashcard') ||
    text.startsWith('resumo') ||
    text.startsWith('correção') ||
    /^\d+\s*(h|min)/i.test(text)
  )
}

function noteKey(planId, lessonIndex) {
  return `${planId}:${lessonIndex}`
}

export default function LessonNotes() {
  const [open, setOpen] = useState(false)
  const [session, setSession] = useState(null)
  const [planId, setPlanId] = useState(studyPlan[0]?.id || '')
  const [lessonIndex, setLessonIndex] = useState(0)
  const [noteId, setNoteId] = useState(null)
  const [notes, setNotes] = useState('')
  const [savedNotes, setSavedNotes] = useState('')
  const [savedAt, setSavedAt] = useState(null)
  const [busy, setBusy] = useState(false)
  const [loading, setLoading] = useState(false)
  const [message, setMessage] = useState('')
  const [annotatedKeys, setAnnotatedKeys] = useState(() => new Set())

  const selectedPlan = useMemo(() => studyPlan.find(p => p.id === planId) || studyPlan[0], [planId])
  const selectedLesson = selectedPlan?.lessons?.[lessonIndex] || ''
  const dirty = notes !== savedNotes

  useEffect(() => {
    if (!cloudEnabled) return
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession))
    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (!session?.user) {
      setAnnotatedKeys(new Set())
      return
    }

    let cancelled = false

    async function loadAnnotatedLessons() {
      const { data, error } = await supabase
        .from('lesson_notes')
        .select('plan_id, lesson_index, notes')
        .eq('user_id', session.user.id)

      if (cancelled || error) return

      const next = new Set(
        (data || [])
          .filter(row => String(row.notes || '').trim().length > 0)
          .map(row => noteKey(row.plan_id, row.lesson_index))
      )
      setAnnotatedKeys(next)
    }

    loadAnnotatedLessons()
    return () => { cancelled = true }
  }, [session?.user?.id])

  useEffect(() => {
    function openNotes(plan, index) {
      setPlanId(plan.id)
      setLessonIndex(index)
      setNoteId(null)
      setNotes('')
      setSavedNotes('')
      setSavedAt(null)
      setMessage('')
      setOpen(true)
    }

    function updateButtonState(button, plan, index, lessonTitle) {
      const hasNotes = annotatedKeys.has(noteKey(plan.id, index))
      button.classList.toggle('has-notes', hasNotes)
      button.textContent = hasNotes ? '✓ Anotado' : '📝 Anotações'
      button.setAttribute(
        'aria-label',
        hasNotes
          ? `Abrir anotações salvas da aula ${lessonTitle}`
          : `Abrir anotações da aula ${lessonTitle}`
      )
      button.title = hasNotes ? 'Esta aula possui anotações salvas' : 'Adicionar anotações nesta aula'
    }

    function addButtons() {
      const dayCards = document.querySelectorAll('.day-grid .day-card')

      dayCards.forEach((card, planIndex) => {
        const plan = studyPlan[planIndex]
        if (!plan) return

        const lessonRows = card.querySelectorAll('.lessons .lesson')
        lessonRows.forEach((row, index) => {
          const lessonTitle = plan.lessons[index]
          if (lessonTitle === undefined) return

          let button = row.querySelector('.lesson-notes-button')
          if (!isActualLesson(lessonTitle)) {
            button?.remove()
            return
          }

          if (!button) {
            button = document.createElement('button')
            button.type = 'button'
            button.className = 'lesson-notes-button'

            button.addEventListener('mousedown', event => {
              event.preventDefault()
              event.stopPropagation()
            })

            button.addEventListener('click', event => {
              event.preventDefault()
              event.stopPropagation()
              openNotes(plan, index)
            })

            row.appendChild(button)
          }

          updateButtonState(button, plan, index, lessonTitle)
        })
      })
    }

    const root = document.getElementById('root')
    if (!root) return

    addButtons()
    const observer = new MutationObserver(addButtons)
    observer.observe(root, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [annotatedKeys])

  useEffect(() => {
    if (!open || !session?.user || !selectedPlan) return
    loadNote()
  }, [open, session?.user?.id, planId, lessonIndex])

  async function loadNote() {
    setLoading(true)
    setMessage('')
    const { data, error } = await supabase
      .from('lesson_notes')
      .select('id, notes, updated_at')
      .eq('user_id', session.user.id)
      .eq('plan_id', selectedPlan.id)
      .eq('lesson_index', lessonIndex)
      .limit(1)

    if (error) {
      setLoading(false)
      return setMessage(`Não foi possível carregar as anotações: ${error.message}`)
    }

    const record = data?.[0]
    const nextNotes = record?.notes || ''
    setNoteId(record?.id || null)
    setNotes(nextNotes)
    setSavedNotes(nextNotes)
    setSavedAt(record?.updated_at || null)
    setLoading(false)
  }

  async function saveNote() {
    if (!session?.user) return setMessage('Entre na sua conta para salvar anotações na nuvem.')
    if (!selectedPlan) return

    setBusy(true)
    setMessage('')
    const now = new Date().toISOString()
    const payload = {
      user_id: session.user.id,
      plan_id: selectedPlan.id,
      lesson_index: lessonIndex,
      lesson_title: selectedLesson,
      theme: selectedPlan.theme,
      notes,
      updated_at: now
    }

    const { data, error } = await supabase
      .from('lesson_notes')
      .upsert(payload, { onConflict: 'user_id,plan_id,lesson_index' })
      .select('id, notes, updated_at')
      .single()

    setBusy(false)
    if (error) return setMessage(`Não foi possível salvar: ${error.message}`)

    setNoteId(data.id)
    setSavedNotes(data.notes || '')
    setSavedAt(data.updated_at)

    const key = noteKey(selectedPlan.id, lessonIndex)
    setAnnotatedKeys(prev => {
      const next = new Set(prev)
      if (String(data.notes || '').trim()) next.add(key)
      else next.delete(key)
      return next
    })

    setMessage('Anotações salvas na nuvem.')
  }

  async function deleteNote() {
    const key = selectedPlan ? noteKey(selectedPlan.id, lessonIndex) : null

    if (!noteId || !session?.user) {
      setNotes('')
      setSavedNotes('')
      if (key) {
        setAnnotatedKeys(prev => {
          const next = new Set(prev)
          next.delete(key)
          return next
        })
      }
      setMessage('Não havia anotação salva para excluir.')
      return
    }
    if (!window.confirm('Excluir as anotações desta aula?')) return

    setBusy(true)
    const { error } = await supabase
      .from('lesson_notes')
      .delete()
      .eq('id', noteId)
      .eq('user_id', session.user.id)
    setBusy(false)

    if (error) return setMessage(`Não foi possível excluir: ${error.message}`)
    setNoteId(null)
    setNotes('')
    setSavedNotes('')
    setSavedAt(null)
    if (key) {
      setAnnotatedKeys(prev => {
        const next = new Set(prev)
        next.delete(key)
        return next
      })
    }
    setMessage('Anotações excluídas.')
  }

  function closeModal() {
    if (dirty && !window.confirm('Há alterações não salvas. Fechar mesmo assim?')) return
    setOpen(false)
  }

  if (!open) return null

  return <div className="lesson-notes-overlay" onMouseDown={e => e.target === e.currentTarget && closeModal()}>
    <section className="lesson-notes-modal" role="dialog" aria-modal="true" aria-label="Anotações da aula">
      <div className="lesson-notes-head">
        <div>
          <div className="eyebrow">CADERNO • RASCUNHO DA AULA</div>
          <h2>Anotações da aula</h2>
          <p className="muted">Salve os pontos importantes mesmo quando a aula não tiver degravação.</p>
        </div>
        <button className="lesson-notes-close" onClick={closeModal}>Fechar</button>
      </div>

      <div className="lesson-notes-lesson-card">
        <span className="eyebrow">AULA</span>
        <strong>{selectedLesson}</strong>
        <span className="muted">{selectedPlan?.day} • {selectedPlan?.theme}</span>
      </div>

      {!cloudEnabled ? <div className="notice">A sincronização com Supabase precisa estar ativa para salvar as anotações.</div> : !session ? <div className="notice">Entre na sua conta na aba <b>Conta</b> para acessar e salvar suas anotações em qualquer dispositivo.</div> : <>
        <label className="lesson-notes-field">Pontos importantes para passar ao caderno
          <textarea
            value={notes}
            onChange={e => setNotes(e.target.value)}
            disabled={loading || busy}
            placeholder="Ex.: conceito principal, diferenças importantes, pegadinhas da Cesgranrio, exemplos e pontos para revisar depois."
            rows={13}
            onKeyDown={e => {
              if ((e.ctrlKey || e.metaKey) && e.key === 'Enter') {
                e.preventDefault()
                saveNote()
              }
            }}
          />
        </label>

        <div className="lesson-notes-status">
          <span className="muted">{loading ? 'Carregando…' : savedAt ? `Último salvamento: ${new Date(savedAt).toLocaleString('pt-BR')}` : 'Ainda não há anotação salva nesta aula.'}</span>
          <span className={dirty ? 'lesson-notes-unsaved' : 'muted'}>{dirty ? 'Alterações não salvas' : 'Tudo salvo'}</span>
        </div>

        {message && <div className="notice lesson-notes-message">{message}</div>}

        <div className="lesson-notes-actions">
          <button onClick={deleteNote} disabled={busy || loading || (!noteId && !notes)}>Excluir anotações</button>
          <button className="primary" onClick={saveNote} disabled={busy || loading || !dirty}>{busy ? 'Salvando…' : 'Salvar anotações'}</button>
        </div>
        <p className="muted lesson-notes-shortcut">Atalho: Ctrl + Enter para salvar.</p>
      </>}
    </section>
  </div>
}
