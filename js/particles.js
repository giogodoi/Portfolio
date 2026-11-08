import * as THREE from 'three';
import { gerarFormas } from './formas.js';

// textura de disco suave: pontos redondos em vez dos quadrados padrão do PointsMaterial
function disco() {
  const c = document.createElement('canvas');
  c.width = c.height = 64;
  const x = c.getContext('2d'), g = x.createRadialGradient(32, 32, 0, 32, 32, 32);
  g.addColorStop(0, 'rgba(255,255,255,1)');
  g.addColorStop(0.45, 'rgba(255,255,255,.9)');
  g.addColorStop(1, 'rgba(255,255,255,0)');
  x.fillStyle = g;
  x.fillRect(0, 0, 64, 64);
  return new THREE.CanvasTexture(c);
}

const suave = (t) => t * t * (3 - 2 * t);

// p vai de 0 (esfera do hero) a 5 (check da entrega); valores fracionários são o morph entre formas
export function iniciarParticulas(canvas, { reduz = false } = {}) {
  const n = innerWidth < 760 ? 3500 : 6500;
  const formas = gerarFormas(n);
  const renderer = new THREE.WebGLRenderer({ canvas, alpha: true, antialias: false, powerPreference: 'high-performance' });
  renderer.setPixelRatio(Math.min(devicePixelRatio || 1, 2));
  const cena = new THREE.Scene();
  const cam = new THREE.PerspectiveCamera(40, 1, 0.1, 50);
  cam.position.z = 7.2;

  const pos = formas[0].pos.slice(), cor = formas[0].cor.slice();
  const geo = new THREE.BufferGeometry();
  geo.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  geo.setAttribute('color', new THREE.BufferAttribute(cor, 3));
  const mat = new THREE.PointsMaterial({
    size: innerWidth < 760 ? 0.05 : 0.04, map: disco(), vertexColors: true, transparent: true,
    depthWrite: false, blending: THREE.AdditiveBlending, sizeAttenuation: true,
  });
  const grupo = new THREE.Group();
  grupo.add(new THREE.Points(geo, mat));
  cena.add(grupo);

  let alvo = 0, atual = 0, mx = 0, my = 0, offX = 0;

  function aplicar(p) {
    const i = Math.min(Math.floor(p), formas.length - 2), t = suave(Math.min(1, p - i));
    const a = formas[i], b = formas[i + 1];
    for (let k = 0; k < pos.length; k++) {
      pos[k] = a.pos[k] + (b.pos[k] - a.pos[k]) * t;
      cor[k] = a.cor[k] + (b.cor[k] - a.cor[k]) * t;
    }
    geo.attributes.position.needsUpdate = true;
    geo.attributes.color.needsUpdate = true;
  }

  function tamanho() {
    const w = canvas.clientWidth, h = canvas.clientHeight;
    renderer.setSize(w, h, false);
    cam.aspect = w / h;
    cam.updateProjectionMatrix();
    // no desktop a nuvem fica centrada em ~75% da largura, à direita do texto
    const meiaLargura = Math.tan(THREE.MathUtils.degToRad(cam.fov / 2)) * cam.position.z * cam.aspect;
    offX = w > 900 ? meiaLargura * 0.5 : 0;
    if (reduz) { grupo.position.x = offX; renderer.render(cena, cam); }
  }
  addEventListener('resize', tamanho);
  tamanho();

  if (reduz) {
    aplicar(0);
    renderer.render(cena, cam);
  } else {
    addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      mx = e.clientX / innerWidth - 0.5;
      my = e.clientY / innerHeight - 0.5;
    }, { passive: true });
    let ry = 0, rx = 0;
    (function quadro(tempo) {
      if (Math.abs(alvo - atual) > 1e-4) {
        atual += (alvo - atual) * 0.08;
        aplicar(atual);
      }
      ry += (Math.sin(tempo * 0.00018) * 0.55 + mx * 0.5 - ry) * 0.05;
      rx += (0.22 + my * 0.3 - rx) * 0.05; // inclinação base: mostra profundidade da treliça
      grupo.rotation.set(rx, ry, 0);
      grupo.position.x += (offX - grupo.position.x) * 0.05;
      renderer.render(cena, cam);
      requestAnimationFrame(quadro); // o navegador já pausa o rAF com a aba oculta
    })(0);
  }

  return {
    progresso(p) {
      alvo = Math.max(0, Math.min(formas.length - 1, p));
      if (reduz) { atual = alvo; aplicar(atual); renderer.render(cena, cam); }
    },
  };
}
