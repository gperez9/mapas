# Especificación funcional — Reconoce la Provincia

## Juego

**Reconoce la Provincia**

## Objetivo

Practicar el reconocimiento visual de provincias españolas a partir de su silueta aislada, sin el apoyo del mapa completo.

## Flujo

- En cada partida se escogen 20 provincias aleatoriamente.
- En cada pregunta se muestra una provincia aislada y centrada.
- El usuario escribe el nombre de la provincia.
- Se muestra feedback inmediato tras responder.
- Al final se usa la pantalla común de resultados con mapa de provincias.

## Corrección

La respuesta escrita se evalúa con tolerancia ortográfica:

- se ignoran mayúsculas, minúsculas y tildes;
- se aceptan pequeñas erratas;
- se usan los alias definidos en el catálogo de provincias cuando existen variantes locales o denominaciones alternativas.

Si el campo está vacío, se pide al usuario que escriba una respuesta y no se considera la pregunta contestada.

## Puntuación

La nota se calcula con el sistema transversal de resultados:

- cada provincia preguntada cuenta como una opción;
- cada respuesta correcta suma un acierto;
- la nota final es `aciertos / 20`, expresada sobre 10.

## Decisiones visuales

- Se reutiliza el SVG de provincias.
- Se ocultan todas las provincias salvo la preguntada.
- La provincia activa se muestra en azul claro, con frontera visible y una sombra suave.
- Las provincias pequeñas o insulares tienen recortes específicos para que no queden demasiado alejadas o diminutas.

## Estado

Implementado y disponible desde la pantalla inicial.

## Riesgos abiertos

- Ajustar manualmente algún recorte si una provincia aparece demasiado grande, pequeña o cortada.
- Valorar si en resultados conviene distinguir visualmente provincias no preguntadas frente a provincias falladas.
