export const reduz = matchMedia('(prefers-reduced-motion: reduce)').matches;

// Rolagem suave só para quem não pediu movimento reduzido
if (!reduz && window.Lenis) {
  const lenis = new window.Lenis({ lerp: 0.1, smoothWheel: true, anchors: true });
  (function raf(t) { lenis.raf(t); requestAnimationFrame(raf); })(0);
}
