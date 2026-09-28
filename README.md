# Spaceboy Reels

Sitio estático simple para mostrar reels de video, con branding editable (logo, colores, nombre de evento).

## Estructura

```
index.html          → estructura de la página (normalmente no la tocas)
config.js            → AQUÍ editas todo: colores, logo, nombre de evento y lista de videos
assets/css/style.css → estilos (usa las variables de color que defines en config.js)
assets/js/main.js    → arma la página a partir de config.js (no necesitas tocarlo)
assets/img/          → coloca aquí tu logo si usas uno local
```

## Cómo agregar o cambiar videos

Edita el arreglo `videos` en `config.js`. Cada video necesita:

- `title` / `description`
- `type`: `"youtube"`, `"vimeo"` o `"mp4"`
- `src`:
  - YouTube → solo el ID del video (lo que va después de `v=` en la URL). Puedes subir el video como **"No listado"** para que no aparezca en búsquedas pero sí se pueda reproducir aquí.
  - Vimeo → el ID numérico del video.
  - `mp4` → la URL completa de un archivo de video alojado en otro lado (ver siguiente sección).
- `thumbnail` (opcional): si lo dejas vacío, para YouTube se genera automáticamente.

## Cómo rebrandear para un evento

Todo se hace en `config.js`, sin tocar código:

- `siteTitle`, `eventName`, `footerText` → textos
- `logo` → ruta a una imagen (ej. `"assets/img/logo.png"`, colócala en esa carpeta); si lo dejas vacío se usa el texto de `siteTitle`
- `colors` → cambia los valores hex para el fondo, tarjetas, texto y color de acento

Puedes tener una copia de `config.js` por evento (ej. `config-evento-x.js`) y renombrarla a `config.js` cuando publiques esa versión, si quieres mantener varias marcas listas.

## Sobre alojar los videos

GitHub (y GitHub Pages, que es gratis) **no es buen lugar para subir los archivos de video pesados**: hay límites de tamaño por archivo y de ancho de banda, y el repositorio se vuelve lento de clonar/actualizar.

Recomendación:
- Sube los videos a **YouTube** (como "No listado", no aparecen en búsquedas ni en tu canal público, pero el link/embed funciona) o a **Vimeo**. Es gratis y es lo más simple de mantener.
- Si de verdad necesitas `mp4` autohospedado, usa un servicio de almacenamiento/CDN aparte (ej. Cloudflare R2, Bunny.net, Backblaze B2) y pon esa URL en `src`. El sitio en GitHub Pages solo sirve el HTML/CSS/JS, no los videos.

## Cómo publicarlo gratis con GitHub Pages

1. Crea un repositorio nuevo en GitHub (puede ser público o privado si tienes cuenta paga; Pages gratis requiere que sea público en cuentas gratuitas).
2. Sube estos archivos a la raíz del repositorio (puedes arrastrarlos desde la interfaz web de GitHub, sin usar la terminal).
3. Ve a **Settings → Pages**.
4. En "Source" elige la rama `main` y la carpeta `/ (root)`. Guarda.
5. GitHub te da una URL tipo `https://tu-usuario.github.io/tu-repo/` — tarda uno o dos minutos en activarse la primera vez.

## Cómo actualizarlo después

Para agregar un video nuevo o cambiar colores/logo: edita `config.js` directamente en GitHub (botón de lápiz ✏️ sobre el archivo, en la web de GitHub, sin necesitar nada instalado) y confirma el cambio ("Commit changes"). El sitio se actualiza solo en un par de minutos.
