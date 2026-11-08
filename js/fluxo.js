import { FLUXO, UI, GITHUB, TEXTOS } from './conteudo.js';
import { esc } from './metodo.js';

const ic = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const ICONES = {
  canal: ic('<path d="M4 5h16v11H9l-5 4z"/><path d="M8 10h8M8 13h5"/>'),
  lgpd: ic('<path d="M12 3 5 6v5c0 4.5 3 8 7 10 4-2 7-5.5 7-10V6z"/><rect x="9" y="10.5" width="6" height="5" rx="1"/><path d="M10.5 10.5V9a1.5 1.5 0 0 1 3 0v1.5"/>'),
  modelo: ic('<rect x="6" y="6" width="12" height="12" rx="2"/><path d="M9 2v4M15 2v4M9 18v4M15 18v4M2 9h4M2 15h4M18 9h4M18 15h4"/><path d="M10 10h4v4h-4z"/>'),
  guardrails: ic('<path d="M14.5 6.5a4 4 0 0 0-5.3 5.3L4 17l3 3 5.2-5.2a4 4 0 0 0 5.3-5.3l-2.4 2.4-2.6-.6-.6-2.6z"/>'),
  memoria: ic('<ellipse cx="12" cy="5.5" rx="7" ry="2.5"/><path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13"/><path d="M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5"/>'),
};
const OK = '<svg viewBox="0 0 16 16" aria-hidden="true"><path d="m4 8.5 2.5 2.5L12 5.5" fill="none" stroke="#fff" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/></svg>';

const ativos = new Set();
let atual = -1, lang = 'pt';
const tela = () => document.getElementById('fluxo-tela');

export function renderFluxo(l) {
  lang = l;
  document.getElementById('fluxo-nos').innerHTML = FLUXO.map((n, i) => `
    <li><button type="button" class="no" data-i="${i}" aria-pressed="false" aria-controls="fluxo-detalhe">
      <span class="no-caixa">${ICONES[n.id]}<span class="no-ok">${OK}</span></span>
      <span class="no-titulo">${esc(n[lang].titulo)}</span>
      <span class="no-sub">${esc(n[lang].sub)}</span>
    </button></li>`).join('');
  desenharFios();
  atualizar();
}

// fios em curva entre as "portas" dos blocos; horizontais no desktop, verticais quando empilhados
function desenharFios() {
  const t = tela(), svg = t.querySelector('.fluxo-fios'), base = t.getBoundingClientRect();
  const cx = [...t.querySelectorAll('.no-caixa')].map((c) => c.getBoundingClientRect());
  svg.setAttribute('viewBox', `0 0 ${base.width} ${base.height}`);
  svg.innerHTML = cx.slice(0, -1).map((a, i) => {
    const b = cx[i + 1];
    let d;
    if (b.top > a.bottom) {
      const x1 = a.left + a.width / 2 - base.left, y1 = a.bottom - base.top, x2 = b.left + b.width / 2 - base.left, y2 = b.top - base.top, m = (y2 - y1) / 2;
      d = `M${x1} ${y1} C${x1} ${y1 + m} ${x2} ${y2 - m} ${x2} ${y2}`;
    } else {
      const x1 = a.right - base.left, y1 = a.top + a.height / 2 - base.top, x2 = b.left - base.left, y2 = b.top + b.height / 2 - base.top, m = (x2 - x1) / 2;
      d = `M${x1} ${y1} C${x1 + m} ${y1} ${x2 - m} ${y2} ${x2} ${y2}`;
    }
    return `<path class="fio-base" d="${d}"/><path class="fio" d="${d}" pathLength="1"/>`;
  }).join('');
}

function atualizar() {
  const u = UI[lang], t = tela();
  t.querySelectorAll('.no').forEach((b, i) => {
    b.classList.toggle('ativo', ativos.has(i));
    b.classList.toggle('atual', i === atual);
    b.setAttribute('aria-pressed', String(ativos.has(i)));
  });
  t.querySelectorAll('.fio').forEach((f, i) => f.classList.toggle('aceso', ativos.has(i) && ativos.has(i + 1)));
  document.getElementById('fluxo-status').textContent = u.executados.replace('{n}', ativos.size);
  t.classList.toggle('completo', ativos.size === FLUXO.length);
  document.getElementById('fluxo-reiniciar').hidden = !ativos.size;

  const det = document.getElementById('fluxo-detalhe');
  if (atual < 0) { det.classList.remove('cheio'); return; } // mantém a dica inicial
  const n = FLUXO[atual];
  det.classList.add('cheio');
  det.innerHTML = `
    <p class="det-num">${u.bloco.replace('{n}', atual + 1)}</p>
    <h3>${esc(n[lang].titulo)}</h3>
    <p class="det-txt">${esc(n[lang].texto)}</p>
    <ul class="det-tags">${n.tags.map((tg) => `<li>${esc(tg)}</li>`).join('')}</ul>
    ${n.repo ? `<p class="det-links"><a href="${GITHUB}/${n.repo}" target="_blank" rel="noopener">${u.verProjeto}</a><a href="${esc(n.demo)}" target="_blank" rel="noopener">${u.verDemo}</a></p>` : ''}`;
}

function ativar(i) {
  if (Number.isNaN(i) || (i === atual && ativos.has(i))) return;
  ativos.add(i);
  atual = i;
  atualizar();
}

export function iniciarFluxo() {
  const t = tela();
  const no = (e) => e.target.closest?.('.no');
  t.addEventListener('pointerover', (e) => { if (no(e)) ativar(+no(e).dataset.i); });
  t.addEventListener('focusin', (e) => { if (no(e)) ativar(+no(e).dataset.i); });
  t.addEventListener('click', (e) => { if (no(e)) ativar(+no(e).dataset.i); });
  document.getElementById('fluxo-reiniciar').addEventListener('click', () => {
    ativos.clear();
    atual = -1;
    document.getElementById('fluxo-detalhe').innerHTML = `<p class="det-dica" data-i18n="fluxo.dica">${esc(TEXTOS[lang]['fluxo.dica'])}</p>`;
    atualizar();
  });
  new ResizeObserver(() => { desenharFios(); atualizar(); }).observe(t); // fontes, idioma e largura mudam as posições
}
