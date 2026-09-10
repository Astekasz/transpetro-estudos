const letters = ['A', 'B', 'C', 'D', 'E']

function TQ(id, day, theme, lesson, statement, alternatives, correct, explanation) {
  return {
    id,
    day,
    theme,
    sourceType: 'Inédita • baseada na degravação',
    sourceLabel: `Degravação • ${lesson}`,
    statement,
    options: Object.fromEntries(letters.map((letter, index) => [letter, alternatives[index]])),
    correct,
    explanation
  }
}

export const transcriptQuestions = [
  TQ('q151','Segunda','Revisão + Ecologia','Teoria Geral do Direito Ambiental II',
    'Na ética ambiental, a concepção segundo a qual a natureza existe essencialmente para atender às necessidades humanas corresponde ao',
    ['ecocentrismo','antropocentrismo clássico','antropocentrismo moderado','biocentrismo','ecologismo profundo'],
    'B',
    'A degravação caracteriza o antropocentrismo clássico pela centralidade do ser humano e pela visão instrumental da natureza.'
  ),

  TQ('q152','Segunda','Revisão + Ecologia','Teoria Geral do Direito Ambiental II',
    'A visão predominante no ordenamento brasileiro, segundo a degravação, procura conciliar a centralidade humana com a proteção ecológica e é denominada',
    ['ecocentrismo absoluto','antropocentrismo clássico','antropocentrismo moderado ou alargado','biocentrismo integral','preservacionismo estrito'],
    'C',
    'O material apresenta o antropocentrismo moderado ou alargado como posição intermediária, incorporando a dimensão ecológica da dignidade da pessoa humana.'
  ),

  TQ('q153','Segunda','Revisão + Ecologia','Teoria Geral do Direito Ambiental II',
    'De acordo com a degravação, a ecologia profunda (deep ecology) está mais diretamente associada ao',
    ['antropocentrismo clássico','ecocentrismo','utilitarismo econômico','usuário-pagador','federalismo cooperativo'],
    'B',
    'A ecologia profunda protege as formas de vida por sua importância intrínseca e é relacionada ao ecocentrismo.'
  ),

  TQ('q154','Segunda','Revisão + Ecologia','Teoria Geral do Direito Ambiental III',
    'Na chamada tragédia dos bens comuns, a ausência de regras de uso, fiscalização e responsabilização tende a provocar',
    ['recuperação espontânea dos recursos','esgotamento e deterioração dos bens ambientais','aumento automático da biodiversidade','privatização obrigatória do bem','eliminação das externalidades'],
    'B',
    'A degravação explica que bens coletivos podem ser degradados quando o uso individual ocorre sem regras, fiscalização e consequências.'
  ),

  TQ('q155','Segunda','Revisão + Ecologia','Teoria Geral do Direito Ambiental III',
    'Segundo o conceito da Lei da Política Nacional do Meio Ambiente apresentado na degravação, meio ambiente é o conjunto de condições, leis, influências e interações de ordem',
    ['apenas biológica','econômica e tributária','física, química e biológica','exclusivamente cultural','somente física e geológica'],
    'C',
    'O conceito reproduzido da Lei 6.938/1981 abrange interações de ordem física, química e biológica que permitem, abrigam e regem a vida.'
  ),

  TQ('q156','Segunda','Revisão + Ecologia','Princípios do Direito Ambiental',
    'Em comparação com as regras tradicionais, os princípios jurídicos são apresentados na degravação como normas que',
    ['sempre funcionam em lógica de tudo ou nada','não admitem ponderação','podem ser aplicadas em diferentes graus conforme o caso concreto','não possuem relevância normativa','somente se aplicam quando inexistem leis'],
    'C',
    'O material destaca que princípios são mais flexíveis e podem incidir com maior ou menor intensidade conforme as circunstâncias.'
  ),

  TQ('q157','Segunda','Revisão + Ecologia','Princípios do Direito Ambiental III',
    'O desenvolvimento sustentável, conforme a formulação destacada na degravação a partir do Relatório Nosso Futuro Comum, busca atender às necessidades presentes sem',
    ['utilizar qualquer recurso natural','comprometer a possibilidade de as gerações futuras atenderem às próprias necessidades','permitir crescimento econômico','adotar políticas públicas','considerar a dimensão social'],
    'B',
    'A definição enfatiza a compatibilização das necessidades atuais com a preservação das possibilidades das gerações futuras.'
  ),

  TQ('q158','Segunda','Revisão + Ecologia','Princípios do Direito Ambiental V',
    'O princípio da solidariedade intergeracional vincula a geração presente ao dever de',
    ['maximizar o uso imediato dos recursos naturais','preservar condições ambientais também para as gerações futuras','impedir qualquer atividade econômica','transferir toda responsabilidade ao Estado','priorizar apenas interesses individuais'],
    'B',
    'A degravação relaciona o princípio ao dever de defender e preservar o meio ambiente para as presentes e futuras gerações.'
  ),

  TQ('q159','Segunda','Revisão + Ecologia','Princípios do Direito Ambiental IV',
    'O princípio da vedação do retrocesso ambiental busca impedir, em linhas gerais, que',
    ['a proteção ambiental já concretizada seja injustificadamente reduzida','novas medidas ambientais sejam criadas','o Judiciário examine normas ambientais','o Estado amplie políticas de proteção','sejam aplicados princípios constitucionais'],
    'A',
    'O material associa o princípio à ideia de não retorno da concretização e à proibição de redução insuficiente da proteção ambiental.'
  ),

  TQ('q160','Segunda','Revisão + Ecologia','Meio Ambiente na Constituição da República',
    'Na classificação das dimensões dos direitos fundamentais apresentada na degravação, o direito ao meio ambiente é exemplo típico de direito de',
    ['primeira dimensão, estritamente individual','segunda dimensão, exclusivamente trabalhista','terceira dimensão, de caráter difuso','quarta dimensão, exclusivamente digital','quinta dimensão, exclusivamente patrimonial'],
    'C',
    'A aula apresenta o meio ambiente como exemplo por excelência de direito difuso, ligado à terceira dimensão dos direitos fundamentais.'
  ),

  TQ('q161','Segunda','Revisão + Ecologia','Meio Ambiente na Constituição da República III',
    'O art. 225 da Constituição, conforme destacado na degravação, assegura a todos o direito ao meio ambiente ecologicamente equilibrado e impõe o dever de defendê-lo e preservá-lo ao',
    ['Poder Público apenas','Ministério Público apenas','Poder Público e à coletividade','Congresso Nacional apenas','Poder Judiciário apenas'],
    'C',
    'A redação estudada atribui o dever de defesa e preservação tanto ao Poder Público quanto à coletividade.'
  ),

  TQ('q162','Segunda','Revisão + Ecologia','Meio Ambiente na Constituição da República IV – Competências Ambientais',
    'As competências ambientais constitucionais podem ser classificadas, segundo a degravação, em',
    ['penais e civis apenas','materiais ou administrativas e legislativas','federais e privadas','tributárias e empresariais','judiciais e extrajudiciais apenas'],
    'B',
    'A aula diferencia competências materiais/administrativas, voltadas à implementação de políticas, das competências legislativas, voltadas à produção normativa.'
  ),

  TQ('q163','Segunda','Revisão + Ecologia','Meio Ambiente na Constituição da República IV – Competências Ambientais',
    'No federalismo cooperativo ecológico apresentado na degravação, a União atua predominantemente em matérias de interesse',
    ['local','regional','nacional ou geral','privado','municipal'],
    'C',
    'A aula usa o princípio da predominância do interesse: União — nacional/geral; Estados — regional; Municípios — local.'
  ),

  TQ('q164','Terça','Ecossistemas e biodiversidade','Ecologia',
    'Na hierarquia ecológica apresentada na degravação, indivíduos da mesma espécie reunidos no mesmo espaço e tempo formam uma',
    ['comunidade','população','biosfera','teia alimentar','biocenose multiespecífica'],
    'B',
    'População é o conjunto de indivíduos da mesma espécie que ocupam o mesmo local, espaço e tempo e interagem entre si.'
  ),

  TQ('q165','Terça','Ecossistemas e biodiversidade','Ecologia',
    'O conjunto de populações de espécies diferentes que vivem e interagem em uma mesma área constitui uma',
    ['população','comunidade biológica','biosfera','espécie','organela'],
    'B',
    'A degravação define comunidade biológica ou biocenose como o conjunto de populações de espécies diferentes que interagem.'
  ),

  TQ('q166','Terça','Ecossistemas e biodiversidade','Ecologia',
    'Em uma cadeia alimentar, os organismos autotróficos capazes de produzir matéria orgânica para sua própria alimentação ocupam o nível de',
    ['consumidores primários','decompositores','produtores','consumidores secundários','detritívoros'],
    'C',
    'A aula identifica os produtores como organismos autotróficos que produzem matéria orgânica.'
  ),

  TQ('q167','Terça','Ecossistemas e biodiversidade','Ecologia e biodiversidade',
    'A biodiversidade, conforme a degravação, compreende variedade em quais níveis?',
    ['somente espécies','genes, espécies e ecossistemas','apenas genes e indivíduos','somente comunidades','apenas ecossistemas terrestres'],
    'B',
    'O material destaca três níveis: diversidade genética, diversidade de espécies e diversidade de ecossistemas.'
  ),

  TQ('q168','Terça','Ecossistemas e biodiversidade','Ecologia e biodiversidade II',
    'A extinção de uma espécie é tratada na degravação como especialmente grave porque é um processo',
    ['sempre temporário','reversível por sucessão ecológica','irreversível','restrito a ambientes urbanos','sem efeito sobre outras espécies'],
    'C',
    'A aula enfatiza que, uma vez extinta uma espécie, suas adaptações e história evolutiva não podem ser recuperadas.'
  ),

  TQ('q169','Sexta','Conservação e serviços ambientais','Ecologia e biodiversidade II',
    'Serviços ecossistêmicos são definidos na degravação como',
    ['somente produtos comercializados pela floresta','benefícios diretos e indiretos oferecidos pela natureza aos seres humanos','apenas ações de fiscalização ambiental','somente processos de recuperação de áreas degradadas','benefícios exclusivamente econômicos da mineração'],
    'B',
    'O material define serviços ecossistêmicos como os benefícios diretos e indiretos que a natureza oferece aos seres humanos.'
  ),

  TQ('q170','Sexta','Conservação e serviços ambientais','Ecologia e biodiversidade II',
    'Entre as ações de conservação citadas na degravação, a recuperação de áreas degradadas pode envolver',
    ['reflorestamento, controle de erosão e reintrodução de espécies nativas','substituição obrigatória da vegetação nativa por exóticas','eliminação de corredores ecológicos','aumento deliberado da erosão','supressão de toda regeneração natural'],
    'A',
    'A aula cita restauração ecológica por técnicas como reflorestamento, controle de erosão e reintrodução de espécies nativas.'
  )
]
