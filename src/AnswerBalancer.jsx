import { useEffect } from 'react'
import { questions } from './data/questions'

const LETTERS = ['A', 'B', 'C', 'D', 'E']

function hashString(value) {
  let hash = 2166136261
  for (let i = 0; i < value.length; i++) {
    hash ^= value.charCodeAt(i)
    hash = Math.imul(hash, 16777619)
  }
  return hash >>> 0
}

function seededShuffle(items, seedText) {
  const copy = [...items]
  let seed = hashString(seedText) || 1
  function next() {
    seed ^= seed << 13
    seed ^= seed >>> 17
    seed ^= seed << 5
    return (seed >>> 0) / 4294967296
  }
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(next() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }
  return copy
}

function getSessionSalt() {
  const key = 'tp_answer_shuffle_salt'
  let salt = sessionStorage.getItem(key)
  if (!salt) {
    salt = crypto.randomUUID()
    sessionStorage.setItem(key, salt)
  }
  return salt
}

export default function AnswerBalancer() {
  useEffect(() => {
    const questionByStatement = new Map(questions.map(q => [q.statement.trim(), q]))
    const salt = getSessionSalt()
    let scheduled = false

    function balanceChunk(cards, chunkIndex) {
      const resolved = cards.map(card => {
        const statement = card.querySelector('h3')?.textContent?.trim()
        const q = statement ? questionByStatement.get(statement) : null
        return { card, q }
      }).filter(item => item.q)

      if (!resolved.length) return

      const signature = resolved.map(({ q }) => q.id).join('|')
      const cycle = seededShuffle(LETTERS, `${salt}|chunk:${chunkIndex}|${signature}`)

      resolved.forEach(({ card, q }, index) => {
        const optionsBox = card.querySelector('.options')
        if (!optionsBox) return

        const buttons = [...optionsBox.querySelectorAll(':scope > button')]
        if (buttons.length !== 5) return

        buttons.forEach(button => {
          if (!button.dataset.canonicalKey) {
            const originalLetter = button.querySelector('b')?.textContent?.trim()
            if (LETTERS.includes(originalLetter)) button.dataset.canonicalKey = originalLetter
          }
        })

        const byCanonical = new Map(buttons.map(button => [button.dataset.canonicalKey, button]))
        if (!LETTERS.every(letter => byCanonical.has(letter))) return

        const targetCorrect = cycle[index % cycle.length]
        const targetIndex = LETTERS.indexOf(targetCorrect)
        const incorrectKeys = LETTERS.filter(letter => letter !== q.correct)
        const shuffledIncorrect = seededShuffle(incorrectKeys, `${salt}|${q.id}|${chunkIndex}`)

        const desiredCanonicalOrder = []
        let wrongIndex = 0
        for (let position = 0; position < LETTERS.length; position++) {
          desiredCanonicalOrder.push(position === targetIndex ? q.correct : shuffledIncorrect[wrongIndex++])
        }

        desiredCanonicalOrder.forEach((canonicalKey, position) => {
          const button = byCanonical.get(canonicalKey)
          const expectedLetter = LETTERS[position]
          const bold = button.querySelector('b')
          if (bold && bold.textContent?.trim() !== expectedLetter) bold.textContent = expectedLetter
          if (optionsBox.children[position] !== button) optionsBox.appendChild(button)
        })
      })
    }

    function applyBalance() {
      scheduled = false
      const lists = [...document.querySelectorAll('.question-list')]
      lists.forEach(list => {
        const cards = [...list.children].filter(node => node.classList?.contains('question-card'))
        for (let start = 0; start < cards.length; start += 20) {
          balanceChunk(cards.slice(start, start + 20), Math.floor(start / 20))
        }
      })
    }

    function scheduleBalance() {
      if (scheduled) return
      scheduled = true
      requestAnimationFrame(applyBalance)
    }

    scheduleBalance()
    const root = document.getElementById('root')
    if (!root) return

    const observer = new MutationObserver(scheduleBalance)
    observer.observe(root, { childList: true, subtree: true, characterData: true, attributes: true, attributeFilter: ['class'] })

    return () => observer.disconnect()
  }, [])

  return null
}
