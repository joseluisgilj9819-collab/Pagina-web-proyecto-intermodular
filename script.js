const translations = {
  es: {
    'nav.about': 'Quiénes Somos',
    'nav.register': 'Ingreso',
    'nav.location': 'Ubicación',
    'nav.shop': 'Tienda',
    'nav.menus': 'Menús',
    'nav.homeBtn': 'Volver al Inicio',
    'home.title': 'Bienvenido a CorpFit',
    'home.text': 'Transformamos bienestar en resultados con soluciones integrales de salud, nutrición y rendimiento corporativo.',
    'home.cta': 'Conócenos',
    'about.title': 'Quiénes Somos',
    'about.historyTitle': 'Nuestra Historia',
    'about.historyText': 'Nacimos para ayudar a empresas y personas a mejorar su calidad de vida mediante hábitos sostenibles.',
    'about.missionTitle': 'Misión',
    'about.missionText': 'Impulsar el bienestar físico y mental con servicios personalizados, tecnología y acompañamiento profesional.',
    'about.whoTitle': 'Quiénes Somos',
    'about.whoText': 'Somos un equipo multidisciplinar de entrenadores, nutricionistas y especialistas en experiencia de cliente.',
    'about.doTitle': 'A Qué Nos Dedicamos',
    'about.doText': 'Diseñamos programas corporativos, menús saludables, asesorías y experiencias que potencian productividad.',
    'register.title': 'Formulario de Ingreso',
    'register.name': 'Nombre y Apellidos',
    'register.email': 'Correo Electrónico',
    'register.phone': 'Número de Teléfono',
    'register.submit': 'Registrarme',
    'location.title': 'Ubicación e Instalaciones',
    'shop.title': 'Tienda de Merchandising',
    'shop.p1': 'Camiseta Performance',
    'shop.p2': 'Sudadera CorpFit',
    'shop.p3': 'Botella Térmica',
    'shop.buy': 'Añadir al carrito',
    'menus.title': 'Menús Equilibrados',
    'menus.breakfast': 'Desayuno',
    'menus.lunch': 'Almuerzo',
    'menus.dinner': 'Cena',
    'menus.b1t': 'Energía Matinal',
    'menus.b1': 'Avena con frutas, yogur natural y semillas de chía.',
    'menus.l1t': 'Balance Total',
    'menus.l1': 'Pechuga a la plancha, quinoa y ensalada mediterránea.',
    'menus.d1t': 'Ligero y Nutritivo',
    'menus.d1': 'Salmón al horno, verduras al vapor y crema de calabaza.',
    'contact.title': 'Contáctanos'
  },
  en: {
    'nav.about': 'About Us',
    'nav.register': 'Sign In',
    'nav.location': 'Location',
    'nav.shop': 'Shop',
    'nav.menus': 'Menus',
    'nav.homeBtn': 'Back to Home',
    'home.title': 'Welcome to CorpFit',
    'home.text': 'We turn wellness into results with integrated health, nutrition, and performance solutions.',
    'home.cta': 'Learn More',
    'about.title': 'About Us',
    'about.historyTitle': 'Our Story',
    'about.historyText': 'We were founded to help companies and people improve quality of life through sustainable habits.',
    'about.missionTitle': 'Mission',
    'about.missionText': 'Boost physical and mental wellness through tailored services, technology, and expert guidance.',
    'about.whoTitle': 'Who We Are',
    'about.whoText': 'We are a multidisciplinary team of coaches, nutritionists, and customer-experience specialists.',
    'about.doTitle': 'What We Do',
    'about.doText': 'We design corporate programs, healthy menus, consulting, and experiences that improve productivity.',
    'register.title': 'Registration Form',
    'register.name': 'Full Name',
    'register.email': 'Email Address',
    'register.phone': 'Phone Number',
    'register.submit': 'Sign Up',
    'location.title': 'Location & Facilities',
    'shop.title': 'Merchandise Store',
    'shop.p1': 'Performance T-Shirt',
    'shop.p2': 'CorpFit Hoodie',
    'shop.p3': 'Thermal Bottle',
    'shop.buy': 'Add to Cart',
    'menus.title': 'Balanced Menus',
    'menus.breakfast': 'Breakfast',
    'menus.lunch': 'Lunch',
    'menus.dinner': 'Dinner',
    'menus.b1t': 'Morning Energy',
    'menus.b1': 'Oatmeal with fruit, natural yogurt, and chia seeds.',
    'menus.l1t': 'Total Balance',
    'menus.l1': 'Grilled chicken, quinoa, and Mediterranean salad.',
    'menus.d1t': 'Light & Nutritious',
    'menus.d1': 'Baked salmon, steamed vegetables, and pumpkin soup.',
    'contact.title': 'Contact Us'
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
  navLinks.classList.toggle('show');
  const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
  menuToggle.setAttribute('aria-expanded', String(!isExpanded));
});

navLinks?.addEventListener('click', (event) => {
  if (event.target.tagName === 'A' && navLinks.classList.contains('show')) {
    navLinks.classList.remove('show');
    menuToggle.setAttribute('aria-expanded', 'false');
  }
});

function applyLanguage(lang) {
  const dict = translations[lang] || translations.es;
  document.documentElement.lang = lang;

  i18nNodes.forEach((node) => {
    const key = node.dataset.i18n;
    if (dict[key]) node.textContent = dict[key];
  });

  langButtons.forEach((btn) => btn.classList.toggle('active', btn.dataset.lang === lang));
}

langButtons.forEach((btn) => {
  btn.addEventListener('click', () => applyLanguage(btn.dataset.lang));
});

tabs.forEach((tab) => {
  tab.addEventListener('click', () => {
    tabs.forEach((t) => {
      t.classList.remove('active');
      t.setAttribute('aria-selected', 'false');
    });
    panels.forEach((panel) => panel.classList.remove('active'));

    tab.classList.add('active');
    tab.setAttribute('aria-selected', 'true');
    document.getElementById(tab.dataset.tab)?.classList.add('active');
  });
});

form?.addEventListener('submit', (event) => {
  event.preventDefault();

  if (!form.checkValidity()) {
    formMessage.textContent = document.documentElement.lang === 'en'
      ? 'Please complete all required fields.'
      : 'Completa todos los campos obligatorios.';
    formMessage.style.color = '#d1142a';
    return;
  }

  formMessage.textContent = document.documentElement.lang === 'en'
    ? 'Registration sent successfully!'
    : '¡Registro enviado correctamente!';
  formMessage.style.color = '#0f8f53';
  form.reset();
});

applyLanguage('es');
