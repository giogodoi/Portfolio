// node --test tests/check.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { gerarFormas, FORMAS } from '../js/formas.js';
import { ETAPAS, PROJETOS, UI } from '../js/conteudo.js';

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
});

test('formas: determinísticas (mesma semente, mesmo resultado)', () => {
  const [a, b] = [gerarFormas(1000), gerarFormas(1000)];
  a.forEach((f, i) => assert.deepEqual(f.pos, b[i].pos));
});
