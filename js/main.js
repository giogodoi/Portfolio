import { renderMetodo, iniciarScrollMetodo } from './metodo.js';
import { renderTrajetoria } from './secoes.js';

export const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;
let lang = 'pt';

// Rolagem suave só para quem não pediu movimento reduzido
let lenis = null;
if (!reduz && window.Lenis) {
  lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true, anchors: true });
  window.__lenis = lenis;
  (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
}

renderMetodo(lang);
renderTrajetoria(lang);

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
