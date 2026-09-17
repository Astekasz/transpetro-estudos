import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { lastExamQuestions } from './data/lastExamQuestions'
import { cloudEnabled, supabase } from './supabase'

function clearLocalExamAnswers() {
  try {
    const all = JSON.parse(localStorage.getItem('tp_answers') || '{}')
    lastExamQuestions.forEach(question => delete all[question.id])
    localStorage.setItem('tp_answers', JSON.stringify(all))
  } catch {
    // Se o armazenamento local estiver inválido, o reset em nuvem ainda funciona.
  }
}

export default function ExamRetakeButton() {
  const [target, setTarget] = useState(null)
  const [session, setSession] = useState(null)
  const [confirming, setConfirming] = useState(false)
  const [busy, setBusy] = useState(false)
  const [error, setError] = useState('')

  useEffect(() => {
    const root = document.getElementById('root')
    if (!root) return

    const findTarget = () => setTarget(document.querySelector('.last-exam-head'))
    findTarget()

    const observer = new MutationObserver(findTarget)
    observer.observe(root, { childList: true, subtree: true })
    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    if (!cloudEnabled) return

    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession))
    return () => listener.subscription.unsubscribe()
  }, [])

  async function resetExam() {
    setBusy(true)
    setError('')

    if (cloudEnabled && session?.user) {
      const ids = lastExamQuestions.map(question => question.id)
      const { error: deleteError } = await supabase
        .from('answers')
        .delete()
        .eq('user_id', session.user.id)
        .in('question_id', ids)

      if (deleteError) {
        setError(`Não foi possível reiniciar a prova: ${deleteError.message}`)
        setBusy(false)
        return
      }
    }

    clearLocalExamAnswers()
    setConfirming(false)
    window.location.reload()
  }

  const button = target ? createPortal(
    <button type="button" className="exam-retake-button" onClick={() => setConfirming(true)}>
      ↻ Refazer prova
    </button>,
    target
  ) : null

  const modal = confirming ? createPortal(
    <div className="exam-retake-backdrop" role="presentation" onMouseDown={event => {
      if (event.target === event.currentTarget && !busy) setConfirming(false)
    }}>
      <div className="exam-retake-dialog" role="dialog" aria-modal="true" aria-labelledby="exam-retake-title">
        <div className="eyebrow">PROVA TRANSPETRO 2023</div>
        <h3 id="exam-retake-title">Refazer a prova do zero?</h3>
        <p>Suas respostas e estatísticas desta prova serão zeradas para você responder novamente as 70 questões.</p>
        <p className="muted"><strong>Seu Caderno de erros será preservado</strong>, para você não perder o histórico do que precisa revisar.</p>
        {error && <div className="notice">{error}</div>}
        <div className="exam-retake-actions">
          <button type="button" disabled={busy} onClick={() => setConfirming(false)}>Cancelar</button>
          <button type="button" className="primary" disabled={busy} onClick={resetExam}>
            {busy ? 'Reiniciando…' : 'Sim, refazer prova'}
          </button>
        </div>
      </div>
    </div>,
    document.body
  ) : null

  return <>{button}{modal}</>
}
