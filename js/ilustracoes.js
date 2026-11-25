/* =========================================================
   Ilustrações em SVG de cada produto.
   Aparecem só quando a foto do produto não é encontrada.
   ========================================================= */
const ILUSTRACOES = (() => {
  const T = '#13bfc3', N = '#0d2a6e', B = '#1a5fd0';

  // ---- peças reutilizáveis ----
  const tube = (d, w = 9) =>
    `<path d="${d}" fill="none" stroke="#b9dbe8" stroke-width="${w}" stroke-linecap="round"/>` +
    `<path d="${d}" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" opacity=".8"/>`;
  const shadow = (cx, cy, rx) =>
    `<ellipse cx="${cx}" cy="${cy}" rx="${rx}" ry="${rx * .09}" fill="#0d2a6e" opacity=".12"/>`;
  const ridges = (x, y, h, n, gap) =>
    Array.from({ length: n }, (_, i) => `<rect x="${x + i * gap}" y="${y}" width="2" height="${h}" fill="#fff" opacity=".55"/>`).join('');
  const port = (x, y, w, h) =>
    `<rect x="${x}" y="${y}" width="${w}" height="${h}" rx="6" fill="#eaf6fa" stroke="#8fb8c9" stroke-width="2"/>`;
  const svg = (inner) => `<svg viewBox="0 0 400 260" preserveAspectRatio="xMidYMid meet">${inner}</svg>`;

  // ---- Polifix ----
  const polifix = svg(`${shadow(205, 238, 170)}
${tube('M88 130 H178')}${tube('M205 124 C240 124 245 80 280 80 H332')}${tube('M205 136 C240 136 245 180 280 180 H332')}
<rect x="28" y="116" width="62" height="28" rx="6" fill="${B}"/>${ridges(36, 118, 24, 6, 8)}<rect x="18" y="124" width="14" height="12" rx="3" fill="#7fa9e6"/>
<path d="M172 118 L210 112 L214 148 L172 142 Z" fill="#e8f4f8" stroke="#8fb8c9" stroke-width="2" stroke-linejoin="round"/>
${[80, 180].map(y => `<g><rect x="290" y="${y - 16}" width="22" height="32" rx="5" fill="#fff" stroke="#9cb3c8" stroke-width="2"/><path d="M294 ${y - 10} L308 ${y} L294 ${y + 10}" fill="none" stroke="${N}" stroke-width="3" stroke-linejoin="round"/>
<rect x="330" y="${y - 13}" width="30" height="26" rx="5" fill="#eaf6fa" stroke="#8fb8c9" stroke-width="2"/><rect x="358" y="${y - 15}" width="24" height="30" rx="6" fill="${T}"/>${ridges(363, y - 13, 26, 3, 6)}</g>`).join('')}`);

  // ---- Luva ----
  const glove = `<g fill="#f4e7c9" stroke="#d6bf91" stroke-width="2.5" stroke-linejoin="round">
<rect x="132" y="32" width="26" height="100" rx="13" transform="rotate(-8 145 130)"/><rect x="161" y="18" width="26" height="110" rx="13"/><rect x="190" y="26" width="26" height="104" rx="13" transform="rotate(5 203 130)"/><rect x="218" y="52" width="23" height="84" rx="11.5" transform="rotate(12 229 136)"/>
<rect x="88" y="118" width="26" height="86" rx="13" transform="rotate(-48 101 190)"/>
<rect x="128" y="102" width="112" height="106" rx="34"/><rect x="142" y="196" width="86" height="48" rx="8"/></g>
<path d="M150 214 H220" stroke="#e3cfa4" stroke-width="2"/>`;
  const luva = svg(`${shadow(210, 246, 170)}
<g transform="translate(232 54)"><rect width="140" height="188" rx="8" fill="#fff" stroke="#c4d3e5" stroke-width="2"/><rect width="140" height="46" rx="8" fill="${N}"/><rect y="38" width="140" height="8" fill="${N}"/>
<rect x="14" y="16" width="70" height="8" rx="4" fill="#fff" opacity=".9"/><rect x="14" y="62" width="90" height="7" rx="3.5" fill="#c9d7ea"/><rect x="14" y="76" width="64" height="7" rx="3.5" fill="#c9d7ea"/>
<circle cx="104" cy="140" r="26" fill="${T}"/><text x="104" y="148" text-anchor="middle" font-family="Montserrat,sans-serif" font-weight="800" font-size="22" fill="#fff">7,5</text></g>
${glove}`);

  // ---- Jelco ----
  const cateter = (y, c, lab) => `<g>${shadow(200, y + 34, 165)}
<path d="M28 ${y} L48 ${y - 3} H160 V${y + 3} H48 Z" fill="#cfd8df"/><rect x="48" y="${y - 5}" width="114" height="10" rx="3" fill="#eef6fa" stroke="#a9c3d2" stroke-width="1.5"/>
<path d="M160 ${y - 9} L178 ${y - 16} H214 V${y + 16} H178 L160 ${y + 9} Z" fill="${c}"/><rect x="186" y="${y - 16}" width="3" height="32" fill="#fff" opacity=".45"/>
<rect x="214" y="${y - 14}" width="86" height="28" rx="5" fill="#e6f3f8" fill-opacity=".85" stroke="#9fbfcf" stroke-width="2"/><rect x="214" y="${y - 2}" width="86" height="4" fill="#b9c6cf"/>
<rect x="300" y="${y - 11}" width="22" height="22" rx="4" fill="#fff" stroke="#9fbfcf" stroke-width="2"/><rect x="322" y="${y - 8}" width="10" height="16" rx="3" fill="${c}"/>
<text x="350" y="${y + 9}" font-family="Montserrat,sans-serif" font-weight="800" font-size="26" fill="${N}">${lab}</text></g>`;
  const jelco = svg(`${cateter(84, '#ec5f9e', '20G')}${cateter(172, '#2f7be6', '22G')}`);

  // ---- Torneirinha ----
  const torneirinha = svg(`${shadow(200, 246, 150)}
${port(78, 122, 110, 32)}${port(212, 122, 110, 32)}${port(184, 150, 32, 74)}
<rect x="52" y="118" width="32" height="40" rx="7" fill="${B}"/>${ridges(58, 120, 36, 3, 9)}<rect x="316" y="118" width="32" height="40" rx="7" fill="#fff" stroke="#8fb8c9" stroke-width="2"/><rect x="180" y="218" width="40" height="24" rx="7" fill="#fff" stroke="#8fb8c9" stroke-width="2"/>
<circle cx="200" cy="138" r="38" fill="#f2fafd" stroke="#8fb8c9" stroke-width="2.5"/>
<g stroke="${B}" stroke-width="20" stroke-linecap="round"><path d="M200 138 V58"/><path d="M200 138 H128"/><path d="M200 138 H272"/></g>
<circle cx="200" cy="138" r="20" fill="${N}"/><circle cx="200" cy="138" r="7" fill="${T}"/><path d="M190 70 L200 52 L210 70 Z" fill="#fff"/>`);

  // ---- Eletrodo ----
  const elec = (x, y) => `<g>${shadow(x, y + 70, 62)}<circle cx="${x}" cy="${y}" r="60" fill="#fff" stroke="#c9d8e6" stroke-width="2.5"/><circle cx="${x}" cy="${y}" r="52" fill="none" stroke="#e5eef5" stroke-width="2" stroke-dasharray="3 5"/>
<circle cx="${x}" cy="${y}" r="26" fill="#bfe8ef"/><circle cx="${x}" cy="${y}" r="13" fill="#9aa6b1"/><circle cx="${x}" cy="${y}" r="8" fill="#d7dde3"/><circle cx="${x - 3}" cy="${y - 3}" r="3" fill="#fff"/></g>`;
  const eletrodo = svg(`
<rect x="46" y="70" width="308" height="140" rx="14" fill="${N}" opacity=".9"/><path d="M60 140 H120 L132 112 L146 170 L158 140 H340" fill="none" stroke="${T}" stroke-width="3" opacity=".7"/>
${elec(124, 140)}${elec(276, 140)}`);

  // ---- Equipo ----
  const equipo = svg(`${shadow(210, 248, 175)}
<path d="M62 18 L70 6 L78 18 V54 H62 Z" fill="#fff" stroke="#8fb8c9" stroke-width="2"/><rect x="56" y="50" width="28" height="10" rx="3" fill="${B}"/>
<rect x="42" y="58" width="56" height="96" rx="14" fill="#e6f3f8" fill-opacity=".9" stroke="#8fb8c9" stroke-width="2.5"/><path d="M44 128 H96 V140 a12 12 0 0 1 -12 12 H56 a12 12 0 0 1 -12 -12 Z" fill="#a9e3ea"/>
<path d="M70 82 q-6 9 0 13 q6 -4 0 -13" fill="${T}"/>
${tube('M70 154 V196 C70 226 96 230 126 230 H214 C256 230 252 150 292 150 H332', 8)}
<g transform="translate(148 214)"><rect width="50" height="32" rx="6" fill="#fff" stroke="#9cb3c8" stroke-width="2"/><circle cx="25" cy="10" r="8" fill="${B}"/>${ridges(19, 6, 8, 3, 5)}</g>
<rect x="282" y="140" width="20" height="20" rx="4" fill="#eaf6fa" stroke="#8fb8c9" stroke-width="2"/><path d="M292 140 V112" stroke="#b9dbe8" stroke-width="10" stroke-linecap="round"/><rect x="282" y="98" width="20" height="18" rx="5" fill="${T}"/>
<rect x="330" y="137" width="32" height="26" rx="5" fill="${B}"/>${ridges(336, 139, 22, 3, 8)}<rect x="360" y="141" width="18" height="18" rx="4" fill="#fff" stroke="#8fb8c9" stroke-width="2"/>`);

  // ---- Linha de ECG da capa ----
  const ecgCapa = `<svg class="ecg" viewBox="0 0 400 60" preserveAspectRatio="none"><path d="M0 34 H130 L146 12 L160 52 L172 34 H230 C246 34 250 24 262 24 S278 34 290 34 H400" fill="none" stroke="${T}" stroke-width="3" vector-effect="non-scaling-stroke"/></svg>`;

  return { polifix, luva, jelco, torneirinha, eletrodo, equipo, ecgCapa };
})();
