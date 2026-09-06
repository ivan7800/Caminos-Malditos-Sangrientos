(function () {
  "use strict";

  const VERSION = "1.4.0";
  const SCHEMA_VERSION = 1;
  const archetypes = {
    archivist: { label: "Archivista", primary: "reason", reason: 3, nerve: 1, craft: 0, empathy: 1, start: { lucidity: 6 } },
    doctor: { label: "Médico/a", primary: "empathy", reason: 1, nerve: 1, craft: 0, empathy: 3, start: { body: 8 } },
    engineer: { label: "Ingeniero/a", primary: "craft", reason: 1, nerve: 1, craft: 3, empathy: 0, start: { body: 3, lucidity: 2 } },
    occultist: { label: "Ocultista", primary: "reason", reason: 2, nerve: 0, craft: 0, empathy: 1, lore: 3, start: { obsession: 8, lucidity: -3 } },
    investigator: { label: "Investigador/a", primary: "nerve", reason: 1, nerve: 3, craft: 1, empathy: 1, start: { lucidity: 2, body: 2 } }
  };

  const intentLexicon = {
    investigate: ["buscar", "examinar", "investigar", "mirar", "leer", "analizar", "inspeccionar", "escuchar", "rastro", "huella", "registro", "mapa", "diario", "pregunto por"],
    social: ["hablar", "preguntar", "convencer", "decir", "gritar", "susurrar", "mentir", "negociar", "responder", "llamar"],
    physical: ["correr", "saltar", "golpear", "romper", "forzar", "subir", "bajar", "trepar", "empujar", "atacar", "huir", "nadar", "abrir"],
    technical: ["reparar", "conectar", "desconectar", "activar", "apagar", "calibrar", "programar", "cable", "máquina", "motor", "mecanismo", "consola"],
    forbidden: ["ritual", "invocar", "sangre", "lente", "señal", "mirar la luz", "responder a la voz", "abrir la puerta", "entidad", "tabú", "sacrificio", "tocar", "descender"],
    recover: ["descansar", "respirar", "curar", "vendar", "meditar", "calmar", "dormir", "tratar la herida"]
  };

  const outcomeLabels = {
    critical: "Éxito crítico",
    success: "Éxito",
    cost: "Éxito con coste",
    failure: "Fallo"
  };

  const descentStages = Object.freeze([
    { index: 1, numeral: "I", key: "sospecha", label: "Sospecha", from: 0, to: 19, description: "Algo no encaja. El mundo todavía puede fingir que todo sigue en su sitio." },
    { index: 2, numeral: "II", key: "revelacion", label: "Revelación", from: 20, to: 39, description: "La primera forma aparece detrás de los hechos. Ya no basta con mirar hacia otro lado." },
    { index: 3, numeral: "III", key: "contagio", label: "Contagio", from: 40, to: 59, description: "La anomalía ha aprendido tu nombre y empieza a entrar en tus decisiones." },
    { index: 4, numeral: "IV", key: "umbral", label: "Umbral", from: 60, to: 79, description: "La frontera se vuelve permeable. Cada respuesta deja algo abierto detrás de ti." },
    { index: 5, numeral: "V", key: "ruptura", label: "Ruptura", from: 80, to: 100, description: "La verdad ya no permanece al otro lado. El expediente se acerca a su forma definitiva." }
  ]);

  function clone(value) {
    if (typeof structuredClone === "function") return structuredClone(value);
    return JSON.parse(JSON.stringify(value));
  }

  function clamp(value, min, max) {
    return Math.min(max, Math.max(min, value));
  }

  function uid(prefix) {
    if (globalThis.crypto && typeof globalThis.crypto.randomUUID === "function") return `${prefix}-${globalThis.crypto.randomUUID()}`;
    return `${prefix}-${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 10)}`;
  }

  function hashSeed(input) {
    const text = String(input || "ABYSS-404");
    let hash = 2166136261;
    for (let i = 0; i < text.length; i += 1) {
      hash ^= text.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    return hash >>> 0;
  }

  function mulberry32(seed) {
    let state = seed >>> 0;
    return function () {
      state += 0x6d2b79f5;
      let t = state;
      t = Math.imul(t ^ (t >>> 15), t | 1);
      t ^= t + Math.imul(t ^ (t >>> 7), t | 61);
      return ((t ^ (t >>> 14)) >>> 0) / 4294967296;
    };
  }

  function nextRandom(adventure, salt) {
    adventure.world.rngStep = (adventure.world.rngStep || 0) + 1;
    const seed = (adventure.meta.seedHash + adventure.world.rngStep * 2654435761 + hashSeed(salt || "")) >>> 0;
    return mulberry32(seed)();
  }

  function choose(adventure, list, salt) {
    if (!Array.isArray(list) || !list.length) return "";
    return list[Math.floor(nextRandom(adventure, salt) * list.length) % list.length];
  }

  function normalizeText(text) {
    return String(text || "").replace(/\s+/g, " ").trim();
  }

  function shortText(text, max) {
    const clean = normalizeText(text);
    if (clean.length <= max) return clean;
    return `${clean.slice(0, max).replace(/\s+\S*$/, "")}…`;
  }

  function safeText(value, max) {
    return String(value == null ? "" : value).replace(/[\u0000-\u0008\u000b\u000c\u000e-\u001f]/g, "").slice(0, max);
  }

  function words(text) {
    return normalizeText(text)
      .toLocaleLowerCase("es")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .split(/[^a-z0-9ñ]+/)
      .filter((word) => word.length > 2);
  }

  function overlapScore(query, candidate) {
    const querySet = new Set(words(query));
    const candidateSet = new Set(words(candidate));
    if (!querySet.size || !candidateSet.size) return 0;
    let intersection = 0;
    querySet.forEach((word) => {
      if (candidateSet.has(word)) intersection += 1;
    });
    return intersection / Math.sqrt(querySet.size * candidateSet.size);
  }

  function estimateTokens(text) {
    return Math.max(1, Math.ceil(String(text || "").length / 4));
  }

  function truncateTokens(text, budget) {
    const value = String(text || "");
    if (estimateTokens(value) <= budget) return value;
    const chars = Math.max(0, budget * 4 - 1);
    return `${value.slice(0, chars).replace(/\s+\S*$/, "")}…`;
  }

  function archetypeFor(id) {
    return archetypes[id] || archetypes.investigator;
  }

  function getDescentStage(threshold) {
    const value = clamp(Number(threshold) || 0, 0, 100);
    const stage = descentStages.slice().reverse().find((item) => value >= item.from) || descentStages[0];
    const span = Math.max(1, stage.to - stage.from + 1);
    return {
      ...stage,
      threshold: value,
      overall: value,
      localProgress: Math.round(clamp((value - stage.from) / span, 0, 1) * 100)
    };
  }

  function createAdventure(scenarioInput, setup, settings) {
    const scenario = clone(scenarioInput);
    if (window.AbyssEndingTools && typeof window.AbyssEndingTools.applyEditorialPass === "function") {
      window.AbyssEndingTools.applyEditorialPass(scenario);
    }
    const seedText = normalizeText(setup.seed) || `${scenario.id}-${Date.now()}`;
    const primaryPlayer = {
      id: uid("player"),
      name: safeText(setup.playerName || "Investigador", 40).trim() || "Investigador",
      archetype: archetypes[setup.archetype] ? setup.archetype : "investigator"
    };
    const extraPlayers = Array.isArray(setup.extraPlayers)
      ? setup.extraPlayers.map((name) => safeText(name, 40).trim()).filter(Boolean).slice(0, 3)
      : [];
    const players = [primaryPlayer].concat(extraPlayers.map((name, index) => ({
      id: uid(`player${index + 2}`),
      name,
      archetype: index % 2 ? "engineer" : "investigator"
    })));
    const archetype = archetypeFor(primaryPlayer.archetype);
    const state = {
      lucidity: clamp(82 + (archetype.start.lucidity || 0), 1, 100),
      body: clamp(88 + (archetype.start.body || 0), 1, 100),
      obsession: clamp(archetype.start.obsession || 0, 0, 100),
      threshold: 2,
      xp: 0,
      level: 1,
      conditions: []
    };
    const now = new Date().toISOString();
    return {
      schemaVersion: SCHEMA_VERSION,
      appVersion: VERSION,
      id: uid("adventure"),
      title: scenario.title,
      scenarioId: scenario.id,
      scenario,
      createdAt: now,
      updatedAt: now,
      players,
      activePlayerIndex: 0,
      mode: "do",
      settings: {
        perspective: ["first", "second", "third"].includes(setup.perspective) ? setup.perspective : "second",
        intensity: ["suggestive", "severe", "merciless"].includes(setup.intensity) ? setup.intensity : "severe",
        contextBudget: Number(settings && settings.contextBudget) || 4096,
        responseLength: settings && settings.responseLength || "medium"
      },
      state,
      world: {
        location: scenario.initialState.location,
        time: scenario.initialState.time,
        baseTime: scenario.initialState.time,
        chapter: 1,
        chapterTitle: scenario.chapters && scenario.chapters[0] ? scenario.chapters[0].title : "El despertar",
        objective: scenario.initialState.objective,
        clock: 0,
        rngStep: 0,
        inventory: clone(scenario.initialState.inventory || []),
        clues: [],
        discoveredCards: [],
        progressionReached: [],
        descent: getDescentStage(state.threshold),
        director: { phase: "hook", tension: 8, momentum: 0, objective: "Sobrevive al primer contacto.", cliffhanger: "La señal todavía no ha dicho tu nombre." },
        combat: null,
        storyPath: window.AbyssEndingTools && typeof window.AbyssEndingTools.createPath === "function"
          ? window.AbyssEndingTools.createPath(scenario)
          : scenario.id === "sangre-del-metropolit" ? { deaths: 0, cameraClues: 0, silvanaTrust: 0, trentTrust: 0, josephTrust: 0, rebellion: 0, power: 0 } : null,
        flags: {}
      },
      memory: {
        summary: scenario.premise,
        bank: [],
        lastBankTurn: 0,
        lastSummaryTurn: 0
      },
      turns: [{
        id: uid("turn"),
        index: 0,
        mode: "opening",
        playerId: null,
        playerName: "Director 404",
        input: "",
        output: scenario.opening,
        effects: [],
        roll: null,
        discovery: null,
        createdAt: now
      }],
      meta: {
        seedText,
        seedHash: hashSeed(seedText),
        ended: false,
        endingData: null,
        engine: settings && settings.engine === "remote" ? "remote" : "offline",
        fallbackCount: 0,
        stats: {
          actions: 0,
          discoveries: 0,
          memories: 0,
          visions: 0,
          chaptersReached: 1,
          alteredMemories: 0,
          finalStage: 1
        }
      }
    };
  }

  function detectIntent(mode, input) {
    if (mode === "say") return "social";
    if (mode === "story") return "story";
    if (mode === "continue") return "continue";
    if (mode === "see") return "vision";
    const lower = normalizeText(input).toLocaleLowerCase("es");
    let best = "physical";
    let bestScore = 0;
    Object.entries(intentLexicon).forEach(([intent, keys]) => {
      if (intent === "forbidden" || intent === "recover") return;
      const score = keys.reduce((sum, key) => sum + (lower.includes(key) ? 1 : 0), 0);
      if (score > bestScore) {
        best = intent;
        bestScore = score;
      }
    });
    return best;
  }

  function containsAny(input, list) {
    const lower = normalizeText(input).toLocaleLowerCase("es");
    return list.some((entry) => lower.includes(entry));
  }

  function skillForIntent(player, intent) {
    const archetype = archetypeFor(player.archetype);
    if (intent === "investigate") return { name: "Razón", value: archetype.reason || 0 };
    if (intent === "social") return { name: "Empatía", value: archetype.empathy || 0 };
    if (intent === "technical") return { name: "Ingenio", value: archetype.craft || 0 };
    if (intent === "forbidden") return { name: "Saber", value: archetype.lore || archetype.reason || 0 };
    return { name: "Nervio", value: archetype.nerve || 0 };
  }

  function selectDiscovery(adventure, input, intent, outcome) {
    const scenario = adventure.scenario;
    const undiscovered = (scenario.storyCards || []).filter((card) => !adventure.world.discoveredCards.includes(card.id));
    if (!undiscovered.length || !["critical", "success", "cost"].includes(outcome)) return null;
    const query = `${input} ${adventure.world.location} ${adventure.world.objective}`;
    const scored = undiscovered
      .map((card) => ({ card, score: overlapScore(query, `${card.title} ${(card.keys || []).join(" ")} ${card.type}`) }))
      .sort((a, b) => b.score - a.score);
    if (scored[0] && scored[0].score >= 0.12) return clone(scored[0].card);
    if (intent === "investigate" && nextRandom(adventure, "discover") > 0.32) return clone(undiscovered[0]);
    if (outcome === "critical" && nextRandom(adventure, "critical-discover") > 0.18) return clone(undiscovered[0]);
    return null;
  }

  function resolveMechanics(adventure, mode, input) {
    const player = adventure.players[adventure.activePlayerIndex] || adventure.players[0];
    let intent = detectIntent(mode, input);
    if (mode === "attack") intent = "physical";
    if (mode === "defend") intent = "recover";
    const forbidden = containsAny(input, intentLexicon.forbidden) || (adventure.scenario.rules || []).some((rule) => overlapScore(input, rule) > 0.28);
    const recovering = containsAny(input, intentLexicon.recover);
    if (forbidden && mode === "do") intent = "forbidden";
    const skill = skillForIntent(player, intent);
    const rawRoll = Math.floor(nextRandom(adventure, `${mode}-${input}`) * 20) + 1;
    const intensityMod = adventure.settings.intensity === "merciless" ? 2 : adventure.settings.intensity === "suggestive" ? -1 : 0;
    const difficulty = clamp(9 + Math.floor(adventure.state.threshold / 28) + intensityMod + (forbidden ? 2 : 0), 7, 16);
    const total = rawRoll + skill.value;
    let outcome = "failure";
    if (rawRoll === 20 || total >= difficulty + 7) outcome = "critical";
    else if (total >= difficulty + 2) outcome = "success";
    else if (total >= difficulty - 2) outcome = "cost";
    if (["story", "vision"].includes(intent)) outcome = "success";

    const effects = { lucidity: 0, body: 0, obsession: 0, threshold: 0 };
    if (mode !== "story" && mode !== "defend") effects.threshold += 1 + Math.floor(nextRandom(adventure, "threshold") * 3);
    if (mode === "continue") effects.threshold += 2;
    if (mode === "see") {
      effects.lucidity -= 1;
      effects.obsession += 2;
    }
    if (forbidden) {
      effects.lucidity -= 2 + Math.floor(nextRandom(adventure, "forbidden-lucidity") * 4);
      effects.obsession += 3;
      effects.threshold += 2;
    }
    if (outcome === "critical") {
      effects.lucidity += intent === "investigate" ? 1 : 0;
      effects.obsession += forbidden ? 2 : 0;
    } else if (outcome === "success") {
      effects.obsession += intent === "investigate" ? 1 : 0;
    } else if (outcome === "cost") {
      effects.lucidity -= 2 + Math.floor(nextRandom(adventure, "cost-lucidity") * 3);
      effects.obsession += 1;
      if (["physical", "technical"].includes(intent) && nextRandom(adventure, "cost-body") > 0.58) effects.body -= 3;
    } else if (outcome === "failure") {
      effects.lucidity -= 3 + Math.floor(nextRandom(adventure, "fail-lucidity") * 5);
      effects.threshold += 2;
      if (intent === "physical" || forbidden) effects.body -= 3 + Math.floor(nextRandom(adventure, "fail-body") * 6);
    }
    if (recovering && ["critical", "success", "cost"].includes(outcome)) {
      effects.lucidity += 3;
      effects.body += intent === "physical" ? 4 : 2;
      effects.threshold = Math.max(0, effects.threshold - 1);
    }
    if (mode === "defend") {
      effects.body += outcome === "failure" ? 1 : 4;
      effects.lucidity += 1;
      effects.threshold = -1;
    }
    if (mode === "attack" && adventure.world.combat) {
      const enemy = adventure.world.combat.enemy;
      const damage = Math.max(1, total - enemy.defense + (outcome === "critical" ? 5 : 0));
      enemy.health = clamp(enemy.health - damage, 0, enemy.maxHealth);
      if (enemy.health <= 0) adventure.world.combat = null;
      if (outcome === "failure") effects.body -= 4;
    }
    if (adventure.state.obsession > 60 && intent === "investigate") effects.obsession += 2;

    const discovery = selectDiscovery(adventure, input, intent, outcome);
    return {
      intent,
      forbidden,
      recovering,
      outcome,
      outcomeLabel: outcomeLabels[outcome],
      roll: mode === "story" || mode === "see" ? null : { die: 20, raw: rawRoll, bonus: skill.value, total, difficulty, skill: skill.name },
      effects,
      discovery
    };
  }

  function effectChips(effects) {
    const labels = { lucidity: "Lucidez", body: "Cuerpo", obsession: "Obsesión", threshold: "Umbral" };
    return Object.entries(effects)
      .filter(([, value]) => value !== 0)
      .map(([key, value]) => ({ key, value, label: `${labels[key]} ${value > 0 ? "+" : ""}${value}` }));
  }

  function applyMechanics(adventure, mechanics) {
    Object.entries(mechanics.effects).forEach(([key, delta]) => {
      adventure.state[key] = clamp((adventure.state[key] || 0) + delta, 0, 100);
    });
    if (mechanics.discovery && !adventure.world.discoveredCards.includes(mechanics.discovery.id)) {
      adventure.world.discoveredCards.push(mechanics.discovery.id);
      adventure.world.clues.push({
        id: uid("clue"),
        cardId: mechanics.discovery.id,
        title: mechanics.discovery.title,
        description: mechanics.discovery.clue || mechanics.discovery.content,
        turn: countPlayableTurns(adventure) + 1,
        createdAt: new Date().toISOString()
      });
    }
    adventure.world.clock += 1;
    adventure.world.time = `${adventure.world.baseTime} · T+${adventure.world.clock}`;
    (adventure.scenario.progression || []).forEach((stage) => {
      if (adventure.state.threshold >= stage.at && !adventure.world.progressionReached.includes(stage.at)) {
        adventure.world.progressionReached.push(stage.at);
        adventure.world.location = stage.location;
        adventure.world.objective = stage.objective;
      }
    });
    const played = countPlayableTurns(adventure) + 1;
    const director = adventure.world.director || (adventure.world.director = { phase: "hook", tension: 0, momentum: 0, objective: adventure.world.objective, cliffhanger: "" });
    if (Array.isArray(adventure.scenario.chapters) && adventure.scenario.chapters.length) {
      const chapterIndex = Math.min(adventure.scenario.chapters.length - 1, Math.floor((played - 1) / 5));
      const chapter = adventure.scenario.chapters[chapterIndex];
      adventure.world.chapter = chapterIndex + 1;
      adventure.world.chapterTitle = chapter.title;
      if (chapter.objective) adventure.world.objective = chapter.objective;
    }
    director.tension = clamp((director.tension || 0) + (mechanics.effects.threshold || 0) + (mechanics.outcome === "failure" ? 4 : 1), 0, 100);
    director.momentum = clamp((director.momentum || 0) + (["critical", "success"].includes(mechanics.outcome) ? 2 : -1), -5, 10);
    const phases = ["hook", "build", "pressure", "crisis", "payoff", "aftermath"];
    director.phase = phases[Math.min(phases.length - 1, Math.floor((played - 1) / 2))];
    director.objective = adventure.world.objective;
    director.cliffhanger = director.tension > 68 ? "Algo ha respondido desde el otro lado." : director.phase === "crisis" ? "La salida exige una decisión irreversible." : "La señal sigue creciendo bajo la escena.";
    adventure.state.xp = (adventure.state.xp || 0) + (mechanics.outcome === "critical" ? 30 : mechanics.outcome === "success" ? 20 : mechanics.outcome === "cost" ? 12 : 8);
    const nextLevel = 100 + ((adventure.state.level || 1) - 1) * 60;
    if (adventure.state.xp >= nextLevel) { adventure.state.xp -= nextLevel; adventure.state.level = (adventure.state.level || 1) + 1; adventure.state.conditions.push(`Nivel ${adventure.state.level}`); }
    if (adventure.state.lucidity <= 18 && !adventure.state.conditions.includes("Realidad inestable")) adventure.state.conditions.push("Realidad inestable");
    if (adventure.state.body <= 20 && !adventure.state.conditions.includes("Herida grave")) adventure.state.conditions.push("Herida grave");
    if (adventure.state.obsession >= 72 && !adventure.state.conditions.includes("Fijación abisal")) adventure.state.conditions.push("Fijación abisal");
    adventure.world.descent = getDescentStage(adventure.state.threshold);
  }

  function immersionSnapshot(adventure) {
    return {
      chapter: adventure.world.chapter || 1,
      threshold: adventure.state.threshold || 0,
      clues: adventure.world.clues.length,
      inventory: adventure.world.inventory.length,
      memories: (adventure.memory.bank || []).length,
      conditions: adventure.state.conditions.length,
      stage: getDescentStage(adventure.state.threshold).index
    };
  }

  function buildImmersionEvent(adventure, previous, mechanics, mode) {
    const stage = getDescentStage(adventure.state.threshold);
    adventure.world.descent = stage;
    const chapterChanged = stage && (adventure.world.chapter || 1) !== previous.chapter;
    const stageChanged = stage.index > previous.stage;
    const clueAdded = adventure.world.clues.length > previous.clues;
    const memoryAdded = (adventure.memory.bank || []).length > previous.memories;
    const conditionAdded = adventure.state.conditions.length > previous.conditions;
    let event = null;

    if (stageChanged) {
      event = {
        kind: "descent",
        eyebrow: "DESCENSO",
        title: `${stage.numeral} · ${stage.label}`,
        body: stage.description,
        stage: stage.index,
        accent: "acid"
      };
    } else if (clueAdded && mechanics.discovery) {
      event = {
        kind: "discovery",
        eyebrow: "NUEVA PISTA",
        title: mechanics.discovery.title,
        body: mechanics.discovery.clue || mechanics.discovery.content,
        stage: stage.index,
        accent: "gold"
      };
    } else if (memoryAdded) {
      const memory = adventure.memory.bank[adventure.memory.bank.length - 1];
      event = {
        kind: "memory",
        eyebrow: "RECUERDO ALTERADO",
        title: "El pasado ha cambiado de sitio",
        body: memory ? memory.text : "Una parte de la historia vuelve con una forma distinta.",
        stage: stage.index,
        accent: "teal"
      };
    } else if (chapterChanged) {
      event = {
        kind: "chapter",
        eyebrow: "NUEVO CAPÍTULO",
        title: `Capítulo ${adventure.world.chapter} · ${adventure.world.chapterTitle || "El despertar"}`,
        body: adventure.world.objective || "La escena ha cambiado de temperatura.",
        stage: stage.index,
        accent: "acid"
      };
    } else if (conditionAdded) {
      event = {
        kind: "condition",
        eyebrow: "ESTADO DEL MUNDO",
        title: adventure.state.conditions[adventure.state.conditions.length - 1],
        body: "La partida conservará esta consecuencia hasta que una decisión la transforme.",
        stage: stage.index,
        accent: "danger"
      };
    } else if (mode === "see") {
      event = {
        kind: "vision",
        eyebrow: "VISIÓN",
        title: "La escena te ha visto mirar",
        body: "La imagen queda archivada junto a este turno.",
        stage: stage.index,
        accent: "teal"
      };
    }

    if (adventure.meta.ended) {
      event = {
        kind: "ending",
        eyebrow: "EXPEDIENTE CERRADO",
        title: adventure.meta.endingData ? adventure.meta.endingData.title : adventure.meta.ending ? "El final ha elegido una forma" : "El descenso ha llegado al límite",
        body: adventure.meta.endingData && adventure.meta.endingData.epilogue ? `Epílogo: ${adventure.meta.endingData.epilogue.when}. Consulta el informe para conservar la consecuencia.` : "Puedes consultar el informe del descenso, exportar el relato o deshacer el último turno.",
        stage: stage.index,
        accent: "danger"
      };
    }
    if (event) event.threshold = stage.threshold;
    return event;
  }

  function continuityState(adventure) {
    const flags = adventure.world.flags || (adventure.world.flags = {});
    if (!flags.continuity || typeof flags.continuity !== "object") flags.continuity = { dead: {}, lostItems: {}, notes: [] };
    if (!flags.continuity.dead || typeof flags.continuity.dead !== "object") flags.continuity.dead = {};
    if (!flags.continuity.lostItems || typeof flags.continuity.lostItems !== "object") flags.continuity.lostItems = {};
    if (!Array.isArray(flags.continuity.notes)) flags.continuity.notes = [];
    return flags.continuity;
  }

  function normalizeEntity(value) {
    return normalizeText(value)
      .toLocaleLowerCase("es")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/^[\s"'«»]+|[\s"'«»]+$/g, "");
  }

  function cleanCapturedEntity(value) {
    return normalizeText(value)
      .replace(/^(?:el|la|los|las|un|una|unos|unas|mi|mis)\s+/i, "")
      .replace(/[,.!?;:]+$/g, "")
      .trim();
  }

  function explicitTool(input) {
    const text = normalizeText(input);
    const match = text.match(/(?:uso|utilizo|empleo|saco|desenfundo|activo)\s+(?:(?:el|la|los|las|un|una|unos|unas|mi|mis)\s+)?([^,.;!?]+?)(?=\s+(?:para|contra|sobre|en|con|y|e)\s+|[,.;!?]|$)/i);
    if (!match) return "";
    const item = cleanCapturedEntity(match[1]);
    const toolWords = ["pistola", "revolver", "revólver", "arma", "cuchillo", "motosierra", "llave", "linterna", "cuerda", "martillo", "palanca", "mechero", "cerillas", "hacha", "radio", "camara", "cámara", "grabadora", "telefono", "teléfono", "movil", "móvil", "ordenador", "portatil", "portátil"];
    return toolWords.some((word) => normalizeEntity(item).includes(normalizeEntity(word))) ? item : "";
  }

  function itemIsEstablished(adventure, item) {
    const key = normalizeEntity(item);
    if (!key) return true;
    const continuity = continuityState(adventure);
    const lost = Object.keys(continuity.lostItems).some((name) => key.includes(name) || name.includes(key));
    if (lost) return false;
    const inventory = (adventure.world.inventory || []).map((entry) => normalizeEntity(entry && entry.name));
    if (inventory.some((name) => name && (name.includes(key) || key.includes(name) || overlapScore(key, name) >= 0.45))) return true;
    const recent = adventure.turns.slice(-3).map((turn) => `${turn.input || ""} ${turn.output || ""}`).join(" ");
    return normalizeEntity(recent).includes(key);
  }

  function detectContinuityConstraint(adventure, mode, input) {
    if (!input || mode === "story" || mode === "continue" || mode === "see" || mode === "attack" || mode === "defend") return null;
    const continuity = continuityState(adventure);
    const normalized = normalizeEntity(input);
    for (const [key, display] of Object.entries(continuity.dead)) {
      if (key && normalized.includes(key) && (mode === "say" || /(?:hablo|pregunto|responde|digo|llamo|escucho)\b/i.test(input))) {
        return { type: "dead-character", subject: display, message: `La continuidad registrada no permite que ${display} responda como una persona viva. Si algo contesta, tendrá que ser una anomalía, una grabación, un recuerdo o una imitación.` };
      }
    }
    if (mode === "do") {
      if (/(?:me\s+)?teletransporto|atravieso\s+(?:la|una)\s+pared|vuelo\s+sin\s+ayuda|resucito\s+a|revivo\s+a/i.test(input)) {
        return { type: "unsupported-impossible-action", subject: "acción imposible", message: "La intención no convierte por sí sola una acción imposible en un hecho. Hace falta un medio, una causa o una anomalía ya establecida en la ficción." };
      }
      const item = explicitTool(input);
      if (item && !itemIsEstablished(adventure, item)) {
        const key = normalizeEntity(item);
        const wasLost = Object.keys(continuity.lostItems).some((name) => key.includes(name) || name.includes(key));
        return { type: wasLost ? "lost-item" : "missing-item", subject: item, message: wasLost
          ? `El objeto «${item}» ya no está disponible según la continuidad registrada. La acción se trata como un intento, no como si hubiera reaparecido.`
          : `El objeto «${item}» no forma parte del inventario ni ha sido establecido recientemente en la escena. El narrador no lo materializa de la nada.` };
      }
    }
    return null;
  }

  function forceContinuityFailure(mechanics, constraint) {
    if (!constraint) return mechanics;
    mechanics.continuity = constraint;
    mechanics.forbidden = false;
    mechanics.recovering = false;
    mechanics.outcome = "failure";
    mechanics.outcomeLabel = outcomeLabels.failure;
    mechanics.discovery = null;
    mechanics.effects = { lucidity: -1, body: 0, obsession: 0, threshold: 1 };
    return mechanics;
  }

  function extractNamedSubject(text, pattern) {
    const match = normalizeText(text).match(pattern);
    return match ? cleanCapturedEntity(match[1]) : "";
  }

  function recordContinuityFacts(adventure, mode, input, mechanics) {
    if (!input) return;
    const continuity = continuityState(adventure);
    const authoritative = mode === "story" || ["critical", "success", "cost"].includes(mechanics && mechanics.outcome);
    if (!authoritative || (mechanics && mechanics.continuity)) return;
    let dead = extractNamedSubject(input, /\b([A-ZÁÉÍÓÚÜÑ][A-Za-zÁÉÍÓÚÜÑáéíóúüñ-]{1,30}(?:\s+[A-ZÁÉÍÓÚÜÑ][A-Za-zÁÉÍÓÚÜÑáéíóúüñ-]{1,30}){0,2})\s+(?:muere|fallece|ha muerto|está muerto|esta muerto)\b/);
    if (!dead) dead = extractNamedSubject(input, /\b(?:mato|asesino|elimino)\s+a\s+([A-ZÁÉÍÓÚÜÑ][A-Za-zÁÉÍÓÚÜÑáéíóúüñ-]{1,30}(?:\s+[A-ZÁÉÍÓÚÜÑ][A-Za-zÁÉÍÓÚÜÑáéíóúüñ-]{1,30}){0,2})\b/);
    if (dead) continuity.dead[normalizeEntity(dead)] = dead;

    if (mode === "story") {
      const revived = extractNamedSubject(input, /\b([A-ZÁÉÍÓÚÜÑ][A-Za-zÁÉÍÓÚÜÑáéíóúüñ-]{1,30}(?:\s+[A-ZÁÉÍÓÚÜÑ][A-Za-zÁÉÍÓÚÜÑáéíóúüñ-]{1,30}){0,2})\s+(?:revive|resucita|vuelve a la vida)\b/);
      if (revived) delete continuity.dead[normalizeEntity(revived)];
    }

    const lostMatch = normalizeText(input).match(/\b(?:pierdo|destruyo|rompo|abandono|dejo atrás|dejo atras)\s+(?:(?:el|la|los|las|un|una|mi|mis)\s+)?([^,.;!?]+?)(?=\s+(?:para|contra|sobre|en|con|y|e)\s+|[,.;!?]|$)/i);
    if (lostMatch) {
      const item = cleanCapturedEntity(lostMatch[1]);
      if (item) continuity.lostItems[normalizeEntity(item)] = item;
    }
    continuity.notes = continuity.notes.slice(-12);
  }

  function continuityContext(adventure) {
    const continuity = continuityState(adventure);
    const dead = Object.values(continuity.dead);
    const lost = Object.values(continuity.lostItems);
    if (!dead.length && !lost.length) return "Continuidad explícita: sin restricciones adicionales registradas.";
    return [
      dead.length ? `Personajes muertos/no disponibles como vivos: ${dead.join(", ")}. No los hagas hablar o actuar como vivos salvo anomalía explícitamente justificada.` : "",
      lost.length ? `Objetos perdidos/destruidos: ${lost.join(", ")}. No los devuelvas sin una recuperación explícita.` : ""
    ].filter(Boolean).join("\n");
  }

  function actionLead(adventure, mode, input, continuity) {
    if (continuity && continuity.message) return continuity.message;
    const player = adventure.players[adventure.activePlayerIndex] || adventure.players[0];
    const excerpt = shortText(input, 150).replace(/[.!?]+$/, "");
    const perspective = adventure.settings.perspective;
    if (mode === "say") return `«${excerpt}».`;
    if (mode === "story") return `${excerpt}${/[.!?…]$/.test(excerpt) ? "" : "."}`;
    if (mode === "continue") return choose(adventure, window.AbyssScenarioTools.sharedBanks.continue, "continue-lead");
    if (mode === "see") return "La escena se separa de la secuencia del tiempo y queda fijada como una visión.";
    if (perspective === "first") return `Llevo a cabo mi decisión: ${excerpt}.`;
    if (perspective === "third") return `${player.name} lleva a cabo su decisión: ${excerpt}.`;
    return `Llevas a cabo tu decisión: ${excerpt}.`;
  }

  function continuityLine(adventure) {
    const recent = adventure.turns.filter((turn) => turn.input).slice(-2);
    if (!recent.length || nextRandom(adventure, "continuity") < 0.48) return "";
    const last = recent[recent.length - 1];
    const reference = shortText(last.input, 70).toLocaleLowerCase("es");
    const options = [
      `La consecuencia enlaza con tu decisión anterior —${reference}— y la vuelve más difícil de ignorar.`,
      `Algo en el lugar recuerda que antes intentaste ${reference}; esta vez responde de otra manera.`,
      `El rastro de aquella acción —${reference}— sigue presente donde no debería.`
    ];
    return choose(adventure, options, "continuity-line");
  }

  function endHook(adventure, mechanics) {
    const banks = adventure.scenario.banks || {};
    if (adventure.state.threshold >= 92) return choose(adventure, banks.revelation || [], "late-reveal");
    if (mechanics.discovery) return `El hallazgo tiene un nombre en el expediente: ${mechanics.discovery.title}. Saberlo no te protege; solo permite que la siguiente pregunta sea más precisa.`;
    if (mechanics.outcome === "failure") return choose(adventure, banks.continue || window.AbyssScenarioTools.sharedBanks.transitions, "failure-hook");
    return choose(adventure, window.AbyssScenarioTools.sharedBanks.transitions, "standard-hook");
  }

  function endingTools() {
    return window.AbyssEndingTools && typeof window.AbyssEndingTools.endingData === "function" ? window.AbyssEndingTools : null;
  }

  function attachEndingData(adventure, endingId) {
    const tools = endingTools();
    const data = tools && tools.endingData(adventure.scenario, endingId);
    if (data) adventure.meta.endingData = clone(data);
    return data;
  }

  function formatStoryEnding(data) {
    if (!data) return "";
    const epilogue = data.epilogue || {};
    return [
      `DECISIÓN · ${data.title}`,
      data.climax,
      `CONSECUENCIA\n${data.consequence}`,
      `EPÍLOGO · ${epilogue.when || "Después"} · ${epilogue.title || "Registro final"}\n${epilogue.text || "La historia deja una marca que no aparece en el expediente."}`,
      epilogue.finalLine ? `«${epilogue.finalLine}»` : ""
    ].filter(Boolean).join("\n\n");
  }

  function endingText(adventure) {
    const data = adventure.meta.endingData || (endingTools() && endingTools().endingData(adventure.scenario, adventure.meta.ending));
    if (data) return formatStoryEnding(data);
    if (adventure.meta.ending === "liberation") return "La Bobina Perdida arde desde dentro. Renuncias al poder del MetropoliT y a todos los recuerdos que el cine había convertido en propiedad suya. Vincent desaparece con la película, pero las sombras atrapadas quedan libres. Por primera vez, el fundido es definitivo.";
    if (adventure.meta.ending === "projectionist") return "El celuloide trepa por tus manos y el proyector acepta tu rostro. La película obedece. Las muertes se detienen, pero solo porque ahora tú decides quién ocupa cada fotograma. El MetropoliT tiene un nuevo Proyeccionista.";
    if (adventure.meta.ending === "loop") return "La pantalla se ilumina y muestra la habitación inicial. La pistola vuelve a aparecer sobre la cama. El MetropoliT no ha sido destruido: solo ha encontrado una nueva forma de comenzar.";
    if (adventure.state.body <= 0) {
      return "El cuerpo alcanza su límite antes que la historia. Lo último que percibes no es dolor, sino la certeza de que el expediente continuará escribiéndose con otra caligrafía. La aventura queda cerrada aquí, aunque todavía puedes deshacer el turno y buscar otra salida.";
    }
    if (adventure.state.threshold >= 100) {
      return `El Umbral se completa. ${adventure.scenario.entity} deja de ser una hipótesis y pasa a ser una condición del mundo. Comprendes la verdad demasiado tarde: ${adventure.scenario.truth} La aventura queda cerrada, pero puedes deshacer este turno o exportar el relato.`;
    }
    return "";
  }

  function resolveLiteraryEnding(adventure, input) {
    if (adventure.scenario.id !== "sangre-del-metropolit" || adventure.meta.ending) return;
    const text = normalizeText(input);
    const late = (adventure.world.chapter || 1) >= 18 || adventure.state.threshold >= 74;
    if (!late) return;
    const path = adventure.world.storyPath || {};
    if (containsAny(text, ["renunciar al cine", "destruir la película", "destruir la bobina", "romper el ciclo", "sacrificarme", "sacrificio"]) && ((path.rebellion || 0) >= 2 || (path.cameraClues || 0) >= 3)) adventure.meta.ending = "liberation";
    else if (containsAny(text, ["ser el proyeccionista", "convertirme en proyeccionista", "acepto el papel", "controlar la película", "nuevo director"]) && ((path.power || 0) >= 2 || (path.josephTrust || 0) >= 2)) adventure.meta.ending = "projectionist";
    else if (containsAny(text, ["repetir el ciclo", "seguir la película", "aceptar mi destino", "dejar que continúe"])) adventure.meta.ending = "loop";
    else if (containsAny(text, ["salvar a silvana", "salvar a trent", "liberar a los testigos", "proteger a philo", "salvar a todos"]) && ((path.silvanaTrust || 0) + (path.trentTrust || 0) >= 2)) adventure.meta.ending = "testigos-libres";
    if (adventure.meta.ending) {
      attachEndingData(adventure, adventure.meta.ending);
      adventure.meta.ended = true;
    }
  }

  function resolveStoryEnding(adventure, input) {
    if (adventure.meta.ending || adventure.state.body <= 0) return;
    const tools = window.AbyssEndingTools;
    if (!tools || typeof tools.updatePath !== "function" || typeof tools.findEnding !== "function") return;
    adventure.world.storyPath = tools.ensurePath(adventure.world.storyPath, adventure.scenario);
    const ending = tools.findEnding(adventure, input, { force: adventure.state.threshold >= 100 });
    if (!ending) return;
    adventure.meta.ending = ending.id;
    adventure.meta.endingData = clone(ending);
    adventure.meta.ended = true;
  }

  function generateOffline(adventure, mode, input, mechanics) {
    const banks = adventure.scenario.banks || {};
    const shared = window.AbyssScenarioTools.sharedBanks;
    const paragraphs = [];
    paragraphs.push(`${actionLead(adventure, mode, input, mechanics.continuity)} ${choose(adventure, banks.sensory || shared.transitions, "sensory")}`);
    if (Array.isArray(adventure.scenario.chapterScenes) && adventure.world.chapter) {
      const scene = adventure.scenario.chapterScenes[adventure.world.chapter - 1];
      if (scene) paragraphs.push(scene);
    }

    let intentBank = banks.action || shared.transitions;
    if (mechanics.intent === "investigate") intentBank = banks.investigate || intentBank;
    if (mechanics.intent === "social") intentBank = banks.social || shared.social;
    if (mechanics.intent === "continue") intentBank = banks.continue || shared.continue;
    if (mechanics.intent === "story") intentBank = shared.story;
    if (mechanics.intent === "vision") intentBank = banks.revelation || shared.transitions;
    const outcomeBank = shared[mechanics.outcome] || shared.cost;
    if (mechanics.continuity) {
      paragraphs.push("La escena conserva los hechos ya establecidos. Puedes buscar un medio plausible, recuperar un objeto perdido o convertir la contradicción en una anomalía explícita mediante el modo Historia.");
    } else {
      paragraphs.push(`${choose(adventure, intentBank, `intent-${mechanics.intent}`)} ${choose(adventure, outcomeBank, `outcome-${mechanics.outcome}`)}`);
    }

    const continuity = continuityLine(adventure);
    const hook = endHook(adventure, mechanics);
    if (mechanics.discovery) {
      paragraphs.push(`${choose(adventure, banks.revelation || shared.critical, "discovery-reveal")} ${mechanics.discovery.content}`);
    } else if (continuity) {
      paragraphs.push(continuity);
    }
    if (hook && !paragraphs[paragraphs.length - 1].includes(hook)) paragraphs.push(hook);
    const ending = endingText(adventure);
    if (ending) paragraphs.push(ending);
    return paragraphs.filter(Boolean).join("\n\n");
  }

  function formatWorldState(adventure) {
    const clues = adventure.world.clues.map((clue) => clue.title).join(", ") || "ninguna";
    const inventory = adventure.world.inventory.map((item) => item.name).join(", ") || "vacío";
    const conditions = adventure.state.conditions.join(", ") || "ninguna";
    const path = adventure.world.storyPath || {};
    return [
      `Ubicación: ${adventure.world.location}`,
      `Tiempo: ${adventure.world.time}`,
      `Capítulo ${adventure.world.chapter || 1}: ${adventure.world.chapterTitle || "El despertar"}. Descenso: ${getDescentStage(adventure.state.threshold).label}; Director: ${(adventure.world.director && adventure.world.director.phase) || "hook"}; tensión ${(adventure.world.director && adventure.world.director.tension) || 0}/100.`,
      `Objetivo: ${adventure.world.objective}`,
      `Lucidez ${adventure.state.lucidity}/100; Cuerpo ${adventure.state.body}/100; Obsesión ${adventure.state.obsession}/100; Umbral ${adventure.state.threshold}/100.`,
      `Condiciones: ${conditions}.`,
      `Inventario: ${inventory}.`,
      `Pistas confirmadas: ${clues}.`,
      continuityContext(adventure),
      `Trayectoria de desenlace — conocimiento ${path.knowledge || 0}; corrupción ${path.corruption || 0}; sacrificio ${path.sacrifice || 0}; confianza ${path.trust || 0}; personas salvadas ${path.peopleSaved || 0}; verdades ${path.truths || 0}; obsesión ${path.obsession || 0}. No mostrar estos nombres ni sus valores al jugador; úsalos para preparar consecuencias coherentes.`,
      adventure.scenario.id === "sangre-del-metropolit" ? `Trayectoria: muertes ${(adventure.world.storyPath && adventure.world.storyPath.deaths) || 0}; confianza Silvana ${(adventure.world.storyPath && adventure.world.storyPath.silvanaTrust) || 0}; confianza Trent ${(adventure.world.storyPath && adventure.world.storyPath.trentTrust) || 0}; rebelión ${(adventure.world.storyPath && adventure.world.storyPath.rebellion) || 0}; poder ${(adventure.world.storyPath && adventure.world.storyPath.power) || 0}.` : ""
    ].join("\n");
  }

  function formatTurn(turn) {
    const action = turn.input ? `${turn.playerName || "Jugador"} [${turn.mode.toUpperCase()}]: ${turn.input}\n` : "";
    return `${action}NARRADOR: ${turn.output}`;
  }

  function buildContext(adventure, currentInput) {
    const scenario = adventure.scenario;
    const budget = clamp(Number(adventure.settings.contextBudget) || 4096, 1024, 32768);
    const requiredBudget = Math.floor(budget * 0.7);
    const dynamicBudget = budget - requiredBudget;
    const historyBudget = Math.floor(dynamicBudget * 0.5);
    const cardsBudget = Math.floor(dynamicBudget * 0.25);
    const memoriesBudget = dynamicBudget - historyBudget - cardsBudget;

    const requiredRaw = [
      "[INSTRUCCIONES DEL NARRADOR]",
      scenario.aiInstructions,
      "",
      "[ESTILO DE SALIDA]",
      `Perspectiva: ${adventure.settings.perspective === "first" ? "primera persona" : adventure.settings.perspective === "third" ? "tercera persona" : "segunda persona"}. Intensidad: ${adventure.settings.intensity}. Extensión: ${adventure.settings.responseLength}.`,
      "",
      "[WORLD ENGINE — AUTORITATIVO]",
      formatWorldState(adventure),
      "",
      "[DATOS ESENCIALES]",
      (scenario.plotEssentials || []).map((line) => `- ${line}`).join("\n"),
      "",
      "[REGLAS INMUTABLES]",
      (scenario.rules || []).map((line) => `- ${line}`).join("\n"),
      "",
      "[NOTA DE AUTOR]",
      scenario.authorNote,
      "",
      "[RESUMEN GLOBAL]",
      adventure.memory.summary
    ].join("\n");
    const required = truncateTokens(requiredRaw, requiredBudget);

    const query = `${currentInput || ""} ${adventure.world.location} ${adventure.world.objective} ${adventure.turns.slice(-2).map((turn) => turn.input).join(" ")}`;
    const relevantCards = (scenario.storyCards || [])
      .map((card) => ({ ...card, score: overlapScore(query, `${card.title} ${(card.keys || []).join(" ")} ${card.content}`) + (adventure.world.discoveredCards.includes(card.id) ? 0.12 : 0) }))
      .filter((card) => card.score > 0.03 || adventure.world.discoveredCards.includes(card.id))
      .sort((a, b) => b.score - a.score);
    let cards = "";
    const includedCards = [];
    relevantCards.forEach((card) => {
      const line = `- ${card.title} [${card.type}]: ${card.content}\n`;
      if (estimateTokens(cards + line) <= cardsBudget) {
        cards += line;
        includedCards.push(card.id);
      }
    });

    const relevantMemories = (adventure.memory.bank || [])
      .map((memory) => ({ ...memory, score: overlapScore(query, `${memory.text} ${(memory.keywords || []).join(" ")}`) }))
      .filter((memory) => memory.score > 0.025)
      .sort((a, b) => b.score - a.score);
    let memories = "";
    const includedMemories = [];
    relevantMemories.forEach((memory) => {
      const line = `- Recuerdo T${memory.fromTurn}–T${memory.toTurn}: ${memory.text}\n`;
      if (estimateTokens(memories + line) <= memoriesBudget) {
        memories += line;
        includedMemories.push(memory.id);
      }
    });

    let history = "";
    const includedTurns = [];
    const turns = adventure.turns.slice().reverse();
    for (const turn of turns) {
      const block = `${formatTurn(turn)}\n\n`;
      if (estimateTokens(block) > historyBudget && !history) {
        history = truncateTokens(block, historyBudget);
        includedTurns.push(turn.id);
        break;
      }
      if (estimateTokens(history + block) > historyBudget) break;
      history = `${block}${history}`;
      includedTurns.unshift(turn.id);
    }

    const packet = [
      required,
      "",
      "[STORY CARDS RELEVANTES]",
      cards || "- Ninguna activada.",
      "",
      "[RECUERDOS RECUPERADOS]",
      memories || "- Ninguno relevante.",
      "",
      "[HISTORIAL RECIENTE]",
      history || "- Sin historial.",
      "",
      "[ACCIÓN ACTUAL]",
      currentInput || "El jugador solicita que la historia continúe."
    ].join("\n");

    const allocations = {
      required: estimateTokens(required),
      history: estimateTokens(history),
      cards: estimateTokens(cards),
      memories: estimateTokens(memories)
    };
    return {
      packet: truncateTokens(packet, budget),
      used: Math.min(budget, estimateTokens(packet)),
      budget,
      allocations,
      includedCards,
      includedMemories,
      includedTurns
    };
  }

  function remoteLength(setting) {
    if (setting === "short") return 240;
    if (setting === "long") return 760;
    return 430;
  }

  async function requestRemote(config, messages, options) {
    const endpoint = normalizeText(config.endpoint);
    if (!/^https?:\/\//i.test(endpoint)) throw new Error("El endpoint debe comenzar por http:// o https://.");
    if (!normalizeText(config.model)) throw new Error("Indica el nombre del modelo.");
    const controller = new AbortController();
    const timer = setTimeout(() => controller.abort(), options && options.timeout || 45000);
    const headers = { "Content-Type": "application/json" };
    if (config.apiKey) headers.Authorization = `Bearer ${config.apiKey}`;
    try {
      const response = await fetch(endpoint, {
        method: "POST",
        headers,
        signal: controller.signal,
        body: JSON.stringify({
          model: config.model,
          messages,
          temperature: Number(config.temperature) || 0.8,
          max_tokens: options && options.maxTokens || 430,
          stream: false
        })
      });
      if (!response.ok) {
        const body = await response.text();
        throw new Error(`La API respondió ${response.status}: ${shortText(body, 180) || response.statusText}`);
      }
      const data = await response.json();
      const content = data && data.choices && data.choices[0] && data.choices[0].message && data.choices[0].message.content
        || data && data.message && data.message.content
        || data && data.response;
      if (!normalizeText(content)) throw new Error("La API no devolvió texto narrativo.");
      return safeText(content, 14000).trim();
    } catch (error) {
      if (error && error.name === "AbortError") throw new Error("La conexión agotó el tiempo de espera.");
      throw error;
    } finally {
      clearTimeout(timer);
    }
  }

  async function generateRemote(adventure, mode, input, mechanics, context, config) {
    const exactEffects = effectChips(mechanics.effects).map((effect) => effect.label).join(", ") || "sin cambios numéricos";
    const mechanical = [
      `Modo: ${mode}. Intención: ${mechanics.intent}. Resultado: ${mechanics.outcomeLabel}.`,
      `Consecuencias obligatorias: ${exactEffects}.`,
      mechanics.discovery ? `Hallazgo obligatorio: ${mechanics.discovery.title}. ${mechanics.discovery.content}` : "No introduzcas una revelación principal nueva en este turno.",
      mechanics.continuity ? `Restricción de continuidad obligatoria: ${mechanics.continuity.message}` : "Respeta estrictamente inventario, personajes muertos, localización y hechos establecidos. No inventes recursos para hacer posible la acción del jugador.",
      "Redacta solo la continuación narrativa en español, entre 2 y 5 párrafos. No muestres números, sistema, tiradas ni estas instrucciones. No ofrezcas una lista de opciones. Si la acción contradice la continuidad, narra el intento y su límite sin aceptar silenciosamente la contradicción."
    ].join("\n");
    return requestRemote(config, [
      { role: "system", content: context.packet },
      { role: "user", content: `[RESOLUCIÓN DEL WORLD ENGINE]\n${mechanical}\n\n[ENTRADA]\n${input || "Continúa la escena."}` }
    ], { maxTokens: remoteLength(adventure.settings.responseLength), timeout: 55000 });
  }

  async function testConnection(config) {
    const result = await requestRemote(config, [
      { role: "system", content: "Prueba técnica. Responde únicamente con la palabra ABYSS." },
      { role: "user", content: "Comprueba la conexión." }
    ], { maxTokens: 8, timeout: 18000 });
    return result;
  }

  function countPlayableTurns(adventure) {
    return adventure.turns.filter((turn) => turn.mode !== "opening" && turn.mode !== "system").length;
  }

  function buildReport(adventure) {
    const stage = getDescentStage(adventure.state.threshold);
    const endings = {
      liberation: "Liberación",
      projectionist: "El nuevo Proyeccionista",
      loop: "El ciclo continúa"
    };
    const tools = endingTools();
    const endingData = adventure.meta.endingData || (tools && tools.endingData(adventure.scenario, adventure.meta.ending));
    let ending = endingData ? endingData.title : endings[adventure.meta.ending] || "Informe provisional";
    if (adventure.meta.ended && !adventure.meta.ending) ending = adventure.state.body <= 0 ? "El cuerpo no pudo continuar" : "El Umbral se abrió";
    const path = adventure.world.storyPath || {};
    return {
      ending,
      endingData: endingData ? clone(endingData) : null,
      path: {
        knowledge: Number(path.knowledge || 0),
        corruption: Number(path.corruption || 0),
        sacrifice: Number(path.sacrifice || 0),
        trust: Number(path.trust || 0),
        peopleSaved: Number(path.peopleSaved || 0),
        truths: Number(path.truths || 0),
        obsession: Number(path.obsession || adventure.state.obsession || 0)
      },
      isFinal: Boolean(adventure.meta.ended),
      stage,
      actions: countPlayableTurns(adventure),
      clues: adventure.world.clues.length,
      memories: (adventure.memory.bank || []).length,
      visions: adventure.turns.filter((turn) => turn.mode === "see").length,
      chapter: adventure.world.chapter || 1,
      chapterTitle: adventure.world.chapterTitle || "El despertar",
      threshold: adventure.state.threshold || 0,
      tension: adventure.world.director && adventure.world.director.tension || 0,
      conditions: [...(adventure.state.conditions || [])],
      location: adventure.world.location,
      objective: adventure.world.objective
    };
  }

  function memoryDigest(turns) {
    const actions = turns.filter((turn) => turn.input).map((turn) => `${turn.playerName}: ${shortText(turn.input, 90)}`);
    const outcomes = turns.map((turn) => shortText(turn.output.split(/(?<=[.!?])\s/)[0], 130)).filter(Boolean);
    return `${actions.length ? `Acciones: ${actions.join("; ")}. ` : ""}Consecuencias: ${outcomes.join(" ")}`.slice(0, 850);
  }

  function extractKeywords(text, max) {
    const stop = new Set(["para", "como", "pero", "esta", "este", "desde", "hacia", "sobre", "entre", "donde", "cuando", "porque", "algo", "todo", "toda", "cada", "solo", "sino", "tras", "antes", "despues", "narrador", "acciones", "consecuencias"]);
    const counts = new Map();
    words(text).forEach((word) => {
      if (!stop.has(word)) counts.set(word, (counts.get(word) || 0) + 1);
    });
    return [...counts.entries()].sort((a, b) => b[1] - a[1]).slice(0, max).map(([word]) => word);
  }

  function updateMemory(adventure) {
    const playable = adventure.turns.filter((turn) => turn.mode !== "opening" && turn.mode !== "system");
    const count = playable.length;
    if (count >= 6 && count - adventure.memory.lastBankTurn >= 6) {
      const selected = playable.slice(-6);
      const text = memoryDigest(selected);
      adventure.memory.bank.push({
        id: uid("memory"),
        fromTurn: count - 5,
        toTurn: count,
        text,
        keywords: extractKeywords(text, 12),
        createdAt: new Date().toISOString()
      });
      adventure.memory.bank = adventure.memory.bank.slice(-80);
      adventure.memory.lastBankTurn = count;
    }
    if (count >= 15 && count - adventure.memory.lastSummaryTurn >= 15) {
      const recentMemories = adventure.memory.bank.slice(-4).map((memory) => memory.text);
      const discoveries = adventure.world.clues.slice(-6).map((clue) => clue.title);
      adventure.memory.summary = [
        adventure.scenario.premise,
        recentMemories.length ? `Hasta ahora: ${recentMemories.join(" ")}` : "",
        discoveries.length ? `Hallazgos confirmados: ${discoveries.join(", ")}.` : "",
        `Situación actual: ${adventure.world.location}. Objetivo: ${adventure.world.objective}`
      ].filter(Boolean).join("\n").slice(0, 3000);
      adventure.memory.lastSummaryTurn = count;
    }
  }

  function makeVisionSpec(adventure, turnIndex) {
    const chapterScene = adventure.scenario.chapterScenes && adventure.scenario.chapterScenes[adventure.world.chapter - 1];
    return {
      seed: (adventure.meta.seedHash + turnIndex * 374761393) >>> 0,
      accent: adventure.scenario.accent || "#b9db6d",
      threshold: adventure.state.threshold,
      location: adventure.world.location,
      entity: adventure.scenario.entity,
      sigil: adventure.scenario.sigil || "Ø",
      chapter: adventure.world.chapter || 1,
      chapterTitle: adventure.world.chapterTitle || "El despertar",
      chapterScene: chapterScene || "La escena conserva una forma que no debería existir."
    };
  }

  function drawVision(canvas, spec) {
    if (!canvas || !canvas.getContext) return;
    const width = 960;
    const height = 540;
    const dpr = Math.min(globalThis.devicePixelRatio || 1, 2);
    canvas.width = width * dpr;
    canvas.height = height * dpr;
    const ctx = canvas.getContext("2d");
    ctx.scale(dpr, dpr);
    const random = mulberry32(spec.seed >>> 0);
    const gradient = ctx.createRadialGradient(width * 0.5, height * 0.43, 10, width * 0.5, height * 0.48, width * 0.72);
    gradient.addColorStop(0, hexToRgba(spec.accent, 0.18 + spec.threshold / 900));
    gradient.addColorStop(0.45, "#091813");
    gradient.addColorStop(1, "#020504");
    ctx.fillStyle = gradient;
    ctx.fillRect(0, 0, width, height);

    for (let i = 0; i < 190; i += 1) {
      const x = random() * width;
      const y = random() * height;
      const radius = random() * 1.4 + 0.2;
      ctx.globalAlpha = random() * 0.38 + 0.08;
      ctx.fillStyle = i % 8 === 0 ? spec.accent : "#c5d4cc";
      ctx.beginPath();
      ctx.arc(x, y, radius, 0, Math.PI * 2);
      ctx.fill();
    }

    ctx.globalAlpha = 0.2;
    ctx.strokeStyle = spec.accent;
    ctx.lineWidth = 1;
    const cx = width * (0.46 + random() * 0.08);
    const cy = height * (0.42 + random() * 0.1);
    const ringCount = 4 + Math.floor(spec.threshold / 20);
    for (let i = 0; i < ringCount; i += 1) {
      ctx.beginPath();
      const radiusX = 55 + i * 34 + random() * 12;
      const radiusY = radiusX * (0.55 + random() * 0.22);
      ctx.ellipse(cx, cy, radiusX, radiusY, random() * 0.9, 0, Math.PI * 2);
      ctx.stroke();
    }

    ctx.globalAlpha = 0.18 + spec.threshold / 600;
    ctx.lineWidth = 2;
    const tendrils = 5 + Math.floor(spec.threshold / 18);
    for (let i = 0; i < tendrils; i += 1) {
      const startX = random() * width;
      ctx.beginPath();
      ctx.moveTo(startX, height + 8);
      ctx.bezierCurveTo(startX + (random() - 0.5) * 240, height * 0.72, cx + (random() - 0.5) * 260, cy + 60, cx + (random() - 0.5) * 90, cy);
      ctx.stroke();
    }

    ctx.globalAlpha = 0.8;
    ctx.fillStyle = "#020504";
    ctx.beginPath();
    ctx.ellipse(cx, cy, 38 + spec.threshold * 0.18, 16 + spec.threshold * 0.08, random() * 0.25, 0, Math.PI * 2);
    ctx.fill();
    ctx.strokeStyle = spec.accent;
    ctx.globalAlpha = 0.58;
    ctx.stroke();
    ctx.fillStyle = spec.accent;
    ctx.globalAlpha = 0.9;
    ctx.beginPath();
    ctx.arc(cx, cy, 4 + spec.threshold / 22, 0, Math.PI * 2);
    ctx.fill();

    ctx.globalAlpha = 0.72;
    ctx.fillStyle = "#dce8e1";
    ctx.font = "11px ui-monospace, monospace";
    ctx.letterSpacing = "2px";
    ctx.fillText(String(spec.location || "UBICACIÓN DESCONOCIDA").toUpperCase().slice(0, 58), 38, height - 54);
    ctx.fillStyle = spec.accent;
    ctx.font = "9px ui-monospace, monospace";
    ctx.fillText(`VISIÓN ${String(spec.seed).padStart(10, "0")} · UMBRAL ${spec.threshold}%`, 38, height - 35);
    ctx.font = "34px Georgia, serif";
    ctx.fillText(spec.sigil || "Ø", width - 68, 54);

    ctx.globalAlpha = 0.04;
    ctx.fillStyle = "#ffffff";
    for (let y = 0; y < height; y += 3) ctx.fillRect(0, y, width, 1);
    ctx.globalAlpha = 1;
  }

  function hexToRgba(hex, alpha) {
    const normalized = String(hex || "#b9db6d").replace("#", "");
    const safe = normalized.length === 3 ? normalized.split("").map((c) => c + c).join("") : normalized.padEnd(6, "0").slice(0, 6);
    const value = parseInt(safe, 16);
    const r = value >> 16 & 255;
    const g = value >> 8 & 255;
    const b = value & 255;
    return `rgba(${r}, ${g}, ${b}, ${alpha})`;
  }

  async function takeTurn(adventure, mode, rawInput, runtimeConfig) {
    if (!adventure || adventure.schemaVersion !== SCHEMA_VERSION) throw new Error("Aventura no compatible.");
    if (adventure.meta.ended) throw new Error("La aventura ha terminado. Deshaz el último turno para continuar.");
    if (!["do", "say", "story", "continue", "see", "attack", "defend"].includes(mode)) throw new Error("Modo de turno no válido.");
    const input = safeText(rawInput, 1200).trim();
    if (!["continue", "see", "attack", "defend"].includes(mode) && !input) throw new Error("Escribe una acción antes de continuar.");
    const player = adventure.players[adventure.activePlayerIndex] || adventure.players[0];
    const previous = immersionSnapshot(adventure);
    const context = buildContext(adventure, input);
    const mechanics = resolveMechanics(adventure, mode, input);
    const continuityConstraint = detectContinuityConstraint(adventure, mode, input);
    forceContinuityFailure(mechanics, continuityConstraint);
    if (!adventure.world.combat && !mechanics.continuity && (mechanics.forbidden || (mechanics.intent === "physical" && mechanics.outcome === "failure"))) {
      adventure.world.combat = { enemy: { name: "Presencia del Umbral", health: 36, maxHealth: 36, attack: 8, defense: 8 }, round: 1 };
    }
    applyMechanics(adventure, mechanics);
    recordContinuityFacts(adventure, mode, input, mechanics);
    if (adventure.scenario.id === "sangre-del-metropolit") {
      const path = adventure.world.storyPath || (adventure.world.storyPath = { deaths: 0, cameraClues: 0, silvanaTrust: 0, trentTrust: 0, josephTrust: 0, rebellion: 0, power: 0 });
      if (mechanics.outcome === "failure" || mechanics.forbidden) path.deaths = (path.deaths || 0) + 1;
      if (containsAny(input, ["cámara", "graba", "televisión", "fotograma", "bobina", "película"])) path.cameraClues = (path.cameraClues || 0) + 1;
      if (containsAny(input, ["silvana", "ayudarla", "confiar en silvana", "protegerla"])) path.silvanaTrust = (path.silvanaTrust || 0) + 1;
      if (containsAny(input, ["trent", "ayudar a trent", "confiar en trent"])) path.trentTrust = (path.trentTrust || 0) + 1;
      if (containsAny(input, ["joseph", "padre", "perdonarlo", "perdonar a mi padre"])) path.josephTrust = (path.josephTrust || 0) + 1;
      if (containsAny(input, ["romper", "destruir", "liberar", "negarme", "renunciar"])) path.rebellion = (path.rebellion || 0) + 1;
      if (containsAny(input, ["poder", "controlar", "dominar", "aceptar el papel", "proyeccionista"])) path.power = (path.power || 0) + 1;
    }
    if (window.AbyssEndingTools && typeof window.AbyssEndingTools.updatePath === "function") {
      adventure.world.storyPath = window.AbyssEndingTools.ensurePath(adventure.world.storyPath, adventure.scenario);
      window.AbyssEndingTools.updatePath(adventure.world.storyPath, adventure, mode, input, mechanics);
    }
    resolveLiteraryEnding(adventure, input);
    resolveStoryEnding(adventure, input);
    let output;
    let engine = "offline";
    let warning = "";
    if (runtimeConfig && runtimeConfig.engine === "remote") {
      try {
        output = await generateRemote(adventure, mode, input, mechanics, context, runtimeConfig);
        engine = "remote";
      } catch (error) {
        output = generateOffline(adventure, mode, input, mechanics);
        adventure.meta.fallbackCount = (adventure.meta.fallbackCount || 0) + 1;
        warning = `${error.message} Se utilizó Director 404 para no perder el turno.`;
      }
    } else {
      output = generateOffline(adventure, mode, input, mechanics);
    }
    if (engine === "remote") {
      const ending = endingText(adventure);
      if (ending) output = `${output}\n\n${ending}`;
    }
    const index = adventure.turns.length;
    const turn = {
      id: uid("turn"),
      index,
      mode,
      playerId: player.id,
      playerName: player.name,
      input,
      output: safeText(output, 14000).trim(),
      effects: effectChips(mechanics.effects),
      roll: mechanics.roll,
      outcome: mechanics.outcome,
      discovery: mechanics.discovery ? { id: mechanics.discovery.id, title: mechanics.discovery.title } : null,
      vision: mode === "see" ? makeVisionSpec(adventure, index) : null,
      immersionEvent: null,
      engine,
      createdAt: new Date().toISOString()
    };
    adventure.turns.push(turn);
    if (adventure.state.body <= 0 || adventure.state.threshold >= 100) adventure.meta.ended = true;
    if (adventure.players.length > 1) adventure.activePlayerIndex = (adventure.activePlayerIndex + 1) % adventure.players.length;
    updateMemory(adventure);
    const stats = adventure.meta.stats || (adventure.meta.stats = {});
    stats.actions = countPlayableTurns(adventure);
    stats.discoveries = adventure.world.clues.length;
    stats.memories = adventure.memory.bank.length;
    stats.visions = adventure.turns.filter((item) => item.mode === "see").length;
    stats.chaptersReached = Math.max(stats.chaptersReached || 1, adventure.world.chapter || 1);
    stats.alteredMemories = stats.memories;
    stats.finalStage = getDescentStage(adventure.state.threshold).index;
    turn.immersionEvent = buildImmersionEvent(adventure, previous, mechanics, mode);
    if (adventure.meta.ended) stats.endedAt = new Date().toISOString();
    adventure.updatedAt = new Date().toISOString();
    adventure.meta.engine = engine;
    return { turn, context, mechanics, warning };
  }

  function editTurn(adventure, turnId, newText) {
    const turn = adventure.turns.find((item) => item.id === turnId);
    if (!turn) throw new Error("No se encuentra el turno que quieres editar.");
    const clean = safeText(newText, 8000).trim();
    if (!clean) throw new Error("La respuesta no puede quedar vacía.");
    turn.output = clean;
    turn.editedAt = new Date().toISOString();
    adventure.updatedAt = turn.editedAt;
    return turn;
  }

  function serializeAdventure(adventure) {
    const output = clone(adventure);
    delete output.undoStack;
    delete output.redoStack;
    return output;
  }

  function validateAdventure(input) {
    const errors = [];
    if (!input || typeof input !== "object" || Array.isArray(input)) return ["El archivo no contiene una aventura."];
    if (input.schemaVersion !== SCHEMA_VERSION) errors.push("Versión de aventura no compatible.");
    if (typeof input.id !== "string" || !input.id || input.id.length > 180) errors.push("Falta el identificador de aventura.");
    if (!input.scenario || typeof input.scenario !== "object") errors.push("Falta la copia del escenario.");
    else if (window.AbyssScenarioTools && window.AbyssScenarioTools.validateScenario(input.scenario).length) errors.push("La copia del escenario no es válida.");
    if (!Array.isArray(input.turns) || !input.turns.length) errors.push("La aventura no contiene turnos.");
    if (input.turns && input.turns.length > 5000) errors.push("La aventura supera el límite de 5.000 turnos.");
    else if (input.turns && input.turns.some((turn) => !turn || typeof turn.id !== "string" || typeof turn.output !== "string" || turn.output.length > 14000 || typeof turn.input !== "string" || turn.input.length > 1200)) errors.push("Hay turnos dañados o fuera de límites.");
    if (!Array.isArray(input.players) || !input.players.length) errors.push("Falta el personaje jugador.");
    else if (input.players.length > 4 || input.players.some((player) => !player || typeof player.id !== "string" || typeof player.name !== "string" || player.name.length > 40 || !archetypes[player.archetype])) errors.push("La lista de jugadores no es válida.");
    if (!input.state || !input.world || !input.memory) errors.push("Falta el estado estructurado.");
    else {
      if (["lucidity", "body", "obsession", "threshold"].some((key) => !Number.isFinite(input.state[key]) || input.state[key] < 0 || input.state[key] > 100)) errors.push("Los medidores del World Engine no son válidos.");
      if (!Array.isArray(input.world.inventory) || input.world.inventory.length > 100 || !Array.isArray(input.world.clues) || input.world.clues.length > 500) errors.push("El inventario o las pistas no son válidos.");
      if (!Array.isArray(input.memory.bank) || input.memory.bank.length > 100 || typeof input.memory.summary !== "string" || input.memory.summary.length > 10000) errors.push("El banco de memoria no es válido.");
    }
    return [...new Set(errors)];
  }

  function toMarkdown(adventure) {
    const report = buildReport(adventure);
    const lines = [
      `# ${adventure.title}`,
      "",
      `> Aventura de **${adventure.players.map((player) => player.name).join(", ")}** creada con Caminos Malditos Sangrientos.`,
      "",
      `- Escenario: ${adventure.scenario.setting}`,
      `- Estado final: Lucidez ${adventure.state.lucidity} · Cuerpo ${adventure.state.body} · Obsesión ${adventure.state.obsession} · Umbral ${adventure.state.threshold}%`,
      `- Ubicación final: ${adventure.world.location}`,
      `- Capítulo final: ${adventure.world.chapter || 1} · ${adventure.world.chapterTitle || "El despertar"}`,
      `- Descenso: ${report.stage.numeral} · ${report.stage.label} · ${report.threshold}%`,
      `- Informe: ${report.ending} · ${report.actions} decisiones · ${report.clues} pistas · ${report.memories} recuerdos · ${report.visions} visiones`,
      report.path ? `- Trayectoria narrativa: conocimiento ${report.path.knowledge} · corrupción ${report.path.corruption} · sacrificio ${report.path.sacrifice} · confianza ${report.path.trust} · personas salvadas ${report.path.peopleSaved} · verdades ${report.path.truths}` : "",
      adventure.scenario.id === "sangre-del-metropolit" && adventure.world.storyPath ? `- Trayectoria: muertes ${adventure.world.storyPath.deaths || 0} · pistas ${adventure.world.storyPath.cameraClues || 0} · rebelión ${adventure.world.storyPath.rebellion || 0} · poder ${adventure.world.storyPath.power || 0}` : "",
      "",
      "---",
      ""
    ];
    adventure.turns.forEach((turn) => {
      if (turn.input) {
        lines.push(`### ${turn.playerName} · ${turn.mode.toUpperCase()}`, "", `> ${turn.input.replace(/\n/g, "\n> ")}`, "");
      }
      lines.push(turn.output, "");
    });
    if (adventure.world.clues.length) {
      lines.push("---", "", "## Hallazgos", "");
      adventure.world.clues.forEach((clue) => lines.push(`- **${clue.title}:** ${clue.description}`));
      lines.push("");
    }
    if (report.endingData) {
      const epilogue = report.endingData.epilogue || {};
      lines.push("---", "", "## Decisión, consecuencia y epílogo", "", `### ${report.endingData.title}`, "", report.endingData.climax, "", `**Consecuencia.** ${report.endingData.consequence}`, "", `**Epílogo · ${epilogue.when || "Después"} · ${epilogue.title || "Registro final"}.** ${epilogue.text || ""}`, "", epilogue.finalLine ? `> ${epilogue.finalLine}` : "", "");
    }
    lines.push("---", "", "*Generado localmente con ABYSS 404 · I. Roig*", "");
    return lines.join("\n");
  }

  function encodeUtf8Base64(value) {
    const bytes = new TextEncoder().encode(value);
    let binary = "";
    const chunk = 0x8000;
    for (let i = 0; i < bytes.length; i += chunk) binary += String.fromCharCode(...bytes.subarray(i, i + chunk));
    return btoa(binary);
  }

  function decodeUtf8Base64(value) {
    const binary = atob(value);
    const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
    return new TextDecoder().decode(bytes);
  }

  function encodeRitualCode(adventure) {
    const serialized = JSON.stringify(serializeAdventure(adventure));
    if (serialized.length > 180000) throw new Error("La aventura ya es demasiado larga para un código. Expórtala como archivo .abyss404.");
    return `ABYSS404.1.${encodeUtf8Base64(serialized)}`;
  }

  function decodeRitualCode(code) {
    const clean = String(code || "").trim();
    if (!clean.startsWith("ABYSS404.1.")) throw new Error("El código de ritual no tiene un formato compatible.");
    const payload = clean.slice("ABYSS404.1.".length);
    if (payload.length > 300000) throw new Error("El código supera el tamaño permitido.");
    const adventure = JSON.parse(decodeUtf8Base64(payload));
    const errors = validateAdventure(adventure);
    if (errors.length) throw new Error(errors.join(" "));
    adventure.id = uid("adventure");
    adventure.title = `${adventure.title} · copia`;
    adventure.updatedAt = new Date().toISOString();
    return adventure;
  }

  window.AbyssEngine = Object.freeze({
    VERSION,
    SCHEMA_VERSION,
    archetypes,
    clone,
    clamp,
    hashSeed,
    estimateTokens,
    overlapScore,
    createAdventure,
    takeTurn,
    buildContext,
    editTurn,
    testConnection,
    drawVision,
    serializeAdventure,
    validateAdventure,
    toMarkdown,
    getDescentStage,
    buildReport,
    encodeRitualCode,
    decodeRitualCode,
    countPlayableTurns
  });
})();
