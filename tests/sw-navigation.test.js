"use strict";

const fs = require("fs");
const assert = require("assert");

const sw = fs.readFileSync("sw.js", "utf8");

assert(sw.includes('const CACHE_VERSION = "abyss404-v4.2.0"'), "La caché debe corresponder a v4.2.0");
assert(sw.includes('if (event.request.mode === "navigate")'), "Debe existir estrategia específica de navegación");
assert(/\.then\(\(response\) => \{\s*if \(response\.ok\) \{[\s\S]*cache\.put\("\.\/index\.html", copy\)/m.test(sw),
  "Una navegación solo puede reemplazar index.html en caché cuando response.ok es true");
assert(sw.includes('.catch(() => caches.match("./index.html"))'), "Debe mantenerse el fallback offline a index.html");

console.log("✓ Service Worker navigation cache hardened (4 comprobaciones)");
