// Todo o conteúdo do site em um lugar. Fatos vêm do currículo e dos READMEs do GitHub: não inventar.

export const GITHUB = 'https://github.com/giogodoi';
export const LINKEDIN = 'https://www.linkedin.com/in/giovane-goliveira/';
export const EMAIL = 'giovanefelipego@hotmail.com';

// Textos fixos da página (data-i18n no HTML). O PT aqui precisa ser igual ao do index.html
export const TEXTOS = {
  pt: {
    'doc.titulo': 'Giovane Oliveira · Software Engineer & Data Scientist',
    'doc.desc': 'Portfólio de Giovane Oliveira: engenharia de software e ciência de dados com IA, do contexto à entrega, com projetos reais em cada etapa.',
    'nav.pular': 'Pular para o conteúdo',
    'nav.aria': 'Principal',
    'nav.metodo': 'Método',
    'nav.trajetoria': 'Trajetória',
    'nav.projetos': 'Projetos',
    'nav.posts': 'Posts',
    'nav.idioma': 'Idioma',
    'nav.cta': 'Fale comigo',
    'hero.titulo': 'Do contexto à entrega.',
    'hero.lead': 'Engenharia de software e ciência de dados com IA. Antes de escrever código, entendo o problema e os dados. Depois, reviso o que entrego.',
    'hero.prova': 'Na Agência Zetta, entreguei um MVP com RAG e agentes em 2,5 semanas. O prazo previsto era de 2 meses.',
    'hero.cta1': 'Ver o método',
    'hero.cta2': 'Ver meu GitHub',
    'sobre.titulo': 'Engenharia e dados, com foco em quem usa.',
    'sobre.p1': 'Estudo Ciência da Computação na UFLA (2024–2028), sou Software Engineer na Agência Zetta e pesquisador no NIAD, o núcleo de IA e ciência de dados da universidade. Trabalho onde automação, inteligência artificial e engenharia de software se encontram: RAG, agentes e pipelines de dados que tiram trabalho manual do caminho.',
    'sobre.p2': 'Uso Git com fluxo de branches, Scrum e Kanban, e prefiro código limpo a código esperto.',
    'sobre.f1n': '2,5',
    'sobre.f1': 'semanas para entregar um MVP com RAG e agentes. O previsto era 2 meses.',
    'sobre.f2': 'certificações da Anthropic: Claude, Claude Code, MCP e AI Fluency.',
    'sobre.f3': 'Destaque em Desenvolvimento de Software pela Agência Zetta.',
    'sobre.h1': 'Linguagens e ferramentas',
    'sobre.h2': 'Dados e IA',
    'sobre.h3': 'Arquitetura e processo',
    'metodo.titulo': 'Um método, cinco etapas.',
    'metodo.lead': 'As boas práticas que sigo em todo projeto, cada uma com um trabalho real onde apliquei.',
    'metodo.etapas': 'Etapas',
    'trajetoria.titulo': 'De onde vem o método.',
    'trajetoria.lead': 'Pesquisa, empresa júnior e agência de inovação: cada etapa foi aprendida em algum desses lugares.',
    'trajetoria.certs': 'Certificações',
    'projetos.titulo': 'Todo o código está aberto.',
    'projetos.lead': 'Repositórios públicos no GitHub, do mais recente ao mais antigo.',
    'posts.titulo': 'Engenharia, dados e IA. Temas diferentes, uma coisa em comum: <span>método</span>.',
    'posts.lead': 'Escrevo no LinkedIn sobre o que aprendo construindo.',
    'posts.cta': 'Faça parte da minha rede',
    'contato.titulo': 'Tem um problema para resolver? Começamos pelo contexto.',
    'contato.lead': 'Respondo por e-mail e pelo LinkedIn.',
    'rodape.feito': 'Feito à mão com HTML, CSS e Three.js.',
  },
  en: {
    'doc.titulo': 'Giovane Oliveira · Software Engineer & Data Scientist',
    'doc.desc': 'Giovane Oliveira’s portfolio: software engineering and data science with AI, from context to delivery, with real projects at every stage.',
    'nav.pular': 'Skip to content',
    'nav.aria': 'Main',
    'nav.metodo': 'Method',
    'nav.trajetoria': 'Journey',
    'nav.projetos': 'Projects',
    'nav.posts': 'Posts',
    'nav.idioma': 'Language',
    'nav.cta': 'Get in touch',
    'hero.titulo': 'From context to delivery.',
    'hero.lead': 'Software engineering and data science with AI. Before writing code, I understand the problem and the data. Afterwards, I review what I ship.',
    'hero.prova': 'At Agência Zetta, I shipped an MVP with RAG and agents in 2.5 weeks. The planned timeline was 2 months.',
    'hero.cta1': 'See the method',
    'hero.cta2': 'See my GitHub',
    'sobre.titulo': 'Engineering and data, built for the people who use it.',
    'sobre.p1': 'I study Computer Science at UFLA (2024–2028), work as a Software Engineer at Agência Zetta and research at NIAD, the university’s AI and data science lab. I work where automation, artificial intelligence and software engineering meet: RAG, agents and data pipelines that take manual work out of the way.',
    'sobre.p2': 'I use Git with a branching workflow, Scrum and Kanban, and I prefer clean code over clever code.',
    'sobre.f1n': '2.5',
    'sobre.f1': 'weeks to ship an MVP with RAG and agents. The plan was 2 months.',
    'sobre.f2': 'Anthropic certifications: Claude, Claude Code, MCP and AI Fluency.',
    'sobre.f3': 'Software Development Highlight award from Agência Zetta.',
    'sobre.h1': 'Languages and tools',
    'sobre.h2': 'Data and AI',
    'sobre.h3': 'Architecture and process',
    'metodo.titulo': 'One method, five stages.',
    'metodo.lead': 'The practices I follow on every project, each backed by real work where I applied it.',
    'metodo.etapas': 'Stages',
    'trajetoria.titulo': 'Where the method comes from.',
    'trajetoria.lead': 'Research, a student-run company and an innovation agency: each stage was learned in one of these places.',
    'trajetoria.certs': 'Certifications',
    'projetos.titulo': 'All the code is open.',
    'projetos.lead': 'Public repositories on GitHub, newest first.',
    'posts.titulo': 'Engineering, data and AI. Different topics, one thing in common: <span>method</span>.',
    'posts.lead': 'I write on LinkedIn about what I learn while building.',
    'posts.cta': 'Join my network',
    'contato.titulo': 'Got a problem to solve? We start with the context.',
    'contato.lead': 'I reply by email and on LinkedIn.',
    'rodape.feito': 'Handmade with HTML, CSS and Three.js.',
  },
};

// Rótulos da interface montados por JS
export const UI = {
  pt: {
    etapaDe: 'Etapa {n} de 5',
    ondeApliquei: 'Onde apliquei',
    experiencia: 'Experiência',
    projeto: 'Projeto',
    post: 'Post',
    irEtapa: 'Ir para a etapa {n}: {t}',
    abreGithub: 'abre no GitHub',
    lerLinkedin: 'Ler no LinkedIn',
    etapa: 'Etapa',
  },
  en: {
    etapaDe: 'Stage {n} of 5',
    ondeApliquei: 'Where I applied it',
    experiencia: 'Experience',
    projeto: 'Project',
    post: 'Post',
    irEtapa: 'Go to stage {n}: {t}',
    abreGithub: 'opens on GitHub',
    lerLinkedin: 'Read on LinkedIn',
    etapa: 'Stage',
  },
};

// Trajetória (currículo), da mais recente para a mais antiga
export const TRAJETORIA = [
  {
    org: 'Agência Zetta', quando: { pt: 'fev 2026 – atual', en: 'Feb 2026 – present' },
    pt: { cargo: 'Software Engineer', itens: ['Projetos com foco em sustentabilidade, eficiência de serviços e tecnologia de ponta na agência de inovação, geotecnologia e sistemas inteligentes da UFLA.', 'Destaque em Desenvolvimento de Software (set 2026).'] },
    en: { cargo: 'Software Engineer', itens: ['Projects focused on sustainability, service efficiency and cutting-edge technology at UFLA’s innovation, geotechnology and intelligent systems agency.', 'Software Development Highlight award (Sep 2026).'] },
  },
  {
    org: 'Agência Zetta', quando: { pt: 'fev – jun 2026', en: 'Feb – Jun 2026' },
    pt: { cargo: 'Pesquisador em Inteligência Artificial', itens: ['Pesquisa sobre IA no combate a incêndios florestais para um órgão federal, com MVP de RAG e agentes entregue em 2,5 semanas.', 'Análise de nuvem vs. infraestrutura local e protocolos de coleta para zonas sem conectividade.'] },
    en: { cargo: 'Artificial Intelligence Researcher', itens: ['Research on AI for fighting wildfires for a federal agency, with a RAG and agents MVP shipped in 2.5 weeks.', 'Cloud vs. on-premise analysis and data collection protocols for zones with no connectivity.'] },
  },
  {
    org: 'NIAD (UFLA)', quando: { pt: 'set 2025 – atual', en: 'Sep 2025 – present' },
    pt: { cargo: 'Pesquisador', itens: ['Machine learning, mineração de dados e redução de dados no núcleo de IA e ciência de dados da UFLA.'] },
    en: { cargo: 'Researcher', itens: ['Machine learning, data mining and data reduction at UFLA’s AI and data science lab.'] },
  },
  {
    org: 'NIAD (UFLA)', quando: { pt: 'jun – set 2025', en: 'Jun – Sep 2025' },
    pt: { cargo: 'Trainee', itens: ['IA de jogo da velha com MinMax e medição do ganho da poda alfa-beta, com métricas e gráficos.'] },
    en: { cargo: 'Trainee', itens: ['Tic-tac-toe AI with MinMax, measuring the gain from alpha-beta pruning with metrics and charts.'] },
  },
  {
    org: 'Comp Júnior', quando: { pt: 'mar – ago 2025', en: 'Mar – Aug 2025' },
    pt: { cargo: 'Diretor Comercial, Designer e Trainee', itens: ['Planejamento estratégico de marketing e vendas, com processos de integração da equipe no Miro e no Pipefy.', 'Protótipos no Figma, da baixa à alta fidelidade, a partir das ideias dos clientes.'] },
    en: { cargo: 'Sales Director, Designer and Trainee', itens: ['Strategic planning for marketing and sales, with team onboarding processes in Miro and Pipefy.', 'Figma prototypes, from low to high fidelity, built from clients’ ideas.'] },
  },
  {
    org: 'Unimed Guaxupé', quando: { pt: 'fev – set 2024', en: 'Feb – Sep 2024' },
    pt: { cargo: 'Assistente Administrativo', itens: ['Rotinas operacionais e resolução de problemas numa cooperativa de trabalho médico.'] },
    en: { cargo: 'Administrative Assistant', itens: ['Operational routines and problem solving at a medical cooperative.'] },
  },
];

export const FORMACAO = {
  org: 'Universidade Federal de Lavras (UFLA)', quando: { pt: 'set 2024 – jun 2028', en: 'Sep 2024 – Jun 2028' },
  pt: 'Bacharelado em Ciência da Computação', en: 'B.Sc. in Computer Science',
};

// Certificações por emissor; destaque = aparecem primeiro e com ênfase
export const CERTIFICACOES = [
  { emissor: 'Anthropic', destaque: true, itens: ['Claude Code 101', 'Claude 101', 'Introduction to Model Context Protocol', 'AI Fluency: Framework & Foundations'], quando: { pt: 'jun 2026', en: 'Jun 2026' } },
  { emissor: 'Microsoft', destaque: true, itens: { pt: ['Introdução a IA no Azure'], en: ['Introduction to AI on Azure'] }, quando: { pt: 'jul 2026', en: 'Jul 2026' } },
  { emissor: 'Even3', itens: { pt: ['Agentes de IA na Pesquisa Científica e Acadêmica'], en: ['AI Agents in Scientific and Academic Research'] }, quando: { pt: 'ago 2026', en: 'Aug 2026' } },
  { emissor: 'Udemy', itens: { pt: ['Automação com IA usando n8n'], en: ['AI Automation with n8n'] }, quando: { pt: 'mai 2026', en: 'May 2026' } },
  { emissor: 'RL&Associados', itens: ['Six Sigma White Belt'], quando: { pt: 'jan 2025', en: 'Jan 2025' } },
  { emissor: 'IBM SkillsBuild', itens: ['Working in a Digital World: Professional Skills'], quando: { pt: 'ago 2024', en: 'Aug 2024' } },
  { emissor: 'Fundação Bradesco', itens: { pt: ['Lei Geral de Proteção de Dados (LGPD)'], en: ['Brazilian General Data Protection Law (LGPD)'] }, quando: { pt: 'jan 2024', en: 'Jan 2024' } },
];

// Repositórios públicos. A chave é o nome do repo em github.com/giogodoi
export const PROJETOS = {
  'Ariranha': {
    nome: 'Ariranha', ano: 2026, stack: ['Spring Boot', 'React', 'PostGIS', 'Python', 'Docker'],
    pt: 'Monitoramento de focos de incêndio com dados do INPE e predição de ocorrência e severidade.',
    en: 'Wildfire monitoring with INPE data and prediction of occurrence and severity.',
  },
  'AVE---Algoritmo-de-Varredura-Emergencial': {
    nome: 'AVE', ano: 2026, stack: ['Python', 'XGBoost', 'DBSCAN', 'PostGIS', 'Flask'],
    pt: 'Ciência de dados para prever focos e severidade de queimadas no Brasil.',
    en: 'Data science to predict wildfire hotspots and severity in Brazil.',
  },
  'Zotion': {
    nome: 'Zotion', ano: 2026, stack: ['Java', 'JPA', 'TypeScript', 'Gemini', 'Docker'],
    pt: 'Organização pessoal com lembretes e notas, e extração de lembretes por IA.',
    en: 'Personal organizer with reminders and notes, plus AI reminder extraction.',
  },
  'DeuBranco': {
    nome: 'Deu Branco', ano: 2026, stack: ['React', 'TypeScript', 'Spring Boot', 'PostgreSQL', 'Docker'],
    pt: 'Plataforma de estudos competitivos para o ENEM, feita em equipe.',
    en: 'Competitive study platform for the ENEM exam, built as a team.',
  },
  'Prospeccao-Tecnologica': {
    nome: 'Agente com memória longa', ano: 2026, stack: ['n8n', 'PostgreSQL', 'Redis', 'Evolution API'],
    pt: 'Agente de atendimento no WhatsApp que lembra o último pedido de cada cliente.',
    en: 'WhatsApp support agent that remembers each customer’s last order.',
  },
  'CafeX-AppDesign': {
    nome: 'CafeX', ano: 2026, stack: ['Figma', 'Design system', 'IA'],
    pt: 'Protótipo de alta fidelidade para o Hackathon Avança Café 2026 e guia de design consciente com IA.',
    en: 'High-fidelity prototype for the Avança Café 2026 Hackathon and a guide to conscious design with AI.',
  },
  'ZettaLAB-Desafio-I': {
    nome: 'ZettaClima', ano: 2025, stack: ['React', 'TypeScript', 'Gemini'],
    pt: 'Consulta de clima com conselhos personalizados gerados por IA.',
    en: 'Weather lookup with personalized AI-generated advice.',
  },
  'TwoG': {
    nome: 'TwoG', ano: 2025, stack: ['PHP', 'MySQL'],
    pt: 'Sistema web de usuários e estúdios, com especialização modelada no banco de dados.',
    en: 'Web system for users and studios, with specialization modeled in the database.',
  },
  'Pesquisa-Operacional': {
    nome: 'Pesquisa Operacional', ano: 2026, stack: ['Python', 'Jupyter'],
    pt: 'Programação inteira no trabalho prático de Programação Matemática.',
    en: 'Integer programming for the Mathematical Programming course project.',
  },
  'Compiladores': {
    nome: 'Compiladores', ano: 2026, stack: ['C', 'Lex'],
    pt: 'Estudo completo da disciplina de Compiladores.',
    en: 'A complete study of the Compilers course.',
  },
  'mergesortmultiway': {
    nome: 'Merge sort multiway', ano: 2025, stack: ['C++'],
    pt: 'Ordenação externa com intercalação de múltiplos caminhos.',
    en: 'External sorting with multiway merging.',
  },
};

// As 5 etapas do método. id é usado pelo campo "etapa" de data/posts.json
export const ETAPAS = [
  {
    id: 'contexto',
    pt: {
      titulo: 'Contextualizar',
      resumo: 'Antes de qualquer linha de código, junto o máximo de informação sobre quem vai usar e o que precisa mudar.',
      praticas: ['Converso com quem vai usar e escrevo o problema em uma frase.', 'Separo requisito de desejo e deixo o escopo por escrito.', 'Defino o sistema de design e as restrições antes da primeira tela.'],
    },
    en: {
      titulo: 'Understand the context',
      resumo: 'Before any line of code, I gather as much as I can about who will use it and what needs to change.',
      praticas: ['I talk to the people who will use it and write the problem in one sentence.', 'I separate requirements from wishes and put the scope in writing.', 'I define the design system and constraints before the first screen.'],
    },
    evidencias: [
      { tipo: 'experiencia', org: 'Agência Zetta', pt: 'Pesquisa científica sobre IA no combate a incêndios florestais, partindo dos requisitos de um órgão federal.', en: 'Scientific research on AI for fighting wildfires, starting from a federal agency’s requirements.' },
      { tipo: 'experiencia', org: 'Comp Júnior', pt: 'Protótipos de baixa, média e alta fidelidade que transformam a ideia do cliente numa primeira versão digital.', en: 'Low, mid and high-fidelity prototypes that turn a client’s idea into a first digital version.' },
      { tipo: 'projeto', repo: 'CafeX-AppDesign', pt: 'Guia de design consciente: cores, tipografia e anti-padrões são definidos antes de gerar qualquer tela com IA.', en: 'Conscious design guide: colors, typography and anti-patterns are set before generating any screen with AI.' },
      { tipo: 'projeto', repo: 'DeuBranco', pt: 'Problema e solução documentados antes da arquitetura: por que estudar sozinho desmotiva e como a competição ajuda.', en: 'Problem and solution documented before the architecture: why studying alone is demotivating and how competition helps.' },
    ],
  },
  {
    id: 'dados',
    pt: {
      titulo: 'Estruturar a obtenção de dados',
      resumo: 'Decido de onde vêm os dados, como chegam e onde ficam, antes de depender deles.',
      praticas: ['Mapeio as fontes e o que acontece quando uma delas falha.', 'Modelo o banco a partir das consultas que o produto vai fazer.', 'Comparo nuvem e infraestrutura local pelos requisitos, não por hábito.'],
    },
    en: {
      titulo: 'Structure data collection',
      resumo: 'I decide where the data comes from, how it arrives and where it lives, before depending on it.',
      praticas: ['I map the sources and what happens when one of them fails.', 'I model the database from the queries the product will run.', 'I compare cloud and on-premise by requirements, not habit.'],
    },
    evidencias: [
      { tipo: 'experiencia', org: 'Agência Zetta', pt: 'Protocolos alternativos de coleta para zonas de incêndio sem sinal de satélite, e análise de nuvem vs. infraestrutura local.', en: 'Alternative collection protocols for wildfire zones with no satellite signal, plus a cloud vs. on-premise analysis.' },
      { tipo: 'projeto', repo: 'Ariranha', pt: 'Dados do INPE via WFS em tempo real, modelo relacional com JPA e geometrias no PostGIS.', en: 'Real-time INPE data via WFS, a relational model with JPA and geometries in PostGIS.' },
      { tipo: 'projeto', repo: 'Prospeccao-Tecnologica', pt: 'Memória longa por cliente para um agente de atendimento: PostgreSQL guarda o histórico, Redis cuida de fila e cache.', en: 'Long-term memory per customer for a support agent: PostgreSQL keeps the history, Redis handles queue and cache.' },
    ],
  },
  {
    id: 'limpeza',
    pt: {
      titulo: 'Preparar, limpar e reduzir',
      resumo: 'Dado bruto quase nunca está pronto. Limpo, crio as variáveis que importam e reduzo até sobrar o que é útil.',
      praticas: ['Trato ausentes e outliers com critério documentado.', 'Crio variáveis a partir do conhecimento do domínio.', 'Reduzo dimensão e volume antes de treinar qualquer modelo.'],
    },
    en: {
      titulo: 'Prepare, clean and reduce',
      resumo: 'Raw data is rarely ready. I clean it, build the features that matter and reduce it until only what’s useful is left.',
      praticas: ['I handle missing values and outliers with documented criteria.', 'I build features from domain knowledge.', 'I reduce dimensionality and volume before training any model.'],
    },
    evidencias: [
      { tipo: 'experiencia', org: 'NIAD (UFLA)', pt: 'Pesquisa em mineração de dados e técnicas de redução de dados no núcleo de IA e ciência de dados da UFLA.', en: 'Research on data mining and data reduction techniques at UFLA’s AI and data science lab.' },
      { tipo: 'projeto', repo: 'AVE---Algoritmo-de-Varredura-Emergencial', pt: 'CSV de cerca de 4 GB do INPE: feature engineering, clusters geoespaciais com DBSCAN e clima da NASA POWER.', en: 'A ~4 GB INPE CSV: feature engineering, geospatial clusters with DBSCAN and climate data from NASA POWER.' },
    ],
  },
  {
    id: 'codigo',
    pt: {
      titulo: 'Mãos ao código',
      resumo: 'Com contexto e dados prontos, o código anda rápido. Entrego em ciclos curtos, versionados e fáceis de revisar.',
      praticas: ['Começo pelo menor caminho que funciona de ponta a ponta.', 'Uso IA (RAG, agentes) onde ela tira trabalho manual de verdade.', 'Commits pequenos, uma branch por funcionalidade e código limpo.'],
    },
    en: {
      titulo: 'Hands on code',
      resumo: 'With context and data in place, code moves fast. I ship in short, versioned cycles that are easy to review.',
      praticas: ['I start with the smallest path that works end to end.', 'I use AI (RAG, agents) where it truly removes manual work.', 'Small commits, one branch per feature and clean code.'],
    },
    evidencias: [
      { tipo: 'experiencia', org: 'Agência Zetta', pt: 'MVP funcional com RAG e fluxos de agentes entregue em 2,5 semanas. A expectativa inicial era de 2 meses.', en: 'A working MVP with RAG and agentic workflows shipped in 2.5 weeks. The initial estimate was 2 months.' },
      { tipo: 'projeto', repo: 'Zotion', pt: 'O Gemini extrai lembretes de PDFs e imagens; o backend em Java persiste tudo com JPA.', en: 'Gemini extracts reminders from PDFs and images; the Java backend persists everything with JPA.' },
      { tipo: 'projeto', repo: 'ZettaLAB-Desafio-I', pt: 'Clima em tempo real (IBGE e OpenWeatherMap) com conselhos gerados pelo Gemini, em React e TypeScript.', en: 'Real-time weather (IBGE and OpenWeatherMap) with advice generated by Gemini, in React and TypeScript.' },
    ],
  },
  {
    id: 'entrega',
    pt: {
      titulo: 'Revisão e entrega',
      resumo: 'Só está pronto quando foi testado, medido e alguém além de mim consegue rodar.',
      praticas: ['Testo todas as rotas e deixo a coleção de testes junto do código.', 'Meço o ganho de cada otimização em vez de supor.', 'Empacoto com Docker e documento como executar.'],
    },
    en: {
      titulo: 'Review and delivery',
      resumo: 'It’s only done when it’s tested, measured, and someone other than me can run it.',
      praticas: ['I test every route and keep the test collection next to the code.', 'I measure the gain of each optimization instead of assuming it.', 'I package with Docker and document how to run it.'],
    },
    evidencias: [
      { tipo: 'experiencia', org: 'Agência Zetta', pt: 'Supervisão do ciclo de desenvolvimento até uma IA pronta para produção. Destaque em Desenvolvimento de Software (2026).', en: 'Oversaw the development lifecycle up to production-ready AI. Software Development Highlight award (2026).' },
      { tipo: 'experiencia', org: 'NIAD (UFLA)', pt: 'IA de jogo da velha com MinMax: o ganho da poda alfa-beta foi medido com métricas e gráficos.', en: 'Tic-tac-toe AI with MinMax: the gain from alpha-beta pruning was measured with metrics and charts.' },
      { tipo: 'projeto', repo: 'Zotion', pt: 'Testes de todas as rotas da API gravados em vídeo, com coleção do Postman pronta para importar.', en: 'Tests of every API route recorded on video, with a ready-to-import Postman collection.' },
      { tipo: 'projeto', repo: 'Ariranha', pt: 'Três módulos orquestrados com Docker Compose: backend, frontend e banco com PostGIS.', en: 'Three modules orchestrated with Docker Compose: backend, frontend and a PostGIS database.' },
    ],
  },
];
