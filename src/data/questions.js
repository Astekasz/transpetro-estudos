const letters = ['A', 'B', 'C', 'D', 'E']

function Q(id, day, theme, statement, alternatives, correct, explanation) {
  return {
    id,
    day,
    theme,
    sourceType: 'Inédita',
    sourceLabel: 'Clarice • estilo Cesgranrio',
    statement,
    options: Object.fromEntries(
      letters.map((letter, index) => [letter, alternatives[index]])
    ),
    correct,
    explanation
  }
}

export const questions = [

  // =========================================================
  // SEGUNDA — REVISÃO + ECOLOGIA
  // =========================================================

  Q('q001','Segunda','Revisão + Ecologia',
    'Diante de risco ambiental grave ainda cercado de incerteza científica, a atuação protetiva se relaciona principalmente ao princípio da',
    ['prevenção','precaução','reparação integral','participação','cooperação'],
    'B',
    'Precaução atua diante da incerteza científica.'
  ),

  Q('q002','Segunda','Revisão + Ecologia',
    'Quando o dano ambiental é cientificamente conhecido e medidas são adotadas para evitá-lo, aplica-se predominantemente o princípio da',
    ['precaução','prevenção','protetor-recebedor','ubiquidade','informação'],
    'B',
    'Prevenção pressupõe risco conhecido.'
  ),

  Q('q003','Segunda','Revisão + Ecologia',
    'A cobrança pelo uso da água por um agente econômico, independentemente da ocorrência de poluição, expressa o princípio do',
    ['poluidor-pagador','usuário-pagador','protetor-recebedor','limite','retrocesso'],
    'B',
    'Usuário-pagador atribui custo ao uso do recurso natural.'
  ),

  Q('q004','Segunda','Revisão + Ecologia',
    'A concessão de incentivo financeiro a um proprietário que preserva uma nascente exemplifica o princípio do',
    ['poluidor-pagador','usuário-pagador','protetor-recebedor','prevenção','correção na fonte'],
    'C',
    'Protetor-recebedor premia condutas ambientalmente positivas.'
  ),

  Q('q005','Segunda','Revisão + Ecologia',
    'A internalização das externalidades ambientais negativas de uma atividade econômica decorre do princípio do',
    ['poluidor-pagador','usuário-pagador','participação','solidariedade intergeracional','cooperação'],
    'A',
    'O poluidor deve suportar os custos ambientais de sua atividade.'
  ),

  Q('q006','Segunda','Revisão + Ecologia',
    'A obrigação de recuperar uma área degradada, cessar a lesão e ainda indenizar danos remanescentes está ligada ao princípio da',
    ['reparação integral','precaução','função social','transversalidade','ecoeficiência'],
    'A',
    'A reparação integral admite a cumulação de medidas.'
  ),

  Q('q007','Segunda','Revisão + Ecologia',
    'A inserção da dimensão ambiental em História, Geografia, Português e outras disciplinas exemplifica a',
    ['ubiquidade','transversalidade','equidade','responsabilidade diferenciada','correção na fonte'],
    'B',
    'Transversalidade significa inserir a temática ambiental em diferentes áreas.'
  ),

  Q('q008','Segunda','Revisão + Ecologia',
    'A ideia de que a questão ambiental deve ser considerada nas decisões públicas e privadas porque permeia todas as atividades corresponde à',
    ['transversalidade','ubiquidade','reparação integral','prevenção','informação'],
    'B',
    'Ubiquidade relaciona-se à presença ampla da dimensão ambiental.'
  ),

  Q('q009','Segunda','Revisão + Ecologia',
    'Combater um problema ambiental diretamente em sua origem, em vez de apenas remediar seus efeitos, traduz o princípio da',
    ['correção na fonte','precaução','participação','usuário-pagador','equidade'],
    'A',
    'Correção na fonte prioriza a atuação na origem do problema.'
  ),

  Q('q010','Segunda','Revisão + Ecologia',
    'A obrigação ética da geração presente de preservar condições ambientais para as futuras gerações representa a',
    ['solidariedade intergeracional','responsabilidade objetiva','participação','função social','ecoeficiência'],
    'A',
    'Solidariedade intergeracional conecta presentes e futuras gerações.'
  ),

  Q('q011','Segunda','Revisão + Ecologia',
    'Em Ecologia, o conjunto formado pelos seres vivos e pelos fatores abióticos com os quais eles interagem constitui um',
    ['habitat','ecossistema','nicho','bioma','população'],
    'B',
    'Ecossistema reúne componentes bióticos e abióticos.'
  ),

  Q('q012','Segunda','Revisão + Ecologia',
    'Um conjunto de indivíduos da mesma espécie que vive em determinada área e período constitui uma',
    ['comunidade','população','biosfera','cadeia alimentar','guilda'],
    'B',
    'População reúne indivíduos da mesma espécie.'
  ),

  Q('q013','Segunda','Revisão + Ecologia',
    'O conjunto de populações de espécies diferentes que coexistem e interagem em uma área é denominado',
    ['comunidade','população','ecossistema','biosfera','nicho'],
    'A',
    'Comunidade reúne populações de diferentes espécies.'
  ),

  Q('q014','Segunda','Revisão + Ecologia',
    'O local físico onde uma espécie vive corresponde ao seu',
    ['nicho ecológico','habitat','nível trófico','potencial biótico','ecótono'],
    'B',
    'Habitat é o local onde uma espécie vive.'
  ),

  Q('q015','Segunda','Revisão + Ecologia',
    'O papel funcional de uma espécie, incluindo uso de recursos e relações ecológicas, corresponde ao seu',
    ['habitat','nicho ecológico','bioma','ecótono','território'],
    'B',
    'Nicho descreve o papel ecológico da espécie.'
  ),

  Q('q016','Segunda','Revisão + Ecologia',
    'Organismos capazes de produzir matéria orgânica a partir de substâncias inorgânicas ocupam, em geral, o nível de',
    ['decompositores','consumidores primários','produtores','consumidores secundários','detritívoros'],
    'C',
    'Produtores formam a base de muitas cadeias alimentares.'
  ),

  Q('q017','Segunda','Revisão + Ecologia',
    'Ao longo de uma cadeia alimentar, a quantidade de energia disponível tende a',
    ['aumentar a cada nível','permanecer constante','diminuir a cada transferência','circular integralmente','ser reciclada como matéria'],
    'C',
    'Parte da energia é dissipada a cada transferência trófica.'
  ),

  Q('q018','Segunda','Revisão + Ecologia',
    'Diferentemente da energia, a matéria em um ecossistema tende a',
    ['ser destruída','ser reciclada em ciclos','aumentar indefinidamente','fluir apenas em um sentido','ser produzida pelos consumidores'],
    'B',
    'A matéria circula em ciclos biogeoquímicos.'
  ),

  Q('q019','Segunda','Revisão + Ecologia',
    'Uma alteração na qualidade da água que afeta organismos aquáticos e populações humanas evidencia que saúde humana e ambiente são',
    ['independentes','ecologicamente interligados','fenômenos exclusivamente urbanos','processos apenas genéticos','fenômenos sem dimensão social'],
    'B',
    'A saúde humana possui relação direta com as condições ambientais.'
  ),

  Q('q020','Segunda','Revisão + Ecologia',
    'A remoção de um predador de topo pode modificar populações em vários níveis tróficos. Esse fenômeno evidencia que os ecossistemas são',
    ['sistemas de componentes interdependentes','conjuntos sem relações causais','formados apenas por fatores abióticos','estruturas completamente estáveis','sistemas sem interações indiretas'],
    'A',
    'As espécies e processos ecológicos são interdependentes.'
  ),


  // =========================================================
  // TERÇA — ECOSSISTEMAS E BIODIVERSIDADE
  // =========================================================

  Q('q021','Terça','Ecossistemas e biodiversidade',
    'Em uma cadeia alimentar, os consumidores primários alimentam-se principalmente de',
    ['produtores','carnívoros','decompositores','consumidores secundários','detritívoros exclusivamente'],
    'A',
    'Consumidores primários normalmente são herbívoros.'
  ),

  Q('q022','Terça','Ecossistemas e biodiversidade',
    'Uma teia alimentar diferencia-se de uma cadeia alimentar porque',
    ['representa múltiplas relações tróficas interligadas','possui apenas um produtor','não possui consumidores','representa somente decompositores','não apresenta fluxo de energia'],
    'A',
    'A teia representa várias cadeias interconectadas.'
  ),

  Q('q023','Terça','Ecossistemas e biodiversidade',
    'A diversidade de espécies de uma comunidade depende, entre outros aspectos, da',
    ['riqueza e equabilidade','quantidade de água apenas','densidade humana exclusivamente','latitude apenas','biomassa de um único produtor'],
    'A',
    'Diversidade considera número de espécies e distribuição de abundâncias.'
  ),

  Q('q024','Terça','Ecossistemas e biodiversidade',
    'O número de espécies diferentes existente em determinada comunidade corresponde à',
    ['riqueza de espécies','densidade populacional','produtividade líquida','capacidade de suporte','resistência ambiental'],
    'A',
    'Riqueza é o número de espécies presentes.'
  ),

  Q('q025','Terça','Ecossistemas e biodiversidade',
    'A biodiversidade pode ser analisada nos níveis',
    ['genético, de espécies e de ecossistemas','apenas de espécies','somente genético','apenas de paisagens urbanas','somente populacional'],
    'A',
    'Biodiversidade envolve diferentes níveis de organização.'
  ),

  Q('q026','Terça','Ecossistemas e biodiversidade',
    'Uma espécie encontrada naturalmente apenas em uma região restrita é denominada',
    ['endêmica','exótica','cosmopolita','invasora','doméstica'],
    'A',
    'Espécies endêmicas possuem distribuição geográfica restrita.'
  ),

  Q('q027','Terça','Ecossistemas e biodiversidade',
    'Uma espécie introduzida fora de sua área natural de distribuição é classificada como',
    ['exótica','endêmica','autóctone','nativa obrigatória','pioneira'],
    'A',
    'Espécie exótica ocorre fora de sua distribuição natural.'
  ),

  Q('q028','Terça','Ecossistemas e biodiversidade',
    'Uma espécie exótica que se estabelece, espalha-se e causa impactos ecológicos é denominada',
    ['endêmica','invasora','pioneira','indicadora','rara'],
    'B',
    'Espécie invasora causa impactos fora de sua área natural.'
  ),

  Q('q029','Terça','Ecossistemas e biodiversidade',
    'A relação ecológica na qual duas espécies disputam um recurso limitado é chamada de',
    ['competição interespecífica','mutualismo','comensalismo','protocooperação','inquilinismo'],
    'A',
    'Competição interespecífica ocorre entre espécies diferentes.'
  ),

  Q('q030','Terça','Ecossistemas e biodiversidade',
    'Uma relação em que ambos os organismos envolvidos obtêm benefício é',
    ['mutualismo','predação','parasitismo','amensalismo','competição'],
    'A',
    'No mutualismo, ambos os participantes se beneficiam.'
  ),

  Q('q031','Terça','Ecossistemas e biodiversidade',
    'Na predação, ocorre',
    ['captura e consumo de um organismo por outro','benefício obrigatório de ambas as espécies','ausência de efeito entre espécies','uso de abrigo sem efeito sobre hospedeiro','competição por recursos apenas'],
    'A',
    'Predadores capturam e consomem presas.'
  ),

  Q('q032','Terça','Ecossistemas e biodiversidade',
    'A sucessão ecológica primária ocorre tipicamente em local',
    ['sem comunidade anterior e com formação inicial do substrato','já ocupado por comunidade madura','após perturbação com solo preservado','com alta biodiversidade obrigatória','sem espécies pioneiras'],
    'A',
    'A sucessão primária começa em substrato inicialmente desprovido de comunidade.'
  ),

  Q('q033','Terça','Ecossistemas e biodiversidade',
    'Após um incêndio em área onde o solo permanece presente, a recolonização corresponde geralmente à sucessão',
    ['secundária','primária','geológica','artificial obrigatória','sem sucessão'],
    'A',
    'A sucessão secundária ocorre onde o solo e parte da estrutura anterior permanecem.'
  ),

  Q('q034','Terça','Ecossistemas e biodiversidade',
    'Espécies pioneiras caracterizam-se frequentemente por',
    ['rápida colonização de áreas perturbadas','crescimento sempre lento','baixa capacidade de dispersão','dependência de comunidade madura','ausência de reprodução'],
    'A',
    'Pioneiras colonizam rapidamente ambientes abertos.'
  ),

  Q('q035','Terça','Ecossistemas e biodiversidade',
    'Um ecótono corresponde a uma',
    ['zona de transição entre comunidades ou ecossistemas','espécie exclusiva de ilha','população isolada','área sem biodiversidade','unidade taxonômica'],
    'A',
    'Ecótono é uma região de transição ecológica.'
  ),

  Q('q036','Terça','Ecossistemas e biodiversidade',
    'A fragmentação de habitats tende a',
    ['reduzir conectividade entre populações','aumentar sempre o fluxo gênico','eliminar efeitos de borda','aumentar continuamente a área nuclear','impedir isolamento'],
    'A',
    'Fragmentação pode isolar populações e reduzir conectividade.'
  ),

  Q('q037','Terça','Ecossistemas e biodiversidade',
    'O efeito de borda decorrente da fragmentação pode alterar',
    ['luz, temperatura, vento e umidade nas margens','somente o pH oceânico','apenas a diversidade genética humana','exclusivamente a tectônica local','somente a precipitação regional'],
    'A',
    'As bordas apresentam condições diferentes do interior.'
  ),

  Q('q038','Terça','Ecossistemas e biodiversidade',
    'Uma espécie cuja remoção provoca alterações desproporcionais na comunidade é frequentemente denominada',
    ['espécie-chave','espécie neutra','espécie doméstica','espécie basal obrigatória','espécie invasora obrigatória'],
    'A',
    'Espécies-chave exercem influência ecológica desproporcional.'
  ),

  Q('q039','Terça','Ecossistemas e biodiversidade',
    'Resistência ecológica corresponde à capacidade de um sistema de',
    ['permanecer relativamente pouco alterado diante de uma perturbação','recuperar-se exclusivamente após extinção','aumentar sempre sua diversidade','impedir qualquer seleção natural','eliminar espécies pioneiras'],
    'A',
    'Resistência mede quanto o sistema muda diante de uma perturbação.'
  ),

  Q('q040','Terça','Ecossistemas e biodiversidade',
    'Resiliência ecológica refere-se à capacidade de um ecossistema de',
    ['recuperar organização e funções após perturbação','evitar qualquer mudança','eliminar toda espécie invasora','permanecer sempre em equilíbrio estático','aumentar indefinidamente sua biomassa'],
    'A',
    'Resiliência envolve capacidade de recuperação.'
  ),


  // =========================================================
  // QUARTA — CICLOS BIOGEOQUÍMICOS
  // =========================================================

  Q('q041','Quarta','Ciclos biogeoquímicos',
    'No ciclo do carbono, a fotossíntese atua principalmente ao',
    ['retirar CO₂ e incorporá-lo à matéria orgânica','liberar N₂','converter nitrato em N₂','liberar fósforo atmosférico','aumentar metano obrigatoriamente'],
    'A',
    'A fotossíntese fixa carbono em matéria orgânica.'
  ),

  Q('q042','Quarta','Ciclos biogeoquímicos',
    'A respiração celular contribui para o ciclo do carbono ao',
    ['liberar CO₂ a partir da matéria orgânica','retirar permanentemente CO₂','fixar N₂','formar fosfatos minerais','impedir decomposição'],
    'A',
    'A respiração devolve carbono ao ambiente.'
  ),

  Q('q043','Quarta','Ciclos biogeoquímicos',
    'A queima de combustíveis fósseis altera o ciclo do carbono porque',
    ['transfere carbono geológico para a atmosfera','retira CO₂ permanentemente','fixa nitrogênio','elimina decompositores','reduz emissões de carbono'],
    'A',
    'A combustão libera carbono armazenado geologicamente.'
  ),

  Q('q044','Quarta','Ciclos biogeoquímicos',
    'O reflorestamento pode contribuir para o sequestro de carbono porque',
    ['plantas incorporam CO₂ à biomassa','plantas transformam CO₂ em N₂','impede toda respiração do solo','elimina metano','remove fósforo do planeta'],
    'A',
    'O crescimento vegetal incorpora carbono.'
  ),

  Q('q045','Quarta','Ciclos biogeoquímicos',
    'A fixação biológica do nitrogênio converte',
    ['N₂ atmosférico em formas assimiláveis','nitrato em N₂','amônia em nitrato','fósforo em nitrogênio','CO₂ em metano'],
    'A',
    'Microrganismos fixadores tornam o nitrogênio atmosférico biologicamente disponível.'
  ),

  Q('q046','Quarta','Ciclos biogeoquímicos',
    'A nitrificação corresponde à',
    ['oxidação de amônia até nitrito e nitrato','redução de nitrato a N₂','fixação de CO₂','decomposição de fosfato','produção exclusiva de N₂'],
    'A',
    'Bactérias nitrificantes oxidam formas reduzidas de nitrogênio.'
  ),

  Q('q047','Quarta','Ciclos biogeoquímicos',
    'A desnitrificação corresponde principalmente à',
    ['redução de nitrato a formas gasosas de nitrogênio','fixação de N₂ em amônia','oxidação de amônio','absorção de carbono','formação de fosfato'],
    'A',
    'A desnitrificação devolve nitrogênio à atmosfera.'
  ),

  Q('q048','Quarta','Ciclos biogeoquímicos',
    'A amonificação ocorre quando decompositores',
    ['transformam nitrogênio orgânico em amônia ou amônio','convertem N₂ diretamente em nitrato','reduzem nitrato a N₂','fixam carbono atmosférico','liberam fósforo gasoso'],
    'A',
    'A decomposição mineraliza o nitrogênio orgânico.'
  ),

  Q('q049','Quarta','Ciclos biogeoquímicos',
    'O excesso de fertilizantes nitrogenados e fosfatados em corpos d’água pode favorecer',
    ['eutrofização','desertificação','redução da produtividade primária','eliminação de algas','aumento permanente do oxigênio'],
    'A',
    'Nutrientes em excesso favorecem proliferação algal.'
  ),

  Q('q050','Quarta','Ciclos biogeoquímicos',
    'Durante eutrofização intensa, a decomposição da biomassa algal pode provocar',
    ['queda do oxigênio dissolvido','aumento permanente do oxigênio','eliminação de bactérias','ausência de matéria orgânica','redução do consumo de oxigênio'],
    'A',
    'A decomposição consome oxigênio.'
  ),

  Q('q051','Quarta','Ciclos biogeoquímicos',
    'Uma característica marcante do ciclo do fósforo é',
    ['não possuir fase gasosa relevante em escala global','ter a atmosfera como principal reservatório','ser dominado por N₂','não envolver decomposição','depender exclusivamente da fotossíntese'],
    'A',
    'O fósforo circula principalmente entre rochas, solo, água e organismos.'
  ),

  Q('q052','Quarta','Ciclos biogeoquímicos',
    'O intemperismo das rochas contribui para o ciclo do fósforo ao',
    ['liberar fosfatos para solo e água','converter nitrato em N₂','fixar CO₂','produzir metano','retirar água da atmosfera'],
    'A',
    'O intemperismo libera fósforo mineral.'
  ),

  Q('q053','Quarta','Ciclos biogeoquímicos',
    'A passagem da água do estado líquido para o gasoso é denominada',
    ['evaporação','condensação','precipitação','infiltração','percolação'],
    'A',
    'Evaporação transforma água líquida em vapor.'
  ),

  Q('q054','Quarta','Ciclos biogeoquímicos',
    'A perda de vapor d’água pelas plantas ocorre principalmente por',
    ['transpiração','nitrificação','desnitrificação','lixiviação','fixação'],
    'A',
    'As plantas perdem água principalmente pelos estômatos.'
  ),

  Q('q055','Quarta','Ciclos biogeoquímicos',
    'A entrada de água da superfície para o interior do solo é denominada',
    ['infiltração','condensação','sublimação','precipitação','fotólise'],
    'A',
    'Infiltração é a entrada de água no solo.'
  ),

  Q('q056','Quarta','Ciclos biogeoquímicos',
    'A impermeabilização do solo urbano tende a',
    ['aumentar escoamento superficial e reduzir infiltração','diminuir escoamento e aumentar infiltração','eliminar precipitação','aumentar sempre a recarga','não alterar o ciclo da água'],
    'A',
    'Pavimentação reduz infiltração e aumenta escoamento.'
  ),

  Q('q057','Quarta','Ciclos biogeoquímicos',
    'A decomposição é fundamental aos ciclos biogeoquímicos porque',
    ['devolve nutrientes aos compartimentos abióticos','remove nutrientes permanentemente','impede mineralização','atua apenas no ciclo da água','não envolve microrganismos'],
    'A',
    'Decompositores reciclam nutrientes.'
  ),

  Q('q058','Quarta','Ciclos biogeoquímicos',
    'A queima de biomassa pode afetar os ciclos do carbono e nitrogênio porque',
    ['libera gases e modifica estoques de nutrientes','fixa todos os nutrientes no solo','impede emissões atmosféricas','afeta somente o fósforo','não modifica fluxos químicos'],
    'A',
    'A combustão altera estoques e fluxos de vários elementos.'
  ),

  Q('q059','Quarta','Ciclos biogeoquímicos',
    'A lixiviação de nitrato em áreas agrícolas preocupa porque esse composto',
    ['é solúvel e pode contaminar águas','é completamente insolúvel','não participa do ciclo do nitrogênio','é exclusivamente gasoso','impede eutrofização'],
    'A',
    'O nitrato possui elevada mobilidade em água.'
  ),

  Q('q060','Quarta','Ciclos biogeoquímicos',
    'Os ciclos biogeoquímicos conectam atmosfera, hidrosfera, litosfera e biosfera porque',
    ['elementos químicos circulam entre compartimentos bióticos e abióticos','cada compartimento é isolado','a matéria flui em sentido único','somente energia é reciclada','organismos não alteram fluxos'],
    'A',
    'Os elementos químicos circulam entre diferentes reservatórios.'
  ),


  // =========================================================
  // QUINTA — DINÂMICA DAS POPULAÇÕES
  // =========================================================

  Q('q061','Quinta','Dinâmica das populações',
    'A densidade populacional corresponde ao',
    ['número de indivíduos por unidade de área ou volume','número de espécies de uma comunidade','número de genes de uma espécie','volume de alimento disponível','número de predadores apenas'],
    'A',
    'Densidade relaciona abundância e espaço.'
  ),

  Q('q062','Quinta','Dinâmica das populações',
    'O tamanho de uma população aumenta diretamente por meio de',
    ['natalidade e imigração','mortalidade e emigração','competição e mortalidade','emigração e predação','redução da fecundidade'],
    'A',
    'Nascimentos e imigração adicionam indivíduos.'
  ),

  Q('q063','Quinta','Dinâmica das populações',
    'O tamanho de uma população diminui diretamente por meio de',
    ['mortalidade e emigração','natalidade e imigração','fecundidade e recrutamento','imigração e nascimento','colonização e reprodução'],
    'A',
    'Mortes e emigração retiram indivíduos.'
  ),

  Q('q064','Quinta','Dinâmica das populações',
    'Sob recursos teoricamente ilimitados, uma população pode apresentar crescimento',
    ['exponencial','logístico exclusivamente','estacionário','negativo obrigatório','linear obrigatório'],
    'A',
    'O modelo exponencial pressupõe pouca limitação ambiental.'
  ),

  Q('q065','Quinta','Dinâmica das populações',
    'No modelo logístico, a taxa de crescimento tende a diminuir quando a população',
    ['se aproxima da capacidade de suporte','se aproxima de zero','elimina competição','aumenta recursos indefinidamente','passa a crescer sem limites'],
    'A',
    'A resistência ambiental aumenta próximo de K.'
  ),

  Q('q066','Quinta','Dinâmica das populações',
    'A capacidade de suporte de um ambiente, frequentemente representada por K, é',
    ['o tamanho populacional sustentável pelo ambiente','o número mínimo de espécies','a taxa máxima de mutação','o número de imigrantes','a riqueza da comunidade'],
    'A',
    'K indica quantos indivíduos o ambiente consegue sustentar.'
  ),

  Q('q067','Quinta','Dinâmica das populações',
    'A competição intraespecífica tende a atuar como fator',
    ['dependente da densidade','independente da densidade','exclusivamente abiótico','sem efeito populacional','geológico'],
    'A',
    'A competição tende a aumentar quando a densidade cresce.'
  ),

  Q('q068','Quinta','Dinâmica das populações',
    'Uma tempestade severa que reduz uma população independentemente de seu tamanho é fator',
    ['independente da densidade','dependente da densidade','exclusivamente biótico','intraespecífico','reprodutivo'],
    'A',
    'Eventos climáticos podem ocorrer independentemente da densidade.'
  ),

  Q('q069','Quinta','Dinâmica das populações',
    'Doenças contagiosas frequentemente atuam como fatores',
    ['dependentes da densidade','sempre independentes da densidade','sem relação com abundância','exclusivamente geológicos','apenas vegetais'],
    'A',
    'Transmissão pode aumentar em populações mais densas.'
  ),

  Q('q070','Quinta','Dinâmica das populações',
    'Uma população com grande proporção de indivíduos jovens pode apresentar',
    ['potencial elevado de crescimento futuro','declínio imediato obrigatório','ausência de recrutamento','natalidade nula','estrutura etária irrelevante'],
    'A',
    'Muitos jovens podem gerar elevado recrutamento futuro.'
  ),

  Q('q071','Quinta','Dinâmica das populações',
    'A razão sexual de uma população pode influenciar diretamente',
    ['o potencial reprodutivo','o ciclo do fósforo','a precipitação','a fotossíntese','a tectônica de placas'],
    'A',
    'A proporção entre sexos pode afetar oportunidades de reprodução.'
  ),

  Q('q072','Quinta','Dinâmica das populações',
    'Uma distribuição espacial agregada ocorre quando os indivíduos',
    ['se concentram em grupos ou manchas','mantêm espaçamento absolutamente uniforme','ocupam posições necessariamente aleatórias','não respondem a recursos','não apresentam interação social'],
    'A',
    'Recursos concentrados ou comportamento social favorecem agregação.'
  ),

  Q('q073','Quinta','Dinâmica das populações',
    'Territorialidade pode favorecer uma distribuição espacial',
    ['uniforme','agregada obrigatoriamente','sem padrão','exclusivamente aleatória','vertical'],
    'A',
    'Repulsão entre indivíduos pode gerar espaçamento uniforme.'
  ),

  Q('q074','Quinta','Dinâmica das populações',
    'O potencial biótico representa',
    ['a capacidade máxima teórica de reprodução','a quantidade mínima de indivíduos','a riqueza de espécies','a quantidade de predadores','a mortalidade obrigatória'],
    'A',
    'Potencial biótico indica capacidade máxima de crescimento.'
  ),

  Q('q075','Quinta','Dinâmica das populações',
    'A resistência ambiental corresponde ao conjunto de fatores que',
    ['limitam o crescimento populacional','aumentam indefinidamente a natalidade','eliminam mortalidade','impedem competição','eliminam capacidade de suporte'],
    'A',
    'Recursos limitados, competição e predadores restringem o crescimento.'
  ),

  Q('q076','Quinta','Dinâmica das populações',
    'Uma curva de crescimento em formato de J está associada principalmente ao modelo',
    ['exponencial','logístico','estacionário','linear','decrescente'],
    'A',
    'O crescimento exponencial produz curva em J.'
  ),

  Q('q077','Quinta','Dinâmica das populações',
    'Uma curva de crescimento em formato aproximadamente sigmoide é associada ao modelo',
    ['logístico','exponencial','linear','geométrico sem limites','sem capacidade de suporte'],
    'A',
    'O crescimento logístico desacelera próximo de K.'
  ),

  Q('q078','Quinta','Dinâmica das populações',
    'Se natalidade + imigração forem maiores que mortalidade + emigração, a população tende a',
    ['crescer','diminuir','permanecer necessariamente constante','extinguir-se imediatamente','não apresentar alteração possível'],
    'A',
    'Entradas superiores às saídas geram crescimento.'
  ),

  Q('q079','Quinta','Dinâmica das populações',
    'Uma população muito pequena e isolada pode apresentar maior vulnerabilidade a',
    ['deriva genética e endogamia','aumento garantido da diversidade genética','fluxo gênico ilimitado','eliminação de efeitos aleatórios','crescimento infinito'],
    'A',
    'Populações pequenas sofrem mais com deriva e perda de variabilidade.'
  ),

  Q('q080','Quinta','Dinâmica das populações',
    'O monitoramento periódico da abundância de uma população permite avaliar',
    ['tendências de crescimento ou declínio','apenas a composição química da água','somente a riqueza de espécies vegetais','exclusivamente o ciclo do carbono','apenas a idade geológica'],
    'A',
    'Séries temporais ajudam a identificar tendências populacionais.'
  ),


  // =========================================================
  // SEXTA — CONSERVAÇÃO E SERVIÇOS AMBIENTAIS
  // =========================================================

  Q('q081','Sexta','Conservação e serviços ambientais',
    'A conservação in situ caracteriza-se pela proteção de espécies',
    ['em seu ambiente natural','apenas em zoológicos','apenas em bancos genéticos','somente em laboratório','somente em jardins botânicos'],
    'A',
    'In situ conserva espécies em seus habitats.'
  ),

  Q('q082','Sexta','Conservação e serviços ambientais',
    'Um banco de sementes é exemplo de conservação',
    ['ex situ','in situ','natural obrigatória','paisagística','populacional apenas'],
    'A',
    'Ex situ ocorre fora do habitat natural.'
  ),

  Q('q083','Sexta','Conservação e serviços ambientais',
    'A criação de corredores ecológicos tem como objetivo principal',
    ['aumentar conectividade entre fragmentos','aumentar isolamento','reduzir fluxo gênico','impedir dispersão','eliminar unidades de conservação'],
    'A',
    'Corredores facilitam movimento e fluxo gênico.'
  ),

  Q('q084','Sexta','Conservação e serviços ambientais',
    'A fragmentação de habitats pode aumentar o risco de extinção local porque',
    ['reduz área e conectividade das populações','aumenta automaticamente diversidade','elimina efeitos de borda','aumenta sempre imigração','impede isolamento'],
    'A',
    'Fragmentos pequenos e isolados tendem a aumentar vulnerabilidade.'
  ),

  Q('q085','Sexta','Conservação e serviços ambientais',
    'Polinização realizada por animais é exemplo de serviço ecossistêmico de',
    ['regulação','provisão exclusivamente','suporte geológico','natureza industrial','uso direto mineral'],
    'A',
    'A polinização é usualmente classificada como serviço de regulação.'
  ),

  Q('q086','Sexta','Conservação e serviços ambientais',
    'A produção de água, madeira e alimentos está associada principalmente aos serviços ecossistêmicos de',
    ['provisão','regulação','culturais exclusivamente','controle jurídico','remediação'],
    'A',
    'Serviços de provisão fornecem bens materiais.'
  ),

  Q('q087','Sexta','Conservação e serviços ambientais',
    'Controle de enchentes e regulação climática são exemplos de serviços de',
    ['regulação','provisão','produção industrial','extração mineral','informação jurídica'],
    'A',
    'Esses serviços regulam processos ambientais.'
  ),

  Q('q088','Sexta','Conservação e serviços ambientais',
    'Recreação, turismo e valores espirituais associados à natureza são serviços',
    ['culturais','de provisão','de mineração','de decomposição apenas','industriais'],
    'A',
    'Serviços culturais envolvem benefícios não materiais.'
  ),

  Q('q089','Sexta','Conservação e serviços ambientais',
    'O princípio protetor-recebedor está associado à ideia de',
    ['recompensar quem adota condutas ambientais positivas','autorizar poluição mediante pagamento','cobrar exclusivamente pelo uso da água','punir apenas após dano','eliminar incentivos econômicos'],
    'A',
    'Trata-se de uma lógica de incentivo.'
  ),

  Q('q090','Sexta','Conservação e serviços ambientais',
    'Pagamento por serviços ambientais busca',
    ['incentivar ações que conservem ou recuperem serviços ecossistêmicos','autorizar qualquer degradação','substituir toda fiscalização','eliminar áreas protegidas','impedir atividades sustentáveis'],
    'A',
    'O PSA cria incentivos econômicos à conservação.'
  ),

  Q('q091','Sexta','Conservação e serviços ambientais',
    'O princípio poluidor-pagador determina que',
    ['os custos ambientais sejam internalizados pelo responsável','o pagamento autorize poluir','a sociedade arque com toda degradação','não exista prevenção','somente o Estado seja responsável'],
    'A',
    'Quem gera externalidades deve suportar seus custos.'
  ),

  Q('q092','Sexta','Conservação e serviços ambientais',
    'O princípio poluidor-pagador não significa que',
    ['o pagamento autoriza a poluição','o poluidor deve internalizar custos','medidas preventivas podem ser exigidas','externalidades devem ser consideradas','custos não devem ser transferidos à coletividade'],
    'A',
    'Pagar não cria uma licença para poluir.'
  ),

  Q('q093','Sexta','Conservação e serviços ambientais',
    'Uma espécie endêmica pode ser especialmente vulnerável porque',
    ['possui distribuição restrita','ocorre em todos os continentes','é sempre abundante','não sofre perda de habitat','é necessariamente invasora'],
    'A',
    'Uma ameaça localizada pode afetar grande parte da população de uma espécie endêmica.'
  ),

  Q('q094','Sexta','Conservação e serviços ambientais',
    'Uma espécie-guarda-chuva é útil à conservação porque sua proteção',
    ['pode beneficiar várias outras espécies e habitats','elimina a necessidade de áreas protegidas','substitui qualquer planejamento','ocorre apenas em laboratório','não beneficia outras espécies'],
    'A',
    'Sua área de vida ou necessidades abrangentes protegem outras espécies.'
  ),

  Q('q095','Sexta','Conservação e serviços ambientais',
    'Espécies bioindicadoras são úteis porque',
    ['podem sinalizar alterações na qualidade ambiental','sempre aumentam com a poluição','não respondem a mudanças ambientais','são necessariamente predadores','existem somente em ambientes marinhos'],
    'A',
    'Sua condição pode refletir características ambientais.'
  ),

  Q('q096','Sexta','Conservação e serviços ambientais',
    'Manter diversidade genética em populações é importante porque',
    ['preserva potencial adaptativo','gera uniformidade genética','impede seleção natural','elimina mutações','substitui a conservação de habitat'],
    'A',
    'Variabilidade genética favorece adaptação a mudanças.'
  ),

  Q('q097','Sexta','Conservação e serviços ambientais',
    'No manejo adaptativo, decisões são',
    ['reavaliadas à luz de monitoramento e novos conhecimentos','fixadas definitivamente','tomadas sem indicadores','independentes de resultados','baseadas apenas em tradição'],
    'A',
    'Manejo adaptativo incorpora aprendizado contínuo.'
  ),

  Q('q098','Sexta','Conservação e serviços ambientais',
    'A preservação de mata ciliar contribui para',
    ['controle de erosão e proteção da qualidade da água','aumento do assoreamento','redução obrigatória da infiltração','eliminação da conectividade','aumento inevitável da poluição'],
    'A',
    'Vegetação ciliar protege margens e filtra sedimentos.'
  ),

  Q('q099','Sexta','Conservação e serviços ambientais',
    'Espécies exóticas invasoras podem ameaçar espécies nativas por meio de',
    ['competição, predação e transmissão de doenças','ausência completa de interação','eliminação de competição','redução de impactos','incapacidade de reprodução'],
    'A',
    'Invasoras podem modificar profundamente comunidades.'
  ),

  Q('q100','Sexta','Conservação e serviços ambientais',
    'Uma estratégia ampla de conservação da biodiversidade deve considerar',
    ['genes, espécies, ecossistemas e processos ecológicos','apenas espécies carismáticas','somente áreas urbanas','somente estoque de madeira','apenas abundância humana'],
    'A',
    'A biodiversidade possui múltiplos níveis.'
  ),


  // =========================================================
  // SÁBADO — BIOGEOGRAFIA
  // =========================================================

  Q('q101','Sábado','Biogeografia',
    'A especiação alopátrica ocorre tipicamente quando',
    ['uma barreira geográfica reduz o fluxo gênico','não ocorre isolamento','há panmixia completa','a seleção deixa de existir','as populações permanecem completamente conectadas'],
    'A',
    'O isolamento geográfico pode favorecer divergência.'
  ),

  Q('q102','Sábado','Biogeografia',
    'Vicariância ocorre quando',
    ['uma barreira divide uma distribuição anteriormente contínua','organismos atravessam uma barreira','não ocorre alteração geográfica','uma espécie aumenta sua fecundidade','ocorre apenas migração sazonal'],
    'A',
    'Na vicariância, a barreira surge separando populações.'
  ),

  Q('q103','Sábado','Biogeografia',
    'Dispersão, em Biogeografia, corresponde à',
    ['movimentação de organismos para novas áreas','formação de uma barreira geográfica','extinção obrigatória','mudança de nicho sem movimento','formação de fósseis'],
    'A',
    'Dispersão envolve movimento e colonização.'
  ),

  Q('q104','Sábado','Biogeografia',
    'A deriva continental é importante para explicar distribuições biológicas porque',
    ['altera conexões entre massas terrestres ao longo do tempo','não altera distribuição de organismos','atua apenas no ciclo do carbono','impede especiação','ocorre somente em ilhas recentes'],
    'A',
    'Movimentos continentais modificam isolamento e conectividade.'
  ),

  Q('q105','Sábado','Biogeografia',
    'A tectônica de placas pode produzir padrões biogeográficos ao',
    ['criar ou remover barreiras geográficas','impedir especiação','manter continentes imóveis','aumentar fluxo gênico sempre','atuar apenas em oceanos'],
    'A',
    'A geografia do planeta muda em escala geológica.'
  ),

  Q('q106','Sábado','Biogeografia',
    'Segundo a teoria de biogeografia de ilhas, a riqueza de espécies resulta do equilíbrio entre',
    ['imigração e extinção','mutação e seleção apenas','natalidade humana e mortalidade','precipitação e evaporação','produção e decomposição'],
    'A',
    'O modelo clássico considera taxas de imigração e extinção.'
  ),

  Q('q107','Sábado','Biogeografia',
    'Ilhas de maior área tendem, em geral, a possuir mais espécies porque',
    ['oferecem mais habitats e sustentam populações maiores','estão sempre mais próximas do continente','não apresentam extinções','não possuem efeitos de borda','não apresentam competição'],
    'A',
    'Maior área tende a diminuir risco de extinção.'
  ),

  Q('q108','Sábado','Biogeografia',
    'Ilhas próximas a uma fonte continental tendem a apresentar',
    ['maior taxa de imigração','menor taxa de imigração','ausência de colonização','isolamento absoluto','riqueza sempre nula'],
    'A',
    'A proximidade facilita a chegada de organismos.'
  ),

  Q('q109','Sábado','Biogeografia',
    'A deriva genética tende a exercer maior efeito em',
    ['populações pequenas','populações muito grandes','populações com fluxo gênico máximo','comunidades sem reprodução','ecossistemas inteiros sem populações'],
    'A',
    'Eventos aleatórios têm efeito proporcionalmente maior em populações pequenas.'
  ),

  Q('q110','Sábado','Biogeografia',
    'O fluxo gênico tende a',
    ['reduzir diferenças genéticas entre populações','aumentar isolamento obrigatoriamente','eliminar toda variação','impedir reprodução','provocar especiação em todos os casos'],
    'A',
    'Migração e reprodução entre populações homogenizam frequências alélicas.'
  ),

  Q('q111','Sábado','Biogeografia',
    'O efeito fundador ocorre quando',
    ['uma nova população é formada por poucos indivíduos','uma população recebe milhares de migrantes','não ocorre deriva genética','há seleção estabilizadora obrigatória','duas espécies tornam-se uma'],
    'A',
    'Poucos fundadores carregam apenas parte da diversidade original.'
  ),

  Q('q112','Sábado','Biogeografia',
    'Um gargalo populacional pode provocar',
    ['redução da diversidade genética','aumento garantido da variabilidade','eliminação da deriva genética','aumento de fluxo gênico','crescimento infinito'],
    'A',
    'Uma forte redução populacional pode perder alelos.'
  ),

  Q('q113','Sábado','Biogeografia',
    'Barreiras como montanhas ou grandes rios podem favorecer',
    ['isolamento geográfico','panmixia completa','fluxo gênico ilimitado','ausência de diferenciação','homogeneização automática'],
    'A',
    'Barreiras físicas podem restringir movimento e reprodução.'
  ),

  Q('q114','Sábado','Biogeografia',
    'O isolamento reprodutivo é importante na especiação porque',
    ['reduz ou impede troca genética entre grupos','aumenta sempre fluxo gênico','impede diferenciação','elimina mutações','mantém populações geneticamente idênticas'],
    'A',
    'A redução do fluxo gênico permite evolução independente.'
  ),

  Q('q115','Sábado','Biogeografia',
    'Uma espécie que ocupa ampla área geográfica é descrita como possuidora de',
    ['ampla distribuição','endemismo extremo','isolamento obrigatório','distribuição relicta obrigatória','ausência de dispersão'],
    'A',
    'A distribuição geográfica pode variar de restrita a ampla.'
  ),

  Q('q116','Sábado','Biogeografia',
    'O endemismo é particularmente relevante em conservação porque',
    ['espécies restritas podem ser vulneráveis a impactos locais','espécies endêmicas ocorrem em todo o planeta','endemismo impede extinção','essas espécies são sempre abundantes','endemismo significa espécie invasora'],
    'A',
    'Impactos em uma pequena região podem afetar toda a espécie.'
  ),

  Q('q117','Sábado','Biogeografia',
    'Mudanças climáticas podem alterar distribuições geográficas porque',
    ['modificam condições ambientais adequadas às espécies','não alteram temperatura ou chuva','impedem migração','mantêm nichos climáticos fixos','atuam apenas em organismos marinhos'],
    'A',
    'Espécies podem deslocar suas áreas de ocorrência conforme o clima muda.'
  ),

  Q('q118','Sábado','Biogeografia',
    'A dispersão de sementes por aves pode influenciar a biogeografia porque',
    ['favorece colonização de novas áreas','impede qualquer movimento','elimina fluxo gênico','reduz distribuição obrigatoriamente','não interfere na ocorrência das plantas'],
    'A',
    'Vetores biológicos podem ampliar dispersão de organismos.'
  ),

  Q('q119','Sábado','Biogeografia',
    'A separação de continentes pode gerar padrões semelhantes de organismos relacionados em regiões hoje distantes devido à',
    ['história biogeográfica comum','ausência de evolução','migração humana obrigatória','convergência exclusivamente','eliminação de barreiras'],
    'A',
    'A história tectônica ajuda a explicar distribuições disjuntas.'
  ),

  Q('q120','Sábado','Biogeografia',
    'Biogeografia é a área que estuda principalmente',
    ['a distribuição dos organismos no espaço e no tempo','somente cadeias alimentares','somente fisiologia animal','apenas química atmosférica','exclusivamente genética molecular'],
    'A',
    'Biogeografia investiga padrões e processos de distribuição da vida.'
  ),


  // =========================================================
  // DOMINGO — REVISÃO ACUMULATIVA
  // =========================================================

  Q('q121','Domingo','Revisão acumulativa',
    'Na evolução histórica do Direito Ambiental, a fase fragmentária caracteriza-se pela',
    ['proteção isolada de determinados recursos naturais','visão integrada de todos os componentes','ausência de legislação','predominância exclusiva do biocentrismo','proteção apenas climática'],
    'A',
    'A fase fragmentária tratava recursos de forma setorial.'
  ),

  Q('q122','Domingo','Revisão acumulativa',
    'No Brasil, o início da visão holística do meio ambiente está fortemente associado à',
    ['Lei 6.938/1981','Lei 9.605/1998','Lei 12.305/2010','Constituição de 1934','Lei 9.433/1997'],
    'A',
    'A PNMA de 1981 é marco da abordagem integrada.'
  ),

  Q('q123','Domingo','Revisão acumulativa',
    'A posição predominante no Direito Ambiental brasileiro é frequentemente descrita como',
    ['antropocentrismo moderado ou alargado','antropocentrismo clássico absoluto','ecocentrismo radical','negação do valor ambiental','utilitarismo integral'],
    'A',
    'O ser humano permanece central, mas com ampliação da consideração ecológica.'
  ),

  Q('q124','Domingo','Revisão acumulativa',
    'A teoria da Sociedade do Risco, associada a Ulrich Beck, destaca que',
    ['a modernidade tecnológica também produz riscos complexos','recursos comuns sempre se autorregulam','todo risco é natural','tecnologia elimina incertezas','poluição é sempre local'],
    'A',
    'A própria modernização gera novos riscos.'
  ),

  Q('q125','Domingo','Revisão acumulativa',
    'A exploração excessiva de um recurso compartilhado por indivíduos que buscam maximizar benefícios particulares exemplifica a',
    ['tragédia dos bens comuns','solidariedade intergeracional','ecoeficiência','reparação integral','transversalidade'],
    'A',
    'Sem regras adequadas, recursos comuns podem ser superexplorados.'
  ),

  Q('q126','Domingo','Revisão acumulativa',
    'Em um vazamento de petróleo, a degradação do ecossistema considerado como bem coletivo representa dano ao',
    ['macrobem ambiental','microbem privado exclusivamente','patrimônio sem titular','nicho ecológico','serviço cultural apenas'],
    'A',
    'Macrobem é o meio ambiente em sua dimensão coletiva.'
  ),

  Q('q127','Domingo','Revisão acumulativa',
    'A existência de incerteza científica sobre um possível dano grave conduz prioritariamente ao princípio da',
    ['precaução','prevenção','reparação integral','participação','limite'],
    'A',
    'Precaução atua na incerteza.'
  ),

  Q('q128','Domingo','Revisão acumulativa',
    'Um risco conhecido e cientificamente mensurável conduz prioritariamente ao princípio da',
    ['prevenção','precaução','protetor-recebedor','equidade','informação'],
    'A',
    'Prevenção atua em riscos conhecidos.'
  ),

  Q('q129','Domingo','Revisão acumulativa',
    'A remuneração pela preservação de uma nascente está associada ao princípio do',
    ['protetor-recebedor','poluidor-pagador','usuário-pagador','retrocesso','limite'],
    'A',
    'O protetor-recebedor incentiva condutas positivas.'
  ),

  Q('q130','Domingo','Revisão acumulativa',
    'O desenvolvimento sustentável busca',
    ['atender às necessidades atuais sem comprometer as futuras','impedir todo uso de recursos','maximizar consumo presente','eliminar atividade econômica','proteger somente recursos renováveis'],
    'A',
    'O conceito incorpora responsabilidade entre gerações.'
  ),

  Q('q131','Domingo','Revisão acumulativa',
    'Em uma teia alimentar, a retirada de um predador pode afetar várias outras espécies porque',
    ['as relações tróficas são interdependentes','cada espécie funciona isoladamente','energia é reciclada integralmente','predadores não influenciam presas','não existem efeitos indiretos'],
    'A',
    'Comunidades possuem relações diretas e indiretas.'
  ),

  Q('q132','Domingo','Revisão acumulativa',
    'A queima de combustíveis fósseis interfere no ciclo do carbono principalmente ao',
    ['transferir carbono geológico para a atmosfera','fixar N₂','reduzir CO₂','eliminar respiração','impedir fotossíntese'],
    'A',
    'Combustíveis fósseis liberam carbono armazenado por longos períodos.'
  ),

  Q('q133','Domingo','Revisão acumulativa',
    'No ciclo do nitrogênio, a desnitrificação',
    ['converte nitratos em formas gasosas de nitrogênio','fixa N₂ em amônia','converte amônia em nitrato','incorpora carbono','libera fósforo de rochas'],
    'A',
    'A desnitrificação devolve nitrogênio à atmosfera.'
  ),

  Q('q134','Domingo','Revisão acumulativa',
    'Quando uma população se aproxima de sua capacidade de suporte, o crescimento logístico tende a',
    ['desacelerar','acelerar indefinidamente','tornar-se sempre negativo','ficar independente dos recursos','transformar-se em crescimento exponencial'],
    'A',
    'Limitações ambientais aumentam próximo de K.'
  ),

  Q('q135','Domingo','Revisão acumulativa',
    'Uma seca extrema que afeta a população sem depender de sua densidade é classificada como fator',
    ['independente da densidade','dependente da densidade','intraespecífico obrigatório','biótico obrigatório','reprodutivo'],
    'A',
    'Eventos climáticos podem atuar independentemente da densidade.'
  ),

  Q('q136','Domingo','Revisão acumulativa',
    'A proteção de uma espécie dentro de seu próprio habitat natural exemplifica conservação',
    ['in situ','ex situ','laboratorial','artificial obrigatória','genética apenas'],
    'A',
    'In situ significa conservar no ambiente natural.'
  ),

  Q('q137','Domingo','Revisão acumulativa',
    'Corredores ecológicos têm como uma de suas principais funções',
    ['aumentar conectividade entre fragmentos','aumentar isolamento','eliminar dispersão','reduzir fluxo gênico','substituir todas as unidades de conservação'],
    'A',
    'Corredores favorecem movimento e fluxo gênico.'
  ),

  Q('q138','Domingo','Revisão acumulativa',
    'Segundo a teoria de biogeografia de ilhas, uma ilha maior tende, em geral, a',
    ['sustentar maior riqueza de espécies','possuir sempre menos espécies','ser obrigatoriamente mais isolada','não receber imigrantes','não apresentar extinções'],
    'A',
    'Maior área permite populações maiores e maior diversidade de habitats.'
  ),

  Q('q139','Domingo','Revisão acumulativa',
    'Vicariância diferencia-se de dispersão porque na vicariância',
    ['uma barreira divide uma distribuição antes contínua','organismos atravessam uma barreira','não existe isolamento','a população cresce exponencialmente','ocorre apenas migração sazonal'],
    'A',
    'Na vicariância, a barreira aparece; na dispersão, os organismos se deslocam.'
  ),

  Q('q140','Domingo','Revisão acumulativa',
    'Uma síntese correta sobre energia e matéria em ecossistemas é',
    ['a energia flui e se dissipa, enquanto a matéria é reciclada','energia e matéria são recicladas integralmente','energia é reciclada e matéria se dissipa','ambas fluem sem perdas','ambas permanecem imóveis'],
    'A',
    'Energia apresenta fluxo; matéria participa de ciclos.'
  )

]
