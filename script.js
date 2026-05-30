const translations = {
  es: {
    'nav.home': 'Inicio',
    'nav.about': 'Quiénes Somos',
    'nav.register': 'Ingreso',
    'nav.location': 'Ubicación',
    'nav.shop': 'Tienda',
    'nav.menus': 'Menús',
    'nav.homeBtn': 'Volver al Home',
    'footer.title': 'Contáctanos',
    'footer.copy': 'Mazcufit · Gimnasio, nutrición y rendimiento',
    'form.required': 'Completa todos los campos obligatorios.',
    'form.success': '¡Registro enviado correctamente!'
  },
  en: {
    'nav.home': 'Home',
    'nav.about': 'About Us',
    'nav.register': 'Registration',
    'nav.location': 'Location',
    'nav.shop': 'Shop',
    'nav.menus': 'Menus',
    'nav.homeBtn': 'Back Home',
    'footer.title': 'Contact Us',
    'footer.copy': 'Mazcufit · Gym, nutrition and performance',
    'form.required': 'Please complete all required fields.',
    'form.success': 'Registration sent successfully!'
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
  const dictionary = translations[lang] || translations.es;
  document.documentElement.lang = lang;

  i18nNodes.forEach((node) => {
    const key = node.dataset.i18n;
    if (dictionary[key]) node.textContent = dictionary[key];
  });

  langButtons.forEach((button) => {
    button.classList.toggle('active', button.dataset.lang === lang);
  });

  localStorage.setItem('mazcufit_lang', lang);
}

langButtons.forEach((button) => {
  button.addEventListener('click', () => applyLanguage(button.dataset.lang));
});

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((item) => {
      item.classList.remove('active');
      item.setAttribute('aria-selected', 'false');
    });

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
    formMessage.style.color = 'var(--color-red-light)';
    return;
  }

  formMessage.textContent = translations[lang]['form.success'];
  formMessage.style.color = 'var(--color-beige-soft)';
  form.reset();
});

const currentPage = document.body.dataset.page;
document.querySelectorAll('.nav-links a[data-page]').forEach((link) => {
  if (link.dataset.page === currentPage) {
    link.classList.add('active-link');
    link.setAttribute('aria-current', 'page');
  }
});

applyLanguage(localStorage.getItem('mazcufit_lang') || 'es');
