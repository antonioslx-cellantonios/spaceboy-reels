/*
  CONFIG.JS — edita solo este archivo para actualizar el sitio.
  Cada texto visible ahora tiene dos versiones: es (español) y en (inglés).
*/

window.SITE_CONFIG = {

  // --- Marca ---
  siteTitle: "Spaceboy Reels",
  logo: "assets/img/logo.png",   // sube tu logo aquí (ver README)
  eventName: { es: "Showreel 2026", en: "Showreel 2026" },

  studioDescription: {
    es: "SpaceBoy es un estudio creativo mexicano con sede en Ciudad de México (2015), enfocado en VFX, postproducción y arte 2D/3D para marcas nacionales e internacionales, además de desarrollar videojuegos e interactivos.",
    en: "SpaceBoy is a Mexican creative studio based in Mexico City (est. 2015), focused on VFX, post-production, and 2D/3D art for national and international brands, as well as the development of video games and interactive experiences."
  },

  footerText: { es: "Spaceboy — Ciudad de México", en: "Spaceboy — Mexico City" },

  // --- Colores ---
  colors: {
    background: "#121316",
    surface:    "#1b1d22",
    text:       "#f2f0ec",
    muted:      "#9a9ca3",
    accent:     "#7c5cff"
  },

  // --- Videos (se muestran en la vista principal) ---
  // type: "youtube" | "vimeo" | "mp4"  |  src: ID de YouTube/Vimeo, o URL completa si es mp4
  videos: [
    {
      type: "youtube",
      src: "bianvKCtMM4",
      title: { es: "Reel Motion Capture", en: "Motion Capture Reel" },
      description: {
        es: "Ejemplos de implementación de animaciones hechas con el sistema de captura de movimiento in-house Vicon de Spaceboy. Aplicado en series, películas, publicidad y videojuegos.",
        en: "Examples of animation implementation using Spaceboy's in-house Vicon motion capture system. Applied in series, films, advertising, and video games."
      }
    },
    {
      type: "youtube",
      src: "qYhZxpsL4w0",
      title: { es: "Reel IA", en: "AI Reel" },
      description: {
        es: "Desarrollos de arte hechos con IA a diferentes niveles y estilos.",
        en: "AI-generated art developments across different levels and styles."
      }
    },
    {
      type: "youtube",
      src: "-BHa9Ejkt3k",
      title: { es: "Reel General Spaceboy 2026", en: "Spaceboy General Reel 2026" },
      description: {
        es: "Arte 3D, 2D, motion capture, VFX y postproducción de Spaceboy para trabajos con clientes y creatividad interna del estudio.",
        en: "3D and 2D art, motion capture, VFX, and post-production by Spaceboy for client work and the studio's internal creativity."
      }
    },
    {
      type: "youtube",
      src: "c2pX5G7X058",
      title: { es: "Reel Spaceboy 77 - Videojuegos e Innovación", en: "Spaceboy 77 Reel — Video Games & Innovation" },
      // No se dio descripción para este video: este texto es una propuesta breve, edítalo si quieres.
      description: {
        es: "Selección de proyectos de videojuegos e innovación desarrollados por Spaceboy.",
        en: "A selection of video game and innovation projects developed by Spaceboy."
      }
    },
    {
      type: "youtube",
      src: "rE-GvOUkCXM",
      title: { es: "Reel VFX", en: "VFX Reel" },
      // No se dio descripción para este video: este texto es una propuesta breve, edítalo si quieres.
      description: {
        es: "Trabajos de efectos visuales realizados por Spaceboy.",
        en: "Visual effects work created by Spaceboy."
      }
    }
  ],

  // --- Presentaciones (PDFs) ---
  // file: ruta al PDF dentro de assets/pdfs/ (ver README para subirlos)
  presentations: [
    // Ejemplo — bórralo o edítalo:
    // {
    //   title: { es: "Presentación institucional", en: "Company overview" },
    //   file: "assets/pdfs/institucional.pdf"
    // }
  ],

  // --- Contactos (QRs) ---
  // qr: ruta a la imagen del QR dentro de assets/img/qrs/ (ver README para subirlas)
  contacts: [
    // Ejemplo — bórralo o edítalo:
    // {
    //   name: "Nombre Apellido",
    //   role: "Puesto",
    //   phone: "+52 55 0000 0000",
    //   email: "nombre@spaceboy.mx",
    //   qr: "assets/img/qrs/nombre.png"
    // }
  ]
};
