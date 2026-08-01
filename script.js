/* ============================================================
   MushokuTop - script.js
   Contiene:
   1) navbarHTML(activePage)   -> genera la barra de navegación
   2) buildAccordion(...)      -> genera el acordeón de temporadas/episodios
   ============================================================ */

const LOGO_SRC = "logo.png"; // el logo real que subiste

function navbarHTML(activePage){
  // activePage: 'inicio' | 'sub' | 'latino'  (para marcar el link activo)
  const isActive = (key) => activePage === key ? ' class="active"' : '';
  return `
  <header>
    <div class="nav-inner">
      <a class="logo" href="index.html" aria-label="MushokuTop, inicio">
        <img class="logo-img" src="${LOGO_SRC}" alt="MushokuTop">
      </a>

      <nav class="links">
        <a href="index.html"${isActive('inicio')}>Inicio</a>
        <a href="sub-espanol.html"${isActive('sub')}>Sub Español</a>
        <a href="latino.html"${isActive('latino')}>Latino</a>
        <div class="nav-more">
          <span class="nav-more-label">
            Más
            <svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
              <polyline points="6 9 12 15 18 9"></polyline>
            </svg>
          </span>
          <div class="nav-more-menu">
            <a href="#">Películas</a>
            <a href="#">Ovas</a>
            <a href="#">Otros animes</a>
          </div>
        </div>
      </nav>

      <div class="search">
        <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <circle cx="11" cy="11" r="7"/><line x1="21" y1="21" x2="16.65" y2="16.65"/>
        </svg>
        <input type="text" placeholder="Buscar episodio, temporada...">
      </div>
    </div>
  </header>`;
}

function renderNavbar(activePage){
  document.getElementById('navbar-slot').innerHTML = navbarHTML(activePage);
}

/* ---------- Acordeón de temporadas ---------- */

function episodeCard(epNum, duration, versionLabel){
  const metaText = versionLabel ? `${duration} min · ${versionLabel}` : `${duration} min`;
  return `
    <div class="episode-card" tabindex="0" role="button" aria-label="Reproducir capítulo ${epNum}">
      <div class="ep-thumb">
        <span class="ep-num-badge">EP ${epNum}</span>
        <svg width="30" height="30" viewBox="0 0 24 24" fill="#c9a35c"><path d="M8 5v14l11-7z"/></svg>
      </div>
      <div class="ep-info">
        <p class="ep-title">Capítulo ${epNum}</p>
        <p class="ep-meta">${metaText}</p>
      </div>
    </div>`;
}

/**
 * seasons: [{ name, episodes, duration, open }]
 * versionLabel: "Sub Español" | "Latino" | null (para la home, sin etiqueta)
 */
function buildAccordion(containerId, seasons, versionLabel){
  const root = document.getElementById(containerId);
  root.innerHTML = '';

  seasons.forEach((season, i) => {
    const el = document.createElement('div');
    el.className = 'season' + (season.open ? ' open' : '');
    el.innerHTML = `
      <button class="season-header" data-idx="${i}">
        <div class="season-title">
          <span class="season-num">S${i+1}</span>
          <span class="season-name">${season.name}</span>
          <span class="season-count">${season.episodes} episodios</span>
        </div>
        <svg class="chevron" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
          <polyline points="6 9 12 15 18 9"></polyline>
        </svg>
      </button>
      <div class="season-body">
        <div class="episodes-grid">
          ${Array.from({length: season.episodes}, (_, k) => episodeCard(k+1, season.duration, versionLabel)).join('')}
        </div>
      </div>`;
    root.appendChild(el);
  });

  function setMaxHeight(season){
    const body = season.querySelector('.season-body');
    body.style.maxHeight = season.classList.contains('open') ? body.scrollHeight + 'px' : '0px';
  }

  root.querySelectorAll('.season').forEach(setMaxHeight);

  root.addEventListener('click', (e) => {
    const btn = e.target.closest('.season-header');
    if(!btn) return;
    const season = btn.closest('.season');
    season.classList.toggle('open');
    setMaxHeight(season);
  });

  window.addEventListener('resize', () => {
    root.querySelectorAll('.season.open').forEach(setMaxHeight);
  });
}
