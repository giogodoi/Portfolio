import { TRAJETORIA, FORMACAO, CERTIFICACOES } from './conteudo.js';
import { esc } from './metodo.js';

const local = (v, lang) => (Array.isArray(v) || typeof v === 'string' ? v : v[lang]);

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
