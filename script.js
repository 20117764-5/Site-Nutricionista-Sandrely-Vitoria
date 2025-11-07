// ---------- Menu hamburger ----------
const hamburger = document.getElementById('hamburger');
const mainNav = document.getElementById('mainNav');

hamburger.addEventListener('click', () => {
  mainNav.classList.toggle('open');
  hamburger.classList.toggle('open');
});

/* small menu behavior: when nav opens on mobile, show as column */
const style = document.createElement('style');
style.innerHTML = `
  @media (max-width:1000px){
    .nav.open { position: absolute; top:72px; right:20px; background: rgba(18,56,26,0.98); padding:16px; border-radius:12px; }
    .nav.open .nav-list { display:flex; flex-direction:column; gap:12px; }
  }
`;
document.head.appendChild(style);

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-list a').forEach(a => {
  a.addEventListener('click', () => {
    if (mainNav.classList.contains('open')) {
      mainNav.classList.remove('open');
      hamburger.classList.remove('open');
    }
  });
});

// ---------- Scroll reveal ----------
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('show');
    }
  });
}, { threshold: 0.18 });

document.querySelectorAll('[data-anim]').forEach(el => observer.observe(el));

// reveal for initial hero elements
document.querySelectorAll('.hero-left, .hero-right, .section-title, .cards, .plan-grid, .testimonials, .contact-grid').forEach(el => {
  if (el) { el.setAttribute('data-anim',''); observer.observe(el); }
});

// ---------- Footer year ----------
document.getElementById('year').textContent = new Date().getFullYear();

// ---------- Form handling: open WhatsApp with filled data ----------
function handleForm(e) {
  e.preventDefault();
  const nome = document.getElementById('nome').value.trim();
  const telefone = document.getElementById('telefone').value.trim();
  const email = document.getElementById('email').value.trim();
  const mensagem = document.getElementById('mensagem').value.trim();

  if (!nome || !telefone) {
    alert('Por favor preencha seu nome e telefone/WhatsApp.');
    return false;
  }

  const text = encodeURIComponent(
    `Olá, sou ${nome}.Telefone: ${telefone} Email: ${email || 'não informado'}\nMensagem: ${mensagem || '-'}`
  );

  const waNumber = '5581984380843'; // substituir se necessário
  const waUrl = `https://wa.me/${waNumber}?text=${text}`;
  window.open(waUrl, '_blank');
  e.target.reset();
  return false;
}

// Allow smooth scroll offset for fixed header
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80; // header height
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});
