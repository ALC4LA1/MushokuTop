# Historial del proyecto: MushokuTop

Este documento resume todo lo construido hasta ahora, en orden, para que puedas retomar el proyecto en cualquier momento (aquí o en otra herramienta como Claude Code / un editor local).

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
