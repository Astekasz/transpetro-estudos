import { useEffect } from 'react'
import { studyPlan } from './data/studyPlan'

const lessonMetaByTitle = {
  'Ecologia humana: saúde do homem em seu ambiente': {
    course: 'SEDUC PA — Conhecimentos Específicos — Biologia',
    topic: '5',
    lesson: '01'
  },
  'Ecologia': {
    course: 'SEDUC PA — Conhecimentos Específicos — Biologia',
    topic: '5',
    lesson: '02'
  },
  'Interação entre os Seres Vivos: conceitos básicos, relações tróficas e ecossistemas do Brasil': {
    course: 'SEDUC PA — Conhecimentos Específicos — Biologia',
    topic: '5',
    lesson: '03'
  },
  'Ecologia e biodiversidade': {
    course: 'SEDUC PA — Conhecimentos Específicos — Biologia',
    topic: '5',
    lesson: '04'
  },
  'Ecologia e biodiversidade II': {
    course: 'SEDUC PA — Conhecimentos Específicos — Biologia',
    topic: '5',
    lesson: '05'
  },
  'Ciclos Biogeoquímicos': {
    course: 'SEDUC PA — Conhecimentos Específicos — Biologia',
    topic: '6',
    lesson: '01'
  },
  'Combustíveis Fósseis e Ciclo do Nitrogênio': {
    course: 'SEDUC PA — Conhecimentos Específicos — Biologia',
    topic: '6',
    lesson: '02'
  },
  'Dinâmica de populações': {
    course: 'SEDUC PA — Conhecimentos Específicos — Biologia',
    topic: '8',
    lesson: '01'
  },
  'Dinâmica de populações II': {
    course: 'SEDUC PA — Conhecimentos Específicos — Biologia',
    topic: '8',
    lesson: '02'
  },
  'Ecologia, Conservação e Manejo da Biodiversidade': {
    course: 'SEDUC PA — Conhecimentos Específicos — Biologia',
    topic: '5',
    lesson: '06'
  },
  'Genética de Populações e Evolução: Seleção natural, mutação, deriva, fluxo gênico.': {
    course: 'IFRN — Conhecimentos Específicos para Professor EBTT — Biologia',
    topic: '6',
    lesson: '04'
  },
  'Especiação': {
    course: 'IFRN — Conhecimentos Específicos para Professor EBTT — Biologia',
    topic: '6',
    lesson: '07'
  },
  'Deriva continental e Tectônica de Placas': {
    course: 'IFPA — EBTT Biologia (Módulo Especial)',
    topic: '11',
    lesson: '01'
  },
  'Politica Nacional do Meio Ambiente': {
    course: 'Prefeitura de Itumbiara/GO — Analista Ambiental',
    topic: '2',
    lesson: '01',
    url: 'https://www.grancursosonline.com.br/cursos/por-concurso/prefeitura-de-itumbiara-go-analista-ambiental-pos-edital'
  },
  'Politica Nacional do Meio Ambiente II': {
    course: 'Prefeitura de Itumbiara/GO — Analista Ambiental',
    topic: '2',
    lesson: '02',
    url: 'https://www.grancursosonline.com.br/cursos/por-concurso/prefeitura-de-itumbiara-go-analista-ambiental-pos-edital'
  },
  'Lei Federal n. 12.305/2010 - Política Nacional de Resíduos Sólidos - Parte I': {
    course: 'Curso Completo de Carreiras Administrativas',
    topic: '2 — Política Nacional de Resíduos Sólidos',
    lesson: '01',
    url: 'https://www.grancursosonline.com.br/cursos/por-concurso/curso-completo-de-carreiras-administrativas'
  },
  'Lei Federal n. 12.305/2010 - Política Nacional de Resíduos Sólidos - Parte II': {
    course: 'Curso Completo de Carreiras Administrativas',
    topic: '2 — Política Nacional de Resíduos Sólidos',
    lesson: '02',
    url: 'https://www.grancursosonline.com.br/cursos/por-concurso/curso-completo-de-carreiras-administrativas'
  },
  'Resolução CONAMA 01/86 - Introdução': {
    course: 'Direito Ambiental para as Carreiras Jurídicas — Prof. Nilton Carlos',
    topic: 'EIA/RIMA',
    lesson: '11',
    url: 'https://www.grancursosonline.com.br/cursos/por-materia/direito-ambiental-para-carreiras-juridicas-professor-nilton-coutinho'
  },
  'Resolução CONAMA 01/86 - Considerações Finais e Questões': {
    course: 'Direito Ambiental para as Carreiras Jurídicas — Prof. Nilton Carlos',
    topic: 'EIA/RIMA',
    lesson: '12',
    url: 'https://www.grancursosonline.com.br/cursos/por-materia/direito-ambiental-para-carreiras-juridicas-professor-nilton-coutinho'
  },
  'Resolução do CONAMA nº 237/1997 - Licenciamento Ambiental': {
    course: 'Direito Ambiental para as Carreiras Jurídicas — Prof. Nilton Carlos',
    topic: 'Licenciamento Ambiental',
    lesson: '13',
    url: 'https://www.grancursosonline.com.br/cursos/por-materia/direito-ambiental-para-carreiras-juridicas-professor-nilton-coutinho'
  },
  'LC 140/2011 - Competência Administrativa Ambiental e Cooperação dos Entes': {
    course: 'PGE AC — Direito Ambiental — Prof. Pedro Abi Eçab',
    topic: '3 — Lei Complementar nº 140/2011',
    lesson: '01',
    url: 'https://www.grancursosonline.com.br/cursos/por-materia/pge-ac-procuradoria-geral-de-estado-do-acre-direito-ambiental-para-o-cargo-de-procurador-do-estado-classe-i-professor-pedro-abi-ecab'
  },
  'Lei nº 9.985/00 - Sistema Nacional de Unidade de Conservação - Cap I - Disposições Preliminares': {
    course: 'Direito Ambiental para as Carreiras Jurídicas — Prof. Nilton Carlos',
    topic: 'SNUC — Lei nº 9.985/2000',
    lesson: '05',
    url: 'https://www.grancursosonline.com.br/cursos/por-materia/direito-ambiental-para-carreiras-juridicas-professor-nilton-coutinho'
  },
  'Resolução CONAMA n. 357/2005': {
    course: 'IBAMA — Analista Ambiental — Tema 1: Licenciamento Ambiental',
    topic: 'Resoluções CONAMA',
    lesson: '31',
    url: 'https://www.grancursosonline.com.br/cursos/por-concurso/ibama-instituto-brasileiro-do-meio-ambiente-e-dos-recursos-naturais-renovaveis-analista-ambiental-tema-1-licenciamento-ambiental'
  },
  'CONAMA - 420/2009': {
    course: 'SEMA MT — Poluição e Controle Ambiental',
    topic: '4 — Resolução CONAMA nº 420/2009',
    lesson: '01',
    url: 'https://www.grancursosonline.com.br/cursos/por-materia/sema-mt-secretaria-de-estado-de-meio-ambiente-de-mato-grosso-poluicao-e-controle-ambiental-para-todos-os-cargos-e-perfis-professores-equipe-gran'
  },
  'Gestão de Riscos - ABNT ISO 31000, princípios, estrutura e processo da gestão de riscos': {
    course: 'CNU — Bloco 5 — Administração',
    topic: 'Gestão de Riscos',
    lesson: '04',
    url: 'https://www.grancursosonline.com.br/cursos/por-concurso/cnu-2025-concurso-nacional-unificado-bloco-5-administracao-pos-edital'
  },
  'NBR ISO 14004:2018 (sistemas de gestão ambiental: diretrizes e princípios gerais de uso)': {
    course: 'Transpetro — Ênfase 15: Engenharia Ambiental',
    topic: 'Gestão Ambiental / ISO 14004',
    lesson: '21',
    url: 'https://www.grancursosonline.com.br/cursos/por-concurso/petrobras-transporte-s-a-transpetro-profissional-transpetro-de-nivel-superior-enfase-15-engenharia-ambiental-pos-edital'
  },
  'NBR ISO 14004:2018 (sistemas de gestão ambiental: diretrizes e princípios gerais de uso) II': {
    course: 'Transpetro — Ênfase 15: Engenharia Ambiental',
    topic: 'Gestão Ambiental / ISO 14004',
    lesson: '22',
    url: 'https://www.grancursosonline.com.br/cursos/por-concurso/petrobras-transporte-s-a-transpetro-profissional-transpetro-de-nivel-superior-enfase-15-engenharia-ambiental-pos-edital'
  },
  'Resolução CONAMA nº 430/2011': {
    course: 'SEMA MT — Poluição e Controle Ambiental',
    topic: '3 — Resolução CONAMA nº 430/2011',
    lesson: '01',
    url: 'https://www.grancursosonline.com.br/cursos/por-materia/sema-mt-secretaria-de-estado-de-meio-ambiente-de-mato-grosso-poluicao-e-controle-ambiental-para-todos-os-cargos-e-perfis-professores-equipe-gran'
  }
}

function isActualLesson(title = '') {
  const text = title.trim().toLowerCase()
  if (!text) return false

  // Blocos de prática/revisão não possuem degravação de videoaula.
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

function openTranscript(planId, lessonIndex) {
  window.dispatchEvent(new CustomEvent('open-transcript-library', {
    detail: { planId, lessonIndex }
  }))
}

function findLesson(title) {
  for (const plan of studyPlan) {
    const lessonIndex = plan.lessons.findIndex(lesson => lesson === title)
    if (lessonIndex >= 0) return { plan, lessonIndex }
  }
  return null
}

function createTranscriptButton(planId, lessonIndex, lessonTitle) {
  const button = document.createElement('button')
  button.type = 'button'
  button.className = 'lesson-transcript-button'
  button.textContent = '📎 Degravação'
  button.setAttribute('aria-label', `Abrir degravação da aula ${lessonTitle}`)

  button.addEventListener('mousedown', event => {
    event.preventDefault()
    event.stopPropagation()
  })

  button.addEventListener('click', event => {
    event.preventDefault()
    event.stopPropagation()
    openTranscript(planId, lessonIndex)
  })

  return button
}

function createCourseLink(url) {
  const link = document.createElement('a')
  link.href = url
  link.target = '_blank'
  link.rel = 'noreferrer'
  link.textContent = '▶ Abrir curso no Gran'
  link.style.display = 'inline-flex'
  link.style.alignItems = 'center'
  link.style.justifyContent = 'center'
  link.style.padding = '9px 12px'
  link.style.border = '1px solid #cbd5e1'
  link.style.borderRadius = '8px'
  link.style.textDecoration = 'none'
  link.style.fontWeight = '700'
  link.style.color = 'inherit'
  link.style.background = '#fff'
  link.addEventListener('click', event => event.stopPropagation())
  return link
}

export default function LessonTranscriptButtons() {
  useEffect(() => {
    function addButtonsToSchedule() {
      const dayCards = document.querySelectorAll('.day-grid .day-card')

      dayCards.forEach((card, planIndex) => {
        const plan = studyPlan[planIndex]
        if (!plan) return

        const lessonRows = card.querySelectorAll('.lessons .lesson')
        lessonRows.forEach((row, lessonIndex) => {
          const lessonTitle = plan.lessons[lessonIndex]
          if (lessonTitle === undefined) return

          const existingButton = row.querySelector('.lesson-transcript-button')
          if (!isActualLesson(lessonTitle)) {
            existingButton?.remove()
            return
          }

          if (existingButton) return
          row.appendChild(createTranscriptButton(plan.id, lessonIndex, lessonTitle))
        })
      })
    }

    function addToolsToStudyToday() {
      const cards = document.querySelectorAll('.day-card:not(.day-grid .day-card)')

      cards.forEach(card => {
        if (card.querySelector('.study-today-lesson-tools')) return

        const lessonParagraph = Array.from(card.children).find(element => element.tagName === 'P')
        const lessonTitle = lessonParagraph?.textContent?.trim()
        if (!lessonTitle || !isActualLesson(lessonTitle)) return

        const lessonInfo = findLesson(lessonTitle)
        const meta = lessonMetaByTitle[lessonTitle]
        if (!lessonInfo || !meta) return

        const tools = document.createElement('div')
        tools.className = 'study-today-lesson-tools'
        tools.style.display = 'flex'
        tools.style.justifyContent = 'space-between'
        tools.style.alignItems = 'center'
        tools.style.gap = '12px'
        tools.style.flexWrap = 'wrap'
        tools.style.margin = '12px 0'
        tools.style.padding = '12px 14px'
        tools.style.border = '1px solid #dfe6ee'
        tools.style.borderRadius = '10px'
        tools.style.background = '#f8fafc'

        const details = document.createElement('div')
        details.style.display = 'grid'
        details.style.gap = '4px'

        const course = document.createElement('div')
        course.innerHTML = `<strong>Curso:</strong> ${meta.course}`

        const identifiers = document.createElement('div')
        identifiers.className = 'muted'
        identifiers.innerHTML = `<strong>Tópico:</strong> ${meta.topic} &nbsp;•&nbsp; <strong>Aula:</strong> ${meta.lesson}`

        const actions = document.createElement('div')
        actions.style.display = 'flex'
        actions.style.alignItems = 'center'
        actions.style.gap = '8px'
        actions.style.flexWrap = 'wrap'
        if (meta.url) actions.appendChild(createCourseLink(meta.url))
        actions.appendChild(createTranscriptButton(lessonInfo.plan.id, lessonInfo.lessonIndex, lessonTitle))

        details.appendChild(course)
        details.appendChild(identifiers)
        tools.appendChild(details)
        tools.appendChild(actions)

        lessonParagraph.insertAdjacentElement('afterend', tools)
      })
    }

    function addButtons() {
      addButtonsToSchedule()
      addToolsToStudyToday()
    }

    const root = document.getElementById('root')
    if (!root) return

    addButtons()
    const observer = new MutationObserver(addButtons)
    observer.observe(root, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  return null
}
