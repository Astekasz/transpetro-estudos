import { useEffect } from 'react'
import { questions } from './data/questions'

export default function ErrorNotebookDetails() {
  useEffect(() => {
    const questionByStatement = new Map(questions.map(q => [q.statement.trim(), q]))
    let scheduled = false

    function enhanceCards() {
      scheduled = false

      document.querySelectorAll('.error-card').forEach(card => {
        const paragraphs = [...card.querySelectorAll(':scope > p')]
        const questionParagraph = paragraphs.find(p => p.querySelector('strong') && !p.textContent?.startsWith('Erros nessa questão:'))
        const answerParagraph = paragraphs.find(p => p.textContent?.includes('Sua resposta:') && p.textContent?.includes('Correta:'))
        const explanationParagraph = paragraphs.find(p => p.classList.contains('muted'))

        if (!questionParagraph || !answerParagraph || answerParagraph.dataset.errorDetailsEnhanced === 'true') return

        const statement = questionParagraph.querySelector('strong')?.textContent?.trim() || ''
        const q = questionByStatement.get(statement)
        const match = answerParagraph.textContent?.match(/Sua resposta:\s*([A-E])\s*•\s*Correta:\s*([A-E])/)
        if (!match) return

        const selectedKey = match[1]
        const correctKey = match[2]
        const selectedText = q?.options?.[selectedKey] || selectedKey
        const correctText = q?.options?.[correctKey] || correctKey

        answerParagraph.textContent = ''
        answerParagraph.dataset.errorDetailsEnhanced = 'true'
        answerParagraph.style.display = 'grid'
        answerParagraph.style.gap = '10px'
        answerParagraph.style.margin = '16px 0'

        const selectedBlock = document.createElement('span')
        selectedBlock.style.display = 'block'
        selectedBlock.style.padding = '12px'
        selectedBlock.style.border = '1px solid #e3e8ec'
        selectedBlock.style.borderRadius = '10px'

        const selectedLabel = document.createElement('strong')
        selectedLabel.textContent = 'Você respondeu: '
        selectedBlock.appendChild(selectedLabel)
        selectedBlock.appendChild(document.createTextNode(selectedText))

        const correctBlock = document.createElement('span')
        correctBlock.style.display = 'block'
        correctBlock.style.padding = '12px'
        correctBlock.style.border = '1px solid #e3e8ec'
        correctBlock.style.borderRadius = '10px'

        const correctLabel = document.createElement('strong')
        correctLabel.textContent = 'Resposta correta: '
        correctBlock.appendChild(correctLabel)
        correctBlock.appendChild(document.createTextNode(correctText))

        answerParagraph.appendChild(selectedBlock)
        answerParagraph.appendChild(correctBlock)

        if (explanationParagraph && explanationParagraph.dataset.errorExplanationEnhanced !== 'true') {
          const explanation = explanationParagraph.textContent?.trim() || 'Sem explicação cadastrada para esta questão.'
          explanationParagraph.textContent = ''
          explanationParagraph.dataset.errorExplanationEnhanced = 'true'
          const label = document.createElement('strong')
          label.textContent = 'Explicação: '
          explanationParagraph.appendChild(label)
          explanationParagraph.appendChild(document.createTextNode(explanation))
        }
      })
    }

    function scheduleEnhance() {
      if (scheduled) return
      scheduled = true
      requestAnimationFrame(enhanceCards)
    }

    scheduleEnhance()
    const root = document.getElementById('root')
    if (!root) return

    const observer = new MutationObserver(scheduleEnhance)
    observer.observe(root, { childList: true, subtree: true })

    return () => observer.disconnect()
  }, [])

  return null
}
