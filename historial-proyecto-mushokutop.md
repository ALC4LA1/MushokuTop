# Historial del proyecto: MushokuTop

<!-- Este documento resume todo lo construido hasta ahora, en orden, para que puedas retomar el proyecto en cualquier momento (aquí o en otra herramienta como Claude Code / un editor local). -->

---

## 1. Origen del proyecto

Se partió de un boceto dibujado a mano de una web de streaming/catálogo de anime llamada **MushokuTop**, enfocada específicamente en el anime *Mushoku Tensei*. El boceto incluía:

- Un logo arriba a la izquierda.
- Navbar con: Inicio, Temporadas, Sub Español, Latino, Buscador.
- Un banner grande de "Episodio más reciente".
- Una caja de "Redes sociales".
- Una lista de temporadas en formato acordeón (se abren/cierran), cada una mostrando sus capítulos con una miniatura pequeña.
- Indicaciones de que la paleta debía ser negro y dorado, "limpia y con buen espacio".

**Aclaración de derechos de autor:** en ningún momento se recreó el logo original de *Mushoku Tensei* (propiedad del estudio/editorial). El primer logo del sitio fue un wordmark original inspirado en la estética dorada de fantasía. Más adelante reemplazamos ese logo por una imagen que tú mismo generaste y subiste (con el texto "Mushoku Top"), así que ese sí es tuyo y se usa directamente.

## 2. Primera versión (archivo único)

Se construyó un primer prototipo funcional en **un solo archivo HTML** (con el CSS y el JavaScript incrustados dentro de ese mismo archivo, en las etiquetas `<style>` y `<script>`). Incluía:

- Navbar fija (sticky) con logo, links y buscador.
- Banner destacado del episodio más reciente, con marco decorativo.
- Caja de redes sociales (Twitter/X, Discord, Instagram, Facebook).
- Acordeón de 4 temporadas (11, 12, 12 y 12 episodios, número de ejemplo inicial), con la última abierta por defecto.
- Diseño responsive (se adapta a pantallas pequeñas).

## 3. Ajustes de marca e imagen

- Se reemplazó el logo generado por Claude con **tu imagen real** (el logo dorado/negro con la "O" en forma de ojo que generaste con IA), incrustándola directamente en el HTML en formato **base64** para que se viera sin depender de un archivo aparte (esto solucionó el problema de "no se ve el logo").
- Se ajustó la paleta de colores para igualar los tonos de esa imagen (dorado/ámbar sobre negro).
- Se corrigieron las temporadas a los datos reales que diste: **Temporada 1 (23 episodios), Temporada 2 (25 episodios), Temporada 3 (6 episodios)** — reemplazando las 4 temporadas de ejemplo iniciales.
- Se simplificó la paleta a pedido tuyo: menos saturada, tonos más "bronce" apagado en vez de dorado brillante, quitando adornos como el patrón diagonal del banner y el doble marco, para que se viera "limpio y sencillo".
- Se aumentó el tamaño del logo en la barra de navegación (de 54px a 88px de alto).

## 4. Separación en 3 archivos + páginas por idioma (versión actual)

A tu pedido, el proyecto se reorganizó en archivos separados, como un proyecto de desarrollo real:

```
mushokutop/
├── index.html          → página de inicio
├── sub-espanol.html     → listado de episodios en Sub Español
├── latino.html          → listado de episodios en Latino
├── style.css            → todo el CSS del sitio
├── script.js            → toda la lógica en JavaScript
└── logo.png             → tu logo
```

### Cambios de navegación pedidos y aplicados:
- Se **quitó el botón "Temporadas"** de la barra de navegación.
- Nuevo orden del navbar: **Buscar episodio/temporada (input) → Inicio → Sub Español → Latino → Más**.
- **"Más"** ahora es un menú desplegable: al pasar el mouse por encima aparecen las opciones **Películas, Ovas, Otros animes** (por ahora enlazan a `#`, listas para conectarse a páginas reales más adelante).
- **"Sub Español"** enlaza a `sub-espanol.html`, una página dedicada solo a esa versión.
- **"Latino"** enlaza a `latino.html`, una página dedicada solo a esa versión.
- La página de inicio (`index.html`) conserva el resumen general de temporadas (sin la etiqueta de idioma), y desde ahí también se puede navegar a las páginas de Sub Español / Latino mediante el navbar.

### Duración real de los episodios (investigada, no inventada):
Se buscó información real sobre cuánto dura cada episodio de *Mushoku Tensei* (fuentes: Wikipedia, Grokipedia, LiveChart, notas de prensa de Crunchyroll). Resultado:
- **Temporada 1:** ~23 minutos por episodio.
- **Temporada 2:** ~24 minutos por episodio.
- **Temporada 3:** ~23 minutos por episodio (dato de prensa reciente sobre el episodio 5).

Estos valores ya no son genéricos ("24 min" para todo); varían por temporada. Además, en `sub-espanol.html` cada capítulo muestra **"23 min · Sub Español"** y en `latino.html` muestra **"24 min · Latino"** (el minutaje según la temporada + la etiqueta de idioma correspondiente), tal como pediste.

*Nota honesta: no existen fuentes públicas que detallen la duración exacta de CADA episodio individual (episodio por episodio); lo que sí está documentado es el promedio por temporada, que es lo que se usó.*

### Cómo funciona técnicamente:
- `script.js` genera el navbar de forma dinámica con una función `navbarHTML()`, así los 3 archivos HTML no repiten el mismo código de navegación — cualquier cambio futuro al navbar se hace en un solo lugar.
- También genera el acordeón de temporadas/episodios con una función `buildAccordion()`, reutilizada en las 3 páginas, pasando distintos datos (duración y etiqueta de idioma) según corresponda.

## 5. Estado actual / próximos pasos posibles

Lo que existe ahora es un **prototipo navegable** (mock funcional), no conectado a datos ni video real. Ideas para continuar, si quieres:
- Conectar los botones "Ver ahora" y las tarjetas de episodio a videos reales o a un reproductor.
- Hacer funcional el buscador (ahora es solo visual).
- Agregar contenido real a "Películas", "Ovas" y "Otros animes".
- Migrar a un framework (React, Vue) si el proyecto crece más.
- Conseguir miniaturas reales de cada episodio para reemplazar los placeholders.

---
*Este archivo se puede actualizar cada vez que se agregue algo nuevo al proyecto, para llevar un registro ordenado del avance.*

---

## 6. Rediseño de la portada (inspirado en una maqueta hecha en Base44)

Se compartió una captura de una versión de referencia de MushokuTop hecha con otra herramienta (Base44), con una portada tipo "landing" en vez de un listado de temporadas. Se replicó la **estructura y estilo** (no las imágenes, esas las pone el usuario):

- **Hero de ancho completo** con imagen de fondo, insignia "Estreno reciente", título en dos líneas (blanco + dorado, tipografía serif Cormorant Garamond) y dos botones: "Ver ahora" (sólido) y "Explorar temporadas" (contorno, hace scroll a la galería).
- **Galería de temporadas**: 3 pósters (Temporada 1, 2 y 3) en fila, más una imagen panorámica grande debajo.
  - Al pasar el mouse sobre un póster aparece una superposición con el nombre de la temporada y dos botones: **Sub Español** y **Latino**.
  - Al hacer clic en cualquiera de esos dos botones, se abre `sub-espanol.html` o `latino.html` directamente en esa temporada específica (por ejemplo, clic en "Latino" del póster de Temporada 2 lleva a `latino.html#temporada-2`, que abre automáticamente solo esa temporada y hace scroll hasta ella).
- **Caja "Únete a la comunidad"** al lado de los pósters (antes decía "Redes sociales").
- **Footer nuevo** de 4 columnas (marca, Catálogo, Explorar, Comunidad), presente ahora en las 3 páginas.

Esto resolvió el problema de "contenido duplicado" que se discutió antes: el inicio ya **no repite el listado completo de episodios** — ahora es una portada/vitrina que enlaza a las páginas de Sub Español y Latino, que son las que tienen el detalle completo.

## 7. Buscador funcional

El campo de búsqueda de la barra de navegación (antes solo visual) ahora **filtra en vivo** los episodios en las páginas de Sub Español y Latino:
- Escribir un número (ej. `5`) muestra el capítulo 5 de cada temporada.
- Escribir "temporada 2" (o "season 2") abre solo esa temporada completa.
- Cualquier otro texto busca coincidencias en el nombre de la temporada.
- Al borrar la búsqueda, vuelve al estado inicial (última temporada abierta).

## 8. Sistema de imágenes reemplazables

Se creó una carpeta `assets/` con 5 imágenes de relleno (marcador de posición) para: el fondo del hero, los 3 pósters de temporada, y la imagen panorámica inferior. Se agregó un archivo **`COMO-CAMBIAR-IMAGENES.md`** con instrucciones paso a paso para que el usuario reemplace esas imágenes por las suyas (mismo nombre = no hay que tocar código; nombre distinto = se indica exactamente qué línea cambiar en cada archivo).

## 9. Estado actual de la estructura de archivos

```
mushokutop/
├── assets/
│   ├── hero-fondo.jpg
│   ├── poster-temporada-1.jpg
│   ├── poster-temporada-2.jpg
│   ├── poster-temporada-3.jpg
│   └── destacada.jpg
├── index.html            → portada (hero + galería de pósters + footer)
├── sub-espanol.html       → episodios en Sub Español (con buscador funcional)
├── latino.html            → episodios en Latino (con buscador funcional)
├── style.css
├── script.js              → navbar, footer, acordeón, buscador y deep-linking por temporada
├── logo.png
└── COMO-CAMBIAR-IMAGENES.md
```

## 10. Opiniones discutidas (sin implementar todavía)

Antes de este rediseño se conversó sobre **qué sentido le daría el inicio si no repite el catálogo**. Se plantearon 4 ideas (portada simple, "continuar viendo", noticias del sitio, hub de varios animes). Se optó por una combinación de "portada simple" — lo cual ya quedó implementado en la sección 6. La idea de agregar una sección de "novedades" en el inicio quedó pendiente, no descartada, por si se quiere retomar más adelante.

---

## 11. Corrección del "cuadro desconectado" + iconos sociales + Facebook

**Problema reportado:** debajo de la caja "Únete a la comunidad" aparecía un rectángulo vacío, separado visualmente del resto, como flotando.

**Causa técnica:** en `style.css`, la clase `.social-box` tenía `height: 100%`. Como esa caja vive dentro de una fila de grid (`.gallery-grid`, con `grid-template-rows`) compartida con los pósters —que son más altos por su relación de aspecto 4:5—, el navegador estira el elemento hijo (`.social-box`) para que ocupe el 100% de esa altura de fila, aunque su contenido (los 3 links) ocupe mucho menos. Esa diferencia de alto quedaba como espacio vacío dentro de la misma caja, pero visualmente se leía como un bloque aparte.

**Solución aplicada:**
- Se quitó `height: 100%` de `.social-box` (ahora es `height: auto`, se ajusta a su contenido real).
- Se agregó `align-self: start;` a `.sidebar-community` (el contenedor que envuelve el título + la caja), para que tampoco se estire dentro de su fila del grid.

**Iconos reales agregados:** cada link de red social ahora tiene un `<span class="social-icon">` con un SVG adentro (Twitter/X, Discord, Instagram, y el nuevo Facebook), en vez de ser solo texto. Se armó una nueva variante de layout para `.social-link` (ícono a la izquierda en un cuadrito, texto + usuario a la derecha en columna).

## 12. Buscador con resultados en vivo (autocompletado)

Se agregó una función nueva en `script.js`: `initSearchDropdown(version)`.

**Cómo funciona por dentro:**
1. Se centralizaron los datos de temporadas en una sola constante compartida, `SEASON_DATA` (antes cada página repetía su propio array `SEASONS`). Esto también sirve para que el buscador pueda recorrer todos los episodios de todas las temporadas sin depender de qué página esté mostrando el acordeón.
2. La función crea un `<div class="search-results">` y lo inserta dentro de la caja del buscador (`.search`), que ahora tiene `position: relative` para que ese panel de resultados se pueda posicionar justo debajo (`position: absolute`) sin mover el resto del diseño.
3. Cada vez que el usuario escribe (evento `input`), se interpreta el texto con expresiones regulares:
   - Si contiene `"temporada N"` o `"season N"` → filtra por esa temporada exacta.
   - Si es un número solo, o va acompañado de "episodio"/"capítulo"/"ep" → busca ese número de capítulo **en las 3 temporadas a la vez**.
   - Cualquier otro texto → compara contra el nombre de la temporada.
4. Por cada coincidencia se arma una fila (`resultRow()`) con una miniatura (mismo estilo visual que las tarjetas de episodio ya existentes, con un ícono de "play"), el texto ("Capítulo 5 · Temporada 1") y la duración.
5. **Diferencia según la página:**
   - En `sub-espanol.html` y `latino.html`, la función recibe `'sub'` o `'latino'` como parámetro, así que cada resultado es un link directo a esa misma versión (`#temporada-N`).
   - En `index.html`, se llama `initSearchDropdown(null)` porque ahí no hay un idioma elegido todavía — por eso cada resultado muestra **dos botones** ("Sub Español" / "Latino") en vez de un solo link.
6. Se agregó un listener en `document` que cierra el panel de resultados si el usuario hace clic fuera de la caja de búsqueda.

**Limitación honesta:** las miniaturas siguen siendo un ícono genérico (no hay foto real por episodio todavía). Si en el futuro se quieren fotos específicas por capítulo, habría que agregar un campo de imagen por episodio en `SEASON_DATA` — no está armado todavía porque no hay esas imágenes.

## 13. Deep-linking dinámico (sin recargar la página)

Antes, `openSeasonFromHash()` solo se ejecutaba una vez, al cargar la página. Ahora se agregó, en `sub-espanol.html` y `latino.html`:

```js
window.addEventListener('hashchange', () => openSeasonFromHash('accordion'));
```

Esto hace que, si ya estás en `latino.html` y haces clic en un resultado del buscador que apunta a `latino.html#temporada-2` (technically la misma página, solo cambia el `#`), la temporada correcta se abra y haga scroll **sin recargar la página completa** — el navegador detecta el cambio de hash y dispara el evento.

## 14. Nueva guía de auto-edición: `COMO-FUNCIONA-Y-EDITAR.md`

A pedido explícito, se creó un archivo separado (no es parte del historial, es una guía práctica) que explica, paso a paso y con código de ejemplo, cómo hacer los cambios más comunes sin depender de la IA:
- Cómo funciona la organización de archivos (qué va en `.html`, qué en `.css`, qué en `.js`).
- Cómo aumentar/reducir espacios entre secciones (tabla con las líneas exactas de `style.css` a tocar).
- Cómo cortar la imagen `destacada.jpg` en dos mitades independientes (código exacto a pegar).
- Cómo agregar una temporada nueva completa (tanto los datos en `SEASON_DATA` como el póster visual en el inicio).
- Dónde cambiar textos sueltos (hero, footer, menú "Más") y los colores generales del sitio (variables en `:root`).

## 15. Nueva convención para este historial (a partir de ahora)

Desde este punto, cada vez que se agregue o cambie algo, este historial va a incluir **el detalle técnico de cómo se hizo** (qué archivo, qué función, por qué esa solución y no otra) — no solo la descripción de "qué cambió" desde el punto de vista del usuario. Así el historial también sirve como documentación de aprendizaje del propio código, no solo como bitácora de pedidos.
