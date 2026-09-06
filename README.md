# Caminos Malditos Sangrientos

Anteriormente **ABYSS 404**; se conservan los identificadores internos y el formato `.abyss404` para mantener la compatibilidad con aventuras existentes.

**Versión 4.1.3 — Stable / Definitive · Definitive Stories Edition · Continuity Hardened**

**Motor narrativo local-first de horror cósmico.** Una PWA estática que combina juego de rol libre, escritura colaborativa, memoria narrativa y un mundo estructurado que no depende de que el narrador “recuerde” las reglas.

Creado por **I. Roig** para el Universo 404.


### Estabilización offline 4.1.3

- El Service Worker solo reemplaza la copia offline de `index.html` cuando una navegación devuelve una respuesta HTTP válida (`response.ok`).
- Un 404 de GitHub Pages ya no puede contaminar la caché de navegación de la PWA.
- Se mantiene el fallback offline a la aplicación cuando la red no está disponible.
- Añadido un test automático específico para este caso límite.
- Caché PWA actualizada a `abyss404-v4.1.3`.

### Corrección de instalación 4.1.2

- El botón **Instalar** abre el diálogo nativo cuando el navegador lo permite.
- Si el prompt no está disponible, muestra instrucciones específicas para Chrome, Edge, iPhone/iPad o el navegador actual.
- Al abrir desde `file://`, explica que la PWA necesita HTTPS o localhost para instalarse.
- Detecta si la aplicación ya se está ejecutando como PWA instalada.

### Refuerzo de continuidad 4.1.1

- Ledger local de continuidad para hechos persistentes relevantes durante partidas largas.
- Los personajes declarados muertos no vuelven a responder como vivos salvo que el modo **Historia** establezca explícitamente una anomalía o resurrección.
- Los objetos destruidos/perdidos no reaparecen de forma silenciosa.
- Director 404 no materializa herramientas no establecidas en inventario o escena para hacer posible una acción.
- Acciones físicamente imposibles no se aceptan automáticamente en modo **Hacer**: se narran como intento hasta que exista un medio o anomalía establecida.
- El mismo contrato de continuidad se inyecta en el contexto del motor remoto.
- Stress test automatizado: **14 campañas · 170 comprobaciones narrativas**.

## Qué incluye

- Cinco modos por turno: **Do**, **Say**, **Story**, **Continue** y **See**.
- **Director 404 offline**: motor procedural jugable sin cuenta, servidor ni clave API.
- Conexión opcional con **Ollama, LM Studio o cualquier API OpenAI-compatible**.
- World Engine con **Lucidez, Cuerpo, Obsesión, Umbral, inventario, pistas, ubicación, objetivo y condiciones**.
- Tiradas de `d20` reproducibles, modificadores por arquetipo y consecuencias estructuradas.
- Memoria local: consolida un recuerdo cada seis acciones y actualiza el resumen global cada quince.
- Context Builder con Plot Essentials, reglas, Story Cards, recuerdos recuperados e historial reciente.
- Inspector de contexto y presupuesto configurable de 2.048 a 16.384 tokens.
- Siete skins visuales persistentes: Cósmica, Obsidiana, Void OLED, Glass, Terminal, Arctic y Synthwave.
- Catorce expedientes originales incluidos. La cobertura visual es completa: cada expediente muestra una imagen de cabecera y la galería global selecciona visiones aleatorias.
- La biblioteca se renderiza bajo demanda al abrirla y el arte se sirve en WebP optimizado para acelerar el inicio, especialmente en móvil.
- Botón de instalación PWA integrado para Chrome y Edge, con instrucciones específicas para iPhone cuando el navegador no ofrece instalación automática.
- Modos de juego presentados primero en español: Actuar, Hablar, Narrar, Continuar y Visión; se conserva el nombre internacional entre bastidores.
- Onboarding inicial para aprender a jugar en menos de un minuto.
- Favoritos persistentes y filtro de expedientes favoritos.
- Cuatro ambientes sonoros y cuatro niveles de volumen configurables desde Ajustes.
- Integrada la identidad visual de Universo 404 en el logotipo, icono PWA y metadatos de compartir.
- Recuperada la composición orbital limpia de la edición anterior para evitar duplicación visual en la portada.
- Biblioteca unificada: todas las campañas muestran cabecera y visiones de apoyo, incluidas las que no tienen arte propio.
- Movimiento suavizado y respetuoso: fondo sin grano agresivo, entrada escalonada de tarjetas y soporte de movimiento reducido.
- Botón de instalación rediseñado como CTA claro en escritorio y control compacto en móvil.
- Nueva dirección visual Universo 404 / I. Roig: negro, rojo, marfil editorial y geometría diagonal.
- Arte orbital con movimiento visible por capas: anillos, pupila, brillo, flotación y diagonales de la grieta.
- Motor de movimiento explícito para el arte orbital, además de CSS, para evitar que el conjunto parezca estático en navegadores o cachés concretos.
- Actualización de caché PWA a v4.1.3 para forzar la sustitución de ediciones anteriores.
- Corregido el scroll del diálogo de ajustes: el botón “Guardar ajustes” permanece accesible en ventanas pequeñas.
- Revisados los diálogos, formularios, Service Worker, rutas, persistencia, accesibilidad y controles principales.
- Rediseñado el botón de instalación para que sea reconocible en escritorio y compacto en móvil.
- **Immersion Edition**: progreso narrativo visible en cinco fases de Descenso —Sospecha, Revelación, Contagio, Umbral y Ruptura—.
- Eventos diegéticos para nuevas pistas, recuerdos alterados, cambios de capítulo, condiciones y cierre del expediente.
- Arte reactivo de escena, microtransiciones y feedback sonoro opcional cuando el ambiente está activo.
- **Definitive Stories Edition**: cuatro finales moralmente ambiguos y escritos específicamente para cada una de las catorce campañas.
- Cada cierre sigue **Decisión → Clímax → Consecuencia → Epílogo**, con fechas narrativas como tres días, seis meses, diecisiete años o una fecha imposible.
- Las trayectorias ocultas de conocimiento, corrupción, sacrificio, confianza, personas salvadas, verdades y obsesión hacen que las decisiones anteriores condicionen el final.
- Informe de partida con decisiones, hallazgos, recuerdos, visiones, capítulo, umbral y final alcanzado.
- Exportación Markdown con el final específico, la consecuencia, el epílogo y la trayectoria narrativa alcanzada.
- Pasada editorial de títulos para reducir repeticiones y dar más personalidad a los capítulos largos.
- Uso progresivo de `100dvh` para evitar que la interfaz y los diálogos queden cortados en móviles modernos.
  - El Faro Bajo la Marea.
  - Frecuencia Negra.
  - Andén Cero.
  - Orfeo IX.
  - Sangre del MetropoliT — expediente literario de I. Roig.
  - Puerta 414 — expediente institucional de horror arquitectónico.
  - Visión Carmesí — expediente transnacional de brote visual, fúngico y lingüístico.
  - Los Que Miran Desde el Pozo — expediente gótico de Villazul.
  - El Latido Bajo la Piedra — expediente geo-ritual de Quintaluz y El Acebrín.
  - Donde se Entierran los Espejos — expediente gótico de Santa Medea.
  - El Nombre Que Devora la Sangre — expediente de fantasía oscura, memoria y ciclos.
  - Cuando el Tiempo Sangra — expediente temporal entre Montrevault y Terrassa.
  - Espectro Rojo — expediente cyberpunk de Nuevo Paraíso.
  - Bajo el Espejo de la Sangre — expediente gótico de restauración maldita.


- Estudio para crear, validar, importar, exportar y compartir escenarios propios.
- Partidas de mesa para varios jugadores en un dispositivo.
- Código de ritual para transportar una partida pequeña mediante texto.
- Exportación completa `.abyss404`, relato en Markdown y visiones procedurales en PNG.
- Edición de respuestas, deshacer, rehacer y regenerar durante la sesión.
- Guardado automático en IndexedDB, con fallback a `localStorage`.
- Sin telemetría, anuncios, CDN ni dependencias de ejecución.
- Diseño responsive, navegación por teclado, reducción de movimiento y texto ampliable.
- PWA instalable y caché offline.
- Director 404 con arco de seis fases, tensión, momentum, cliffhanger y objetivo dinámico.
- Progresión local con XP, niveles y recompensas de continuidad.
- Combate determinista opcional con acciones de ataque y defensa; la IA nunca decide los números.
- Decisiones sugeridas contextuales, audio procedural y visiones locales integradas.

## Inicio rápido

No necesita compilación.

1. Extrae el proyecto.
2. Abre `index.html` para usarlo directamente, o sírvelo por HTTP para activar la instalación PWA.
3. Pulsa **Iniciar descenso**, define el personaje y abre el expediente.

Para probarlo con un servidor local:

```bash
python -m http.server 8080
```

Después abre `http://localhost:8080`.

## Publicar en GitHub Pages

1. Sube el contenido de esta carpeta a la rama principal del repositorio.
2. En **Settings → Pages**, selecciona **Deploy from a branch**.
3. Elige la rama principal y la carpeta raíz `/`.
4. Espera a que GitHub publique la URL.

Incluye `404.html` para que una ruta inexistente mantenga la identidad de Caminos Malditos Sangrientos y permita regresar al portal. Tras publicar, prueba una recarga profunda y una ruta inexistente desde la URL real del repositorio.

Todas las rutas son relativas; funciona tanto en un dominio raíz como en un subdirectorio de GitHub Pages.

## Conectar una IA

Caminos Malditos Sangrientos funciona sin IA externa. Para que un modelo redacte la prosa:

1. Abre **Ajustes**.
2. Selecciona **IA compatible**.
3. Introduce endpoint, modelo y, si hace falta, clave.
4. Usa **Probar conexión** antes de guardar.

Ejemplos habituales:

| Servidor | Endpoint típico | Modelo de ejemplo |
| --- | --- | --- |
| Ollama | `http://localhost:11434/v1/chat/completions` | `llama3.2` |
| LM Studio | `http://localhost:1234/v1/chat/completions` | El identificador cargado |
| API compatible | `https://servidor.example/v1/chat/completions` | Según proveedor |

La clave se conserva únicamente en `sessionStorage`: desaparece al cerrar la sesión del navegador y nunca entra en una exportación. El endpoint debe permitir CORS. Una página HTTPS puede bloquear ciertos endpoints HTTP locales según el navegador y su configuración.

Si la API falla o agota el tiempo, el turno no se pierde: **Director 404 genera una respuesta local y la interfaz informa del fallback**.

## Cómo funciona la memoria

El motor no envía toda la novela. Para cada turno compone un paquete dentro del presupuesto configurado:

1. Instrucciones, datos esenciales, reglas, nota de autor, resumen y estado estructurado.
2. Historial reciente hasta ocupar aproximadamente la mitad del espacio dinámico.
3. Story Cards relevantes mediante coincidencia semántica local ligera.
4. Recuerdos antiguos recuperados por similitud léxica.
5. Entrada actual y consecuencia exacta decidida por el World Engine.

El Inspector permite revisar ese paquete antes de confiarlo a un servidor externo.

## Límites honestos

- Director 404 es un motor procedural con continuidad y reglas; **no pretende sustituir la variedad lingüística de un LLM**.
- El modo multijugador incluido es por turnos en el mismo dispositivo. Los códigos transfieren copias, pero no sincronizan equipos remotos en tiempo real.
- Una API introducida en una web estática se llama desde el navegador. Para un servicio público con claves centralizadas haría falta un backend seguro.
- La recuperación local usa similitud léxica, no embeddings neuronales. El contrato interno permite sustituirla en una futura edición híbrida.
- Regenerar con estado exacto solo está disponible para turnos creados en la sesión actual; tras recargar siempre se puede editar el texto.

Estas limitaciones se muestran también dentro de la interfaz para no fingir capacidades inexistentes.

## Comprobación de release

Antes de anunciar una versión final, prueba en la URL HTTPS publicada: instalación PWA, primer arranque, recarga profunda, modo sin conexión, actualización del Service Worker, exportación/importación, teclado, zoom al 200 % y pantalla estrecha. Las API externas son opcionales y no forman parte del funcionamiento offline.

## Estructura

```text
abyss-404/
├── index.html
├── styles.css
├── manifest.webmanifest
├── sw.js
├── assets/
│   ├── icon.svg
│   ├── icon-192.png
│   └── icon-512.png
├── js/
│   ├── scenarios.js
│   ├── engine.js
│   ├── storage.js
│   └── app.js
└── tests/
    ├── engine.test.js
    └── validate-project.js
```

## Verificación

Requiere Node.js 18 o posterior únicamente para las pruebas; la app no lo necesita.

```bash
npm test
```

La batería valida motor, memoria, contexto, serialización, código de ritual, manifest, rutas del Service Worker y ausencia de recursos externos de ejecución.

## Privacidad y seguridad

- El modo local no realiza peticiones externas.
- No hay telemetría ni identificadores de usuario.
- Las importaciones se validan, tienen límites de tamaño y se renderizan como texto, no como HTML.
- Los escenarios no ejecutan JavaScript arbitrario.
- La Content Security Policy bloquea objetos, formularios externos y scripts de terceros.
- Exporta una copia antes de borrar datos del navegador o una aventura importante.

## Licencia

MIT. Consulta [LICENSE](LICENSE).
