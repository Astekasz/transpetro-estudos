import { useEffect } from 'react'

const WRAPPER_ID = 'extra-study-options'

export default function ExtraStudyOptions() {
  useEffect(() => {
    let scheduled = false

    function goTo(label) {
      const button = [...document.querySelectorAll('nav.nav button')]
        .find(item => item.textContent?.trim() === label)
      button?.click()
      window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    function renderExtraStudy() {
      scheduled = false
      const activeTab = document.querySelector('nav.nav button.active')?.textContent?.trim()
      const existing = document.getElementById(WRAPPER_ID)

      if (activeTab !== 'Estudar hoje') {
        existing?.remove()
        return
      }

      if (existing) return

      const main = document.querySelector('main')
      const todayPanel = main?.querySelector(':scope > section.panel')
      if (!main || !todayPanel) return

      const section = document.createElement('section')
      section.id = WRAPPER_ID
      section.className = 'panel'
      section.style.marginTop = '22px'
      section.innerHTML = `
        <div class="eyebrow">ESTUDO EXTRA • OPCIONAL</div>
        <h2 style="margin-bottom:8px">Terminou o plano de hoje? Continue estudando</h2>
        <p class="muted" style="margin-top:0">O estudo extra não altera sua meta diária de 3 horas. Escolha como quer aproveitar o tempo adicional.</p>
        <div style="display:grid;grid-template-columns:repeat(auto-fit,minmax(210px,1fr));gap:12px;margin-top:18px">
          <button type="button" class="primary" data-extra-target="Questões">+ 20 questões</button>
          <button type="button" data-extra-target="Simulado">Simulado extra</button>
          <button type="button" data-extra-target="Caderno de erros">Revisar caderno de erros</button>
          <button type="button" data-extra-target="Aulas">Antecipar próximas aulas</button>
        </div>
        <p class="muted" style="margin:14px 0 0;font-size:13px">Sugestão: priorize questões e caderno de erros; antecipe aulas apenas se estiver com as revisões em dia.</p>
      `

      section.querySelectorAll('[data-extra-target]').forEach(button => {
        button.addEventListener('click', () => goTo(button.dataset.extraTarget))
      })

      main.appendChild(section)
    }

    function scheduleRender() {
      if (scheduled) return
      scheduled = true
      requestAnimationFrame(renderExtraStudy)
    }

    scheduleRender()
    const root = document.getElementById('root')
    const observer = root ? new MutationObserver(scheduleRender) : null
    observer?.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ['class'] })

    return () => {
      observer?.disconnect()
      document.getElementById(WRAPPER_ID)?.remove()
    }
  }, [])

  return null
}
