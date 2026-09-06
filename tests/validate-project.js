"use strict";

const assert = require("node:assert/strict");
const fs = require("node:fs");
const path = require("node:path");

const root = path.join(__dirname, "..");
const required = [
  "index.html",
  "styles.css",
  "manifest.webmanifest",
  "sw.js",
  "assets/icon.svg",
  "assets/icon-192.png",
  "assets/icon-512.png",
  "assets/universo-404.webp",
  "assets/universo-404-192.png",
  "assets/universo-404-512.png",
  "js/scenarios.js",
  "js/endings.js",
  "js/engine.js",
  "js/storage.js",
  "js/app.js",
  "README.md",
  "CHANGELOG.md",
  "SECURITY.md",
  "LICENSE"
];

required.forEach((file) => assert.ok(fs.existsSync(path.join(root, file)), `Falta ${file}`));

const html = fs.readFileSync(path.join(root, "index.html"), "utf8");
const css = fs.readFileSync(path.join(root, "styles.css"), "utf8");
[
  "screen-home", "screen-library", "screen-setup", "screen-studio", "screen-game",
  "settings-dialog", "context-dialog", "ritual-dialog", "story-feed", "action-input"
].forEach((id) => assert.match(html, new RegExp(`id=["']${id}["']`), `Falta #${id}`));
[
  "descent-stage", "descent-copy", "descent-meter-fill", "scene-rail", "immersion-flash", "report-dialog", "open-report-btn", "report-ending-detail", "report-climax", "report-consequence", "report-epilogue-copy"
].forEach((id) => assert.match(html, new RegExp(`id=["']${id}["']`), `Falta control de inmersión #${id}`));
assert.match(html, /id=["']skin-select["']/);
assert.match(html, /id=["']install-app["']/);
assert.match(html, /id=["']onboarding-dialog["']/);
assert.match(html, /data-mode=["']do["'][^>]*>.*Actuar/s);
assert.match(html, /data-mode=["']say["'][^>]*>.*Hablar/s);
assert.match(html, /data-mode=["']story["'][^>]*>.*Narrar/s);
assert.match(html, /data-mode=["']continue["'][^>]*>.*Continuar/s);
assert.match(html, /data-mode=["']see["'][^>]*>.*Visión/s);
["cosmic", "obsidian", "void", "glass", "terminal", "arctic", "synthwave"].forEach((skin) => assert.match(css, new RegExp(`data-skin=["']${skin}["']`)));
const appJs = fs.readFileSync(path.join(root, "js/app.js"), "utf8");
const updateJs = fs.readFileSync(path.join(root, "js/update.js"), "utf8");
assert.match(appJs, /await context\.resume\(\)/);
assert.match(appJs, /scenario-card__art/);
assert.match(appJs, /scenario-card__gallery/);
assert.match(appJs, /const fallbackArt = galleryArt/);
assert.match(appJs, /const coverArt = safeArtPath\(scenario\.art, fallbackArt\[0\]\)/);
assert.match(appJs, /const visualSet = scenario\.artGallery\?\.length/);
assert.match(appJs, /--card-index/);
assert.match(appJs, /context\.state !== "running"/);
assert.match(appJs, /function stopAudio\(\)/);
assert.match(appJs, /beforeinstallprompt/);
assert.match(appJs, /data-favorite-id/);
assert.match(appJs, /audioProfile/);
assert.match(html, /assets\/universo-404\.webp/);
["vision-carmesi", "pozo-rojo", "boca-cosmica", "umbral-incandescente", "espiral-del-umbral", "puerta-luz", "orbe-rojo", "memoria-agua", "hoyo-blanco", "planeta-negro", "ventana-roja", "mensajero-oscuro"].forEach((name) => assert.ok(fs.existsSync(path.join(root, "assets", "art-webp", `${name}.webp`)), `Falta arte ${name}`));

assert.doesNotMatch(html, /<(script|link)[^>]+(?:src|href)=["']https?:\/\//i, "No debe cargar scripts ni estilos externos");
assert.match(html, /Content-Security-Policy/);
assert.doesNotMatch(html.match(/Content-Security-Policy[^>]+/i)?.[0] || "", /script-src[^;]*unsafe-inline/i, "La CSP no debe permitir scripts inline");

const ids = [...html.matchAll(/\bid=["']([^"']+)["']/g)].map((match) => match[1]);
assert.equal(new Set(ids).size, ids.length, "No debe haber identificadores HTML duplicados");
[...html.matchAll(/\bfor=["']([^"']+)["']/g)].forEach((match) => assert.ok(ids.includes(match[1]), `Label sin control asociado: ${match[1]}`));

assert.equal((css.match(/{/g) || []).length, (css.match(/}/g) || []).length, "Las llaves CSS no están equilibradas");
assert.match(css, /\.settings-body\s*\{[\s\S]*height:\s*min\(720px,\s*calc\(100vh\s*-\s*190px\)\)/, "Los ajustes deben tener un área desplazable limitada");
assert.match(css, /\.modal__shell\s*\{[\s\S]*display:\s*flex/, "Los diálogos deben reservar el footer fuera del scroll");
assert.match(updateJs, /reg\.update\(\)/, "El módulo de actualización debe comprobar actualizaciones");
assert.match(appJs, /function renderImmersion\(\)/, "Debe renderizar el estado del descenso");
assert.match(appJs, /function showReport\(\)/, "Debe existir un informe de partida");
assert.match(appJs, /report.endingData/, "El informe debe mostrar el final específico y su epílogo");
assert.match(html, /js\/endings\.js/);
assert.match(html, /id=["']report-final-line["']/);
assert.match(appJs, /playImmersionCue/, "Los eventos deben poder producir feedback sonoro");
assert.match(css, /\.immersion-event/, "Los descubrimientos deben tener feedback visual");

const manifest = JSON.parse(fs.readFileSync(path.join(root, "manifest.webmanifest"), "utf8"));
assert.equal(manifest.start_url, "./");
assert.equal(manifest.display, "standalone");
manifest.icons.forEach((icon) => assert.ok(fs.existsSync(path.join(root, icon.src)), `Icono ausente: ${icon.src}`));

const sw = fs.readFileSync(path.join(root, "sw.js"), "utf8");
const shellMatches = [...sw.matchAll(/["']\.\/(?!#)([^"']+)["']/g)].map((match) => match[1]);
shellMatches.filter((file) => file !== "").forEach((file) => { const diskPath = file.split(/[?#]/, 1)[0]; assert.ok(fs.existsSync(path.join(root, diskPath)), `El Service Worker referencia un archivo inexistente: ${file}`); });

const fileCount = fs.readdirSync(root, { recursive: true, withFileTypes: true }).filter((entry) => entry.isFile() && !entry.parentPath.includes(`${path.sep}.git${path.sep}`) && !entry.parentPath.includes(`${path.sep}.github${path.sep}`)).length;
assert.ok(fileCount < 100, `El proyecto supera 100 archivos: ${fileCount}`);

console.log(`✓ Proyecto estático validado (${fileCount} archivos, sin dependencias remotas)`);
