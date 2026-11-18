// Genera las imágenes del perfil de GitHub (carpeta arte/).
//
// Uso, desde la raíz del repositorio:
//   node herramientas/generar.js            -> escribe en arte/
//   node herramientas/generar.js <carpeta>  -> escribe en otra carpeta
//
// Solo necesita Node.js, sin dependencias. Los textos están en las secciones
// "Ficha de jugador" y "Tarjetas de proyecto", al final del archivo. La tarjeta
// de racha de contribuciones no se genera aquí: es una imagen externa que
// enlaza README.md.
const fs = require('fs');
const path = require('path');
const outDir = process.argv[2] || path.join(__dirname, '..', 'arte');
fs.mkdirSync(outDir, { recursive: true });

const C = {
  night: '#150f2e', slot: '#1f1744', indigo: '#1b1340', far: '#33246b', purple: '#5b45a6',
  magenta: '#b8407f', orange: '#f39c3d', yellow: '#ffd166', cream: '#f1e6c4', dark: '#0b0819',
  green: '#57d6a0', greenDk: '#2f8f6e', moon: '#e9dfae', moonDk: '#b8a874',
};
const W = 840;

// ---------- Fuente de píxeles 5x7 ----------
const F = {};
const def = (ch, t, rows, extra) => { F[ch] = { t, rows: rows.split('/'), extra }; };
def('A', 0, '.###./#...#/#...#/#####/#...#/#...#/#...#');
def('B', 0, '####./#...#/#...#/####./#...#/#...#/####.');
def('C', 0, '.###./#...#/#..../#..../#..../#...#/.###.');
def('D', 0, '####./#...#/#...#/#...#/#...#/#...#/####.');
def('E', 0, '#####/#..../#..../####./#..../#..../#####');
def('F', 0, '#####/#..../#..../####./#..../#..../#....');
def('G', 0, '.###./#...#/#..../#.###/#...#/#...#/.###.');
def('H', 0, '#...#/#...#/#...#/#####/#...#/#...#/#...#');
def('I', 0, '###/.#./.#./.#./.#./.#./###');
def('J', 0, '..###/...#./...#./...#./...#./#..#./.##..');
def('K', 0, '#...#/#..#./#.#../##.../#.#../#..#./#...#');
def('L', 0, '#..../#..../#..../#..../#..../#..../#####');
def('M', 0, '#...#/##.##/#.#.#/#.#.#/#...#/#...#/#...#');
def('N', 0, '#...#/##..#/#.#.#/#..##/#...#/#...#/#...#');
def('O', 0, '.###./#...#/#...#/#...#/#...#/#...#/.###.');
def('P', 0, '####./#...#/#...#/####./#..../#..../#....');
def('Q', 0, '.###./#...#/#...#/#...#/#.#.#/#..#./.##.#');
def('R', 0, '####./#...#/#...#/####./#.#../#..#./#...#');
def('S', 0, '.####/#..../#..../.###./....#/....#/####.');
def('T', 0, '#####/..#../..#../..#../..#../..#../..#..');
def('U', 0, '#...#/#...#/#...#/#...#/#...#/#...#/.###.');
def('V', 0, '#...#/#...#/#...#/.#.#./.#.#./.#.#./..#..');
def('W', 0, '#...#/#...#/#...#/#.#.#/#.#.#/##.##/#...#');
def('X', 0, '#...#/#...#/.#.#./..#../.#.#./#...#/#...#');
def('Y', 0, '#...#/#...#/.#.#./..#../..#../..#../..#..');
def('Z', 0, '#####/....#/...#./..#../.#.../#..../#####');
def('0', 0, '.###./#...#/#..##/#.#.#/##..#/#...#/.###.');
def('1', 0, '..#../.##../..#../..#../..#../..#../.###.');
def('2', 0, '.###./#...#/....#/...#./..#../.#.../#####');
def('3', 0, '####./....#/....#/.###./....#/....#/####.');
def('4', 0, '...#./..##./.#.#./#..#./#####/...#./...#.');
def('5', 0, '#####/#..../####./....#/....#/#...#/.###.');
def('6', 0, '.###./#..../#..../####./#...#/#...#/.###.');
def('7', 0, '#####/....#/...#./..#../..#../..#../..#..');
def('8', 0, '.###./#...#/#...#/.###./#...#/#...#/.###.');
def('9', 0, '.###./#...#/#...#/.####/....#/....#/.###.');
def('a', 2, '.###./....#/.####/#...#/.####');
def('b', 0, '#..../#..../#.##./##..#/#...#/#...#/####.');
def('c', 2, '.###./#..../#..../#...#/.###.');
def('d', 0, '....#/....#/.##.#/#..##/#...#/#...#/.####');
def('e', 2, '.###./#...#/#####/#..../.###.');
def('f', 0, '..##/.#../.#../###./.#../.#../.#..');
def('g', 2, '.####/#...#/#...#/#...#/.####/....#/.###.');
def('h', 0, '#..../#..../#.##./##..#/#...#/#...#/#...#');
def('i', 0, '#/./#/#/#/#/#');
def('j', 0, '..#/.../..#/..#/..#/..#/..#/..#/##.');
def('k', 0, '#.../#.../#..#/#.#./##../#.#./#..#');
def('l', 0, '#./#./#./#./#./#./.#');
def('m', 2, '##.#./#.#.#/#.#.#/#.#.#/#.#.#');
def('n', 2, '#.##./##..#/#...#/#...#/#...#');
def('o', 2, '.###./#...#/#...#/#...#/.###.');
def('p', 2, '#.##./##..#/#...#/#...#/####./#..../#....');
def('q', 2, '.##.#/#..##/#...#/#...#/.####/....#/....#');
def('r', 2, '#.##/##../#.../#.../#...');
def('s', 2, '.####/#..../.###./....#/####.');
def('t', 0, '.#../.#../####/.#../.#../.#../..##');
def('u', 2, '#...#/#...#/#...#/#..##/.##.#');
def('v', 2, '#...#/#...#/#...#/.#.#./..#..');
def('w', 2, '#...#/#...#/#.#.#/#.#.#/.#.#.');
def('x', 2, '#...#/.#.#./..#../.#.#./#...#');
def('y', 2, '#...#/#...#/#...#/#...#/.####/....#/.###.');
def('z', 2, '#####/...#./..#../.#.../#####');
def('.', 6, '#');
def(',', 5, '.#/.#/#.');
def(':', 2, '#/./././#');
def('-', 3, '###');
def('+', 1, '..#../..#../#####/..#../..#..');
def('/', 0, '....#/...#./...#./..#../.#.../.#.../#....');
def('#', 0, '.#.#./.#.#./#####/.#.#./#####/.#.#./.#.#.');
def('!', 0, '#/#/#/#/#/./#');
def('¡', 0, '#/./#/#/#/#/#');
def('?', 0, '.###./#...#/....#/...#./..#../...../..#..');
def('¿', 0, '..#../...../..#../.#.../#..../#...#/.###.');
def('(', 0, '.#/#./#./#./#./#./.#');
def(')', 0, '#./.#/.#/.#/.#/.#/#.');
def('·', 3, '#');
def('@', 0, '.###./#...#/#.###/#.#.#/#.###/#..../.###.');
def('▶', 0, '#..../##.../###../####./###../##.../#....');
def('>', 0, '#.../.#../..#./...#/..#./.#../#...');
def('▼', 2, '#######/.#####./..###../...#...');
const lowAcute = [[3, -1], [2, 0]], upAcute = [[3, -3], [2, -2]];
for (const [a, b] of [['á', 'a'], ['é', 'e'], ['ó', 'o'], ['ú', 'u']]) F[a] = { ...F[b], extra: lowAcute };
for (const [a, b] of [['Á', 'A'], ['É', 'E'], ['Ó', 'O'], ['Ú', 'U']]) F[a] = { ...F[b], extra: upAcute };
def('í', 2, '#./#./#./#./#.', [[1, -1], [0, 0]]);
F['Í'] = { ...F['I'], extra: [[2, -3], [1, -2]] };
F['ñ'] = { ...F['n'], extra: [[1, -1], [2, -1], [4, -1], [0, 0], [3, 0]] };
F['Ñ'] = { ...F['N'], extra: [[1, -3], [2, -3], [4, -3], [0, -2], [3, -2]] };

function textPath(str, x, y, s) {
  let d = '', cx = x;
  for (const ch of str) {
    if (ch === ' ') { cx += 3 * s; continue; }
    const g = F[ch];
    if (!g) throw new Error('Falta el glifo: ' + ch);
    const w = g.rows[0].length;
    g.rows.forEach((row, r) => {
      let c = 0;
      while (c < w) {
        if (row[c] === '#') {
          let e = c; while (e < w && row[e] === '#') e++;
          d += `M${cx + c * s} ${y + (g.t + r) * s}h${(e - c) * s}v${s}h-${(e - c) * s}z`;
          c = e;
        } else c++;
      }
    });
    (g.extra || []).forEach(([ec, er]) => { d += `M${cx + ec * s} ${y + er * s}h${s}v${s}h-${s}z`; });
    cx += (w + 1) * s;
  }
  return { d, w: Math.max(0, cx - x - s) };
}
const T = (str, x, y, s, fill, attrs = '') => `<path fill="${fill}" ${attrs} d="${textPath(str, x, y, s).d}"/>`;
const TW = (str, s) => textPath(str, 0, 0, s).w;

// ---------- Sprites ----------
const PAL = { g: C.green, k: C.moonDk, l: C.moon, c: C.cream, o: C.orange, y: C.yellow, m: C.magenta, p: C.purple, d: C.dark, n: C.night, f: C.far, i: C.indigo };
function sprite(rows, x, y, s, attrs = '') {
  const by = {};
  rows.forEach((row, r) => {
    let c = 0;
    while (c < row.length) {
      const k = row[c];
      if (k !== '.') {
        let e = c; while (e < row.length && row[e] === k) e++;
        (by[k] = by[k] || []).push(`M${x + c * s} ${y + r * s}h${(e - c) * s}v${s}h-${(e - c) * s}z`);
        c = e;
      } else c++;
    }
  });
  return `<g ${attrs}>` + Object.entries(by).map(([k, ds]) => `<path fill="${PAL[k]}" d="${ds.join('')}"/>`).join('') + '</g>';
}
const S = {
  maskA: [
    '...mmmmmm...',
    '..mmmmmmmm..',
    '.mmyymmyymm.',
    '.mddmmmmddm.',
    '.mddmmmmddm.',
    '.mmmmccmmmm.',
    '.mmmmccmmmm.',
    '..mmmmmmmm..',
    '..mmddddmm..',
    '...mmmmmm...',
    '....mmmm....',
    '............',
  ],
  maskB: [
    'y..........y',
    'yy........yy',
    '.yggggggggy.',
    '.gggggggggg.',
    '.gddggggddg.',
    '.ggddggddgg.',
    '.gggggggggg.',
    '.ggddddddgg.',
    '.ggdcdcdcgg.',
    '..gggggggg..',
    '...gggggg...',
    '............',
  ],
  maskC: [
    '.y...yy...y.',
    '..y......y..',
    '...oooooo...',
    '..oooooooo..',
    'y.oddooddo.y',
    'y.oddooddo.y',
    '..oooooooo..',
    '..oodddddo..',
    '...oooooo...',
    '..y......y..',
    '.y...yy...y.',
    '............',
  ],
  eyeL: ['ddd...', 'dodd..', '..ddd.'],
  cardSpade: [
    '.ddddddd.',
    'dcccccccd',
    'dcdcccccd',
    'dcccdcccd',
    'dccdddccd',
    'dcdddddcd',
    'dcdddddcd',
    'dcccdcccd',
    'dccdddccd',
    'dcccccdcd',
    'dcccccccd',
    '.ddddddd.',
  ],
  cardHeart: [
    '.ddddddd.',
    'dcccccccd',
    'dcmcccccd',
    'dcccccccd',
    'dcmmcmmcd',
    'dcmmmmmcd',
    'dcmmmmmcd',
    'dccmmmccd',
    'dcccmcccd',
    'dcccccmcd',
    'dcccccccd',
    '.ddddddd.',
  ],
  eyeR: ['...ddd', '..ddod', '.ddd..'],
  flame: [
    '.....m.....',
    '....mm.....',
    '....mmm....',
    '...mmom..m.',
    '.m.moomm.m.',
    '.mmmooommm.',
    'mmmoooooomm',
    'mmooyyooomm',
    'mmooyyyoomm',
    'mmoyyyyyomm',
    '.mooyyyoom.',
    '.mmoooooom.',
    '..mmmmmmm..',
  ],
};

// ---------- Componentes ----------
const cut = (x, y, w, h, p) => `M${x + p} ${y}h${w - 2 * p}v${p}h${p}v${h - 2 * p}h-${p}v${p}h-${w - 2 * p}v-${p}h-${p}v-${h - 2 * p}h${p}z`;
const save = (name, content) => fs.writeFileSync(path.join(outDir, name), content);
const rng = (seed) => () => { seed |= 0; seed = seed + 0x6D2B79F5 | 0; let t = Math.imul(seed ^ seed >>> 15, 1 | seed); t = t + Math.imul(t ^ t >>> 7, 61 | t) ^ t; return ((t ^ t >>> 14) >>> 0) / 4294967296; };

// ====== Formato tipo ficha de jugador: títulos en píxeles, cuerpo en monoespaciada ======
const LINE = '#6f58c9', DIM = '#8f84c9', BAND = '#1d1546', BG = '#110b27';
const esc = (t) => t.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
const M = (str, x, y, size, fill, extra = '') => `<text x="${x}" y="${y}" font-size="${size}" fill="${fill}" ${extra}>${esc(str)}</text>`;
const svg4 = (w, h, body, css = '') => `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 ${w} ${h}" width="${w}" height="${h}" shape-rendering="crispEdges"><style>text{font-family:Consolas,"Cascadia Mono","Courier New",monospace}.bl{animation:bl 1s steps(1) infinite}@keyframes bl{50%{opacity:0}}${css}@media (prefers-reduced-motion:reduce){*{animation:none!important}}</style>${body}</svg>\n`;
// marco fino con esquinas recortadas
const frame = (x, y, w, h, fill = BG, col = LINE) =>
  `<path fill="${col}" d="${cut(x, y, w, h, 6)}"/><path fill="${fill}" d="${cut(x + 2, y + 2, w - 4, h - 4, 6)}"/>` +
  [[x + 2, y + 2], [x + w - 8, y + 2], [x + 2, y + h - 8], [x + w - 8, y + h - 8]].map(([a, b]) => `<rect x="${a}" y="${b}" width="6" height="6" fill="${col}"/>`).join('') +
  [[x + 4, y + 4], [x + w - 8, y + 4], [x + 4, y + h - 8], [x + w - 8, y + h - 8]].map(([a, b]) => `<rect x="${a}" y="${b}" width="4" height="4" fill="${fill}"/>`).join('');

// ---------- Cabecera ----------
{
  const H = 250, P = 4, HOR = 218, GROUND = HOR - 8;
  const bands = [[0, '#0d0920'], [56, C.indigo], [104, '#281a58'], [148, C.far], [186, '#5a2a78']];
  let sky = '';
  bands.forEach(([y, col], i) => {
    const end = i + 1 < bands.length ? bands[i + 1][0] : HOR;
    sky += `<rect x="0" y="${y}" width="${W}" height="${end - y}" fill="${col}"/>`;
    if (i > 0) sky += `<rect x="0" y="${y - 8}" width="${W}" height="8" fill="url(#d${i})"/>`;
  });
  const pats = bands.slice(1).map(([, col], i) => `<pattern id="d${i + 1}" width="8" height="8" patternUnits="userSpaceOnUse"><rect width="4" height="4" fill="${col}"/><rect x="4" y="4" width="4" height="4" fill="${col}"/></pattern>`).join('');
  const mx = 708, my = 98, R = 52;
  const r = rng(23); let stars = '', tw = '';
  for (let i = 0; i < 130; i++) {
    const x = Math.floor(r() * 210) * P, y = Math.floor(r() * 44) * P;
    if (x > 28 && x < 508 && y > 32 && y < 212) continue;
    if (y < 36) continue;
    if (Math.hypot(x - mx, y - my - 12) < R + 22) continue;
    const el = `M${x} ${y}h4v4h-4z`;
    if (i % 4 === 0) tw += `<path class="bl" style="animation-duration:${(2 + r() * 2).toFixed(1)}s;animation-delay:-${(r() * 2).toFixed(1)}s" fill="${C.cream}" d="${el}"/>`; else stars += el;
  }
  let mLight = '', mDark = '';
  for (let y = my - R; y < my + R; y += P) {
    let run = null;
    const flush = () => { if (run) { const d = `M${run.x} ${y}h${run.w}v4h-${run.w}z`; if (run.k) mDark += d; else mLight += d; run = null; } };
    for (let x = mx - R; x < mx + R; x += P) {
      const a = x + 2 - mx, b = y + 2 - my;
      if (a * a + b * b > R * R) { flush(); continue; }
      const k = Math.hypot(x + 2 - (mx - 14), y + 2 - (my - 12)) > R - 4;
      if (run && run.k === k) run.w += P; else { flush(); run = { x, w: P, k }; }
    }
    flush();
  }
  const craters = [[-32, -28, 12, 8], [16, -36, 8, 8], [-4, 20, 16, 8], [-36, 12, 8, 8], [-16, 32, 8, 4], [8, 0, 8, 4]]
    .map(([dx, dy, w, h]) => `<rect x="${mx + dx}" y="${my + dy}" width="${w}" height="${h}" fill="${C.moonDk}"/>`).join('');
  const moon = `<g class="mn"><path fill="${C.moon}" d="${mLight}"/><path fill="${C.moonDk}" d="${mDark}"/>${craters}${sprite(S.eyeL, mx - 36, my - 16, 4)}${sprite(S.eyeR, mx - 4, my - 16, 4)}</g>`;
  let town = '', lights = '';
  const rw = rng(41);
  for (const [x, w, h] of [[604, 28, 36], [636, 20, 52], [660, 32, 28], [696, 24, 44], [724, 36, 32], [764, 20, 56], [788, 28, 36], [820, 24, 48]]) {
    const ty = GROUND - h;
    town += `M${x} ${ty}h${w}v${h + 12}h-${w}z`;
    if (w >= 24) town += `M${x + 4} ${ty - 4}h${w - 8}v4h-${w - 8}zM${x + 8} ${ty - 8}h${w - 16}v4h-${w - 16}z`;
    for (let wy = ty + 8; wy < GROUND - 8; wy += 12) for (let wx = x + 4; wx < x + w - 6; wx += 8) {
      if (rw() < 0.45) lights += `<rect ${rw() < 0.25 ? `class="bl" style="animation-duration:${(3 + rw() * 4).toFixed(1)}s" ` : ''}x="${wx}" y="${wy}" width="4" height="4" fill="${C.orange}"/>`;
    }
  }
  const tx = 540;
  const tower = `<path fill="${C.dark}" d="M${tx} 104h40v${H - 104}h-40zM${tx - 4} 100h48v4h-48zM${tx + 4} 92h32v8h-32zM${tx + 10} 84h20v8h-20zM${tx + 16} 76h8v8h-8zM${tx + 18} 60h4v16h-4z"/>` +
    `<path fill="${C.cream}" d="M${tx + 12} 112h16v4h-16zM${tx + 8} 116h24v16h-24zM${tx + 12} 132h16v4h-16z"/>` +
    `<path fill="${C.dark}" d="M${tx + 18} 116h4v10h-4zM${tx + 18} 122h10v4h-10z"/>` +
    `<path fill="${C.orange}" d="M${tx + 10} 148h4v8h-4zM${tx + 26} 148h4v8h-4zM${tx + 10} 168h4v8h-4zM${tx + 26} 168h4v8h-4zM${tx + 14} 190h12v20h-12z"/>`;
  const days = [['d1', 'DÍA 1 · FALTAN 72 HORAS'], ['d2', 'DÍA 2 · FALTAN 48 HORAS'], ['d3', 'DÍA 3 · FALTAN 24 HORAS']]
    .map(([cls, t]) => T(t, W - 24 - TW(t, 2), 14, 2, C.green, `class="${cls}"`)).join('');
  // caja del título
  const bx = 36, by = 40, bw = 468, bh = 166, title = 'DIEGO', ts = 14;
  const titleX = bx + Math.round((bw - TW(title, ts)) / 2), start = 'PULSA START';
  const titleBox = frame(bx, by, bw, bh, '#0f0a24', C.green) +
    T(title, titleX + 6, by + 24 + 6, ts, '#3b2a80') + T(title, titleX, by + 24, ts, C.cream) +
    T('>', bx + 22, by + 136, 2, C.green) + `<rect class="bl" x="${bx + 38}" y="${by + 134}" width="10" height="18" fill="${C.green}"/>` +
    T(start, bx + Math.round((bw - TW(start, 2)) / 2), by + 136, 2, C.orange, 'class="bl" style="animation-duration:1.6s"');
  const body = `<defs>${pats}<clipPath id="c"><path d="${cut(0, 0, W, H, 6)}"/></clipPath></defs><g clip-path="url(#c)">${sky}
<path fill="${C.cream}" d="${stars}"/>${tw}
${moon}
<path fill="${C.dark}" d="${town}"/>${lights}
${tower}
<rect x="0" y="${GROUND}" width="${W}" height="${H - GROUND}" fill="${C.night}"/>
<rect x="0" y="${H - 14}" width="${W}" height="14" fill="${C.dark}"/>
</g>
<path fill="none" stroke="${LINE}" stroke-width="2" d="${cut(1, 1, W - 2, H - 2, 6)}"/>
${T('HOLA, SOY', 24, 14, 2, C.yellow)}${days}
${titleBox}`;
  const css = `.d2,.d3{opacity:0}.d1{animation:d1 15s steps(1) infinite}.d2{animation:d2 15s steps(1) infinite}.d3{animation:d3 15s steps(1) infinite}` +
    `@keyframes d1{0%{opacity:1}33.33%{opacity:0}}@keyframes d2{0%{opacity:0}33.33%{opacity:1}66.66%{opacity:0}}@keyframes d3{0%{opacity:0}66.66%{opacity:1}}` +
    `.mn{animation:mn 15s steps(1) infinite}@keyframes mn{0%{transform:translateY(0)}33.33%{transform:translateY(12px)}66.66%{transform:translateY(24px)}}`;
  save('cabecera.svg', svg4(W, H, body, css));
}

// ---------- Ficha de jugador ----------
{
  const rows = [
    ['NOMBRE', 'Diego'],
    ['CLASE', 'Desarrollador full stack'],
    ['GREMIO', 'Ing. en Informática · Instituto Profesional Santo Tomás'],
    ['PRÁCTICA', 'Marsoft · completada'],
    ['APRENDIENDO', 'lenguaje C'],
    ['GUSTOS', 'videojuegos · desarrollo web · nuevas tecnologías · música'],
  ];
  const chipGroups = [
    ['LENGUAJES', ['TYPESCRIPT', 'JAVASCRIPT', 'C#', 'PYTHON', 'JAVA', 'HTML', 'CSS', ['C']]],
    ['FRAMEWORKS', ['.NET', 'ASP.NET CORE', 'REACT', 'NEXT.JS']],
    ['BASES DE DATOS', ['MYSQL', 'SQL SERVER', 'POSTGRESQL', 'MONGODB']],
    ['CERTIFICADOS', ['IT ESSENTIALS · CISCO 2023', 'CCNA: INTRODUCTION TO NETWORKS · CISCO 2025']],
  ];
  let body = '';
  body += T('JUGADOR 1', 20, 14, 3, C.yellow);
  [S.maskA, S.maskB, S.maskC].forEach((m, i) => { body += sprite(m, 730 + i * 32, 10, 2); });
  let y = 76;
  body += T('>', 24, y - 12, 2, C.green, 'class="bl"');
  for (const [k, v] of rows) {
    body += M(k, 48, y, 13, C.green, 'font-weight="bold" letter-spacing="1"') + M(v, 168, y, 15, C.cream);
    y += 26;
  }
  body += sprite(S.maskA, 716, 62, 8);
  y -= 6;
  let dash = '';
  for (let x = 24; x < W - 24; x += 12) dash += `M${x} ${y}h6v2h-6z`;
  body += `<path fill="${LINE}" d="${dash}"/>`;
  y += 22;
  for (const [label, chips] of chipGroups) {
    body += M(label, 48, y + 19, 12, C.green, 'font-weight="bold" letter-spacing="1"');
    let x = 176;
    for (const chip of chips) {
      const learning = Array.isArray(chip), txt = learning ? chip[0] : chip;
      const w = TW(txt, 2) + 20;
      if (x + w > W - 24) { x = 176; y += 36; }
      body += `<rect x="${x + 1}" y="${y + 1}" width="${w - 2}" height="26" fill="${learning ? 'none' : '#1a1240'}" stroke="${learning ? C.green : LINE}" stroke-width="2"${learning ? ' stroke-dasharray="4 4"' : ''}/>` +
        T(txt, x + 10, y + 7, 2, learning ? C.green : C.cream);
      x += w + 8;
    }
    y += 40;
  }
  const H = y + 8;
  const head = frame(0, 0, W, H) + `<rect x="8" y="6" width="${W - 16}" height="38" fill="${BAND}"/>`;
  save('jugador.svg', svg4(W, H, head + body));
}

// ---------- Botón de LinkedIn ----------
{
  const BW = 250, BH = 46, txt = 'LINKEDIN';
  save('linkedin.svg', svg4(BW, BH, frame(0, 0, BW, BH, BG, C.green) + T(txt, Math.round((BW - TW(txt, 3)) / 2), 13, 3, C.green)));
}

// ---------- Títulos de sección ----------
function heading(file, label) {
  const lw = TW(label, 4);
  let dash = '';
  for (let x = 44 + lw + 24; x < W - 4; x += 10) dash += `M${x} 22h5v3h-5z`;
  save(file, svg4(W, 44, T('>', 4, 8, 4, C.green) + T(label, 44, 8, 4, C.yellow) + `<path fill="${LINE}" d="${dash}"/>`));
}
heading('t-proyectos.svg', 'PROYECTOS');
heading('t-stats.svg', 'ESTADÍSTICAS');

// ---------- Tarjetas de proyecto ----------
function projectCard(file, p) {
  const CW = 414, CH = 204;
  const open = 'ABRIR >';
  let body = frame(0, 0, CW, CH) + T(p.name, 16, 16, 3, C.yellow) + T(open, CW - 16 - TW(open, 2), 20, 2, C.green) +
    `<rect x="16" y="46" width="${CW - 32}" height="2" fill="${LINE}"/>` +
    M(p.sub, 18, 66, 11, DIM);
  p.lines.forEach((l, i) => { body += M(l, 18, 90 + i * 18, 12.5, C.cream); });
  body += M(p.tags.map((t) => `[${t}]`).join(' '), 18, 184, 11, C.yellow, 'font-weight="bold"');
  body += p.art(CW);
  save(file, svg4(CW, CH, body));
}
projectCard('p-pyrosense.svg', {
  name: 'PYROSENSE', sub: 'detección de incendios / visión + IoT',
  lines: ['Cámaras con YOLOv8 y sensores', 'IoT por MQTT detectan fuego y', 'avisan por Telegram. FastAPI,', 'MySQL y React.'],
  tags: ['PYTHON', 'YOLOV8', 'FASTAPI', 'REACT'],
  art: (cw) => sprite(S.flame, cw - 16 - 88, 62, 8),
});
projectCard('p-farol.svg', {
  name: 'FAROL', sub: 'roguelike de póker / psp homebrew',
  lines: ['Manos de póker, amuletos que', 'multiplican la puntuación y', 'ocho mesas de rivales. Arte y', 'sonido generados por código.'],
  tags: ['C', 'PSP', 'HOMEBREW'],
  art: (cw) => sprite(S.cardSpade, cw - 16 - 98, 72, 5) + sprite(S.cardHeart, cw - 16 - 45, 92, 5),
});

for (const f of fs.readdirSync(outDir)) console.log(f, fs.statSync(path.join(outDir, f)).size);
