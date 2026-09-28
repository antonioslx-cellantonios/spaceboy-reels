(function () {
  const cfg = window.SITE_CONFIG || {};

  // --- Diccionario de textos de interfaz (no editable desde config.js) ---
  const UI = {
    es: {
      langButton: "EN",
      navHome: "Reels",
      navPresentations: "Presentaciones",
      navContacts: "Contacto",
      back: "← Volver",
      presentationsEmpty: "Aún no hay presentaciones cargadas.",
      contactsEmpty: "Aún no hay contactos cargados."
    },
    en: {
      langButton: "ES",
      navHome: "Reels",
      navPresentations: "Presentations",
      navContacts: "Contact",
      back: "← Back",
      presentationsEmpty: "No presentations added yet.",
      contactsEmpty: "No contacts added yet."
    }
  };

  let lang = localStorage.getItem('siteLang') || 'es';
  let lastPresView = 'presentations'; // a dónde regresa el botón "volver" del PDF

  function t(field) {
    // field puede ser string plano o {es, en}
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[lang] || field.es || '';
  }

  // --- Aplicar colores como CSS variables ---
  const root = document.documentElement;
  Object.entries(cfg.colors || {}).forEach(([key, value]) => {
    if (value) root.style.setProperty('--' + key, value);
  });

  // --- Logo ---
  const brand = document.getElementById('brand');
  const brandName = document.getElementById('brand-name');
  const cornerLogo = document.getElementById('corner-logo');
  if (cfg.logo) {
    brand.innerHTML = `<img src="${cfg.logo}" alt="${cfg.siteTitle || ''}">`;
    cornerLogo.style.backgroundImage = `url('${cfg.logo}')`;
    cornerLogo.hidden = false;
  } else {
    brandName.textContent = cfg.siteTitle || 'Reels';
  }
  document.getElementById('site-footer').textContent = t(cfg.footerText);

  // --- Vistas ---
  const views = {
    home: document.getElementById('view-home'),
    presentations: document.getElementById('view-presentations'),
    pdf: document.getElementById('view-pdf'),
    contacts: document.getElementById('view-contacts')
  };

  function showView(name) {
    Object.entries(views).forEach(([key, el]) => { el.hidden = key !== name; });
    closeMenu();
  }

  // --- Menú lateral ---
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const sideMenu = document.getElementById('side-menu');
  const menuOverlay = document.getElementById('menu-overlay');

  function openMenu() { sideMenu.hidden = false; menuOverlay.hidden = false; }
  function closeMenu() { sideMenu.hidden = true; menuOverlay.hidden = true; }

  menuToggle.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);
  menuOverlay.addEventListener('click', closeMenu);

  document.getElementById('nav-home').addEventListener('click', () => showView('home'));
  document.getElementById('nav-presentations').addEventListener('click', () => showView('presentations'));
  document.getElementById('nav-contacts').addEventListener('click', () => showView('contacts'));

  // --- Idioma ---
  const langBtn = document.getElementById('lang-toggle');
  langBtn.addEventListener('click', () => {
    lang = lang === 'es' ? 'en' : 'es';
    localStorage.setItem('siteLang', lang);
    renderAll();
  });

  // --- Reels ---
  function thumbFor(video) {
    if (video.thumbnail) return video.thumbnail;
    if (video.type === 'youtube') return `https://img.youtube.com/vi/${video.src}/hqdefault.jpg`;
    return '';
  }

  function renderGrid() {
    const grid = document.getElementById('grid');
    grid.innerHTML = '';
    (cfg.videos || []).forEach((video) => {
      const card = document.createElement('button');
      card.className = 'reel-card';
      card.type = 'button';
      const title = t(video.title);
      card.setAttribute('aria-label', title);
      const thumbUrl = thumbFor(video);
      card.innerHTML = `
        <span class="reel-thumb" style="${thumbUrl ? `background-image:url('${thumbUrl}')` : ''}">
          <span class="play-icon"></span>
        </span>
        <span class="reel-info">
          <h3>${title}</h3>
          <p>${t(video.description)}</p>
        </span>
      `;
      card.addEventListener('click', () => openPlayer(video));
      grid.appendChild(card);
    });
  }

  // --- Reproductor de video ---
  const overlay = document.getElementById('player-overlay');
  const frame = document.getElementById('player-frame');
  const titleEl = document.getElementById('player-title');
  const descEl = document.getElementById('player-description');
  const closeBtn = document.getElementById('close-btn');

  function embedFor(video) {
    if (video.type === 'youtube') {
      return `<iframe src="https://www.youtube.com/embed/${video.src}?autoplay=1&rel=0" allow="autoplay; encrypted-media" allowfullscreen></iframe>`;
    }
    if (video.type === 'vimeo') {
      return `<iframe src="https://player.vimeo.com/video/${video.src}?autoplay=1" allow="autoplay; fullscreen" allowfullscreen></iframe>`;
    }
    if (video.type === 'mp4') {
      return `<video src="${video.src}" controls autoplay></video>`;
    }
    return '';
  }

  function openPlayer(video) {
    frame.innerHTML = embedFor(video);
    titleEl.textContent = t(video.title);
    descEl.textContent = t(video.description);
    overlay.hidden = false;
  }

  function closePlayer() { overlay.hidden = true; frame.innerHTML = ''; }

  closeBtn.addEventListener('click', closePlayer);
  overlay.addEventListener('click', (e) => { if (e.target === overlay) closePlayer(); });
  document.addEventListener('keydown', (e) => { if (e.key === 'Escape' && !overlay.hidden) closePlayer(); });

  // --- Presentaciones ---
  const pdfFrame = document.getElementById('pdf-frame');
  const pdfTitle = document.getElementById('pdf-title');

  function renderPresentations() {
    const list = document.getElementById('presentations-list');
    const empty = document.getElementById('presentations-empty');
    list.innerHTML = '';
    const items = cfg.presentations || [];
    empty.hidden = items.length > 0;
    items.forEach((pres) => {
      const card = document.createElement('button');
      card.className = 'pres-card';
      card.type = 'button';
      card.innerHTML = `<h3>${t(pres.title)}</h3>`;
      card.addEventListener('click', () => {
        pdfFrame.src = t(pres.file);
        pdfTitle.textContent = t(pres.title);
        lastPresView = 'presentations';
        showView('pdf');
      });
      list.appendChild(card);
    });
  }

  document.getElementById('pdf-back').addEventListener('click', () => {
    pdfFrame.src = '';
    showView(lastPresView);
  });

  // --- Contactos ---
  function renderContacts() {
    const grid = document.getElementById('contacts-grid');
    const empty = document.getElementById('contacts-empty');
    grid.innerHTML = '';
    const items = cfg.contacts || [];
    empty.hidden = items.length > 0;
    items.forEach((c) => {
      const card = document.createElement('div');
      card.className = 'contact-card';
      card.innerHTML = `
        ${c.qr ? `<img src="${c.qr}" alt="QR ${c.name || ''}">` : ''}
        <h3>${c.name || ''}</h3>
        ${c.role ? `<p class="role">${c.role}</p>` : ''}
        ${c.phone ? `<p><a href="tel:${c.phone.replace(/\s+/g, '')}">${c.phone}</a></p>` : ''}
        ${c.email ? `<p><a href="mailto:${c.email}">${c.email}</a></p>` : ''}
      `;
      grid.appendChild(card);
    });
  }

  // --- Render general (se llama al inicio y al cambiar idioma) ---
  function renderAll() {
    document.documentElement.lang = lang;
    document.title = cfg.siteTitle || 'Reels';
    langBtn.textContent = UI[lang].langButton;
    document.getElementById('event-name').textContent = t(cfg.eventName);
    document.getElementById('studio-description').textContent = t(cfg.studioDescription);
    document.getElementById('nav-home').textContent = UI[lang].navHome;
    document.getElementById('nav-presentations').textContent = UI[lang].navPresentations;
    document.getElementById('nav-contacts').textContent = UI[lang].navContacts;
    document.getElementById('presentations-title').textContent = UI[lang].navPresentations;
    document.getElementById('contacts-title').textContent = UI[lang].navContacts;
    document.getElementById('pdf-back').textContent = UI[lang].back;
    document.getElementById('presentations-empty').textContent = UI[lang].presentationsEmpty;
    document.getElementById('contacts-empty').textContent = UI[lang].contactsEmpty;
    renderGrid();
    renderPresentations();
    renderContacts();
  }

  renderAll();
})();
