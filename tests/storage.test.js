"use strict";
const assert = require("node:assert/strict");
const fs = require("node:fs");
const vm = require("node:vm");

function harness() {
  const data = { adventures: new Map(), scenarios: new Map() };
  const local = new Map();
  const state = { failOpen: false, failWrite: false, failLocal: false };
  const db = {
    objectStoreNames: { contains: (key) => key in data },
    createObjectStore: (key) => ({ createIndex() { data[key] = new Map(); } }),
    transaction(key, mode) {
      const transaction = { error: Error("Transaction failed") };
      const store = {
        put(record) {
          const request = { result: record.id };
          queueMicrotask(() => {
            if (state.failWrite) transaction.onerror?.();
            else { data[key].set(record.id, structuredClone(record)); transaction.oncomplete?.(); }
          });
          return request;
        },
        delete(id) {
          queueMicrotask(() => { data[key].delete(id); transaction.oncomplete?.(); });
        },
        getAll() {
          const request = {};
          queueMicrotask(() => { request.result = [...data[key].values()].map((item) => structuredClone(item)); request.onsuccess?.(); });
          return request;
        }
      };
      transaction.objectStore = () => store;
      return transaction;
    }
  };
  const indexedDB = { open() {
    const request = { result: db, error: Error("Open failed") };
    queueMicrotask(() => state.failOpen ? request.onerror?.() : request.onsuccess?.());
    return request;
  } };
  const localStorage = {
    getItem: (key) => local.get(key) ?? null,
    setItem(key, value) { if (state.failLocal) throw Error("QuotaExceededError"); local.set(key, value); }
  };
  const window = { indexedDB, navigator: {} };
  const context = { window, indexedDB, localStorage, sessionStorage: { getItem: () => null }, navigator: window.navigator, Date, console, setTimeout };
  vm.runInNewContext(fs.readFileSync("js/storage.js", "utf8"), context);
  return { storage: window.AbyssStorage, data, local, state };
}

async function run() {
  const { storage, data, local, state } = harness();
  const old = { id: "legacy", updatedAt: "2026-01-01", title: "Original" };
  data.adventures.set(old.id, old); // old versions wrote only to IndexedDB
  assert.equal((await storage.listAdventures()).length, 1);
  state.failWrite = true;
  const newer = { ...old, updatedAt: "2026-02-01", title: "Fallback" };
  await storage.saveAdventure(newer);
  assert.equal((await storage.getAdventure(old.id)).title, "Fallback");
  state.failOpen = true;
  // Simulate another page load while IndexedDB cannot open.
  const h2 = harness(); h2.local.set("abyss404:adventures", local.get("abyss404:adventures")); h2.state.failOpen = true;
  assert.equal((await h2.storage.listAdventures())[0].title, "Fallback");
  state.failOpen = false; state.failWrite = false;
  assert.equal((await storage.listAdventures())[0].title, "Fallback");
  await assert.rejects(storage.saveAdventure(old), /más reciente/);
  await storage.deleteAdventure(old.id);
  assert.equal((await storage.listAdventures()).length, 0);
  assert.equal(data.adventures.has(old.id), false);
  const copy = { id: "fallback-only", updatedAt: "2026-03-01" };
  state.failWrite = true;
  await storage.saveAdventure(copy);
  state.failWrite = false;
  assert.equal((await storage.listAdventures()).length, 1);
  state.failWrite = true; state.failLocal = true;
  await assert.rejects(storage.saveAdventure({ id: "no-space", updatedAt: "2026-04-01" }), /No se pudo guardar/);
  state.failLocal = false; state.failWrite = false;
  local.set("abyss404:adventures", "broken-json");
  await assert.rejects(storage.listAdventures(), /JSON|Copia local/);
  console.log("✓ IndexedDB, fallback, recuperación, conflictos, borrado y fallo de cuota");
}
run().catch((error) => { console.error(error); process.exitCode = 1; });
