// Formas da nuvem de partículas. Módulo puro (sem Three.js) para poder ser testado no Node.
// Cada forma devolve { pos: Float32Array(n*3), cor: Float32Array(n*3) } com o MESMO n,
// assim o morph é só uma interpolação ponto a ponto.

export const FORMAS = ['esfera', 'constelacao', 'trelica', 'funil', 'codigo', 'check'];

const HAZE = [0.80, 0.85, 0.99];   // #CCD8FC
const SIGNAL = [0.24, 0.28, 0.89]; // #3C48E4
const APAGADO = [0.16, 0.17, 0.23]; // pontos descartados

// gerador com semente: as formas saem idênticas a cada carregamento
function rng(seed) {
  return () => (seed = (Math.imul(seed, 1664525) + 1013904223) >>> 0) / 4294967296;
}
function gauss(r) {
  let u = 0;
  while (!u) u = r();
  return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * r());
}
function nova(n) {
  return { pos: new Float32Array(n * 3), cor: new Float32Array(n * 3) };
}
function poe(f, i, x, y, z, c) {
  f.pos.set([x, y, z], i * 3);
  f.cor.set(c, i * 3);
}

// 0 · ideia: esfera de Fibonacci
function esfera(n, r) {
  const f = nova(n), R = 1.45, ouro = Math.PI * (3 - Math.sqrt(5));
  for (let i = 0; i < n; i++) {
    const y = 1 - (2 * (i + 0.5)) / n, raio = Math.sqrt(1 - y * y), a = i * ouro;
    poe(f, i, Math.cos(a) * raio * R, y * R, Math.sin(a) * raio * R, r() < 0.06 ? SIGNAL : HAZE);
  }
  return f;
}

// 1 · contextualizar: aglomerados de necessidades; um deles é o problema central
function constelacao(n, r) {
  const f = nova(n), K = 9, centros = [];
  for (let k = 0; k < K; k++) {
    const y = 1 - (2 * (k + 0.5)) / K, raio = Math.sqrt(1 - y * y), a = k * 2.4;
    centros.push([Math.cos(a) * raio * 1.35, y * 1.2, Math.sin(a) * raio * 1.35]);
  }
  centros[0] = [0, 0, 0];
  for (let i = 0; i < n; i++) {
    if (r() < 0.12) { // ruído: informação solta
      poe(f, i, (r() - 0.5) * 4, (r() - 0.5) * 3.2, (r() - 0.5) * 3, APAGADO);
      continue;
    }
    const k = i % K, c = centros[k], sd = k === 0 ? 0.22 : 0.13;
    poe(f, i, c[0] + gauss(r) * sd, c[1] + gauss(r) * sd, c[2] + gauss(r) * sd, k === 0 ? SIGNAL : HAZE);
  }
  return f;
}

// 2 · estruturar dados: treliça (schema) com nós em destaque
function trelica(n) {
  const f = nova(n), g = 5, L = 2.5, s = L / (g - 1), arestas = [];
  const no = (a, b, c) => [a * s - L / 2, b * s - L / 2, c * s - L / 2];
  for (let a = 0; a < g; a++) for (let b = 0; b < g; b++) for (let c = 0; c < g - 1; c++) {
    arestas.push([no(c, a, b), no(c + 1, a, b)], [no(a, c, b), no(a, c + 1, b)], [no(a, b, c), no(a, b, c + 1)]);
  }
  const E = arestas.length, por = Math.ceil(n / E);
  for (let i = 0; i < n; i++) {
    const [p, q] = arestas[i % E], t = (Math.floor(i / E) + 0.5) / por;
    const ponta = t < 0.08 || t > 0.92;
    poe(f, i, p[0] + (q[0] - p[0]) * t, p[1] + (q[1] - p[1]) * t, p[2] + (q[2] - p[2]) * t, ponta ? SIGNAL : HAZE);
  }
  return f;
}

// 3 · preparar, limpar, reduzir: funil; o que sobra embaixo é o dado útil, os outliers ficam de fora
function funil(n, r) {
  const f = nova(n);
  for (let i = 0; i < n; i++) {
    const u = r();
    if (u < 0.12) { // outliers descartados, numa casca afastada
      const a = r() * Math.PI * 2, y = (r() - 0.5) * 3.2, R = 2.1 + r() * 0.5;
      poe(f, i, Math.cos(a) * R, y, Math.sin(a) * R, APAGADO);
    } else if (u < 0.22) { // dado reduzido: coluna fina saindo do funil
      poe(f, i, gauss(r) * 0.03, -1.25 - r() * 0.55, gauss(r) * 0.03, SIGNAL);
    } else {
      const v = r(), y = 1.35 - v * 2.6, R = 0.1 + Math.pow(1 - v, 1.7) * 1.5, a = r() * Math.PI * 2 + y * 2;
      poe(f, i, Math.cos(a) * R + gauss(r) * 0.02, y, Math.sin(a) * R + gauss(r) * 0.02, HAZE);
    }
  }
  return f;
}

// 4 · mãos ao código: linhas indentadas num plano inclinado; palavras-chave em destaque
function codigo(n, r) {
  const f = nova(n), linhas = 20, tokens = [];
  const recuos = [0, 1, 2, 2, 1, 2, 3, 3, 2, 1, 0, 0, 1, 2, 2, 3, 2, 1, 1, 0];
  let total = 0;
  for (let l = 0; l < linhas; l++) {
    const y = 1.3 - l * (2.6 / (linhas - 1)), comentario = l === 4 || l === 12;
    let x = -1.7 + recuos[l] * 0.3;
    const qtd = 2 + Math.floor(r() * 5);
    for (let t = 0; t < qtd && x < 1.7; t++) {
      const w = Math.min(0.12 + r() * 0.42, 1.7 - x);
      tokens.push({ x, y, w, ini: total, cor: comentario ? APAGADO : t === 0 && r() < 0.6 ? SIGNAL : HAZE });
      total += w;
      x += w + 0.09;
    }
  }
  // plano de frente para a câmera: a profundidade vem da oscilação do grupo
  let k = 0;
  for (let i = 0; i < n; i++) {
    const s = ((i + 0.5) / n) * total;
    while (k < tokens.length - 1 && tokens[k + 1].ini <= s) k++;
    const t = tokens[k];
    poe(f, i, t.x + (s - t.ini), t.y + gauss(r) * 0.018, gauss(r) * 0.03, t.cor);
  }
  return f;
}

// 5 · revisão e entrega: anel com o check no centro
function check(n, r) {
  const f = nova(n), segs = [[-0.75, 0.02, -0.22, -0.52], [-0.22, -0.52, 0.82, 0.62]];
  const l0 = Math.hypot(0.53, 0.54), l1 = Math.hypot(1.04, 1.14);
  for (let i = 0; i < n; i++) {
    if (r() < 0.55) {
      const a = r() * Math.PI * 2, R = 1.5 + gauss(r) * 0.03;
      poe(f, i, Math.cos(a) * R, Math.sin(a) * R, gauss(r) * 0.05, HAZE);
    } else {
      const s = r() * (l0 + l1), [x0, y0, x1, y1] = s < l0 ? segs[0] : segs[1];
      const t = s < l0 ? s / l0 : (s - l0) / l1;
      poe(f, i, x0 + (x1 - x0) * t + gauss(r) * 0.045, y0 + (y1 - y0) * t + gauss(r) * 0.045, gauss(r) * 0.07, SIGNAL);
    }
  }
  return f;
}

export function gerarFormas(n) {
  return [esfera, constelacao, trelica, funil, codigo, check].map((g, i) => g(n, rng(42 + i)));
}
