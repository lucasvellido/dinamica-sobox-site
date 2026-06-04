# Spec — Site institucional Só Box

**Data:** 2026-06-04
**Empresa:** Só Box — esquadrias de alumínio
**Atuação:** Campinas e região
**Foco:** Especialista em **box de banheiro**, com linha completa de esquadrias (residencial + comercial)

---

## 1. Objetivo

Site institucional de 3 páginas que equilibra três metas:

1. **Captar orçamentos** (leads via WhatsApp e telefone)
2. **Mostrar trabalhos** (galeria de produtos/obras)
3. **Passar credibilidade** (tempo de mercado, volume de obras, área atendida)

Posicionamento: **especialista em box de banheiro** que também faz janelas, portas, sacadas/guarda-corpo e fechamentos comerciais.

## 2. Abordagem técnica

Site **estático** em HTML + CSS + JavaScript puro. Sem framework, sem build, sem Node.

- 3 páginas: `index.html`, `produtos.html`, `contato.html`
- 1 folha de estilo compartilhada: `styles.css`
- 1 script: `main.js` (animações e interações)
- Cabeçalho e rodapé repetidos nas 3 páginas (markup duplicado, mantendo simplicidade e robustez)

**Por quê:** abre com dois cliques, sem dependências; fácil de editar/trocar fotos; carrega rápido; hospeda em qualquer lugar (Hostinger, Netlify, GitHub Pages).

### Estrutura de arquivos
```
/
├── index.html
├── produtos.html
├── contato.html
├── styles.css
├── main.js
├── assets/
│   └── (imagens — placeholders de banco de imagens, fáceis de trocar)
└── mockups/
    └── estilos.html   (referência de estilo escolhido)
```

## 3. Identidade visual — "Industrial Clean"

| Elemento | Definição |
|----------|-----------|
| Cor primária | Cinza-metálico `#37474f` / `#546e7a` |
| Cor de destaque (CTA) | Laranja `#ff7043` |
| Fundo | Branco `#ffffff` |
| Cinza claro (cards) | `#cfd8dc` |
| Tipografia | Sans-serif moderna (system-ui / Segoe UI / Roboto) |
| Sensação | Técnica, séria, moderna |
| Responsivo | Sim — desktop e celular |

## 4. Páginas

### 4.1 Início (`index.html`)
- **Cabeçalho fixo:** logo "SÓ BOX" + menu (Início · Produtos · Contato) + botão "Orçamento"
- **Banner (hero):** imagem de fundo com **zoom lento** (animação CSS). Título com foco no box:
  _"Especialistas em box de banheiro em alumínio"_; subtítulo: _"e também janelas, portas e esquadrias sob medida · Campinas e região"_. Botão WhatsApp.
- **Sobre rápido:** parágrafo curto de credibilidade
- **Faixa de números** com efeito contador (animação ao rolar): ex. "+15 anos", "+500 boxes instalados", "Atendimento em toda a região"
- **Destaques/serviços** em cards (com hover) → linkam para Produtos. **Card de Box em maior destaque** (centralizado/maior); janelas, portas e demais logo em seguida
- **Chamada final** para orçamento (WhatsApp)
- **Rodapé:** contato, telefone, WhatsApp, direitos

### 4.2 Produtos/Serviços (`produtos.html`)
- Cabeçalho + banner menor
- **Box de banheiro** abre a página, com mais espaço e mais fotos. Subtipos: box de correr, frontal, de canto, elegance/premium
- Em seguida: **Janelas**, **Portas**, **Sacadas/Guarda-corpo**, **Fechamentos comerciais/fachadas**
- **Galeria de fotos** em grid (maioria de box + algumas das outras categorias). Animação ao surgir + zoom no hover. Fácil de trocar pelas fotos reais
- Chamada para orçamento

### 4.3 Contato (`contato.html`)
- Cabeçalho + banner menor
- **Blocos de contato:** WhatsApp (botão grande) e Telefone (link clicável). **Sem formulário, sem mapa.**
- Horário de atendimento + área atendida (Campinas e região)
- Rodapé

## 5. Elementos globais

- **Botão flutuante de WhatsApp** em todas as páginas (canto inferior)
- **Animações (nível moderado):**
  - Fade/slide ao rolar — via `IntersectionObserver` (sem biblioteca externa)
  - Zoom lento no banner (animação CSS)
  - Contador animado nos números
  - Hover em botões e cards
- **Placeholders:** fotos de banco de imagens (Unsplash); telefone e WhatsApp fictícios marcados com `<!-- TROCAR -->` para substituição posterior

## 6. Contato

- **Canais:** WhatsApp (principal) + Telefone
- **Não inclui:** formulário, mapa

## 7. Fora de escopo (YAGNI)

- Formulário de contato / envio de e-mail
- Mapa / integração com Google Maps
- Backend, CMS ou área administrativa
- Blog, e-commerce, multi-idioma
- Build tooling / frameworks

## 8. Critérios de sucesso

- 3 páginas funcionais e navegáveis entre si
- Abre localmente com dois cliques, sem servidor
- Responsivo (legível e usável no celular)
- Box em posição de destaque, demais produtos presentes
- Animações moderadas funcionando (scroll, contador, zoom, hover)
- WhatsApp e telefone acessíveis em todas as páginas
- Textos/telefones/fotos marcados e fáceis de trocar
