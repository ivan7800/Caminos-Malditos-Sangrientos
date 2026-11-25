# Auditoría de experiencia y release — v4.2.0

**Estado:** 4.2.0 publicado; corrección de persistencia y CI preparada en una rama para revisión. La validación en hardware real sigue pendiente.

Revisión de mantenimiento: 2026-11-25
Producto: Caminos Malditos Sangrientos · Universo 404  
Alcance: UX/UI, flujo principal, narrativa, PWA, rendimiento, accesibilidad, seguridad y empaquetado.

## Veredicto

La edición 4.1.1 conserva la capa narrativa definitiva de 4.1.0 y añade un refuerzo específico de continuidad: ledger persistente de personajes muertos y objetos perdidos/destruidos, bloqueo narrativo de herramientas no establecidas y acciones imposibles no justificadas, y reglas equivalentes para el motor remoto. La auditoría comprueba además diálogo de ajustes, formularios, Service Worker, rutas, PWA, persistencia, accesibilidad básica y layout móvil con viewport dinámico.

La versión 4.2.0 de `main` se publicó en GitHub Pages (commit `e7168575cbf682725c679c779f9c6ef993c7ef96`, ejecución `34604674381`). La rama de mantenimiento requiere revisión y ejecución de su propio CI. Las pruebas del motor cubren 14 escenarios y 56 finales diseñados. La instalación PWA, el audio real y el modo offline completo aún requieren comprobaciones de navegador y hardware.

## Verificación de la rama de mantenimiento

| Comprobación | Resultado | Evidencia / comando | Entorno |
| --- | --- | --- | --- |
| Motor, narrativa, proyecto y almacenamiento | PASA | `npm test`; incluye `tests/storage.test.js` | Node 24, Linux; CI Node 22 pendiente |
| Escritura durante fallo de IndexedDB y recuperación | PASA | `tests/storage.test.js` con IndexedDB simulado y copia local | Node 24 |
| Cuota agotada en ambos almacenes | PASA | `tests/storage.test.js`; el guardado rechaza la operación | Node 24 |
| CI del pull request | PASA | workflow `Quality`, ejecución `45567168268`, job `test` correcto | GitHub Actions, Node 22 |
| Publicación de `main` anterior | PASA | GitHub Pages, ejecución `34604674381` | GitHub |
| Primera carga, recarga, instalación, actualización y reapertura sin conexión | PENDIENTE | Probar URL publicada con DevTools, pestaña Application y Network offline | Chrome/Edge reales |
| Safari/iPhone, Android, audio, teclado virtual y 200 % de zoom | PENDIENTE | Recorrer una partida larga, exportar/importar y reabrir offline | Dispositivos reales |

El Chromium disponible en este entorno apunta a un ejecutable inexistente (`/usr/lib/chromium/chromium`); no se afirma haber realizado pruebas visuales automatizadas. Para comprobar la PWA: abrir la URL HTTPS en Chrome o Edge, iniciar y guardar una partida, recargar, instalar, poner Network en Offline y reabrir; volver a Online, desplegar una actualización, aceptar el aviso y comprobar que el guardado, su exportación y los recursos permanecen. Repetir con teclado, zoom 200 %, pantalla estrecha y audio en iOS/Android. El caso de dos pestañas debe repetirse con ediciones simultáneas; `navigator.locks` serializa cuando está disponible, pero una carrera entre navegadores sin esta API sigue siendo un límite de esta versión.

## Test de usuario realizado

Se revisó el recorrido de usuario nuevo y recurrente:

1. Entrada en Inicio y comprensión de la propuesta.
2. Acceso a Escenarios y búsqueda/filtros.
3. Lectura visual de las 14 campañas.
4. Favoritos y apertura de expediente.
5. Configuración de personaje e intensidad.
6. Flujo de partida y modos Actuar, Hablar, Narrar, Continuar y Visión.
7. Guardado local, reanudación, exportación e importación.
8. Ajustes, skins, audio, movimiento reducido e instalación.

## Hallazgos corregidos

- **Alta — incoherencia visual:** campañas con arte propio y campañas sin arte visible. Todas las tarjetas tienen ahora cabecera y tres visiones de apoyo, usando arte propio cuando existe y banco visual local cuando no.
- **Alta — jerarquía rota en portada:** el icono grande de Universo 404 se superponía al arte orbital ya existente. Se mantiene el icono en la marca y PWA, y se recupera el arte orbital limpio.
- **Media — botón Instalar confuso:** se convirtió en un CTA reconocible en escritorio y en control compacto en móvil; conserva instrucciones cuando el navegador no ofrece `beforeinstallprompt`.
- **Media — sensación de lentitud/ruido:** se eliminó el grano animado a 0,22 s, se suavizó el fondo y se añadió una entrada escalonada de tarjetas con soporte para movimiento reducido.
- **Media — títulos desplazados:** se corrigió el margen heredado que dejaba demasiado espacio vacío debajo del arte.
- **Alta — partida plana:** se añadió un Descenso de cinco fases conectado al Umbral, con cambios de atmósfera y progreso visible.
- **Alta — descubrimientos poco visibles:** pistas, recuerdos, cambios de capítulo, condiciones, visiones y finales generan eventos diegéticos persistentes y animados.
- **Media — falta de cierre:** se añadió el informe del descenso, disponible durante la partida y automáticamente al alcanzar un final.
- **Media — viewport móvil:** se añadió soporte progresivo para `100dvh` en la partida, diálogos y ajustes, manteniendo el fallback compatible.
- **Alta — cierres genéricos:** cada una de las 14 campañas incorpora cuatro finales propios con estructura Decisión → Clímax → Consecuencia → Epílogo.
- **Alta — decisiones sin memoria de largo recorrido:** conocimiento, corrupción, sacrificio, confianza, personas salvadas, verdades y obsesión se conservan por aventura y condicionan los finales alcanzables.
- **Media — cierre poco exportable:** el informe y Markdown incluyen ahora el final específico, su epílogo y la trayectoria narrativa.
- **Media — repetición editorial:** se revisaron títulos concretos de campañas largas como *Cuando el Tiempo Sangra* y *Espectro Rojo* sin alterar el número de capítulos.

## Evidencia automatizada

- `npm test`: correcto.
- Sintaxis JavaScript y Service Worker: correcta.
- Eventos de inmersión y fases del Descenso verificados en el motor; el informe y la exportación incluyen sus datos.
- 14 diseños narrativos cargados; **4 finales por diseño, 56 finales totales**.
- Prueba de cierre forzado: las 14 campañas producen un final específico y un epílogo sin depender de un servicio externo.
- Prueba de ramas: las cuatro ramas de cada campaña son seleccionables cuando se cumplen sus requisitos de trayectoria.
- Prueba de compatibilidad: aventuras antiguas `ABYSS404.1` sin `endingData` siguen validando y recuperan el informe genérico o el final literario existente.
- Smoke HTTP local: **26/26 recursos del Service Worker responden correctamente**.
- Smoke de referencias DOM: **105/105 raíces de selector literal resueltas**.
- Llaves CSS equilibradas: **627/627**.
- 14 escenarios cargados; 5 tienen arte propio y 5 galería propia; los restantes usan fallback local validado.
- 12 recursos WebP comprobados; no hay rutas de arte inexistentes.
- 50 archivos en el árbol de trabajo y 38 en el paquete limpio; el paquete excluye el arte PNG de trabajo no usado.
- Sin scripts ni estilos externos.
- CSP presente y sin `unsafe-inline` en `script-src`.
- Manifest, iconos, Service Worker y caché referencian recursos existentes.
- No se detectaron TODO/FIXME, enlaces `javascript:void`, handlers inline ni secretos en el paquete.

## Pendiente de verificación externa

- Sonido audible con altavoces reales y comportamiento de suspensión de `AudioContext` en Safari/iOS.
- Instalación, actualización de caché y reapertura offline en Chrome/Edge/iOS/Android.
- Prueba táctil real a 320–390 px, teclado virtual y partidas largas.
- Publicación real en GitHub Pages con la subruta definitiva.
- El navegador Chromium no está instalado en este entorno; no se presenta como superada una prueba visual/táctil real.

Estas comprobaciones no se presentan como superadas desde este entorno.


## Stress test narrativo 4.1.1

Se ejecuta `tests/narrative-stress.test.js` sobre las 14 campañas con **170 comprobaciones narrativas**: herramientas inexistentes, acciones imposibles, persistencia de muertes fuera del historial inmediato, resurrecciones explícitas mediante modo Historia, objetos destruidos y compatibilidad de finales. Resultado: **PASS**.


## Update Reliability 4.1.4

Recursos críticos versionados y actualización visible/controlada del Service Worker con recarga segura y preservación del almacenamiento local.


## PWA Install & Update Fix 4.1.5

Se elimina el doble registro del Service Worker y se endurece el flujo de actualización/instalación para Chrome PC.


## Focus Edition 4.2.0

La partida prioriza narrativa y acciones principales. Los controles de ingeniería narrativa permanecen disponibles bajo demanda. Se declara feature freeze funcional.
