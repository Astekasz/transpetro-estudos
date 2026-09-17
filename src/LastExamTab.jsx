import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

const SOURCE_URL = 'https://www.qconcursos.com/questoes-de-concursos/provas/cesgranrio-2023-transpetro-profissional-transpetro-de-nivel-superior-junior-enfase-3-analise-ambiental'

export default function LastExamTab() {
  const [navTarget, setNavTarget] = useState(null)
  const [mainTarget, setMainTarget] = useState(null)
  const [open, setOpen] = useState(false)

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
          <h2>Última prova de Análise Ambiental</h2>
          <p className="muted">Esta aba será reservada exclusivamente para as questões reais da prova, mantendo enunciado e alternativas exatamente como constam no caderno original.</p>
        </div>
        <a className="last-exam-source-link" href={SOURCE_URL} target="_blank" rel="noreferrer">Consultar prova original ↗</a>
      </div>

      <div className="notice last-exam-note">
        <strong>Sem adaptações:</strong> removi desta aba as questões inéditas inspiradas na Transpetro 2023. Elas continuam disponíveis no banco geral de treino, mas não serão apresentadas como questões da prova.
      </div>

      <div className="empty" style={{padding:'44px 24px'}}>
        <strong>Questões literais ainda não carregadas.</strong>
        <p style={{margin:'10px auto 0',maxWidth:720}}>Para preencher esta aba com fidelidade, será usado o caderno original da prova de Análise Ambiental. Depois de carregado, a aba poderá manter a ordem original, salvar seu progresso e permitir que você continue de onde parou.</p>
      </div>
    </section>,
    mainTarget
  ) : null

  return <>{navButton}{panel}</>
}
