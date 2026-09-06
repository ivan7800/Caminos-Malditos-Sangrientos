# Changelog

Cambios relevantes de **Caminos Malditos Sangrientos** (anteriormente ABYSS 404).

## 4.1.3 — Stable / Offline Cache Hardening

- Corregido un caso límite del Service Worker: una navegación con respuesta HTTP no satisfactoria, como un 404 de GitHub Pages, ya no puede sustituir la copia offline válida de `index.html`.
- La caché de navegación solo se actualiza cuando `response.ok === true`.
- Conservado el fallback offline a `index.html` cuando la red no está disponible.
- Añadido `tests/sw-navigation.test.js` con 4 comprobaciones específicas contra regresiones.
- Actualizada la caché PWA a `abyss404-v4.1.3`.
- Edición marcada como **Stable / Definitive**.

## 4.1.2 — Install Flow Bugfix

- Corregido el botón **Instalar** para que nunca quede aparentemente inactivo.
- Usa el prompt nativo cuando el navegador emite `beforeinstallprompt`.
- Añadido fallback contextual para Chrome, Edge, iPhone/iPad y otros navegadores.
- Añadido aviso específico para `file://`.
- Detecta ejecución en modo instalado y evita ofrecer una instalación redundante.

## 4.1.1 — Continuity Hardened

- Añadido ledger persistente de continuidad narrativa.
- Corregidos personajes muertos que podían reaparecer, objetos destruidos/perdidos que podían volver, herramientas inexistentes materializadas y acciones imposibles aceptadas literalmente.
- El modo Historia conserva capacidad autoral para introducir excepciones sobrenaturales explícitas.
- Reforzado el contexto del motor remoto con las mismas reglas.
- Añadido `tests/narrative-stress.test.js`: **170 comprobaciones sobre 14 campañas**.
- Verificados los **56 finales**.

## 4.1.0 — Definitive Stories Edition

- Cuatro finales específicos por cada una de las 14 campañas: **56 finales**.
- Estructura **Decisión → Clímax → Consecuencia → Epílogo**.
- Trayectorias ocultas de conocimiento, corrupción, sacrificio, confianza, personas salvadas, verdades y obsesión.
- Los finales dependen de decisiones acumuladas durante la aventura.
- Exportación e informe final ampliados con desenlace, epílogo y trayectoria.

## 4.0.0 — Immersion Edition

- Sistema de **Descenso** en cinco fases.
- Eventos diegéticos para pistas, recuerdos, capítulos, condiciones, visiones y finales.
- Arte reactivo y feedback sonoro opcional.
- Informe de partida.
- Mejoras de viewport móvil mediante `100dvh`.

## 3.6.0 — Final QA Edition

- Scroll seguro en diálogos y Ajustes.
- Botones de footer siempre accesibles en ventanas pequeñas.
- Actualización explícita del Service Worker.

## 3.5.0 — Motion Verified Edition

- Movimiento orbital explícito mediante `requestAnimationFrame`.
- Respeto de `prefers-reduced-motion`.

## 3.4.0 — I. Roig Redline Edition

- Dirección visual negra, roja y marfil de Universo 404.
- Geometría diagonal, arte orbital y movimiento por capas.

## 3.3.0 — Coherent Motion Edition

- Biblioteca visual unificada.
- Movimiento y fondo suavizados.
- Botón de instalación rediseñado.

## 3.2.0 — Universo 404 Visual Edition

- Integración de iconos, WebP e identidad visual Universo 404.

## 3.1.0 — Complete Experience Release

- Onboarding, favoritos, ambientes sonoros y mejoras de UX.

## 3.0.4 — Complete Install & Spanish UX Release

- Instalación PWA visible y modos principales traducidos al español.

## 3.0.3 — Performance Release

- Conversión del arte a WebP y reducción importante del peso visual.

## 3.0.2 — Final GitHub Release

- Hardening de audio, arte, PWA, exportación y guardado local.

## 3.0.1 — Complete Collection Audit

- Cobertura visual completa de campañas y validación offline.

## 3.0.0 — Complete Collection Edition

- Colección principal completada con **14 campañas**.

## 2.x — Expansión narrativa

- Incorporación progresiva de *Espectro Rojo*, *Cuando el Tiempo Sangra*, *El Nombre Que Devora la Sangre*, *Donde se Entierran los Espejos*, *El Latido Bajo la Piedra*, *Los Que Miran Desde el Pozo*, *Visión Carmesí* y *Puerta 414*.

## 1.x — Fundación y Director's Cut

- Primera versión pública del motor local-first.
- Modos Do/Say/Story/Continue/See.
- World Engine, memoria, Story Cards, Context Builder, Inspector, editor de escenarios, exportaciones e IndexedDB.
- Integración de *Sangre del MetropoliT*, decisiones persistentes, checkpoints y finales condicionados.
- Marca visible renombrada a **Caminos Malditos Sangrientos** manteniendo identificadores internos ABYSS 404 por compatibilidad.
