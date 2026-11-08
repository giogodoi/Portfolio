// node --test tests/check.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { gerarFormas, FORMAS } from '../js/formas.js';
import { readFileSync, readdirSync } from 'node:fs';
import { ETAPAS, PROJETOS, UI, TRAJETORIA, CERTIFICACOES, TEXTOS, FLUXO, STACKS } from '../js/conteudo.js';
import { postsValidos, ordenarPosts } from '../js/secoes.js';
import { ICONES } from '../js/icones.js';

test('formas: todas com n pontos, valores finitos e dentro da cena', () => {
  for (const n of [3500, 6500]) {
    const formas = gerarFormas(n);
    assert.equal(formas.length, FORMAS.length);
    for (const [i, f] of formas.entries()) {
      assert.equal(f.pos.length, n * 3, `${FORMAS[i]}: pos`);
      assert.equal(f.cor.length, n * 3, `${FORMAS[i]}: cor`);
      assert.ok(f.pos.every((v) => Number.isFinite(v) && Math.abs(v) < 4), `${FORMAS[i]}: posição fora da cena`);
      assert.ok(f.cor.every((v) => v >= 0 && v <= 1), `${FORMAS[i]}: cor fora de [0,1]`);
    }
  }
});

test('conteúdo: toda evidência de projeto aponta para um repo cadastrado', () => {
  for (const e of ETAPAS) for (const ev of e.evidencias) {
    assert.ok(['experiencia', 'projeto'].includes(ev.tipo), `${e.id}: tipo ${ev.tipo}`);
    if (ev.tipo === 'projeto') assert.ok(PROJETOS[ev.repo], `${e.id}: repo ${ev.repo} não está em PROJETOS`);
    assert.ok(ev.pt && ev.en, `${e.id}: evidência sem PT ou EN`);
  }
});

test('conteúdo: PT e EN com as mesmas chaves e mesmo número de práticas', () => {
  assert.deepEqual(Object.keys(UI.pt).sort(), Object.keys(UI.en).sort());
  assert.equal(ETAPAS.length, FORMAS.length - 1, 'uma forma por etapa, mais a esfera do hero');
  for (const e of ETAPAS) {
    assert.deepEqual(Object.keys(e.pt).sort(), Object.keys(e.en).sort(), e.id);
    assert.equal(e.pt.praticas.length, e.en.praticas.length, e.id);
  }
  for (const [k, p] of Object.entries(PROJETOS)) assert.ok(p.pt && p.en && p.nome && p.ano, k);
  for (const t of TRAJETORIA) {
    assert.ok(t.quando.pt && t.quando.en, t.org);
    assert.equal(t.pt.itens.length, t.en.itens.length, `${t.org}: itens PT/EN`);
  }
  assert.equal(FLUXO.length, 5, 'o fluxo tem 5 blocos (textos dizem "de 5")');
  for (const n of FLUXO) {
    assert.deepEqual(Object.keys(n.pt).sort(), Object.keys(n.en).sort(), n.id);
    if (n.repo) assert.ok(PROJETOS[n.repo], `${n.id}: repo ${n.repo} não está em PROJETOS`);
  }
  for (const c of CERTIFICACOES) {
    if (!Array.isArray(c.itens)) assert.equal(c.itens.pt.length, c.itens.en.length, c.emissor);
  }
});

test('i18n: toda chave do HTML existe em PT e EN, e o PT bate com o texto do HTML', () => {
  assert.deepEqual(Object.keys(TEXTOS.pt).sort(), Object.keys(TEXTOS.en).sort());
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  const des = (s) => s.replace(/&amp;/g, '&');
  let n = 0;
  for (const [, k, txt] of html.matchAll(/data-i18n="([^"]+)"[^>]*>([^<]*)</g)) {
    n++;
    assert.ok(TEXTOS.en[k], `chave ${k} sem EN`);
    assert.equal(TEXTOS.pt[k], des(txt).trim(), `PT de ${k} diferente do HTML`);
  }
  for (const [, k] of html.matchAll(/data-i18n-(?:aria|html)="([^"]+)"/g)) assert.ok(TEXTOS.pt[k] && TEXTOS.en[k], k);
  assert.ok(n > 30, 'esperava mais de 30 textos traduzíveis');
});

test('posts.json: arquivo válido e todos os posts com formato aceito pelo site', () => {
  const lista = JSON.parse(readFileSync(new URL('../data/posts.json', import.meta.url), 'utf8'));
  assert.ok(Array.isArray(lista), 'posts.json precisa ser uma lista');
  const validos = postsValidos(lista);
  const rejeitados = lista.filter((p) => !validos.includes(p)).map((p) => p?.url ?? JSON.stringify(p));
  assert.deepEqual(rejeitados, [], 'posts com formato inválido (url do LinkedIn, data AAAA-MM-DD, titulo, etapa)');
});

test('posts: validação rejeita formatos errados e ordena destaque, depois data', () => {
  const ok = { url: 'https://www.linkedin.com/posts/x', data: '2026-10-01', titulo: 'A' };
  assert.equal(postsValidos([ok, { ...ok, url: 'javascript:alert(1)' }, { ...ok, data: '01/10/2026' }, { ...ok, etapa: 'nada' }, null]).length, 1);
  assert.equal(postsValidos({}).length, 0);
  const ordem = ordenarPosts([{ ...ok, titulo: 'velho', data: '2025-01-01' }, { ...ok, titulo: 'novo', data: '2026-05-01' }, { ...ok, titulo: 'fixo', data: '2024-01-01', destaque: true }]);
  assert.deepEqual(ordem.map((p) => p.titulo), ['fixo', 'novo', 'velho']);
});

test('privacidade: nenhum número de celular nos arquivos publicados', () => {
  // padrão genérico (DDD + 9xxxx-xxxx): o número real nunca deve aparecer no repositório, nem aqui
  const celular = /\(?\b\d{2}\)?\s*9\d{4}[-\s]?\d{4}\b/;
  const raiz = new URL('../', import.meta.url);
  const arquivos = ['index.html', 'README.md', 'data/posts.json', 'css/style.css',
    ...readdirSync(new URL('js/', raiz)).map((f) => `js/${f}`)];
  for (const f of arquivos) assert.ok(!celular.test(readFileSync(new URL(f, raiz), 'utf8')), `${f} parece conter um telefone`);
});

test('stacks: todo ícone do Simple Icons usado no carrossel está em js/icones.js', () => {
  const faltando = STACKS.flat().filter((s) => s.si && !ICONES[s.si]).map((s) => s.si);
  assert.deepEqual(faltando, [], 'rode: node tools/gera-icones.mjs js/conteudo.js js/icones.js');
});

test('formas: determinísticas (mesma semente, mesmo resultado)', () => {
  const [a, b] = [gerarFormas(1000), gerarFormas(1000)];
  a.forEach((f, i) => assert.deepEqual(f.pos, b[i].pos));
});
