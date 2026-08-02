/* ============================================================
   MushokuTop - script.js
   Contiene:
   1) navbarHTML(activePage)   -> genera la barra de navegación
   2) buildAccordion(...)      -> genera el acordeón de temporadas/episodios
   ============================================================ */

const LOGO_SRC = "logo.png"; // el logo real que subiste

// Dataset compartido de temporadas/episodios, usado por el buscador global
// y por las páginas de Sub Español / Latino (así solo se edita en un lugar).
const SEASON_DATA = [
  { name: "Temporada 1", episodes: 23, duration: 23 },
  { name: "Temporada 2", episodes: 25, duration: 24 },
  { name: "Temporada 3", episodes: 6,  duration: 23 },
];

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

/* ---------- Footer reutilizable ---------- */

function footerHTML(){
  return `
  <footer class="site-footer">
    <div class="footer-watermark">MushokuTop</div>
    <div class="footer-grid">
      <div class="footer-brand">
        <p class="footer-logo">Mushoku<span>Top</span></p>
        <p>El archivo digital dedicado a la Crónica de la Reencarnación.</p>
      </div>
      <div class="footer-col">
        <h4>Catálogo</h4>
        <a href="index.html">Inicio</a>
        <a href="sub-espanol.html">Sub Español</a>
        <a href="latino.html">Latino</a>
      </div>
      <div class="footer-col">
        <h4>Explorar</h4>
        <a href="#">Películas</a>
        <a href="#">Ovas</a>
        <a href="#">Otros animes</a>
      </div>
      <div class="footer-col">
        <h4>Comunidad</h4>
        <a href="#">Discord</a>
        <a href="#">Twitter / X</a>
        <a href="#">Instagram</a>
      </div>
    </div>
  </footer>`;
}

function renderFooter(){
  const slot = document.getElementById('footer-slot');
  if(slot) slot.innerHTML = footerHTML();
}

/* ---------- Acordeón de temporadas ---------- */

function episodeCard(epNum, duration, versionLabel){

  const metaText = versionLabel
    ? `${duration} min · ${versionLabel}`
    : `${duration} min`;

  return `
  <a href="player.html?ep=${epNum}" class="episode-card">
      <div class="ep-thumb">
          <span class="ep-num-badge">EP ${epNum}</span>

          <svg width="30" height="30" viewBox="0 0 24 24" fill="#c9a35c">
              <path d="M8 5v14l11-7z"/>
          </svg>

      </div>

      <div class="ep-info">
          <p class="ep-title">Capítulo ${epNum}</p>
          <p class="ep-meta">${metaText}</p>
      </div>
  </a>`;
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
    el.id = `season-${i+1}`;
    el.dataset.idx = i;
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

/* ---------- Buscador funcional (navbar) ----------
   Filtra los capítulos visibles según lo que se escriba.
   Entiende:
   - un número suelto ("5")            -> muestra el capítulo 5 de cada temporada
   - "temporada 2" / "season 2"        -> abre solo esa temporada completa
   - cualquier otro texto              -> busca coincidencia en el nombre de la temporada
------------------------------------------------------------- */
function initSearchFilter(accordionId){
  const input = document.querySelector('.search input');
  const root = document.getElementById(accordionId);
  if(!input || !root) return;

  function setMaxHeight(season){
    const body = season.querySelector('.season-body');
    body.style.maxHeight = season.classList.contains('open') ? body.scrollHeight + 'px' : '0px';
  }

  input.addEventListener('input', () => {
    const q = input.value.trim().toLowerCase();
    const seasons = root.querySelectorAll('.season');

    if(!q){
      seasons.forEach((season, i) => {
        season.style.display = '';
        season.querySelectorAll('.episode-card').forEach(c => c.style.display = '');
        // vuelve a dejar solo la última temporada abierta, como al cargar la página
        season.classList.toggle('open', i === seasons.length - 1);
        setMaxHeight(season);
      });
      return;
    }

    const seasonMatch = q.match(/(?:temporada|season)\s*(\d+)/);

    seasons.forEach((season, i) => {
      const seasonNum = i + 1;
      const seasonName = season.querySelector('.season-name').textContent.toLowerCase();
      let seasonHasMatch = false;

      season.querySelectorAll('.episode-card').forEach(card => {
        const title = card.querySelector('.ep-title').textContent.toLowerCase();
        const epNumMatch = title.match(/\d+/);
        const epNum = epNumMatch ? epNumMatch[0] : '';
        let cardMatches;

        if(seasonMatch){
          cardMatches = seasonNum === parseInt(seasonMatch[1], 10);
        } else if(/^\d+$/.test(q)){
          cardMatches = epNum === q;
        } else {
          cardMatches = title.includes(q) || seasonName.includes(q);
        }

        card.style.display = cardMatches ? '' : 'none';
        if(cardMatches) seasonHasMatch = true;
      });

      season.style.display = seasonHasMatch ? '' : 'none';
      season.classList.toggle('open', seasonHasMatch);
      setMaxHeight(season);
    });
  });
}

/* ---------- Deep-link por temporada (usado por los pósters del inicio) ----------
   Un enlace como sub-espanol.html#temporada-2 abre SOLO esa temporada
   (cierra las demás) y hace scroll hasta ella automáticamente.
------------------------------------------------------------- */
function openSeasonFromHash(accordionId){
  const match = window.location.hash.match(/temporada-(\d+)/);
  if(!match) return;

  const targetIdx = parseInt(match[1], 10) - 1;
  const root = document.getElementById(accordionId);
  if(!root) return;

  const seasons = root.querySelectorAll('.season');

  function setMaxHeight(season){
    const body = season.querySelector('.season-body');
    body.style.maxHeight = season.classList.contains('open') ? body.scrollHeight + 'px' : '0px';
  }

  seasons.forEach((season, i) => {
    season.classList.toggle('open', i === targetIdx);
    setMaxHeight(season);
  });

  const target = seasons[targetIdx];
  if(target){
    setTimeout(() => target.scrollIntoView({ behavior: 'smooth', block: 'start' }), 60);
  }
}

/* ---------- Desplegable de búsqueda con miniaturas (navbar, todas las páginas) ----------
   version: 'sub' | 'latino' | null
   - 'sub' / 'latino'  -> los resultados enlazan directo a esa versión, en esa temporada.
   - null (inicio)     -> cada resultado muestra 2 botones (Sub Español / Latino) para elegir.

   Entiende lo mismo que el filtro en página:
   - "temporada 2" / "season 2"     -> todos los episodios de esa temporada
   - un número solo ("5")           -> el episodio 5 de las 3 temporadas
   - "episodio 5" / "capitulo 5"    -> igual que arriba
   - cualquier otro texto           -> busca por nombre de temporada
------------------------------------------------------------- */
function initSearchDropdown(version){
  const search = document.querySelector('.search');
  const input = document.querySelector('.search input');
  if(!search || !input) return;

  const results = document.createElement('div');
  results.className = 'search-results';
  search.appendChild(results);

  function resultRow(sIdx, ep){
    const season = SEASON_DATA[sIdx];
    const thumb = `
      <div class="search-result-thumb">
        <svg width="16" height="16" viewBox="0 0 24 24" fill="#c9a35c"><path d="M8 5v14l11-7z"/></svg>
      </div>`;
    const info = `
      <div class="search-result-info">
        <p class="search-result-title">Capítulo ${ep} · ${season.name}</p>
        <p class="search-result-meta">${season.duration} min</p>
      </div>`;

    if(version){
      const page = version === 'latino' ? 'latino.html' : 'sub-espanol.html';
      return `
        <a class="search-result" href="${page}#temporada-${sIdx+1}">
          ${thumb}${info}
        </a>`;
    }

    // sin versión fija (inicio): dos botones de idioma en vez de un solo link
    return `
      <div class="search-result">
        ${thumb}${info}
        <div class="search-result-langs">
          <a href="sub-espanol.html#temporada-${sIdx+1}">Sub Español</a>
          <a href="latino.html#temporada-${sIdx+1}">Latino</a>
        </div>
      </div>`;
  }

  function render(query){
    const q = query.trim().toLowerCase();
    if(!q){ results.classList.remove('open'); results.innerHTML=''; return; }

    const seasonMatch = q.match(/(?:temporada|season)\s*(\d+)/);
    const epMatch = q.match(/(?:epi?sodio|ep|cap[ií]tulo)?\s*(\d+)/);

    let matches = [];
    SEASON_DATA.forEach((season, sIdx) => {
      for(let ep = 1; ep <= season.episodes; ep++){
        let isMatch;
        if(seasonMatch){
          isMatch = (sIdx+1) === parseInt(seasonMatch[1], 10);
        } else if(epMatch){
          isMatch = ep === parseInt(epMatch[1], 10);
        } else {
          isMatch = season.name.toLowerCase().includes(q);
        }
        if(isMatch) matches.push([sIdx, ep]);
      }
    });

    matches = matches.slice(0, 24); // límite razonable para no saturar el desplegable

    if(matches.length === 0){
      results.innerHTML = `<div class="search-empty">Sin resultados para "${query}"</div>`;
      results.classList.add('open');
      return;
    }

    results.innerHTML = matches.map(([sIdx, ep]) => resultRow(sIdx, ep)).join('');
    results.classList.add('open');
  }

  input.addEventListener('input', () => render(input.value));
  input.addEventListener('focus', () => { if(input.value) render(input.value); });
  document.addEventListener('click', (e) => {
    if(!search.contains(e.target)) results.classList.remove('open');
  });
}
