// node --test tests/check.mjs
import test from 'node:test';
import assert from 'node:assert/strict';
import { gerarFormas, FORMAS } from '../js/formas.js';

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

test('formas: determinísticas (mesma semente, mesmo resultado)', () => {
  const [a, b] = [gerarFormas(1000), gerarFormas(1000)];
  a.forEach((f, i) => assert.deepEqual(f.pos, b[i].pos));
});
