## 4.2.0 — Focus Edition

- Interfaz de partida simplificada por defecto.
- Actuar/Hablar como modos primarios; Narrar/Continuar/Visión pasan a controles avanzados.
- Arco, tensión, nivel, XP, inspector, exportación y edición avanzada quedan detrás de **Más controles**.
- Preferencia avanzada persistente en localStorage.
- Documentación/versionado unificados.
- Feature freeze.

# Changelog

Los cambios relevantes de ABYSS 404 se documentan en este archivo.

## 4.1.5 — PWA Install & Update Fix

- Eliminado el registro duplicado del Service Worker entre `app.js` y `update.js`.
- Evitado el aviso repetitivo cuando el worker en espera coincide con el controlador actual.
- Añadida supresión por sesión al descartar una actualización.
- Registro con `updateViaCache: none` y espera de `serviceWorker.ready`.
- Manifest ajustado para Chrome PC con iconos PNG estándar 192/512.
- Nuevo test `pwa-single-owner.test.js`.
- Caché `abyss404-v4.1.5`.

## 4.1.4 — Update Reliability

- Cache-busting de recursos críticos.
- Aviso de nueva versión con **Actualizar ahora**.
- Actualización controlada del Service Worker mediante `SKIP_WAITING` y recarga tras `controllerchange`.
- Nuevo test de regresión del flujo de actualización.
- Caché `abyss404-v4.1.4`.

## 4.1.3 — Stable / Offline Cache Hardening

- Corregido un caso límite del Service Worker: una navegación con respuesta HTTP no satisfactoria (por ejemplo, un 404 de GitHub Pages) ya no puede sustituir la copia offline de `index.html`.
- La caché de navegación solo se actualiza cuando `response.ok === true`.
- Conservado el fallback offline a `index.html` cuando la red no está disponible.
- Añadido `tests/sw-navigation.test.js` para impedir regresiones del flujo de caché de navegación.
- Actualizada la caché PWA a `abyss404-v4.1.3`.
- Marcada esta edición como **Stable / Definitive** tras el cierre de los bugfixes de continuidad, instalación y caché offline.

## 4.1.2 — Install Flow Bugfix

- Corregido el botón **Instalar** para que nunca quede aparentemente inactivo.
- Usa el prompt nativo cuando el navegador emite `beforeinstallprompt`.
- Añadido fallback contextual para Chrome, Edge, iPhone/iPad y otros navegadores.
- Añadido aviso específico cuando la app se abre mediante `file://`, donde la instalación PWA no está disponible.
- Detecta ejecución en modo instalado y evita ofrecer una instalación redundante.
- Actualizada la caché PWA a `abyss404-v4.1.2`.

## 4.1.1 — Continuity Hardened

- Añadido ledger persistente de continuidad narrativa.
- Corregido el caso en el que Director 404 podía aceptar literalmente herramientas no existentes, objetos destruidos, conversaciones con personajes muertos o acciones imposibles no justificadas.
- El modo Historia conserva su función autoral y puede establecer explícitamente excepciones sobrenaturales.
- Reforzado el prompt del motor remoto para respetar inventario, personajes muertos, localización y hechos previos.
- Añadido `tests/narrative-stress.test.js`: 170 comprobaciones sobre las 14 campañas.
- Verificado que los 56 finales y la batería anterior siguen funcionando.
- Actualizada la caché PWA a `abyss404-v4.1.1`.

## 4.1.0 — Definitive Stories Edition

- Añadida una capa de finales específicos para las catorce campañas: cuatro cierres escritos para cada expediente, con ambigüedad moral y consecuencias propias.
- Añadida la secuencia narrativa **Decisión → Clímax → Consecuencia → Epílogo**.
- Añadidos epílogos fechados y última línea de cierre en el informe de partida, la interfaz y la exportación Markdown.
- Añadida trayectoria oculta por aventura: conocimiento, corrupción, sacrificio, confianza, personas salvadas, verdades descubiertas y obsesión.
- Los finales requieren haber construido la trayectoria; no se desbloquean únicamente pulsando una opción final.
- Conservado el formato de guardado `ABYSS404.1` y compatibilidad con aventuras antiguas sin trayectoria nueva.
- Añadida una pasada editorial de títulos para eliminar duplicados exactos y suavizar repeticiones léxicas en campañas extensas.
- Actualizada la caché PWA a `abyss404-v4.1.0`.

## 4.0.0 — Immersion Edition

- Añadido el sistema de **Descenso** en cinco fases, conectado al Umbral real de la aventura.
- Añadidos eventos de inmersión persistentes para pistas, recuerdos, capítulos, condiciones, visiones y finales.
- Añadido arte reactivo de escena y transición suave cuando el mundo cambia.
- Añadido feedback sonoro corto para eventos si el ambiente está activado; la experiencia visual no depende del audio.
- Añadido informe de partida con decisiones, hallazgos, recuerdos, visiones, capítulo, umbral y final.
- Añadida información de Descenso al contexto del narrador y a la exportación Markdown.
- Revisado el layout móvil con `100dvh` para evitar recortes provocados por las barras del navegador.
- Conservado el scroll accesible de Ajustes y la actualización explícita del Service Worker.

## 3.6.0 — Final QA Edition

- Corregido el bug del diálogo de ajustes: el contenido tiene scroll táctil/teclado y el footer con “Guardar ajustes” queda siempre visible.
- Aplicada la misma estructura flexible a los demás diálogos para evitar que sus botones queden fuera de pantalla.
- El registro del Service Worker ejecuta `registration.update()` para detectar antes las nuevas releases en GitHub Pages.
- Actualizada la caché a `abyss404-v3.6.0`.

## 3.5.0 — Motion Verified Edition

- Añadido movimiento orbital explícito mediante `requestAnimationFrame` para los tres anillos, la pupila y la flotación del conjunto.
- El movimiento se detiene correctamente con el ajuste interno o `prefers-reduced-motion`.
- Incrementada la versión de caché del Service Worker a `abyss404-v3.5.0` para evitar servir la edición anterior.

## 3.4.0 — I. Roig Redline Edition

- Adaptada la interfaz principal al lenguaje visual de la web de I. Roig / Universo 404.
- Sustituida la paleta cósmica verde de la skin principal por negro, rojo oscuro, marfil y tonos de sangre controlados.
- Añadidas diagonales rojas animadas como motivo de grieta, con movimiento lento y no intrusivo.
- Corregida la sensación de imagen estática del arte orbital: ahora se mueven de forma independiente el conjunto, los tres anillos, el brillo ocular, la pupila y las diagonales.
- Conservado el rendimiento y el modo `prefers-reduced-motion`.
- Actualizada la caché del Service Worker a `abyss404-v3.4.0`.

## 3.3.0 — Coherent Motion Edition

- Recuperada la composición orbital limpia de la interfaz anterior; el arte de Universo 404 permanece en la marca y en la PWA.
- Unificadas las tarjetas de escenarios: todas tienen cabecera, galería de tres visiones y proporciones coherentes.
- Corregido el espacio vertical excesivo que desplazaba los títulos de las tarjetas con arte.
- Añadida entrada escalonada ligera para la biblioteca, con compatibilidad con `prefers-reduced-motion` y el ajuste interno.
- Sustituido el grano rápido por un movimiento de fondo lento para reducir ruido visual y coste de renderizado.
- Rediseñado el botón de instalación para que no se comprima ni se confunda con los controles de audio, ajustes y ayuda.
- Actualizada la caché del Service Worker a `abyss404-v3.3.0`.

## 3.2.0 — Universo 404 Visual Edition

- Integrado el icono visual de Universo 404 proporcionado por el autor.
- Creada una versión ligera WebP para la portada y versiones PNG optimizadas para la instalación PWA.
- Rediseñado el control `Instalar` para evitar solapamientos en la cabecera y adaptarlo a móvil.
- Añadida una pieza visual central a la portada para reforzar la identidad y eliminar la sensación plana.

## 3.1.0 — Complete Experience Release

- Añadido onboarding inicial con explicación de los modos, guardado y flujo de juego.
- Añadidos favoritos persistentes para expedientes y filtro `★ Favoritos`.
- Añadidos cuatro ambientes sonoros: Abismo, Marea profunda, Radio muerta y Nave abandonada.
- Añadidos cuatro niveles de volumen y control desde Ajustes.
- Mejorados los nombres visibles de los modos: Actuar, Hablar, Narrar, Continuar y Visión.
- Añadidos controles de calidad para verificar instalación, onboarding, modos y audio.

## 3.0.4 — Complete Install & Spanish UX Release

- Añadido botón visible para instalar la PWA como aplicación.
- Añadida compatibilidad con `beforeinstallprompt`, detección de instalación y guía para iPhone.
- Traducidos los cinco modos principales de juego al español manteniendo sus identificadores Do/Say/Story/Continue/See.
- Mejorada la ayuda contextual para que cualquier jugador entienda qué hace cada modo.

## 3.0.3 — Performance Release

- Convertido el arte visual a WebP: el paquete visual pasa de aproximadamente 22 MB a 1,2 MB.
- Actualizada la caché offline para precargar únicamente los recursos optimizados.
- Reducido el tiempo de carga inicial de la biblioteca y el consumo de red en móviles.

## 3.0.2 — Final GitHub Release

- Corregido el ambiente sonoro procedural: señal más audible, compatibilidad con `AudioContext` suspendido y confirmación visual al activarlo.
- Añadida limpieza segura del grafo de audio y manejo de errores de inicialización.
- Endurecidas las rutas de arte para impedir que datos importados puedan inyectar estilos o URLs arbitrarias.
- Verificación final de PWA, expedientes, galería aleatoria, exportación y guardado local.

## 3.0.1 — Complete Collection Audit

- Corregida la cobertura visual: ningún escenario queda sin imagen de cabecera.
- Verificadas todas las rutas locales de imágenes y la caché offline.
- Optimizado el peso de las imágenes para reducir la carga de la PWA.

## 3.0.0 — Complete Collection Edition

- Añadida la última campaña: **Bajo el Espejo de la Sangre**, con 22 capítulos y epílogo.
- Completada la colección principal: 14 campañas integradas y 0 historias pendientes.

## 2.2.0 — Espectro Edition

- Añadida la campaña de 30 capítulos **Espectro Rojo**.
- Integrados Nuevo Paraíso, el Espectro, Jack, Mara y la continuidad temporal de la antología.

## 2.1.0 — Tiempo Edition

- Añadida la campaña de 30 capítulos y epílogo **Cuando el Tiempo Sangra**.
- Conservadas sus dos épocas narrativas: Montrevault de 1274 y Terrassa de 2025.

## 2.0.0 — El Nombre Edition

- Añadida la campaña de 24 capítulos y prólogo **El Nombre Que Devora la Sangre**.
- Añadida galería visual global con imágenes aleatorias y botón para cambiar la selección.
- Reforzado el ambiente sonoro procedural con ruido atmosférico y reanudación del AudioContext.

## 1.9.0 — Espejos Edition

- Añadida la campaña de 26 capítulos **Donde se Entierran los Espejos**.
- Añadido arte local seleccionado para portada, visiones y galería del expediente.
- Corregido el arranque del ambiente sonoro procedural y su volumen inicial.

## 1.8.0 — El Latido bajo la Piedra

- Añadida la campaña completa de 33 capítulos de Quintaluz y El Acebrín.
- Añadido selector persistente de siete skins visuales.
- Actualizados el Service Worker y la documentación de la edición.

## 1.7.0 — Villazul Edition

- Añadido el expediente literario **Los Que Miran Desde el Pozo**, basado en la historia original de I. Roig.
- Integrados sus 30 capítulos como progresión jugable con escenas contextuales y epílogo narrativo.
- Añadidos Villazul, Inés, Mateo, Sara, Lucía, el pozo, la hora 03:17, las campanas, las sombras y las frecuencias de la piedra quieta.
- Actualizados los tests, la documentación, el número de escenarios y la caché de la PWA.

## 1.6.0 — Visión Carmesí Edition

- Añadido el expediente literario **Visión Carmesí**, basado en la historia original de I. Roig.
- Integrados sus 33 capítulos como progresión jugable con escenas contextuales y localizaciones transnacionales.
- Añadidos sus personajes, brote, símbolos, reglas, señal 06:06, espejos y Story Cards.
- Actualizados los tests, la documentación, el número de escenarios y la caché de la PWA.

## 1.5.0 — Puerta 414 Edition

- Añadido el expediente literario **Puerta 414**, basado en la historia original de I. Roig.
- Integrados sus 26 capítulos como progresión jugable con objetivos, localizaciones y escenas contextuales.
- Añadidas sus reglas, personajes, lugares, anomalías y objetos al sistema de Story Cards y al Context Builder.
- Actualizados los tests, la documentación, el número de escenarios y la caché de la PWA.

## 1.4.0 — Complete Campaign Edition

- Escenas contextuales para los 20 capítulos de **Sangre del MetropoliT**.
- Visiones procedurales vinculadas al capítulo activo.
- Trayectoria visible con muertes, pistas, rebelión y poder.
- Exportación Markdown ampliada con capítulo y estadísticas de campaña.

## Marca visible

- La aplicación pasa a llamarse **Caminos Malditos Sangrientos**.
- Se mantienen los identificadores internos `ABYSS 404` para no romper guardados, códigos de ritual ni Service Worker.

## 1.3.0 — Director's Cut Final

- Decisiones persistentes de aliados, pistas, rebelión y poder.
- Finales condicionados por la trayectoria completa, no solo por una palabra clave.
- Checkpoints locales por capítulo con restauración segura.
- Pruebas de regresión de las rutas de liberación y Proyeccionista.

## 1.2.0 — Director's Cut

- Añadido el expediente literario **Sangre del MetropoliT**, basado en la historia original de I. Roig.
- Integrados sus 20 capítulos como progresión jugable con objetivos y localizaciones.
- Añadidos tres desenlaces literarios: liberación, nuevo Proyeccionista y bucle eterno.
- Las rutas ahora acumulan decisiones sobre aliados, pistas, rebelión y poder antes de desbloquear un final.
- Añadidos checkpoints locales para guardar y restaurar una ruta por capítulo.
- Director narrativo, tensión, momentum, cliffhanger, XP, niveles y combate determinista.
- Decisiones sugeridas, audio procedural y visiones locales integradas.

## 1.0.0 — 2026-09-05

### Añadido

- Primera versión pública del motor narrativo.
- Cuatro escenarios originales de horror cósmico.
- Modos Do, Say, Story, Continue y See.
- Director 404 offline y conector OpenAI-compatible opcional.
- World Engine con cuatro medidores, tiradas y consecuencias persistentes.
- Memoria por bloques, resumen global, Story Cards e Inspector de contexto.
- Editor e intercambio de escenarios.
- Multijugador local y códigos portables de ritual.
- Exportaciones `.abyss404`, Markdown y PNG.
- IndexedDB con fallback, PWA offline y experiencia responsive.
- Controles de accesibilidad, privacidad y seguridad.
# 1.1.0 — Release Hardening

- Añadido `SECURITY.md` con modelo de amenazas y límites de la integración IA.
- Añadida página 404 compatible con GitHub Pages y subdirectorios.
- Documentados con más claridad el multijugador local, el modo See y los límites de las APIs externas.
- Reforzada la preparación de publicación y comprobación offline.
