/* =========================================================
   LIVRO FOLHEÁVEL
   Usa a biblioteca StPageFlip (js/vendor/page-flip.browser.js):
   a página dobra pela ponta, com sombra, como um livro de verdade.
   - Notebook/PC: duas páginas abertas lado a lado.
   - Celular: uma página por vez.
   - Dá para arrastar a ponta da página com o mouse ou o dedo.
   ========================================================= */
(() => {
  const $ = (id) => document.getElementById(id);
  const stage = $('stage'), ind = $('ind'), jump = $('jump');
  const btnPrev = $('prev'), btnNext = $('next'), btnSum = $('sum');

  const P = PAGINAS;
  const N = P.length;
  const RATIO = 1.38;              // altura / largura da página
  const PAG_SUMARIO = 2;
  const TEMPO_VIRAR = matchMedia('(prefers-reduced-motion: reduce)').matches ? 300 : 900;

  let flipbook = null;             // instância do StPageFlip
  let book = null;                 // elemento do livro
  let spread = false;              // true = livro aberto (duas páginas)
  let pw = 0, ph = 0;              // tamanho da página em px
  let atual = 0;                   // índice da página atual

  // pré-carrega as fotos para não travar na hora de virar
  PRODUTOS.forEach(p => { if (p.foto) { const img = new Image(); img.src = 'fotos/' + p.foto; } });

  // ---- calcula o tamanho da página para caber na tela ----
  function medir() {
    const W = stage.clientWidth, H = stage.clientHeight;
    const hp = Math.max(200, (H - 32) / RATIO);
    const sp = Math.min(hp, (W - 48) / 2);
    const nsp = sp >= 300;
    const npw = Math.floor(nsp ? sp : Math.min(hp, W - 24));
    // no celular a página cresce na altura para preencher a tela
    const nph = Math.round(nsp ? npw * RATIO : Math.min(H - 24, npw * 1.8));
    return { nsp, npw, nph };
  }

  // ---- monta (ou remonta) o livro ----
  function montar() {
    const { nsp, npw, nph } = medir();
    // ignora pequenas mudanças (ex.: barra do navegador do celular aparecendo)
    if (flipbook && nsp === spread && Math.abs(npw - pw) < 4 && Math.abs(nph - ph) < 4) return;
    if (flipbook && flipbook.getState() !== 'read') { setTimeout(montar, 300); return; }

    if (flipbook) {
      atual = flipbook.getCurrentPageIndex();
      try { flipbook.destroy(); } catch (e) { /* segue e limpa abaixo */ }
      flipbook = null;
    }
    stage.replaceChildren();          // garante que não sobra nenhum livro antigo
    spread = nsp; pw = npw; ph = nph;

    book = document.createElement('div');
    book.id = 'book';
    book.style.width = (spread ? pw * 2 : pw) + 'px';
    book.style.height = ph + 'px';
    book.style.fontSize = (spread ? pw / 26 : Math.min(pw / 24, ph / RATIO / 26)) + 'px';
    stage.appendChild(book);

    const paginas = P.map((html, i) => {
      const el = document.createElement('div');
      const capa = i === 0 || i === N - 1;
      el.className = 'page' + (capa ? ' page-capa' : '');
      el.dataset.density = capa ? 'hard' : 'soft';
      el.innerHTML = html;
      book.appendChild(el);
      return el;
    });

    flipbook = new St.PageFlip(book, {
      size: 'stretch',
      autoSize: false,
      width: pw,
      height: ph,
      minWidth: spread ? 100 : pw,   // abaixo de 2×minWidth vira modo de uma página
      maxWidth: pw,
      minHeight: 100,
      maxHeight: ph,
      showCover: true,
      usePortrait: true,
      flippingTime: TEMPO_VIRAR,
      maxShadowOpacity: 0.45,
      drawShadow: true,
      showPageCorners: true,
      mobileScrollSupport: false,
      swipeDistance: 30,
      startPage: atual,
    });
    flipbook.loadFromHTML(paginas);

    flipbook.on('flip', (e) => { atual = e.data; atualizar(); });
    flipbook.on('changeOrientation', () => atualizar());
    flipbook.on('init', () => atualizar());
    flipbook.on('changeState', (e) => { if (e.data === 'read') limparCopias(paginas); });

    jump.max = spread ? N / 2 : N - 1;
    atualizar();
  }

  // ---- limpeza ----
  // durante a virada a biblioteca cria cópias temporárias das páginas.
  // se a virada é interrompida (clique rápido, arrastar e soltar), algumas
  // cópias podem ficar na tela e aparecem como textos sobrepostos.
  function limparCopias(paginas) {
    if (!flipbook) return;
    flipbook.getPageCollection().getPages().forEach(p => p.hideTemporaryCopy());
    book.querySelectorAll('.stf__block > .page').forEach(el => {
      if (!paginas.includes(el)) el.remove();
    });
  }

  // ---- posição atual ----
  // no livro aberto: folha 0 = capa, 1 = págs 2–3, …, N/2 = contracapa
  const folhaDe = (i) => (spread ? Math.floor((i + 1) / 2) : i);
  const paginaDaFolha = (f) => (spread ? (f === 0 ? 0 : 2 * f - 1) : f);

  function atualizar() {
    const f = folhaDe(atual), ultima = spread ? N / 2 : N - 1;
    jump.value = f;
    ind.textContent = spread
      ? (f === 0 ? 'Capa' : f === ultima ? 'Contracapa' : `Páginas ${2 * f}–${2 * f + 1} de ${N}`)
      : `Página ${atual + 1} de ${N}`;
    btnPrev.disabled = f === 0;
    btnNext.disabled = f === ultima;
    centralizar(f);
  }

  // capa e contracapa ficam centralizadas no livro aberto
  function centralizar(f) {
    if (!book) return;
    const ultima = N / 2;
    book.style.transform = spread
      ? (f === 0 ? `translateX(${-pw / 2}px)` : f === ultima ? `translateX(${pw / 2}px)` : 'none')
      : 'none';
  }

  // ---- ir para uma página ----
  function irPara(i) {
    if (!flipbook || flipbook.getState() !== 'read') return;
    i = Math.max(0, Math.min(N - 1, i));
    if (folhaDe(i) === folhaDe(atual)) return;
    centralizar(folhaDe(i));        // o livro desliza junto com a página
    flipbook.flip(i);
  }
  const proxima = () => irPara(paginaDaFolha(folhaDe(atual) + 1));
  const anterior = () => irPara(paginaDaFolha(folhaDe(atual) - 1));

  // ---- controles ----
  btnPrev.onclick = anterior;
  btnNext.onclick = proxima;
  btnSum.onclick = () => irPara(PAG_SUMARIO);
  jump.oninput = () => irPara(paginaDaFolha(+jump.value));

  document.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowRight') proxima();
    else if (e.key === 'ArrowLeft') anterior();
  });

  // links do sumário
  stage.addEventListener('click', (e) => {
    const a = e.target.closest('a[data-p]');
    if (!a) return;
    e.preventDefault();
    irPara(+a.dataset.p);
  });

  // remonta só quando a tela muda de tamanho de verdade
  let espera = 0;
  new ResizeObserver(() => { clearTimeout(espera); espera = setTimeout(montar, 150); }).observe(stage);
  montar();
})();
