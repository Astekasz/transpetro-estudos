import { studyPlan } from './studyPlan'
import { questions } from './questions'
import { lastExamQuestions } from './lastExamQuestions'
import { lastExamExplanations } from './lastExamExplanations'

export const DEFAULT_WRONG_SPECIFIC = new Set([
  'tp2023-27','tp2023-30','tp2023-31','tp2023-34','tp2023-35','tp2023-37',
  'tp2023-40','tp2023-41','tp2023-43','tp2023-44','tp2023-45','tp2023-46',
  'tp2023-50','tp2023-51','tp2023-52','tp2023-53','tp2023-54','tp2023-55',
  'tp2023-58','tp2023-59','tp2023-60','tp2023-61','tp2023-64','tp2023-65',
  'tp2023-66','tp2023-67','tp2023-68','tp2023-69','tp2023-70'
])

const groups = [
  {
    id: 'erros-pnma-pnrs',
    day: 'Segunda',
    theme: 'Erros da prova — PNMA e PNRS',
    questionNumbers: [43, 69, 70],
    lessons: [
      'Politica Nacional do Meio Ambiente',
      'Politica Nacional do Meio Ambiente II',
      'Lei Federal n. 12.305/2010 - Política Nacional de Resíduos Sólidos - Parte I',
      'Lei Federal n. 12.305/2010 - Política Nacional de Resíduos Sólidos - Parte II'
    ]
  },
  {
    id: 'erros-licenciamento-eia',
    day: 'Terça',
    theme: 'Erros da prova — EIA/RIMA e Licenciamento',
    questionNumbers: [40, 55, 58, 64],
    lessons: [
      'Resolução CONAMA 01/86 - Introdução',
      'Resolução CONAMA 01/86 - Considerações Finais e Questões',
      'Resolução do CONAMA nº 237/1997 - Licenciamento Ambiental',
      'LC 140/2011 - Competência Administrativa Ambiental e Cooperação dos Entes'
    ]
  },
  {
    id: 'erros-legislacao-setorial',
    day: 'Quarta',
    theme: 'Erros da prova — SNUC, CONAMA e Poluição por Óleo',
    questionNumbers: [31, 45, 59, 65, 66, 67, 68],
    lessons: [
      'Lei nº 9.985/00 - Sistema Nacional de Unidade de Conservação - Cap I - Disposições Preliminares',
      'Resolução CONAMA n. 357/2005',
      'CONAMA - 420/2009',
      'Revisão direcionada — PNMC, PNC, Lei 9.966/2000 e Planos de Área'
    ]
  },
  {
    id: 'erros-gestao-riscos',
    day: 'Quinta',
    theme: 'Erros da prova — Gestão Ambiental e Riscos',
    questionNumbers: [30, 50, 51, 54, 60, 61],
    lessons: [
      'Gestão de Riscos - ABNT ISO 31000, princípios, estrutura e processo da gestão de riscos',
      'NBR ISO 14004:2018 (sistemas de gestão ambiental: diretrizes e princípios gerais de uso)',
      'NBR ISO 14004:2018 (sistemas de gestão ambiental: diretrizes e princípios gerais de uso) II',
      'Revisão direcionada — ISO 14044, ACV, NBR 16001 e ISO 26000'
    ]
  },
  {
    id: 'erros-poluicao-saneamento',
    day: 'Sexta',
    theme: 'Erros da prova — Poluição, Água e Saneamento',
    questionNumbers: [27, 35, 37, 41, 46, 52, 53],
    lessons: [
      'Resolução CONAMA nº 430/2011',
      'Revisão direcionada — Poluição atmosférica, smog e controle de particulados',
      'Revisão direcionada — Tratamento de água, cloração e parâmetros de qualidade',
      'Revisão direcionada — Hidráulica de reservatórios e conversão de concentração de gases'
    ]
  },
  {
    id: 'erros-ciclos-microbiologia',
    day: 'Sábado',
    theme: 'Erros da prova — Ciclos e Microbiologia Ambiental',
    questionNumbers: [34, 44],
    lessons: [
      'Ciclos Biogeoquímicos',
      'Combustíveis Fósseis e Ciclo do Nitrogênio',
      'Revisão direcionada — Nitrificação, desnitrificação e processos microbianos',
      'Revisão direcionada — Biodeterioração e acidulação biogênica em reservatórios de petróleo'
    ]
  },
  {
    id: 'erros-reteste',
    day: 'Domingo',
    theme: 'Revisão da prova por erros',
    questionNumbers: [],
    lessons: [
      'Revisão ativa dos assuntos errados na semana',
      'Refazer as questões da Transpetro 2023 estudadas na semana',
      'Correção ativa: explicar por que cada alternativa errada está errada'
    ]
  }
]

function toQuestionId(number) {
  return `tp2023-${number}`
}

function currentErrorsForGroup(group, wrongSpecific) {
  return group.questionNumbers.filter(number => wrongSpecific.has(toQuestionId(number)))
}

function buildPlan(wrongSpecific) {
  return groups.map(group => {
    const currentErrors = currentErrorsForGroup(group, wrongSpecific)
    const diagnostic = group.questionNumbers.length
      ? currentErrors.length
        ? `Questões ainda erradas: ${currentErrors.map(number => `Q${number}`).join(', ')}`
        : `Bloco já corrigido na prova — mantenha apenas a revisão programada`
      : `Revisão semanal orientada pelo caderno de erros`

    return {
      id: group.id,
      day: group.day,
      theme: group.theme,
      block: diagnostic,
      questionNumbers: currentErrors,
      lessons: [...group.lessons]
    }
  })
}

function removePreviousErrorDrills() {
  for (let i = questions.length - 1; i >= 0; i -= 1) {
    if (questions[i]?.sourceType === 'Transpetro 2023 • revisão de erro') questions.splice(i, 1)
  }
}

function addErrorDrills(wrongSpecific) {
  removePreviousErrorDrills()

  for (const group of groups) {
    if (!group.questionNumbers.length) continue

    for (const number of group.questionNumbers) {
      const originalId = toQuestionId(number)
      if (!wrongSpecific.has(originalId)) continue
      const original = lastExamQuestions.find(question => question.id === originalId)
      if (!original) continue

      questions.push({
        ...original,
        id: `erro-revisao-${originalId}`,
        day: group.day,
        theme: group.theme,
        sourceType: 'Transpetro 2023 • revisão de erro',
        sourceLabel: `Revisão orientada pelo erro • Transpetro 2023 • Questão ${number}`,
        originalQuestionId: originalId,
        explanation: lastExamExplanations[number] || 'Revise o conceito cobrado e compare cada alternativa com a regra ou definição correta.'
      })
    }
  }
}

export function applyErrorDrivenStudyMode(wrongIds = DEFAULT_WRONG_SPECIFIC) {
  const wrongSpecific = new Set(
    [...wrongIds].filter(id => /^tp2023-(?:2[1-9]|[3-6]\d|70)$/.test(id))
  )

  const effectiveWrong = wrongSpecific.size ? wrongSpecific : DEFAULT_WRONG_SPECIFIC
  studyPlan.splice(0, studyPlan.length, ...buildPlan(effectiveWrong))
  addErrorDrills(effectiveWrong)
  return effectiveWrong
}
