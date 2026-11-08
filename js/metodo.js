import { ETAPAS, PROJETOS, UI, GITHUB } from './conteudo.js';

export const nomeProj = (p, lang) => (typeof p.nome === 'string' ? p.nome : p.nome[lang]);
export const esc = (s) => String(s).replace(/[&<>"']/g, (c) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' })[c]);
const SETA = '<svg class="seta" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

function card(ev, lang, u) {
  if (ev.tipo === 'experiencia') {
    return `<div class="ev ev-exp"><p class="ev-tipo">${u.experiencia} <b>${esc(ev.org)}</b></p><p>${esc(ev[lang])}</p></div>`;
  }
  if (ev.tipo === 'post') {
    const data = new Intl.DateTimeFormat(lang === 'pt' ? 'pt-BR' : 'en', { month: 'short', year: 'numeric' }).format(new Date(ev.data + 'T12:00:00'));
    return `<a class="ev ev-post" href="${esc(ev.url)}" target="_blank" rel="noopener"><p class="ev-tipo">${u.post} <b>LinkedIn, ${esc(data)}</b>${SETA}</p><p>${esc(ev.titulo)}</p></a>`;
  }
  const p = PROJETOS[ev.repo];
  return `<a class="ev ev-proj" href="${GITHUB}/${ev.repo}" target="_blank" rel="noopener" aria-label="${esc(nomeProj(p, lang))}, ${u.abreGithub}"><p class="ev-tipo">${u.projeto} <b>${esc(nomeProj(p, lang))}</b>${SETA}</p><p>${esc(ev[lang])}</p></a>`;
}

// posts: itens de data/posts.json; entram como evidência na etapa indicada no campo "etapa"
export function renderMetodo(lang, posts = []) {
  const u = UI[lang];
  document.getElementById('etapas').innerHTML = ETAPAS.map((e, i) => {
    const extras = posts.filter((p) => p.etapa === e.id).slice(0, 2).map((p) => ({ tipo: 'post', ...p }));
    return `<article class="etapa" id="etapa-${e.id}">
      <p class="etapa-num"><span>${String(i + 1).padStart(2, '0')}</span>${u.etapaDe.replace('{n}', i + 1)}</p>
      <h3>${esc(e[lang].titulo)}</h3>
      <p class="etapa-resumo">${esc(e[lang].resumo)}</p>
      <ul class="praticas">${e[lang].praticas.map((p) => `<li>${esc(p)}</li>`).join('')}</ul>
      <p class="ev-cab">${u.ondeApliquei}</p>
      <div class="evidencias">${[...e.evidencias, ...extras].map((ev) => card(ev, lang, u)).join('')}</div>
    </article>`;
  }).join('');
  document.getElementById('trilho-passos').innerHTML = ETAPAS.map((e, i) =>
    `<li><button type="button" data-i="${i}" aria-label="${esc(u.irEtapa.replace('{n}', i + 1).replace('{t}', e[lang].titulo))}">${String(i + 1).padStart(2, '0')}</button></li>`).join('');
}

// Liga o scroll ao método: etapa ativa, barra de progresso e forma das partículas
export function iniciarScrollMetodo({ particulas, canvas, reduz, lenis }) {
  const trilho = document.querySelector('.metodo-trilho');
  const barra = document.querySelector('.trilho-barra i');
  const empilhado = () => reduz || innerWidth <= 900;
  let ultima = -1;

  function atualizar() {
    const vh = innerHeight, r = trilho.getBoundingClientRect();
    const arts = document.querySelectorAll('.etapa');
    let p, op;
    if (empilhado()) {
      let ativa = -1;
      arts.forEach((a, i) => { if (a.getBoundingClientRect().top < vh * 0.6) ativa = i; });
      p = ativa + 1; // 0 = esfera do hero
      op = scrollY < vh * 0.5 || (r.top < vh * 0.6 && r.bottom > vh * 0.4) ? 0.32 : 0.1;
    } else {
      const prog = Math.min(1, Math.max(0, -r.top / (r.height - vh)));
      const s = prog * ETAPAS.length, ativa = Math.min(ETAPAS.length - 1, Math.floor(s)), u = s - ativa;
      // cada etapa segura a forma e só faz o morph para a próxima nos últimos 28% do trecho
      p = r.top > 0 ? Math.max(0, 1 - r.top / vh) : ativa + 1 + (ativa < ETAPAS.length - 1 ? Math.max(0, (u - 0.72) / 0.28) : 0);
      op = scrollY < vh * 0.6 || (r.top < vh * 0.35 && r.bottom > vh * 0.65) ? 1 : 0.07; // quase some fora do hero/método: não cruza o texto
      if (ativa !== ultima) {
        arts.forEach((a, i) => { a.classList.toggle('ativa', i === ativa); a.inert = i !== ativa; });
        document.querySelectorAll('#trilho-passos button').forEach((b, i) => b.toggleAttribute('aria-current', i === ativa));
        ultima = ativa;
      }
      barra.style.transform = `scaleY(${prog})`;
    }
    particulas?.progresso(p);
    if (canvas.isConnected) canvas.style.opacity = op;
  }

  document.getElementById('trilho-passos').addEventListener('click', (e) => {
    const b = e.target.closest('button');
    if (!b) return;
    const r = trilho.getBoundingClientRect(), total = r.height - innerHeight;
    const y = scrollY + r.top + ((+b.dataset.i + 0.35) / ETAPAS.length) * total;
    lenis ? lenis.scrollTo(y) : scrollTo({ top: y, behavior: reduz ? 'auto' : 'smooth' });
  });

  addEventListener('scroll', atualizar, { passive: true });
  addEventListener('resize', () => { ultima = -1; document.querySelectorAll('.etapa').forEach((a) => { a.inert = false; }); atualizar(); });
  atualizar();
  // depois de re-renderizar (troca de idioma, posts carregados)
  return { atualizar() { ultima = -1; atualizar(); } };
}
