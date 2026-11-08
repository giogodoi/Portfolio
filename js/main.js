import { renderMetodo, iniciarScrollMetodo } from './metodo.js';
import { renderTrajetoria, renderProjetos, renderPosts, postsValidos } from './secoes.js';

export const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
let lang = 'pt';
let posts = [];

// Rolagem suave só para quem não pediu movimento reduzido
let lenis = null;
if (!reduz && window.Lenis) {
  lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true, anchors: true });
  window.__lenis = lenis;
  (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
}

function renderTudo() {
  renderMetodo(lang, posts);
  renderTrajetoria(lang);
  renderProjetos(lang);
  renderPosts(lang, posts);
}
renderTudo();

// Nuvem de partículas: se WebGL ou o CDN falharem, a página segue sem ela
const canvas = document.getElementById('particulas');
let particulas = null;
try {
  const { iniciarParticulas } = await import('./particles.js');
  particulas = iniciarParticulas(canvas, { reduz });
} catch (e) {
  canvas.remove();
  console.warn('Partículas desativadas:', e.message);
}

const metodo = iniciarScrollMetodo({ particulas, canvas, reduz, lenis });

// Posts do LinkedIn: data/posts.json. Se falhar, a seção fica só com o convite
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
