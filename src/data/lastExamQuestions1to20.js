const Q = (number, section, statement, options, correct) => ({
  id: `tp2023-${number}`,
  number,
  section,
  statement,
  options,
  correct,
  sourceLabel: `Transpetro 2023 • Prova 3 • Questão ${number}`
})

export const lastExamQuestions1to20 = [
  Q(1, 'Língua Portuguesa',
    'O fragmento de abertura da crônica “Estou me vendo debaixo de uma árvore, lendo a pequena história da literatura brasileira.” (parágrafo 1) faz referência a uma',
    { A: 'previsão', B: 'fantasia', C: 'esperança', D: 'expectativa', E: 'reminiscência' },
    'E'
  ),
  Q(2, 'Língua Portuguesa',
    'No texto, as palavras que marcam o sentimento de insegurança vivenciado pela narradora ao conversar com seu pai são:',
    {
      A: 'confissão (parágrafo 7) e andar (parágrafo 8)',
      B: 'rodeios (parágrafo 4) e gaguejar (parágrafo 6)',
      C: 'cabecinha (parágrafo 7) e mudar (parágrafo 8)',
      D: 'sepultura (parágrafo 3) e renegar (parágrafo 7)',
      E: 'severidade (parágrafo 7) e esquecer (parágrafo 5)'
    },
    'B'
  ),
  Q(3, 'Língua Portuguesa',
    'De acordo com o texto, na opinião do pai, a filha deveria',
    {
      A: 'aprender a língua da avó.',
      B: 'valorizar a língua materna.',
      C: 'escrever em idiomas diversos.',
      D: 'ler outros poemas de Olavo Bilac.',
      E: 'estudar história da literatura brasileira.'
    },
    'B'
  ),
  Q(4, 'Língua Portuguesa',
    'Ao ler os versos de Olavo Bilac, o “quase” susto da narradora, mencionado no parágrafo 2, foi motivado pela',
    {
      A: 'possibilidade de seus escritos não serem conhecidos.',
      B: 'falta de conhecimento sobre a localização do Lácio.',
      C: 'necessidade de aprender uma língua diferente.',
      D: 'surpresa com a postura pessimista do poeta.',
      E: 'abordagem da temática da morte.'
    },
    'A'
  ),
  Q(5, 'Língua Portuguesa',
    'O emprego do acento grave em “soneto à língua portuguesa” (parágrafo 2) explica-se a partir do entendimento de que Olavo Bilac escreveu um soneto',
    {
      A: 'em língua portuguesa',
      B: 'com a língua portuguesa',
      C: 'para a língua portuguesa',
      D: 'sobre a língua portuguesa',
      E: 'por causa da língua portuguesa'
    },
    'C'
  ),
  Q(6, 'Língua Portuguesa',
    'A palavra que funciona como um mecanismo de coesão textual, retomando um antecedente, em:',
    {
      A: '“parei quase num susto depois que li os primeiros versos”. (parágrafo 2)',
      B: '“Não esquecer que a minha avó, Pedrina Perucchi, era italiana”. (parágrafo 5)',
      C: '“ficou olhando a borboleta que entrou na varanda” (parágrafo 7)',
      D: '“Sempre que meu pai queria mudar de assunto ele mudava de lugar”. (parágrafo 8)',
      E: '“quando me avisaram lá do pequeno hotel em Jacareí que ele tinha morrido”. (parágrafo 9)'
    },
    'C'
  ),
  Q(7, 'Língua Portuguesa',
    'A frase em que as vírgulas estão empregadas com a mesma função que em “Não esquecer que a minha avó, Pedrina Perucchi, era italiana” (parágrafo 5) é:',
    {
      A: 'Mude de lugar, meu pai, porque a morte vai chegar.',
      B: 'A filha, preocupada e triste, questionava a própria língua materna.',
      C: 'A língua portuguesa, embora inculta, constrói belos textos literários.',
      D: 'Os poemas, textos de uma beleza sem igual, encantam seus leitores.',
      E: 'Colocou os óculos e, caminhando pela sala, revelou a beleza do poema.'
    },
    'D'
  ),
  Q(8, 'Língua Portuguesa',
    'Considerando-se a correlação adequada entre tempos e modos verbais, a alternativa que, respeitando a norma-padrão, completa o período iniciado pelo trecho “A autora também teria sido lida se...” é',
    {
      A: 'escrever seus contos em outra língua.',
      B: 'escrevera seus contos em outra língua.',
      C: 'tiver escrito seus contos em outra língua.',
      D: 'teria escrito seus contos em outra língua.',
      E: 'tivesse escrito seus contos em outra língua.'
    },
    'E'
  ),
  Q(9, 'Língua Portuguesa',
    'No parágrafo 6, “nossa língua é sepultura mesmo, tudo o que a gente fizer vai para debaixo da terra, desaparece!”, o segmento em destaque pode articular-se com o segmento anterior, sem alteração do sentido original, empregando-se o conector',
    { A: 'quando', B: 'portanto', C: 'enquanto', D: 'embora', E: 'ou' },
    'B'
  ),
  Q(10, 'Língua Portuguesa',
    'Em “O soneto é muito bonito, disse me encarando com severidade” (parágrafo 7), a palavra que pode substituir severidade, sem alteração no sentido da frase, é',
    { A: 'firmeza', B: 'rispidez', C: 'discrição', D: 'desgosto', E: 'incompreensão' },
    'A'
  ),
  Q(11, 'Língua Inglesa',
    'The main idea of the text is to',
    {
      A: 'disapprove space technology.',
      B: 'relate space technology to diseases.',
      C: 'figure out the costs of space technology.',
      D: 'list potential dangers of space technology.',
      E: 'describe space technology improvements.'
    },
    'E'
  ),
  Q(12, 'Língua Inglesa',
    'In the fragment in the first paragraph of the text “However, others are already delivering practical results”, the word However can be associated with the idea of',
    { A: 'time', B: 'condition', C: 'emphasis', D: 'opposition', E: 'accumulation' },
    'D'
  ),
  Q(13, 'Língua Inglesa',
    'From the fragment in the second paragraph of the text “connectivity that can reach into situations where terrestrial technologies struggle to deliver”, it can be concluded that terrestrial technologies can present data problems related to their',
    { A: 'price', B: 'safety', C: 'choice', D: 'marketing', E: 'transmission' },
    'E'
  ),
  Q(14, 'Língua Inglesa',
    'From the fragment in the second paragraph of the text “Right now, the satellite supplier market is booming, driving down the cost of access to satellites”, one can infer that the more access to the satellite supplier market is feasible,',
    {
      A: 'the lower its price will be.',
      B: 'the higher its price will be.',
      C: 'the better its quality will be.',
      D: 'the poorer its quality will be.',
      E: 'the more reliable its quality will be.'
    },
    'A'
  ),
  Q(15, 'Língua Inglesa',
    'The fragment in the third paragraph of the text “The Satellites for Digitalization of Railways (SODOR) project will provide low latency” means that',
    {
      A: 'low volume of data will be conveyed within hours.',
      B: 'low volume of data will be interrupted for a few minutes.',
      C: 'low volume of data will be communicated within minutes.',
      D: 'high volume of data will be transmitted with minimal delay.',
      E: 'high volume of data will be transferred after a few minutes.'
    },
    'D'
  ),
  Q(16, 'Língua Inglesa',
    'In the fragment in the fourth paragraph of the text “a sustainable future for road vehicles. Right now, the transport sector contributes around 14% of the UK’s greenhouse gas emissions, of which 91% is from road vehicles”, the word which refers to',
    {
      A: 'road vehicles',
      B: 'transport sector',
      C: 'United Kingdom',
      D: 'sustainable future',
      E: 'greenhouse gas emissions'
    },
    'E'
  ),
  Q(17, 'Língua Inglesa',
    'From the fifth paragraph of the text, one can infer that models for wind and solar production can provide sources of',
    {
      A: 'unreliable power',
      B: 'intermittent energy',
      C: 'constant power flow',
      D: 'scarce energy sources',
      E: 'dangerous power sources'
    },
    'C'
  ),
  Q(18, 'Língua Inglesa',
    'In the fragment in the sixth paragraph of the text “Satellite communications will also be pivotal”, the word pivotal can be replaced, with no change in meaning, by',
    { A: 'tricky', B: 'erratic', C: 'essential', D: 'haphazard', E: 'problematic' },
    'C'
  ),
  Q(19, 'Língua Inglesa',
    'From the seventh paragraph of the text, one can infer that automated driving will have the benefits of',
    {
      A: 'human drivers',
      B: 'space technology',
      C: 'terrestrial connectivity',
      D: 'traffic controlled by people',
      E: '20th century designed cars'
    },
    'B'
  ),
  Q(20, 'Língua Inglesa',
    'In the eighth paragraph of the text, the author states that, for the last 40 years, the company where he works has been',
    {
      A: 'embedded in antipollution laws.',
      B: 'dedicated to space travel medicine.',
      C: 'involved with cutting-edge space industry.',
      D: 'concerned with the Earth’s polar ice caps.',
      E: 'engaged in antinuclear weapon campaigns.'
    },
    'C'
  )
]
