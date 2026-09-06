(function () {
  "use strict";

  const Engine = window.AbyssEngine;
  const Storage = window.AbyssStorage;
  const ScenarioTools = window.AbyssScenarioTools;
  const builtInScenarios = [...window.ABYSS_SCENARIOS];
  const galleryArt = [
    ["assets/art-webp/vision-carmesi.webp", "Visión carmesí"], ["assets/art-webp/pozo-rojo.webp", "Pozo rojo"], ["assets/art-webp/boca-cosmica.webp", "Boca cósmica"],
    ["assets/art-webp/umbral-incandescente.webp", "Umbral incandescente"], ["assets/art-webp/espiral-del-umbral.webp", "Espiral del umbral"], ["assets/art-webp/puerta-luz.webp", "Puerta de luz"],
    ["assets/art-webp/orbe-rojo.webp", "Orbe rojo"], ["assets/art-webp/memoria-agua.webp", "Memoria del agua"], ["assets/art-webp/hoyo-blanco.webp", "Hoyo blanco"],
    ["assets/art-webp/planeta-negro.webp", "Planeta negro"], ["assets/art-webp/ventana-roja.webp", "Ventana roja"], ["assets/art-webp/mensajero-oscuro.webp", "Mensajero oscuro"]
  ];

  const app = {
    route: "home",
    scenarios: [],
    customScenarios: [],
    adventures: [],
    selectedScenario: null,
    current: null,
    mode: "do",
    settings: Storage.getSettings(),
    busy: false,
    undo: [],
    redo: [],
    editingTurnId: null,
    lastContext: null,
    audio: null,
    audioMaster: null,
    audioNodes: [],
    installPrompt: null,
    channel: null,
    immersionTimer: 0
  };

  let heroMotionFrame = 0;

  const $ = (selector, root) => (root || document).querySelector(selector);
  const $$ = (selector, root) => [...(root || document).querySelectorAll(selector)];

  function escapeHtml(value) {
    return String(value == null ? "" : value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#039;");
  }

  function safeColor(value) {
    return /^#[0-9a-f]{6}$/i.test(String(value || "")) ? value : "#b9db6d";
  }

  function safeArtPath(value, fallback) {
    const path = String(value || "");
    return /^assets\/art-webp\/[a-z0-9._-]+\.webp$/i.test(path) ? path : fallback;
  }

  function formatDate(value) {
    try {
      return new Intl.DateTimeFormat("es-ES", { day: "2-digit", month: "short", hour: "2-digit", minute: "2-digit" }).format(new Date(value));
    } catch (_) {
      return "fecha desconocida";
    }
  }

  function initials(name) {
    const parts = String(name || "?").trim().split(/\s+/).filter(Boolean);
    return (parts[0] ? parts[0][0] : "?") + (parts[1] ? parts[1][0] : "");
  }

  function toast(message, type) {
    const region = $("#toast-region");
    const item = document.createElement("div");
    item.className = `toast${type === "error" ? " is-error" : ""}`;
    item.textContent = message;
    region.appendChild(item);
    setTimeout(() => {
      item.classList.add("is-leaving");
      setTimeout(() => item.remove(), 220);
    }, type === "error" ? 6500 : 3600);
  }

  function isInstalledApp() {
    return window.matchMedia("(display-mode: standalone)").matches || window.navigator.standalone === true;
  }

  function installEnvironment() {
    const ua = navigator.userAgent || "";
    const isIOS = /iPad|iPhone|iPod/.test(ua) || (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);
    const isEdge = /Edg\//.test(ua);
    const isChrome = /Chrome\//.test(ua) && !isEdge;
    return { isIOS, isEdge, isChrome, isFile: location.protocol === "file:" };
  }

  function updateInstallHelp() {
    const title = $("#install-help-title");
    const copy = $("#install-help-copy");
    const steps = $("#install-help-steps");
    const env = installEnvironment();
    if (!title || !copy || !steps) return;

    if (isInstalledApp()) {
      title.textContent = "Aplicación ya instalada";
      copy.textContent = "Caminos Malditos Sangrientos ya se está ejecutando como aplicación instalada.";
      steps.innerHTML = "<li>Puedes cerrarla y volver a abrirla desde el menú Inicio, escritorio o lanzador del dispositivo.</li>";
      return;
    }
    if (env.isFile) {
      title.textContent = "La instalación necesita HTTPS o localhost";
      copy.textContent = "Abrir index.html directamente desde el ZIP o el disco no permite que el navegador ofrezca la instalación PWA.";
      steps.innerHTML = "<li>Publica la carpeta en GitHub Pages o sírvela desde localhost.</li><li>Abre después la URL en Chrome o Edge y pulsa de nuevo Instalar.</li>";
      return;
    }
    if (env.isIOS) {
      title.textContent = "Instalar en iPhone o iPad";
      copy.textContent = "Safari no muestra el cuadro de instalación automático de otras plataformas.";
      steps.innerHTML = "<li>Abre esta página en Safari.</li><li>Pulsa Compartir.</li><li>Elige Añadir a pantalla de inicio y confirma.</li>";
      return;
    }
    if (env.isEdge) {
      title.textContent = "Instalar desde Microsoft Edge";
      copy.textContent = "Edge todavía no ha ofrecido el diálogo automático para esta sesión.";
      steps.innerHTML = "<li>Abre el menú ⋯.</li><li>Entra en Aplicaciones.</li><li>Selecciona Instalar Caminos Malditos Sangrientos.</li>";
      return;
    }
    if (env.isChrome) {
      title.textContent = "Instalar desde Google Chrome";
      copy.textContent = "Chrome no ha ofrecido todavía el diálogo nativo. La app comprobará el Service Worker y el manifest, pero Chrome decide cuándo habilita el prompt de instalación.";
      steps.innerHTML = "<li>Espera a que termine la primera carga y recarga una vez si acabas de actualizar.</li><li>Busca el icono de instalación en la barra de direcciones o abre ⋮ → Transmitir, guardar y compartir → Instalar página como aplicación.</li><li>Si no aparece, abre chrome://apps para comprobar que no exista ya una instalación anterior y vuelve a esta URL HTTPS.</li>";
      return;
    }
    title.textContent = "Instalar como aplicación";
    copy.textContent = "Este navegador no ha expuesto el instalador automático. La app sigue siendo completamente utilizable desde la web.";
    steps.innerHTML = "<li>Busca en el menú del navegador una opción como Instalar aplicación, Añadir a inicio o Crear acceso directo.</li><li>Para la experiencia PWA más completa en PC, usa Chrome o Edge mediante HTTPS.</li>";
  }

  function updateInstallButton() {
    const button = $("#install-app");
    if (!button) return;
    const installed = isInstalledApp();
    button.hidden = installed;
    button.classList.toggle("is-ready", Boolean(app.installPrompt));
    button.setAttribute("aria-disabled", "false");
    const label = $(".install-label", button);
    if (label) label.textContent = app.installPrompt ? "Instalar app" : "Instalar";
  }

  async function installApp() {
    if (isInstalledApp()) {
      updateInstallHelp();
      showDialog("install-help-dialog");
      return;
    }
    if (!app.installPrompt) {
      updateInstallHelp();
      showDialog("install-help-dialog");
      return;
    }
    try {
      app.installPrompt.prompt();
      const choice = await app.installPrompt.userChoice;
      if (choice.outcome === "accepted") toast("Instalación aceptada. La app estará disponible desde tu sistema.");
      else toast("Instalación cancelada. Puedes intentarlo de nuevo cuando quieras.");
    } catch (_) {
      updateInstallHelp();
      showDialog("install-help-dialog");
    } finally {
      app.installPrompt = null;
      updateInstallButton();
    }
  }

  function showDialog(id) {
    const dialog = document.getElementById(id);
    if (!dialog) return;
    if (typeof dialog.showModal === "function") dialog.showModal();
    else dialog.setAttribute("open", "");
    document.body.classList.add("is-modal-open");
  }

  function closeDialog(target) {
    const dialog = typeof target === "string" ? document.getElementById(target) : target;
    if (!dialog) return;
    if (typeof dialog.close === "function" && dialog.open) dialog.close();
    else dialog.removeAttribute("open");
    if (!$("dialog[open]")) document.body.classList.remove("is-modal-open");
  }

  function updateNav(route) {
    $$(".nav-btn").forEach((button) => button.classList.toggle("is-active", button.dataset.route === route));
  }

  async function routeTo(route) {
    const valid = ["home", "library", "setup", "studio", "game"];
    const next = valid.includes(route) ? route : "home";
    if (app.busy && next !== "game") {
      toast("Espera a que termine el turno actual.", "error");
      return;
    }
    $$("[data-screen]").forEach((screen) => screen.classList.toggle("is-active", screen.dataset.screen === next));
    app.route = next;
    document.body.classList.toggle("is-game", next === "game");
    if (next !== "game") document.body.classList.remove("reader-mode");
    updateNav(next === "setup" ? "library" : next === "game" ? "" : next);
    if (next === "home") await refreshAdventures();
    if (next === "library") renderScenarioLibrary();
    if (next === "game" && app.current) renderGame(true);
    const main = $("#main-content");
    if (main) main.focus({ preventScroll: true });
    window.scrollTo({ top: 0, behavior: app.settings.reducedMotion ? "auto" : "smooth" });
  }

  function dailyScenario() {
    const date = new Date();
    const key = date.getUTCFullYear() * 400 + (date.getUTCMonth() + 1) * 31 + date.getUTCDate();
    return builtInScenarios[key % builtInScenarios.length];
  }

  function renderDailyOmen() {
    const omens = [
      ["La geometría del hambre", "«Hay puertas que solo aparecen después de haberlas cruzado.»"],
      ["El ruido detrás del cielo", "«Las estrellas no están lejos. Están contenidas.»"],
      ["Instrucciones para olvidar", "«Si recuerdas el tercer nombre, el tercero te recuerda a ti.»"],
      ["La marea interior", "«El mar nunca entra en una casa que no haya sido antes océano.»"]
    ];
    const scenario = dailyScenario();
    const item = omens[builtInScenarios.indexOf(scenario) % omens.length];
    $("#omen-title").textContent = item[0];
    $("#daily-omen").textContent = item[1];
  }

  async function refreshScenarios() {
    app.customScenarios = await Storage.listScenarios();
    app.scenarios = [...builtInScenarios, ...app.customScenarios];
  }

  async function refreshAdventures() {
    app.adventures = await Storage.listAdventures();
    renderRecent();
  }

  function renderRecent() {
    const target = $("#recent-list");
    if (!target) return;
    const recent = app.adventures.slice(0, 4);
    if (!recent.length) {
      target.innerHTML = '<div class="empty-state empty-state--small"><span aria-hidden="true">◌</span><p>Todavía no hay aventuras guardadas.</p></div>';
      return;
    }
    target.innerHTML = recent.map((adventure) => {
      const accent = safeColor(adventure.scenario && adventure.scenario.accent);
      const playable = Engine.countPlayableTurns(adventure);
      return `<button class="recent-card js-open-adventure" type="button" data-adventure-id="${escapeHtml(adventure.id)}" style="--accent:${accent}">
        <span class="recent-card__sigil" aria-hidden="true">${escapeHtml(adventure.scenario && adventure.scenario.sigil || "Ø")}</span>
        <span><p>${playable} turno${playable === 1 ? "" : "s"} · ${formatDate(adventure.updatedAt)}</p><h3>${escapeHtml(adventure.title)}</h3><small>${escapeHtml(adventure.world && adventure.world.location || "Ubicación desconocida")}</small></span>
        <b aria-hidden="true">→</b>
      </button>`;
    }).join("");
  }

  function selectedFilter() {
    const active = $("#scenario-filters .is-active");
    return active ? active.dataset.filter : "all";
  }

  function isFavorite(id) {
    return Array.isArray(app.settings.favorites) && app.settings.favorites.includes(id);
  }

  function toggleFavorite(id) {
    const favorites = new Set(app.settings.favorites || []);
    if (favorites.has(id)) favorites.delete(id);
    else favorites.add(id);
    app.settings = Storage.saveSettings({ ...app.settings, favorites: [...favorites] });
    renderScenarioLibrary();
    toast(favorites.has(id) ? "Expediente añadido a favoritos." : "Expediente quitado de favoritos.");
  }

  function renderScenarioLibrary() {
    const target = $("#scenario-grid");
    if (!target) return;
    const query = String($("#scenario-search").value || "").trim().toLocaleLowerCase("es");
    const filter = selectedFilter();
    const list = app.scenarios.filter((scenario) => {
      const matchesFilter = filter === "all" || (filter === "custom" ? scenario.custom : filter === "favorites" ? isFavorite(scenario.id) : scenario.category === filter);
      const haystack = `${scenario.title} ${scenario.summary} ${scenario.setting} ${(scenario.tags || []).join(" ")}`.toLocaleLowerCase("es");
      return matchesFilter && (!query || haystack.includes(query));
    });
    if (!list.length) {
      target.innerHTML = '<div class="empty-state"><span aria-hidden="true">◌</span><p>No hay escenarios que coincidan con esta búsqueda.</p></div>';
      return;
    }
    target.innerHTML = list.map((scenario, index) => {
      const accent = safeColor(scenario.accent);
      const scenarioNumber = builtInScenarios.findIndex((item) => item.id === scenario.id);
      const fallbackArt = galleryArt[(scenarioNumber < 0 ? 0 : scenarioNumber) % galleryArt.length];
      const coverArt = safeArtPath(scenario.art, fallbackArt[0]);
      const coverAlt = scenario.art ? `Arte atmosférico de ${scenario.title}` : `${fallbackArt[1]} · ${scenario.title}`;
      const visualSet = scenario.artGallery?.length
        ? scenario.artGallery.slice(0, 3).map((art) => [safeArtPath(art.src, galleryArt[0][0]), art.alt || "Visión del expediente"])
        : [1, 2, 3].map((offset) => galleryArt[(Math.max(0, scenarioNumber) + offset) % galleryArt.length]);
      return `<article class="scenario-card" style="--accent:${accent};--card-index:${index}">
        <div class="scenario-card__art" style="background-image:linear-gradient(180deg, transparent 20%, var(--panel-solid) 100%), url('${escapeHtml(coverArt)}')" role="img" aria-label="${escapeHtml(coverAlt)}"></div>
        <div class="scenario-card__gallery" aria-label="Visiones del expediente">${visualSet.map(([src, alt]) => `<img src="${escapeHtml(src)}" alt="${escapeHtml(alt)}" loading="lazy" decoding="async">`).join("")}</div>
        <div class="scenario-card__top"><span class="scenario-card__label">${escapeHtml(scenario.label)}</span><button class="favorite-btn${isFavorite(scenario.id) ? " is-active" : ""}" type="button" data-favorite-id="${escapeHtml(scenario.id)}" aria-label="${isFavorite(scenario.id) ? "Quitar de favoritos" : "Añadir a favoritos"}" aria-pressed="${isFavorite(scenario.id)}">★</button><span class="scenario-card__sigil" aria-hidden="true">${escapeHtml(scenario.sigil || "Ø")}</span></div>
        <h2>${escapeHtml(scenario.title)}</h2>
        <p>${escapeHtml(scenario.summary)}</p>
        <div class="scenario-card__meta"><span>${escapeHtml(scenario.setting)}</span><span>${escapeHtml(scenario.difficulty)}</span></div>
        <div class="scenario-card__actions">
          <button class="btn btn--primary js-start-scenario" type="button" data-scenario-id="${escapeHtml(scenario.id)}">Abrir expediente</button>
          ${scenario.custom ? `<button class="btn btn--ghost scenario-card__menu js-export-scenario" type="button" data-scenario-id="${escapeHtml(scenario.id)}" title="Exportar escenario" aria-label="Exportar ${escapeHtml(scenario.title)}">⇩</button><button class="btn btn--ghost scenario-card__menu js-delete-scenario" type="button" data-scenario-id="${escapeHtml(scenario.id)}" title="Eliminar escenario" aria-label="Eliminar ${escapeHtml(scenario.title)}">×</button>` : ""}
        </div>
      </article>`;
    }).join("");
    renderRandomGallery();
  }

  function renderRandomGallery() {
    const target = $("#image-gallery");
    if (!target) return;
    const shuffled = [...galleryArt].sort(() => Math.random() - 0.5).slice(0, 6);
    target.innerHTML = shuffled.map(([src, title]) => `<figure><img src="${escapeHtml(safeArtPath(src, galleryArt[0][0]))}" alt="${escapeHtml(title)}" loading="lazy"><figcaption>${escapeHtml(title)}</figcaption></figure>`).join("");
  }

  function chooseScenario(id) {
    const scenario = app.scenarios.find((item) => item.id === id);
    if (!scenario) {
      toast("No se encuentra ese escenario.", "error");
      return;
    }
    app.selectedScenario = scenario;
    const preview = $("#setup-preview");
    preview.style.setProperty("--accent", safeColor(scenario.accent));
    $(".setup-preview__sigil", preview).textContent = scenario.sigil || "Ø";
    $(".kicker", preview).textContent = scenario.label;
    $("h2", preview).textContent = scenario.title;
    $("p:not(.kicker)", preview).textContent = scenario.summary;
    $("ul", preview).innerHTML = [scenario.setting, scenario.difficulty, scenario.duration].map((item) => `<li>${escapeHtml(item)}</li>`).join("");
    routeTo("setup");
  }

  async function startAdventure(form) {
    if (!app.selectedScenario) return;
    const data = new FormData(form);
    const setup = {
      playerName: data.get("playerName"),
      archetype: data.get("archetype"),
      perspective: data.get("perspective"),
      intensity: data.get("intensity"),
      seed: data.get("seed"),
      extraPlayers: data.get("multiplayer") ? [data.get("player2"), data.get("player3")] : []
    };
    const adventure = Engine.createAdventure(app.selectedScenario, setup, app.settings);
    await Storage.saveAdventure(adventure);
    app.current = adventure;
    app.undo = [];
    app.redo = [];
    app.lastContext = null;
    app.mode = "do";
    form.reset();
    $("#multiplayer-fields").hidden = true;
    await routeTo("game");
    toast("Expediente creado. El guardado es automático.");
  }

  async function openAdventure(id) {
    const adventure = await Storage.getAdventure(id);
    if (!adventure) {
      toast("Ese guardado ya no está disponible.", "error");
      await refreshAdventures();
      return;
    }
    const errors = Engine.validateAdventure(adventure);
    if (errors.length) {
      toast(`No se puede abrir: ${errors.join(" ")}`, "error");
      return;
    }
    app.current = adventure;
    app.undo = [];
    app.redo = [];
    app.lastContext = null;
    app.mode = "do";
    await routeTo("game");
  }

  function renderGame(scrollEnd) {
    const adventure = app.current;
    if (!adventure) return;
    $("#game-title").textContent = adventure.title;
    $("#game-scenario-label").textContent = adventure.scenario.label || "EXPEDIENTE";
    const player = adventure.players[adventure.activePlayerIndex] || adventure.players[0];
    const archetype = Engine.archetypes[player.archetype] || Engine.archetypes.investigator;
    $("#player-name").textContent = player.name;
    $("#player-archetype").textContent = archetype.label.toLocaleUpperCase("es");
    $("#player-monogram").textContent = initials(player.name).toLocaleUpperCase("es");
    $("#active-player-label").textContent = adventure.players.length > 1 ? `Turno de ${player.name}` : (adventure.meta.ended ? "Expediente cerrado" : "Tu turno");
    $("#turn-number").textContent = `Turno ${Engine.countPlayableTurns(adventure)}`;
    $("#world-location").textContent = adventure.world.location;
    $("#world-time").textContent = adventure.world.time;
    $("#chapter-label").textContent = `CAPÍTULO ${adventure.world.chapter || 1} · ${(adventure.world.chapterTitle || "EL DESPERTAR").toUpperCase()}`;
    $("#world-objective").textContent = adventure.world.objective;
    const director = adventure.world.director || {};
    $("#arc-phase").textContent = String(director.phase || "hook").toUpperCase();
    $("#director-tension").textContent = String(director.tension || 0);
    $("#player-level").textContent = String(adventure.state.level || 1);
    const levelTarget = 100 + ((adventure.state.level || 1) - 1) * 60;
    $("#player-xp").textContent = `${adventure.state.xp || 0}/${levelTarget}`;
    $("#director-note").textContent = director.cliffhanger || "La señal acaba de despertar.";
    const trajectory = $("#trajectory-summary");
    if (trajectory) {
      const path = adventure.world.storyPath;
      if (adventure.scenario.id === "sangre-del-metropolit" && path) {
        trajectory.hidden = false;
        trajectory.innerHTML = `<span>Muertes <b>${path.deaths || 0}</b></span><span>Pistas <b>${path.cameraClues || 0}</b></span><span>Rebelión <b>${path.rebellion || 0}</b></span><span>Poder <b>${path.power || 0}</b></span>`;
      } else {
        trajectory.hidden = true;
        trajectory.innerHTML = "";
      }
    }
    $$(".mode-tab--combat").forEach((button) => { button.hidden = !adventure.world.combat; });
    const suggestionRow = $("#suggestion-row");
    if (suggestionRow) {
      const suggestions = adventure.world.combat ? ["Atacar", "Defender"] : ["Investigar la señal", "Buscar una salida", "Preguntar al testigo"];
      suggestionRow.innerHTML = suggestions.map((label) => `<button type="button" class="suggestion-chip" data-suggestion="${escapeHtml(label)}">${escapeHtml(label)}</button>`).join("");
    }
    renderStats();
    renderDossiers();
    renderImmersion();
    renderStory(scrollEnd);
    const restoreCheckpointButton = $("#restore-chapter-checkpoint-btn");
    if (restoreCheckpointButton) restoreCheckpointButton.disabled = !adventure.meta.chapterCheckpoint;
    updateUndoRedo();
    updateComposer();
  }

  function renderStats() {
    const state = app.current.state;
    const configs = {
      lucidity: { value: state.lucidity, label: String(state.lucidity) },
      body: { value: state.body, label: String(state.body) },
      obsession: { value: state.obsession, label: String(state.obsession) },
      threshold: { value: state.threshold, label: `${state.threshold}%` }
    };
    Object.entries(configs).forEach(([key, config]) => {
      const node = $(`.stat[data-stat="${key}"]`);
      $("b", node).textContent = config.label;
      const meter = $(".meter", node);
      meter.setAttribute("aria-valuenow", String(Engine.clamp(config.value, 0, 100)));
      $("i", meter).style.width = `${Engine.clamp(config.value, 0, 100)}%`;
    });
  }

  function eventArt(adventure, immersionEvent) {
    const kindOffset = { descent: 0, discovery: 3, memory: 6, chapter: 8, condition: 10, vision: 4, ending: 1 };
    const stage = immersionEvent && immersionEvent.stage || (Engine.getDescentStage ? Engine.getDescentStage(adventure.state.threshold).index : 1);
    const offset = kindOffset[immersionEvent && immersionEvent.kind] || 0;
    const index = (stage * 2 + adventure.world.chapter + adventure.world.clues.length + offset) % galleryArt.length;
    return galleryArt[index];
  }

  function renderImmersion() {
    if (!app.current) return;
    const adventure = app.current;
    const stage = Engine.getDescentStage
      ? Engine.getDescentStage(adventure.state.threshold)
      : { index: 1, numeral: "I", label: "Sospecha", description: "Algo no encaja.", threshold: adventure.state.threshold || 0 };
    const stageNode = $("#descent-stage");
    const indexNode = $("#descent-index");
    const copyNode = $("#descent-copy");
    const fillNode = $("#descent-meter-fill");
    const progressNode = $("#descent-progress");
    const meterNode = $(".descent-meter");
    if (stageNode) stageNode.textContent = `${stage.numeral} · ${stage.label}`.toUpperCase();
    if (indexNode) indexNode.textContent = String(stage.index).padStart(2, "0");
    if (copyNode) copyNode.textContent = stage.description;
    if (fillNode) fillNode.style.width = `${stage.threshold}%`;
    if (progressNode) progressNode.textContent = `${stage.threshold}%`;
    if (meterNode) meterNode.setAttribute("aria-valuenow", String(stage.threshold));
    document.body.dataset.descent = stage.key;

    const latest = adventure.turns.slice().reverse().find((turn) => turn.immersionEvent);
    const immersionEvent = latest && latest.immersionEvent;
    const art = eventArt(adventure, immersionEvent);
    const rail = $("#scene-rail");
    const image = $("#scene-rail-image");
    const title = $("#scene-rail-title");
    const caption = $("#scene-rail-caption");
    const signature = `${art[0]}|${immersionEvent ? immersionEvent.title : adventure.world.location}|${stage.index}`;
    if (rail && rail.dataset.signature !== signature) {
      rail.dataset.signature = signature;
      rail.classList.remove("is-changing");
      void rail.offsetWidth;
      rail.classList.add("is-changing");
      window.setTimeout(() => rail.classList.remove("is-changing"), app.settings.reducedMotion ? 0 : 720);
    }
    if (image) {
      image.src = safeArtPath(art[0], galleryArt[0][0]);
      image.alt = immersionEvent ? `${immersionEvent.eyebrow}: ${immersionEvent.title}` : `Atmósfera de ${adventure.world.location}`;
    }
    if (title) title.textContent = immersionEvent ? immersionEvent.title : adventure.world.location;
    if (caption) caption.textContent = immersionEvent ? immersionEvent.body : `${adventure.world.chapterTitle || "El despertar"} · ${stage.label}`;
  }

  function showImmersionEvent(immersionEvent) {
    if (!immersionEvent) return;
    const flash = $("#immersion-flash");
    if (!flash) return;
    window.clearTimeout(app.immersionTimer);
    flash.innerHTML = `<span class="immersion-flash__eyebrow">${escapeHtml(immersionEvent.eyebrow)}</span><strong class="immersion-flash__title">${escapeHtml(immersionEvent.title)}</strong><span class="immersion-flash__body">${escapeHtml(immersionEvent.body)}</span>`;
    flash.hidden = false;
    flash.classList.remove("is-visible");
    void flash.offsetWidth;
    flash.classList.add("is-visible");
    app.immersionTimer = window.setTimeout(() => {
      flash.classList.remove("is-visible");
      window.setTimeout(() => { flash.hidden = true; }, app.settings.reducedMotion ? 0 : 220);
    }, app.settings.reducedMotion ? 900 : 4200);
  }

  function renderReport() {
    if (!app.current || !Engine.buildReport) return;
    const report = Engine.buildReport(app.current);
    $("#report-title").textContent = app.current.title;
    $("#report-stage").textContent = `${report.stage.numeral} · ${report.stage.label}`.toUpperCase();
    $("#report-ending").textContent = report.ending;
    $("#report-location").textContent = report.isFinal ? `El expediente se cerró en ${report.location}.` : `La aventura sigue abierta en ${report.location}.`;
    $("#report-actions").textContent = String(report.actions);
    $("#report-clues").textContent = String(report.clues);
    $("#report-memories").textContent = String(report.memories);
    $("#report-visions").textContent = String(report.visions);
    $("#report-chapter").textContent = String(report.chapter);
    $("#report-threshold").textContent = `${report.threshold}%`;
    $("#report-objective").textContent = report.objective || report.chapterTitle;
    const endingDetail = $("#report-ending-detail");
    if (endingDetail) {
      if (report.endingData) {
        const epilogue = report.endingData.epilogue || {};
        endingDetail.hidden = false;
        $("#report-climax").textContent = report.endingData.climax || "";
        $("#report-consequence").textContent = report.endingData.consequence || "";
        $("#report-epilogue-meta").textContent = `EPÍLOGO · ${epilogue.when || "DESPUÉS"} · ${epilogue.title || "REGISTRO FINAL"}`;
        $("#report-epilogue-copy").textContent = epilogue.text || "";
        const finalLine = $("#report-final-line");
        finalLine.textContent = epilogue.finalLine ? `«${epilogue.finalLine}»` : "";
        finalLine.hidden = !epilogue.finalLine;
      } else {
        endingDetail.hidden = true;
        $("#report-climax").textContent = "";
        $("#report-consequence").textContent = "";
        $("#report-epilogue-copy").textContent = "";
        $("#report-final-line").textContent = "";
      }
    }
    const conditions = $("#report-conditions");
    const list = $("#report-conditions > div");
    if (report.conditions.length) {
      conditions.hidden = false;
      list.innerHTML = report.conditions.map((condition) => `<span>${escapeHtml(condition)}</span>`).join("");
    } else {
      conditions.hidden = true;
      list.innerHTML = "";
    }
  }

  function showReport() {
    if (!app.current) return;
    renderReport();
    closeDialog("game-menu-dialog");
    showDialog("report-dialog");
  }

  function dossierItem(title, description, type) {
    return `<article class="dossier-item"><div class="dossier-item__top"><h4>${escapeHtml(title)}</h4><span>${escapeHtml(type || "archivo")}</span></div><p>${escapeHtml(description)}</p></article>`;
  }

  function renderDossiers() {
    const world = app.current.world;
    const memory = app.current.memory.bank || [];
    $("#clue-count").textContent = String(world.clues.length);
    $("#inventory-count").textContent = String(world.inventory.length);
    $("#memory-count").textContent = String(memory.length);
    $("#clue-list").innerHTML = world.clues.length
      ? world.clues.slice().reverse().map((clue) => dossierItem(clue.title, clue.description, `T${clue.turn}`)).join("")
      : '<div class="dossier-empty">Todavía no has confirmado ninguna pista. Investiga detalles concretos.</div>';
    $("#inventory-list").innerHTML = world.inventory.length
      ? world.inventory.map((item) => dossierItem(item.name, item.description, "objeto")).join("")
      : '<div class="dossier-empty">No llevas ningún objeto registrado.</div>';
    $("#memory-list").innerHTML = memory.length
      ? memory.slice().reverse().map((item) => dossierItem(`Turnos ${item.fromTurn}–${item.toTurn}`, item.text, "memoria")).join("")
      : '<div class="dossier-empty">El primer recuerdo consolidado se crea después de seis acciones.</div>';
  }

  function proseHtml(text) {
    return String(text || "").split(/\n{2,}/).filter(Boolean).map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join("");
  }

  function effectClass(effect) {
    const beneficial = (["lucidity", "body"].includes(effect.key) && effect.value > 0) || (["obsession", "threshold"].includes(effect.key) && effect.value < 0);
    return beneficial ? "is-positive" : "is-negative";
  }

  function renderTurn(turn, isLast) {
    const action = turn.input ? `<div class="turn-action" data-mode="${escapeHtml(turn.mode)}"><strong>${escapeHtml(turn.playerName || "Jugador")}</strong>${escapeHtml(turn.input)}</div>` : "";
    const effects = (turn.effects || []).map((effect) => `<span class="effect-chip ${effectClass(effect)}">${escapeHtml(effect.label)}</span>`).join("");
    const roll = app.settings.showRolls && turn.roll ? `<span class="roll-chip" title="Dificultad ${turn.roll.difficulty}">d20 ${turn.roll.raw} + ${turn.roll.bonus} ${escapeHtml(turn.roll.skill)} = ${turn.roll.total} · ${escapeHtml(turn.outcome || "")}</span>` : "";
    const discovery = turn.discovery ? `<span class="effect-chip is-positive">Pista · ${escapeHtml(turn.discovery.title)}</span>` : "";
    const immersion = turn.immersionEvent ? `<aside class="immersion-event" data-accent="${escapeHtml(turn.immersionEvent.accent || "acid")}"><span class="immersion-event__eyebrow">${escapeHtml(turn.immersionEvent.eyebrow)}</span><strong class="immersion-event__title">${escapeHtml(turn.immersionEvent.title)}</strong><p class="immersion-event__body">${escapeHtml(turn.immersionEvent.body)}</p></aside>` : "";
    const controls = `<span class="turn-controls">
      <button type="button" class="js-copy-turn" data-turn-id="${escapeHtml(turn.id)}" title="Copiar respuesta" aria-label="Copiar respuesta">⧉</button>
      <button type="button" class="js-edit-turn" data-turn-id="${escapeHtml(turn.id)}" title="Editar respuesta" aria-label="Editar respuesta">✎</button>
      ${isLast && turn.mode !== "opening" ? `<button type="button" class="js-regenerate-turn" data-turn-id="${escapeHtml(turn.id)}" title="Regenerar turno" aria-label="Regenerar turno">↻</button>` : ""}
    </span>`;
    const vision = turn.vision ? `<figure class="vision-card"><canvas data-vision-turn="${escapeHtml(turn.id)}" role="img" aria-label="Visión procedural de ${escapeHtml(turn.vision.location)}"></canvas><figcaption class="vision-card__footer"><span>${escapeHtml(turn.vision.location)} · visión procedural local</span><button type="button" class="js-download-vision" data-turn-id="${escapeHtml(turn.id)}">Guardar PNG</button></figcaption></figure>` : "";
    return `<section class="story-turn" data-turn-id="${escapeHtml(turn.id)}">${action}${immersion}<div class="turn-prose">${proseHtml(turn.output)}</div>${vision}<div class="turn-meta">${roll}${effects}${discovery}${controls}</div></section>`;
  }

  function renderStory(scrollEnd) {
    const feed = $("#story-feed");
    const turns = app.current.turns;
    feed.innerHTML = turns.map((turn, index) => renderTurn(turn, index === turns.length - 1)).join("");
    $$(`canvas[data-vision-turn]`, feed).forEach((canvas) => {
      const turn = turns.find((item) => item.id === canvas.dataset.visionTurn);
      if (turn && turn.vision) Engine.drawVision(canvas, turn.vision);
    });
    if (scrollEnd) requestAnimationFrame(() => feed.scrollTo({ top: feed.scrollHeight, behavior: app.settings.reducedMotion ? "auto" : "smooth" }));
  }

  function updateUndoRedo() {
    $("#undo-btn").disabled = app.busy || !app.undo.length;
    $("#redo-btn").disabled = app.busy || !app.redo.length;
  }

  function updateComposer() {
    const input = $("#action-input");
    const send = $("#send-action");
    const disabledInput = ["continue", "see", "attack", "defend"].includes(app.mode);
    const placeholders = {
      do: "¿Qué haces? Describe cualquier acción…",
      say: "¿Qué dices? Escribe tus palabras…",
      story: "¿Qué ocurre? Introduce narración directamente…",
      continue: "El narrador continuará la escena sin una acción…",
      see: "Se creará una visión procedural de la escena…"
      ,attack: "El combate resolverá una tirada determinista…"
      ,defend: "Te proteges y buscas una apertura…"
    };
    input.disabled = disabledInput || app.busy || Boolean(app.current && app.current.meta.ended);
    input.placeholder = placeholders[app.mode];
    send.disabled = app.busy || Boolean(app.current && app.current.meta.ended);
    send.querySelector("span").textContent = app.busy ? "Narrando" : app.mode === "see" ? "Crear" : app.mode === "continue" ? "Continuar" : "Enviar";
    if (app.current && app.current.meta.ended) {
      $("#turn-notice").hidden = false;
      $("#turn-notice").textContent = "El expediente está cerrado. Deshaz el último turno para volver a intervenir.";
    } else if (app.current && app.current.players.length > 1) {
      const active = app.current.players[app.current.activePlayerIndex];
      $("#turn-notice").hidden = false;
      $("#turn-notice").textContent = `Turno de ${active.name}`;
    } else {
      $("#turn-notice").hidden = true;
    }
  }

  function selectMode(mode) {
    if (!["do", "say", "story", "continue", "see", "attack", "defend"].includes(mode) || app.busy) return;
    app.mode = mode;
    $$(".mode-tab").forEach((button) => {
      const selected = button.dataset.mode === mode;
      button.classList.toggle("is-active", selected);
      button.setAttribute("aria-selected", String(selected));
    });
    updateComposer();
    if (!["continue", "see", "attack", "defend"].includes(mode)) $("#action-input").focus();
  }

  function setBusy(value) {
    app.busy = value;
    $$(".mode-tab").forEach((button) => { button.disabled = value; });
    updateComposer();
    updateUndoRedo();
  }

  function showTyping() {
    const feed = $("#story-feed");
    const node = document.createElement("div");
    node.id = "typing-turn";
    node.className = "typing-turn";
    node.innerHTML = '<i></i><i></i><i></i><span>El abismo reorganiza la escena</span>';
    feed.appendChild(node);
    requestAnimationFrame(() => feed.scrollTo({ top: feed.scrollHeight, behavior: "smooth" }));
  }

  async function saveCurrent() {
    if (!app.current) return;
    const indicator = $("#save-indicator");
    indicator.className = "save-indicator is-saving";
    indicator.innerHTML = "<i></i> Guardando";
    try {
      await Storage.saveAdventure(app.current);
      indicator.className = "save-indicator";
      indicator.innerHTML = "<i></i> Guardado";
      if (app.channel) app.channel.postMessage({ type: "adventure-updated", id: app.current.id, at: Date.now() });
    } catch (error) {
      indicator.className = "save-indicator is-error";
      indicator.innerHTML = "<i></i> Error";
      toast(`No se pudo guardar: ${error.message}`, "error");
    }
  }

  async function saveChapterCheckpoint() {
    if (!app.current || app.busy) return;
    const snapshot = Engine.clone(app.current);
    snapshot.meta.chapterCheckpoint = null;
    app.current.meta.chapterCheckpoint = {
      chapter: app.current.world.chapter || 1,
      title: app.current.world.chapterTitle || "El despertar",
      savedAt: new Date().toISOString(),
      snapshot
    };
    await saveCurrent();
    closeDialog("game-menu-dialog");
    toast(`Checkpoint guardado en el capítulo ${app.current.world.chapter || 1}.`);
  }

  async function restoreChapterCheckpoint() {
    if (!app.current || app.busy) return;
    const checkpoint = app.current.meta && app.current.meta.chapterCheckpoint;
    if (!checkpoint || !checkpoint.snapshot) {
      toast("Todavía no hay ningún checkpoint guardado.", "error");
      return;
    }
    if (!window.confirm(`¿Restaurar el capítulo ${checkpoint.chapter}: ${checkpoint.title}? Perderás los turnos posteriores al checkpoint.`)) return;
    const savedCheckpoint = checkpoint;
    app.current = Engine.clone(savedCheckpoint.snapshot);
    app.current.meta.chapterCheckpoint = savedCheckpoint;
    app.undo = [];
    app.redo = [];
    await saveCurrent();
    closeDialog("game-menu-dialog");
    renderGame(false);
    toast(`Checkpoint restaurado: capítulo ${checkpoint.chapter}.`);
  }

  async function submitTurn(forcedMode, forcedInput) {
    if (app.busy || !app.current) return;
    const mode = forcedMode || app.mode;
    const inputNode = $("#action-input");
    const input = forcedInput != null ? forcedInput : inputNode.value.trim();
    if (!["continue", "see", "attack", "defend"].includes(mode) && !input) {
      toast("Escribe qué haces, dices o introduces en la historia.", "error");
      inputNode.focus();
      return;
    }
    const snapshot = Engine.clone(app.current);
    app.undo.push(snapshot);
    app.undo = app.undo.slice(-24);
    app.redo = [];
    setBusy(true);
    showTyping();
    try {
      const result = await Engine.takeTurn(app.current, mode, input, app.settings);
      app.lastContext = result.context;
      inputNode.value = "";
      autoSizeInput();
      await saveCurrent();
      renderGame(true);
      if (result.turn.immersionEvent) {
        showImmersionEvent(result.turn.immersionEvent);
        playImmersionCue(result.turn.immersionEvent.kind);
      }
      if (result.warning) toast(result.warning, "error");
      if (["continue", "see"].includes(mode)) selectMode("do");
      if (app.current.meta.ended) window.setTimeout(showReport, app.settings.reducedMotion ? 120 : 720);
    } catch (error) {
      app.current = app.undo.pop() || snapshot;
      $("#typing-turn")?.remove();
      toast(error.message || "No se pudo completar el turno.", "error");
      renderGame(false);
    } finally {
      setBusy(false);
    }
  }

  async function undoTurn() {
    if (!app.undo.length || app.busy) return;
    app.redo.push(Engine.clone(app.current));
    app.current = app.undo.pop();
    await saveCurrent();
    renderGame(true);
    toast("Último cambio deshecho.");
  }

  async function redoTurn() {
    if (!app.redo.length || app.busy) return;
    app.undo.push(Engine.clone(app.current));
    app.current = app.redo.pop();
    await saveCurrent();
    renderGame(true);
    toast("Cambio rehecho.");
  }

  async function regenerateTurn(turnId) {
    const last = app.current.turns[app.current.turns.length - 1];
    if (!last || last.id !== turnId || last.mode === "opening") return;
    if (!app.undo.length) {
      toast("Solo se puede regenerar un turno creado durante esta sesión. Puedes editarlo manualmente.", "error");
      return;
    }
    const mode = last.mode;
    const input = last.input;
    app.current = app.undo.pop();
    app.current.world.rngStep = (app.current.world.rngStep || 0) + 11;
    app.redo = [];
    await submitTurn(mode, input);
  }

  function autoSizeInput() {
    const input = $("#action-input");
    input.style.height = "auto";
    input.style.height = `${Math.min(input.scrollHeight, 170)}px`;
  }

  function renderContextInspector() {
    if (!app.current) return;
    const context = app.lastContext || Engine.buildContext(app.current, $("#action-input").value);
    $("#context-used").textContent = new Intl.NumberFormat("es-ES").format(context.used);
    $("#context-budget").textContent = new Intl.NumberFormat("es-ES").format(context.budget);
    $("#context-memory-score").textContent = String(context.includedMemories.length);
    $("#context-packet").value = context.packet;
    const total = Math.max(1, Object.values(context.allocations).reduce((sum, value) => sum + value, 0));
    $("#context-allocation").innerHTML = ["required", "history", "cards", "memories"].map((key) => `<i style="width:${(context.allocations[key] / total) * 100}%" title="${key}: ${context.allocations[key]} tokens"></i>`).join("");
    showDialog("context-dialog");
  }

  function fillSettingsForm() {
    const form = $("#settings-form");
    const settings = app.settings;
    const engine = form.elements.namedItem("engine");
    [...engine].forEach((radio) => { radio.checked = radio.value === settings.engine; });
    form.elements.endpoint.value = settings.endpoint;
    form.elements.model.value = settings.model;
    form.elements.apiKey.value = settings.apiKey || "";
    form.elements.temperature.value = String(settings.temperature);
    form.elements.temperature.nextElementSibling.textContent = String(settings.temperature);
    form.elements.responseLength.value = settings.responseLength;
    form.elements.contextBudget.value = String(settings.contextBudget);
    form.elements.showRolls.checked = settings.showRolls;
    form.elements.reducedMotion.checked = settings.reducedMotion;
    form.elements.fontScale.value = String(settings.fontScale);
    form.elements.skin.value = settings.skin || "cosmic";
    form.elements.audioProfile.value = settings.audioProfile || "abismo";
    form.elements.audioVolume.value = settings.audioVolume || "0.14";
    $("#remote-settings").hidden = settings.engine !== "remote";
  }

  function settingsFromForm() {
    const form = $("#settings-form");
    return {
      engine: new FormData(form).get("engine"),
      endpoint: form.elements.endpoint.value.trim(),
      model: form.elements.model.value.trim(),
      apiKey: form.elements.apiKey.value,
      temperature: Number(form.elements.temperature.value),
      responseLength: form.elements.responseLength.value,
      contextBudget: Number(form.elements.contextBudget.value),
      showRolls: form.elements.showRolls.checked,
      reducedMotion: form.elements.reducedMotion.checked,
      fontScale: form.elements.fontScale.value,
      skin: form.elements.skin.value,
      audioProfile: form.elements.audioProfile.value,
      audioVolume: form.elements.audioVolume.value,
      favorites: app.settings.favorites || []
    };
  }

  function applySettings() {
    document.body.classList.toggle("reduced-motion", Boolean(app.settings.reducedMotion));
    document.body.dataset.skin = app.settings.skin || "cosmic";
    document.documentElement.style.setProperty("--story-scale", app.settings.fontScale);
    const badge = $("#engine-badge span");
    badge.textContent = app.settings.engine === "remote" ? `IA · ${app.settings.model}` : "Director local";
    if (app.current) {
      app.current.settings.contextBudget = app.settings.contextBudget;
      app.current.settings.responseLength = app.settings.responseLength;
      renderStory(false);
    }
    if (app.audioMaster) app.audioMaster.gain.value = Number(app.settings.audioVolume || 0.14);
    startHeroMotion();
  }

  function startHeroMotion() {
    cancelAnimationFrame(heroMotionFrame);
    const artifact = $(".hero__artifact");
    const reduced = Boolean(app.settings.reducedMotion) || window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (!artifact || reduced) return;
    const outer = $(".artifact-ring--outer", artifact);
    const middle = $(".artifact-ring--mid", artifact);
    const inner = $(".artifact-ring--inner", artifact);
    const pupil = $(".artifact-eye i", artifact);
    const started = performance.now();
    const tick = (now) => {
      const seconds = (now - started) / 1000;
      if (outer) outer.style.transform = `rotate(${seconds * 5}deg)`;
      if (middle) middle.style.transform = `rotate(${-seconds * 7}deg)`;
      if (inner) inner.style.transform = `rotate(${seconds * 3}deg)`;
      if (pupil) pupil.style.transform = `translate(${Math.sin(seconds * 1.1) * 7}px, ${Math.cos(seconds * .8) * 4}px)`;
      artifact.style.setProperty("--motion-lift", `${Math.sin(seconds * .45) * 7}px`);
      heroMotionFrame = requestAnimationFrame(tick);
    };
    heroMotionFrame = requestAnimationFrame(tick);
  }

  async function saveSettingsFromForm(event) {
    event.preventDefault();
    app.settings = Storage.saveSettings(settingsFromForm());
    applySettings();
    if (app.current) await saveCurrent();
    closeDialog("settings-dialog");
    toast(app.settings.engine === "remote" ? "IA compatible seleccionada. Director 404 cubrirá cualquier fallo de conexión." : "Director 404 funciona ahora de forma totalmente local.");
  }

  async function testApiConnection() {
    const result = $("#connection-result");
    const config = settingsFromForm();
    result.className = "connection-result";
    result.textContent = "Probando…";
    $("#test-connection").disabled = true;
    try {
      const reply = await Engine.testConnection(config);
      result.className = "connection-result is-success";
      result.textContent = `Conexión correcta · ${String(reply).slice(0, 60)}`;
    } catch (error) {
      result.className = "connection-result is-error";
      result.textContent = error.message;
    } finally {
      $("#test-connection").disabled = false;
    }
  }

  function studioQuality() {
    const form = $("#studio-form");
    const values = Object.fromEntries(new FormData(form).entries());
    const valid = {
      title: String(values.title || "").trim().length >= 5,
      premise: String(values.premise || "").trim().length >= 50,
      truth: String(values.truth || "").trim().length >= 35,
      taboo: String(values.taboo || "").trim().length >= 12,
      opening: String(values.opening || "").trim().length >= 80
    };
    $$("#studio-checklist li").forEach((item) => item.classList.toggle("is-valid", Boolean(valid[item.dataset.check])));
  }

  async function saveStudioScenario(event) {
    event.preventDefault();
    const form = event.currentTarget;
    const scenario = ScenarioTools.makeCustomScenario(Object.fromEntries(new FormData(form).entries()));
    const errors = ScenarioTools.validateScenario(scenario);
    if (errors.length) {
      toast(errors.join(" "), "error");
      return;
    }
    await Storage.saveScenario(scenario);
    await refreshScenarios();
    form.reset();
    studioQuality();
    renderScenarioLibrary();
    await routeTo("library");
    toast("Escenario guardado. Ya puedes jugarlo o exportarlo.");
  }

  function exportScenario(id) {
    const scenario = app.customScenarios.find((item) => item.id === id);
    if (!scenario) return;
    Storage.download(`${Storage.slugify(scenario.title)}.abyss-scenario.json`, JSON.stringify(scenario, null, 2), "application/json");
    toast("Escenario exportado.");
  }

  async function removeScenario(id) {
    const scenario = app.customScenarios.find((item) => item.id === id);
    if (!scenario) return;
    if (!window.confirm(`¿Eliminar “${scenario.title}”? Las aventuras ya creadas conservarán su propia copia.`)) return;
    await Storage.deleteScenario(id);
    await refreshScenarios();
    renderScenarioLibrary();
    toast("Escenario eliminado del navegador.");
  }

  async function importScenarioFile(file) {
    const raw = await Storage.readJsonFile(file, 2 * 1024 * 1024);
    const errors = ScenarioTools.validateScenario(raw);
    if (errors.length) throw new Error(errors.join(" "));
    const imported = Engine.clone(raw);
    imported.id = `custom-${Storage.slugify(imported.title)}-${Date.now().toString(36)}`;
    imported.custom = true;
    imported.createdAt = new Date().toISOString();
    await Storage.saveScenario(imported);
    await refreshScenarios();
    renderScenarioLibrary();
    toast(`“${imported.title}” se importó correctamente.`);
  }

  function exportAdventure() {
    if (!app.current) return;
    const data = JSON.stringify(Engine.serializeAdventure(app.current), null, 2);
    Storage.download(`${Storage.slugify(app.current.title)}.abyss404`, data, "application/json");
    toast("Aventura completa exportada.");
  }

  function exportStory() {
    if (!app.current) return;
    Storage.download(`${Storage.slugify(app.current.title)}-relato.md`, Engine.toMarkdown(app.current), "text/markdown;charset=utf-8");
    closeDialog("game-menu-dialog");
    toast("Relato Markdown exportado.");
  }

  async function importAdventureFile(file) {
    const raw = await Storage.readJsonFile(file, 12 * 1024 * 1024);
    const errors = Engine.validateAdventure(raw);
    if (errors.length) throw new Error(errors.join(" "));
    const imported = Engine.clone(raw);
    imported.id = `adventure-import-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
    imported.title = `${imported.title} · copia`;
    imported.updatedAt = new Date().toISOString();
    await Storage.saveAdventure(imported);
    app.current = imported;
    app.undo = [];
    app.redo = [];
    closeDialog("game-menu-dialog");
    await routeTo("game");
    toast("Aventura importada como una copia independiente.");
  }

  async function writeClipboard(text) {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(text);
      return;
    }
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.style.position = "fixed";
    textarea.style.opacity = "0";
    document.body.appendChild(textarea);
    textarea.select();
    const copied = document.execCommand("copy");
    textarea.remove();
    if (!copied) throw new Error("El navegador no permitió copiar al portapapeles.");
  }

  async function copyRitualCode() {
    try {
      const code = Engine.encodeRitualCode(app.current);
      await writeClipboard(code);
      closeDialog("game-menu-dialog");
      toast("Código copiado. Quien lo abra recibirá una copia de la aventura.");
    } catch (error) {
      toast(error.message, "error");
    }
  }

  async function openRitualCode(event) {
    event.preventDefault();
    const form = event.currentTarget;
    try {
      const adventure = Engine.decodeRitualCode(new FormData(form).get("ritualCode"));
      await Storage.saveAdventure(adventure);
      app.current = adventure;
      app.undo = [];
      app.redo = [];
      form.reset();
      closeDialog("ritual-dialog");
      await routeTo("game");
      toast("Código abierto como copia local. La memoria y el World Engine se han conservado.");
    } catch (error) {
      toast(error.message || "No se pudo abrir el código.", "error");
    }
  }

  async function deleteCurrentAdventure() {
    if (!app.current) return;
    if (!window.confirm(`¿Eliminar “${app.current.title}”? Esta acción no se puede deshacer. Puedes exportar antes el archivo .abyss404.`)) return;
    const id = app.current.id;
    await Storage.deleteAdventure(id);
    app.current = null;
    app.undo = [];
    app.redo = [];
    closeDialog("game-menu-dialog");
    await routeTo("home");
    toast("Aventura eliminada del navegador.");
  }

  function openEditTurn(id) {
    const turn = app.current.turns.find((item) => item.id === id);
    if (!turn) return;
    app.editingTurnId = id;
    $("#edit-turn-form").elements.turnText.value = turn.output;
    showDialog("edit-turn-dialog");
  }

  async function saveEditedTurn(event) {
    event.preventDefault();
    try {
      app.undo.push(Engine.clone(app.current));
      app.undo = app.undo.slice(-24);
      app.redo = [];
      Engine.editTurn(app.current, app.editingTurnId, event.currentTarget.elements.turnText.value);
      await saveCurrent();
      closeDialog("edit-turn-dialog");
      renderGame(false);
      toast("Respuesta editada. El texto pasa a ser parte de la continuidad.");
    } catch (error) {
      toast(error.message, "error");
    }
  }

  async function copyTurn(id) {
    const turn = app.current.turns.find((item) => item.id === id);
    if (!turn) return;
    try {
      await writeClipboard(turn.output);
      toast("Respuesta copiada.");
    } catch (error) {
      toast(error.message, "error");
    }
  }

  function downloadVision(id) {
    const canvas = $(`canvas[data-vision-turn="${CSS.escape(id)}"]`);
    const turn = app.current.turns.find((item) => item.id === id);
    if (!canvas || !turn) return;
    canvas.toBlob((blob) => {
      if (!blob) {
        toast("No se pudo exportar la visión.", "error");
        return;
      }
      Storage.download(`vision-${Storage.slugify(turn.vision.location)}.png`, blob, "image/png");
      toast("Visión guardada como PNG.");
    }, "image/png");
  }

  function playImmersionCue(kind) {
    if (!app.audio || !app.audioMaster || app.settings.reducedMotion) return;
    try {
      const context = app.audio;
      const now = context.currentTime;
      const frequencies = { descent: 72, discovery: 392, memory: 174, chapter: 220, condition: 118, vision: 310, ending: 58 };
      const oscillator = context.createOscillator();
      const gain = context.createGain();
      oscillator.type = kind === "ending" ? "sine" : "triangle";
      oscillator.frequency.setValueAtTime(frequencies[kind] || 180, now);
      if (kind === "ending") oscillator.frequency.exponentialRampToValueAtTime(38, now + 1.2);
      gain.gain.setValueAtTime(0.0001, now);
      gain.gain.exponentialRampToValueAtTime(kind === "ending" ? 0.055 : 0.035, now + 0.04);
      gain.gain.exponentialRampToValueAtTime(0.0001, now + (kind === "ending" ? 1.25 : 0.42));
      oscillator.connect(gain);
      gain.connect(app.audioMaster);
      oscillator.start(now);
      oscillator.stop(now + (kind === "ending" ? 1.3 : 0.48));
      oscillator.addEventListener("ended", () => {
        try { oscillator.disconnect(); gain.disconnect(); } catch (_) { /* already disconnected */ }
      }, { once: true });
    } catch (_) {
      // El feedback visual no depende de que el navegador permita el sonido.
    }
  }

  async function stopAudio() {
    if (!app.audio) return;
    app.audioNodes.forEach((node) => {
      try { node.stop(); } catch (_) { /* already stopped */ }
      try { node.disconnect(); } catch (_) { /* ignored */ }
    });
    try { await app.audio.close(); } catch (_) { /* ignored */ }
    app.audio = null;
    app.audioMaster = null;
    app.audioNodes = [];
  }

  async function toggleAudio() {
    const button = $("#audio-toggle");
    if (app.audio) {
      await stopAudio();
      button.setAttribute("aria-pressed", "false");
      button.setAttribute("aria-label", "Activar ambiente sonoro");
      button.title = "Activar ambiente sonoro";
      return;
    }
    const AudioContext = window.AudioContext || window.webkitAudioContext;
    if (!AudioContext) {
      toast("Este navegador no admite audio procedural.", "error");
      return;
    }
    try {
      const context = new AudioContext();
      await context.resume();
      if (context.state !== "running") throw new Error("AudioContext suspendido");
      const master = context.createGain();
      master.gain.value = Number(app.settings.audioVolume || 0.14);
      master.connect(context.destination);
      const filter = context.createBiquadFilter();
      filter.type = "lowpass";
      filter.frequency.value = 520;
      filter.Q.value = 0.8;
      filter.connect(master);
      const noiseBuffer = context.createBuffer(1, context.sampleRate * 2, context.sampleRate);
      const noiseData = noiseBuffer.getChannelData(0);
      let brown = 0;
      for (let index = 0; index < noiseData.length; index += 1) {
        brown = (brown + (Math.random() * 2 - 1) * 0.08) * 0.995;
        noiseData[index] = brown;
      }
      const noise = context.createBufferSource();
      const noiseGain = context.createGain();
      noise.buffer = noiseBuffer;
      noise.loop = true;
      noiseGain.gain.value = 0.18;
      noise.connect(noiseGain);
      noiseGain.connect(filter);
      noise.start();
      const profiles = {
        abismo: [55, 73.42, 110],
        mar: [38, 49, 65.4],
        radio: [91, 137, 183],
        nave: [65.4, 82.4, 123.5]
      };
      const frequencies = profiles[app.settings.audioProfile] || profiles.abismo;
      const oscillators = frequencies.map((frequency, index) => {
        const osc = context.createOscillator();
        const gain = context.createGain();
        osc.type = index === 2 ? "triangle" : "sine";
        osc.frequency.value = frequency;
        osc.detune.value = index * 5 - 5;
        gain.gain.value = [0.34, 0.18, 0.08][index];
        osc.connect(gain);
        gain.connect(filter);
        osc.start();
        return osc;
      });
      const lfo = context.createOscillator();
      const lfoGain = context.createGain();
      lfo.frequency.value = 0.07;
      lfoGain.gain.value = 65;
      lfo.connect(lfoGain);
      lfoGain.connect(filter.frequency);
      lfo.start();
      app.audio = context;
      app.audioMaster = master;
      app.audioNodes = [...oscillators, lfo, noise];
      button.setAttribute("aria-pressed", "true");
      button.setAttribute("aria-label", "Desactivar ambiente sonoro");
      button.title = "Desactivar ambiente sonoro";
      toast("Ambiente sonoro activado.");
    } catch (_) {
      if (app.audio) await stopAudio();
      toast("No se pudo iniciar el ambiente sonoro. Prueba en otro navegador o activa el sonido del dispositivo.", "error");
    }
  }

  function bindEvents() {
    document.addEventListener("click", async (event) => {
      const routeButton = event.target.closest("[data-route]");
      if (routeButton) {
        await routeTo(routeButton.dataset.route);
        return;
      }
      const dialogButton = event.target.closest("[data-open-dialog]");
      if (dialogButton) {
        if (dialogButton.dataset.openDialog === "settings-dialog") fillSettingsForm();
        showDialog(dialogButton.dataset.openDialog);
        return;
      }
      const closeButton = event.target.closest("[data-close-dialog]");
      if (closeButton) {
        closeDialog(closeButton.closest("dialog"));
        return;
      }
      const startButton = event.target.closest(".js-start-scenario");
      if (startButton) return chooseScenario(startButton.dataset.scenarioId);
      const favoriteButton = event.target.closest("[data-favorite-id]");
      if (favoriteButton) {
        event.stopPropagation();
        return toggleFavorite(favoriteButton.dataset.favoriteId);
      }
      const openButton = event.target.closest(".js-open-adventure");
      if (openButton) return openAdventure(openButton.dataset.adventureId);
      const exportScenarioButton = event.target.closest(".js-export-scenario");
      if (exportScenarioButton) return exportScenario(exportScenarioButton.dataset.scenarioId);
      const deleteScenarioButton = event.target.closest(".js-delete-scenario");
      if (deleteScenarioButton) return removeScenario(deleteScenarioButton.dataset.scenarioId);
      const modeButton = event.target.closest(".mode-tab");
      if (modeButton) return selectMode(modeButton.dataset.mode);
      const suggestion = event.target.closest("[data-suggestion]");
      if (suggestion) {
        $("#action-input").value = suggestion.dataset.suggestion;
        selectMode("do");
        return submitTurn();
      }
      const editButton = event.target.closest(".js-edit-turn");
      if (editButton) return openEditTurn(editButton.dataset.turnId);
      const copyButton = event.target.closest(".js-copy-turn");
      if (copyButton) return copyTurn(copyButton.dataset.turnId);
      const regenerateButton = event.target.closest(".js-regenerate-turn");
      if (regenerateButton) return regenerateTurn(regenerateButton.dataset.turnId);
      const visionButton = event.target.closest(".js-download-vision");
      if (visionButton) return downloadVision(visionButton.dataset.turnId);
      const sideTab = event.target.closest("[data-side-tab]");
      if (sideTab) {
        $$("[data-side-tab]").forEach((button) => {
          const selected = button === sideTab;
          button.classList.toggle("is-active", selected);
          button.setAttribute("aria-selected", String(selected));
        });
        $$("[data-side-panel]").forEach((panel) => panel.classList.toggle("is-active", panel.dataset.sidePanel === sideTab.dataset.sideTab));
        return;
      }
      const mobilePanel = event.target.closest("[data-mobile-panel]");
      if (mobilePanel) {
        $$(".game-sidebar").forEach((sidebar) => sidebar.classList.remove("is-mobile-open"));
        if (mobilePanel.dataset.mobilePanel === "left") $(".game-sidebar--left").classList.add("is-mobile-open");
        if (mobilePanel.dataset.mobilePanel === "right") $(".game-sidebar--right").classList.add("is-mobile-open");
        $$("[data-mobile-panel]").forEach((button) => button.classList.toggle("is-active", button === mobilePanel));
        return;
      }
      if (event.target.closest("[data-close-sidebar]")) {
        $$(".game-sidebar").forEach((sidebar) => sidebar.classList.remove("is-mobile-open"));
        $$("[data-mobile-panel]").forEach((button) => button.classList.toggle("is-active", button.dataset.mobilePanel === "story"));
      }
    });

    $("#quick-start").addEventListener("click", () => chooseScenario(dailyScenario().id));
    $("#omen-start").addEventListener("click", () => chooseScenario(dailyScenario().id));
    $("#join-ritual-btn").addEventListener("click", () => showDialog("ritual-dialog"));
    $("#ritual-form").addEventListener("submit", openRitualCode);
    $("#setup-form").addEventListener("submit", (event) => { event.preventDefault(); startAdventure(event.currentTarget); });
    $("#multiplayer-toggle").addEventListener("change", (event) => { $("#multiplayer-fields").hidden = !event.currentTarget.checked; });
    $("#scenario-search").addEventListener("input", renderScenarioLibrary);
    $("#scenario-filters").addEventListener("click", (event) => {
      const button = event.target.closest("[data-filter]");
      if (!button) return;
      $$("#scenario-filters [data-filter]").forEach((item) => item.classList.toggle("is-active", item === button));
      renderScenarioLibrary();
    });
    $("#import-scenario-btn").addEventListener("click", () => $("#scenario-file-input").click());
    $("#scenario-file-input").addEventListener("change", async (event) => {
      try { await importScenarioFile(event.target.files[0]); } catch (error) { toast(error.message, "error"); }
      event.target.value = "";
    });
    $("#studio-form").addEventListener("input", studioQuality);
    $("#studio-form").addEventListener("submit", saveStudioScenario);
    $("#studio-reset").addEventListener("click", () => { $("#studio-form").reset(); studioQuality(); });

    $("#send-action").addEventListener("click", () => submitTurn());
    $("#action-input").addEventListener("input", autoSizeInput);
    $("#action-input").addEventListener("keydown", (event) => {
      if (event.key === "Enter" && (event.ctrlKey || event.metaKey)) {
        event.preventDefault();
        submitTurn();
      }
    });
    $("#undo-btn").addEventListener("click", undoTurn);
    $("#redo-btn").addEventListener("click", redoTurn);
    $("#leave-game").addEventListener("click", () => routeTo("home"));
    $("#focus-mode-btn").addEventListener("click", (event) => {
      const active = document.body.classList.toggle("reader-mode");
      event.currentTarget.setAttribute("aria-pressed", String(active));
    });
    $("#context-inspector-btn").addEventListener("click", renderContextInspector);
    $("#export-adventure-btn").addEventListener("click", exportAdventure);
    $("#game-menu-btn").addEventListener("click", () => showDialog("game-menu-dialog"));
    $("#export-story-btn").addEventListener("click", exportStory);
    $("#copy-ritual-code-btn").addEventListener("click", copyRitualCode);
    $("#save-chapter-checkpoint-btn").addEventListener("click", saveChapterCheckpoint);
    $("#restore-chapter-checkpoint-btn").addEventListener("click", restoreChapterCheckpoint);
    $("#open-report-btn").addEventListener("click", showReport);
    $("#import-adventure-btn").addEventListener("click", () => $("#adventure-file-input").click());
    $("#adventure-file-input").addEventListener("change", async (event) => {
      try { await importAdventureFile(event.target.files[0]); } catch (error) { toast(error.message, "error"); }
      event.target.value = "";
    });
    $("#delete-adventure-btn").addEventListener("click", deleteCurrentAdventure);
    $("#edit-turn-form").addEventListener("submit", saveEditedTurn);

    $("#settings-form").addEventListener("submit", saveSettingsFromForm);
    $$("#settings-form input[name='engine']").forEach((radio) => radio.addEventListener("change", () => { $("#remote-settings").hidden = radio.value !== "remote" || !radio.checked; }));
    $("#settings-form input[name='temperature']").addEventListener("input", (event) => { event.currentTarget.nextElementSibling.textContent = event.currentTarget.value; });
    $("#test-connection").addEventListener("click", testApiConnection);
    $("#audio-toggle").addEventListener("click", toggleAudio);
    $("#install-app").addEventListener("click", installApp);
    $("#onboarding-start").addEventListener("click", () => {
      try { localStorage.setItem("abyss404:onboarding-seen", "1"); } catch (_) { /* optional */ }
      closeDialog("onboarding-dialog");
      routeTo("library");
    });
    $("#shuffle-gallery").addEventListener("click", renderRandomGallery);

    $$('dialog').forEach((dialog) => {
      dialog.addEventListener("close", () => {
        if (!$("dialog[open]")) document.body.classList.remove("is-modal-open");
      });
      dialog.addEventListener("click", (event) => {
        if (event.target === dialog) closeDialog(dialog);
      });
    });
    $("#onboarding-dialog").addEventListener("close", () => {
      try { localStorage.setItem("abyss404:onboarding-seen", "1"); } catch (_) { /* optional */ }
    });
  }

  function setupBroadcastChannel() {
    if (!("BroadcastChannel" in window)) return;
    app.channel = new BroadcastChannel("abyss404-sync");
    app.channel.addEventListener("message", async (event) => {
      if (!event.data || event.data.type !== "adventure-updated" || !app.current || event.data.id !== app.current.id || app.busy) return;
      const newer = await Storage.getAdventure(app.current.id);
      if (newer && String(newer.updatedAt) > String(app.current.updatedAt)) {
        app.current = newer;
        renderGame(false);
        toast("La aventura se actualizó desde otra pestaña.");
      }
    });
  }

  async function boot() {
    if (!Engine || !Storage || !ScenarioTools) {
      document.body.innerHTML = "<main style='padding:2rem;color:white'>ABYSS 404 no pudo cargar sus módulos. Vuelve a extraer todos los archivos del ZIP.</main>";
      return;
    }
    bindEvents();
    window.addEventListener("beforeinstallprompt", (event) => {
      event.preventDefault();
      app.installPrompt = event;
      updateInstallButton();
    });
    window.addEventListener("appinstalled", () => {
      app.installPrompt = null;
      updateInstallButton();
      toast("Caminos Malditos Sangrientos ya está instalado.");
    });
    updateInstallButton();
    fillSettingsForm();
    applySettings();
    renderDailyOmen();
    studioQuality();
    await Promise.all([refreshScenarios(), refreshAdventures()]);
    setupBroadcastChannel();
    let onboardingSeen = false;
    try { onboardingSeen = localStorage.getItem("abyss404:onboarding-seen") === "1"; } catch (_) { /* optional */ }
    if (!onboardingSeen) setTimeout(() => showDialog("onboarding-dialog"), 250);
    const initialRoute = location.hash.replace(/^#/, "");
    if (["library", "studio"].includes(initialRoute)) await routeTo(initialRoute);
  }

  window.addEventListener("DOMContentLoaded", boot);
})();
