(function () {
  const cfg = window.SITE_CONFIG || {};

  // --- Aplicar colores como CSS variables ---
  const root = document.documentElement;
  const colors = cfg.colors || {};
  Object.entries(colors).forEach(([key, value]) => {
    if (value) root.style.setProperty('--' + key, value);
  });

  // --- Marca ---
  document.title = cfg.siteTitle || "Reels";
  const brand = document.getElementById('brand');
  const brandName = document.getElementById('brand-name');
  if (cfg.logo) {
    brand.innerHTML = `<img src="${cfg.logo}" alt="${cfg.siteTitle || ''}">`;
  } else {
    brandName.textContent = cfg.siteTitle || "Reels";
  }
  document.getElementById('event-name').textContent = cfg.eventName || "";
  document.getElementById('site-footer').textContent = cfg.footerText || "";

  // --- Thumbnails automáticas ---
  function thumbFor(video) {
    if (video.thumbnail) return video.thumbnail;
    if (video.type === 'youtube') return `https://img.youtube.com/vi/${video.src}/hqdefault.jpg`;
    return '';
  }

  // --- Construir tarjetas ---
  const grid = document.getElementById('grid');
  const videos = cfg.videos || [];

  videos.forEach((video, i) => {
    const card = document.createElement('button');
    card.className = 'reel-card';
    card.type = 'button';
    card.setAttribute('aria-label', 'Reproducir: ' + video.title);

    const thumbUrl = thumbFor(video);
    card.innerHTML = `
      <span class="reel-thumb" style="${thumbUrl ? `background-image:url('${thumbUrl}')` : ''}">
        <span class="play-icon"></span>
      </span>
      <span class="reel-info">
        <h3>${video.title || ''}</h3>
        <p>${video.description || ''}</p>
      </span>
    `;
    card.addEventListener('click', () => openPlayer(video));
    grid.appendChild(card);
  });

  // --- Reproductor modal ---
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
    titleEl.textContent = video.title || '';
    descEl.textContent = video.description || '';
    overlay.hidden = false;
  }

  function closePlayer() {
    overlay.hidden = true;
    frame.innerHTML = ''; // detiene la reproducción
  }

  closeBtn.addEventListener('click', closePlayer);
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay) closePlayer();
  });
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && !overlay.hidden) closePlayer();
  });
})();
