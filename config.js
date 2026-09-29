/*
  CONFIG.JS — edita solo este archivo para actualizar el sitio.
  Cada texto visible tiene dos versiones: es (español) y en (inglés).
*/

window.SITE_CONFIG = {

  // --- Marca ---
  siteTitle: "Spaceboy Reels",
  logo: "assets/img/logoSBverticalBlanco.png",   // sube tu logo aquí (ver README)
  eventName: { es: "Reels", en: "Reels" },

  studioDescription: {
    es: "Diseñamos lo que todavía no existe. Somos un estudio creativo donde narrativa, diseño y tecnología convergen para construir experiencias visuales con impacto real. Desarrollamos conceptos que se transforman en universos: desde narrativas cinematográficas y campañas de alto alcance hasta videojuegos, entornos inmersivos y realidades extendidas. Producimos piezas; diseñamos sistemas visuales y experiencias que amplían la manera en que las marcas y las audiencias se relacionan.",
    en: "Our creative studio brings together storytelling, design, and technology to build visual experiences that make a real impact. From cinematic narratives and wide-reaching campaigns to video games, immersive environments, and extended realities, we develop concepts that evolve into entire worlds. Through our work, we design visual systems and experiences that expand the ways in which brands and audiences connect."
  },

  footerText: { es: "Spaceboy — Ciudad de México", en: "Spaceboy — Mexico City" },
  footerSubtext: { es: "Todos los derechos reservados ® 2026 Spaceboy", en: "All rights reserved ® 2026 Spaceboy" },

  // --- Colores ---
  colors: {
    background: "#121316",
    surface:    "#1b1d22",
    text:       "#f2f0ec",
    muted:      "#9a9ca3",
    accent:     "#00ffd7"
  },

  // --- Videos (sección "Reels") ---
  // type: "youtube" | "vimeo" | "mp4"  |  src: ID de YouTube/Vimeo, o URL completa si es mp4
  videos: [
    {
      type: "youtube",
      src: "rE-GvOUkCXM",
      title: { es: "Reel VFX", en: "VFX Reel" },
      description: {
        es: "Trabajos de efectos visuales realizados por Spaceboy.",
        en: "Visual effects work created by Spaceboy."
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
      src: "qYhZxpsL4w0",
      title: { es: "Reel IA", en: "AI Reel" },
      description: {
        es: "Desarrollos de arte hechos con IA a diferentes niveles y estilos.",
        en: "AI-generated art developments across different levels and styles."
      }
    },
    {
      type: "youtube",
      src: "c2pX5G7X058",
      title: { es: "Reel Spaceboy 77 - Videojuegos e Innovación", en: "Spaceboy 77 Reel — Video Games & Innovation" },
      description: {
        es: "Selección de proyectos de videojuegos e innovación desarrollados por Spaceboy.",
        en: "A selection of video game and innovation projects developed by Spaceboy."
      }
    },
    {
      type: "youtube",
      src: "bianvKCtMM4",
      title: { es: "Reel Motion Capture", en: "Motion Capture Reel" },
      description: {
        es: "Ejemplos de implementación de animaciones hechas con el sistema de captura de movimiento in-house Vicon de Spaceboy. Aplicado en series, películas, publicidad y videojuegos.",
        en: "Examples of animation implementation using Spaceboy's in-house Vicon motion capture system. Applied in series, films, advertising, and video games."
      }
    }
  ],

  // --- Contactos (sección "Contacto") ---
  // photo: foto de la persona, en assets/img/contacts/
  // qr:    QR de WhatsApp de esa persona, en assets/img/qrs/ (solo se ve al presionar "Ver QR")
  // phone: con código de país, ej. "+52 55 1234 5678" — se usa tanto para el link
  //        de llamada/guardar contacto como para abrir WhatsApp al hacer clic en el QR.
  contacts: [
  {
    name: "Daniela Gumi",
    role: { es: "Área Comercial", en: "Commercial Team" },
    photo: "assets/img/contacts/dani2.png",
    phone: "+52 1 55 3516 9774",
    email: "daniela@spaceboy.mx",
    qr: "assets/img/qrs/qrDani.png"
  },
    {
    name: "Manuel Bustos",
    role: { es: "Área Comercial", en: "Commercial Team" },
    photo: "assets/img/contacts/manu.png",
    phone: "+52 1 55 3224 3930",
    email: "manuel@spaceboy.mx",
    qr: "assets/img/qrs/qrManu.png"
  }
],

  // --- Presentaciones (sección "Presentaciones") ---
  // file puede ser una ruta simple ("assets/pdfs/x.pdf") o, como aquí,
  // un objeto {es, en} cuando el mismo documento existe en dos idiomas:
  // el sitio abre automáticamente la versión que coincide con el idioma activo.
  // Escribe el nombre del archivo tal cual está en la carpeta (con espacios normales si los tiene).
  presentationIcon: "assets/img/T_Documento.png",
  
  presentations: [
    {
      title: { es: "Spaceboy Films", en: "Spaceboy Films" },
      file: {
        es: "assets/pdfs/SPACEBOY ESP  FILMS.pdf",
        en: "assets/pdfs/SPACEBOY ENG  FILMS.pdf"
      }
    }
  ]
};
