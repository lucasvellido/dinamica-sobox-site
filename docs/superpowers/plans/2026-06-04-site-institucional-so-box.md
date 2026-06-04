# Site Institucional Só Box — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Construir um site institucional estático de 3 páginas para a Só Box (esquadrias de alumínio, especialista em box de banheiro), com estilo "Industrial Clean", animações moderadas, contato por WhatsApp e telefone.

**Architecture:** Site estático puro — 3 arquivos HTML (`index.html`, `produtos.html`, `contato.html`), uma folha de estilo compartilhada (`styles.css`) e um script (`main.js`) para animações/interações. Cabeçalho e rodapé são markup repetido em cada página. Sem framework, sem build, sem Node. Abre com dois cliques no navegador.

**Tech Stack:** HTML5, CSS3 (custom properties, flexbox/grid, animações CSS), JavaScript vanilla (`IntersectionObserver` para scroll, contador animado). Fotos placeholder do Unsplash via URL.

> **Nota sobre "testes":** não há suíte automatizada. A verificação de cada tarefa é **abrir o arquivo no navegador** e conferir o comportamento descrito. Onde houver `Verificar:`, siga literalmente.

> **Nota sobre placeholders:** telefone/WhatsApp são fictícios e DEVEM ser marcados com `<!-- TROCAR -->` no HTML. Use o número `+55 19 99999-0000` como placeholder consistente em todo o site (link wa.me: `5519999990000`).

---

## Estrutura de arquivos

```
/
├── index.html        # Página inicial
├── produtos.html     # Produtos/serviços + galeria
├── contato.html      # Contato (WhatsApp + telefone)
├── styles.css        # Estilos compartilhados (todas as páginas)
├── main.js           # Animações e interações (todas as páginas)
└── docs/ , mockups/  # já existentes (spec e referência de estilo)
```

Responsabilidades:
- **`styles.css`** — único ponto de verdade visual: variáveis de cor, tipografia, cabeçalho, rodapé, botões, cards, banner, galeria, botão flutuante de WhatsApp, responsividade.
- **`main.js`** — comportamentos: menu mobile (toggle), animações de scroll (`IntersectionObserver`), contador de números, ano dinâmico no rodapé.
- Cada HTML — conteúdo da página + cabeçalho/rodapé repetidos.

---

## Task 0: Inicializar repositório git

**Files:**
- Create: `.gitignore`

- [ ] **Step 1: Inicializar git e criar .gitignore**

Conteúdo de `.gitignore`:
```
.superpowers/
.DS_Store
*.log
```

- [ ] **Step 2: Primeiro commit**

```bash
cd /home/lucasvellido/Documentos/Pessoal/SiteNene
git init
git add .gitignore docs mockups
git commit -m "chore: inicializa repositório com spec e referência de estilo"
```

Expected: commit criado com sucesso.

---

## Task 1: Folha de estilo base (variáveis, reset, tipografia)

**Files:**
- Create: `styles.css`

- [ ] **Step 1: Criar styles.css com fundação visual**

```css
/* ===== Variáveis — Identidade "Industrial Clean" ===== */
:root {
  --azul: #37474f;       /* cinza-metálico escuro (primária) */
  --azul-claro: #546e7a; /* cinza-metálico médio */
  --laranja: #ff7043;    /* destaque / CTA */
  --laranja-escuro: #f4511e;
  --cinza-card: #cfd8dc;
  --cinza-bg: #eceff1;
  --branco: #ffffff;
  --texto: #263238;
  --texto-claro: #607d8b;
  --sombra: 0 8px 24px rgba(0,0,0,.12);
  --radius: 10px;
  --max: 1140px;
}

/* ===== Reset ===== */
*, *::before, *::after { margin: 0; padding: 0; box-sizing: border-box; }
html { scroll-behavior: smooth; }
body {
  font-family: system-ui, "Segoe UI", Roboto, Helvetica, Arial, sans-serif;
  color: var(--texto);
  background: var(--branco);
  line-height: 1.6;
}
img { max-width: 100%; display: block; }
a { color: inherit; text-decoration: none; }

/* ===== Utilidades ===== */
.container { max-width: var(--max); margin: 0 auto; padding: 0 20px; }
.section { padding: 72px 0; }
.section--cinza { background: var(--cinza-bg); }
.titulo-secao { font-size: 30px; font-weight: 800; margin-bottom: 12px; color: var(--azul); }
.subtitulo-secao { color: var(--texto-claro); margin-bottom: 40px; max-width: 640px; }
.text-center { text-align: center; }
```

- [ ] **Step 2: Verificar**

Abrir qualquer HTML que linke esse CSS depois. Por enquanto, `Verificar:` o arquivo existe e não tem erro de sintaxe (abrir no editor). Sem render ainda.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: adiciona fundação de estilos (variáveis, reset, tipografia)"
```

---

## Task 2: Estilos de cabeçalho, rodapé e botões

**Files:**
- Modify: `styles.css` (anexar ao final)

- [ ] **Step 1: Anexar estilos de header/footer/botões em styles.css**

```css
/* ===== Botões ===== */
.btn {
  display: inline-block;
  padding: 12px 24px;
  border-radius: 6px;
  font-weight: 700;
  font-size: 15px;
  cursor: pointer;
  border: none;
  transition: transform .2s ease, box-shadow .2s ease, background .2s ease;
}
.btn--laranja { background: var(--laranja); color: #fff; }
.btn--laranja:hover { background: var(--laranja-escuro); transform: translateY(-2px); box-shadow: 0 6px 16px rgba(244,81,30,.4); }
.btn--branco { background: #fff; color: var(--azul); }
.btn--branco:hover { transform: translateY(-2px); box-shadow: var(--sombra); }

/* ===== Cabeçalho fixo ===== */
.header {
  position: sticky; top: 0; z-index: 100;
  background: rgba(255,255,255,.97);
  box-shadow: 0 2px 8px rgba(0,0,0,.08);
  backdrop-filter: blur(6px);
}
.header .container { display: flex; align-items: center; height: 68px; }
.logo { font-size: 22px; font-weight: 800; letter-spacing: 1px; color: var(--azul); }
.logo span { color: var(--laranja); }
.nav { margin-left: auto; display: flex; align-items: center; gap: 28px; }
.nav a { font-weight: 600; color: var(--texto); transition: color .2s; }
.nav a:hover, .nav a.ativo { color: var(--laranja); }
.nav .btn { padding: 9px 18px; font-size: 14px; }
.menu-toggle { display: none; background: none; border: none; font-size: 26px; cursor: pointer; color: var(--azul); margin-left: auto; }

/* ===== Rodapé ===== */
.footer { background: var(--azul); color: #cfd8dc; padding: 48px 0 24px; }
.footer .grid { display: flex; flex-wrap: wrap; gap: 40px; justify-content: space-between; }
.footer h4 { color: #fff; margin-bottom: 12px; font-size: 17px; }
.footer a:hover { color: var(--laranja); }
.footer .copyright { border-top: 1px solid rgba(255,255,255,.15); margin-top: 32px; padding-top: 18px; font-size: 13px; text-align: center; }

/* ===== Responsivo ===== */
@media (max-width: 760px) {
  .nav { display: none; position: absolute; top: 68px; left: 0; right: 0; flex-direction: column; background: #fff; padding: 18px 20px; gap: 16px; box-shadow: var(--sombra); }
  .nav.aberto { display: flex; }
  .menu-toggle { display: block; }
  .titulo-secao { font-size: 24px; }
}
```

- [ ] **Step 2: Commit**

```bash
git add styles.css
git commit -m "feat: estilos de cabeçalho, rodapé e botões"
```

---

## Task 3: Página Início — estrutura HTML

**Files:**
- Create: `index.html`

- [ ] **Step 1: Criar index.html completo**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Só Box — Esquadrias de alumínio em Campinas e região</title>
  <meta name="description" content="Especialistas em box de banheiro em alumínio. Também janelas, portas e esquadrias sob medida em Campinas e região.">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <!-- ===== Cabeçalho ===== -->
  <header class="header">
    <div class="container">
      <a href="index.html" class="logo">SÓ<span>BOX</span></a>
      <button class="menu-toggle" aria-label="Abrir menu">&#9776;</button>
      <nav class="nav">
        <a href="index.html" class="ativo">Início</a>
        <a href="produtos.html">Produtos</a>
        <a href="contato.html">Contato</a>
        <!-- TROCAR: número de WhatsApp -->
        <a href="https://wa.me/5519999990000" class="btn btn--laranja" target="_blank" rel="noopener">Orçamento</a>
      </nav>
    </div>
  </header>

  <!-- ===== Banner (hero) ===== -->
  <section class="hero">
    <div class="hero__bg"></div>
    <div class="container hero__conteudo">
      <h1 class="hero__titulo">Especialistas em box de banheiro em alumínio</h1>
      <p class="hero__sub">E também janelas, portas e esquadrias sob medida · Campinas e região</p>
      <!-- TROCAR: número de WhatsApp -->
      <a href="https://wa.me/5519999990000" class="btn btn--laranja" target="_blank" rel="noopener">Pedir orçamento no WhatsApp</a>
    </div>
  </section>

  <!-- ===== Sobre rápido ===== -->
  <section class="section">
    <div class="container text-center">
      <h2 class="titulo-secao reveal">Qualidade que se vê e dura</h2>
      <p class="subtitulo-secao reveal" style="margin: 0 auto;">A Só Box fabrica e instala box de banheiro e esquadrias de alumínio sob medida, unindo acabamento de qualidade, atendimento próximo e prazos que cabem na sua obra — atendendo casas, apartamentos e empresas em Campinas e região.</p>
    </div>
  </section>

  <!-- ===== Faixa de números ===== -->
  <section class="numeros">
    <div class="container numeros__grid">
      <div class="numero reveal"><span class="numero__valor" data-alvo="15">0</span><span class="numero__sufixo">+</span><p>anos de experiência</p></div>
      <div class="numero reveal"><span class="numero__valor" data-alvo="500">0</span><span class="numero__sufixo">+</span><p>boxes instalados</p></div>
      <div class="numero reveal"><span class="numero__valor" data-alvo="100">0</span><span class="numero__sufixo">%</span><p>sob medida</p></div>
    </div>
  </section>

  <!-- ===== Destaques / serviços ===== -->
  <section class="section section--cinza">
    <div class="container text-center">
      <h2 class="titulo-secao reveal">O que fazemos</h2>
      <p class="subtitulo-secao reveal" style="margin: 0 auto;">Nossa especialidade é box — e fazemos a linha completa de esquadrias.</p>
      <div class="cards-destaque">
        <a href="produtos.html" class="card-destaque card-destaque--principal reveal">
          <div class="card-destaque__img" style="background-image:url('https://images.unsplash.com/photo-1620626011761-996317b8d101?w=800&q=80')"></div>
          <div class="card-destaque__corpo">
            <h3>Box de banheiro</h3>
            <p>Nossa especialidade: box de correr, frontal, de canto e linha premium.</p>
          </div>
        </a>
        <a href="produtos.html" class="card-destaque reveal">
          <div class="card-destaque__img" style="background-image:url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=800&q=80')"></div>
          <div class="card-destaque__corpo"><h3>Janelas e portas</h3><p>Sob medida, em diversos modelos e cores.</p></div>
        </a>
        <a href="produtos.html" class="card-destaque reveal">
          <div class="card-destaque__img" style="background-image:url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=800&q=80')"></div>
          <div class="card-destaque__corpo"><h3>Sacadas e fachadas</h3><p>Guarda-corpo, sacadas e fechamentos comerciais.</p></div>
        </a>
      </div>
    </div>
  </section>

  <!-- ===== Chamada final ===== -->
  <section class="cta-final">
    <div class="container text-center">
      <h2 class="reveal">Vamos fazer seu orçamento?</h2>
      <p class="reveal">Atendimento rápido pelo WhatsApp ou telefone.</p>
      <!-- TROCAR: número de WhatsApp -->
      <a href="https://wa.me/5519999990000" class="btn btn--branco reveal" target="_blank" rel="noopener">Falar no WhatsApp</a>
    </div>
  </section>

  <!-- ===== Rodapé ===== -->
  <footer class="footer">
    <div class="container">
      <div class="grid">
        <div>
          <h4>SÓ BOX</h4>
          <p>Box de banheiro e esquadrias de alumínio sob medida.<br>Campinas e região.</p>
        </div>
        <div>
          <h4>Contato</h4>
          <!-- TROCAR: telefone e WhatsApp -->
          <p><a href="tel:+5519999990000">(19) 99999-0000</a></p>
          <p><a href="https://wa.me/5519999990000" target="_blank" rel="noopener">WhatsApp</a></p>
        </div>
        <div>
          <h4>Páginas</h4>
          <p><a href="index.html">Início</a></p>
          <p><a href="produtos.html">Produtos</a></p>
          <p><a href="contato.html">Contato</a></p>
        </div>
      </div>
      <div class="copyright">© <span id="ano"></span> Só Box · Esquadrias de alumínio · Campinas/SP</div>
    </div>
  </footer>

  <!-- ===== Botão flutuante WhatsApp ===== -->
  <!-- TROCAR: número de WhatsApp -->
  <a href="https://wa.me/5519999990000" class="whats-float" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">
    <svg viewBox="0 0 32 32" width="30" height="30" fill="#fff"><path d="M16 .4C7.4.4.4 7.4.4 16c0 2.8.7 5.4 2 7.8L.3 31.7l8.1-2.1c2.3 1.2 4.9 1.9 7.6 1.9 8.6 0 15.6-7 15.6-15.6S24.6.4 16 .4zm0 28.3c-2.4 0-4.7-.6-6.7-1.8l-.5-.3-4.8 1.3 1.3-4.7-.3-.5c-1.3-2.1-2-4.5-2-7 0-7.2 5.9-13.1 13.1-13.1S29.1 8.8 29.1 16 23.2 28.7 16 28.7zm7.2-9.8c-.4-.2-2.3-1.2-2.7-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.2 1.5-.2.2-.4.3-.8.1-2.3-1.2-3.9-2.1-5.4-4.7-.4-.7.4-.6 1.1-2.1.1-.2 0-.4 0-.6 0-.2-.9-2.1-1.2-2.9-.3-.8-.6-.6-.9-.7h-.7c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.5 3.8 6 5.3 2.2 1 3.1 1 4.2.9.7-.1 2.3-.9 2.6-1.8.3-.9.3-1.6.2-1.8-.1-.2-.3-.3-.7-.5z"/></svg>
  </a>

  <script src="main.js"></script>
</body>
</html>
```

- [ ] **Step 2: Verificar**

Abrir `index.html` no navegador (dois cliques). `Verificar:` cabeçalho aparece, banner com título sobre box, faixa de números (mostrando "0+" por enquanto), 3 cards, chamada final, rodapé com ano vazio. Estilos do banner/números/cards ainda não existem (vêm na Task 5) — layout pode estar cru, é esperado.

- [ ] **Step 3: Commit**

```bash
git add index.html
git commit -m "feat: estrutura HTML da página inicial"
```

---

## Task 4: JavaScript — menu mobile, scroll reveal, contador, ano

**Files:**
- Create: `main.js`

- [ ] **Step 1: Criar main.js**

```javascript
// ===== Menu mobile =====
const toggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.nav');
if (toggle && nav) {
  toggle.addEventListener('click', () => nav.classList.toggle('aberto'));
}

// ===== Ano dinâmico no rodapé =====
const anoEl = document.getElementById('ano');
if (anoEl) anoEl.textContent = new Date().getFullYear();

// ===== Scroll reveal (fade/slide ao rolar) =====
const reveals = document.querySelectorAll('.reveal');
const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visivel');
      revealObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.15 });
reveals.forEach((el) => revealObserver.observe(el));

// ===== Contador animado de números =====
function animarContador(el) {
  const alvo = parseInt(el.dataset.alvo, 10);
  const duracao = 1500;
  const inicio = performance.now();
  function passo(agora) {
    const progresso = Math.min((agora - inicio) / duracao, 1);
    el.textContent = Math.floor(progresso * alvo);
    if (progresso < 1) requestAnimationFrame(passo);
    else el.textContent = alvo;
  }
  requestAnimationFrame(passo);
}
const contadores = document.querySelectorAll('.numero__valor');
const contadorObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      animarContador(entry.target);
      contadorObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });
contadores.forEach((el) => contadorObserver.observe(el));
```

- [ ] **Step 2: Verificar**

Recarregar `index.html`. `Verificar:` no celular/janela estreita o menu vira hambúrguer e abre ao clicar; o ano aparece no rodapé. Contador e reveal só ficarão visíveis após a Task 5 (estilos do `.reveal` e `.numeros`), mas o JS não deve gerar erro no console (F12 → Console limpo).

- [ ] **Step 3: Commit**

```bash
git add main.js
git commit -m "feat: JS de menu mobile, scroll reveal, contador e ano"
```

---

## Task 5: Estilos de banner, números, cards, chamada final e animações

**Files:**
- Modify: `styles.css` (anexar ao final)

- [ ] **Step 1: Anexar estilos de seções da home + animações em styles.css**

```css
/* ===== Banner (hero) ===== */
.hero { position: relative; min-height: 78vh; display: flex; align-items: center; overflow: hidden; }
.hero__bg {
  position: absolute; inset: 0;
  background-image: linear-gradient(rgba(38,50,56,.55), rgba(38,50,56,.65)), url('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&q=80');
  background-size: cover; background-position: center;
  animation: zoomLento 18s ease-in-out infinite alternate;
}
@keyframes zoomLento { from { transform: scale(1); } to { transform: scale(1.12); } }
.hero__conteudo { position: relative; color: #fff; max-width: 720px; }
.hero__titulo { font-size: 46px; font-weight: 800; line-height: 1.1; }
.hero__sub { font-size: 19px; margin: 18px 0 28px; opacity: .95; }

/* ===== Faixa de números ===== */
.numeros { background: var(--azul); color: #fff; padding: 54px 0; }
.numeros__grid { display: flex; justify-content: space-around; flex-wrap: wrap; gap: 30px; text-align: center; }
.numero__valor { font-size: 48px; font-weight: 800; color: var(--laranja); }
.numero__sufixo { font-size: 36px; font-weight: 800; color: var(--laranja); }
.numero p { margin-top: 4px; opacity: .9; }

/* ===== Cards de destaque ===== */
.cards-destaque { display: grid; grid-template-columns: repeat(3, 1fr); gap: 24px; margin-top: 16px; }
.card-destaque {
  background: #fff; border-radius: var(--radius); overflow: hidden; box-shadow: var(--sombra);
  text-align: left; transition: transform .25s ease, box-shadow .25s ease;
}
.card-destaque:hover { transform: translateY(-6px); box-shadow: 0 14px 32px rgba(0,0,0,.18); }
.card-destaque__img { height: 190px; background-size: cover; background-position: center; transition: transform .4s ease; }
.card-destaque:hover .card-destaque__img { transform: scale(1.06); }
.card-destaque__corpo { padding: 20px; }
.card-destaque__corpo h3 { color: var(--azul); margin-bottom: 6px; }
.card-destaque__corpo p { color: var(--texto-claro); font-size: 15px; }
.card-destaque--principal { grid-column: span 1; border: 2px solid var(--laranja); }
.card-destaque--principal .card-destaque__img { height: 230px; }

/* ===== Chamada final ===== */
.cta-final { background: linear-gradient(120deg, var(--azul), var(--azul-claro)); color: #fff; padding: 64px 0; text-align: center; }
.cta-final h2 { font-size: 30px; font-weight: 800; margin-bottom: 10px; }
.cta-final p { margin-bottom: 24px; opacity: .95; }

/* ===== Botão flutuante WhatsApp ===== */
.whats-float {
  position: fixed; bottom: 22px; right: 22px; z-index: 200;
  width: 58px; height: 58px; border-radius: 50%;
  background: #25d366; display: flex; align-items: center; justify-content: center;
  box-shadow: 0 6px 18px rgba(0,0,0,.3); transition: transform .2s ease;
}
.whats-float:hover { transform: scale(1.1); }

/* ===== Animação de revelação ao rolar ===== */
.reveal { opacity: 0; transform: translateY(28px); transition: opacity .6s ease, transform .6s ease; }
.reveal.visivel { opacity: 1; transform: translateY(0); }

/* ===== Responsivo ===== */
@media (max-width: 760px) {
  .hero__titulo { font-size: 32px; }
  .hero__sub { font-size: 16px; }
  .cards-destaque { grid-template-columns: 1fr; }
}
```

- [ ] **Step 2: Verificar**

Recarregar `index.html`. `Verificar:` (1) banner com imagem escurecida e zoom lento contínuo; (2) ao rolar, os blocos surgem com fade/slide; (3) ao entrar na faixa, os números contam de 0 até 15/500/100; (4) hover nos cards levanta o card e dá zoom na imagem; (5) botão verde flutuante do WhatsApp no canto inferior direito.

- [ ] **Step 3: Commit**

```bash
git add styles.css
git commit -m "feat: estilos e animações das seções da home"
```

---

## Task 6: Página Produtos — HTML + estilos

**Files:**
- Create: `produtos.html`
- Modify: `styles.css` (anexar estilos de banner-interno e galeria)

- [ ] **Step 1: Anexar estilos de banner-interno e galeria em styles.css**

```css
/* ===== Banner interno (páginas secundárias) ===== */
.banner-interno {
  position: relative; padding: 70px 0; text-align: center; color: #fff; overflow: hidden;
}
.banner-interno::before {
  content: ''; position: absolute; inset: 0;
  background-image: linear-gradient(rgba(38,50,56,.6), rgba(38,50,56,.7)), url('https://images.unsplash.com/photo-1584622650111-993a426fbf0a?w=1600&q=80');
  background-size: cover; background-position: center;
}
.banner-interno h1 { position: relative; font-size: 38px; font-weight: 800; }
.banner-interno p { position: relative; opacity: .95; margin-top: 8px; }

/* ===== Bloco de produto ===== */
.produto { display: grid; grid-template-columns: 1fr 1fr; gap: 40px; align-items: center; margin-bottom: 56px; }
.produto:last-child { margin-bottom: 0; }
.produto__img { height: 320px; border-radius: var(--radius); background-size: cover; background-position: center; box-shadow: var(--sombra); }
.produto--destaque .produto__img { height: 400px; border: 3px solid var(--laranja); }
.produto h2 { font-size: 28px; color: var(--azul); margin-bottom: 8px; }
.produto .selo { display: inline-block; background: var(--laranja); color: #fff; font-size: 12px; font-weight: 700; padding: 4px 12px; border-radius: 20px; margin-bottom: 10px; text-transform: uppercase; letter-spacing: .5px; }
.produto p { color: var(--texto-claro); margin-bottom: 8px; }
.produto ul { color: var(--texto-claro); margin-left: 18px; }
.produto--inverso .produto__img { order: 2; }

/* ===== Galeria ===== */
.galeria { display: grid; grid-template-columns: repeat(3, 1fr); gap: 14px; }
.galeria__item { height: 200px; border-radius: 8px; background-size: cover; background-position: center; overflow: hidden; box-shadow: var(--sombra); transition: transform .35s ease; }
.galeria__item:hover { transform: scale(1.04); }

@media (max-width: 760px) {
  .produto, .produto--inverso .produto__img { grid-template-columns: 1fr; order: 0; }
  .galeria { grid-template-columns: 1fr 1fr; }
}
```

- [ ] **Step 2: Criar produtos.html**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Produtos — Só Box | Box, janelas, portas e esquadrias</title>
  <meta name="description" content="Box de banheiro sob medida, janelas, portas, sacadas, guarda-corpo e fechamentos comerciais em alumínio. Campinas e região.">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="header">
    <div class="container">
      <a href="index.html" class="logo">SÓ<span>BOX</span></a>
      <button class="menu-toggle" aria-label="Abrir menu">&#9776;</button>
      <nav class="nav">
        <a href="index.html">Início</a>
        <a href="produtos.html" class="ativo">Produtos</a>
        <a href="contato.html">Contato</a>
        <!-- TROCAR: número de WhatsApp -->
        <a href="https://wa.me/5519999990000" class="btn btn--laranja" target="_blank" rel="noopener">Orçamento</a>
      </nav>
    </div>
  </header>

  <section class="banner-interno">
    <div class="container">
      <h1>Nossos produtos</h1>
      <p>Especialistas em box — e a linha completa de esquadrias de alumínio</p>
    </div>
  </section>

  <!-- Box — destaque principal -->
  <section class="section">
    <div class="container">
      <div class="produto produto--destaque reveal">
        <div class="produto__img" style="background-image:url('https://images.unsplash.com/photo-1620626011761-996317b8d101?w=900&q=80')"></div>
        <div>
          <span class="selo">Nossa especialidade</span>
          <h2>Box de banheiro</h2>
          <p>Fabricação e instalação sob medida, com vidro temperado e perfis de alumínio de qualidade. Modelos:</p>
          <ul>
            <li>Box de correr</li>
            <li>Box frontal</li>
            <li>Box de canto</li>
            <li>Linha Elegance / Premium</li>
          </ul>
        </div>
      </div>
    </div>
  </section>

  <!-- Demais produtos -->
  <section class="section section--cinza">
    <div class="container">
      <div class="produto produto--inverso reveal">
        <div class="produto__img" style="background-image:url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=900&q=80')"></div>
        <div>
          <h2>Janelas e portas</h2>
          <p>Janelas de correr, maxim-ar, basculantes e portas de alumínio sob medida, em diversas cores e modelos, para casas e apartamentos.</p>
        </div>
      </div>
      <div class="produto reveal">
        <div class="produto__img" style="background-image:url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=900&q=80')"></div>
        <div>
          <h2>Sacadas e guarda-corpo</h2>
          <p>Fechamento de sacadas, guarda-corpo em alumínio e vidro, com segurança e acabamento moderno.</p>
        </div>
      </div>
      <div class="produto produto--inverso reveal">
        <div class="produto__img" style="background-image:url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=900&q=80')"></div>
        <div>
          <h2>Fechamentos comerciais e fachadas</h2>
          <p>Esquadrias para lojas, escritórios e obras: fachadas em alumínio e vidro, portas comerciais e divisórias.</p>
        </div>
      </div>
    </div>
  </section>

  <!-- Galeria -->
  <section class="section">
    <div class="container text-center">
      <h2 class="titulo-secao reveal">Galeria de trabalhos</h2>
      <p class="subtitulo-secao reveal" style="margin:0 auto;">Alguns exemplos do nosso trabalho (imagens ilustrativas).</p>
      <div class="galeria">
        <div class="galeria__item reveal" style="background-image:url('https://images.unsplash.com/photo-1620626011761-996317b8d101?w=600&q=80')"></div>
        <div class="galeria__item reveal" style="background-image:url('https://images.unsplash.com/photo-1604709177225-055f99402ea3?w=600&q=80')"></div>
        <div class="galeria__item reveal" style="background-image:url('https://images.unsplash.com/photo-1556909212-d5b604d0c90d?w=600&q=80')"></div>
        <div class="galeria__item reveal" style="background-image:url('https://images.unsplash.com/photo-1503387762-592deb58ef4e?w=600&q=80')"></div>
        <div class="galeria__item reveal" style="background-image:url('https://images.unsplash.com/photo-1545324418-cc1a3fa10c00?w=600&q=80')"></div>
        <div class="galeria__item reveal" style="background-image:url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=600&q=80')"></div>
      </div>
    </div>
  </section>

  <section class="cta-final">
    <div class="container text-center">
      <h2 class="reveal">Gostou? Faça seu orçamento</h2>
      <p class="reveal">Atendimento rápido pelo WhatsApp ou telefone.</p>
      <!-- TROCAR: número de WhatsApp -->
      <a href="https://wa.me/5519999990000" class="btn btn--branco reveal" target="_blank" rel="noopener">Falar no WhatsApp</a>
    </div>
  </section>

  <footer class="footer">
    <div class="container">
      <div class="grid">
        <div><h4>SÓ BOX</h4><p>Box de banheiro e esquadrias de alumínio sob medida.<br>Campinas e região.</p></div>
        <div><h4>Contato</h4>
          <!-- TROCAR: telefone e WhatsApp -->
          <p><a href="tel:+5519999990000">(19) 99999-0000</a></p>
          <p><a href="https://wa.me/5519999990000" target="_blank" rel="noopener">WhatsApp</a></p>
        </div>
        <div><h4>Páginas</h4><p><a href="index.html">Início</a></p><p><a href="produtos.html">Produtos</a></p><p><a href="contato.html">Contato</a></p></div>
      </div>
      <div class="copyright">© <span id="ano"></span> Só Box · Esquadrias de alumínio · Campinas/SP</div>
    </div>
  </footer>

  <!-- TROCAR: número de WhatsApp -->
  <a href="https://wa.me/5519999990000" class="whats-float" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">
    <svg viewBox="0 0 32 32" width="30" height="30" fill="#fff"><path d="M16 .4C7.4.4.4 7.4.4 16c0 2.8.7 5.4 2 7.8L.3 31.7l8.1-2.1c2.3 1.2 4.9 1.9 7.6 1.9 8.6 0 15.6-7 15.6-15.6S24.6.4 16 .4zm0 28.3c-2.4 0-4.7-.6-6.7-1.8l-.5-.3-4.8 1.3 1.3-4.7-.3-.5c-1.3-2.1-2-4.5-2-7 0-7.2 5.9-13.1 13.1-13.1S29.1 8.8 29.1 16 23.2 28.7 16 28.7zm7.2-9.8c-.4-.2-2.3-1.2-2.7-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.2 1.5-.2.2-.4.3-.8.1-2.3-1.2-3.9-2.1-5.4-4.7-.4-.7.4-.6 1.1-2.1.1-.2 0-.4 0-.6 0-.2-.9-2.1-1.2-2.9-.3-.8-.6-.6-.9-.7h-.7c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.5 3.8 6 5.3 2.2 1 3.1 1 4.2.9.7-.1 2.3-.9 2.6-1.8.3-.9.3-1.6.2-1.8-.1-.2-.3-.3-.7-.5z"/></svg>
  </a>

  <script src="main.js"></script>
</body>
</html>
```

- [ ] **Step 3: Verificar**

Abrir `produtos.html`. `Verificar:` banner interno; bloco de Box com selo "Nossa especialidade", imagem maior e borda laranja; três blocos alternados (janelas/portas, sacadas, comerciais); galeria 3 colunas com zoom no hover; reveal ao rolar; menu, rodapé e botão flutuante presentes; navegação entre páginas funciona.

- [ ] **Step 4: Commit**

```bash
git add produtos.html styles.css
git commit -m "feat: página de produtos com box em destaque e galeria"
```

---

## Task 7: Página Contato — HTML + estilos

**Files:**
- Create: `contato.html`
- Modify: `styles.css` (anexar estilos dos blocos de contato)

- [ ] **Step 1: Anexar estilos de contato em styles.css**

```css
/* ===== Blocos de contato ===== */
.contato-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 24px; max-width: 760px; margin: 0 auto; }
.contato-card {
  background: #fff; border-radius: var(--radius); box-shadow: var(--sombra);
  padding: 36px 28px; text-align: center; transition: transform .25s ease;
}
.contato-card:hover { transform: translateY(-5px); }
.contato-card__icone { width: 64px; height: 64px; border-radius: 50%; display: flex; align-items: center; justify-content: center; margin: 0 auto 16px; }
.contato-card__icone--whats { background: #25d366; }
.contato-card__icone--tel { background: var(--azul); }
.contato-card h3 { color: var(--azul); margin-bottom: 6px; }
.contato-card p { color: var(--texto-claro); margin-bottom: 16px; }
.contato-card .dado { font-size: 20px; font-weight: 800; color: var(--texto); margin-bottom: 18px; }
.contato-info { text-align: center; margin-top: 40px; color: var(--texto-claro); }
.contato-info strong { color: var(--azul); }

@media (max-width: 760px) {
  .contato-grid { grid-template-columns: 1fr; }
}
```

- [ ] **Step 2: Criar contato.html**

```html
<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Contato — Só Box | Orçamento por WhatsApp e telefone</title>
  <meta name="description" content="Fale com a Só Box pelo WhatsApp ou telefone e solicite seu orçamento. Atendimento em Campinas e região.">
  <link rel="stylesheet" href="styles.css">
</head>
<body>
  <header class="header">
    <div class="container">
      <a href="index.html" class="logo">SÓ<span>BOX</span></a>
      <button class="menu-toggle" aria-label="Abrir menu">&#9776;</button>
      <nav class="nav">
        <a href="index.html">Início</a>
        <a href="produtos.html">Produtos</a>
        <a href="contato.html" class="ativo">Contato</a>
        <!-- TROCAR: número de WhatsApp -->
        <a href="https://wa.me/5519999990000" class="btn btn--laranja" target="_blank" rel="noopener">Orçamento</a>
      </nav>
    </div>
  </header>

  <section class="banner-interno">
    <div class="container">
      <h1>Fale com a gente</h1>
      <p>Atendimento rápido e orçamento sem compromisso</p>
    </div>
  </section>

  <section class="section">
    <div class="container">
      <div class="contato-grid">
        <div class="contato-card reveal">
          <div class="contato-card__icone contato-card__icone--whats">
            <svg viewBox="0 0 32 32" width="30" height="30" fill="#fff"><path d="M16 .4C7.4.4.4 7.4.4 16c0 2.8.7 5.4 2 7.8L.3 31.7l8.1-2.1c2.3 1.2 4.9 1.9 7.6 1.9 8.6 0 15.6-7 15.6-15.6S24.6.4 16 .4zm0 28.3c-2.4 0-4.7-.6-6.7-1.8l-.5-.3-4.8 1.3 1.3-4.7-.3-.5c-1.3-2.1-2-4.5-2-7 0-7.2 5.9-13.1 13.1-13.1S29.1 8.8 29.1 16 23.2 28.7 16 28.7z"/></svg>
          </div>
          <h3>WhatsApp</h3>
          <p>O jeito mais rápido de falar com a gente.</p>
          <!-- TROCAR: número -->
          <div class="dado">(19) 99999-0000</div>
          <a href="https://wa.me/5519999990000" class="btn btn--laranja" target="_blank" rel="noopener">Abrir conversa</a>
        </div>
        <div class="contato-card reveal">
          <div class="contato-card__icone contato-card__icone--tel">
            <svg viewBox="0 0 24 24" width="28" height="28" fill="#fff"><path d="M6.6 10.8c1.4 2.8 3.8 5.2 6.6 6.6l2.2-2.2c.3-.3.7-.4 1-.2 1.1.4 2.3.6 3.6.6.6 0 1 .4 1 1V20c0 .6-.4 1-1 1C10.6 21 3 13.4 3 4c0-.6.4-1 1-1h3.5c.6 0 1 .4 1 1 0 1.2.2 2.4.6 3.6.1.4 0 .8-.2 1l-2.3 2.2z"/></svg>
          </div>
          <h3>Telefone</h3>
          <p>Prefere ligar? Estamos no aguardo.</p>
          <!-- TROCAR: número -->
          <div class="dado">(19) 99999-0000</div>
          <a href="tel:+5519999990000" class="btn btn--branco" style="border:2px solid var(--azul);">Ligar agora</a>
        </div>
      </div>

      <div class="contato-info reveal">
        <p><strong>Horário de atendimento:</strong> Segunda a sexta, 8h às 18h · Sábado, 8h às 12h</p>
        <p><strong>Área atendida:</strong> Campinas e região</p>
      </div>
    </div>
  </section>

  <footer class="footer">
    <div class="container">
      <div class="grid">
        <div><h4>SÓ BOX</h4><p>Box de banheiro e esquadrias de alumínio sob medida.<br>Campinas e região.</p></div>
        <div><h4>Contato</h4>
          <!-- TROCAR: telefone e WhatsApp -->
          <p><a href="tel:+5519999990000">(19) 99999-0000</a></p>
          <p><a href="https://wa.me/5519999990000" target="_blank" rel="noopener">WhatsApp</a></p>
        </div>
        <div><h4>Páginas</h4><p><a href="index.html">Início</a></p><p><a href="produtos.html">Produtos</a></p><p><a href="contato.html">Contato</a></p></div>
      </div>
      <div class="copyright">© <span id="ano"></span> Só Box · Esquadrias de alumínio · Campinas/SP</div>
    </div>
  </footer>

  <!-- TROCAR: número de WhatsApp -->
  <a href="https://wa.me/5519999990000" class="whats-float" target="_blank" rel="noopener" aria-label="Falar no WhatsApp">
    <svg viewBox="0 0 32 32" width="30" height="30" fill="#fff"><path d="M16 .4C7.4.4.4 7.4.4 16c0 2.8.7 5.4 2 7.8L.3 31.7l8.1-2.1c2.3 1.2 4.9 1.9 7.6 1.9 8.6 0 15.6-7 15.6-15.6S24.6.4 16 .4zm0 28.3c-2.4 0-4.7-.6-6.7-1.8l-.5-.3-4.8 1.3 1.3-4.7-.3-.5c-1.3-2.1-2-4.5-2-7 0-7.2 5.9-13.1 13.1-13.1S29.1 8.8 29.1 16 23.2 28.7 16 28.7zm7.2-9.8c-.4-.2-2.3-1.2-2.7-1.3-.4-.1-.6-.2-.9.2-.3.4-1 1.3-1.2 1.5-.2.2-.4.3-.8.1-2.3-1.2-3.9-2.1-5.4-4.7-.4-.7.4-.6 1.1-2.1.1-.2 0-.4 0-.6 0-.2-.9-2.1-1.2-2.9-.3-.8-.6-.6-.9-.7h-.7c-.2 0-.6.1-.9.4-.3.4-1.2 1.2-1.2 2.9s1.2 3.4 1.4 3.6c.2.2 2.5 3.8 6 5.3 2.2 1 3.1 1 4.2.9.7-.1 2.3-.9 2.6-1.8.3-.9.3-1.6.2-1.8-.1-.2-.3-.3-.7-.5z"/></svg>
  </a>

  <script src="main.js"></script>
</body>
</html>
```

- [ ] **Step 3: Verificar**

Abrir `contato.html`. `Verificar:` dois cards (WhatsApp verde e Telefone azul) lado a lado, com botões funcionando (WhatsApp abre wa.me, telefone aciona `tel:`); horário e área atendida; reveal ao rolar; sem formulário e sem mapa; menu/rodapé/flutuante presentes.

- [ ] **Step 4: Commit**

```bash
git add contato.html styles.css
git commit -m "feat: página de contato com WhatsApp e telefone"
```

---

## Task 8: Revisão final e ajustes de consistência

**Files:**
- Modify: conforme necessário

- [ ] **Step 1: Conferir as 3 páginas no navegador (desktop e mobile)**

Abrir cada página e usar o modo responsivo (F12 → ícone de celular). `Verificar:`
- Navegação entre as 3 páginas funciona em todos os links
- Link "ativo" do menu corresponde à página atual em cada uma
- Em telas estreitas: menu hambúrguer abre/fecha; cards e blocos viram coluna única; nada estoura a largura
- Animações funcionam em todas as páginas (reveal, contador na home, zoom do banner, hover)
- Botão flutuante e links de WhatsApp/telefone presentes nas 3 páginas

- [ ] **Step 2: Conferir marcações de substituição**

Buscar no projeto por `TROCAR` e confirmar que todos os pontos de telefone/WhatsApp estão marcados. `Verificar:` `grep -rn "TROCAR" *.html` lista todas as ocorrências (header, hero, rodapé, botão flutuante, cards de contato).

- [ ] **Step 3: Commit final**

```bash
git add -A
git commit -m "chore: revisão final de consistência e responsividade"
```

---

## Self-Review (cobertura da spec)

- ✅ 3 páginas (Início, Produtos, Contato) — Tasks 3, 6, 7
- ✅ Estilo Industrial Clean (cinza-metálico + laranja) — Tasks 1, 2, 5
- ✅ Box em destaque, demais produtos presentes — Tasks 3 (cards), 6 (bloco destaque + selo)
- ✅ Galeria de fotos placeholder — Task 6
- ✅ Animações moderadas: scroll reveal, contador, zoom no banner, hover — Tasks 4, 5
- ✅ Contato só WhatsApp + telefone, sem formulário/mapa — Task 7
- ✅ Botão flutuante de WhatsApp em todas as páginas — Tasks 3, 6, 7
- ✅ Placeholders marcados com TROCAR — todas as tasks de HTML + verificação na Task 8
- ✅ Responsivo — Tasks 2, 5, 6, 7, verificação na Task 8
- ✅ Abre sem servidor/Node — abordagem estática
