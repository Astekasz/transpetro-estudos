from pathlib import Path

p = Path('src/App.jsx')
s = p.read_text()

s = s.replace(
    "    adaptiveQuestionsRef.current = { key: null, ids: [] }\n    setProgress(Object.fromEntries((p || []).map(row => [row.item_key, row.status])))",
    "    setProgress(Object.fromEntries((p || []).map(row => [row.item_key, row.status])))"
)

old = """    const questionContextKey = `${todayName}|${contentQueue.map(item => item.key).join('|')}`
    let todayQuestions = []
    if (adaptiveQuestionsRef.current.key === questionContextKey && adaptiveQuestionsRef.current.ids.length) {
      todayQuestions = adaptiveQuestionsRef.current.ids.map(id => pool.find(q => q.id === id)).filter(Boolean)
    }
    if (!todayQuestions.length) {
      todayQuestions = [...pool].sort((a,b) => score(b) - score(a)).slice(0,20)
      adaptiveQuestionsRef.current = { key: questionContextKey, ids: todayQuestions.map(q => q.id) }
    }"""

new = """    const questionContextKey = `${todayName}|${contentQueue.map(item => item.key).join('|')}`
    const adaptiveStorageKey = `tp_adaptive_questions:${session?.user?.id || 'local'}:${questionContextKey}`
    let todayQuestions = []

    if (adaptiveQuestionsRef.current.key === questionContextKey && adaptiveQuestionsRef.current.ids.length) {
      todayQuestions = adaptiveQuestionsRef.current.ids.map(id => pool.find(q => q.id === id)).filter(Boolean)
    }

    if (!todayQuestions.length) {
      try {
        const storedIds = JSON.parse(sessionStorage.getItem(adaptiveStorageKey) || '[]')
        if (Array.isArray(storedIds) && storedIds.length) {
          todayQuestions = storedIds.map(id => pool.find(q => q.id === id)).filter(Boolean)
        }
      } catch {
        sessionStorage.removeItem(adaptiveStorageKey)
      }
    }

    if (!todayQuestions.length) {
      todayQuestions = [...pool].sort((a,b) => score(b) - score(a)).slice(0,20)
      try {
        sessionStorage.setItem(adaptiveStorageKey, JSON.stringify(todayQuestions.map(q => q.id)))
      } catch {}
    }

    adaptiveQuestionsRef.current = { key: questionContextKey, ids: todayQuestions.map(q => q.id) }"""

if old not in s:
    raise SystemExit('Bloco esperado não encontrado; nenhuma alteração aplicada.')

p.write_text(s.replace(old, new))
