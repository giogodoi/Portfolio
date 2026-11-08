import { TEXTOS } from './conteudo.js';
import { renderMetodo, iniciarScrollMetodo } from './metodo.js';
import { renderTrajetoria, iniciarLinhaTempo, renderProjetos, renderPosts, postsValidos } from './secoes.js';

export const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
const IDIOMAS = ['pt', 'en'];
let posts = [];
let metodo = null;

// ---------- idioma: escolha salva > idioma do navegador ----------
function idiomaInicial() {
  try {
    const salvo = localStorage.getItem('idioma');
    if (IDIOMAS.includes(salvo)) return salvo;
  } catch { /* storage bloqueado: segue para o navegador */ }
  return (navigator.language || '').toLowerCase().startsWith('pt') ? 'pt' : 'en';
}
let lang = idiomaInicial();
const abas = [...document.querySelectorAll('.idioma [role="tab"]')];
const seletor = document.querySelector('.idioma');
function marcarAba() {
  abas.forEach((b) => b.setAttribute('aria-selected', String(b.dataset.lang === lang)));
  seletor.lgSelect?.(IDIOMAS.indexOf(lang)); // se o liquid-glass já iniciou, move a lente também
}
marcarAba();

function aplicarTextos() {
  const t = TEXTOS[lang];
  document.documentElement.lang = lang === 'pt' ? 'pt-BR' : 'en';
  document.title = t['doc.titulo'];
  document.querySelector('meta[name="description"]').content = t['doc.desc'];
  document.querySelectorAll('[data-i18n]').forEach((el) => { el.textContent = t[el.dataset.i18n]; });
  document.querySelectorAll('[data-i18n-html]').forEach((el) => { el.innerHTML = t[el.dataset.i18nHtml]; }); // conteúdo fixo do repo
  document.querySelectorAll('[data-i18n-aria]').forEach((el) => el.setAttribute('aria-label', t[el.dataset.i18nAria]));
}

const medirLinha = iniciarLinhaTempo();
function renderTudo() {
  renderMetodo(lang, posts);
  renderTrajetoria(lang);
  medirLinha();
  renderProjetos(lang);
  renderPosts(lang, posts);
}

function mudarIdioma(novo) {
  if (novo === lang || !IDIOMAS.includes(novo)) return;
  lang = novo;
  try { localStorage.setItem('idioma', lang); } catch { /* sem persistência, só nesta visita */ }
  marcarAba();
  aplicarTextos();
  renderTudo();
  metodo?.atualizar();
}
seletor.addEventListener('lg:change', (e) => mudarIdioma(e.detail.tab.dataset.lang));
abas.forEach((b) => b.addEventListener('click', () => mudarIdioma(b.dataset.lang))); // funciona mesmo sem o liquid-glass

if (lang !== 'pt') aplicarTextos(); // o HTML já vem em PT
renderTudo();

// ---------- rolagem suave só para quem não pediu movimento reduzido ----------
let lenis = null;
if (!reduz && window.Lenis) {
  lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true, anchors: true });
  window.__lenis = lenis;
  (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
}

// ---------- nuvem de partículas: se WebGL ou o CDN falharem, a página segue sem ela ----------
const canvas = document.getElementById('particulas');
let particulas = null;
try {
  const { iniciarParticulas } = await import('./particles.js');
  particulas = iniciarParticulas(canvas, { reduz });
} catch (e) {
  canvas.remove();
  console.warn('Partículas desativadas:', e.message);
}

metodo = iniciarScrollMetodo({ particulas, canvas, reduz, lenis });

// ---------- posts do LinkedIn: data/posts.json. Se falhar, a seção fica só com o convite ----------
fetch('data/posts.json', { cache: 'no-cache' })
  .then((r) => (r.ok ? r.json() : []))
  .then((lista) => {
    posts = postsValidos(lista);
    if (!posts.length) return;
    renderMetodo(lang, posts);
    renderPosts(lang, posts);
    metodo.atualizar();
  })
  .catch((e) => console.warn('posts.json ignorado:', e.message));
