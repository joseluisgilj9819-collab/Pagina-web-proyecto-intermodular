const translations = {
  es: {
    'nav.home': 'Inicio', 'nav.about': 'Quiénes Somos', 'nav.register': 'Ingreso', 'nav.location': 'Ubicación', 'nav.shop': 'Tienda', 'nav.menus': 'Menús', 'nav.homeBtn': 'Volver al Inicio',
    'footer.title': 'Contáctanos', 'footer.copy': 'Mazcufit · Rendimiento y bienestar corporativo',
    'form.required': 'Completa todos los campos obligatorios.', 'form.success': '¡Registro enviado correctamente!'
  },
  en: {
    'nav.home': 'Home', 'nav.about': 'About Us', 'nav.register': 'Sign In', 'nav.location': 'Location', 'nav.shop': 'Shop', 'nav.menus': 'Menus', 'nav.homeBtn': 'Back to Home',
    'footer.title': 'Contact Us', 'footer.copy': 'Mazcufit · Corporate wellness and performance',
    'form.required': 'Please complete all required fields.', 'form.success': 'Registration sent successfully!'
  }
};

const menuToggle = document.querySelector('.menu-toggle');
const navLinks = document.querySelector('.nav-links');
const langButtons = document.querySelectorAll('.lang-btn');
const i18nNodes = document.querySelectorAll('[data-i18n]');
const tabs = document.querySelectorAll('.tab-btn');
const panels = document.querySelectorAll('.tab-panel');
const form = document.getElementById('entryForm');
const formMessage = document.getElementById('formMessage');

menuToggle?.addEventListener('click', () => {
  navLinks?.classList.toggle('show');
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isExpanded));
});

navLinks?.addEventListener('click', (event) => {
  if (event.target.tagName === 'A' && navLinks.classList.contains('show')) {
    navLinks.classList.remove('show');
    menuToggle?.setAttribute('aria-expanded', 'false');
  }
});

function applyLanguage(lang = 'es') {
  const dict = translations[lang] || translations.es;
  document.documentElement.lang = lang;

  i18nNodes.forEach((node) => {
    const key = node.dataset.i18n;
    if (dict[key]) node.textContent = dict[key];
  });

  langButtons.forEach((btn) => btn.classList.toggle('active', btn.dataset.lang === lang));
  localStorage.setItem('mazcufit_lang', lang);
}

langButtons.forEach((btn) => btn.addEventListener('click', () => applyLanguage(btn.dataset.lang)));

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => { t.classList.remove('active'); t.setAttribute('aria-selected', 'false'); });
    panels.forEach((panel) => panel.classList.remove('active'));
    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    document.getElementById(tab.dataset.tab)?.classList.add('active');
  });
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();
  const lang = document.documentElement.lang === 'en' ? 'en' : 'es';
  if (!form.checkValidity()) {
    formMessage.textContent = translations[lang]['form.required'];
    formMessage.style.color = 'var(--danger)';
    return;
  }
  formMessage.textContent = translations[lang]['form.success'];
  formMessage.style.color = 'var(--success)';
  form.reset();
});

const currentPage = document.body.dataset.page;
document.querySelectorAll('.nav-links a[data-page]').forEach((link) => {
  if (link.dataset.page === currentPage) link.classList.add('active-link');
});

applyLanguage(localStorage.getItem('mazcufit_lang') || 'es');
