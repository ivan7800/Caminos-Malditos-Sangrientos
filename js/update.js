(function () {
  "use strict";
  const VERSION = "4.1.4";
  let registration = null;
  let waitingWorker = null;
  let applying = false;
  function banner() { return document.getElementById("update-banner"); }
  function show(reg, worker) { if (!navigator.serviceWorker.controller || !worker) return; registration = reg; waitingWorker = worker; const el = banner(); if (el) el.hidden = false; }
  function hide() { const el = banner(); if (el) el.hidden = true; }
  function apply() { const worker = waitingWorker || (registration && registration.waiting); if (!worker) return location.reload(); applying = true; worker.postMessage({ type: "SKIP_WAITING" }); }
  function bind() { const applyButton=document.getElementById("apply-update"), dismissButton=document.getElementById("dismiss-update"); if (applyButton) applyButton.addEventListener("click", apply); if (dismissButton) dismissButton.addEventListener("click", hide); }
  async function register() {
    if (!("serviceWorker" in navigator) || !/^https?:$/.test(location.protocol)) return;
    navigator.serviceWorker.addEventListener("controllerchange", () => { if (applying) location.reload(); else hide(); });
    try {
      const reg = await navigator.serviceWorker.register(`./sw.js?v=${VERSION}`); registration = reg; if (reg.waiting) show(reg, reg.waiting);
      reg.addEventListener("updatefound", () => { const worker=reg.installing; if (!worker) return; worker.addEventListener("statechange", () => { if (worker.state === "installed" && navigator.serviceWorker.controller) show(reg, worker); }); });
      reg.update().catch(() => {});
    } catch (_) {}
  }
  window.addEventListener("DOMContentLoaded", () => { bind(); register(); });
})();
