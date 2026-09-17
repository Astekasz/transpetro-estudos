const Q = (number, statement, options, correct, extra = {}) => ({
  id: `tp2023-${number}`,
  number,
  section: 'Conhecimentos Específicos',
  statement,
  options,
  correct,
  sourceLabel: `Transpetro 2023 • Prova 3 • Questão ${number}`,
  ...extra
})

export const lastExamQuestions36to50 = [
  Q(36,
    'Para reduzir o acúmulo de lixo e o desperdício de materiais de valor econômico, a política dos 3Rs (Redução, Reutilização e Reciclagem) é amplamente adotada em todo o mundo.\n\nUm exemplo de reutilização é a',
    {
      A: 'compostagem de resíduos orgânicos para fertilização de jardins.',
      B: 'transformação de papel reciclado em novos produtos de papel.',
      C: 'produção de roupas usando garrafas pet.',
      D: 'utilização de garrafas de vidro vazias como decoração.',
      E: 'conversão de pneus usados em combustível.'
    },
    'D'
  ),
  Q(37,
    'O fenômeno atmosférico, frequentemente associado a áreas urbanas altamente industrializadas e densamente povoadas, em que as emissões de poluentes provenientes de veículos automotores e de processos industriais reagem com a luz solar, formando uma névoa tóxica e prejudicial à saúde pública, denomina-se',
    {
      A: 'El Niño',
      B: 'efeito estufa',
      C: 'inversão térmica',
      D: 'chuva ácida',
      E: 'smog'
    },
    'E'
  ),
  Q(38,
    'A Lei nº 12.651/2012 estabelece as normas gerais relacionadas à proteção da vegetação, às áreas de Preservação Permanente e às áreas de Reserva Legal.\n\nA vegetação situada em Área de Preservação Permanente deverá ser mantida pelo(a)',
    {
      A: 'proprietário da área, possuidor ou ocupante a qualquer título',
      B: 'Conselho Nacional do Meio Ambiente',
      C: 'Ibama',
      D: 'Secretaria Estadual do Meio Ambiente',
      E: 'Secretaria Municipal do Meio Ambiente'
    },
    'A'
  ),
  Q(39,
    'O tratamento de riscos envolve a seleção de uma ou mais ações para modificar o nível de cada risco e possibilitar a elaboração de planos de tratamento que, uma vez implementados, implicarão novos controles ou novas modificações dos riscos existentes.\n\nNo processo de gestão e elaboração de um plano de riscos, buscando modificar e otimizar o nível de cada risco, é recomendável que se adote, em relação ao risco, as seguintes ações:',
    {
      A: 'ignorar, transferir, compartilhar e mitigar.',
      B: 'aumentar, aceitar, compartilhar e transferir.',
      C: 'mitigar, compartilhar, aceitar e ignorar.',
      D: 'potencializar, aceitar, transferir e mitigar.',
      E: 'evitar, reduzir, compartilhar e aceitar.'
    },
    'E'
  ),
  Q(40,
    'Segundo a Resolução Conama nº 001/1986, uma das atividades técnicas mínimas do Estudo de Impacto Ambiental (EIA) é a análise dos impactos ambientais do projeto e de suas alternativas, através de identificação, previsão da magnitude e interpretação da importância, indicando os métodos, as técnicas e os critérios adotados. Alguns dos métodos mais utilizados nessa avaliação de impactos são os de Leopold, Battelle e Sorensen.\n\nO método de Leopold, concebido pelo US Geological Survey, trabalha com 100 ações e 88 itens ambientais (fatores), o que permite 8.800 possibilidades de identificação de impactos, ponderados em magnitude (+ ou – 1 a 10) e importância (1 a 10).\n\nO método de Battelle, desenvolvido pelo Battelle Columbus Laboratories, possui um modelo constituído por 78 parâmetros representativos dos componentes ambientais, sendo: 18 ecológicos, 17 estéticos, 24 físico-químicos e 19 sociais.\n\nO método de Sorensen, formulado para avaliação de um programa de ordenamento territorial para a área costeira da Califórnia, considera 6 componentes ambientais (água, clima, condições geofísicas, condições de acesso e estética) e o conjunto de atividades que os modificam.\n\nOs métodos de Leopold, Battelle e Sorensen caracterizam-se, respectivamente, como',
    {
      A: 'uma listagem de controle ponderada; uma rede de interação; uma matriz de interação',
      B: 'uma listagem de controle ponderada; uma matriz de interação; uma rede de interação',
      C: 'uma rede de interação; uma matriz de interação; uma listagem de controle ponderada',
      D: 'uma rede de interação; uma listagem de controle ponderada; uma matriz de interação',
      E: 'uma matriz de interação; uma listagem de controle ponderada; uma rede de interação'
    },
    'E'
  ),
  Q(41,
    'A concentração por gases pode ser medida tanto em partes por milhão (ppm), quanto por uma relação baseada em volume, como em microgramas por metro cúbico.\n\nConsidere que, no monitoramento ambiental de uma área onde está ocorrendo a combustão de um derivado de petróleo, o gás produzido contém dióxido de carbono (CO₂) a uma concentração de 80% por volume. O gás está a 25°C e uma atmosfera. Sabe-se que 1% por volume é 10.000 ppm, e que as massas atômicas do carbono e do oxigênio são, respectivamente, 12 e 16.\n\nA concentração de CO₂ nesse gás, em µg/m³, é de',
    {
      A: '1.436,7 x 10⁶',
      B: '718,4 x 10⁶',
      C: '328,2 x 10⁶',
      D: '7,18 x 10⁶',
      E: '1,44 x 10⁶'
    },
    'A'
  ),
  Q(42,
    'Uma empresa está encarregada do processo de licenciamento da atividade de exploração e lavra de jazidas de combustíveis líquidos e gás natural em terra, junto a um órgão estadual de meio ambiente.\n\nSendo assim, segundo a Resolução Conama nº 23/1994, serão expedidas as seguintes licenças: Licença Prévia para Perfuração (LPper), Licença Prévia de Produção para Pesquisa (LPpro), Licença de Instalação (LI) e Licença de Operação (LO). Para cada uma dessas licenças, é necessária a aprovação de documentos provenientes de estudos ambientais.\n\nConsiderando-se que esse é um empreendimento novo, planejado para uma área onde não existe nada implantado, para emissão da Licença de Instalação, o empreendedor deve apresentar, para a devida aprovação, o seguinte documento ambiental:',
    {
      A: 'Estudo de Viabilidade Ambiental (EVA)',
      B: 'Relatório de Avaliação Ambiental (RAA)',
      C: 'Relatório de Controle Ambiental (RCA)',
      D: 'Estudo de Impacto Ambiental (EIA)',
      E: 'Projeto de Controle Ambiental (PCA)'
    },
    'D'
  ),
  Q(43,
    'A Lei nº 12.305/2010 é um marco legislativo significativo no âmbito da gestão de resíduos sólidos no Brasil, sendo conhecida como “Política Nacional de Resíduos Sólidos”. Essa lei estabelece diretrizes fundamentais para a gestão, o tratamento e a disposição final dos resíduos sólidos em território nacional.\n\nNesse contexto, Logística Reversa consiste em um',
    {
      A: 'sistema de transporte unidirecional, em que os produtos são movidos do consumidor para o fabricante, com reduzida possibilidade de retorno.',
      B: 'processo isolado e independente do fluxo normal de suprimentos e distribuição, sem conexão com as operações principais de uma empresa, focado exclusivamente no meio ambiente.',
      C: 'processo de enviar produtos de volta ao fornecedor o mais rápido possível, desconsiderando a reciclagem ou a reutilização, a fim de reduzir os custos de transporte, o que contribui para a diminuição de emissões de gás carbônico.',
      D: 'instrumento de desenvolvimento econômico e social que se caracteriza por um conjunto de ações, procedimentos e meios com o objetivo de viabilizar a coleta e a restituição dos resíduos sólidos ao setor empresarial, para reaproveitamento, em seu ciclo ou em outros ciclos produtivos, ou para outra destinação final ambientalmente adequada.',
      E: 'conjunto de mecanismos e procedimentos que garantam à sociedade informações e participação nos processos de formulação, implementação e avaliação das políticas públicas relacionadas aos resíduos sólidos.'
    },
    'D'
  ),
  Q(44,
    'Os reservatórios de petróleo contêm diversas comunidades microbiológicas ativas, que influenciam na qualidade e na quantidade de petróleo que pode ser recuperado. Assim, essa atividade microbiológica pode gerar impactos econômicos negativos no processo de exploração e produção do óleo. No Brasil, em plataformas offshore, é comum a injeção de água do mar para recuperação secundária do petróleo.\n\nNo que diz respeito à biodeterioração e à acidulação biogênica em reservatórios de petróleo, verifica-se que',
    {
      A: 'o sistema de tratamento completo da água de injeção, para combater a ação microbiológica, é constituído apenas por filtros e desaeradores.',
      B: 'a produção de H₂S em campos de petróleo pode ter efeitos benéficos, como o aumento da produção de óleo e a diminuição da corrosão de tubulações.',
      C: 'a salinidade é o principal fator limitante para o crescimento de bactérias em reservatórios, em extrações offshore profundas.',
      D: 'o potencial redox detectado é muito alto, favorecendo principalmente a redução do sulfato, uma vez que os campos de petróleo são ambientes de subsuperfície profundos.',
      E: 'os microrganismos que conseguem sobreviver em ambientes petrolíferos são selecionados pelas características e pela composição química desse ecossistema.'
    },
    'E'
  ),
  Q(45,
    'A avaliação da qualidade do solo e da água desempenha um papel crucial na identificação de possíveis riscos e degradações desses importantes recursos naturais. A Resolução Conama nº 420/2009 define os Valores Orientadores como sendo as concentrações de substâncias químicas que fornecem orientação sobre a qualidade e as alterações do solo e da água subterrânea.\n\nNesse contexto, o Valor de Investigação (VI) é definido como a concentração de',
    {
      A: 'valor limite de determinada substância no solo, tal que ele seja capaz de sustentar as suas funções principais.',
      B: 'valor máximo de determinada substância na água, tal que ela seja potável.',
      C: 'determinada substância que define a qualidade natural do solo, sendo determinado com base em interpretação estatística de análises físico-químicas de amostras de diversos tipos de solos.',
      D: 'determinada substância que define a qualidade do solo como inviável para a agricultura e a pecuária.',
      E: 'determinada substância no solo ou na água subterrânea acima da qual existem riscos potenciais, diretos ou indiretos, à saúde humana, considerando um cenário de exposição padronizado.'
    },
    'E'
  ),
  Q(46,
    'Em sistemas de abastecimento de água, é comum uma rede de distribuição ser abastecida por um reservatório de montante e por um reservatório de jusante, também chamado reservatório de sobra. No sistema da Figura abaixo, considere que as perdas de carga concentradas e as cargas cinéticas são desprezíveis.\n\nNa Figura, R1 é o reservatório de montante, e R2 é o reservatório de sobra. No ponto B da adutora ABC, há uma derivação para a rede de distribuição de água da cidade. A linha que parte do nível de água Z1 do reservatório R1 e chega ao nível de água Z2 do reservatório R2 é a linha de carga (que coincide com a linha piezométrica), para a situação em que a rede está consumindo a vazão QB.\n\nSabendo-se que a vazão que sai do reservatório R1 (QA) é igual a 0,03 m³/s, e que o comprimento L1 do trecho AB é o dobro do comprimento L2 do trecho BC, para a situação mostrada na Figura verifica-se que a vazão derivada para rede QB é igual a',
    {
      A: '0,015 m³/s, e a vazão no trecho BC é igual a 0,015 m³/s, com sentido de B para C.',
      B: '0,015 m³/s, e a vazão no trecho BC é igual a 0,015 m³/s, com sentido de C para B.',
      C: '0,045 m³/s, e a vazão no trecho BC é igual a 0,015 m³/s, com sentido de B para C.',
      D: '0,045 m³/s, e a vazão no trecho BC é igual a 0,015 m³/s, com sentido de C para B.',
      E: '0,03 m³/s, e a vazão no trecho BC é nula.'
    },
    'E',
    { figure: '/q46-figure.png', figureAlt: 'Figura original da questão 46: sistema de reservatórios R1 e R2 e adutora ABC.' }
  ),
  Q(47,
    'A Lei nº 9.433/1997 institui a Política Nacional de Recursos Hídricos e cria o Sistema Nacional de Gerenciamento de Recursos. Para o manejo e a gestão de bacias hidrográficas, esse instrumento legal prevê o emprego dos seguintes instrumentos: os planos de recursos hídricos; o enquadramento dos corpos de água em classes, segundo os usos preponderantes da água; a outorga dos direitos de uso de recursos hídricos; a cobrança pelo uso de recursos hídricos; a compensação a municípios; e o sistema de informações sobre recursos hídricos.\n\nO instrumento que tem por princípios básicos de funcionamento a descentralização da obtenção e produção de dados; a coordenação unificada; e o acesso aos dados e informações garantido a toda a sociedade, inclusive os dados gerados pelos órgãos integrantes do Sistema Nacional de Gerenciamento de Recursos Hídricos, é o(a)',
    {
      A: 'enquadramento dos corpos de água',
      B: 'plano de recursos hídricos',
      C: 'sistema de informações sobre recursos hídricos',
      D: 'outorga dos direitos de uso de recursos hídricos',
      E: 'cobrança pelo uso de recursos hídricos'
    },
    'C'
  ),
  Q(48,
    'Dentre as variadas tecnologias de tratamento e destinação de resíduos sólidos, destaca-se a compostagem. Essa técnica consiste no processo de decomposição biológica controlada dos resíduos orgânicos, efetuado por uma população diversificada de organismos, em condições aeróbias e termofílicas, resultando em material estabilizado, com propriedades e características completamente diferentes daquelas que lhe deram origem. Relacione os componentes da compostagem com suas respectivas definições apresentadas a seguir.\n\nI - Composto\nII - Higienização\nIII - Lixiviado\nIV - Chorume\n\nP - Processo de tratamento de redução de patógenos.\nQ - Produto estabilizado, oriundo do processo de compostagem.\nR - Líquido resultante da infiltração e escorrimento de águas pluviais.\nS - Bactérias, protozoários, fungos, vírus, helmintos, capazes de provocar doenças ao hospedeiro.\nT - Líquido proveniente da umidade natural e da decomposição anaeróbia de resíduos orgânicos.\n\nAs associações corretas são:',
    {
      A: 'I - P , II - R, III - T , IV - S',
      B: 'I - Q , II - P , III - R , IV - T',
      C: 'I - R , II - S , III - P , IV - T',
      D: 'I - S , II - P , III - T , IV - R',
      E: 'I - T , II - S , III - P , IV - Q'
    },
    'B'
  ),
  Q(49,
    'Existem várias tecnologias empregadas para reabilitação de solos e águas subterrâneas contaminadas. Essas tecnologias são escolhidas com base no tipo e na extensão da contaminação.\n\nComo se denomina o processo em que microrganismos são responsáveis por reduzir ou transformar, em produtos menos tóxicos, os poluentes de áreas contaminadas?',
    {
      A: 'Nanorremediação',
      B: 'Dessorção térmica in situ',
      C: 'Biorremediação',
      D: 'Oxidação química',
      E: 'Barreira reativa'
    },
    'C'
  ),
  Q(50,
    'O propósito da estrutura de gestão de riscos é apoiar a organização na integração da gestão de riscos em atividades significativas e em suas funções.\n\nO desenvolvimento da estrutura da gestão de riscos engloba os seguintes componentes:',
    {
      A: 'a reunião de metas, a concepção, a avaliação e o feedback',
      B: 'a implementação, a concepção, o estudo de probabilidades e a melhoria',
      C: 'a avaliação, o feedback, a melhoria, o estudo e as probabilidades',
      D: 'a integração, a concepção, a implementação, a avaliação e a melhoria',
      E: 'a integração, as probabilidades, a reunião de metas, a avaliação e o feedback'
    },
    'D'
  )
]
