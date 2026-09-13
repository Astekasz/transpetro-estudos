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

const A = (id, day, theme, topic, statement, alternatives, correct, explanation) =>
  FQ(id, day, theme, 'Inédita • reforço adaptativo', `Desempenho recente • estilo Cesgranrio • ${topic}`, statement, alternatives, correct, explanation)

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
  ),

  // =========================================================
  // REFORÇO ADAPTATIVO — DESEMPENHO RECENTE (13/09/2026)
  // A–E balanceadas: 4 respostas corretas de cada letra.
  // =========================================================

  A('q211','Segunda','Revisão + Ecologia','usuário-pagador × poluidor-pagador',
    'Uma indústria capta água de um rio mediante outorga e, além disso, lança efluentes tratados dentro dos limites autorizados. A cobrança pela captação, independentemente de haver poluição, concretiza principalmente o princípio do',
    ['usuário-pagador','poluidor-pagador','protetor-recebedor','reparação integral','retrocesso ambiental'],
    'A',
    'O usuário-pagador atribui custo ao uso de um recurso natural mesmo sem dano ambiental. O poluidor-pagador se relaciona à internalização dos custos da poluição e de sua prevenção, controle e reparação.'
  ),

  A('q212','Segunda','Revisão + Ecologia','competência concorrente',
    'Uma lei estadual reduz a proteção de determinada área ambiental abaixo do padrão mínimo fixado em norma geral federal. No modelo constitucional de competência concorrente, essa lei estadual é problemática porque',
    ['a União não pode editar normas gerais ambientais','a suplementação estadual não pode contrariar a norma geral federal','os Estados só podem legislar após autorização municipal','a competência ambiental legislativa é exclusiva do Município','toda norma ambiental estadual depende de lei complementar federal específica'],
    'B',
    'Na competência concorrente, a União estabelece normas gerais e os Estados podem suplementá-las. A suplementação não autoriza contrariar o padrão geral federal.'
  ),

  A('q213','Segunda','Revisão + Ecologia','proporcionalidade ambiental',
    'Ao analisar uma política pública ambiental, o tribunal conclui que o Estado adotou medidas tão insuficientes que deixou um direito fundamental praticamente sem proteção. Essa conclusão se relaciona à proporcionalidade em sua vertente de',
    ['proibição de excesso apenas','reserva do possível','proibição de proteção insuficiente','autotutela administrativa','subsidiariedade federativa'],
    'C',
    'A proporcionalidade possui dupla dimensão: evita excesso estatal e também proteção insuficiente. Em matéria ambiental, a tutela deficiente pode violar o dever constitucional de proteção.'
  ),

  A('q214','Segunda','Revisão + Ecologia','democracia ambiental',
    'Em processo de licenciamento, moradores recebem dados sobre os impactos previstos, participam de audiência pública e podem provocar o Judiciário. Em conjunto, essas garantias representam mais diretamente o',
    ['princípio da correção na fonte','princípio do usuário-pagador','princípio da intervenção mínima','tripé da democracia ambiental','princípio da responsabilidade comum diferenciada'],
    'D',
    'Informação, participação e acesso à justiça formam o tripé da democracia ambiental, permitindo controle social e atuação informada da coletividade.'
  ),

  A('q215','Segunda','Revisão + Ecologia','tragédia dos bens comuns',
    'Em uma pastagem comunitária sem regras efetivas de uso, cada criador aumenta seu próprio rebanho porque recebe individualmente os benefícios, enquanto o custo da degradação é dividido entre todos. O mecanismo descrito corresponde à',
    ['solidariedade intergeracional','função socioambiental','responsabilidade objetiva','ecoeficiência','tragédia dos bens comuns'],
    'E',
    'Na tragédia dos bens comuns, incentivos individuais favorecem a superexploração de um recurso coletivo quando faltam regras, fiscalização e mecanismos de responsabilização.'
  ),

  A('q216','Segunda','Revisão + Ecologia','competência municipal',
    'Uma norma municipal disciplina a arborização e a proteção de pequenas áreas verdes urbanas por refletirem peculiaridades essencialmente locais, respeitando as normas federal e estadual. Essa atuação encontra fundamento na competência municipal para',
    ['legislar sobre interesse local e suplementar a legislação federal e estadual no que couber','editar normas gerais de competência concorrente em substituição à União','legislar privativamente sobre águas e energia','afastar qualquer padrão estadual de proteção','exercer competência legislativa exclusiva sobre florestas'],
    'A',
    'Os Municípios não integram o rol do art. 24, mas podem legislar sobre interesse local e suplementar normas federal e estadual conforme o art. 30.'
  ),

  A('q217','Segunda','Revisão + Ecologia','prevenção',
    'Uma atividade apresenta risco ambiental conhecido e bem documentado, mas seu operador sustenta que somente deveria agir após a ocorrência do dano. A resposta juridicamente adequada é que medidas antecipatórias são exigíveis com fundamento predominante na',
    ['precaução, pois todo risco conhecido é cientificamente incerto','prevenção, pois o risco já é conhecido','reparação integral, que substitui medidas preventivas','ubiquidade, que só atua depois do dano','participação, que elimina a necessidade de prevenção'],
    'B',
    'A prevenção atua diante de riscos cientificamente conhecidos. A precaução é mais própria dos cenários de incerteza científica relevante.'
  ),

  A('q218','Segunda','Revisão + Ecologia','art. 225 da Constituição',
    'A Constituição impõe ao Poder Público e à coletividade o dever de defender e preservar o meio ambiente. Dessa formulação decorre que a proteção ambiental é',
    ['dever exclusivo dos órgãos de fiscalização','faculdade estatal condicionada à conveniência administrativa','um direito-dever de titularidade difusa, com responsabilidade compartilhada de proteção','direito individual disponível, renunciável por seus titulares','atribuição exclusiva do Ministério Público'],
    'C',
    'O art. 225 combina direito difuso ao meio ambiente equilibrado com dever de proteção atribuído ao Poder Público e à coletividade.'
  ),

  A('q219','Terça','Ecossistemas e biodiversidade','riqueza × equabilidade',
    'Duas comunidades possuem dez espécies cada. Na primeira, uma espécie corresponde a 90% dos indivíduos; na segunda, as abundâncias são semelhantes entre as espécies. A segunda comunidade apresenta maior',
    ['riqueza de espécies','produtividade primária necessariamente','capacidade de suporte obrigatoriamente','equabilidade e, portanto, maior diversidade segundo índices que consideram abundância relativa','taxa de especiação por definição'],
    'D',
    'As duas comunidades têm a mesma riqueza, mas a segunda tem maior equabilidade. Índices de diversidade que incorporam abundância relativa tendem a ser maiores quando a distribuição é mais uniforme.'
  ),

  A('q220','Terça','Ecossistemas e biodiversidade','sucessão ecológica',
    'Após uma erupção vulcânica, uma superfície de lava recém-solidificada começa a ser colonizada por líquens e outros organismos pioneiros. Diferentemente de uma área florestal que rebrota após incêndio mantendo o solo, esse processo é classificado como sucessão',
    ['secundária, porque sempre há organismos pioneiros','climácica, porque começa sem competição','regressiva, porque reduz a biomassa','artificial, porque depende de dispersão','primária, porque se inicia em substrato sem solo previamente desenvolvido'],
    'E',
    'Sucessão primária começa em substrato inicialmente sem solo e sem comunidade anterior estabelecida. Se o solo permanece após uma perturbação, trata-se de sucessão secundária.'
  ),

  A('q221','Terça','Ecossistemas e biodiversidade','resistência ecológica',
    'Após uma perturbação, um manguezal perde parte de sua biomassa, mas mantém estrutura e funcionamento próximos do estado anterior durante o evento. Essa característica expressa principalmente sua',
    ['resistência ecológica','resiliência, necessariamente medida apenas após recuperação','riqueza específica','sucessão primária','capacidade de suporte populacional'],
    'A',
    'Resistência é a capacidade de sofrer pouca alteração diante da perturbação. Resiliência é a capacidade de recuperar estrutura e funções depois de alterado.'
  ),

  A('q222','Terça','Ecossistemas e biodiversidade','espécie-chave',
    'A retirada experimental de um predador pouco abundante causa forte aumento de herbívoros e queda acentuada da cobertura vegetal. O resultado indica que o predador pode ser considerado',
    ['espécie pioneira','espécie-chave, por exercer efeito desproporcional sobre a comunidade','espécie exótica apenas por ser predadora','organismo produtor','espécie indicadora exclusivamente por sua baixa abundância'],
    'B',
    'Espécies-chave exercem impacto desproporcional à sua abundância. Sua remoção pode desencadear cascatas tróficas e alterar fortemente a estrutura da comunidade.'
  ),

  A('q223','Terça','Ecossistemas e biodiversidade','fragmentação de habitats',
    'Uma estrada fragmenta uma floresta contínua em pequenos remanescentes. Mantidas as demais condições, a consequência mais consistente é',
    ['eliminação do efeito de borda','aumento garantido do fluxo gênico','redução da conectividade e aumento da proporção de áreas influenciadas pela borda','crescimento automático das populações interiores','homogeneização genética por maior migração'],
    'C',
    'A fragmentação reduz conectividade e aumenta a relação borda/área, favorecendo isolamento populacional e alterações microclimáticas nas margens.'
  ),

  A('q224','Quarta','Ciclos biogeoquímicos','nitrificação × desnitrificação',
    'Em uma estação de tratamento, condições aeróbias favorecem a oxidação de amônio a nitrito e nitrato; posteriormente, em zona anóxica, o nitrato é convertido em formas gasosas de nitrogênio. Os processos são, respectivamente,',
    ['amonificação e fixação','fixação e nitrificação','desnitrificação e amonificação','nitrificação e desnitrificação','mineralização e assimilação'],
    'D',
    'Nitrificação é a oxidação de formas reduzidas de nitrogênio até nitrito/nitrato. Desnitrificação reduz nitrato a formas gasosas, devolvendo nitrogênio à atmosfera.'
  ),

  A('q225','Quarta','Ciclos biogeoquímicos','eutrofização',
    'Um reservatório recebe grande carga de fósforo e nitrogênio, desenvolve floração algal e, depois, intensa decomposição da biomassa. O efeito mais provável na fase de decomposição é',
    ['redução da demanda bioquímica de oxigênio','elevação permanente do oxigênio dissolvido','interrupção da atividade bacteriana','remoção imediata de todos os nutrientes','queda do oxigênio dissolvido, podendo ocorrer hipóxia ou anoxia'],
    'E',
    'A decomposição aeróbia da grande biomassa produzida consome oxigênio. Se o consumo superar a reposição, desenvolvem-se hipóxia ou anoxia.'
  ),

  A('q226','Quarta','Ciclos biogeoquímicos','ciclo do fósforo',
    'A mineração de rocha fosfática e o uso de fertilizantes podem acelerar o fluxo de fósforo para ambientes aquáticos. Uma característica que diferencia o ciclo do fósforo do ciclo do nitrogênio é que o fósforo',
    ['não possui fase gasosa relevante em escala global','tem a atmosfera como seu principal reservatório','é fixado biologicamente a partir de P₂ atmosférico','retorna à atmosfera principalmente por desnitrificação','não participa da biomassa dos organismos'],
    'A',
    'O ciclo do fósforo é predominantemente sedimentar e não possui fase gasosa global relevante, ao contrário do nitrogênio, cujo grande reservatório é a atmosfera.'
  ),

  A('q227','Quarta','Ciclos biogeoquímicos','ciclo da água urbano',
    'A expansão de áreas impermeabilizadas em uma bacia urbana tende a alterar o ciclo hidrológico local principalmente por',
    ['aumentar a infiltração e reduzir o escoamento superficial','reduzir a infiltração e aumentar o escoamento superficial','eliminar a evapotranspiração em toda a bacia','aumentar necessariamente a recarga do aquífero','impedir a ocorrência de precipitação'],
    'B',
    'A impermeabilização dificulta a entrada de água no solo e aumenta o volume e a velocidade do escoamento superficial, contribuindo para picos de cheia.'
  ),

  A('q228','Quinta','Dinâmica das populações','crescimento logístico',
    'Uma população cresce rapidamente quando pequena, mas sua taxa de crescimento diminui à medida que a densidade se aproxima de um valor estável imposto pelos recursos do ambiente. O padrão descrito corresponde ao crescimento',
    ['linear, sem limitação ambiental','exponencial, com taxa per capita constante e sem limites','logístico, com desaceleração próxima da capacidade de suporte','geométrico, independente da densidade','aleatório, sem relação com recursos'],
    'C',
    'No modelo logístico, a resistência ambiental aumenta com a densidade e o crescimento desacelera quando a população se aproxima da capacidade de suporte K.'
  ),

  A('q229','Quinta','Dinâmica das populações','fatores dependentes da densidade',
    'Em uma população de roedores, a transmissão de uma doença aumenta com a aglomeração dos indivíduos, enquanto uma enchente extrema afeta a população independentemente de sua densidade. Esses fatores são, respectivamente,',
    ['ambos independentes da densidade','ambos dependentes da densidade','independente e dependente da densidade','dependente e independente da densidade','biótico e abiótico, portanto ambos necessariamente dependentes da densidade'],
    'D',
    'Doenças contagiosas frequentemente se intensificam com a densidade; eventos climáticos extremos, como enchentes, podem atuar independentemente dela.'
  ),

  A('q230','Quinta','Dinâmica das populações','deriva genética',
    'Uma população pequena e isolada sofre forte redução numérica após um evento aleatório e, nas gerações seguintes, apresenta menor diversidade genética. O processo que melhor explica essa perda aleatória de alelos é a',
    ['seleção estabilizadora','migração contínua','mutação direcionada','competição interespecífica','deriva genética, intensificada em populações pequenas'],
    'E',
    'A deriva genética corresponde a mudanças aleatórias nas frequências alélicas e tem efeito proporcionalmente maior em populações pequenas, especialmente após gargalos.'
  )
]
