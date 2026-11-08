import { TRAJETORIA, FORMACAO, CERTIFICACOES, PROJETOS, ETAPAS, UI, GITHUB } from './conteudo.js';
import { esc } from './metodo.js';

const local = (v, lang) => (Array.isArray(v) || typeof v === 'string' ? v : v[lang]);
const SETA = '<svg class="seta" viewBox="0 0 16 16" aria-hidden="true"><path d="M5 11 11 5M6 5h5v5" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round"/></svg>';

export function renderTrajetoria(lang) {
  document.getElementById('linha-tempo').innerHTML = TRAJETORIA.map((t) => `
    <li class="marco">
      <p class="marco-quando">${esc(t.quando[lang])}</p>
      <div class="marco-txt">
        <h3>${esc(t[lang].cargo)} <span>${esc(t.org)}</span></h3>
        <ul>${t[lang].itens.map((i) => `<li>${esc(i)}</li>`).join('')}</ul>
      </div>
    </li>`).join('') + `
    <li class="marco marco-base">
      <p class="marco-quando">${esc(FORMACAO.quando[lang])}</p>
      <div class="marco-txt"><h3>${esc(FORMACAO[lang])} <span>${esc(FORMACAO.org)}</span></h3></div>
    </li>`;

  document.getElementById('certificacoes').innerHTML = CERTIFICACOES.map((c) => `
    <li class="${c.destaque ? 'cert-destaque' : ''}">
      <p class="cert-emissor">${esc(c.emissor)} <span>${esc(c.quando[lang])}</span></p>
      <p>${local(c.itens, lang).map(esc).join(', ')}</p>
    </li>`).join('');
}

export function renderProjetos(lang) {
  const lista = Object.entries(PROJETOS).sort((a, b) => b[1].ano - a[1].ano); // sort estável: mantém a ordem de destaque
  document.getElementById('lista-projetos').innerHTML = lista.map(([repo, p]) => `
    <li><a class="proj" href="${GITHUB}/${repo}" target="_blank" rel="noopener">
      <span class="proj-nome">${esc(p.nome)}</span>
      <span class="proj-desc">${esc(p[lang])}</span>
      <span class="proj-stack">${p.stack.map(esc).join(', ')}</span>
      <span class="proj-ano">${p.ano}</span>${SETA}
    </a></li>`).join('');
}

// Validação na fronteira: posts.json é editado à mão, então só entra o que tem formato esperado
const ETAPA_IDS = ETAPAS.map((e) => e.id);
export function postsValidos(lista) {
  if (!Array.isArray(lista)) return [];
  return lista.filter((p) => p && typeof p.url === 'string' && p.url.startsWith('https://www.linkedin.com/')
    && /^\d{4}-\d{2}-\d{2}$/.test(p.data) && typeof p.titulo === 'string' && p.titulo.trim()
    && (p.etapa === undefined || ETAPA_IDS.includes(p.etapa)));
}

export function ordenarPosts(posts) {
  return [...posts].sort((a, b) => (b.destaque === true) - (a.destaque === true) || b.data.localeCompare(a.data));
}

export function renderPosts(lang, posts) {
  const u = UI[lang];
  const fmt = new Intl.DateTimeFormat(lang === 'pt' ? 'pt-BR' : 'en', { day: 'numeric', month: 'short', year: 'numeric' });
  const grade = document.getElementById('posts-grade');
  grade.hidden = !posts.length;
  grade.innerHTML = ordenarPosts(posts).slice(0, 3).map((p, i) => {
    const arq = `post-${p.data.slice(0, 7)}.md`;
    const etapa = ETAPAS.find((e) => e.id === p.etapa);
    return `<article class="term" style="--atraso:${i * 120}ms">
      <div class="term-barra" aria-hidden="true"><i></i><i></i><i></i><span>${arq}</span></div>
      <div class="term-corpo">
        <p class="term-cmd" aria-hidden="true"><b>❯</b> cat ${arq}</p>
        ${p.img ? `<img src="${esc(p.img)}" alt="" loading="lazy">` : ''}
        <h3>${esc(p.titulo)}</h3>
        <p class="term-meta"><time datetime="${p.data}">${fmt.format(new Date(p.data + 'T12:00:00'))}</time>${etapa ? `<span class="selo">${u.etapa}: ${esc(etapa[lang].titulo)}</span>` : ''}</p>
        ${p.resumo ? `<p class="term-resumo">${esc(p.resumo)}</p>` : ''}
        <p class="term-fim"><a class="term-link" href="${esc(p.url)}" target="_blank" rel="noopener">${u.lerLinkedin}${SETA}</a><span class="cursor" aria-hidden="true"></span></p>
      </div>
    </article>`;
  }).join('');
  // entrada escalonada, uma vez, quando a grade aparece
  const io = new IntersectionObserver((es) => es.forEach((e) => {
    if (e.isIntersecting) { e.target.classList.add('in'); io.unobserve(e.target); }
  }), { threshold: 0.15 });
  grade.querySelectorAll('.term').forEach((t) => io.observe(t));
}
