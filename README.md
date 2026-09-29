# Spaceboy Reels

Sitio de una sola página (scroll) con secciones: Reels → Contacto → Presentaciones. Español/inglés. El menú hamburguesa navega dentro de la misma página.

## Estructura

```
index.html                → estructura de la página (no la tocas)
config.js                 → AQUÍ editas todo: logo, textos, videos, contactos, presentaciones
assets/css/style.css      → estilos (no lo tocas)
assets/js/main.js         → arma la página e idiomas a partir de config.js (no lo tocas)
assets/img/               → coloca aquí tu logo
assets/img/qrs/           → coloca aquí las imágenes de los QRs de contacto
assets/pdfs/              → coloca aquí los PDFs de presentaciones
```

## Logo

Sube tu archivo (ej. `logo.png`, fondo transparente recomendado) a `assets/img/`, y en `config.js`:

```js
logo: "assets/img/logo.png",
```

Se usa grande arriba del sitio y chico fijo en la esquina inferior izquierda mientras se navega.

## Idioma (ES/EN)

El botón de arriba a la derecha cambia todo el sitio. Cualquier texto visible en `config.js` va así:

```js
{ es: "Texto en español", en: "Text in English" }
```

## Presentaciones (PDF)

1. Sube el PDF a `assets/pdfs/` (el nombre puede tener espacios y mayúsculas, tal cual).
2. Agrega un bloque en `presentations` dentro de `config.js`.

Si el mismo documento existe en español e inglés (como "Spaceboy Films"), usa un objeto `{es, en}` en `file` para que el sitio abra automáticamente la versión correcta según el idioma activo:

```js
{
  title: { es: "Nombre", en: "Name" },
  file: {
    es: "assets/pdfs/NOMBRE ESP.pdf",
    en: "assets/pdfs/NOMBRE ENG.pdf"
  }
}
```

Si solo hay una versión (sin importar idioma), usa una ruta simple:

```js
{
  title: { es: "Nombre", en: "Name" },
  file: "assets/pdfs/nombre-del-archivo.pdf"
}
```

**Importante:** el texto de `file` debe coincidir EXACTAMENTE con el nombre del archivo en la carpeta `assets/pdfs/` (mayúsculas/minúsculas y espacios incluidos) — no hace falta escribir `%20` ni nada especial, el sitio lo convierte automáticamente. Si un PDF no carga, lo primero a revisar es que el nombre en `config.js` sea idéntico al del archivo subido.

Al hacer clic en una presentación se abre un visor con el PDF encima de la página, con botón de cerrar (✕) para regresar fácilmente a donde estabas.

## Contacto (QRs)

1. Sube cada imagen de QR a `assets/img/qrs/`.
2. Agrega un bloque en `contacts` dentro de `config.js`:

```js
{
  name: "Nombre Apellido",
  role: "Puesto",              // opcional
  phone: "+52 55 0000 0000",   // opcional
  email: "nombre@spaceboy.mx", // opcional
  qr: "assets/img/qrs/nombre.png"
}
```

## Sobre alojar los videos

No subas los videos pesados al repo de GitHub. Súbelos a YouTube ("No listado") o Vimeo, y solo pon el ID en `config.js`. Los PDFs y las imágenes de QR sí puedes subirlos directo — son archivos ligeros.

## Publicar / actualizar en GitHub Pages

Sube los archivos al repositorio (arrastrando o editando directo en github.com) y confirma con "Commit changes". El sitio se actualiza solo en un par de minutos.
