import { lastExamQuestions1to20 } from './lastExamQuestions1to20'
import { lastExamQuestions21to35 } from './lastExamQuestions21to35'
import { lastExamQuestions36to50 } from './lastExamQuestions36to50'
import { lastExamQuestions51to70 } from './lastExamQuestions51to70'
import { q46Figure } from './q46Figure'

export const lastExamQuestions = [
  ...lastExamQuestions1to20,
  ...lastExamQuestions21to35,
  ...lastExamQuestions36to50,
  ...lastExamQuestions51to70
].map(question => question.number === 46 ? { ...question, figure: q46Figure } : question)
