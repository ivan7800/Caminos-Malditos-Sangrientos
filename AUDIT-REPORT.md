# Auditoría de experiencia y release — v4.1.3

Fecha: 2026-09-06  
Producto: Caminos Malditos Sangrientos · Universo 404  
Estado: **Stable / Definitive**

## Veredicto

La v4.1.3 cierra la fase de hardening de la edición definitiva. Conserva la capa narrativa completa de 4.1.0, el ledger de continuidad de 4.1.1 y el flujo de instalación corregido de 4.1.2. Añade además una protección específica del Service Worker: una navegación con respuesta HTTP no satisfactoria —como un 404 de GitHub Pages— no puede sustituir la copia offline válida de `index.html`.

La app se considera **publicable y estable a nivel de código y arquitectura**. Las comprobaciones automatizadas pasan y no se han detectado dependencias remotas de ejecución, rutas rotas conocidas ni regresiones en los 56 finales.

## Evidencia automatizada

- `npm test`: correcto.
- Sintaxis JavaScript y Service Worker: correcta.
- Motor, memoria, contexto, exportación y escenarios: PASS.
- 14 campañas sometidas a stress test narrativo.
- **170 comprobaciones narrativas**: PASS.
- **56 finales específicos**: conservados.
- **13 comprobaciones del flujo de instalación**: PASS.
- **4 comprobaciones del hardening de navegación del Service Worker**: PASS.
- La caché PWA usa `abyss404-v4.1.3`.
- El Service Worker solo actualiza `index.html` cuando `response.ok === true`.
- Se conserva el fallback offline a `index.html` cuando la red falla.
- Manifest, iconos, recursos y rutas locales validados.
- Sin scripts o estilos externos de ejecución.
- CSP presente.
- Sin TODO/FIXME, `javascript:void`, handlers inline ni secretos detectados en el paquete de release.

## Cobertura funcional

Se revisan y mantienen:

1. Inicio, biblioteca de escenarios y filtros.
2. Configuración de personaje, perspectiva e intensidad.
3. Modos Actuar, Hablar, Narrar, Continuar y Visión.
4. Descenso, estado, pistas, inventario y memoria.
5. Guardado, reanudación, checkpoints, undo/redo y regeneración.
6. Informe final y exportaciones.
7. 14 campañas y 56 desenlaces.
8. Instalación PWA con prompt nativo o guía alternativa.
9. Modo offline y actualización de caché.
10. Ajustes, skins, sonido y movimiento reducido.
11. Creación, importación y exportación de escenarios.
12. Integración opcional con APIs OpenAI-compatible.

## Correcciones finales

### 4.1.1 — Continuity Hardened

- Persistencia de hechos críticos de continuidad.
- Personajes muertos no reaparecen como vivos sin justificación.
- Objetos destruidos/perdidos no reaparecen silenciosamente.
- Herramientas inexistentes no se materializan para resolver una acción.
- Acciones imposibles se tratan como intentos salvo que exista un medio o anomalía establecida.

### 4.1.2 — Install Flow Bugfix

- El botón Instalar usa `beforeinstallprompt` cuando está disponible.
- Fallback específico para Chrome, Edge, iPhone/iPad, otros navegadores y `file://`.
- Detección de ejecución en modo PWA instalada.

### 4.1.3 — Offline Cache Hardening

- Una respuesta 404/500 ya no puede reemplazar la copia offline de `index.html`.
- La caché de navegación solo se actualiza con respuestas `ok`.
- Nuevo test de regresión `tests/sw-navigation.test.js`.
- Nueva versión de caché `abyss404-v4.1.3`.

## Verificación física recomendada

La automatización no sustituye las pruebas sobre hardware real. Para certificar completamente la experiencia de usuario conviene comprobar la URL publicada en:

- Chrome/Edge de escritorio.
- Chrome Android.
- Safari/iOS y PWA añadida a pantalla de inicio.

Probar especialmente instalación, actualización del Service Worker, teclado virtual, audio, cambio de orientación, reapertura offline y una partida prolongada.

Estas comprobaciones son QA de dispositivo; no se consideran funcionalidades pendientes.

## Conclusión

**v4.1.3 queda marcada como Stable / Definitive.** A partir de esta versión se recomienda feature freeze: cualquier siguiente release debería ser un bugfix motivado por un problema real encontrado durante uso o pruebas físicas, no una ampliación de funciones.
