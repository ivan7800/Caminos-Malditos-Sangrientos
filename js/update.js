(function () {
  "use strict";
  const VERSION = "4.1.5";
  const DISMISSED_KEY = `abyss404:update-dismissed:${VERSION}`;
  let registration = null;
  let waitingWorker = null;
  let applying = false;

  function banner() { return document.getElementById("update-banner"); }
  function currentWorkerUrl() { return navigator.serviceWorker.controller ? navigator.serviceWorker.controller.scriptURL : ""; }
  function wasDismissed(worker) {
    try { return sessionStorage.getItem(DISMISSED_KEY) === (worker && worker.scriptURL || ""); } catch (_) { return false; }
  }
  function show(reg, worker) {
    if (!navigator.serviceWorker.controller || !worker) return;
    if (worker.scriptURL === currentWorkerUrl() || wasDismissed(worker)) return;
    registration = reg;
    waitingWorker = worker;
    const el = banner();
    if (el) el.hidden = false;
  }
  function hide() {
    const worker = waitingWorker || (registration && registration.waiting);
    try { if (worker) sessionStorage.setItem(DISMISSED_KEY, worker.scriptURL); } catch (_) {}
    const el = banner();
    if (el) el.hidden = true;
  }
  function apply() {
    const worker = waitingWorker || (registration && registration.waiting);
    if (!worker || worker.scriptURL === currentWorkerUrl()) { const el=banner(); if (el) el.hidden=true; return; }
    try { sessionStorage.removeItem(DISMISSED_KEY); } catch (_) {}
    applying = true;
    worker.postMessage({ type: "SKIP_WAITING" });
  }
  function bind() {
    const applyButton = document.getElementById("apply-update");
    const dismissButton = document.getElementById("dismiss-update");
    if (applyButton) applyButton.addEventListener("click", apply);
    if (dismissButton) dismissButton.addEventListener("click", hide);
  }
  async function register() {
    if (!("serviceWorker" in navigator) || !/^https?:$/.test(location.protocol)) return;
    navigator.serviceWorker.addEventListener("controllerchange", () => {
      const el=banner(); if (el) el.hidden=true;
      if (applying) location.reload();
    });
    try {
      const reg = await navigator.serviceWorker.register(`./sw.js?v=${VERSION}`, { updateViaCache: "none" });
      registration = reg;
      if (reg.waiting) show(reg, reg.waiting);
      reg.addEventListener("updatefound", () => {
        const worker = reg.installing;
        if (!worker) return;
        worker.addEventListener("statechange", () => {
          if (worker.state === "installed" && navigator.serviceWorker.controller) show(reg, worker);
        });
      });
      await navigator.serviceWorker.ready;
      reg.update().catch(() => {});
    } catch (_) { /* Online mode remains available. */ }
  }
  window.addEventListener("DOMContentLoaded", () => { bind(); register(); });
})();
