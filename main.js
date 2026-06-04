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
