# Cómo cambiar las imágenes de MushokuTop

Todas las imágenes del sitio viven en una sola carpeta: **`assets/`**, dentro de `mushokutop/`. No necesitas tocar ningún código: solo reemplaza el archivo manteniendo el mismo nombre, o si usas otro nombre/formato, cambia una línea en el HTML (te muestro exactamente cuál).

```
mushokutop/
├── assets/
│   ├── hero-fondo.jpg              → imagen grande de fondo del inicio
│   ├── poster-temporada-1.jpg      → póster de la Temporada 1
│   ├── poster-temporada-2.jpg      → póster de la Temporada 2
│   ├── poster-temporada-3.jpg      → póster de la Temporada 3
│   └── destacada.jpg               → imagen ancha debajo de los pósters
├── index.html
├── sub-espanol.html
├── latino.html
├── style.css
├── script.js
└── logo.png
```

## Opción más fácil: mismo nombre, mismo formato

1. Abre la carpeta `assets/`.
2. Arrastra tu imagen nueva y ponle **exactamente** el mismo nombre que la que quieres reemplazar (por ejemplo `hero-fondo.jpg`), aceptando sobrescribir.
3. Guarda y recarga la página en el navegador (Ctrl+R o Cmd+R). Listo, no hay que tocar nada más.

Ahora mismo esos 5 archivos son solo **imágenes de relleno** (fondos grises con el nombre escrito) para que puedas ver dónde va cada una sin que la página se vea rota. Reemplázalas por tus artes cuando quieras.

## Si tu imagen tiene otro nombre o formato (.png, .webp, etc.)

Edita el archivo HTML correspondiente y cambia el `src` de la etiqueta `<img>`:

- **Fondo del inicio** → en `index.html`, busca:
  `<img class="hero-bg-img" src="assets/hero-fondo.jpg" alt="">`
  y cambia `assets/hero-fondo.jpg` por el nombre de tu archivo.

- **Póster de una temporada** → en `index.html`, busca la tarjeta correspondiente, por ejemplo:
  `<img src="assets/poster-temporada-1.jpg" alt="Temporada 1">`

- **Imagen ancha inferior** → en `index.html`:
  `<img src="assets/destacada.jpg" alt="Arte destacado de Mushoku Tensei">`

- **Logo** → está en `script.js`, en la línea:
  `const LOGO_SRC = "logo.png";`
  (cambiar aquí lo actualiza automáticamente en las 3 páginas, ya que el logo se genera desde ahí).

## Medidas recomendadas (para que no se vean estiradas o pixeladas)

| Imagen | Medida aproximada | Forma |
|---|---|---|
| `hero-fondo.jpg` | 1920 x 900 px | horizontal (paisaje) |
| `poster-temporada-X.jpg` | 800 x 1000 px | vertical (tipo póster) |
| `destacada.jpg` | 1920 x 820 px | horizontal (panorámica) |
| `logo.png` | cualquiera, pero con fondo transparente | horizontal |

No es obligatorio que sea exacto — el sitio recorta automáticamente (`object-fit: cover`) para que la imagen llene el espacio sin deformarse. Solo evita imágenes muy pequeñas, porque se verían pixeladas al estirarse.

## Formatos que funcionan

`.jpg`, `.png`, `.webp` — cualquiera de los tres, siempre que actualices la extensión en el `src` si cambias de formato.
