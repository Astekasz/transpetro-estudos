import { useEffect } from 'react'

export default function AnswerFeedbackNormalizer() {
  useEffect(() => {
    let scheduled = false

    function normalizeFeedback() {
      scheduled = false

      document.querySelectorAll('.question-card').forEach(card => {
        const feedbackStrong = card.querySelector('.feedback > b')
        if (!feedbackStrong) return

        const text = feedbackStrong.textContent?.trim() || ''
        if (!text.startsWith('Resposta correta:')) return

        const correctButton = card.querySelector('.options button.correct')
        const visibleLetter = correctButton?.querySelector('b')?.textContent?.trim()
        if (!visibleLetter || !/^[A-E]$/.test(visibleLetter)) return

        const expected = `Resposta correta: ${visibleLetter}.`
        if (feedbackStrong.textContent !== expected) {
          feedbackStrong.textContent = expected
        }
      })
    }

    function scheduleNormalize() {
      if (scheduled) return
      scheduled = true
      requestAnimationFrame(normalizeFeedback)
    }

    scheduleNormalize()
    const root = document.getElementById('root')
    if (!root) return

    const observer = new MutationObserver(scheduleNormalize)
    observer.observe(root, {
      childList: true,
      subtree: true,
      characterData: true,
      attributes: true,
      attributeFilter: ['class']
    })

    return () => observer.disconnect()
  }, [])

  return null
}
