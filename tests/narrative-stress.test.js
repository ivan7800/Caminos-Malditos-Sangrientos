"use strict";

const assert = require("node:assert/strict");
const path = require("node:path");

global.window = global;
require(path.join(__dirname, "..", "js", "scenarios.js"));
require(path.join(__dirname, "..", "js", "endings.js"));
require(path.join(__dirname, "..", "js", "engine.js"));

const Engine = global.AbyssEngine;
const scenarios = global.ABYSS_SCENARIOS;

function setup(scenario, seed) {
  return Engine.createAdventure(scenario, {
    playerName: "Stress",
    archetype: "investigator",
    perspective: "second",
    intensity: "severe",
    seed
  }, { engine: "offline", contextBudget: 4096, responseLength: "medium" });
}

async function run() {
  let assertions = 0;
  for (const scenario of scenarios) {
    const adventure = setup(scenario, `stress-${scenario.id}`);

    let result = await Engine.takeTurn(adventure, "do", "Saco una motosierra industrial y corto la pared.", { engine: "offline" });
    assert.equal(result.mechanics.continuity && result.mechanics.continuity.type, "missing-item", `${scenario.id}: debe impedir herramientas inventadas`); assertions++;
    assert.match(result.turn.output, /no forma parte del inventario|no ha sido establecido/i); assertions++;
    assert.equal(result.mechanics.discovery, null, `${scenario.id}: una contradicción no debe regalar pistas`); assertions++;

    result = await Engine.takeTurn(adventure, "do", "Me teletransporto a Madrid y entro en el metro.", { engine: "offline" });
    assert.equal(result.mechanics.continuity && result.mechanics.continuity.type, "unsupported-impossible-action", `${scenario.id}: debe tratar teleportación no establecida como intento`); assertions++;
    assert.match(result.turn.output, /acción imposible|intención no convierte/i); assertions++;

    await Engine.takeTurn(adventure, "story", "Nerea Valdés muere delante de mí y su cuerpo queda inmóvil.", { engine: "offline" });
    result = await Engine.takeTurn(adventure, "say", "Nerea Valdés, dime qué has visto.", { engine: "offline" });
    assert.equal(result.mechanics.continuity && result.mechanics.continuity.type, "dead-character", `${scenario.id}: un personaje muerto no debe responder como vivo`); assertions++;
    assert.match(result.turn.output, /no permite que Nerea Valdés responda como una persona viva/i); assertions++;

    // La continuidad debe sobrevivir a suficientes turnos como para salir del historial inmediato.
    for (let index = 0; index < 8; index += 1) {
      await Engine.takeTurn(adventure, "story", `Registro de continuidad ${index + 1}: la escena avanza sin alterar la muerte de Nerea Valdés.`, { engine: "offline" });
    }
    result = await Engine.takeTurn(adventure, "say", "Nerea Valdés, contéstame otra vez.", { engine: "offline" });
    assert.equal(result.mechanics.continuity && result.mechanics.continuity.type, "dead-character", `${scenario.id}: la muerte debe persistir fuera del historial reciente`); assertions++;
    const context = Engine.buildContext(adventure, "Compruebo qué hechos siguen vigentes.");
    assert.match(context.packet, /Personajes muertos\/no disponibles como vivos: Nerea Valdés/i); assertions++;

    // Story es el modo explícito para forzar la ficción: puede establecer una resurrección anómala.
    await Engine.takeTurn(adventure, "story", "Nerea Valdés resucita por efecto del Umbral y vuelve a la vida.", { engine: "offline" });
    result = await Engine.takeTurn(adventure, "say", "Nerea Valdés, ¿puedes oírme ahora?", { engine: "offline" });
    assert.ok(!result.mechanics.continuity || result.mechanics.continuity.type !== "dead-character", `${scenario.id}: Story debe poder restablecer un hecho de forma explícita`); assertions++;

    // Un objeto destruido por Story no debe reaparecer silenciosamente.
    await Engine.takeTurn(adventure, "story", "Destruyo la motosierra industrial y arrojo sus restos al abismo.", { engine: "offline" });
    result = await Engine.takeTurn(adventure, "do", "Uso la motosierra industrial para abrir la compuerta.", { engine: "offline" });
    assert.equal(result.mechanics.continuity && result.mechanics.continuity.type, "lost-item", `${scenario.id}: un objeto destruido no debe reaparecer`); assertions++;

    assert.equal(Engine.validateAdventure(adventure).length, 0, `${scenario.id}: el ledger de continuidad no debe invalidar la aventura`); assertions++;
  }

  // Los finales deben seguir funcionando después del endurecimiento de continuidad.
  const orfeo = scenarios.find((scenario) => scenario.id === "orfeo-ix");
  const finalAdventure = setup(orfeo, "stress-ending");
  finalAdventure.state.threshold = 100;
  finalAdventure.world.storyPath.knowledge = 5;
  finalAdventure.world.storyPath.truths = 3;
  const endingTurn = await Engine.takeTurn(finalAdventure, "story", "Permito que la transmisión llegue a la Tierra.", { engine: "offline" });
  assert.equal(finalAdventure.meta.ending, "transmision-completa"); assertions++;
  assert.match(endingTurn.turn.output, /TRANSMISIÓN COMPLETA/); assertions++;

  console.log(`✓ Stress test narrativo superado (${scenarios.length} campañas, ${assertions} comprobaciones)`);
}

run().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
