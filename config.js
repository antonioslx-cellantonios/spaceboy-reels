/*
  CONFIG.JS — edita solo este archivo para personalizar el sitio.
  No necesitas tocar el HTML, CSS ni JS para lo básico.
*/

window.SITE_CONFIG = {

  // --- Marca / evento ---
  siteTitle: "Spaceboy Reels",
  eventName: "Showreel 2026",              // subtítulo, cámbialo por el nombre del evento
  logo: "",                                 // ej: "assets/img/logo.png" — vacío = usa el texto de siteTitle
  footerText: "Spaceboy — Ciudad de México",

  // --- Colores del sitio (formato hex) ---
  colors: {
    background: "#121316",   // fondo general
    surface:    "#1b1d22",   // tarjetas / paneles
    text:       "#f2f0ec",   // texto principal
    muted:      "#9a9ca3",   // texto secundario
    accent:     "#7c5cff"    // color de acento (links, botones, detalles)
  },

  // --- Videos ---
  // type puede ser: "youtube", "vimeo" o "mp4"
  //   - youtube: src = ID del video (ej: "dQw4w9WgXcQ"), idealmente "No listado"
  //   - vimeo:   src = ID del video (ej: "76979871")
  //   - mp4:     src = URL completa a un archivo de video alojado FUERA de este repo
  //              (ver README: no subas videos pesados a GitHub)
  // thumbnail es opcional: si lo dejas vacío, YouTube/Vimeo generan una automática
  videos: [
    {
      title: "Antigravity Racing — Teaser",
      description: "Primer vistazo al prototipo en Unreal Engine.",
      type: "youtube",
      src: "dQw4w9WgXcQ",
      thumbnail: ""
    },
    {
      title: "The Long Wake — Cinemática",
      description: "Secuencia narrativa de presentación.",
      type: "youtube",
      src: "dQw4w9WgXcQ",
      thumbnail: ""
    },
    {
      title: "Instalación interactiva — Making of",
      description: "Detrás de cámaras del setup en el evento.",
      type: "mp4",
      src: "https://example.com/videos/making-of.mp4",
      thumbnail: ""
    }
  ]
};
