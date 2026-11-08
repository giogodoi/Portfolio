export const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Rolagem suave só para quem não pediu movimento reduzido
if (!reduz && window.Lenis) {
  const lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true, anchors: true });
  (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
}

// Nuvem de partículas: se WebGL ou o CDN falharem, a página segue sem ela
const canvas = document.getElementById('particulas');
export let particulas = null;
try {
  const { iniciarParticulas } = await import('./particles.js');
  particulas = iniciarParticulas(canvas, { reduz });
} catch (e) {
  canvas.remove();
  console.warn('Partículas desativadas:', e.message);
}
