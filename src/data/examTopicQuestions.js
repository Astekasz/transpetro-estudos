const letters = ['A', 'B', 'C', 'D', 'E']

function Q(id, day, theme, topic, statement, alternatives, correct, explanation) {
  return {
    id,
    day,
    theme,
    sourceType: 'Inédita • temas cobrados na Transpetro 2023',
    sourceLabel: `Reforço pós-prova • estilo Cesgranrio • ${topic}`,
    statement,
    options: Object.fromEntries(letters.map((letter, index) => [letter, alternatives[index]])),
    correct,
    explanation
  }
}

export const examTopicQuestions = [
  // =========================================================
  // PNMA + PNRS — questões 43, 69 e 70 da prova-base
  // =========================================================
  Q('q231','Segunda','Erros da prova — PNMA e PNRS','PNMA — instrumentos',
    'A Lei nº 6.938/1981 estabelece instrumentos para a execução da Política Nacional do Meio Ambiente. Entre eles encontra-se',
    ['o estabelecimento de padrões de qualidade ambiental','a concessão automática de licença ambiental para atividade de baixo risco','a outorga de uso de recursos hídricos como instrumento exclusivo da PNMA','a criação obrigatória de unidades de conservação municipais','o licenciamento apenas de atividades industriais federais'],
    'A',
    'O estabelecimento de padrões de qualidade ambiental é instrumento expresso da PNMA. A outorga de uso da água pertence à Política Nacional de Recursos Hídricos.'
  ),
  Q('q232','Segunda','Erros da prova — PNMA e PNRS','PNRS — logística reversa',
    'Uma empresa estrutura sistema para receber produtos pós-consumo e encaminhá-los ao reaproveitamento em novos ciclos produtivos ou a destinação final ambientalmente adequada. Segundo a PNRS, esse mecanismo corresponde à',
    ['coleta seletiva municipal','logística reversa','responsabilidade civil subjetiva','licença de operação','compensação ambiental'],
    'B',
    'Logística reversa é o conjunto de ações, procedimentos e meios destinados à coleta e restituição de resíduos ao setor empresarial para reaproveitamento ou destinação ambientalmente adequada.'
  ),
  Q('q233','Segunda','Erros da prova — PNMA e PNRS','PNRS — princípios',
    'Entre os princípios previstos na Política Nacional de Resíduos Sólidos está o',
    ['princípio da industrialização máxima','princípio da disposição final como primeira opção','poluidor-pagador e protetor-recebedor','princípio da ausência de responsabilidade compartilhada','princípio da vedação à reciclagem'],
    'C',
    'A PNRS prevê expressamente os princípios do poluidor-pagador e do protetor-recebedor.'
  ),
  Q('q234','Segunda','Erros da prova — PNMA e PNRS','PNRS — ordem de prioridade',
    'Na gestão e gerenciamento de resíduos sólidos, a ordem de prioridade começa por',
    ['tratamento e disposição final','reciclagem e incineração','reutilização e coleta seletiva','não geração e redução','disposição final e recuperação energética'],
    'D',
    'A ordem legal começa por não geração, redução, reutilização, reciclagem, tratamento e, por último, disposição final ambientalmente adequada dos rejeitos.'
  ),
  Q('q235','Segunda','Erros da prova — PNMA e PNRS','PNRS — responsabilidade compartilhada',
    'A responsabilidade compartilhada pelo ciclo de vida dos produtos envolve',
    ['somente o consumidor final','somente os Municípios','apenas fabricantes e importadores','exclusivamente cooperativas de catadores','fabricantes, importadores, distribuidores, comerciantes, consumidores e titulares dos serviços públicos de limpeza urbana, nos termos da lei'],
    'E',
    'A PNRS distribui responsabilidades entre os diversos agentes do ciclo de vida dos produtos.'
  ),
  Q('q236','Segunda','Erros da prova — PNMA e PNRS','PNMA — Sisnama',
    'No Sisnama, o órgão consultivo e deliberativo é o',
    ['Conama','Ibama','ICMBio','Ministério Público Federal','Conselho de Recursos Hídricos'],
    'A',
    'O Conama exerce função consultiva e deliberativa no Sisnama.'
  ),

  // =========================================================
  // EIA/RIMA + licenciamento + LC 140 — questões 40, 55, 58 e 64
  // =========================================================
  Q('q237','Terça','Erros da prova — EIA/RIMA e Licenciamento','RIMA',
    'Segundo a Resolução Conama nº 001/1986, o RIMA deve',
    ['ser redigido exclusivamente em linguagem técnico-científica','refletir as conclusões do EIA e apresentar as informações de forma objetiva e acessível ao público','substituir integralmente o EIA','conter apenas a descrição do empreendimento','ser sigiloso durante todo o processo'],
    'B',
    'O RIMA reflete as conclusões do EIA e deve comunicar os resultados em linguagem acessível, com recursos que facilitem a compreensão.'
  ),
  Q('q238','Terça','Erros da prova — EIA/RIMA e Licenciamento','métodos de avaliação de impactos',
    'Na avaliação de impactos ambientais, o método de Leopold é classicamente caracterizado como',
    ['rede de interação','listagem simples','matriz de interação','modelo exclusivamente econômico','método sem identificação de magnitude'],
    'C',
    'A matriz de Leopold cruza ações do empreendimento com fatores ambientais, permitindo avaliar magnitude e importância dos impactos.'
  ),
  Q('q239','Terça','Erros da prova — EIA/RIMA e Licenciamento','Conama 237/1997 — prazos',
    'Pela Resolução Conama nº 237/1997, os prazos máximos gerais para análise de EIA/RIMA e dos demais estudos ambientais são, respectivamente,',
    ['6 e 3 meses','6 e 12 meses','18 e 6 meses','12 e 6 meses','24 e 12 meses'],
    'D',
    'A regra geral é prazo máximo de 12 meses para EIA/RIMA e 6 meses para os demais estudos, ressalvadas as hipóteses previstas na norma.'
  ),
  Q('q240','Terça','Erros da prova — EIA/RIMA e Licenciamento','LC 140/2011 — atuação subsidiária',
    'Quando um ente federativo, a pedido, auxilia outro ente originariamente competente no desempenho de atribuições ambientais, ocorre',
    ['delegação automática de competência','atuação supletiva obrigatória','avocação administrativa','competência legislativa concorrente','atuação subsidiária'],
    'E',
    'A atuação subsidiária consiste no auxílio solicitado pelo ente originariamente detentor da atribuição.'
  ),
  Q('q241','Terça','Erros da prova — EIA/RIMA e Licenciamento','licenciamento ambiental',
    'Em regra, a licença que autoriza a instalação do empreendimento de acordo com os planos, programas e projetos aprovados é a',
    ['Licença de Instalação','Licença Prévia','Licença de Operação','Autorização de Supressão','Certidão Ambiental'],
    'A',
    'A LI autoriza a instalação conforme as especificações dos planos, programas e projetos aprovados, incluindo medidas de controle ambiental.'
  ),
  Q('q242','Terça','Erros da prova — EIA/RIMA e Licenciamento','EIA — diagnóstico ambiental',
    'Entre as atividades técnicas mínimas do EIA está o diagnóstico ambiental da área de influência, contemplando',
    ['somente o meio físico','os meios físico, biológico e socioeconômico','apenas fauna e flora','somente variáveis econômicas','apenas emissões atmosféricas'],
    'B',
    'O diagnóstico ambiental deve considerar os meios físico, biológico e socioeconômico e suas interações.'
  ),

  // =========================================================
  // SNUC + CONAMA + poluição por óleo — questões 31, 45, 59, 65-69
  // =========================================================
  Q('q243','Quarta','Erros da prova — SNUC, CONAMA e Poluição por Óleo','Conama 420/2009 — Valor de Investigação',
    'Na Resolução Conama nº 420/2009, o Valor de Investigação é a concentração de uma substância no solo ou na água subterrânea',
    ['correspondente obrigatoriamente ao valor natural de fundo','abaixo da qual o solo deve ser considerado contaminado','acima da qual existem riscos potenciais à saúde humana em cenário padronizado de exposição','que define automaticamente a necessidade de remoção total do solo','equivalente ao limite de potabilidade de qualquer água superficial'],
    'C',
    'O VI indica concentração acima da qual há riscos potenciais, diretos ou indiretos, à saúde humana, considerando cenário padronizado de exposição.'
  ),
  Q('q244','Quarta','Erros da prova — SNUC, CONAMA e Poluição por Óleo','SNUC — corredores ecológicos',
    'Porções de ecossistemas naturais ou seminaturais que ligam unidades de conservação e favorecem fluxo gênico, dispersão e recolonização são chamadas de',
    ['zonas de amortecimento','reservas legais','áreas de uso intensivo','corredores ecológicos','refúgios administrativos'],
    'D',
    'Essa é a definição legal de corredores ecológicos no SNUC.'
  ),
  Q('q245','Quarta','Erros da prova — SNUC, CONAMA e Poluição por Óleo','Conama 357/2005 — ambiente lótico',
    'Segundo a terminologia da Resolução Conama nº 357/2005, ambiente lótico corresponde a',
    ['águas subterrâneas confinadas','águas marinhas profundas','águas continentais paradas','águas de estuário exclusivamente','águas continentais moventes'],
    'E',
    'Ambiente lótico é relativo a águas continentais moventes, como rios e córregos.'
  ),
  Q('q246','Quarta','Erros da prova — SNUC, CONAMA e Poluição por Óleo','Plano Nacional de Contingência — óleo',
    'No Plano Nacional de Contingência para incidentes de poluição por óleo, a Agência Nacional do Petróleo, Gás Natural e Biocombustíveis integra',
    ['o Grupo de Acompanhamento e Avaliação','a Autoridade Marítima exclusivamente','o Conama','o Conselho Nacional de Recursos Hídricos','o Comitê de Bacia local'],
    'A',
    'A ANP integra o Grupo de Acompanhamento e Avaliação do PNC.'
  ),
  Q('q247','Quarta','Erros da prova — SNUC, CONAMA e Poluição por Óleo','Lei 9.966/2000',
    'A Lei nº 9.966/2000 disciplina aspectos relacionados à prevenção, controle e fiscalização da poluição causada por',
    ['resíduos domiciliares em aterros','óleo e outras substâncias nocivas ou perigosas em águas sob jurisdição nacional','agrotóxicos aplicados em lavouras apenas','emissões veiculares urbanas','ruído industrial'],
    'B',
    'A lei trata da movimentação de óleo e outras substâncias nocivas ou perigosas em portos, instalações portuárias, plataformas e navios em águas sob jurisdição nacional.'
  ),
  Q('q248','Quarta','Erros da prova — SNUC, CONAMA e Poluição por Óleo','PNMC/Fundo Clima',
    'No regime do Fundo Nacional sobre Mudança do Clima, o plano anual de aplicação dos recursos é elaborado pelo órgão federal ambiental competente e submetido à aprovação do',
    ['Conselho Monetário Nacional','Congresso Nacional','Comitê Gestor do Fundo','Ibama, isoladamente','Conama, obrigatoriamente'],
    'C',
    'O plano anual de aplicação dos recursos do Fundo Clima é submetido à aprovação de seu Comitê Gestor.'
  ),

  // =========================================================
  // Gestão ambiental + riscos + ISO — questões 30, 50, 51, 54, 60 e 61
  // =========================================================
  Q('q249','Quinta','Erros da prova — Gestão Ambiental e Riscos','ISO 14044 — ACV',
    'Na Avaliação do Ciclo de Vida, a etapa que identifica e quantifica entradas e saídas relevantes de matéria e energia é denominada',
    ['definição de escopo','análise de sensibilidade','interpretação','inventário do ciclo de vida','auditoria de conformidade'],
    'D',
    'O Inventário do Ciclo de Vida quantifica fluxos de entrada e saída associados ao sistema estudado.'
  ),
  Q('q250','Quinta','Erros da prova — Gestão Ambiental e Riscos','ISO 31000 — estrutura',
    'Na estrutura de gestão de riscos da ISO 31000, um conjunto coerente de componentes envolve',
    ['apenas identificação e tratamento','somente análise quantitativa','auditoria externa e certificação obrigatória','exclusivamente resposta a emergências','integração, concepção, implementação, avaliação e melhoria'],
    'E',
    'A estrutura de gestão de riscos compreende integração, concepção, implementação, avaliação e melhoria.'
  ),
  Q('q251','Quinta','Erros da prova — Gestão Ambiental e Riscos','APR',
    'A técnica utilizada para antecipar perigos e riscos antes do início ou da execução de uma atividade, permitindo definir medidas preventivas, é a',
    ['Análise Preliminar de Riscos','Análise SWOT','Análise de Monte Carlo exclusivamente','Curva F-N','Análise de balanço de massa'],
    'A',
    'A APR identifica antecipadamente perigos, causas, consequências e medidas de prevenção/controle.'
  ),
  Q('q252','Quinta','Erros da prova — Gestão Ambiental e Riscos','Curvas F-N',
    'Em estudos de risco social, o gráfico que relaciona frequência acumulada de acidentes à quantidade de fatalidades é conhecido como',
    ['Curva ABC','Curva F-N','Diagrama de Pareto','Curva de Lorenz','Matriz de Leopold'],
    'B',
    'A Curva F-N representa a frequência de eventos que podem resultar em N ou mais fatalidades.'
  ),
  Q('q253','Quinta','Erros da prova — Gestão Ambiental e Riscos','ISO 14004 — impacto ambiental',
    'No contexto de um SGA, uma mudança no meio ambiente, adversa ou benéfica, resultante total ou parcialmente dos aspectos ambientais de uma organização é um',
    ['objetivo ambiental','indicador operacional','impacto ambiental','requisito legal','risco ocupacional'],
    'C',
    'Impacto ambiental é a mudança no meio ambiente resultante total ou parcialmente de aspectos ambientais.'
  ),
  Q('q254','Quinta','Erros da prova — Gestão Ambiental e Riscos','responsabilidade social',
    'Entre os princípios associados à responsabilidade social segundo a ISO 26000/NBR 16001 está a',
    ['redução obrigatória da industrialização','eliminação da participação das partes interessadas','prioridade exclusiva ao lucro','responsabilização','supressão de normas internacionais de comportamento'],
    'D',
    'Responsabilização, comportamento ético, transparência e respeito às partes interessadas e às normas internacionais de comportamento estão entre os princípios de responsabilidade social.'
  ),

  // =========================================================
  // Poluição atmosférica + água + saneamento — questões 27, 35, 37, 41, 46, 52 e 53
  // =========================================================
  Q('q255','Sexta','Erros da prova — Poluição, Água e Saneamento','controle de material particulado',
    'Um equipamento remove partículas de uma corrente gasosa por ionização e posterior atração das partículas por placas sob ação de campo elétrico. Trata-se de um',
    ['filtro biológico','ciclone úmido','lavador Venturi exclusivamente','reator catalítico','precipitador eletrostático'],
    'E',
    'O precipitador eletrostático carrega eletricamente as partículas e as remove por atração a eletrodos coletores.'
  ),
  Q('q256','Sexta','Erros da prova — Poluição, Água e Saneamento','smog fotoquímico',
    'Em grandes centros urbanos, óxidos de nitrogênio e compostos orgânicos voláteis podem reagir sob radiação solar e formar oxidantes secundários. Esse fenômeno é típico do',
    ['smog fotoquímico','efeito estufa natural','buraco na camada de ozônio','chuvisco orográfico','fenômeno La Niña'],
    'A',
    'O smog fotoquímico resulta de reações atmosféricas envolvendo precursores como NOx e COV na presença de luz solar.'
  ),
  Q('q257','Sexta','Erros da prova — Poluição, Água e Saneamento','cloração — residual livre',
    'Em um sistema de distribuição de água, a manutenção de cloro residual livre tem como finalidade principal',
    ['aumentar a turbidez','preservar ação desinfetante ao longo da rede','elevar a dureza da água','reduzir mecanicamente sólidos sedimentáveis','substituir todas as demais etapas de tratamento'],
    'B',
    'O residual de cloro mantém proteção desinfetante na rede e nos pontos de consumo.'
  ),
  Q('q258','Sexta','Erros da prova — Poluição, Água e Saneamento','parâmetros físicos e químicos da água',
    'Assinale a combinação formada, respectivamente, por um parâmetro físico e um parâmetro químico de qualidade da água.',
    ['fósforo e turbidez','pH e temperatura','turbidez e fósforo','alcalinidade e odor','dureza e cor'],
    'C',
    'Turbidez é parâmetro físico; fósforo é parâmetro químico.'
  ),
  Q('q259','Sexta','Erros da prova — Poluição, Água e Saneamento','efeito estufa',
    'O efeito estufa natural é importante para o planeta porque contribui para',
    ['eliminar a radiação solar incidente','impedir qualquer perda de calor para o espaço','reduzir a temperatura média da Terra abaixo do ponto de congelamento','manter a temperatura média da superfície em faixa compatível com a vida','bloquear completamente a radiação ultravioleta'],
    'D',
    'O efeito estufa natural retém parte da radiação infravermelha emitida pela superfície, ajudando a manter temperaturas compatíveis com a vida.'
  ),
  Q('q260','Sexta','Erros da prova — Poluição, Água e Saneamento','hidráulica — reservatórios',
    'Em uma adutora ligando dois reservatórios, se em determinado ponto intermediário a linha piezométrica coincide exatamente com o nível d’água do reservatório de jusante e não há diferença de carga disponível no trecho seguinte, a vazão nesse trecho tende a ser',
    ['necessariamente máxima','o dobro da vazão de montante','independente da perda de carga','sempre no sentido contrário ao escoamento de montante','nula'],
    'E',
    'Sem diferença de carga entre as extremidades do trecho, não há energia disponível para sustentar escoamento permanente, levando à vazão nula no modelo idealizado.'
  ),

  // =========================================================
  // Ciclos biogeoquímicos + microbiologia — questões 34 e 44
  // =========================================================
  Q('q261','Sábado','Erros da prova — Ciclos e Microbiologia Ambiental','desnitrificação',
    'O processo microbiano que converte nitrato em formas gasosas de nitrogênio, devolvendo nitrogênio à atmosfera, é a',
    ['desnitrificação','nitrificação','fixação biológica','amonificação','assimilação'],
    'A',
    'Na desnitrificação, microrganismos reduzem nitrato a formas gasosas, como N2, especialmente em condições anóxicas.'
  ),
  Q('q262','Sábado','Erros da prova — Ciclos e Microbiologia Ambiental','nitrificação',
    'Em condições aeróbias, a conversão microbiana de amônio em nitrito e posteriormente em nitrato corresponde à',
    ['fixação','nitrificação','desnitrificação','fermentação','sulfetogênese'],
    'B',
    'A nitrificação é um processo aeróbio de oxidação de formas reduzidas de nitrogênio até nitrato.'
  ),
  Q('q263','Sábado','Erros da prova — Ciclos e Microbiologia Ambiental','reservatórios de petróleo — seleção microbiana',
    'Em reservatórios de petróleo, a comunidade microbiana encontrada tende a refletir',
    ['apenas a composição do ar atmosférico','somente a salinidade, sem influência de outros fatores','a seleção imposta pelas condições físico-químicas do ambiente petrolífero','ausência completa de pressão seletiva','somente microrganismos introduzidos artificialmente'],
    'C',
    'Temperatura, salinidade, disponibilidade de aceptores/doadores de elétrons e composição química selecionam os microrganismos capazes de persistir no reservatório.'
  ),
  Q('q264','Sábado','Erros da prova — Ciclos e Microbiologia Ambiental','acidulação biogênica',
    'A produção microbiológica de H2S em sistemas de produção de petróleo é indesejável principalmente porque pode',
    ['eliminar todos os processos corrosivos','aumentar a qualidade do óleo automaticamente','impedir qualquer crescimento microbiano','favorecer corrosão, riscos ocupacionais e perda de qualidade do produto','neutralizar permanentemente o reservatório'],
    'D',
    'O H2S está associado a corrosão, toxicidade, riscos operacionais e prejuízos à qualidade e ao processamento do petróleo.'
  ),
  Q('q265','Sábado','Erros da prova — Ciclos e Microbiologia Ambiental','bactérias redutoras de sulfato',
    'Em ambiente anóxico contendo sulfato disponível e matéria orgânica, bactérias redutoras de sulfato podem produzir',
    ['oxigênio molecular','ozônio','nitrato','metano exclusivamente','sulfeto de hidrogênio'],
    'E',
    'Bactérias redutoras de sulfato utilizam sulfato como aceptor de elétrons e podem gerar sulfeto, incluindo H2S.'
  ),
  Q('q266','Sábado','Erros da prova — Ciclos e Microbiologia Ambiental','potencial redox',
    'Condições fortemente redutoras em ambientes de subsuperfície favorecem processos anaeróbios porque',
    ['há baixa disponibilidade de aceptores de elétrons altamente oxidantes, permitindo rotas como redução de sulfato','o oxigênio dissolvido se torna necessariamente abundante','a nitrificação aeróbia passa a dominar obrigatoriamente','todos os microrganismos são eliminados','o potencial redox deixa de influenciar o metabolismo microbiano'],
    'A',
    'Ambientes com baixo potencial redox favorecem metabolismos anaeróbios, como redução de sulfato, quando os substratos e aceptores adequados estão disponíveis.'
  )
]
