import { useEffect } from 'react'
import { studyPlan } from './data/studyPlan'

export default function LessonTranscriptButtons() {
  useEffect(() => {
    function addButtons() {
      const dayCards = document.querySelectorAll('.day-grid .day-card')

      dayCards.forEach((card, planIndex) => {
        const plan = studyPlan[planIndex]
        if (!plan) return

        const lessonRows = card.querySelectorAll('.lessons .lesson')
        lessonRows.forEach((row, lessonIndex) => {
          if (row.querySelector('.lesson-transcript-button')) return
          if (plan.lessons[lessonIndex] === undefined) return

          const button = document.createElement('button')
          button.type = 'button'
          button.className = 'lesson-transcript-button'
          button.textContent = '📎 Degravação'
          button.setAttribute('aria-label', `Abrir degravação da aula ${plan.lessons[lessonIndex]}`)

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
