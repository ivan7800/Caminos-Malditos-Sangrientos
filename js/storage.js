(function () {
  "use strict";

  const DB_NAME = "abyss404";
  const DB_VERSION = 1;
  const SETTINGS_KEY = "abyss404:settings";
  const FALLBACK_ADVENTURES = "abyss404:adventures";
  const FALLBACK_SCENARIOS = "abyss404:scenarios";
  const SESSION_KEY = "abyss404:session-api-key";
  let dbPromise = null;
  let forceFallback = false;

  const defaults = Object.freeze({
    engine: "offline",
    endpoint: "http://localhost:11434/v1/chat/completions",
    model: "llama3.2",
    temperature: 0.8,
    responseLength: "medium",
    contextBudget: 4096,
    showRolls: true,
    reducedMotion: false,
    fontScale: "1",
    skin: "cosmic",
    audioProfile: "abismo",
    audioVolume: "0.14",
    favorites: []
  });

  function openDb() {
    if (forceFallback || !("indexedDB" in window)) return Promise.reject(new Error("IndexedDB no disponible"));
    if (dbPromise) return dbPromise;
    dbPromise = new Promise((resolve, reject) => {
      const request = indexedDB.open(DB_NAME, DB_VERSION);
      request.onupgradeneeded = () => {
        const db = request.result;
        if (!db.objectStoreNames.contains("adventures")) {
          const adventures = db.createObjectStore("adventures", { keyPath: "id" });
          adventures.createIndex("updatedAt", "updatedAt");
        }
        if (!db.objectStoreNames.contains("scenarios")) {
          const scenarios = db.createObjectStore("scenarios", { keyPath: "id" });
          scenarios.createIndex("createdAt", "createdAt");
        }
      };
      request.onsuccess = () => resolve(request.result);
      request.onerror = () => reject(request.error || new Error("No se pudo abrir la base local"));
      request.onblocked = () => reject(new Error("La base local está bloqueada por otra pestaña"));
    }).catch((error) => {
      forceFallback = true;
      dbPromise = null;
      throw error;
    });
    return dbPromise;
  }

  async function storeAction(storeName, mode, action) {
    const db = await openDb();
    return new Promise((resolve, reject) => {
      const transaction = db.transaction(storeName, mode);
      const store = transaction.objectStore(storeName);
      let result;
      try {
        result = action(store);
      } catch (error) {
        reject(error);
        return;
      }
      transaction.oncomplete = () => resolve(result && result.result);
      transaction.onerror = () => reject(transaction.error || new Error("Error de almacenamiento local"));
      transaction.onabort = () => reject(transaction.error || new Error("Operación local cancelada"));
    });
  }

  function readFallback(key) {
    try {
      const value = JSON.parse(localStorage.getItem(key) || "[]");
      return Array.isArray(value) ? value : [];
    } catch (_) {
      return [];
    }
  }

  function writeFallback(key, list) {
    localStorage.setItem(key, JSON.stringify(list));
  }

  async function saveRecord(storeName, fallbackKey, record) {
    try {
      await storeAction(storeName, "readwrite", (store) => store.put(record));
    } catch (_) {
      const records = readFallback(fallbackKey);
      const index = records.findIndex((item) => item.id === record.id);
      if (index >= 0) records[index] = record;
      else records.push(record);
      writeFallback(fallbackKey, records);
    }
    return record;
  }

  async function listRecords(storeName, fallbackKey) {
    try {
      const db = await openDb();
      return await new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, "readonly");
        const request = transaction.objectStore(storeName).getAll();
        request.onsuccess = () => resolve(request.result || []);
        request.onerror = () => reject(request.error);
      });
    } catch (_) {
      return readFallback(fallbackKey);
    }
  }

  async function getRecord(storeName, fallbackKey, id) {
    try {
      const db = await openDb();
      return await new Promise((resolve, reject) => {
        const transaction = db.transaction(storeName, "readonly");
        const request = transaction.objectStore(storeName).get(id);
        request.onsuccess = () => resolve(request.result || null);
        request.onerror = () => reject(request.error);
      });
    } catch (_) {
      return readFallback(fallbackKey).find((item) => item.id === id) || null;
    }
  }

  async function deleteRecord(storeName, fallbackKey, id) {
    try {
      await storeAction(storeName, "readwrite", (store) => store.delete(id));
    } catch (_) {
      writeFallback(fallbackKey, readFallback(fallbackKey).filter((item) => item.id !== id));
    }
  }

  function saveAdventure(adventure) {
    return saveRecord("adventures", FALLBACK_ADVENTURES, adventure);
  }

  async function listAdventures() {
    const records = await listRecords("adventures", FALLBACK_ADVENTURES);
    return records.sort((a, b) => String(b.updatedAt || "").localeCompare(String(a.updatedAt || "")));
  }

  function getAdventure(id) {
    return getRecord("adventures", FALLBACK_ADVENTURES, id);
  }

  function deleteAdventure(id) {
    return deleteRecord("adventures", FALLBACK_ADVENTURES, id);
  }

  function saveScenario(scenario) {
    return saveRecord("scenarios", FALLBACK_SCENARIOS, scenario);
  }

  async function listScenarios() {
    const records = await listRecords("scenarios", FALLBACK_SCENARIOS);
    return records.sort((a, b) => String(b.createdAt || "").localeCompare(String(a.createdAt || "")));
  }

  function deleteScenario(id) {
    return deleteRecord("scenarios", FALLBACK_SCENARIOS, id);
  }

  function getSettings() {
    let stored = {};
    try {
      stored = JSON.parse(localStorage.getItem(SETTINGS_KEY) || "{}");
    } catch (_) {
      stored = {};
    }
    let apiKey = "";
    try {
      apiKey = sessionStorage.getItem(SESSION_KEY) || "";
    } catch (_) {
      apiKey = "";
    }
    return { ...defaults, ...stored, apiKey };
  }

  function saveSettings(settings) {
    const safe = {
      engine: settings.engine === "remote" ? "remote" : "offline",
      endpoint: String(settings.endpoint || defaults.endpoint).slice(0, 500),
      model: String(settings.model || defaults.model).slice(0, 120),
      temperature: Math.min(1.4, Math.max(0.2, Number(settings.temperature) || defaults.temperature)),
      responseLength: ["short", "medium", "long"].includes(settings.responseLength) ? settings.responseLength : defaults.responseLength,
      contextBudget: [2048, 4096, 8192, 16384].includes(Number(settings.contextBudget)) ? Number(settings.contextBudget) : defaults.contextBudget,
      showRolls: Boolean(settings.showRolls),
      reducedMotion: Boolean(settings.reducedMotion),
      fontScale: ["0.95", "1", "1.12", "1.25"].includes(String(settings.fontScale)) ? String(settings.fontScale) : defaults.fontScale,
      skin: ["cosmic", "obsidian", "void", "glass", "terminal", "arctic", "synthwave"].includes(String(settings.skin)) ? String(settings.skin) : defaults.skin,
      audioProfile: ["abismo", "mar", "radio", "nave"].includes(String(settings.audioProfile)) ? String(settings.audioProfile) : defaults.audioProfile,
      audioVolume: ["0.06", "0.10", "0.14", "0.20"].includes(String(settings.audioVolume)) ? String(settings.audioVolume) : defaults.audioVolume,
      favorites: Array.isArray(settings.favorites) ? settings.favorites.filter((id) => typeof id === "string").slice(0, 100) : defaults.favorites
    };
    localStorage.setItem(SETTINGS_KEY, JSON.stringify(safe));
    try {
      if (settings.apiKey) sessionStorage.setItem(SESSION_KEY, String(settings.apiKey));
      else sessionStorage.removeItem(SESSION_KEY);
    } catch (_) {
      // Session-only key remains in the form for the current page if storage is unavailable.
    }
    return { ...safe, apiKey: String(settings.apiKey || "") };
  }

  function download(filename, content, type) {
    const blob = content instanceof Blob ? content : new Blob([content], { type: type || "application/octet-stream" });
    const url = URL.createObjectURL(blob);
    const link = document.createElement("a");
    link.href = url;
    link.download = filename;
    link.rel = "noopener";
    document.body.appendChild(link);
    link.click();
    link.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1000);
  }

  function slugify(value) {
    return String(value || "abyss-404")
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .toLowerCase()
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/^-|-$/g, "")
      .slice(0, 70) || "abyss-404";
  }

  async function readJsonFile(file, maxBytes) {
    if (!file) throw new Error("No se seleccionó ningún archivo.");
    if (file.size > (maxBytes || 8 * 1024 * 1024)) throw new Error("El archivo supera el tamaño permitido.");
    const text = await file.text();
    try {
      return JSON.parse(text);
    } catch (_) {
      throw new Error("El archivo no contiene JSON válido.");
    }
  }

  window.AbyssStorage = Object.freeze({
    defaults,
    saveAdventure,
    listAdventures,
    getAdventure,
    deleteAdventure,
    saveScenario,
    listScenarios,
    deleteScenario,
    getSettings,
    saveSettings,
    download,
    slugify,
    readJsonFile
  });
})();
