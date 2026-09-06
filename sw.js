"use strict";

const CACHE_VERSION = "abyss404-v4.1.2";
const APP_SHELL = [
  "./",
  "./index.html",
  "./styles.css",
  "./manifest.webmanifest",
  "./assets/icon.svg",
  "./assets/icon-192.png",
  "./assets/icon-512.png",
  "./assets/universo-404.webp",
  "./assets/universo-404-192.png",
  "./assets/universo-404-512.png",
  "./assets/art-webp/hoyo-blanco.webp",
  "./assets/art-webp/planeta-negro.webp",
  "./assets/art-webp/ventana-roja.webp",
  "./assets/art-webp/mensajero-oscuro.webp",
  "./assets/art-webp/puerta-luz.webp",
  "./assets/art-webp/orbe-rojo.webp",
  "./assets/art-webp/memoria-agua.webp",
  "./assets/art-webp/boca-cosmica.webp",
  "./assets/art-webp/umbral-incandescente.webp",
  "./assets/art-webp/espiral-del-umbral.webp",
  "./assets/art-webp/pozo-rojo.webp",
  "./assets/art-webp/vision-carmesi.webp",
  "./js/scenarios.js",
  "./js/endings.js",
  "./js/engine.js",
  "./js/storage.js",
  "./js/app.js"
];

self.addEventListener("install", (event) => {
  event.waitUntil(caches.open(CACHE_VERSION).then((cache) => cache.addAll(APP_SHELL)).then(() => self.skipWaiting()));
});

self.addEventListener("activate", (event) => {
  event.waitUntil(
    caches.keys()
      .then((keys) => Promise.all(keys.filter((key) => key.startsWith("abyss404-") && key !== CACHE_VERSION).map((key) => caches.delete(key))))
      .then(() => self.clients.claim())
  );
});

self.addEventListener("fetch", (event) => {
  if (event.request.method !== "GET") return;
  const url = new URL(event.request.url);
  if (url.origin !== self.location.origin) return;

  if (event.request.mode === "navigate") {
    event.respondWith(
      fetch(event.request)
        .then((response) => {
          const copy = response.clone();
          caches.open(CACHE_VERSION).then((cache) => cache.put("./index.html", copy));
          return response;
        })
        .catch(() => caches.match("./index.html"))
    );
    return;
  }

  event.respondWith(
    caches.match(event.request).then((cached) => cached || fetch(event.request).then((response) => {
      if (response.ok) {
        const copy = response.clone();
        caches.open(CACHE_VERSION).then((cache) => cache.put(event.request, copy));
      }
      return response;
    }))
  );
});
