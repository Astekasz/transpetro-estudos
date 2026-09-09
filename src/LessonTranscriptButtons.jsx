import { useEffect } from 'react'
import { studyPlan } from './data/studyPlan'

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

export default function LessonTranscriptButtons() {
  useEffect(() => {
    function addButtons() {
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
            window.dispatchEvent(new CustomEvent('open-transcript-library', {
              detail: { planId: plan.id, lessonIndex }
            }))
          })

          row.appendChild(button)
        })
      })
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
