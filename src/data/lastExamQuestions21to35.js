const Q = (number, statement, options, correct) => ({
  id: `tp2023-${number}`,
  number,
  section: 'Conhecimentos Específicos',
  statement,
  options,
  correct,
  sourceLabel: `Transpetro 2023 • Prova 3 • Questão ${number}`
})

export const lastExamQuestions21to35 = [
  Q(21,
    'Os serviços ambientais são componentes essenciais para a saúde dos ecossistemas, principalmente em uma era de crescente consciência ambiental e de preocupações com a sustentabilidade.\n\nOs serviços ambientais são definidos, de forma abrangente, como',
    {
      A: 'venda de produtos ecológicos.',
      B: 'ações governamentais para proteger o meio ambiente.',
      C: 'atividades recreativas ao ar livre.',
      D: 'benefícios diretos ou indiretos proporcionados pelos ecossistemas que contribuem para o bem-estar humano.',
      E: 'medidas de conservação voltadas para a fauna.'
    },
    'D'
  ),
  Q(22,
    'A Política Nacional de Biodiversidade (PNB), instituída pelo Decreto nº 4.339/2002, deriva de uma adequação à realidade e à legislação brasileira da Convenção sobre a Diversidade Biológica (CDB), que foi assinada pelo Brasil durante a Conferência das Nações Unidas sobre Meio Ambiente e Desenvolvimento - CNUMAD, em 1992.\n\nUm dos princípios da PNB é:',
    {
      A: 'a diversidade biológica é valorizada e respeitada, de acordo com seu potencial para uso humano.',
      B: 'a participação do setor privado na estratégia de conservação ex situ da biodiversidade deve ser evitada.',
      C: 'as nações têm o direito soberano de explorar seus próprios recursos biológicos, segundo suas políticas de meio ambiente e desenvolvimento.',
      D: 'os instrumentos econômicos e legais devem ser desenvolvidos para aumentar as pressões antrópicas sobre a biodiversidade.',
      E: 'os fundos de financiamento existentes para a gestão da biodiversidade devem ser extintos.'
    },
    'C'
  ),
  Q(23,
    'O Brasil é signatário de importantes acordos e convenções internacionais na esfera ambiental, dentre os quais a Convenção sobre Comércio Internacional das Espécies da Flora e Fauna Selvagens em Perigo de Extinção (CITES).\n\nQual é o objetivo principal da CITES?',
    {
      A: 'Regulamentar o comércio internacional de produtos derivados de espécies em perigo de extinção.',
      B: 'Promover o comércio internacional de espécies selvagens.',
      C: 'Estabelecer a exploração irrestrita de populações selvagens.',
      D: 'Proteger plantas e animais, particularmente aqueles ameaçados de extinção, por meio da regulação e do monitoramento de seu comércio internacional.',
      E: 'Estabelecer cotas de exportação de espécies em perigo de extinção.'
    },
    'D'
  ),
  Q(24,
    'Na ecologia, o ecossistema é a unidade básica em que o conjunto de seres vivos interage com o meio físico e entre si de forma equilibrada.\n\nA função da espécie dentro do conjunto do ecossistema e suas relações com as demais espécies e com o ambiente é reconhecida como',
    {
      A: 'habitat',
      B: 'biocenose',
      C: 'biótipo',
      D: 'biomassa',
      E: 'nicho ecológico'
    },
    'E'
  ),
  Q(25,
    'Uma das características mais importantes de uma população é a distribuição geográfica.\n\nO significado da distribuição geográfica de uma população',
    {
      A: 'refere-se à quantidade total de indivíduos que compõem a população em uma determinada área.',
      B: 'representa a capacidade de reprodução de uma população em diferentes habitats.',
      C: 'indica a presença de recursos ilimitados para o crescimento populacional.',
      D: 'define a proporção entre os diferentes grupos etários de uma população.',
      E: 'consiste no alcance geográfico e ecológico da espécie, englobando todas as áreas ocupadas durante o ciclo de vida da população estudada.'
    },
    'E'
  ),
  Q(26,
    'A Bioengenharia, no campo da Engenharia Ambiental, desempenha um papel importante na restauração de ecossistemas, na gestão de recursos naturais e na busca por soluções sustentáveis para os desafios ambientais.\n\nNesse contexto, as espécies restritas a uma área particular por razões históricas, ecológicas ou fisiológicas são denominadas',
    {
      A: 'disjuntas',
      B: 'endêmicas',
      C: 'cosmopolitas',
      D: 'contínuas',
      E: 'migratórias'
    },
    'B'
  ),
  Q(27,
    'Qual é o nome do equipamento utilizado para o controle de emissões de poluentes na atmosfera, que atua na remoção de pequenas partículas, por meio de um processo de ionização, seguido de remoção pelo uso de um campo elétrico na região de passagem?',
    {
      A: 'Lavador de gases',
      B: 'Precipitador Eletrostático',
      C: 'Redução catalítica seletiva',
      D: 'Recirculação dos gases de combustão',
      E: 'Pré-aquecimento do ar de combustão'
    },
    'B'
  ),
  Q(28,
    'Diversos são os benefícios da implementação efetiva das políticas ambientais.\n\nUma das contribuições das políticas ambientais para a sociedade é o(a)',
    {
      A: 'incentivo à exploração sustentável dos recursos naturais',
      B: 'subsídio para empresas poluentes',
      C: 'aumento dos custos de produção',
      D: 'estímulo à economia de mercado',
      E: 'redução das áreas de conservação'
    },
    'A'
  ),
  Q(29,
    'Nos últimos anos, o desenvolvimento sustentável emergiu como um modelo notável entre várias abordagens que orientam políticas econômicas e sociais em todo o mundo.\n\nQual é o objetivo do controle do crescimento populacional, no modelo de desenvolvimento sustentável?',
    {
      A: 'Promover o crescimento populacional ilimitado.',
      B: 'Reduzir drasticamente a população global.',
      C: 'Alcançar níveis extremos de urbanização.',
      D: 'Estabilizar a população em níveis aceitáveis.',
      E: 'Priorizar o crescimento populacional em detrimento do ambiente.'
    },
    'D'
  ),
  Q(30,
    'No contexto da norma NBR ISO 14044:2009/Versão Corrigida:2014 - Gestão ambiental - Avaliação do ciclo de vida - Requisitos e orientações, qual é a principal etapa do ciclo de vida de um produto ou de um serviço que envolve, especificadamente, a identificação e a quantificação das entradas e saídas de materiais e energia relevantes, bem como a avaliação dos impactos associados?',
    {
      A: 'Inventário do Ciclo de Vida',
      B: 'Avaliação do Impacto Ambiental',
      C: 'Interpretação do Ciclo de Vida',
      D: 'Análise de Sensibilidade',
      E: 'Comunicação de Ciclo de Vida'
    },
    'A'
  ),
  Q(31,
    'A legislação brasileira estabelece uma Política Nacional sobre Mudança do Clima (PNMC) por meio do Decreto nº 9.578, de 22 de novembro de 2018, no qual está definido que o órgão responsável por elaborar o plano anual de aplicação dos recursos do Fundo Nacional sobre Mudança do Clima (FNMC) e, após sua aprovação pelo Comitê Gestor do FNMC, publicá-lo é o',
    {
      A: 'Ministério do Meio Ambiente e Mudança do Clima',
      B: 'Ministério da Ciência, Tecnologia, Inovações e Comunicações',
      C: 'Ministério de Minas e Energia',
      D: 'Conselho Estadual do Meio Ambiente',
      E: 'Conselho Nacional do Meio Ambiente'
    },
    'A'
  ),
  Q(32,
    'A Educação Ambiental é uma abordagem interdisciplinar que desempenha um papel fundamental na conscientização e no engajamento das pessoas em questões ambientais.\n\nNesse contexto, qual é uma das principais metas da Educação Ambiental?',
    {
      A: 'Promover o consumo insustentável de recursos naturais.',
      B: 'Minimizar a conservação ambiental.',
      C: 'Desenvolver uma compreensão crítica das relações entre sociedade e natureza.',
      D: 'Negligenciar os impactos das atividades humanas no meio ambiente.',
      E: 'Limitar-se a questões ambientais específicas de uma região.'
    },
    'C'
  ),
  Q(33,
    'No contexto das mudanças climáticas e da gestão ambiental, o principal significado do conceito-chave de vulnerabilidade refere-se à',
    {
      A: 'redução das emissões de gases de efeito estufa.',
      B: 'exposição e sensibilidade a impactos das mudanças climáticas.',
      C: 'capacidade de resistir às mudanças climáticas.',
      D: 'capacidade de se preparar para enfrentar os desastres naturais.',
      E: 'ação de se ajustar e de responder às mudanças climáticas.'
    },
    'B'
  ),
  Q(34,
    'O ciclo do nitrogênio é um processo essencial para manter a fertilidade do solo e para equilibrar os ecossistemas terrestres e aquáticos, garantindo a sustentabilidade da vida na Terra.\n\nNo ciclo do nitrogênio, o processo pelo qual as bactérias convertem compostos de nitrogênio em nitrogênio gasoso, retornando-o à atmosfera é denominado',
    {
      A: 'fixação',
      B: 'nitrificação',
      C: 'desnitrificação',
      D: 'amoniação',
      E: 'nitrosação'
    },
    'C'
  ),
  Q(35,
    'Dentre os problemas globais provocados pela poluição, destacam-se os associados ao efeito estufa.\n\nO efeito estufa está relacionado principalmente com a(o)',
    {
      A: 'manutenção da temperatura média da superfície terrestre.',
      B: 'falta de gases na atmosfera.',
      C: 'energia degradada, que resulta das transformações de energia que ocorrem no núcleo terrestre.',
      D: 'aumento da incidência de radiação ultravioleta que atinge a superfície terrestre.',
      E: 'resfriamento da superfície terrestre.'
    },
    'A'
  )
]
