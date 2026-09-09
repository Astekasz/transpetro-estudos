import { useEffect } from 'react'

const CONTROL_CLASS = 'answer-confirmation-control'
const PENDING_CLASS = 'pending-confirmation'

export default function AnswerConfirmation() {
  useEffect(() => {
    const pendingByCard = new WeakMap()

    function removeControl(card) {
      card?.querySelector(`.${CONTROL_CLASS}`)?.remove()
      card?.querySelectorAll(`.options button.${PENDING_CLASS}`).forEach(button => {
        button.classList.remove(PENDING_CLASS)
      })
      pendingByCard.delete(card)
    }

    function ensureControl(card) {
      let control = card.querySelector(`.${CONTROL_CLASS}`)
      if (control) return control

      control = document.createElement('div')
      control.className = CONTROL_CLASS
      control.innerHTML = `
        <span class="answer-confirmation-text">Confira a alternativa antes de confirmar.</span>
        <button type="button" class="answer-confirmation-button">Confirmar resposta</button>
      `

      const options = card.querySelector('.options')
      options?.insertAdjacentElement('afterend', control)

      const confirmButton = control.querySelector('.answer-confirmation-button')
      confirmButton?.addEventListener('click', () => {
        const selectedButton = pendingByCard.get(card)
        if (!selectedButton || selectedButton.disabled) return

        selectedButton.dataset.confirmBypass = '1'
        removeControl(card)
        selectedButton.click()
      })

      return control
    }

    function handleOptionClick(event) {
      const target = event.target instanceof Element ? event.target.closest('.question-card .options button') : null
      if (!target || target.disabled) return

      if (target.dataset.confirmBypass === '1') {
        delete target.dataset.confirmBypass
        return
      }

      const card = target.closest('.question-card')
      if (!card) return

      event.preventDefault()
      event.stopPropagation()
      event.stopImmediatePropagation()

      card.querySelectorAll(`.options button.${PENDING_CLASS}`).forEach(button => {
        button.classList.remove(PENDING_CLASS)
      })
      target.classList.add(PENDING_CLASS)
      pendingByCard.set(card, target)
      ensureControl(card)
    }

    function cleanAnsweredCards() {
      document.querySelectorAll('.question-card').forEach(card => {
        const optionButtons = [...card.querySelectorAll('.options button')]
        const answeredNormalQuestion = optionButtons.length > 0 && optionButtons.every(button => button.disabled)
        if (answeredNormalQuestion) removeControl(card)
      })
    }

    document.addEventListener('click', handleOptionClick, true)

    const root = document.getElementById('root')
    const observer = root
      ? new MutationObserver(() => requestAnimationFrame(cleanAnsweredCards))
      : null

    observer?.observe(root, { childList: true, subtree: true, attributes: true, attributeFilter: ['disabled'] })

    return () => {
      document.removeEventListener('click', handleOptionClick, true)
      observer?.disconnect()
      document.querySelectorAll(`.${CONTROL_CLASS}`).forEach(control => control.remove())
      document.querySelectorAll(`.options button.${PENDING_CLASS}`).forEach(button => button.classList.remove(PENDING_CLASS))
    }
  }, [])

  return null
}
