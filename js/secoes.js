import { TRAJETORIA, FORMACAO, CERTIFICACOES, PROJETOS, ETAPAS, UI, GITHUB, STACKS, ICONES_CDN } from './conteudo.js';
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

// Linha do tempo: uma trilha única do primeiro ao último ponto, preenchida conforme a rolagem.
// Devolve medir(), que precisa rodar depois de cada render (alturas mudam com idioma e fontes).
export function iniciarLinhaTempo() {
  const ol = document.getElementById('linha-tempo');
  let pontos = [], topo = 0, alt = 0;

  function preencher() {
    const agulha = innerHeight * 0.55 - ol.getBoundingClientRect().top - topo; // quanto da linha já passou da altura de leitura
    ol.style.setProperty('--preench', alt ? Math.min(1, Math.max(0, agulha / alt)) : 0);
    ol.querySelectorAll('.marco').forEach((m, i) => m.classList.toggle('passou', pontos[i] - topo <= agulha + 1));
  }
  function medir() {
    const base = ol.getBoundingClientRect().top;
    pontos = [...ol.querySelectorAll('.marco-txt')].map((t) => t.getBoundingClientRect().top - base + 12.5); // centro do ponto
    if (!pontos.length) return;
    topo = pontos[0];
    alt = pontos[pontos.length - 1] - topo;
    ol.style.setProperty('--topo', `${topo}px`);
    ol.style.setProperty('--alt', `${alt}px`);
    preencher();
  }
  addEventListener('scroll', preencher, { passive: true });
  addEventListener('resize', medir);
  document.fonts?.ready.then(medir);
  return medir;
}

const g = (d) => `<svg viewBox="0 0 24 24" aria-hidden="true" fill="none" stroke="currentColor" stroke-width="1.6" stroke-linecap="round" stroke-linejoin="round">${d}</svg>`;
const GLIFOS = {
  sql: g('<ellipse cx="12" cy="5.5" rx="7" ry="2.5"/><path d="M5 5.5v13c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5v-13M5 12c0 1.4 3.1 2.5 7 2.5s7-1.1 7-2.5"/>'),
  bi: g('<path d="M4 20h16"/><rect x="6" y="11" width="3" height="7"/><rect x="10.5" y="6" width="3" height="12"/><rect x="15" y="9" width="3" height="9"/>'),
  rag: g('<path d="M6 3h8l4 4v6"/><path d="M14 3v4h4"/><path d="M6 3v18h6"/><circle cx="16.5" cy="17.5" r="3"/><path d="m18.7 19.7 2.3 2.3"/>'),
  nuvem: g('<path d="M7 18h10a4 4 0 0 0 .6-8A6 6 0 0 0 6.2 11 3.5 3.5 0 0 0 7 18z"/>'),
  mvc: g('<rect x="9" y="3" width="6" height="5" rx="1"/><rect x="3" y="16" width="6" height="5" rx="1"/><rect x="15" y="16" width="6" height="5" rx="1"/><path d="M11 8l-4 8M13 8l4 8M9 18.5h6"/>'),
  mvvm: g('<rect x="2.5" y="9.5" width="5" height="5" rx="1"/><rect x="9.5" y="9.5" width="5" height="5" rx="1"/><rect x="16.5" y="9.5" width="5" height="5" rx="1"/><path d="M7.5 12h2M14.5 11h2M16.5 13h-2"/>'),
  micro: g('<path d="m8 3 3.5 2v4L8 11 4.5 9V5z"/><path d="m16 3 3.5 2v4L16 11l-3.5-2V5z"/><path d="m12 12.5 3.5 2v4L12 20.5l-3.5-2v-4z"/>'),
  teste: g('<rect x="4" y="4" width="16" height="16" rx="3"/><path d="m8 12.5 2.5 2.5L16 9.5"/>'),
  scrum: g('<path d="M20 12a8 8 0 1 1-2.3-5.7"/><path d="M20 4v4h-4"/><circle cx="12" cy="12" r="2"/>'),
  kanban: g('<rect x="3" y="4" width="18" height="16" rx="2"/><path d="M9 4v16M15 4v16"/><path d="M5 7.5h2M11 7.5h2M11 10.5h2M17 7.5h2"/>'),
};

// Carrossel de stacks: cada grupo é uma faixa que desliza; a segunda cópia existe só para o loop sem emenda
export function renderStacks(lang) {
  document.querySelectorAll('.stack-trilha').forEach((ul) => {
    const blocos = (oculto) => STACKS[+ul.dataset.grupo].map((s) => {
      const nome = typeof s.nome === 'string' ? s.nome : s.nome[lang];
      const ic = s.si ? `<span class="stk-ic" style="--ic:url('${ICONES_CDN}${s.si}.svg')"></span>` : `<span class="stk-ic stk-glifo">${GLIFOS[s.glifo]}</span>`;
      const rotulo = (typeof s.nome === 'string' ? s.nome : s.nome.en).toLowerCase().replace(/\s+/g, '-');
      // cada bloco é uma janela de app: barra com 3 bolinhas + rótulo, corpo com ícone e nome
      return `<li${oculto ? ' aria-hidden="true" class="stk-copia"' : ''}>
        <span class="stk-barra" aria-hidden="true"><i></i><i></i><i></i><span>~/${esc(rotulo)}</span></span>
        <span class="stk-corpo">${ic}<span>${esc(nome)}</span></span></li>`;
    }).join('');
    ul.innerHTML = blocos(false) + blocos(true);
  });
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
