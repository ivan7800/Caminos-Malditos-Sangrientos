"use strict";

const assert = require("node:assert/strict");
const path = require("node:path");

global.window = global;
require(path.join(__dirname, "..", "js", "scenarios.js"));
require(path.join(__dirname, "..", "js", "endings.js"));
require(path.join(__dirname, "..", "js", "engine.js"));

const Engine = global.AbyssEngine;
const scenarios = global.ABYSS_SCENARIOS;

async function run() {
  assert.equal(scenarios.length, 14, "Debe haber catorce escenarios incluidos");
  scenarios.forEach((scenario) => {
    assert.equal(global.AbyssScenarioTools.validateScenario(scenario).length, 0, `Escenario inválido: ${scenario.title}`);
    const design = global.AbyssEndingTools.getDesign(scenario);
    assert.ok(design, `Falta diseño de finales: ${scenario.id}`);
    assert.ok(design.endings.length >= 3 && design.endings.length <= 5, `El expediente ${scenario.id} debe tener entre 3 y 5 finales`);
    const editorialScenario = JSON.parse(JSON.stringify(scenario));
    global.AbyssEndingTools.applyEditorialPass(editorialScenario);
    assert.equal(global.AbyssEndingTools.editorialAudit(editorialScenario).length, 0, `Hay títulos de capítulo duplicados: ${scenario.id}`);
  });
  const literary = scenarios.find((scenario) => scenario.id === "sangre-del-metropolit");
  const espejoSangre = scenarios.find((scenario) => scenario.id === "bajo-el-espejo-de-la-sangre");
  assert.ok(espejoSangre, "Debe incluirse Bajo el Espejo de la Sangre");
  assert.equal(espejoSangre.chapters.length, 22);
  assert.equal(espejoSangre.chapterScenes.length, 22);
  const espectro = scenarios.find((scenario) => scenario.id === "espectro-rojo");
  assert.ok(espectro, "Debe incluirse Espectro Rojo");
  assert.equal(espectro.chapters.length, 30);
  assert.equal(espectro.chapterScenes.length, 30);
  const tiempo = scenarios.find((scenario) => scenario.id === "cuando-el-tiempo-sangra");
  assert.ok(tiempo, "Debe incluirse Cuando el Tiempo Sangra");
  assert.equal(tiempo.chapters.length, 30);
  assert.equal(tiempo.chapterScenes.length, 30);
  assert.equal(literary.chapters.length, 20, "La campaña literaria debe conservar sus veinte capítulos");
  const literaryAdventure = Engine.createAdventure(literary, { playerName: "Vincent", archetype: "investigator", perspective: "second", intensity: "severe", seed: "metropolit" }, { engine: "offline" });
  for (let index = 0; index < 6; index += 1) await Engine.takeTurn(literaryAdventure, "story", `Exploro la toma ${index + 1}.`, { engine: "offline" });
  assert.equal(literaryAdventure.world.chapter, 2, "El avance debe pasar al capítulo 2 tras cinco acciones");
  literaryAdventure.state.threshold = 74;
  literaryAdventure.world.storyPath.rebellion = 2;
  const ending = await Engine.takeTurn(literaryAdventure, "story", "Renuncio al cine y destruyo la bobina para romper el ciclo.", { engine: "offline" });
  assert.equal(literaryAdventure.meta.ending, "liberation");
  assert.match(ending.turn.output, /fundido es definitivo/i);
  const projectionAdventure = Engine.createAdventure(literary, { playerName: "Vincent", archetype: "investigator", perspective: "second", intensity: "severe", seed: "metropolit-power" }, { engine: "offline" });
  projectionAdventure.state.threshold = 74;
  projectionAdventure.world.storyPath.power = 2;
  const projection = await Engine.takeTurn(projectionAdventure, "story", "Acepto el papel y me convierto en el Proyeccionista.", { engine: "offline" });
  assert.equal(projectionAdventure.meta.ending, "projectionist");
  assert.match(projection.turn.output, /nuevo Proyeccionista/i);

  const orfeo = scenarios.find((scenario) => scenario.id === "orfeo-ix");
  const orfeoAdventure = Engine.createAdventure(orfeo, { playerName: "Lira", archetype: "engineer", perspective: "second", intensity: "severe", seed: "orfeo-ending" }, { engine: "offline" });
  orfeoAdventure.state.threshold = 100;
  orfeoAdventure.world.storyPath.knowledge = 5;
  orfeoAdventure.world.storyPath.truths = 3;
  const orfeoEnding = await Engine.takeTurn(orfeoAdventure, "story", "Permito que la transmisión llegue a la Tierra.", { engine: "offline" });
  assert.equal(orfeoAdventure.meta.ending, "transmision-completa");
  assert.match(orfeoEnding.turn.output, /DECISIÓN · TRANSMISIÓN COMPLETA/);
  assert.match(orfeoEnding.turn.output, /CONSECUENCIA/);
  assert.match(orfeoEnding.turn.output, /EPÍLOGO · Una fecha imposible/);
  assert.equal(Engine.buildReport(orfeoAdventure).endingData.id, "transmision-completa");
  assert.match(Engine.toMarkdown(orfeoAdventure), /Decisión, consecuencia y epílogo/);

  const puerta = scenarios.find((scenario) => scenario.id === "puerta-414");
  assert.ok(puerta, "Debe incluirse el expediente Puerta 414");
  assert.equal(puerta.chapters.length, 26, "Puerta 414 debe conservar sus veintiséis capítulos");
  assert.equal(puerta.chapterScenes.length, 26, "Cada capítulo de Puerta 414 debe tener una escena contextual");
  assert.match(puerta.opening, /04:04/);
  const puertaAdventure = Engine.createAdventure(puerta, { playerName: "Norma", archetype: "investigator", perspective: "second", intensity: "severe", seed: "puerta-414" }, { engine: "offline" });
  for (let index = 0; index < 6; index += 1) await Engine.takeTurn(puertaAdventure, "story", `Registro la anomalía ${index + 1}.`, { engine: "offline" });
  assert.equal(puertaAdventure.world.chapter, 2, "Puerta 414 debe avanzar al capítulo 2 tras cinco acciones");
  const puertaContext = Engine.buildContext(puertaAdventure, "Escucho la frecuencia 4.14 detrás del espejo.");
  assert.match(puertaContext.packet, /Puerta 414/);
  assert.match(puertaContext.packet, /frecuencia 4\.14/i);

  const vision = scenarios.find((scenario) => scenario.id === "vision-carmesi");
  assert.ok(vision, "Debe incluirse el expediente Visión Carmesí");
  assert.equal(vision.chapters.length, 33, "Visión Carmesí debe conservar sus treinta y tres capítulos");
  assert.equal(vision.chapterScenes.length, 33, "Cada capítulo de Visión Carmesí debe tener una escena contextual");
  assert.equal(vision.storyCards.length, 12);
  assert.match(vision.opening, /06:06/);
  const visionAdventure = Engine.createAdventure(vision, { playerName: "Franck", archetype: "artist", perspective: "second", intensity: "severe", seed: "vision-carmesi" }, { engine: "offline" });
  for (let index = 0; index < 6; index += 1) await Engine.takeTurn(visionAdventure, "story", `Sigo la señal carmesí ${index + 1}.`, { engine: "offline" });
  assert.equal(visionAdventure.world.chapter, 2, "Visión Carmesí debe avanzar al capítulo 2 tras cinco acciones");
  const visionContext = Engine.buildContext(visionAdventure, "Investigo el nodo 06:06 en el espejo.");
  assert.match(visionContext.packet, /Brote Carmesí/);
  assert.match(visionContext.packet, /triángulo incompleto/i);

  const pozo = scenarios.find((scenario) => scenario.id === "los-que-miran-desde-el-pozo");
  assert.ok(pozo, "Debe incluirse el expediente Los Que Miran Desde el Pozo");
  assert.equal(pozo.chapters.length, 30, "Los Que Miran Desde el Pozo debe conservar sus treinta capítulos");
  assert.equal(pozo.chapterScenes.length, 30, "Cada capítulo del Pozo debe tener una escena contextual");
  assert.match(pozo.opening, /03:17/);
  const pozoAdventure = Engine.createAdventure(pozo, { playerName: "Inés", archetype: "investigator", perspective: "second", intensity: "severe", seed: "pozo-villazul" }, { engine: "offline" });
  for (let index = 0; index < 6; index += 1) await Engine.takeTurn(pozoAdventure, "story", `Cartografío Villazul ${index + 1}.`, { engine: "offline" });
  assert.equal(pozoAdventure.world.chapter, 2, "El Pozo debe avanzar al capítulo 2 tras cinco acciones");
  const pozoContext = Engine.buildContext(pozoAdventure, "Investigo el reloj detenido y el pozo.");
  assert.match(pozoContext.packet, /Villazul/);
  assert.match(pozoContext.packet, /03:17/);
  const latido = scenarios.find((scenario) => scenario.id === "el-latido-bajo-la-piedra");
  assert.ok(latido, "Debe incluirse El Latido Bajo la Piedra");
  assert.equal(latido.chapters.length, 33);
  assert.equal(latido.chapterScenes.length, 33);
  assert.match(latido.truth, /Boca|Latido/);
  const espejos = scenarios.find((scenario) => scenario.id === "donde-se-entierran-los-espejos");
  assert.ok(espejos, "Debe incluirse Donde se Entierran los Espejos");
  assert.equal(espejos.chapters.length, 26);
  assert.equal(espejos.chapterScenes.length, 26);
  assert.equal(espejos.artGallery.length, 3);

  const faro = scenarios.find((scenario) => scenario.id === "faro-bajo-marea");
  const adventure = Engine.createAdventure(faro, {
    playerName: "Ada",
    archetype: "engineer",
    perspective: "second",
    intensity: "severe",
    seed: "prueba-reproducible",
    extraPlayers: ["Bruno"]
  }, { engine: "offline", contextBudget: 2048, responseLength: "medium" });

  assert.equal(adventure.players.length, 2);
  assert.equal(adventure.turns.length, 1);
  assert.equal(Engine.validateAdventure(adventure).length, 0);

  const actions = [
    ["do", "Examino la lente y busco marcas en el mecanismo."],
    ["say", "Elías, sé que puedes oírme. Necesito que respondas."],
    ["do", "Uso la llave de latón en la puerta inferior."],
    ["continue", ""],
    ["story", "La campana se detiene justo antes del tercer tañido."],
    ["see", ""]
  ];

  for (const [mode, input] of actions) {
    const result = await Engine.takeTurn(adventure, mode, input, { engine: "offline" });
    assert.ok(result.turn.output.length > 80, "La respuesta narrativa no debe quedar vacía");
    assert.ok(result.context.used <= result.context.budget, "El contexto debe respetar el presupuesto");
  }

  assert.equal(Engine.countPlayableTurns(adventure), 6);
  assert.equal(adventure.memory.bank.length, 1, "Debe consolidar memoria tras seis acciones");
  ["lucidity", "body", "obsession", "threshold"].forEach((key) => {
    assert.ok(adventure.state[key] >= 0 && adventure.state[key] <= 100, `${key} fuera de límites`);
  });
  assert.equal(adventure.activePlayerIndex, 0, "Seis turnos entre dos jugadores deben cerrar la ronda");

  for (let index = 0; index < 9; index += 1) {
    await Engine.takeTurn(adventure, "story", `La escena incorpora una señal de continuidad número ${index + 1}.`, { engine: "offline" });
  }
  assert.equal(Engine.countPlayableTurns(adventure), 15);
  assert.ok(adventure.memory.bank.length >= 2, "Debe mantener recuerdos sucesivos");
  assert.equal(adventure.memory.lastSummaryTurn, 15, "Debe actualizar el resumen global cada quince acciones");
  assert.ok(["hook", "build", "pressure", "crisis", "payoff", "aftermath"].includes(adventure.world.director.phase), "El Director debe mantener una fase válida");
  assert.ok(adventure.world.director.tension >= 0 && adventure.world.director.tension <= 100, "La tensión debe estar acotada");
  assert.ok(adventure.state.xp >= 0 && adventure.state.level >= 1, "La progresión debe ser válida");
  assert.equal(Engine.getDescentStage(0).label, "Sospecha", "El descenso debe empezar en Sospecha");
  assert.equal(Engine.getDescentStage(80).label, "Ruptura", "El descenso debe terminar en Ruptura");
  assert.ok(adventure.turns.some((turn) => turn.immersionEvent), "La partida debe registrar eventos de inmersión");
  const report = Engine.buildReport(adventure);
  assert.equal(report.actions, Engine.countPlayableTurns(adventure));
  assert.equal(report.clues, adventure.world.clues.length);
  assert.ok(report.stage && report.stage.label, "El informe debe incluir el descenso actual");

  adventure.world.combat = { round: 1, enemy: { name: "Prueba", health: 20, maxHealth: 20, defense: 1, attack: 2 } };
  const combatResult = await Engine.takeTurn(adventure, "attack", "", { engine: "offline" });
  assert.ok(combatResult.turn.roll, "El combate debe usar una tirada determinista");
  assert.ok(!adventure.world.combat || adventure.world.combat.enemy.health < 20, "El ataque debe resolver daño o cerrar el encuentro");

  const context = Engine.buildContext(adventure, "Regreso a buscar el cuaderno de Elías.");
  assert.match(context.packet, /WORLD ENGINE/);
  assert.match(context.packet, /ACCIÓN ACTUAL/);
  assert.ok(context.used <= 2048);

  const markdown = Engine.toMarkdown(adventure);
  assert.match(markdown, /^# El Faro Bajo la Marea/);
  assert.match(markdown, /Ada/);
  assert.match(markdown, /Descenso:/);

  const code = Engine.encodeRitualCode(adventure);
  assert.match(code, /^ABYSS404\.1\./);
  const copy = Engine.decodeRitualCode(code);
  assert.notEqual(copy.id, adventure.id);
  assert.equal(copy.turns.length, adventure.turns.length);
  const nombre = scenarios.find((scenario) => scenario.id === "el-nombre-que-devora-la-sangre");
  assert.ok(nombre, "Debe incluirse El Nombre Que Devora la Sangre");
  assert.equal(nombre.chapters.length, 24);
  assert.equal(nombre.chapterScenes.length, 24);
  assert.match(nombre.truth, /Último Dios/);
  assert.equal(Engine.validateAdventure(copy).length, 0);

  const custom = global.AbyssScenarioTools.makeCustomScenario({
    title: "La prueba del umbral",
    setting: "Laboratorio, 1998",
    category: "science",
    premise: "Un equipo descubre que las paredes del laboratorio registran decisiones que todavía no han tomado.",
    entity: "La Suma",
    taboo: "No resolver dos veces la misma ecuación",
    truth: "El edificio calcula seres humanos y elimina los resultados redundantes.",
    rules: "Toda suma deja una cicatriz.\nLa luz roja detiene el cálculo.",
    opening: "La calculadora imprime tu nombre en lugar del resultado. Nadie la ha conectado a una impresora y la puerta acaba de cerrarse."
  });
  assert.equal(global.AbyssScenarioTools.validateScenario(custom).length, 0);

  console.log("✓ Motor, memoria, contexto, exportación y escenarios verificados");
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
