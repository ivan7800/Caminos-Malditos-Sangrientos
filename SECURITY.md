# Seguridad — ABYSS 404

## Modelo de seguridad

ABYSS 404 es una aplicación estática local-first. No tiene servidor propio, cuentas, telemetría ni sincronización remota. Las aventuras se guardan en el navegador del usuario.

## Datos y claves

- Las aventuras, escenarios y preferencias permanecen en IndexedDB/localStorage.
- Las claves de API se conservan solo en `sessionStorage` y no se incluyen en exportaciones.
- Las llamadas a proveedores externos se realizan directamente desde el navegador y dependen de CORS y de la política del proveedor.
- No introduzcas claves de producción en equipos compartidos ni publiques archivos exportados que contengan información sensible.

## Límites

El Director 404 no es un antivirus ni un sistema de seguridad. La aplicación no valida la seguridad de servidores externos ni garantiza la privacidad de un proveedor de IA elegido por el usuario. Revisa siempre sus condiciones y políticas.

## Reportar problemas

Para informar de una vulnerabilidad, abre un issue privado o contacta con el mantenedor del repositorio. No publiques claves, tokens, exportaciones privadas ni pruebas de concepto con datos personales.
