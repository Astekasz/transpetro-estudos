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
  'Adaptação e Especiação': {
    course: 'IFPA — EBTT Biologia (Módulo Especial)',
    topic: '8',
    lesson: '01'
  },
  'Genética das Populações e Evolução: Teoria e Mecanismos': {
    course: 'IFPA — EBTT Biologia (Módulo Especial)',
    topic: '8',
    lesson: '02'
  },
  'Deriva continental e Tectônica de Placas': {
    course: 'IFPA — EBTT Biologia (Módulo Especial)',
    topic: '11',
    lesson: '01'
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

        details.appendChild(course)
        details.appendChild(identifiers)
        tools.appendChild(details)
        tools.appendChild(createTranscriptButton(lessonInfo.plan.id, lessonInfo.lessonIndex, lessonTitle))

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
