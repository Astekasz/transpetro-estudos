const letters = ['A', 'B', 'C', 'D', 'E']

function FQ(id, day, theme, sourceType, sourceLabel, statement, alternatives, correct, explanation) {
  return {
    id,
    day,
    theme,
    sourceType,
    sourceLabel,
    statement,
    options: Object.fromEntries(letters.map((letter, index) => [letter, alternatives[index]])),
    correct,
    explanation
  }
}

const T = (id, day, theme, lesson, statement, alternatives, correct, explanation) =>
  FQ(id, day, theme, 'Inédita • baseada na degravação', `Degravação • ${lesson}`, statement, alternatives, correct, explanation)

const P = (id, day, theme, topic, statement, alternatives, correct, explanation) =>
  FQ(id, day, theme, 'Inédita • inspirada na Transpetro 2023', `Padrão CESGRANRIO/Transpetro 2023 • ${topic}`, statement, alternatives, correct, explanation)

export const focusedQuestions = [
  // =========================================================
  // MAIS QUESTÕES DIRETAMENTE DAS DEGRAVAÇÕES
  // =========================================================

  T('q171','Segunda','Revisão + Ecologia','Princípios do Direito Ambiental',
    'A dimensão ecológica da dignidade da pessoa humana, na visão contemporânea apresentada na aula, relaciona-se à necessidade de assegurar',
    ['apenas a sobrevivência biológica mínima','bem-estar ambiental indispensável a uma vida digna, saudável e segura','exclusivamente liberdade econômica','somente proteção patrimonial','apenas acesso a bens culturais'],
    'B',
    'A degravação associa a dimensão ecológica da dignidade humana ao mínimo existencial ecológico, que inclui um meio ambiente hígido como condição para uma vida digna, saudável e segura.'
  ),

  T('q172','Segunda','Revisão + Ecologia','Princípios do Direito Ambiental',
    'Quanto ao conjunto dos princípios do Direito Ambiental, a degravação ressalta que',
    ['existe um rol constitucional taxativo e imutável','há unanimidade doutrinária sobre sua quantidade','o rol é aberto e não há unanimidade doutrinária sobre sua quantidade','somente princípios expressos em lei podem ser aplicados','os princípios não possuem função normativa'],
    'C',
    'O material afirma expressamente que os princípios ambientais não formam rol fechado e que a doutrina não é unânime quanto à quantidade exata de princípios.'
  ),

  T('q173','Segunda','Revisão + Ecologia','Princípios do Direito Ambiental',
    'Uma atividade apresenta possibilidade de dano ambiental grave, mas os estudos científicos ainda não conseguem estabelecer com segurança a probabilidade nem a extensão do dano. A orientação de adotar medidas protetivas proporcionais decorre principalmente da',
    ['prevenção','precaução','reparação integral','informação','função ambiental'],
    'B',
    'A precaução é utilizada quando existe ameaça relevante acompanhada de incerteza científica. A prevenção, por sua vez, pressupõe risco conhecido.'
  ),

  T('q174','Segunda','Revisão + Ecologia','Princípios do Direito Ambiental',
    'A cobrança pelo uso de determinado recurso natural, ainda que o usuário não tenha provocado poluição, concretiza principalmente o princípio do',
    ['poluidor-pagador','usuário-pagador','protetor-recebedor','retrocesso ambiental','acesso equitativo'],
    'B',
    'O usuário-pagador atribui custo ao uso do recurso natural. Ele não depende da existência de dano ou poluição.'
  ),

  T('q175','Segunda','Revisão + Ecologia','Princípios do Direito Ambiental',
    'Um programa público remunera proprietários que conservam nascentes e mantêm cobertura vegetal nativa além do mínimo exigido. Essa lógica se aproxima do princípio do',
    ['poluidor-pagador','protetor-recebedor','limite','usuário-pagador','retrocesso'],
    'B',
    'O protetor-recebedor ou provedor-recebedor utiliza incentivos positivos para recompensar comportamentos que protegem o meio ambiente.'
  ),

  T('q176','Segunda','Revisão + Ecologia','Princípios do Direito Ambiental',
    'A inclusão obrigatória da variável ambiental no planejamento de setores como energia, transportes, agricultura e desenvolvimento urbano exemplifica mais diretamente a',
    ['transversalidade','responsabilidade objetiva','reparação integral','precaução','correção na fonte'],
    'A',
    'A transversalidade integra a dimensão ambiental a diferentes setores, políticas e áreas de decisão, em vez de tratá-la de forma isolada.'
  ),

  T('q177','Segunda','Revisão + Ecologia','Princípios do Direito Ambiental III',
    'O conceito de desenvolvimento sustentável destacado na degravação foi consagrado no Relatório Nosso Futuro Comum, de 1987, e pressupõe',
    ['atender apenas às necessidades futuras','atender às necessidades atuais sem comprometer as possibilidades das gerações futuras','proibir qualquer exploração de recursos naturais','substituir crescimento econômico por preservação integral','garantir prioridade absoluta às gerações presentes'],
    'B',
    'A formulação do Relatório Brundtland busca compatibilizar as necessidades do presente com a possibilidade de as futuras gerações atenderem às próprias necessidades.'
  ),

  T('q178','Segunda','Revisão + Ecologia','Princípios do Direito Ambiental IV',
    'O chamado efeito cliquet ou princípio do não retorno da concretização é utilizado na degravação para explicar o princípio da',
    ['precaução','vedação do retrocesso ambiental','participação','cooperação','responsabilidade comum diferenciada'],
    'B',
    'A aula associa o efeito cliquet à vedação do retrocesso: níveis de proteção ambiental já concretizados não devem ser reduzidos injustificadamente.'
  ),

  T('q179','Segunda','Revisão + Ecologia','Princípios do Direito Ambiental V',
    'Ao determinar que o meio ambiente seja defendido e preservado para as presentes e futuras gerações, o art. 225 da Constituição fornece fundamento direto ao princípio da',
    ['solidariedade intergeracional','livre iniciativa','especialidade','legalidade tributária','subsidiariedade econômica'],
    'A',
    'A solidariedade intergeracional vincula a geração presente ao dever de preservar condições ambientais adequadas também para as gerações futuras.'
  ),

  T('q180','Segunda','Revisão + Ecologia','Meio Ambiente na Constituição da República IV – Competências Ambientais',
    'Na competência legislativa concorrente em matéria ambiental, cabe à União estabelecer',
    ['apenas regras municipais','normas gerais, com princípios, diretrizes e critérios básicos','toda e qualquer norma local, sem participação dos Estados','somente sanções administrativas','exclusivamente normas de interesse regional'],
    'B',
    'A degravação destaca que, na competência concorrente, a União estabelece normas gerais, observáveis pelos demais entes.'
  ),

  T('q181','Segunda','Revisão + Ecologia','Meio Ambiente na Constituição da República IV – Competências Ambientais',
    'Existindo norma geral federal sobre matéria ambiental de competência concorrente, os Estados e o Distrito Federal podem',
    ['revogá-la livremente','suplementá-la, especificando-a sem contrariar as normas gerais','legislar apenas se houver autorização municipal','atuar somente em matéria penal','substituí-la por norma menos protetiva em qualquer hipótese'],
    'B',
    'Os Estados e o DF exercem competência suplementar, detalhando a norma geral federal sem contrariá-la.'
  ),

  T('q182','Segunda','Revisão + Ecologia','Meio Ambiente na Constituição da República IV – Competências Ambientais',
    'Se a União não editar normas gerais em matéria sujeita à competência legislativa concorrente, os Estados podem exercer',
    ['competência legislativa plena','competência exclusivamente municipal','apenas competência administrativa','somente poder regulamentar federal','competência penal privativa'],
    'A',
    'Na ausência de norma geral federal, a degravação destaca que os Estados podem exercer competência legislativa plena.'
  ),

  T('q183','Segunda','Revisão + Ecologia','Meio Ambiente na Constituição da República IV – Competências Ambientais',
    'Sobre os Municípios e a competência concorrente do art. 24 da Constituição, a degravação esclarece que os Municípios',
    ['integram expressamente a competência concorrente','não integram a competência concorrente, mas podem legislar sobre interesse local e suplementar normas federal e estadual','não podem legislar sobre meio ambiente em nenhuma situação','possuem competência privativa para legislar sobre águas','podem afastar normas gerais federais livremente'],
    'B',
    'O Município não está no rol do art. 24, mas pode legislar sobre assuntos de interesse local e suplementar a legislação federal e estadual no que couber.'
  ),

  T('q184','Segunda','Revisão + Ecologia','Meio Ambiente na Constituição da República IV – Competências Ambientais',
    'Proteger o meio ambiente e combater a poluição em qualquer de suas formas integra, segundo a degravação, competência material',
    ['privativa da União','comum a todos os entes federativos','exclusiva dos Estados','exclusiva dos Municípios','exclusiva do Distrito Federal'],
    'B',
    'O art. 23 trata da competência material comum, que inclui todos os entes federativos e abrange a proteção ambiental e o combate à poluição.'
  ),

  T('q185','Segunda','Revisão + Ecologia','Meio Ambiente na Constituição da República IV – Competências Ambientais',
    'Entre as matérias ambientais relacionadas à competência legislativa privativa da União, a degravação destaca',
    ['parques municipais','águas e energia','arborização urbana local','zoneamento estritamente municipal','licenciamento de pequeno impacto local'],
    'B',
    'O art. 22 inclui matérias como águas e energia entre as competências legislativas privativas da União.'
  ),

  T('q186','Terça','Ecossistemas e biodiversidade','Ecologia e biodiversidade II',
    'A maior diversidade de espécies nas regiões tropicais em comparação às zonas temperadas e polares corresponde ao padrão conhecido como',
    ['efeito fundador','gradiente latitudinal de diversidade','sucessão secundária','equilíbrio de Hardy-Weinberg','exclusão competitiva'],
    'B',
    'A degravação destaca o gradiente latitudinal de diversidade: regiões tropicais tendem a concentrar maior riqueza de espécies.'
  ),

  T('q187','Terça','Ecossistemas e biodiversidade','Ecologia e biodiversidade II',
    'A diversidade genética dentro das populações é especialmente importante porque',
    ['reduz a capacidade de adaptação','constitui base para a adaptabilidade diante de mudanças ambientais','impede a seleção natural','elimina diferenças entre indivíduos','substitui a diversidade de espécies'],
    'B',
    'O material relaciona diversidade genética à capacidade de adaptação das espécies frente a mudanças ambientais.'
  ),

  T('q188','Terça','Ecossistemas e biodiversidade','Ecologia e biodiversidade II',
    'A perda de habitat é apontada na degravação como importante causa de extinção porque pode provocar',
    ['fragmentação populacional e redução da capacidade de sobrevivência','aumento obrigatório do fluxo gênico','eliminação do isolamento','crescimento ilimitado das populações','uniformização dos ecossistemas sem perda de espécies'],
    'A',
    'A perda e a fragmentação do habitat reduzem área disponível e conectividade, aumentando a vulnerabilidade das populações.'
  ),

  T('q189','Sexta','Conservação e serviços ambientais','Ecologia e biodiversidade II',
    'A influência da Amazônia sobre o regime de chuvas em grande parte da América do Sul, por meio da evapotranspiração, é um exemplo de',
    ['serviço ecossistêmico de regulação','serviço exclusivamente cultural','recurso mineral de provisão','processo sem benefício humano','impacto ambiental necessariamente negativo'],
    'A',
    'A regulação climática e hídrica proporcionada pelos ecossistemas constitui serviço ecossistêmico de regulação.'
  ),

  T('q190','Sexta','Conservação e serviços ambientais','Ecologia e biodiversidade II',
    'Na degravação, os serviços ecossistêmicos são compreendidos como',
    ['somente produtos comercializados diretamente','benefícios diretos e indiretos que a natureza oferece aos seres humanos','apenas atividades de fiscalização pública','exclusivamente serviços recreativos','somente benefícios monetários'],
    'B',
    'O material adota uma definição ampla, abrangendo benefícios diretos e indiretos proporcionados pelos ecossistemas.'
  ),

  // =========================================================
  // QUESTÕES INÉDITAS COM FOCO NO PADRÃO DA PROVA TRANSPETRO 2023
  // Os temas e a forma de cobrança foram extraídos da prova; os enunciados são novos.
  // =========================================================

  P('q191','Sexta','Conservação e serviços ambientais','serviços ambientais',
    'Uma área úmida reduz picos de cheia, retém sedimentos e contribui para a qualidade da água utilizada por comunidades próximas. Esses benefícios caracterizam',
    ['externalidades exclusivamente negativas','serviços ambientais ou ecossistêmicos','somente bens privados','atividades industriais de remediação','apenas ações governamentais'],
    'B',
    'A prova de 2023 cobrou diretamente o conceito de serviços ambientais. Benefícios fornecidos pelos ecossistemas ao bem-estar humano enquadram-se nessa categoria.'
  ),

  P('q192','Terça','Ecossistemas e biodiversidade','nicho ecológico',
    'Duas espécies vivem na mesma floresta, mas utilizam alimentos distintos, apresentam horários diferentes de atividade e ocupam posições tróficas distintas. Essas diferenças descrevem principalmente seus',
    ['habitats','nichos ecológicos','biomas','ecótonos','domínios morfoclimáticos'],
    'B',
    'A Transpetro 2023 cobrou a distinção de nicho ecológico. Nicho corresponde ao papel funcional e ao conjunto de relações e recursos utilizados pela espécie.'
  ),

  P('q193','Terça','Ecossistemas e biodiversidade','endemismo',
    'Uma planta ocorre naturalmente apenas em um pequeno conjunto de serras de determinada região brasileira, sem registros naturais em outros locais. Essa espécie é classificada como',
    ['cosmopolita','endêmica','migratória','exótica','ubíqua'],
    'B',
    'A prova de 2023 cobrou o conceito de endemismo. Espécies endêmicas têm distribuição natural restrita a determinada área.'
  ),

  P('q194','Terça','Ecossistemas e biodiversidade','biodiversidade e conservação',
    'Em um programa de conservação, a manutenção da variabilidade genética de uma população ameaçada é importante principalmente porque',
    ['reduz o potencial evolutivo','favorece a capacidade de adaptação a alterações ambientais','elimina a necessidade de habitat','impede mutações','garante crescimento populacional ilimitado'],
    'B',
    'A banca costuma transformar conceitos de biodiversidade em situações aplicadas. Variabilidade genética amplia o potencial adaptativo de populações.'
  ),

  P('q195','Sexta','Conservação e serviços ambientais','conservação da biodiversidade',
    'A criação de corredores entre fragmentos florestais é uma medida de conservação capaz de',
    ['reduzir o fluxo gênico','aumentar a conectividade e facilitar o deslocamento de organismos','eliminar totalmente o efeito de borda','substituir todas as unidades de conservação','impedir a dispersão'],
    'B',
    'No padrão aplicado da Cesgranrio, a medida deve ser associada ao efeito ecológico esperado. Corredores aumentam conectividade e favorecem dispersão e fluxo gênico.'
  ),

  P('q196','Sexta','Conservação e serviços ambientais','educação ambiental',
    'Um projeto de Educação Ambiental que estimula estudantes a analisar consumo, desigualdade, uso de recursos e consequências ambientais busca principalmente',
    ['desenvolver compreensão crítica das relações entre sociedade e natureza','restringir o estudo ao ambiente natural sem dimensão social','estimular o consumo de recursos','evitar participação comunitária','eliminar debates sobre atividades humanas'],
    'A',
    'A prova de 2023 cobrou a Educação Ambiental como instrumento de compreensão crítica das relações entre sociedade e natureza.'
  ),

  P('q197','Sexta','Conservação e serviços ambientais','uso sustentável de recursos naturais',
    'Uma política ambiental que combina exploração econômica com limites de uso, reposição e manutenção das funções ecológicas busca',
    ['estimular exploração irrestrita','promover uso sustentável dos recursos naturais','eliminar instrumentos de gestão','priorizar apenas ganhos imediatos','reduzir áreas conservadas como objetivo central'],
    'B',
    'A prova Transpetro 2023 apresentou a exploração sustentável como contribuição positiva das políticas ambientais.'
  ),

  P('q198','Sexta','Conservação e serviços ambientais','3Rs — reutilização',
    'No contexto da política dos 3Rs, usar novamente um recipiente de vidro para armazenar outro produto, sem submetê-lo a processo industrial de transformação, exemplifica',
    ['redução','reutilização','reciclagem','incineração','compostagem'],
    'B',
    'A prova de 2023 diferenciou reutilização de reciclagem. Na reutilização, o objeto é usado novamente sem transformação industrial em nova matéria-prima.'
  ),

  P('q199','Terça','Ecossistemas e biodiversidade','extinção e espécies-chave',
    'A retirada de uma espécie que exerce influência desproporcional sobre a estrutura da comunidade pode gerar alterações intensas em vários níveis tróficos. Essa espécie é denominada',
    ['cosmopolita','espécie-chave','exótica obrigatória','pioneira obrigatória','doméstica'],
    'B',
    'Questões da banca frequentemente partem de situações ecológicas concretas. Espécies-chave têm efeito ecológico desproporcional à sua abundância.'
  ),

  P('q200','Terça','Ecossistemas e biodiversidade','habitat x nicho',
    'Uma ave nidifica em manguezais, alimenta-se de pequenos crustáceos e atua como predadora nesses ambientes. O manguezal corresponde ao seu habitat, enquanto a alimentação e sua função na comunidade integram seu',
    ['nicho ecológico','genótipo','bioma exclusivo','potencial biótico','ecótono'],
    'A',
    'A prova de 2023 cobrou nicho ecológico. Habitat indica onde a espécie vive; nicho descreve como ela vive e qual função desempenha.'
  ),

  P('q201','Segunda','Revisão + Ecologia','proteção ambiental e princípios',
    'Uma empresa conhece, por estudos consolidados, os efeitos tóxicos de determinado efluente e instala tratamento antes do lançamento. A atuação se relaciona principalmente ao princípio da',
    ['precaução','prevenção','retrocesso','participação','protetor-recebedor'],
    'B',
    'A Cesgranrio costuma contextualizar conceitos. Com risco conhecido e medidas adotadas antes do dano, predomina a prevenção.'
  ),

  P('q202','Segunda','Revisão + Ecologia','proteção ambiental e princípios',
    'Diante de uma nova substância com indícios de dano ambiental grave, mas sem consenso científico suficiente sobre seus efeitos, a imposição de restrições provisórias se fundamenta na',
    ['precaução','reparação integral','publicidade administrativa','legalidade tributária','especialidade'],
    'A',
    'A precaução se aplica diante de incerteza científica relevante sobre risco potencialmente grave.'
  ),

  P('q203','Segunda','Revisão + Ecologia','poluidor-pagador',
    'Ao exigir que uma atividade econômica incorpore aos seus custos as medidas de controle e os custos ambientais que produz, o poder público concretiza o princípio do',
    ['usuário-pagador','poluidor-pagador','protetor-recebedor','acesso equitativo','não retrocesso'],
    'B',
    'O poluidor-pagador busca internalizar custos ambientais, evitando sua transferência à coletividade.'
  ),

  P('q204','Segunda','Revisão + Ecologia','desenvolvimento sustentável',
    'Um plano de exploração florestal permite uso econômico atual, mas estabelece limites para manter a capacidade de regeneração e disponibilidade futura do recurso. A ideia central é a do',
    ['desenvolvimento sustentável','antropocentrismo clássico','retrocesso ambiental','uso irrestrito','isolamento ecológico'],
    'A',
    'A situação traduz o equilíbrio entre necessidades presentes e preservação das possibilidades das futuras gerações.'
  ),

  P('q205','Segunda','Revisão + Ecologia','competências ambientais',
    'Em matéria ambiental sujeita à competência concorrente, uma lei estadual detalha norma geral federal para atender peculiaridades regionais sem contrariá-la. Trata-se do exercício de competência',
    ['suplementar','privativa da União','exclusivamente municipal','judicial','tributária residual'],
    'A',
    'Os Estados e o Distrito Federal podem suplementar normas gerais da União em matéria de competência concorrente.'
  ),

  P('q206','Segunda','Revisão + Ecologia','competência material comum',
    'A fiscalização e a atuação administrativa destinadas a proteger o meio ambiente podem envolver União, Estados, Distrito Federal e Municípios porque a Constituição estabelece, para diversas ações ambientais, competência',
    ['material comum','legislativa privativa municipal','penal concorrente','jurisdicional compartilhada','tributária exclusiva'],
    'A',
    'O art. 23 prevê competência material comum entre todos os entes federativos em várias ações de proteção ambiental.'
  ),

  P('q207','Sexta','Conservação e serviços ambientais','serviços ecossistêmicos',
    'A polinização de culturas agrícolas por insetos silvestres gera benefício econômico e ecológico sem que o agricultor necessariamente produza esse processo. Trata-se de serviço ecossistêmico de',
    ['regulação','mineração','industrialização','urbanização','disposição final'],
    'A',
    'Polinização é um serviço ecossistêmico de regulação e foi um dos tipos de benefício ambiental compatíveis com a forma de cobrança da prova de 2023.'
  ),

  P('q208','Sexta','Conservação e serviços ambientais','restauração ecológica',
    'Em uma área degradada, o controle de erosão, o plantio de espécies nativas e o restabelecimento de processos ecológicos são medidas voltadas à',
    ['restauração ou recuperação ecológica','fragmentação do habitat','introdução deliberada de invasoras','redução da resiliência','impermeabilização do solo'],
    'A',
    'A questão aplica conteúdos de conservação a uma situação prática, formato recorrente na Cesgranrio.'
  ),

  P('q209','Terça','Ecossistemas e biodiversidade','biodiversidade',
    'Duas populações da mesma espécie apresentam diferenças de frequências alélicas e respostas distintas a uma doença. Essas diferenças representam biodiversidade em nível',
    ['genético','de ecossistemas','de biomas','trófico','paisagístico apenas'],
    'A',
    'Variações dentro da mesma espécie correspondem à diversidade genética.'
  ),

  P('q210','Terça','Ecossistemas e biodiversidade','fragmentação de habitats',
    'A construção de uma rodovia divide uma área florestal contínua em pequenos fragmentos isolados. Entre os efeitos ecológicos esperados está',
    ['aumento automático da conectividade','redução do fluxo gênico e intensificação de efeitos de borda','eliminação do risco de extinção local','redução da proporção de borda em todos os fragmentos','crescimento ilimitado de todas as populações'],
    'B',
    'A fragmentação reduz conectividade e pode aumentar isolamento, efeitos de borda e vulnerabilidade populacional.'
  )
]
