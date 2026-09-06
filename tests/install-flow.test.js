"use strict";

const fs = require("fs");
const path = require("path");
const root = path.resolve(__dirname, "..");
const app = fs.readFileSync(path.join(root, "js", "app.js"), "utf8");
const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const sw = fs.readFileSync(path.join(root, "sw.js"), "utf8");

const checks = [
  [html.includes('id="install-app"'), "Existe el botón Instalar"],
  [html.includes('id="install-help-dialog"'), "Existe el diálogo fallback de instalación"],
  [html.includes('id="install-help-title"'), "El diálogo tiene título dinámico"],
  [html.includes('id="install-help-steps"'), "El diálogo contiene pasos dinámicos"],
  [app.includes('beforeinstallprompt'), "Se captura beforeinstallprompt"],
  [app.includes('app.installPrompt.prompt()'), "Se invoca el prompt nativo"],
  [app.includes('display-mode: standalone'), "Se detecta modo PWA instalado"],
  [app.includes('location.protocol === "file:"'), "Se detecta apertura file://"],
  [app.includes('/Edg\\//'), "Se contempla Microsoft Edge"],
  [app.includes('/Chrome\\//'), "Se contempla Google Chrome"],
  [app.includes('/iPad|iPhone|iPod/'), "Se contempla iPhone/iPad"],
  [app.includes('showDialog("install-help-dialog")'), "El fallback nunca queda como botón muerto"],
  [sw.includes('abyss404-v4.1.2'), "La caché PWA corresponde a v4.1.2"]
];

const failed = checks.filter(([ok]) => !ok);
if (failed.length) {
  for (const [, label] of failed) console.error(`✗ ${label}`);
  process.exit(1);
}
console.log(`✓ Flujo de instalación verificado (${checks.length} comprobaciones)`);
