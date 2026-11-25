/* =========================================================
   MONTAGEM DAS PÁGINAS
   Gera o HTML de cada página a partir de produtos.js.
   Números de página e sumário são calculados sozinhos.
   ========================================================= */
const PAGINAS = (() => {
  const PRIMEIRA_PAG_PRODUTO = 3;                       // capa, apresentação, sumário
  const PAG_PEDIDO  = PRIMEIRA_PAG_PRODUTO + PRODUTOS.length;
  const PAG_CONTATO = PAG_PEDIDO + 1;

  // ---- peças comuns ----
  const rodape = (indice, rotulo) =>
    `<div class="pfoot"><b>MCKMED</b><span>${rotulo}</span><span>${indice + 1}</span></div>`;

  const opcaoHTML = (op) => typeof op === 'string'
    ? `<span class="var">${op}</span>`
    : `<span class="var"><i style="background:${op.cor}"></i>${op.texto}</span>`;

  const linkSumario = (indice, texto) =>
    `<li><a href="#" data-p="${indice}"><span class="n">${indice + 1}</span>${texto}<span class="c">pág. ${indice + 1}</span></a></li>`;

  // ---- capa ----
  const capa = `<div class="pg cover">
    <img class="logo" src="logo.jpg" alt="MCKMED">${ILUSTRACOES.ecgCapa}
    <h1>Catálogo de produtos</h1>
    <p>Materiais hospitalares descartáveis</p>
    <span class="ed">Edição 2026</span>
  </div>`;

  // ---- apresentação ----
  const totalOpcoes = PRODUTOS.reduce((soma, p) => soma + p.opcoes.length, 0);
  const apresentacao = `<div class="pg">
    <p class="kick">Apresentação</p>
    <p class="big">Comércio de produtos hospitalares e médicos</p>
    <p class="body">A MCKMED reúne os materiais de uso diário em hospitais, clínicas e serviços de saúde: infusão, acesso venoso, monitorização e proteção.</p>
    <p class="body">Cada página traz o produto, sua especificação e as opções disponíveis, para facilitar a escolha e o pedido.</p>
    <div class="stats">
      <div><b>${PRODUTOS.length}</b><span>linhas de produtos</span></div>
      <div><b>${totalOpcoes}</b><span>opções entre tamanhos, calibres e conexões</span></div>
      <div><b>${CATEGORIAS.length}</b><span>áreas de uso</span></div>
    </div>
    <div class="band"><b>Qualidade, confiança</b> e saúde em cada detalhe.</div>
    ${rodape(1, 'Apresentação')}
  </div>`;

  // ---- sumário ----
  const grupos = CATEGORIAS.map(cat => {
    const itens = PRODUTOS
      .map((p, i) => ({ p, indice: PRIMEIRA_PAG_PRODUTO + i }))
      .filter(({ p }) => p.categoria === cat)
      .map(({ p, indice }) => linkSumario(indice, p.nome))
      .join('');
    return `<p class="grp">${cat}</p><ul class="toc">${itens}</ul>`;
  }).join('');
  const sumario = `<div class="pg">
    <p class="kick">Sumário</p>
    <p class="big">Nossos produtos</p>
    ${grupos}
    <p class="grp">Informações</p>
    <ul class="toc">${linkSumario(PAG_PEDIDO, 'Como fazer seu pedido')}${linkSumario(PAG_CONTATO, 'Contato')}</ul>
    ${rodape(2, 'Sumário')}
  </div>`;

  // ---- página de produto ----
  const paginaProduto = (p, indice) => `<div class="pg">
    <div class="ill">
      <span class="cat">${p.categoria}</span>
      ${ILUSTRACOES[p.desenho] || ''}
      ${p.foto ? `<img class="foto" src="fotos/${p.foto}" alt="${p.titulo}" onerror="this.remove()">` : ''}
    </div>
    <h2>${p.titulo}</h2>
    <p class="lede">${p.descricao}</p>
    <ul class="spec">${p.especificacoes.map(s => `<li>${s}</li>`).join('')}</ul>
    ${p.opcoes.length ? `<p class="vl">${p.rotuloOpcoes}</p><div class="vars">${p.opcoes.map(opcaoHTML).join('')}</div>` : ''}
    ${rodape(indice, p.categoria)}
  </div>`;

  // ---- como fazer o pedido ----
  const passos = [
    ['Escolha os produtos', 'Use o sumário para encontrar o item, o tamanho, o calibre ou a conexão.'],
    ['Informe as quantidades', 'Luvas são vendidas por caixa; os demais itens, por unidade.'],
    ['Receba a proposta', 'Enviamos preço, prazo de entrega e condições de pagamento.'],
    ['Confirme e receba', 'Após a confirmação, o pedido segue para separação e entrega.'],
  ];
  const pedido = `<div class="pg">
    <p class="kick">Pedidos</p>
    <p class="big">Como fazer seu pedido</p>
    <ol class="steps">${passos.map(([t, d], i) => `<li><b>${i + 1}</b><div><strong>${t}</strong>${d}</div></li>`).join('')}</ol>
    <div class="band">Dúvida sobre qual opção usar? <b>Fale com a nossa equipe</b> antes de fechar o pedido.</div>
    ${rodape(PAG_PEDIDO, 'Pedidos')}
  </div>`;

  // ---- contato ----
  const contato = `<div class="pg">
    <p class="kick">Contato</p>
    <p class="big">Solicite seu orçamento</p>
    <p class="body">Envie a lista de produtos e quantidades pelo canal que preferir.</p>
    <div class="contact">
      <div><span>WhatsApp</span><strong>${CONTATO.whatsapp}</strong></div>
      <div><span>E-mail</span><strong>${CONTATO.email}</strong></div>
      <div><span>Atendimento</span><strong>${CONTATO.atendimento}</strong></div>
      <div><span>Instagram</span><strong>${CONTATO.instagram}</strong></div>
    </div>
    ${rodape(PAG_CONTATO, 'Contato')}
  </div>`;

  // ---- contracapa ----
  const contracapa = `<div class="pg cover backc">
    <img class="logo" src="logo.jpg" alt="MCKMED">
    <p class="tag">Qualidade, confiança<br>e saúde em cada detalhe.</p>
    ${ILUSTRACOES.ecgCapa}
  </div>`;

  const paginas = [
    capa,
    apresentacao,
    sumario,
    ...PRODUTOS.map((p, i) => paginaProduto(p, PRIMEIRA_PAG_PRODUTO + i)),
    pedido,
    contato,
  ];
  // no modo livro aberto o total precisa ser par: completa com uma página em branco
  if ((paginas.length + 1) % 2) paginas.push('<div class="pg"></div>');
  paginas.push(contracapa);
  return paginas;
})();
