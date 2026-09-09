import { useEffect, useMemo, useState } from 'react'
import { studyPlan } from './data/studyPlan'
import { cloudEnabled, supabase } from './supabase'

const BUCKET = 'lesson-transcripts'
const MAX_FILE_SIZE = 15 * 1024 * 1024
const ACCEPT = '.pdf,.doc,.docx,.txt'

function safeFileName(name) {
  return name.normalize('NFD').replace(/[\u0300-\u036f]/g, '').replace(/[^a-zA-Z0-9._-]+/g, '-').replace(/-+/g, '-').replace(/^-|-$/g, '') || 'arquivo'
}

function formatBytes(bytes) {
  if (!Number.isFinite(Number(bytes))) return ''
  const n = Number(bytes)
  if (n < 1024) return `${n} B`
  if (n < 1024 * 1024) return `${(n / 1024).toFixed(1)} KB`
  return `${(n / (1024 * 1024)).toFixed(1)} MB`
}

export default function TranscriptLibrary() {
  const [open, setOpen] = useState(false)
  const [session, setSession] = useState(null)
  const [records, setRecords] = useState([])
  const [planId, setPlanId] = useState(studyPlan[0]?.id || '')
  const [lessonIndex, setLessonIndex] = useState(0)
  const [file, setFile] = useState(null)
  const [notes, setNotes] = useState('')
  const [busy, setBusy] = useState(false)
  const [message, setMessage] = useState('')

  const selectedPlan = useMemo(() => studyPlan.find(p => p.id === planId) || studyPlan[0], [planId])
  const selectedLesson = selectedPlan?.lessons?.[lessonIndex] || ''
  const currentRecords = records.filter(r => r.plan_id === selectedPlan?.id && r.lesson_index === lessonIndex)

  useEffect(() => {
    if (!cloudEnabled) return
    supabase.auth.getSession().then(({ data }) => setSession(data.session))
    const { data: listener } = supabase.auth.onAuthStateChange((_event, nextSession) => setSession(nextSession))
    return () => listener.subscription.unsubscribe()
  }, [])

  useEffect(() => {
    if (open && session?.user) loadRecords()
  }, [open, session?.user?.id])

  async function loadRecords() {
    const { data, error } = await supabase
      .from('lesson_transcripts')
      .select('*')
      .eq('user_id', session.user.id)
      .order('created_at', { ascending: false })
    if (error) return setMessage(`Não foi possível carregar as degravações: ${error.message}`)
    setRecords(data || [])
  }

  function changePlan(nextPlanId) {
    setPlanId(nextPlanId)
    setLessonIndex(0)
    setMessage('')
  }

  async function uploadTranscript(e) {
    e.preventDefault()
    setMessage('')
    if (!session?.user) return setMessage('Entre na sua conta antes de enviar uma degravação.')
    if (!file) return setMessage('Escolha um arquivo para enviar.')
    if (file.size > MAX_FILE_SIZE) return setMessage('O arquivo deve ter no máximo 15 MB.')

    setBusy(true)
    const path = `${session.user.id}/${selectedPlan.id}/${lessonIndex}/${crypto.randomUUID()}-${safeFileName(file.name)}`
    const { error: uploadError } = await supabase.storage.from(BUCKET).upload(path, file, { upsert: false, contentType: file.type || undefined })
    if (uploadError) {
      setBusy(false)
      return setMessage(`Falha no envio: ${uploadError.message}`)
    }

    const { data, error: metadataError } = await supabase.from('lesson_transcripts').insert({
      user_id: session.user.id,
      plan_id: selectedPlan.id,
      lesson_index: lessonIndex,
      lesson_title: selectedLesson,
      theme: selectedPlan.theme,
      file_name: file.name,
      storage_path: path,
      file_size: file.size,
      mime_type: file.type || null,
      notes: notes.trim()
    }).select().single()

    if (metadataError) {
      await supabase.storage.from(BUCKET).remove([path])
      setBusy(false)
      return setMessage(`O arquivo foi cancelado porque não foi possível vinculá-lo à aula: ${metadataError.message}`)
    }

    setRecords(prev => [data, ...prev])
    setFile(null)
    setNotes('')
    const input = document.getElementById('transcript-file-input')
    if (input) input.value = ''
    setBusy(false)
    setMessage('Degravação salva e vinculada à aula.')
  }

  async function downloadTranscript(record) {
    setMessage('')
    const { data, error } = await supabase.storage.from(BUCKET).createSignedUrl(record.storage_path, 60, { download: record.file_name })
    if (error || !data?.signedUrl) return setMessage(`Não foi possível gerar o download: ${error?.message || 'erro desconhecido'}`)
    window.open(data.signedUrl, '_blank', 'noopener,noreferrer')
  }

  async function removeTranscript(record) {
    if (!window.confirm(`Excluir “${record.file_name}”?`)) return
    setBusy(true)
    setMessage('')
    const { error: storageError } = await supabase.storage.from(BUCKET).remove([record.storage_path])
    if (storageError) {
      setBusy(false)
      return setMessage(`Não foi possível excluir o arquivo: ${storageError.message}`)
    }
    const { error: rowError } = await supabase.from('lesson_transcripts').delete().eq('id', record.id).eq('user_id', session.user.id)
    if (rowError) {
      setBusy(false)
      return setMessage(`O arquivo foi removido, mas houve falha ao atualizar a lista: ${rowError.message}`)
    }
    setRecords(prev => prev.filter(r => r.id !== record.id))
    setBusy(false)
    setMessage('Degravação excluída.')
  }

  return <>
    <button className="transcript-fab" onClick={() => setOpen(true)} aria-label="Abrir degravações">📎 Degravações</button>
    {open && <div className="transcript-overlay" onMouseDown={e => e.target === e.currentTarget && setOpen(false)}>
      <section className="transcript-modal" role="dialog" aria-modal="true" aria-label="Biblioteca de degravações">
        <div className="transcript-head">
          <div><div className="eyebrow">MATERIAIS DA AULA</div><h2>Degravações</h2><p className="muted">Arquivos privados, vinculados à aula e disponíveis em qualquer dispositivo.</p></div>
          <button className="transcript-close" onClick={() => setOpen(false)}>Fechar</button>
        </div>

        {!cloudEnabled ? <div className="notice">A sincronização com Supabase precisa estar ativa para armazenar arquivos.</div> : !session ? <div className="notice">Entre na sua conta na aba <b>Conta</b> para enviar e baixar degravações.</div> : <>
          <div className="transcript-selectors">
            <label>Dia / tema
              <select value={planId} onChange={e => changePlan(e.target.value)}>{studyPlan.map(plan => <option key={plan.id} value={plan.id}>{plan.day} — {plan.theme}</option>)}</select>
            </label>
            <label>Aula
              <select value={lessonIndex} onChange={e => { setLessonIndex(Number(e.target.value)); setMessage('') }}>{selectedPlan.lessons.map((lesson, i) => <option key={`${selectedPlan.id}-${i}`} value={i}>{i + 1}. {lesson}</option>)}</select>
            </label>
          </div>

          <div className="transcript-lesson-card">
            <span className="eyebrow">AULA SELECIONADA</span>
            <strong>{selectedLesson}</strong>
            <span className="muted">{selectedPlan.day} • {selectedPlan.theme}</span>
          </div>

          <form className="transcript-form" onSubmit={uploadTranscript}>
            <label>Arquivo
              <input id="transcript-file-input" type="file" accept={ACCEPT} onChange={e => setFile(e.target.files?.[0] || null)} />
            </label>
            <label>Observações / pontos importantes <span className="muted">(opcional)</span>
              <textarea value={notes} onChange={e => setNotes(e.target.value)} placeholder="Ex.: revisar diferença entre prevenção e precaução; passar esquema para o caderno." rows={4} />
            </label>
            <div className="transcript-upload-row"><span className="muted">PDF, DOC, DOCX ou TXT • até 15 MB</span><button className="primary" type="submit" disabled={busy}>{busy ? 'Enviando…' : 'Salvar degravação'}</button></div>
          </form>

          {message && <div className="notice transcript-message">{message}</div>}

          <div className="transcript-list-head"><h3>Arquivos desta aula</h3><span className="counter">{currentRecords.length}</span></div>
          {!currentRecords.length ? <p className="empty">Nenhuma degravação salva para esta aula.</p> : <div className="transcript-list">{currentRecords.map(record => <article className="transcript-item" key={record.id}>
            <div><strong>📄 {record.file_name}</strong><div className="muted transcript-meta">{formatBytes(record.file_size)}{record.created_at ? ` • ${new Date(record.created_at).toLocaleString('pt-BR')}` : ''}</div>{record.notes && <p className="transcript-notes">{record.notes}</p>}</div>
            <div className="transcript-actions"><button className="primary" onClick={() => downloadTranscript(record)}>Baixar</button><button disabled={busy} onClick={() => removeTranscript(record)}>Excluir</button></div>
          </article>)}</div>}
        </>}
      </section>
    </div>}
  </>
}
