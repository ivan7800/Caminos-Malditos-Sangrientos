# Caminos Malditos Sangrientos

Anteriormente **ABYSS 404**; se conservan los identificadores internos y el formato `.abyss404` para mantener compatibilidad con aventuras existentes.

**Versión 4.1.3 — Stable / Definitive · Definitive Stories Edition · Continuity Hardened**

**Motor narrativo local-first de horror cósmico.** PWA estática que combina juego de rol libre, escritura colaborativa, memoria narrativa y un mundo estructurado. Creado por **I. Roig** para Universo 404.

## Estado de la release

La v4.1.3 cierra los tres últimos frentes de estabilidad:

- **Continuidad narrativa 4.1.1:** ledger persistente para personajes muertos, objetos perdidos/destruidos, herramientas no establecidas y acciones imposibles; el modo Historia puede introducir excepciones sobrenaturales de forma explícita.
- **Instalación 4.1.2:** el botón Instalar usa `beforeinstallprompt` cuando existe y, cuando no, muestra instrucciones específicas para Chrome, Edge, iPhone/iPad, otros navegadores y `file://`.
- **Caché offline 4.1.3:** una respuesta HTTP no satisfactoria —por ejemplo un 404 de GitHub Pages— ya no puede sustituir la copia offline de `index.html`. La caché solo se actualiza cuando `response.ok === true`.

La caché PWA actual es `abyss404-v4.1.3`.

## Qué incluye

- 14 campañas originales.
- 4 finales específicos por campaña: **56 finales** en total.
- Secuencia de cierre **Decisión → Clímax → Consecuencia → Epílogo**.
- Trayectorias ocultas de conocimiento, corrupción, sacrificio, confianza, personas salvadas, verdades y obsesión.
- Cinco modos por turno: **Actuar, Hablar, Narrar, Continuar y Visión**.
- **Director 404 offline**, jugable sin cuenta, servidor ni API.
- Conexión opcional con Ollama, LM Studio o cualquier API OpenAI-compatible.
- World Engine con Lucidez, Cuerpo, Obsesión, Umbral, inventario, pistas, ubicación, objetivo y condiciones.
- Descenso en cinco fases: Sospecha, Revelación, Contagio, Umbral y Ruptura.
- Memoria local, Story Cards, Context Builder e Inspector de contexto.
- Eventos diegéticos, arte reactivo, audio procedural opcional e informe final.
- Checkpoints, deshacer/rehacer, regeneración, edición de respuestas y guardado automático.
- Estudio para crear, importar, exportar y compartir escenarios propios.
- Exportación `.abyss404`, Markdown y visiones PNG.
- Favoritos, siete skins, onboarding, modo de mesa local y códigos de ritual.
- IndexedDB con fallback a `localStorage`.
- PWA instalable, responsive y offline.
- Sin telemetría, anuncios, CDN ni dependencias de ejecución.
- CSP restrictiva, navegación por teclado, texto ampliable y movimiento reducido.

## Campañas incluidas

- El Faro Bajo la Marea
- Frecuencia Negra
- Andén Cero
- Orfeo IX
- Sangre del MetropoliT
- Puerta 414
- Visión Carmesí
- Los Que Miran Desde el Pozo
- El Latido Bajo la Piedra
- Donde se Entierran los Espejos
- El Nombre Que Devora la Sangre
- Cuando el Tiempo Sangra
- Espectro Rojo
- Bajo el Espejo de la Sangre

## Inicio rápido

No necesita compilación.

1. Abre `index.html` para uso local básico.
2. Para PWA/Service Worker, sirve la carpeta mediante HTTPS o localhost.
3. Pulsa **Iniciar descenso**, configura el personaje y abre un expediente.

Servidor local de ejemplo:

```bash
python -m http.server 8080
```

Después abre `http://localhost:8080`.

## GitHub Pages

El proyecto usa rutas relativas y está preparado para publicarse desde la raíz del repositorio. Incluye `404.html` y Service Worker específico para la subruta de GitHub Pages.

Después de publicar conviene comprobar: primer arranque, recarga profunda, instalación, actualización del Service Worker, reapertura offline, ruta inexistente, exportación/importación, zoom al 200 %, teclado y pantalla estrecha.

## IA opcional

En **Ajustes** puede seleccionarse una API compatible. La clave se conserva solo en `sessionStorage` y no entra en las exportaciones. El endpoint debe permitir CORS. Si la API falla o agota el tiempo, Director 404 genera una respuesta local y la interfaz informa del fallback.

Ejemplos habituales:

| Servidor | Endpoint típico |
| --- | --- |
| Ollama | `http://localhost:11434/v1/chat/completions` |
| LM Studio | `http://localhost:1234/v1/chat/completions` |
| API compatible | `https://servidor.example/v1/chat/completions` |

## Límites honestos

- Director 404 es procedural: prioriza reglas y continuidad, pero un LLM ofrece mayor variedad lingüística.
- El multijugador incluido es por turnos en el mismo dispositivo; los códigos transportan copias, no sincronizan equipos en tiempo real.
- Una API externa se llama desde el navegador; un servicio público con claves centralizadas necesitaría backend.
- La recuperación local es léxica, no usa embeddings neuronales.

## Verificación

Node.js 18+ solo es necesario para las pruebas:

```bash
npm test
```

La batería actual verifica:

- motor, memoria, contexto, exportación y escenarios;
- **14 campañas / 170 comprobaciones de stress narrativo**;
- **13 comprobaciones del flujo de instalación**;
- **4 comprobaciones específicas del hardening de navegación del Service Worker**;
- estructura estática, rutas, manifest, recursos y ausencia de dependencias remotas.

## Privacidad y seguridad

- El modo local no realiza peticiones externas.
- No hay telemetría ni identificadores de usuario.
- Las importaciones se validan y se renderizan como texto.
- Los escenarios no ejecutan JavaScript arbitrario.
- La CSP bloquea scripts de terceros, objetos y formularios externos.

## Licencia

MIT. Consulta [LICENSE](LICENSE).
