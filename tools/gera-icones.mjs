// Gera js/icones.js com o path de cada ícone do Simple Icons usado no carrossel (versão fixa, licença CC0).
// Uso, na raiz do repositório: node tools/gera-icones.mjs js/conteudo.js js/icones.js
import { readFileSync, writeFileSync } from 'node:fs';
const [conteudo, saida] = process.argv.slice(2);
const V = '16.33.0';
const slugs = [...new Set([...readFileSync(conteudo, 'utf8').matchAll(/si: '([a-z0-9]+)'/g)].map((m) => m[1]))];
const linhas = [];
for (const s of slugs) {
  const svg = await (await fetch(`https://cdn.jsdelivr.net/npm/simple-icons@${V}/icons/${s}.svg`)).text();
  const d = svg.match(/<path d="([^"]+)"/)?.[1];
  if (!d || !/^[MmLlHhVvCcSsQqTtAaZz0-9.,\-\s]+$/.test(d)) throw new Error(`path inválido: ${s}`); // só comandos de path, nada de markup
  linhas.push(`  ${s}: '${d}',`);
}
writeFileSync(saida, `// Ícones do Simple Icons ${V} (CC0), só o path de cada um. Gerado a partir de js/conteudo.js.\n// Desenhados como SVG inline: máscaras CSS em elementos animados somem no Safari do iPhone.\nexport const ICONES = {\n${linhas.join('\n')}\n};\n`);
console.log(slugs.length, 'ícones');
