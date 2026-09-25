import { useEffect } from 'react'

const CONTROL_CLASS = 'option-eliminate'
const ELIMINATED_CLASS = 'option-eliminated'

export default function OptionEliminator() {
  useEffect(() => {
    let scheduled = false

    function toggleOption(control, button) {
      const eliminated = button.classList.toggle(ELIMINATED_CLASS)
      control.setAttribute('aria-pressed', eliminated ? 'true' : 'false')
      control.title = eliminated ? 'Restaurar alternativa' : 'Eliminar esta alternativa'
      control.setAttribute('aria-label', eliminated ? 'Restaurar alternativa' : 'Eliminar alternativa')
    }

    function addControl(button) {
      if (button.disabled) {
        button.classList.remove(ELIMINATED_CLASS)
        button.querySelector('.' + CONTROL_CLASS)?.remove()
        return
      }

      if (button.querySelector('.' + CONTROL_CLASS)) return

      const control = document.createElement('span')
      control.className = CONTROL_CLASS
      control.textContent = '✕'
      control.setAttribute('role', 'button')
      control.setAttribute('tabindex', '0')
      control.setAttribute('aria-pressed', 'false')
      control.setAttribute('aria-label', 'Eliminar alternativa')
      control.title = 'Eliminar esta alternativa'

      control.addEventListener('click', event => {
        event.preventDefault()
        event.stopPropagation()
        toggleOption(control, button)
      })

      control.addEventListener('keydown', event => {
        if (event.key !== 'Enter' && event.key !== ' ') return
        event.preventDefault()
        event.stopPropagation()
        toggleOption(control, button)
      })

      button.appendChild(control)
    }

    function enhance() {
      scheduled = false
      document.querySelectorAll('.question-card .options > button').forEach(addControl)
    }

    function scheduleEnhance() {
      if (scheduled) return
      scheduled = true
      requestAnimationFrame(enhance)
    }

    scheduleEnhance()

    const root = document.getElementById('root')
    if (!root) return

    const observer = new MutationObserver(scheduleEnhance)
    observer.observe(root, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['disabled']
    })

    return () => {
      observer.disconnect()
      document.querySelectorAll('.' + CONTROL_CLASS).forEach(control => control.remove())
      document.querySelectorAll('.' + ELIMINATED_CLASS).forEach(button => button.classList.remove(ELIMINATED_CLASS))
    }
  }, [])

  return null
}
