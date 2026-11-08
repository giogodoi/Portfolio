# Portfólio · Giovane Oliveira

Software Engineer & Data Scientist. Publicado em **https://giogodoi.github.io/Portfolio/**.

Landing page bilíngue (PT/EN) que mostra um método de engenharia em 5 etapas. A nuvem de partículas 3D muda de forma conforme a rolagem, e cada etapa traz projetos e experiências reais. Também tem um fluxo de agente de IA (n8n) interativo, a trajetória profissional, a lista de projetos e os posts do LinkedIn.

Feito sem framework e sem build: HTML, CSS e JavaScript em módulos.

## Rodar localmente

Os módulos ES não funcionam abrindo o arquivo direto (`file://`). Suba um servidor estático na raiz:

```bash
python -m http.server 8765
# ou
npx serve .
```

Depois abra http://127.0.0.1:8765/.

## Testes

```bash
node --test tests/check.mjs
```

Os testes verificam:
- as formas das partículas;
- a consistência do conteúdo (projetos citados existem, PT e EN têm as mesmas chaves, o PT do dicionário bate com o HTML);
- o formato de `data/posts.json`.

## Como adicionar um post do LinkedIn

O LinkedIn não oferece API pública para ler posts de perfil pessoal, então os posts ficam em `data/posts.json`.

1. No GitHub, abra `data/posts.json` na branch `main` e clique no lápis para editar.
2. Adicione um item à lista:

```json
{
  "url": "https://www.linkedin.com/posts/...",
  "data": "2026-11-20",
  "titulo": "Título curto do post",
  "resumo": "Uma ou duas frases sobre o post.",
  "etapa": "dados",
  "destaque": false
}
```

| Campo | Obrigatório | Regra |
|---|---|---|
| `url` | sim | Precisa começar com `https://www.linkedin.com/` |
| `data` | sim | Formato `AAAA-MM-DD` |
| `titulo` | sim | Texto |
| `resumo` | não | Texto |
| `etapa` | não | `contexto`, `dados`, `limpeza`, `codigo` ou `entrega`. O post também aparece dentro dessa etapa do método |
| `img` | não | Caminho de uma imagem no repositório, por exemplo `img/posts/meu-post.webp` |
| `destaque` | não | `true` fixa o post entre os 3 exibidos |

3. Faça o commit. Em cerca de 1 minuto o GitHub Pages republica o site. A seção de posts mostra os 3 mais recentes, com os marcados como `destaque` primeiro.
4. Sincronize a `develop`: `git checkout develop && git merge main && git push`.

Se o arquivo tiver um erro de formato, o site ignora o post inválido e continua no ar. O teste aponta qual post está errado.

## Onde editar o conteúdo

Todo o texto fica em `js/conteudo.js`:

| Constante | O que contém |
|---|---|
| `TEXTOS` | Textos fixos da página, em PT e EN. O PT precisa ser igual ao do `index.html` |
| `ETAPAS` | As 5 etapas do método e as evidências de cada uma |
| `FLUXO` | Os blocos do fluxo de agentes |
| `STACKS` | O carrossel de tecnologias. Ao adicionar um ícone do Simple Icons (`si`), rode `node tools/gera-icones.mjs js/conteudo.js js/icones.js` |
| `TRAJETORIA`, `FORMACAO`, `CERTIFICACOES` | Dados do currículo |
| `PROJETOS` | Repositórios públicos |

## Estrutura

```
index.html           página
css/style.css        estilos
js/main.js           inicialização, idioma, posts
js/conteudo.js       conteúdo PT/EN
js/metodo.js         seção do método (scroll sticky)
js/fluxo.js          fluxo de agentes interativo
js/secoes.js         stacks, trajetória, projetos, posts
js/particles.js      cena Three.js
js/formas.js         formas das partículas (módulo puro, testado)
js/icones.js         ícones do carrossel (paths do Simple Icons, gerado por tools/gera-icones.mjs)
data/posts.json      posts do LinkedIn
vendor/              biblioteca liquid-glass
tests/check.mjs      testes
```

## Fluxo de branches

O repositório segue GitFlow:
- `main` é o que está publicado.
- `develop` integra o trabalho.
- `feature/*` e `bugfix/*` saem de `develop` e voltam com `--no-ff`.
- `release/x.y.z` entra na `main` com tag.

A exceção são os posts novos, editados direto na `main`, como descrito acima.

## Créditos

- [liquid-glass](vendor/LICENSE-liquid-glass.txt) (MIT, Asimov Academy)
- [Three.js](https://threejs.org) (MIT)
- [Lenis](https://github.com/darkroomengineering/lenis) (MIT)
- Ícones do [Simple Icons](https://simpleicons.org) (CC0)
- Fontes Doto e Geist (SIL Open Font License)
