# Spaceboy Reels

Sitio estático con reels, español/inglés, sección de presentaciones (PDF) y sección de contacto (QRs).

## Estructura

```
index.html                → estructura de la página (no la tocas)
config.js                 → AQUÍ editas todo: logo, textos, videos, presentaciones, contactos
assets/css/style.css      → estilos (no lo tocas)
assets/js/main.js         → arma la página e idiomas a partir de config.js (no lo tocas)
assets/img/               → coloca aquí tu logo
assets/img/qrs/           → coloca aquí las imágenes de los QRs de contacto
assets/pdfs/              → coloca aquí los PDFs de presentaciones
```

## Logo

Sube tu archivo (ej. `logo.png`, fondo transparente recomendado) a `assets/img/`, y en `config.js` pon:

```js
logo: "assets/img/logo.png",
```

Se usa en dos lugares automáticamente: grande arriba del sitio, y chico fijo en la esquina inferior izquierda mientras se navega.

## Idioma (ES/EN)

El botón de arriba a la derecha cambia todo el sitio entre español e inglés. Todo texto en `config.js` que se vea en el sitio (título del video, descripción, nombre del estudio, etc.) va en este formato:

```js
{ es: "Texto en español", en: "Text in English" }
```

Si algún día agregas un video nuevo, copia ese mismo patrón para su título y descripción.

## Presentaciones (PDF)

1. Sube el archivo PDF a `assets/pdfs/`.
2. Agrega un bloque en `presentations` dentro de `config.js`:

```js
{
  title: { es: "Nombre de la presentación", en: "Presentation name" },
  file: "assets/pdfs/nombre-del-archivo.pdf"
}
```

Al hacer clic, se abre el PDF dentro del sitio con un botón "Volver" para regresar a la lista.

## Contacto (QRs)

1. Sube cada imagen de QR a `assets/img/qrs/`.
2. Agrega un bloque en `contacts` dentro de `config.js` con los datos de esa persona:

```js
{
  name: "Nombre Apellido",
  role: "Puesto",              // opcional
  phone: "+52 55 0000 0000",   // opcional
  email: "nombre@spaceboy.mx", // opcional
  qr: "assets/img/qrs/nombre.png"
}
```

Los campos de teléfono y correo se muestran como links (clic para llamar o escribir).

## Sobre alojar los videos

No subas los videos pesados al repo de GitHub (límites de tamaño/ancho de banda). Súbelos a YouTube (puede ser "No listado") o Vimeo, y solo pon el ID en `config.js`. Los PDFs y las imágenes de QR sí puedes subirlos directo al repo — son archivos ligeros.

## Publicar / actualizar en GitHub Pages

Mismo proceso que ya usaste: sube los archivos al repositorio (arrastrando o editando directo en github.com) y confirma con "Commit changes". El sitio se actualiza solo en un par de minutos. Si es la primera vez, activa Settings → Pages → rama `main`, carpeta `/ (root)`.
