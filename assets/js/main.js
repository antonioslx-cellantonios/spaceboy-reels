(function () {
  const cfg = window.SITE_CONFIG || {};

  // --- Diccionario de textos de interfaz (no editable desde config.js) ---
  const UI = {
    es: {
      langButton: "EN",
      navHome: "Reels",
      navContacts: "Contacto",
      navPresentations: "Presentaciones",
      presentationsEmpty: "Aún no hay presentaciones cargadas.",
      contactsEmpty: "Aún no hay contactos cargados.",
      showQr: "Ver QR",
      hideQr: "Ocultar QR"
    },
    en: {
      langButton: "ES",
      navHome: "Reels",
      navContacts: "Contact",
      navPresentations: "Presentations",
      presentationsEmpty: "No presentations added yet.",
      contactsEmpty: "No contacts added yet.",
      showQr: "Show QR",
      hideQr: "Hide QR"
    }
  };

  let lang = localStorage.getItem('siteLang') || 'es';

  function t(field) {
    // field puede ser string plano o {es, en}
    if (!field) return '';
    if (typeof field === 'string') return field;
    return field[lang] || field.es || '';
  }

  // --- Aplicar colores como CSS variables ---
const root = document.documentElement;
Object.entries(cfg.colors || {}).forEach(([key, value]) => {
  if (!value) return;
  const cssVar = key === 'background' ? 'bg' : key;
  root.style.setProperty('--' + cssVar, value);
});

  // --- Logo ---
  const brand = document.getElementById('brand');
  const brandName = document.getElementById('brand-name');
  const cornerLogo = document.getElementById('corner-logo');
  if (cfg.logo) {
  brand.innerHTML = `
    <img class="brand-logo" src="${cfg.logo}" alt="${cfg.siteTitle || ''}">
    ${cfg.secondaryLogo ? `<img class="brand-logo" src="${cfg.secondaryLogo}" alt="">` : ''}
  `;
  cornerLogo.style.backgroundImage = `url('${cfg.logo}')`;
  cornerLogo.hidden = false;
} else {
  brandName.textContent = cfg.siteTitle || 'Reels';
}
  document.getElementById('site-footer').textContent = t(cfg.footerText);
  document.getElementById('site-footer-secondary').textContent = t(cfg.footerSubtext);

  // --- Menú lateral (navega por scroll dentro de la misma página) ---
  const menuToggle = document.getElementById('menu-toggle');
  const menuClose = document.getElementById('menu-close');
  const sideMenu = document.getElementById('side-menu');
  const menuOverlay = document.getElementById('menu-overlay');

  function openMenu() { sideMenu.hidden = false; menuOverlay.hidden = false; }
  function closeMenu() { sideMenu.hidden = true; menuOverlay.hidden = true; }

  menuToggle.addEventListener('click', openMenu);
  menuClose.addEventListener('click', closeMenu);
  menuOverlay.addEventListener('click', closeMenu);

  document.querySelectorAll('.nav-link').forEach((btn) => {
    btn.addEventListener('click', () => {
      const target = document.getElementById(btn.dataset.target);
      closeMenu();
      if (target) target.scrollIntoView({ behavior: 'smooth' });
    });
  });

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
  if (video.type === 'youtube') return `https://img.youtube.com/vi/${video.src}/mqdefault.jpg`;
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
  const playerOverlay = document.getElementById('player-overlay');
  const playerFrame = document.getElementById('player-frame');
  const playerTitleEl = document.getElementById('player-title');
  const playerDescEl = document.getElementById('player-description');
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
    playerFrame.innerHTML = embedFor(video);
    playerTitleEl.textContent = t(video.title);
    playerDescEl.textContent = t(video.description);
    playerOverlay.hidden = false;
  }

  function closePlayer() { playerOverlay.hidden = true; playerFrame.innerHTML = ''; }

  closeBtn.addEventListener('click', closePlayer);
  playerOverlay.addEventListener('click', (e) => { if (e.target === playerOverlay) closePlayer(); });

  // --- Presentaciones ---
  const pdfOverlay = document.getElementById('pdf-overlay');
  const pdfFrame = document.getElementById('pdf-frame');
  const pdfTitleEl = document.getElementById('pdf-title');
  const pdfCloseBtn = document.getElementById('pdf-close-btn');

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
      card.innerHTML = `
  ${cfg.presentationIcon ? `<img class="pres-icon" src="${cfg.presentationIcon}" alt="">` : ''}
  <h3>${t(pres.title)}</h3>
`;
      card.addEventListener('click', () => openPdf(pres));
      list.appendChild(card);
    });
  }

  function openPdf(pres) {
    // encodeURI convierte espacios y otros caracteres del nombre de archivo
    // a una URL válida automáticamente (no hace falta escribir %20 a mano en config.js)
    pdfFrame.src = encodeURI(t(pres.file));
    pdfTitleEl.textContent = t(pres.title);
    pdfOverlay.hidden = false;
  }

  function closePdf() { pdfOverlay.hidden = true; pdfFrame.src = ''; }

  pdfCloseBtn.addEventListener('click', closePdf);
  pdfOverlay.addEventListener('click', (e) => { if (e.target === pdfOverlay) closePdf(); });

  document.addEventListener('keydown', (e) => {
    if (e.key !== 'Escape') return;
    if (!playerOverlay.hidden) closePlayer();
    if (!pdfOverlay.hidden) closePdf();
  });

  // --- Contactos ---
  function renderContacts() {
    const grid = document.getElementById('contacts-grid');
    const empty = document.getElementById('contacts-empty');
    grid.innerHTML = '';
    const items = cfg.contacts || [];
    empty.hidden = items.length > 0;
    items.forEach((c) => {
      const digits = (c.phone || '').replace(/[^\d]/g, ''); // solo números, para WhatsApp
      const waLink = digits ? `https://wa.me/${digits}` : '#';

      const card = document.createElement('div');
      card.className = 'contact-card';
      card.innerHTML = `
        ${c.photo ? `<img class="contact-photo" src="${c.photo}" alt="${c.name || ''}">` : ''}
        <h3>${c.name || ''}</h3>
        ${c.role ? `<p class="role">${t(c.role)}</p>` : ''}
        ${c.phone ? `<p><a href="tel:${c.phone.replace(/\s+/g, '')}">${c.phone}</a></p>` : ''}
        ${c.email ? `<p><a href="mailto:${c.email}">${c.email}</a></p>` : ''}
        ${c.qr ? `
          <button class="qr-toggle" type="button">${UI[lang].showQr}</button>
          <div class="qr-panel" hidden>
            <a href="${waLink}" target="_blank" rel="noopener">
              <img src="${c.qr}" alt="QR WhatsApp ${c.name || ''}">
            </a>
          </div>
        ` : ''}
      `;

      const toggleBtn = card.querySelector('.qr-toggle');
      const panel = card.querySelector('.qr-panel');
      if (toggleBtn && panel) {
        toggleBtn.addEventListener('click', () => {
          panel.hidden = !panel.hidden;
          toggleBtn.textContent = panel.hidden ? UI[lang].showQr : UI[lang].hideQr;
        });
      }

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
    document.getElementById('nav-contacts').textContent = UI[lang].navContacts;
    document.getElementById('nav-presentations').textContent = UI[lang].navPresentations;
    document.getElementById('reels-title').textContent = UI[lang].navHome;
    document.getElementById('contacts-title').textContent = UI[lang].navContacts;
    document.getElementById('presentations-title').textContent = UI[lang].navPresentations;
    document.getElementById('presentations-empty').textContent = UI[lang].presentationsEmpty;
    document.getElementById('contacts-empty').textContent = UI[lang].contactsEmpty;
    renderGrid();
    renderPresentations();
    renderContacts();
  }

  renderAll();
})();
